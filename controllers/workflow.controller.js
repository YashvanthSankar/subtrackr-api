import dayjs from "dayjs";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");
import Subscription from "../models/subscription.model";
import { sendReminderEmail } from "../utils/email.utils.js"; // Assuming you have a utility to send emails

const reminders = [7, 5, 2, 1];

export const sendReminder = serve(async (context) => {
  const { subscriptionId } = context.requestPayload;
  const subscription = await fetchSubscriptions(context, subscriptionId);

  if (!subscription || subscription.status !== "active") return;

  const renewalDate = dayjs(subscription.renewalDate);
  const today = dayjs();
  if (renewalDate.isBefore(today)) {
    console.log("Subscription is already past the renewal date.");
    return;
  }

  for (let daysBefore of reminders) {
    const reminderDate = renewalDate.subtract(daysBefore, "day");

    if (reminderDate.isAfter(today)) {
      await sleepUntilReminder(
        context,
        `Reminder for subscription ${subscriptionId} in ${daysBefore} days`,
        reminderDate
      );
    }

    if (reminderDate.isSame(today, "day")) {
      await triggerReminder(
        context,
        `Reminder for subscription ${subscriptionId} today`,
        subscription
      );
    }
  }
});

const fetchSubscriptions = async (context, subscriptionId) => {
  return await context.run("getSubscriptions", async () => {
    return Subscription.findById(subscriptionId).populate("user", "name email");
  });
};

const sleepUntilReminder = async (context, message, reminderDate) => {
  console.log(
    `Sleeping until ${reminderDate.format("YYYY-MM-DD")}: ${message}`
  );
  await context.sleep(reminderDate.diff(dayjs(), "milliseconds"));
};

const triggerReminder = async (context, message, subscription) => {
  await context.run("sendReminder", async () => {
    console.log(`Sending reminder: ${message}`);
    // Here you would implement the logic to send the reminder, e.g., via email or notification
    // For example:
    // await sendEmail(subscription.user.email, "Subscription Reminder", message);
    await sendReminderEmail({
      to: subscription.user.email,
      type: message,
      subscription,
    });
  });
};

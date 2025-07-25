import { aj } from "../config/arcjet.js";

export const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, {
      requested: 1,
      allowUserAgents: [/PostmanRuntime/i],
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({
          success: false,
          message: "Rate limit exceeded",
        });
      }

      if (decision.reason.isBot()) {
        return res.status(403).json({
          success: false,
          message: "Bots are not allowed",
        });
      }

      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    next();
  } catch (error) {
    console.error("Arcjet middleware error:", error);
    next(error);
  }
};

import mongoose from "mongoose";
import { DATABASE_URI, NODE_ENV } from "../config/env.js";

if (!DATABASE_URI) {
  throw new Error(
    "DATABASE_URI is not defined in the .env.<development/production>.local"
  );
}

const connectToDatabase = adync () => {
    try {
        await mongoose.connect(DATABASE_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (error) {
        console.error("Error connecting to the database:", error);
        process.exit(1);
    }
}

export default connectToDatabase;
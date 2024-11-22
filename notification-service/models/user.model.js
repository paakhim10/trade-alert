import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

// Assuming you have a tradeAlertConnection for the trade-alert database
import connectDB from "../config/db.js"; // Import the database connection function

const { tradeAlertConnection } = await connectDB(); // Get the trade-alert connection

// Define the User Schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
  companyStocks: [
    {
      type: new Schema({
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        priority: {
          type: Number,
          required: true,
        },
      }),
    },
  ],
  userPreferences: {
    type: new Schema({
      news_partners: [
        {
          type: String,
        },
      ],
      alert_preference: {
        type: new Schema({
          alertTypes: [
            {
              type: String,
              required: true,
              enum: ["Email", "SMS", "Push"],
            },
          ],
          alertFrequency: {
            type: String,
            required: true,
            enum: ["Hourly", "Daily", "Weekly", "asNecessary"],
          },
        }),
      },
    }),
  },
  notificationToken: {
    type: String,
  },
});

// Middleware for hashing password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.isNew) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  return next();
});

// Instance method to match passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  console.log("Inside matchPassword function");
  console.log("EnteredPassword: ", enteredPassword);
  console.log("Current password: ", this.password);
  return await bcrypt.compare(enteredPassword, this.password);
};

// Export the User model from the trade-alert database
export const User = tradeAlertConnection.model("User", userSchema);

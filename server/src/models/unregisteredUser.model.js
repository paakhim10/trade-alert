import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const unregisteredUserSchema = new Schema({
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
  stage: {
    // only following values are allowed: "Stage_EmailVerification", "Stage_AddCompanyStock", "Stage_SelectNewsPartner", "Stage_SelectAlertPreference"
    type: String,
    required: true,
    enum: ["Stage_EmailVerification", "Stage_AddUserDetails"],
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
          alertTypes: {
            type: String,
            required: true,
            enum: ["Email", "SMS", "Push"],
          },
          alertFrequency: {
            type: String,
            required: true,
            enum: ["Hourly", "Daily", "Weekly", "asNecessary"],
          },
        }),
      },
    }),
  },
});

unregisteredUserSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.isNew) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  return next();
});

unregisteredUserSchema.methods.matchPassword = async function (
  enteredPassword
) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const UnregisteredUser = mongoose.model(
  "UnregisteredUser",
  unregisteredUserSchema
);

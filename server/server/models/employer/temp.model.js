import mongoose from "mongoose";
import validator from "validator";

const TempEmployeeSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, "Please use a valid email"],
    },
    digitCode: {
      type: String,
      required: [true, "six digit code is required"],
    },
  },
  {
    // virtuals true => it displays virtual schema
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export default mongoose.model("TempEmployer", TempEmployeeSchema);

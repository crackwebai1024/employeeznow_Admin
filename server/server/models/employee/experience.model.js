import mongoose from "mongoose";

const ExperienceSchema = new mongoose.Schema({
  primaryJob: {
    company: String,
    title: String,
    startDate: String,
    endDate: String,
    description: String,
    years: Number,
    current: {
      type: Boolean,
      default: false,
    },
  },
  secondaryJob: {
    company: String,
    title: String,
    startDate: String,
    endDate: String,
    description: String,
    years: Number,
  },
  otherJob: [
    {
      company: String,
      title: String,
      startDate: String,
      endDate: String,
      description: String,
      years: Number,
    },
  ],
  employee: {
    type: mongoose.Schema.ObjectId,
    ref: "Employee",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("EmployeeExperience", ExperienceSchema);

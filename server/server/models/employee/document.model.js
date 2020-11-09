import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema({
  resume: {
    fname: String,
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  license: {
    fname: String,
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  deploma: {
    fname: String,
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  refletter: {
    fname: String,
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  veteran: {
    fname: String,
    veteranId: String,
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  employee: {
    type: mongoose.Schema.ObjectId,
    ref: "Employee",
    required: true,
  },
});

export default mongoose.model("EmployeeDocument", DocumentSchema);

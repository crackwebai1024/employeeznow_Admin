import mongoose from "mongoose";

const ImgSchema = new mongoose.Schema({
  photo: {
    fname: String,
    url: String,
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  background: {
    fname: String,
    url: String,
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

export default mongoose.model("EmployeeImg", ImgSchema);

import mongoose from "mongoose";

const PortfolioSchema = new mongoose.Schema({
  portfolios: [
    {
      index: String,
      fileName: String,
      url: String,
      note: String,
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

export default mongoose.model("EmployeePortfolio", PortfolioSchema);

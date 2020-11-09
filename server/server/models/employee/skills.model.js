import mongoose from "mongoose";

const EmployeeSkillSchema = new mongoose.Schema(
  {
    shift: {
      type: [String],
      enum: ["Breakfast", "Lunch", "Dinner"],
    },
    primaryJob: {
      title: {
        type: String,
      },
      years: Number,
    },
    secondaryJob: {
      title: {
        type: String,
      },
      years: Number,
    },
    style: {
      type: {
        type: String,
        enum: [
          "Fast Food",
          "Banquet",
          "Counter Service",
          "Full-Service Casual",
          "Upscale Casual",
          "Fine Dining",
          "",
        ],
      },
      years: Number,
    },
    styleCurrent: String,
    cuisine: [
      //*** should valid max 4 array */
      {
        type: {
          type: String,
          enum: [
            "Seafood",
            "Steakhouse",
            "Pizza",
            "American",
            "Chinese",
            "Thai",
            "Japanese",
            "Kosher",
            "BBQ",
            "Sandwiches",
            "Coffee Shop",
            "Cuban",
            "Caribbean",
            "Greek",
            "Brazilian",
            "French",
            "Italian",
            "Fondue",
            "Middle Eastern",
            "Vegan/Vegetarian",
            "Sushi",
            "Deli",
            "Fastfood",
            "Bagels",
            "Buffet",
            "Brunch/Breakfast",
            "Fastfood Burgers",
            "Cafe",
            "",
          ],
        },
        years: Number,
      },
    ],
    wineKnowledge: {
      type: String,
      enum: ["Barefoot", "Sutterhome", "Silver Oak", "Chat.Margaux", ""],
    },
    cocktailKnowledge: {
      type: String,
      enum: ["White Claw", "Jack & Coke", "Old Fashioned", "Sazerac", ""],
    },
    // POS and Reservation systems
    systems: [String],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    milesToWork: Number,
    updatedAt: {
      type: Date,
    },
    employee: {
      type: mongoose.Schema.ObjectId,
      ref: "Employee",
      required: true,
    },
  },
  {
    // set virtuals - employee
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export default mongoose.model("EmployeeSkill", EmployeeSkillSchema);

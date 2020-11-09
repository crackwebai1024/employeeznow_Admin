import mongoose from "mongoose";
const geocoder = require("../utils/geocoder");

const SearchFilterSchema = new mongoose.Schema({
  searchAddress: {
    street: String,
    state: String,
    city: String,
    zipcode: {
      type: String,
      required: [true, "Please provide zipcode"],
    },
  },
  locations: {
    type: {
      type: String,
      default: "Point",
      enum: ["Point"],
    },
    coordinates: [Number],
  },
  shift: {
    type: [String],
    enum: ["Breakfast", "Lunch", "Dinner", ""],
  },
  primary: {
    type: String,
    enum: [
      "Director of Ops",
      "General Manager",
      "Executive Chef",
      "Sous Chef",
      "Pastry Chef",
      "Banquet Chef",
      "Manager",
      "Supervisor",
      "Banquet Captain",
      "Line Cook",
      "Pastry Cook",
      "Expediter",
      "Food Runner",
      "Bartender",
      "Barback",
      "Food Server",
      "Counter Server",
      "Server Assitant",
      "Banquet Server",
      "Banquet Bartender",
      "Hostess",
      "Dishwasher",
      "Barista",
      "Fastfood Cook",
      "Fastfood Server",
      "Velet",
      "Casher",
      "",
    ],
  },
  minimumexp: {
    type: Number,
    required: true,
  },
  style: {
    type: [String],
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
  cuisine: {
    type: [String],
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
  wineKnowledge: {
    type: String,
    enum: ["Barefoot", "Sutterhome", "Silver Oak", "Chat.Margaux", ""],
  },
  cocktailKnowledge: {
    type: String,
    enum: ["White Claw", "Jack & Coke", "Old Fashioned", "Sazerac", ""],
  },
  systems: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  name: String, //serach query name
  employer: {
    type: mongoose.Schema.ObjectId,
    ref: "Employer",
    required: true,
  },
});

// Geocoder - Get longtitude and latitude from address
SearchFilterSchema.pre("save", async function (next) {
  const loc = await geocoder.geocode(this.searchAddress);

  this.locations = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
  };

  next();
});

export default mongoose.model("SearchFilter", SearchFilterSchema);

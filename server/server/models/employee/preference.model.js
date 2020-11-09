import mongoose from "mongoose";

const PreferenceSchema = new mongoose.Schema({
  employmentStatus: {
    type: String,
    enum: {
      values: [
        "Unemployed and looking",
        "Employed and looking",
        "Employed and not looking",
        "",
      ],
    },
  },
  idealSalary: {
    amount: Number,
    unit: {
      type: String,
      enum: {
        values: ["hourly", "weekly", "annually"],
      },
    },
  },
  planningToMove: {
    planning: {
      type: Boolean,
      default: false,
    },
    location: {
      //city name or zipcode
      type: String,
    },
    dateToMove: {
      type: String,
    },
  },
  randomShift: {
    type: Boolean,
    default: false,
  },
  randomShiftRole: {
    type: [String],
    enum: [
      "Line Cook AM",
      "Line Cook PM",
      "Pastry Cook",
      "Breakfast Cook",
      "Banquet Cook",
      "Grill Cook",
      "Bartender",
      "Banquet Bartender",
      "Barback",
      "Full-Service Server",
      "Food-Server-Counter",
      "Banquet Server",
      "Server Assitant",
      "Hostess",
      "Dishwasher",
      "Barista",
      "Valet",
      "",
    ],
  },
  newOpportunity: {
    availability: {
      type: Boolean,
      default: false,
    },
    title: {
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
  },
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

export default mongoose.model("EmployeePreference", PreferenceSchema);

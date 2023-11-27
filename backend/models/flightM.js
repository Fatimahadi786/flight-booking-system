import mongoose from "mongoose";

const FlightSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  airlineLogo: {
    type: String, // Assuming the logo is stored as a string (URL or base64)
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  journeyDate: {
    type: String,
    required: true,
  },
  returnDate: {
    type: String,
    required: true,
  },
  journeyAirport: {
    type: String,
    required: true,
  },
  arrivalAirport: {
    type: String,
    required: true,
  },
  journeyTime: {
    type: String,
    required: true,
  },
  arrivalTime: {
    type: String,
    required: true,
  },
  hour: {  // Added field
    type: Number,  // Modify the type based on your requirement
    required: true,
  },
  seat: {
    economy: {
      type: Number,
      required: true,
      default: 3,
    },
    business: {
      type: Number,
      required: true,
      default: 3,
    },
  },
  seatAvailability: {
    economy: {
      type: Number,
    },
    business: {
      type: Number,
    },
  },
  fare: {
    economy: {
      adult: {
        type: Number,
        required: true,
      },
      infant: {
        type: Number,
        required: true,
      },
      child: {
        type: Number,
        required: true,
      },
    },
    business: {
      adult: {
        type: Number,
        required: true,
      },
      infant: {
        type: Number,
        required: true,
      },
      child: {
        type: Number,
        required: true,
      },
    },
  },
});

export default mongoose.model("Flight", FlightSchema);

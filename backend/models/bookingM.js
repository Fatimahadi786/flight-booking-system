import mongoose from "mongoose";

// Import the Passenger schema
import Passenger from "./passengerM.js";

const BookingSchema = new mongoose.Schema({
  flightType: {
    type: String,
    enum: ["one-way", "round-way"],
    required: true,
  },
  flightClass: {
    type: String,
    enum: ["economy", "business", "first"],
    required: true,
  },
  departureAirport: {
    type: String,
    required: true,
  },
  
  arrivalAirport: {
    type: String,
    required: true,
  },

  passengers: {
    type: [Passenger.schema], // An array of PassengerSchema
    required: true,
  },
});

export default mongoose.model("FlightBooking", BookingSchema);

import Booking from "../models/bookingM.js";
import Flight from "../models/flightM.js";
// Controller to handle flight booking creation
const createBooking = async (req, res) => {
  try {
    console.log('Received data for booking:', req.body);

    const newBooking = new Booking(req.body);
    const savedBooking = await newBooking.save();
    console.log('Booking created successfully:', savedBooking);

    let economySeats = 0;
    let businessSeats = 0;

    // Assuming you have variables economy and business defined somewhere
    const flight = await Flight.findById(savedBooking.flight_id);

    if (flight) {
      economySeats = flight.seatAvailability.economy;
      businessSeats = flight.seatAvailability.business;

      if (savedBooking.flightClass === 'economy') {
        economySeats = economySeats - savedBooking.adults - savedBooking.children;
      } else if (savedBooking.flightClass === 'business') {
        businessSeats = businessSeats - savedBooking.adults - savedBooking.children;
      }

      const updatedFlight = await Flight.findByIdAndUpdate(
        savedBooking.flight_id,
        {
          $set: {
            seatAvailability: {
              economy: economySeats,
              business: businessSeats,
            },
          },
        },
        { new: true }
      );

      console.log('Flight updated successfully:', updatedFlight);
    }

    res.status(201).json(savedBooking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: error.message });
  }
};


// Controller to get all flight bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to get a specific flight booking by ID
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId);
    if (booking) {
     const flight = await Flight.findById(booking.flight_id);
      res.status(200).json({booking,flight});
    } else {
      res.status(404).json({ message: "Booking not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to update a specific flight booking by ID
const updateBooking = async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.bookingId,
      req.body,
      { new: true }
    );
    if (updatedBooking) {
      res.status(200).json(updatedBooking);
    } else {
      res.status(404).json({ message: "Booking not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to delete a specific flight booking by ID
const deleteBooking = async (req, res) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(
      req.params.bookingId
    );
    if (deletedBooking) {
      res.status(200).json({ message: "Booking deleted successfully" });
    } else {
      res.status(404).json({ message: "Booking not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
};

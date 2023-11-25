import Flight from "../models/flightM.js";

// Controller to handle fetching all flights
export const getAllFlights = async (req, res, next) => {
  try {
    const flights = await Flight.find();
    console.log(flights)
    res.status(200).json({ success: true, flights });
  } catch (error) {
    next(error);
  }
};

export const getFlightByDate = async (req, res, next) => {
  const { date } = req.params;
  console.log(date);

  try {
    const flight = await Flight.find({
      journeyDate: date
    });
    
    if (!flight) {
      return res.status(200).json({ success: false, message: 'Flight not foundd', flight : [] });
    }

    res.status(200).json({ success: true, flight });
  } catch (error) {
    next(error);
  }
};



// Controller to handle fetching a single flight by flightNumber
export const getFlightByNumber = async (req, res, next) => {
  const { flightNumber } = req.params;

  try {
    const flight = await Flight.findOne({ flightNumber });

    if (!flight) {
      return res.status(404).json({ success: false, message: 'Flight not found' });
    }

    res.status(200).json({ success: true, flight });
  } catch (error) {
    next(error);
  }
};

// Controller to handle creating a new flight
export const createFlight = async (req, res, next) => {
  try {
    const newFlight = await Flight.create(req.body);
    res.status(201).json({ success: true, flight: newFlight });
    console.log("flight create",newFlight)
  } catch (error) {
    next(error);
  }
};

// Controller to handle updating a flight by flightNumber
export const updateFlight = async (req, res, next) => {
  const { flightNumber } = req.params;

  try {
    const updatedFlight = await Flight.findOneAndUpdate(
      { flightNumber },
      req.body,
      { new: true }
    );

    if (!updatedFlight) {
      return res.status(404).json({ success: false, message: 'Flight not found' });
    }

    res.status(200).json({ success: true, flight: updatedFlight });
  } catch (error) {
    next(error);
  }
};

// Controller to handle deleting a flight by flightNumber
export const deleteFlight = async (req, res, next) => {
  const { flightNumber } = req.params;

  try {
    const deletedFlight = await Flight.findOneAndDelete({ flightNumber });

    if (!deletedFlight) {
      return res.status(404).json({ success: false, message: 'Flight not found' });
    }

    res.status(200).json({ success: true, message: 'Flight deleted successfully' });
  } catch (error) {
    next(error);
  }
};

import Flight from '../models/flightM.js'; // Replace with the actual path to your model file
import axios from "axios"
// Create a new flight
const createFlight = async (req, res) => {
  try {
    const {
      flightNumber,
      airline,
      flightLogo,
      departureAirport,
      arrivalAirport,
      departureTime,
      arrivalTime,
      capacity,
      price,
      flightClass,
      isDelayed,
    } = req.body;

    const flight = new Flight({
      flightNumber,
      airline,
      flightLogo,
      departureAirport,
      arrivalAirport,
      departureTime,
      arrivalTime,
      capacity,
      price,
      flightClass,
      isDelayed,
    });

    const savedFlight = await flight.save();
    res.status(201).json(savedFlight);
  } catch (error) {
    res.status(400).json({ error: 'Unable to create a new flight' });
  }
};

// Get all flights
const getAllFlights = async (req, res) => {
  try {
console.log("api is calling")


const options = {
  method: 'GET',
  url: 'https://booking-com13.p.rapidapi.com/flights/one-way',
  params: {
    location_from: 'Islamabad, Pakistan',
    location_to: 'Lahore, Pakistan',
    departure_date: '2023-11-04',
    page: '1',
    country_flag: 'us',
    number_of_stops: 'NonstopFlights'
  },
  headers: {
    'X-RapidAPI-Key': '9552e789a4msh265a3b8ee7647b2p16b33bjsn5517dcfc7bda',
    'X-RapidAPI-Host': 'booking-com13.p.rapidapi.com'
  }
};

    
    try {
      const response = await axios.request(options);
      console.log("Flight DAta", response.data);
      res.status(200).json( response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Unable to retrieve flights' });
    }
    // const flights = await Flight.find();
   
  } catch (error) {
    console.log("error",error)
    res.status(500).json({ error: 'Unable to retrieve flights' });
  }
};

// Get a specific flight by flightNumber
const getFlightByFlightNumber = async (req, res) => {
  try {
    const flight = await Flight.findOne({ flightNumber: req.params.flightNumber });
    if (!flight) {
      return res.status(404).json({ error: 'Flight not found' });
    }
    res.status(200).json(flight);
  } catch (error) {
    res.status(500).json({ error: 'Unable to retrieve the flight' });
  }
};

// Update a flight by flightNumber
const updateFlightByFlightNumber = async (req, res) => {
  try {
    const updatedFlight = await Flight.findOneAndUpdate(
      { flightNumber: req.params.flightNumber },
      req.body,
      { new: true }
    );

    if (!updatedFlight) {
      return res.status(404).json({ error: 'Flight not found' });
    }

    res.status(200).json(updatedFlight);
  } catch (error) {
    res.status(500).json({ error: 'Unable to update the flight' });
  }
};

// Delete a flight by flightNumber
const deleteFlightByFlightNumber = async (req, res) => {
  try {
    const deletedFlight = await Flight.findOneAndRemove({ flightNumber: req.params.flightNumber });

    if (!deletedFlight) {
      return res.status(404).json({ error: 'Flight not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete the flight' });
  }
};

export {
  createFlight,
  getAllFlights,
  getFlightByFlightNumber,
  updateFlightByFlightNumber,
  deleteFlightByFlightNumber,
};

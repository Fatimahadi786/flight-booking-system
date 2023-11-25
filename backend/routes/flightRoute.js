// flightRoute.js

import express from 'express';
import {
  createFlight,
  getAllFlights,
  getFlightByNumber, // Corrected function name
  updateFlight, // Corrected function name
  deleteFlight,
  getFlightByDate
} from '../controllers/flightC.js'; // Replace with the actual path to your controller file

const router = express.Router();

// Create a new flight
router.post('/', createFlight);

// Get all flights
router.get('/flights', getAllFlights);

// Get a specific flight by flight number
router.get('/flights/:flightNumber', getFlightByNumber);

router.get('/flight/:date', getFlightByDate);

// Update a flight by flight number
router.put('/flights/:flightNumber', updateFlight);

// Delete a flight by flight number
router.delete('/flights/:flightNumber', deleteFlight);

export default router;

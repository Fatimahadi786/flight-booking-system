// flightRoute.js

import express from 'express';
import {
  createFlight,
  getAllFlights,
  getFlightByNumber,
  updateFlight,
  deleteFlight, // Correct import syntax
  getFlightById,
  getFlightByDate
} from '../controllers/flightC.js';

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
router.get('/flights/:id', getFlightById);
// Delete a flight by flight number

export default router;

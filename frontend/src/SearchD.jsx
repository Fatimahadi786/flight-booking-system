import React from 'react';
import { Container, Typography, Select, TextField, Button } from '@mui/material';

function FlightBookingForm() {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Flight Booking System</Typography>
      <form>
        <div className="form-group">
          <label htmlFor="trip-type">Trip Type:</label>
          <Select id="trip-type" variant="outlined" fullWidth>
            <option value="one-way">One-way</option>
            <option value="round-trip">Round Trip</option>
            <option value="multi-city">Multiple City</option>
          </Select>
        </div>

        <div className="form-group">
          <label htmlFor="travelers">Travelers:</label>
          <div className="mui-input">
            <Button variant="outlined" className="decrease">-</Button>
            <TextField type="text" className="mui-input-field count" variant="outlined" value="1" />
            <Button variant="outlined" className="increase">+</Button>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="flight-class">Flight Class:</label>
          <Select id="flight-class" variant="outlined" fullWidth>
            <option value="economy">Economy</option>
            <option value="business">Business</option>
            <option value="first">First Class</option>
          </Select>
        </div>

        <div className="form-group">
          <label htmlFor="departure-from">Departure From:</label>
          <TextField type="text" id="departure-from" className="mui-input-field" variant="outlined" fullWidth />
        </div>

        <div className="form-group">
          <label htmlFor="destination">Destination:</label>
          <TextField type="text" id="destination" className="mui-input-field" variant="outlined" fullWidth />
        </div>

        <div className="form-group">
          <label htmlFor="departure-date">Departure Date:</label>
          <TextField type="date" id="departure-date" className="mui-input-field" variant="outlined" fullWidth />
        </div>

        <div className="form-group">
          <label htmlFor="return-date">Return Date:</label>
          <TextField type="date" id="return-date" className="mui-input-field" variant="outlined" fullWidth />
        </div>

        <Button variant="contained" color="primary" className="submit-button" fullWidth>
          Search Flights
        </Button>
      </form>
    </Container>
  );
}

export default FlightBookingForm;

import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Box } from '@mui/material';

function CreateFlightForm({ onSubmit }) {
  const initialFlightData = {
    id: '',
    airlineLogo: '',
    company: '',
    returnDate: '',
    origin: '',
    destination: '',
    journeyDate: '',
    journeyTime: '',
    arrivalTime: '',
    hour: '',
    seat: {
      economy: '',
      business: '',
    },
    seatAvailability: {
      economy: '',
      business: '',
    },
    fare: {
      economy: {
        adult: '',
        infant: '',
        child: '',
      },
      business: {
        adult: '',
        infant: '',
        child: '',
      },
    },
  };

  const [flightData, setFlightData] = useState(initialFlightData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFlightData({
      ...flightData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(flightData);
    setFlightData(initialFlightData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Create Flight
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="ID"
            name="id"
            value={flightData.id}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Airline Logo"
            name="airlineLogo"
            value={flightData.airlineLogo}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Company"
            name="company"
            value={flightData.company}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            label="Origin"
            name="origin"
            value={flightData.origin}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Destination"
            name="destination"
            value={flightData.destination}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Journey Date"
            name="journeyDate"
            value={flightData.journeyDate}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Return Date"
            name="returnDate"
            value={flightData.returnDate}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Journey Time"
            name="journeyTime"
            value={flightData.journeyTime}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Arrival Time"
            name="arrivalTime"
            value={flightData.arrivalTime}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Hour"
            name="hour"
            value={flightData.hour}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Economy Seats"
            name="seat.economy"
            value={flightData.seat.economy}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Business Seats"
            name="seat.business"
            value={flightData.seat.business}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Economy Seat Availability"
            name="seatAvailability.economy"
            value={flightData.seatAvailability.economy}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Business Seat Availability"
            name="seatAvailability.business"
            value={flightData.seatAvailability.business}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Adult Fare (Economy)"
            name="fare.economy.adult"
            value={flightData.fare.economy.adult}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Infant Fare (Economy)"
            name="fare.economy.infant"
            value={flightData.fare.economy.infant}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Child Fare (Economy)"
            name="fare.economy.child"
            value={flightData.fare.economy.child}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Adult Fare (Business)"
            name="fare.business.adult"
            value={flightData.fare.business.adult}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Infant Fare (Business)"
            name="fare.business.infant"
            value={flightData.fare.business.infant}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Child Fare (Business)"
            name="fare.business.child"
            value={flightData.fare.business.child}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
      </Grid>

      <Button type="submit" variant="contained" color="primary">
        Create Flight
      </Button>
    </form>
  );
}

export default CreateFlightForm;

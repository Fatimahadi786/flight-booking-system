import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Grid } from '@mui/material';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; // Import uuid

const FlightForm = () => {
  const [flightData, setFlightData] = useState({
    id: uuidv4(), // Generate a unique ID
    airlineLogo: '',
    company: '',
    origin: '',
    destination: '',
    fare: {
      business: { child: '', infant: '', adult: '' },
      economy: { child: '', infant: '', adult: '' },
    },
    hour: '',
    arrivalTime: '',
    journeyTime: '',
    arrivalAirport: '',
    journeyAirport: '',
    returnDate: '',
    journeyDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('fare.')) {
      const fareCategory = name.split('.')[1];
      const fareType = name.split('.')[2];

      setFlightData((prevData) => ({
        ...prevData,
        fare: {
          ...prevData.fare,
          [fareCategory]: {
            ...prevData.fare[fareCategory],
            [fareType]: value,
          },
        },
      }));
    } else {
      setFlightData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8800/api/flights', flightData);
      console.log('Flight created successfully:', response.data);
      console.log('Price:', response.data.flight.price);
      console.log('Flight Type:', response.data.flight.flightType);
    } catch (error) {
      console.error('Error creating flight:', error.message);
    }
  };
  

  return (
    <Container maxWidth="sm">
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Create a New Flight
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="ID"
              fullWidth
              name="id"
              value={flightData.id}
              onChange={handleChange}
              margin="normal"
              disabled // disable editing of ID
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Airline Logo"
              fullWidth
              name="airlineLogo"
              value={flightData.airlineLogo}
              onChange={handleChange}
              margin="normal"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Company"
              fullWidth
              name="company"
              value={flightData.company}
              onChange={handleChange}
              margin="normal"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Origin"
              fullWidth
              name="origin"
              value={flightData.origin}
              onChange={handleChange}
              margin="normal"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Destination"
              fullWidth
              name="destination"
              value={flightData.destination}
              onChange={handleChange}
              margin="normal"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Business Child Fare"
              fullWidth
              name="fare.business.child"
              value={flightData.fare.business.child}
              onChange={handleChange}
              margin="normal"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Business Infant Fare"
              fullWidth
              name="fare.business.infant"
              value={flightData.fare.business.infant}
              onChange={handleChange}
              margin="normal"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Business Adult Fare"
              fullWidth
              name="fare.business.adult"
              value={flightData.fare.business.adult}
              onChange={handleChange}
              margin="normal"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Economy Child Fare"
              fullWidth
              name="fare.economy.child"
              value={flightData.fare.economy.child}
              onChange={handleChange}
              margin="normal"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Economy Infant Fare"
              fullWidth
              name="fare.economy.infant"
              value={flightData.fare.economy.infant}
              onChange={handleChange}
              margin="normal"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Economy Adult Fare"
              fullWidth
              name="fare.economy.adult"
              value={flightData.fare.economy.adult}
              onChange={handleChange}
              margin="normal"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Hour"
              fullWidth
              name="hour"
              value={flightData.hour}
              onChange={handleChange}
              margin="normal"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Arrival Time"
              fullWidth
              name="arrivalTime"
              value={flightData.arrivalTime}
              onChange={handleChange}
              margin="normal"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Price"
              fullWidth
              name="price"
              value={flightData.price}
              onChange={handleChange}
              margin="normal"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Flight Type"
              fullWidth
              name="flightType"
              value={flightData.flightType}
              onChange={handleChange}
              margin="normal"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Journey Time"
              fullWidth
              name="journeyTime"
              value={flightData.journeyTime}
              onChange={handleChange}
              margin="normal"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Arrival Airport"
              fullWidth
              name="arrivalAirport"
              value={flightData.arrivalAirport}
              onChange={handleChange}
              margin="normal"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Journey Airport"
              fullWidth
              name="journeyAirport"
              value={flightData.journeyAirport}
              onChange={handleChange}
              margin="normal"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Return Date"
              fullWidth
              name="returnDate"
              value={flightData.returnDate}
              onChange={handleChange}
              margin="normal"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Journey Date"
              fullWidth
              name="journeyDate"
              value={flightData.journeyDate}
              onChange={handleChange}
              margin="normal"
            />
          </Grid>

        </Grid>

        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2, mb:4 }}>
          Create Flight
        </Button>
      </form>
    </Box>
  </Container>
  );
};

export default FlightForm;

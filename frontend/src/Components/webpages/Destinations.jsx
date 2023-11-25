import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
//import './bookingForm.css';

const FlightBookingForm = () => {
  const [formData, setFormData] = useState({
    flightType: 'oneWay',
    flightClass: 'economy',
    departureAirport: 'skardu',
    arrivalAirport: 'skardu',
    passengers: 1,
  });

  const [passengerInfo, setPassengerInfo] = useState(Array(1).fill({ fullName: '', age: '' }));
  const [showPassengerForm, setShowPassengerForm] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });

    if (e.target.name === 'passengers') {
      setPassengerInfo(Array(parseInt(value, 10)).fill({ fullName: '', age: '' }));
      setShowPassengerForm(true);
    }
  };

  const handlePassengerChange = (index, field, value) => {
    const updatedPassengerInfo = [...passengerInfo];
    updatedPassengerInfo[index] = {
      ...updatedPassengerInfo[index],
      [field]: value,
    };
    setPassengerInfo(updatedPassengerInfo);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle form submission
    console.log('Form Submitted:', { formData, passengerInfo });
  };

  const generatePassengerFields = () => {
    const fields = [];
    for (let i = 0; i < formData.passengers; i++) {
      fields.push(
        <div key={i}>
          <h3>Passenger {i + 1} Information</h3>
          <FormControl fullWidth>
            <TextField
              label="Full Name"
              type="text"
              value={passengerInfo[i]?.fullName || ''}
              onChange={(e) => handlePassengerChange(i, 'fullName', e.target.value)}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              label="Age"
              type="number"
              value={passengerInfo[i]?.age || ''}
              onChange={(e) => handlePassengerChange(i, 'age', e.target.value)}
              InputProps={{ inputProps: { min: 0 } }}
            />
          </FormControl>
          {/* Add more fields for passenger information */}
        </div>
      );
    }
    return fields;
  };

  return (
    <div className="form-container">
      <h2>Flight Booking Form</h2>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth>
          <InputLabel id="flightTypeLabel">Flight Type:</InputLabel>
          <Select
            labelId="flightTypeLabel"
            id="flightType"
            name="flightType"
            value={formData.flightType}
            onChange={handleChange}
          >
            <MenuItem value="oneWay">One-Way</MenuItem>
            <MenuItem value="roundWay">Round-Way</MenuItem>
          </Select>
        </FormControl>

        {/* Add other form fields (e.g., flight class, airports) here */}
        {/* ... */}

        <FormControl fullWidth>
          <InputLabel id="arrivalAirportLabel">Arrival Airport:</InputLabel>
          <Select
            labelId="arrivalAirportLabel"
            id="arrivalAirport"
            name="arrivalAirport"
            value={formData.arrivalAirport}
            onChange={handleChange}
          >
            <MenuItem value="skardu">Skardu - Skardu Airport (SKD)</MenuItem>
            <MenuItem value="gilgit">Gilgit - Gilgit Airport (GIT)</MenuItem>
            {/* Add more airports here */}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <TextField
            label="Passengers"
            type="number"
            name="passengers"
            value={formData.passengers}
            onChange={handleChange}
            InputProps={{ inputProps: { min: 1 } }}
          />
        </FormControl>

        {showPassengerForm && generatePassengerFields()}

        <Button type="submit" variant="contained" color="primary">
          Book Flight
        </Button>
      </form>
    </div>
  );
};

export default FlightBookingForm;
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Container, Typography, Grid } from '@mui/material';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    phoneNumber: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate the input based on your criteria
    if (name === 'name') {
      setFormErrors({
        ...formErrors,
        name: value === '' ? true : false,
      });
    }
    if (name === 'email') {
      // You can add email validation here
    }
    if (name === 'phoneNumber') {
      // You can add phone number validation here
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form before submission
    const newFormErrors = {
      name: formData.name === '',
      email: formData.email === '',
      phoneNumber: formData.phoneNumber === '',
    };

    // Check if any validation errors exist
    if (Object.values(newFormErrors).some((error) => error)) {
      setFormErrors(newFormErrors);
      return;
    }

    // Form is valid, proceed with submission
    console.log(formData);
    // Reset the form fields and errors
    setFormData({
      name: '',
      email: '',
      phoneNumber: '',
      message: '',
    });
    setFormErrors({
      name: false,
      email: false,
      phoneNumber: false,
    });
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Flight Booking Inquiry
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={formErrors.name}
              helperText={formErrors.name && 'Name is required'}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={formErrors.email}
              helperText={formErrors.email && 'Invalid email'}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              error={formErrors.phoneNumber}
              helperText={formErrors.phoneNumber && 'Phone number is required'}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
            required
              fullWidth
              label="Message"
              name="message"
              multiline
              rows={4}
              value={formData.message}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default ContactForm;

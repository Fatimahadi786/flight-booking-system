import React, { useEffect, useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Grid, TextField, Checkbox, CardContent } from '@mui/material';
import { Field, useFormikContext } from 'formik';
import { MenuItem } from '@material-ui/core';
import Select from '@mui/material/Select';

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import './FlightInfo.css'

// Define sample flight data

import FLIGHT from '../../../Images/flight.jpg';
import axios from 'axios';



const backendApiEndpoint = 'http://localhost:8800/api/flights';





const FlightDetails = ({ formData, updateFormData, nextStep }) => {
  const formik = useFormikContext();
  const [selectedFlightIndex, setSelectedFlightIndex] = useState(null);
  const [selectedFlightData, setSelectedFlightData] = useState(null);
  const [selectedType , setSelectType] = useState('business')
  const FlightCustomerDetail = formik.values;
  const [data, setData] = useState([]);

  // api  intergrateion 

  async function getFlightData() {
    try {
      const response = await axios.get(`${backendApiEndpoint}/flight/${FlightCustomerDetail.journeyDate}`);
      setData(response.data.flight);
    } catch (error) {
      console.error('Error retrieving flight data:', error.message);
    }
  }


  useEffect(() => {
    getFlightData();
  }, [])

  const flightdata = data.filter((item) => {
    return (
      item.origin === FlightCustomerDetail.origin &&
      item.destination === FlightCustomerDetail.destination
    );
  });
  const handleCheck = (flightIndex, value) => {
    setSelectType(value)

    setSelectedFlightIndex(flightIndex);

    const selectedFlight = data.find(element => element.id === flightIndex); // Use data[flightIndex] directly
    // setSelectedFlightIndex(flightIndex);
    setSelectedFlightData(selectedFlight); //
    const newData = {
      airline: selectedFlight?.company,
      flight_id: selectedFlight?._id,
      cabin: value,
      childFare: value === 'business' ? selectedFlight?.fare?.business?.child : selectedFlight?.fare.economy.child,
      adultFare: value === 'business' ? selectedFlight?.fare.business.adult : selectedFlight?.fare.economy.adult
    };

    updateFormData(newData);
    // // nextStep();
    // console.log("fff", selectedFlight, formData);
  };
  return (
    <div>
      {flightdata.length > 0 ? flightdata.map((flight, index) => (
        <Accordion className='accordion' key={index}>
          <AccordionSummary style={{display:'flex', justifyContent:'space-between'}}>
            <CardMedia
              component="img"
              alt="FlightLogo"
              height="140"
              style={{
                maxWidth: '130px',
              }}
              className='FlightLogo'
              image={flight.airlineLogo} // Make sure these paths are correct
            />
            <Typography className='text1' variant="body1">
              {flight.timing} {flight.departure}
            </Typography>
            <div>
              <CardMedia
                component="img"
                alt="Sample Image"
                height="150"
                style={{ maxWidth: '100px' }}
                image={FLIGHT} // Make sure this path is correct
              />
              <Typography variant="body1">{flight.origin}</Typography>
            </div>
            <Typography variant="body1">
              {flight.destination} {flight.dtiming}
            </Typography>

            <Typography variant="body1">{flight.fare.business.adult}</Typography>

            <Card>
              <CardContent>

                <Typography variant="h5" component="div">
                  Business
                </Typography>
                <Typography color="text.secondary">
                  Adult
                </Typography>
                <Typography variant="body2">
                  {flight.fare.business.adult}
                </Typography>
                <Typography color="text.secondary">
                  Child
                </Typography>

                <Typography variant="body2">
                  {flight.fare.business.child}
                </Typography>
              </CardContent>

            </Card>
            <Card style={{ marginLeft: 10 }}>
              <CardContent>

                <Typography variant="h5" component="div">
                  Economy
                </Typography>
                <Typography color="text.secondary">
                  Adul
                </Typography>
                <Typography variant="body2">
                  {flight.fare.economy.adult}
                </Typography>
                <Typography color="text.secondary">
                  Child
                </Typography>
                <Typography variant="body2">
                  {flight.fare.economy.child}
                </Typography>
              </CardContent>

            </Card>
          </AccordionSummary>
          <AccordionDetails>
            <Card>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <Field
                    name="company"
                    as={TextField}
                    label="Airline"
                    variant="outlined"
                    value={formData.airline}
                    fullWidth={true}
                    readOnly={true}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Field
                    name="code"
                    as={TextField}
                    label="Code"
                    variant="outlined"
                    value={formData.flight_id}
                    fullWidth={true}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Field
                    name="cabin"
                    as={Select}
                    label="Class"
                    variant="outlined"
                    value={selectedType}
                    fullWidth={true}
                    onChange={(e) => handleCheck(flight.id, e.target.value)} // Pass the event
                  >
                    <MenuItem  value="economy">Economy</MenuItem>
                    <MenuItem value="business" >Business</MenuItem>
                  </Field>
                </Grid>
                {/* when user change the data then below value should be change */}

                <Grid item xs={4}>
                  <Field
                    name="adultFare"
                    as={TextField}
                    label="Adult Fare"
                    variant="outlined"
                    fullWidth={true}
                    value={ selectedType === 'business'
                        ? selectedFlightData?.fare.business.adult
                        : selectedFlightData?.fare.economy.adult
                    }
                  />
                </Grid>
                <Grid item xs={4}>
                  <Field
                    name="childFare"
                    as={TextField}
                    label="Children Fare"
                    variant="outlined"
                    fullWidth={true}
                    value={
                      selectedType === 'business'
                        ? selectedFlightData?.fare.business.child
                        : selectedFlightData?.fare.economy.child
                    }
                  />
                </Grid>
                <Grid item xs={4}>
                  <Field
                    name="infantFare"
                    as={TextField}
                    label="Infant Fare"
                    variant="outlined"
                    fullWidth={true}
                    value={
                      selectedType === 'business'
                        ? selectedFlightData?.fare.business.child
                        : selectedFlightData?.fare.economy.child
                    }
                  />
                </Grid>
              </Grid>

              <br></br>
            </Card>

          </AccordionDetails>
        </Accordion>
      )) :
        <Typography className='text1' variant="body1">
          No Flights Avaiable
        </Typography>
      }
    </div>
  );
};

export default FlightDetails;

import {
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import useStyles from '../View/styles/FormWizardStyles';
import { formDefaultValues } from "../utils/constants";
import BookingInfo from "./steps/BookingInfo";
import ConfirmBooking from "./steps/Confirm Or Cancel Booking";
import FlightInfo from "./steps/FlightInfo";
import PassengerInfo from "./steps/PassengerInfo";
import ReviewBooking from "./steps/ReviewBooking";
import axios from "axios";
function getSteps() {
  return [
    "Booking Information",
    "Flight Information",
    "Passenger Information",
    "Review Your Booking",
    "Confirm Booking",
  ];
}

function getStepContent(step, formData, updateFormData, nextStep) {
  switch (step) {
    case 0:
      return <BookingInfo formData={formData} updateFormData={updateFormData} nextStep={nextStep} />;
    // Include other cases for remaining steps
    case 1:
      return <FlightInfo formData={formData} updateFormData={updateFormData} nextStep={nextStep} />;
    case 2:
      return <PassengerInfo formData={formData} updateFormData={updateFormData} nextStep={nextStep} />;
    case 3:
      return <ReviewBooking formData={formData} updateFormData={updateFormData} nextStep={nextStep} />;
    case 4:
      return <ConfirmBooking formData={formData} updateFormData={updateFormData} nextStep={nextStep} />;
    default:
      return "unknown step";
  }
}



const LinearStepper = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const steps = getSteps();
  const [formData, setFormData] = useState({}); // Example state to hold form data
  console.log(formData)

  async function submitBooking(values, formValue) {
    console.log("dataincom", values, formValue)
  
    const newData = {
      flightType: formValue.flightType,
      flight_id: formValue.flight_id,
      company: formValue.airline,
      origin: values.origin,
      destination: values.destination,
      journeyDate: values.journeyDate,
      returnDate: values.returnDate,
      journeyTime: formValue.journeyTime,
      arrivalTime: formValue.arrivalTime,
      hour: formValue.hour,
      adultFare: formValue.adultFare,
      childFare: formValue.childFare,
      adults: formValue.adults,
      children: formValue.children, 
      flightClass:formValue.cabin,
      pnrNumber :values.pnrNumber,
      passengers: [
        ...values.adults
          .filter((item) => item.firstName !== "")
          .map((item) => ({
            fullName: item.firstName,
            age: item?.age ?? 0,  // Provide the actual age from your form
            gender: item.gender,
            email: item.email,
            phone: item.phoneNumber,
          })),
        ...values.children
          .filter((item) => item.firstName !== "")
          .map((item) => ({
            fullName: item.firstName,
            age: item?.age ?? 0,  // Provide the actual age from your form
            gender: item.gender,
            email: item.email,
            phone: item.phoneNumber,
          })),
      ],
    };
    
    
    const response = await axios.post(`http://localhost:8800/api/booking/bookings`, newData);
    if(response.status === 201)
    {
      nextStep();
    }
    return response;
  }




  // Function to update form data
  const updateFormData = (newData) => {
    setFormData({ ...formData, ...newData });
  };

  // Function to proceed to the next step
  const nextStep = () => {
    setActiveStep(activeStep + 1);
    setSkippedSteps(
      skippedSteps.filter((skipItem) => skipItem !== activeStep)
    );
  };

  const isStepOptional = (step) => {
    // return step === 1 || step === 2;
  };

  const isStepSkipped = (step) => {
    return skippedSteps.includes(step);
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    setSkippedSteps(
      skippedSteps.filter((skipItem) => skipItem !== activeStep)
    );
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSkip = () => {
    if (!isStepSkipped(activeStep)) {
      setSkippedSteps([...skippedSteps, activeStep]);
    }
    setActiveStep(activeStep + 1);
  };

  return (
    <div>
      <Typography component="h1" variant="h4" align="center">

        Flight Booking System <br></br> (Rinor)
      </Typography>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        className={classes.stepper}
      >
        {steps.map((step, index) => {
          const labelProps = {};
          const stepProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography
                variant="caption"
                align="center"
                style={{ display: "block" }}
              >
                optional
              </Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step {...stepProps} key={index}>
              <StepLabel {...labelProps}>{step}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      <React.Fragment>
        {activeStep === steps.length ? (
          <Typography variant="h3" align="center">
            Thanku 
            your ticket is comfirm 
          </Typography>
        ) : (
          <>
            <Formik
              initialValues={formDefaultValues}
              // validationSchema={formSchema}
              onSubmit={async (values, { resetForm }) => {
                const reponse = await submitBooking(values, formData)
                resetForm();
              }}
            >
              {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  {getStepContent(activeStep, formData, updateFormData, nextStep)}

                  {isStepOptional(activeStep) && (
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="primary"
                      onClick={handleSkip}
                    >
                      Skip
                    </Button>
                  )}
                  <div className={classes.wrapper}>
                    <Button
                      className={classes.button}
                      disabled={activeStep === 0}
                      onClick={handleBack}
                    >
                      Back
                    </Button>
                    {
                      activeStep === steps.length - 1 ?
                        <button
                          type="submit"
                        >
                          Submit
                        </button>
                        :
                        <Button
                          className={classes.button}
                          variant="contained"
                          color="primary"
                          onClick={handleNext}
                          type="button"
                        >
                          Next
                        </Button>
                    }
                  </div>

                </Form>
              )}
            </Formik>
          </>
        )}
      </React.Fragment>
    </div>
  );
};

export default LinearStepper;

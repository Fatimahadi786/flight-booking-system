import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import DestinationList from './Components/webpages/Destinations';
import Registration from './Components/webpages/SignUp';
import Loginform from './Components/webpages/Login';
import AboutPage from './Components/webpages/About';
import ContactForm from './Components/webpages/Contact';
import LinearStepper from './Components/FlightBooking/LinearStepper/LinearStepper';
import PDF from './Components/FlightBooking/LinearStepper/Components/pdf';


const App = () => {
  return (
    <div>
    <div>
   
    <Router>
      <Routes>
        <Route path="/" element={<Navbar/>} />
        <Route path="/booking" element={<LinearStepper/>} />
        <Route path="About" element={<AboutPage />} />
        <Route path="destinations" element={<DestinationList />} />
        <Route path="contact" element={<ContactForm />} />
        <Route path="Login" element={<Loginform />} />
        <Route path="signUp" element={<Registration />} />
        <Route path="/pdf/:id" element={<PDF />} />
      </Routes>
    </Router>
    </div>
    
         </div>
  );
};

export default App;

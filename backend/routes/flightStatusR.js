// FlightNotificationRoute.js
import React, { useState } from 'react';
import FlightController from './FlightController';

function FlightNotificationRoute() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const flightController = new FlightController();

  const handleSendNotification = () => {
    flightController.setMobileNumber(mobileNumber);
    flightController.setEmail(email);
    flightController.setStatus(status);
    flightController.sendNotification();
  };

  return (
    <div>
      <h1>Flight Notification System</h1>
      <label>
        Mobile Number:
        <input type="text" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
      </label>
      <br />
      <label>
        Email:
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label>
        Status (cancel/delay):
        <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} />
      </label>
      <br />
      <button onClick={handleSendNotification}>Send Notification</button>
    </div>
  );
}

export default FlightNotificationRoute;

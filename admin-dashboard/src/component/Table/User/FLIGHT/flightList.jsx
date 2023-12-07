import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function FlightList() {
  const [flights, setFlights] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const navigation = useNavigate();

  const apiUrl = 'http://localhost:8800/api/flights/flights';

  useEffect(() => {
    getFlights();
  }, []);

  const getFlights = async () => {
    try {
      const response = await axios.get(apiUrl, { withCredentials: true });
      const flightData = response.data;

      if (Array.isArray(flightData.flights)) {
        setFlights(flightData.flights);
      } else {
        setFlights([]);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching flights:', error);
    }
  };






  const getRowId = (row) => row._id;

  const columns = [
    { field: '_id', headerName: 'ID', flex: 1 },
    { field: 'journeyAirport', headerName: 'Departure Airport', flex: 1 },
    { field: 'arrivalAirport', headerName: 'Arrival Airport', flex: 1 },
    { field: 'journeyTime', headerName: 'Departure Time', flex: 1 },
    { field: 'arrivalTime', headerName: 'Arrival Time', flex: 1 },
    { field: 'hour', headerName: 'Duration (hours)', flex: 1 },
    { field: 'airlineLogo', headerName: 'Airline Logo', flex: 1 },
    { field: 'company', headerName: 'Company', flex: 1 },
    { field: 'origin', headerName: 'Origin', flex: 1 },
    { field: 'destination', headerName: 'Destination', flex: 1 },
    { field: 'returnDate', headerName: 'Return Date', flex: 1 },
    { field: 'journeyDate', headerName: 'Journey Date', flex: 1 },

    // ... other fields
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <div>
          <Link to={`/portal/flight-view/${params.id}`} style={{ marginRight: '8px' }}>
            Flight View
          </Link>
          <Link to={`/portal/flight-edit/${params.id}`}>
            Flight Edit
          </Link>

        </div>
      ),
    },
  ];


  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Flight List</h1>
      </div>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={flights}
          columns={columns}
          pageSize={5}
          loading={isLoading}
          getRowId={getRowId}
        />
      </div>
    </>
  );
}

export default FlightList;

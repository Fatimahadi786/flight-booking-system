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

  const handleView = (id) => {
    console.log(`Viewing flight with ID: ${id}`);
    navigation(`/view/${id}`);
  };

  const handleEdit = (id) => {
    console.log(`Editing flight with ID: ${id}`);
    navigation(`/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete the flight?');
      if (confirmDelete) {
        await axios.delete(`http://localhost:8800/api/flights/${id}`, { withCredentials: true });
        getFlights();
      }
    } catch (error) {
      console.error('Error deleting flight:', error);
    }
  };
  

  const getRowId = (row) => row._id;

  const columns = [
    { field: '_id', headerName: 'ID', flex: 1 },
    { field: 'flightType', headerName: 'Flight Type', flex: 1 },
    
    { field: 'journeyAirport', headerName: 'Departure Airport', flex: 1 },
    { field: 'arrivalAirport', headerName: 'Arrival Airport', flex: 1 },
    { field: 'journeyTime', headerName: 'Departure Time', flex: 1 },
    { field: 'arrivalTime', headerName: 'Arrival Time', flex: 1 },
    { field: 'hour', headerName: 'Duration (hours)', flex: 1 },
    { field: 'price', headerName: 'Price', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <div>
        <button onClick={() => handleView(params.row._id)} className='btn btn-info btn-sm mr-1'>
          View
        </button>
        <Link to={`/portal/addFlight/${params.row._id}`} className='btn btn-info btn-sm mr-1'>Edit</Link>
        <button onClick={() => handleDelete(params.row._id)} className='btn btn-danger btn-sm mr-1'>
          Delete
        </button>
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

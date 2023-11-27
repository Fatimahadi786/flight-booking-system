import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CircularProgress, Typography } from '@mui/material';
import axios from 'axios';

function FlightView() {
    const params = useParams();
    const [flightDetails, setFlightDetails] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        // On Load
        getFlightDetails(params.id);
    }, [params.id]);

    let getFlightDetails = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8800/api/flights/flights/${id}`, { withCredentials: true });
            setFlightDetails(response.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <Card style={{ width: '50%', padding: '20px', textAlign: 'center', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <CardContent>

                    {isLoading ? (
                        <div style={{ textAlign: 'center' }}>
                            <CircularProgress />
                        </div>
                    ) : (
                        <div>
                            <Typography variant="h4" component="div" style={{ fontWeight: 'bold', marginBottom: '20px' }}>
                                {flightDetails.flightNumber}
                            </Typography>
                            <Typography style={{ fontSize: '1.2em', fontWeight: 'bold', marginBottom: '10px' }}>
                                Destination: {flightDetails.destination}
                            </Typography>
                            <Typography style={{ fontSize: '1.2em', fontWeight: 'bold', marginBottom: '10px' }}>
                                Departure Date: {flightDetails.departureDate}
                            </Typography>
                            {/* Add more details as needed */}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

export default FlightView;

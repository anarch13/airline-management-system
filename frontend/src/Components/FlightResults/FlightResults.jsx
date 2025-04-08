import React from 'react';
import { useLocation } from 'react-router-dom';
import { Paper, Typography, Grid } from '@mui/material';

const FlightResults = () => {
    const { state } = useLocation();
    const flights = state?.flights || [];

    return (
        <div style={{ padding: '2rem' }}>
            <Typography variant="h4">Matching Flights</Typography>
            {flights.map((flight, index) => (
                <Paper key={index} style={{ margin: '1rem 0', padding: '1rem' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography><strong>Flight No:</strong> {flight.flightno}</Typography>
                            <Typography><strong>Source:</strong> {flight.source}</Typography>
                            <Typography><strong>Destination:</strong> {flight.destination}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography><strong>Date:</strong> {flight.date}</Typography>
                            <Typography><strong>Time:</strong> {flight.start_time} - {flight.end_time}</Typography>
                            <Typography><strong>Seats Left:</strong> {flight.remaining_seats}</Typography>
                            <Typography><strong>Price:</strong> ₹{flight.price}</Typography>
                        </Grid>
                    </Grid>
                </Paper>
            ))}
        </div>
    );
};

export default FlightResults;

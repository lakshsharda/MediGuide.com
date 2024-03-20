// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

// Initialize Express.js
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Define API endpoint for finding nearby hospitals
app.post('/nearby-hospitals', async (req, res) => {
    try {
        // Extract user's location from the request body
        const { address } = req.body;

        // Use a geocoding service to convert address to coordinates
        const geoResponse = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: address,
                key: 'YOUR_API_KEY' // Replace with your actual API key
            }
        });

        // Extract latitude and longitude from the geocoding response
        const { lat, lng } = geoResponse.data.results[0].geometry.location;

        // Query your hospital database to find nearby hospitals based on user's location
        // Replace this with your actual database query logic

        // Dummy response for illustration purposes
        const nearbyHospitals = [
            { name: 'Hospital A', address: 'Address A', distance: '2 km' },
            { name: 'Hospital B', address: 'Address B', distance: '3 km' },
            { name: 'Hospital C', address: 'Address C', distance: '4 km' }
        ];

        // Send the nearby hospitals as JSON response
        res.json(nearbyHospitals);
    } catch (error) {
        console.error('Error finding nearby hospitals:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

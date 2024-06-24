const express = require('express');
const fetch = require('node-fetch');
const cron = require('node-cron');
const cors = require('cors');

const createApp = (weatherData = {}) => {
    const app = express();
    const PORT = 3001;
    const API_KEY = '';
    const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';
    const zipCodes = ['10001', '94103'];
    const weatherDataList=weatherData;


    app.use(cors());

    const fetchWeatherInstance = async (zipCode, res) => {
        const url = `${BASE_URL}?zip=${zipCode}&appid=${API_KEY}&units=metric`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Weather data not available');

            const data = await response.json();
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    // Endpoint to get weather for a specific zip code
    app.get('/weather/:zipCode', async (req, res) => {
        const zipCode = req.params.zipCode;
        await fetchWeatherInstance(zipCode, res);
    });

    // Endpoint to get polled weather data
    app.get('/polled-weather/:zipCode', async (req, res) => {
        const zipCode = req.params.zipCode;
        const data = weatherDataList[zipCode];

        if (data) {
            res.json(data);
        } else {
            zipCodes.push(zipCode);
            await fetchWeatherInstance(zipCode, res);
        }
    });

    // Function to fetch and store weather data every 10 minutes
    const fetchWeatherData = async () => {
        for (const zipCode of zipCodes) {
            try {
                const url = `${BASE_URL}?zip=${zipCode}&appid=${API_KEY}&units=metric`;
                const response = await fetch(url);
                if (!response.ok) throw new Error('Weather data not available');
                const data = await response.json();
                weatherDataList[zipCode] = data;
            } catch (error) {
                console.error(`Error fetching data for ${zipCode}:`, error.message);
            }
        }
    };

    // Schedule the task to run every 10 minutes
    cron.schedule('*/10 * * * *', fetchWeatherData);

    // Start the server if not in test mode
    if (require.main === module) {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            // Initial fetch of weather data
            fetchWeatherData();
        });
    }

    return app;
};

module.exports = createApp({});

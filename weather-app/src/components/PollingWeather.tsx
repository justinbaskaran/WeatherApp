import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PollingWeather: React.FC = () => {
    const [zipCode, setZipCode] = useState('');
    const [weatherData, setWeatherData] = useState<any>(null);
    const [error, setError] = useState<string>('');

    const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setZipCode(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:3001/polled-weather/${zipCode}`);
            setWeatherData(response.data);
            setError('');
        } catch (error) {
            setError('Error fetching weather data, your zip code has been added to the que, so when the polling job refereshes, you will see results');
            setWeatherData(null);
        }
    };

    return (
        <div>
            <h2>Weather Polling</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={zipCode}
                    onChange={handleZipCodeChange}
                    placeholder="Enter zip code"
                />
                <button type="submit">Get Weather</button>
            </form>
            {error && <p>{error}</p>}
            {weatherData && (
                <div>
                    <p>Temperature: {weatherData.main.temp} °C</p>
                    <p>Humidity: {weatherData.main.humidity} %</p>
                    <p>Condition: {weatherData.weather[0].description}</p>
                </div>
            )}
        </div>
    );
};

export default PollingWeather;
import React, { useState } from 'react';
import axios from 'axios';

const Weather: React.FC = () => {
    const [zipCode, setZipCode] = useState<string>('');
    const [weatherData, setWeatherData] = useState<any>(null);
    const [error, setError] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:3001/weather/${zipCode}`);
            setWeatherData(response.data);
            setError('');
        } catch (error) {
            setError('Error fetching weather data');
            setWeatherData(null);
        }
    };

    return (
        <div>
            <h2>Enter Zip Code</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} placeholder="Enter zip code" />
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

export default Weather;


import React from 'react';
import './App.css';
import PollingWeather from './components/PollingWeather';
import Weather from './components/Weather';

const App: React.FC = () => {
    return (
        <div className="App">
            <Weather />
            <PollingWeather />
        </div>
    );
};

export default App;
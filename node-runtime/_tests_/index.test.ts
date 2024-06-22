import  {createApp}  from 'index';
import fetch, { Response } from 'node-fetch';

jest.mock('node-fetch');

describe('fetchWeatherInstance', () => {
    test('should fetch weather data for a given zip code', async () => {
        const zipCode = '10001';
        const mockResponse = {
            ok: true,
            json: jest.fn().mockResolvedValue({ /* Mocked weather data */ }),
        };
        (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue(mockResponse as any);

        const mockRes = {
            json: jest.fn(),
            status: jest.fn(),
        };

        await createApp({}).fetchWeatherInstance(zipCode, mockRes as any);

        expect(fetch).toBeCalledWith(`http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=e271e85f2c846d76b95770d7f2d1f60e&units=metric`);
        expect(mockRes.json).toBeCalledWith({ /* Mocked weather data */ });
        expect(mockRes.status).not.toBeCalled();
    });

    test('should handle error when fetching weather data', async () => {
        const zipCode = '10001';
        const mockResponse = {
            ok: false,
        };
        (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue(mockResponse as any);

        const mockRes = {
            json: jest.fn(),
            status: jest.fn(),
        };

        await createApp({}).fetchWeatherInstance(zipCode, mockRes as any);

        expect(fetch).toBeCalledWith(`http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=e271e85f2c846d76b95770d7f2d1f60e&units=metric`);
        expect(mockRes.json).not.toBeCalled();
        expect(mockRes.status).toBeCalledWith(500);
    });
});

describe('app.get(\'/weather/:zipCode\')', () => {
    test('should call fetchWeatherInstance with correct parameters', async () => {
        const zipCode = '10001';
        const mockReq = {
            params: { zipCode },
        };
        const mockRes = {
            json: jest.fn(),
        };

        await createApp({}).get('/weather/:zipCode')(mockReq as any, mockRes as any);

        expect(mockRes.json).toHaveBeenCalled(); // Assuming fetchWeatherInstance will respond with JSON
        expect(mockRes.json).toHaveBeenCalledWith(/* Mocked weather data */);
    });
});

describe('app.get(\'/polled-weather/:zipCode\')', () => {
    test('should call fetchWeatherInstance with correct parameters', async () => {
        const zipCode = '10001';
        const mockReq = {
            params: { zipCode },
        };
        const mockRes = {
            json: jest.fn(),
        };

        await createApp({}).get('/polled-weather/:zipCode')(mockReq as any, mockRes as any);

        expect(mockRes.json).toHaveBeenCalled(); // Assuming fetchWeatherInstance will respond with JSON
        expect(mockRes.json).toHaveBeenCalledWith(/* Mocked weather data */);
    });
});

describe('fetchWeatherData', () => {
    test('should fetch weather data for all zip codes', async () => {
        const zipCodes = ['10001', '94103'];
        const mockResponse = {
            ok: true,
            json: jest.fn().mockResolvedValue({ /* Mocked weather data */ }),
        };
        (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue(mockResponse as any);

        await createApp({}).fetchWeatherData(zipCodes);

        expect(fetch).toHaveBeenCalledTimes(2); // Assuming two zip codes in the array
        expect(fetch).toHaveBeenCalledWith(`http://api.openweathermap.org/data/2.5/weather?zip=10001&appid=e271e85f2c846d76b95770d7f2d1f60e&units=metric`);
        expect(fetch).toHaveBeenCalledWith(`http://api.openweathermap.org/data/2.5/weather?zip=94103&appid=e271e85f2c846d76b95770d7f2d1f60e&units=metric`);
    });

    test('should handle error when fetching weather data', async () => {
        const zipCodes = ['10001', '94103'];
        const mockResponse = {
            ok: false,
        };
        (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue(mockResponse as any);

        await createApp({}).fetchWeatherData(zipCodes);
    });
});

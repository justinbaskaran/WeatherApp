## Instructions on how to run


### In the `node-runtime/index.js` put your own openweatherapi.com API Token

### Caution: Don't have any programs running on port 3000 or 3001. Generally these are free, but  its still of concern


### Open two terminals (one for frontend, one for backend)

### In terminal one:
- Navigate to the root of this project, then enter `node-runtime`
- type `npm install` (I assume you have nodeJS & ngx installed)
- type `npm start` 


### In terminal two:
- Navigate to the root of this project, then enter `react-app/weather-app/`
- type `npm install` (I assume you have nodeJS & ngx installed)
- type `npm start` 


## Once both terminals are up and running: `localhost:3000` and you should be able to run the features
At this point, the app should launch the dev environment for both the front-end and back-end. 

To run tests, in a third terminal, navigate to `node-runtime/tests/weather.test.js` and type `test` in the CLI.



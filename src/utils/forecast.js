const request = require('postman-request');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHERSTACK_ACCESS_KEY}&query=${longitude},${latitude}&units=f`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback('Unable to connect to weather service');
    } else if (body.error) {
      callback('Unable to find location');
    } else {
      const weather = body.current;
      const temperature = weather.temperature;
      const feelslike = weather.feelslike;
      const weather_descriptions = weather.weather_descriptions[0];

      callback(undefined, {
        temperature,
        feelslike,
        weather_descriptions,
      });
    }
  });
};

module.exports = forecast;

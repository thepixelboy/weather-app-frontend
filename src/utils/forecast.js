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
      const weather_icons = weather.weather_icons[0];
      const weather_descriptions = weather.weather_descriptions[0];
      const humidity = weather.humidity;
      const feelslike = weather.feelslike;

      callback(undefined, {
        temperature,
        weather_icons,
        weather_descriptions,
        humidity,
        feelslike,
      });
    }
  });
};

module.exports = forecast;

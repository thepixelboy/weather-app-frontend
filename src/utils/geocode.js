const request = require('postman-request');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${process.env.MAPBOX_ACCESS_TOKEN}&limit=1`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback('Unable to connect to location services');
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try another search.');
    } else {
      const mapbox = body.features[0];

      callback(undefined, {
        latitude: mapbox.center[1],
        longitude: mapbox.center[0],
        location: mapbox.place_name,
      });
    }
  });
};

module.exports = geocode;

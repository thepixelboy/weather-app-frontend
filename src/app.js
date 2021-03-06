const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'John Doe',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'John Doe',
    image: 'imessage',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'John Doe',
    helpText: 'This is some helpful information.',
  });
});

app.get('/weather', (req, res) => {
  const address = req.query.address;

  if (!address) {
    return res.send({
      error: 'You must provide an address',
    });
  }

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(
      latitude,
      longitude,
      (
        error,
        {
          weather_descriptions,
          temperature,
          feelslike,
          humidity,
          weather_icons,
        } = {}
      ) => {
        if (error) {
          return res.send({ error });
        }

        res.send([
          {
            address: address,
            location: location,
            temperature: temperature,
            icon: weather_icons,
            forecast: weather_descriptions,
            humidity: humidity,
            feelslike: feelslike,
          },
        ]);
      }
    );
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404 Error',
    error: 'Help article not found',
    name: 'John Doe',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 Error',
    error: 'Page not found',
    name: 'John Doe',
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});

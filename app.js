// These import necessary modules and set some initial variables
require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const convert = require('xml-js');
const rateLimit = require('express-rate-limit');
var cors = require('cors');
const app = express();
const port = 3000;
const axios = require('axios');

// Allow CORS from any origin
app.use(cors());

// Routes

// Test route, visit localhost:3000 to confirm it's working
// should show 'Hello World!' in the browser
app.get('/', (req, res) => res.send('Hello World!'));

// Our WeatherAPI relay route!
app.get('/onecall', async (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://weatherapi-com.p.rapidapi.com/current.json',
    params: { q: '41.3874,2.1686' },
    headers: {
      'X-RapidAPI-Key': process.env.WEATHER_API_KEY,
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
    const json = response.data;
    return res.json({
      success: true,
      json,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// This spins up our sever and generates logs for us to use.
// Any console.log statements you use in node for debugging will show up in your
// terminal, not in the browser console!
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

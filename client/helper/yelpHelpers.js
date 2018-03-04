const axios = require('axios');

const googleAPI = 'https://maps.googleapis.com/maps/api/place/';
const GOOGLE_API_KEY = require('../config/config.js');

const getBusinessInfo = (businessRef, cb) => {
  axios.get(`${googleAPI}details/json?reference=${businessRef}&key=${GOOGLE_API_KEY}`)
    .then(response => cb(response))
    .catch(error => console.log('error:', error));
};

const searchBusinesses = (query, location, cb) => {
  axios.get(`${googleAPI}textsearch/json?query=${query}&${location}&key=${GOOGLE_API_KEY}`)
    .then(response => cb(response))
    .catch(error => console.log('error:', error));
};

const getPhotos = ref => `${googleAPI}photo?maxwidth=175&photoreference=${ref}&key=${GOOGLE_API_KEY}`;

module.exports = {
  getBusinessInfo,
  searchBusinesses,
  getPhotos,
};

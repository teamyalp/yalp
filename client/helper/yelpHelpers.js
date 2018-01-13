const axios = require('axios');
const googleAPI = `https://maps.googleapis.com/maps/api/place/`;
const location = `location=37.7749,-122.4194`;
const GOOGLE_API_KEY = 'AIzaSyAydLGe6HgJ7uE8mDbqj8v-ccMMHnV9XEw'

const getBusinessInfo = (businessRef, cb) => {
  axios.get(`${googleAPI}details/json?reference=${businessRef}&key=${GOOGLE_API_KEY}`)
    .then(response => cb(response))
    .catch(error => console.log('error:', error))
}

const searchBusinesses = (query, cb) => {
  axios.get(`${googleAPI}textsearch/json?query=${query}&${location}&key=${GOOGLE_API_KEY}`)
    .then(response => cb(response))
    .catch(error => console.log('error:', error))
}

const getPhoto = (ref, cb) => {
    axios.get(`${googleAPI}photo?maxwidth=175&photoreference=${ref}&key=${GOOGLE_API_KEY}`)
    .then(response = cb(response))
    .catch(error => console.log('error:', error))
}

module.exports = {
  getBusinessInfo,
  searchBusinesses,
  getPhoto
}
const axios = require('axios');
const config = require('../../config.js');

const googleAPI = `https://maps.googleapis.com/maps/api/place/`
const location = `location=37.7749,-122.4194`

const getBusinessInfo = (businessID, cb) => {
    axios.get(`${googleAPI}details/json?placeid=${businessID}&key=${process.env.GOOGLE_API_KEY}`)
        .then(response => cb(response))
        .catch(error => console.log('error:', error))
}

const searchBusinesses = (query, cb) => {
    axios.get(`${googleAPI}textsearch/json?query=${query}&${location}&key=${process.env.GOOGLE_API_KEY}`)
        .then(response => cb(response))
        .catch(error => console.log('error:', error))
}

module.exports = {
    getBusinessInfo,
    searchBusinesses
}

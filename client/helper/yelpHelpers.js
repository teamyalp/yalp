const axios = require('axios');
const config = require('../../config.js); 
/**
 * two functions
 * 
 * -get businesses' object 
 * GET https://api.yelp.com/v3/businesses/{id}
 * 
 * -search businesses (get) 
 * GET https://api.yelp.com/v3/businesses/search
 */

 const getBusiness = (business, cb) => {
    axios.get(`https://api.yelp.com/v3/businesses/${business}`, {
        params: {
            Authorization: `Bearer ${config.YELP_API_KEY}`
        }
    })
        .then(response => cb(response))
        .catch(error => console.log('error:', error))
}

const searchBusinesses = (query, cb) => {
    axios.get(`https://api.yelp.com/v3/businesses/search?term=${query}`, {
        params: {
            Authorization: `Bearer ${config.YELP_API_KEY}`
        }
    })
        .then(response => cb(response))
        .catch(error => console.log('error:', error))
}

module.exports = {
    getBusiness,
    searchBusinesses
}

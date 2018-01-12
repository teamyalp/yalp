const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('../database/index.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve static asset...
app.use(express.static(__dirname + '/../client/dist'));

let fakeData = {
  "total": 8228,
  "businesses": [
    {
      "rating": 4,
      "price": "$",
      "phone": "+14152520800",
      "id": "four-barrel-coffee-san-francisco",
      "is_closed": false,
      "categories": [
        {
          "alias": "coffee",
          "title": "Coffee & Tea"
        }
      ],
      "review_count": 1738,
      "name": "Four Barrel Coffee",
      "url": "https://www.yelp.com/biz/four-barrel-coffee-san-francisco",
      "coordinates": {
        "latitude": 37.7670169511878,
        "longitude": -122.42184275
      },
      "image_url": "http://s3-media2.fl.yelpcdn.com/bphoto/MmgtASP3l_t4tPCL1iAsCg/o.jpg",
      "location": {
        "city": "San Francisco",
        "country": "US",
        "address2": "",
        "address3": "",
        "state": "CA",
        "address1": "375 Valencia St",
        "zip_code": "94103"
      },
      "distance": 1604.23,
      "transactions": ["pickup", "delivery"]
    },
    {
      "rating": 10,
      "price": "$$",
      "phone": "+1111111111",
      "id": "P-L-U-U",
      "is_closed": false,
      "categories": [
        {
          "alias": "coffee",
          "title": "Coffee & Tea"
        }
      ],
      "review_count": 9000,
      "name": "P LUU",
      "url": "https://www.yelp.com/biz/four-barrel-coffee-san-francisco",
      "coordinates": {
        "latitude": 37.7670169511878,
        "longitude": -122.42184275
      },
      "image_url": "http://s3-media2.fl.yelpcdn.com/bphoto/MmgtASP3l_t4tPCL1iAsCg/o.jpg",
      "location": {
        "city": "San Francisco",
        "country": "US",
        "address2": "",
        "address3": "",
        "state": "CA",
        "address1": "375 Valencia St",
        "zip_code": "94103"
      },
      "distance": 1604.23,
      "transactions": ["pickup", "delivery"]
    },
    {
      "rating": 1,
      "price": "$",
      "phone": "+14152520800",
      "id": "hack-reactor",
      "is_closed": false,
      "categories": [
        {
          "alias": "coffee",
          "title": "Coffee & Tea"
        }
      ],
      "review_count": 1738,
      "name": "Hack Reactor",
      "url": "https://www.yelp.com/biz/four-barrel-coffee-san-francisco",
      "coordinates": {
        "latitude": 37.7670169511878,
        "longitude": -122.42184275
      },
      "image_url": "http://s3-media2.fl.yelpcdn.com/bphoto/MmgtASP3l_t4tPCL1iAsCg/o.jpg",
      "location": {
        "city": "San Francisco",
        "country": "US",
        "address2": "",
        "address3": "",
        "state": "CA",
        "address1": "375 Valencia St",
        "zip_code": "94103"
      },
      "distance": 1604.23,
      "transactions": ["pickup", "delivery"]
    }
  ],
  "region": {
    "center": {
      "latitude": 37.767413217936834,
      "longitude": -122.42820739746094
    }
  }
}

app.post('/serverlogin', (req, res) => {
  db.getUserByUsername(req.body, (err, results) => {
    if (err) {
      res.status(400);
      res.end('Invalid User.');
    } else {
      res.status(201).json(results);
    }
  });
});

app.post('/serversignup', (req, res) => {
  db.postUser(req.body, (err, results) => {
    if (err) {
      res.status(400);
      res.end('Failed to Create User.');
    } else {
      res.status(201).json(results);
    }
  });
});

// when user search
app.get('/serversearch', (req, res) => {
  db.tempSearch(req.body, (err, results) => {
    if (err) {
      res.status(400);
      res.end('Failed to Search.');
    } else {
      //using fake data object mirroring API
      res.status(201).json(fakeData);
    }
  })
});

// when user clicks on a business
app.get('/businesses/:id', (req, res) => {
  res.status(200).json('ok');
});

// when user clicks on his/her profile
app.get('/profiles/:id', (req, res) => {
  res.status(200).json('ok');
});

const server = app.listen(process.env.PORT || 3000, () => {
  var port = server.address().port;
  console.log('Listening at port %s', port);
});

module.exports = server;

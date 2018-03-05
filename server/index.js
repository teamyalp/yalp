const api = require('../client/helper/yelpHelpers.js');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const db = require('../database/index.js');
const express = require('express');
const path = require('path');

const app = express();
const saltRounds = 10;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '/../client/dist')));

app.post('/server/login', (req, res) => {
  const { username, password } = req.body;
  db.getUserByUsername(username, (err, results) => {
    if (err || !results.length) {
      res.status(401);
      res.end('Invalid username or password');
    } else {
      bcrypt.compare(password, results[0].password, (err1, resCrypt) => {
        if (resCrypt) {
          res.status(200).json(results);
        } else {
          res.status(401).json('Invaild username or password');
        }
      });
    }
  });
});

app.post('/server/signup', (req, res) => {
  db.userExists(req.body.username, (err, exists) => {
    if (!exists) {
      bcrypt.hash(req.body.password, saltRounds, (err1, hash) => {
        req.body.password = hash;
        db.postUser(req.body, (err2, results) => {
          if (err) {
            res.status(400).json('Unable to create user. Please try again later.');
          } else {
            res.status(201).json('Created');
          }
        });
      });
    } else {
      res.status(400).json('Username exists');
    }
  });
});

app.get('/server/search/:query/:location', (req, res) => {
  const { query, location } = req.params;
  api.searchBusinesses(query, location, (results) => {
    res.status(200).json(results.data.results);
  });
});

// when user clicks on a business
app.get('/server/business/:reference', (req, res) => {
  const businessRef = req.params.reference;
  api.getBusinessInfo(businessRef, (resp) => {
    res.status(200).json(resp.data.result);
  });
});

app.get('/server/business/photos/:photoRef', (req, res) => {
  const { photoRef } = req.params;
  const photos = api.getPhotos(photoRef);
  res.status(200).json(photos);
});

// get all friend checkins for a particular business
app.get('/server/business/checkins', (req, res) => {
  db.getFriendsCheckins1(req.query.userId, req.query.businessId, (err, results1) => {
    if (err) {
      res.status(400);
      res.end('Unable to retrieve checkins');
    } else {
      db.getFriendsCheckins2(req.query.userId, req.query.businessId, (err1, results2) => {
        if (err1) {
          res.status(400);
          res.end('Unable to retreive checkins');
        } else {
          console.log('checkins results:', results1, results2);
        }
      });
    }
  });
});

// when user clicks on checkin button on business page
app.post('/server/profile/checkins', (req, res) => {
  const { userId } = req.body;
  const businessId = req.body.business.id;
  db.addCheckIn(userId, businessId, (resp) => {
    res.status(201).json(resp);
  });
});

// when user submits a review for a business
app.post('/review', (req, res) => {
  const review = {
    rating: req.body.rating,
    text: req.body.text,
  };
  console.log(req.body);
  db.addNewReview(req.body.userID, req.body.businessID, review, (err, results) => {
    if (err) {
      res.status(400);
      res.end('Unable to submit new review');
    } else {
      res.status(201).json(results);
    }
  });
});

// when business page reviews render
app.get('/server/reviews/friends', (req, res) => {
  db.getFriendsReviews(req.query.userId, req.query.businessId, (err, results) => {
    if (err) {
      res.status(400);
      res.end('Unable to retrieve friend reviews');
    } else {
      res.status(201).json(results);
    }
  });
});

// when business page reviews render
app.get('/server/reviews/others', (req, res) => {
  db.getStrangersReviews(req.query.userId, req.query.businessId, (err, results) => {
    if (err) {
      res.status(400);
      res.end('Unable to retrieve others reviews');
    } else {
      res.status(201).json(results);
    }
  });
});

// when user clicks add review author as friend on business page
app.get('/server/addfriend', (req, res) => {
  db.addFriend(req.query.userId, req.query.friendId, (err, results) => {
    if (err) {
      res.status(400);
      res.end('Unable to add friend');
    } else {
      res.status(201).json(results);
    }
  });
});

app.get('/server/checkfriend', (req, res) => {
  db.friendChecker(req.query.userId, req.query.friendId, (err, results) => {
    if (err) {
      res.status(400);
      res.end('Unable to add friend');
    } else {
      res.status(201).json(results);
    }
  });
});

app.get('/server/user/:id', (req, res) => {
  db.getUsernameById(req.params.id, (err, results) => {
    if (err) {
      res.send(400);
      res.end('Unable to retrieve username from id');
    } else {
      res.status(201).json(results);
    }
  });
});

// when user clicks on his/her profile
app.get('/profiles/:id', (req, res) => {
  res.status(200).json('ok');
});

app.get('/server/profile/checkins', (req, res) => {
  const { userId } = req.body;
  const businessId = req.body.business.id;
  db.checkCheckIn(userId, businessId, (resp) => {
    res.status(201).json(resp);
  });
});

app.post('/profile/favorites', (req, res) => {
  const { userId, businessId } = req.body;
  db.addFavorite(userId, businessId, (err, result) => {
    res.status(201).json(result);
  });
});

app.get('/profile/favorites/:userId', (req, res) => {
  const { userId } = req.params;
  db.getFavorite(Number(userId), (err, result) => {
    res.status(200).json(result);
  });
});

app.get('/user/friends/:id', (req, res) => {
  db.getFriends(Number(req.params.id), (err, result) => {
    res.status(200).json(result);
  });
});

app.get('/user/checkins/:id', (req, res) => {
  db.getCheckins(Number(req.params.id), (err, result) => {
    res.status(200).json(result);
  });
});

app.get('/user/reviews/:id', (req, res) => {
  db.getReviews(Number(req.params.id), (err, result) => {
    res.status(200).json(result);
  });
});

app.get('/user/favorites/:id', (req, res) => {
  db.getFavorites(Number(req.params.id), (err, result) => {
    res.status(200).json(result);
  });
});

const server = app.listen(process.env.PORT || 3000, () => {
  const { port } = server.address();
  console.log('Listening at port %s', port);
});

module.exports = server;

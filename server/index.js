const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('../database/index.js');
const api = require('../client/helper/yelpHelpers.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve static asset...
app.use(express.static(__dirname + '/../client/dist'));

app.post('/server/login', (req, res) => {
  db.getHW(req.body.username, (err, results) => {
    if (results.length > 0) {
      bcrypt.compare(req.body.password, results[0].password, function(err, resCrypt) {
        if (resCrypt === true) {
          db.getUserInfo(req.body.username, (err, resUserInfo) => {
            res.status(200).send(resUserInfo);
          });
        }
        if (resCrypt === false) {
          res.status(401).end();
        }
      });
    } else {
      res.status(401).end();
    }
  });
});

app.post('/server/signup', (req, res) => {
  db.checkUserExists(req.body.username, (err, results) => {
    if (results[0]['count(*)'] === 0) {
      bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        db.postUser(req.body.name, req.body.email, hash, req.body.username, (err, results) => {
          res.status(201).send('Created');
        });
      });
    } else {
      res.status(400).send('Username exists');
    }
  });
});

// when user search
app.get('/server/search/:query/:loc', (req, res) => {
  let params = req.params.loc ? [req.params.query, req.params.loc.slice(1, -1)] : [req.params.query];
  api.searchBusinesses(params, results => {
    res.status(201).json(results.data.results);
  })
  // use below for test
  // db.tempSearch(req.body, (err, results) => {
  //   if (err) {
  //     res.status(400);
  //     res.end('Failed to Search.');
  //   } else {
  //     //using fake data object mirroring API
  //     res.status(201).json(api.fakeData);
  //   }
  // })
});

// when user clicks on a business
app.get('/server/business/:reference', (req, res) => {
  let businessRef = req.params.reference;
  api.getBusinessInfo(businessRef, resp => {
    res.json(resp.data.result)
  })
});

app.get('/server/business/photos/:photoRef', (req, res) => {
  let photoRef = req.params.photoRef;
  let photos = api.getPhotos(photoRef);
  res.status(201).json(photos)
  // res.status(200).json('ok');
});

// get all friend checkins for a particular business
app.get('/server/business/checkins', (req, res) => {
  db.getFriendsCheckins1(req.query.userId, req.query.businessId, (err, results1) => {
    if (err) {
      res.status(400);
      res.end('Unable to retrieve checkins')
    } else {
      db.getFriendsCheckins2(req.query.userId, req.query.businessId, (err, results2) => {
        if (err) {
          res.status(400);
          res.end('Unable to retreive checkins')
        } else {
          console.log('checkins results:', results1, results2)
        }
      })
    }
  })
})

// when user clicks on checkin button on business page
app.post('/server/profile/checkins', (req, res) => {
  let userId = req.body.userId;
  let businessId = req.body.business.id;
  db.addCheckIn(userId, businessId, resp => {
    res.status(201).json(resp);
  })
})
//when user submits a review for a business
app.post('/review', (req, res) => {
  let review = {
    rating: req.body.rating,
    text: req.body.text
  }
  db.addNewReview(req.body.userID, req.body.businessID, review, (err, results) => {
    if (err) {
      res.status(400);
      res.end('Unable to submit new review');
    } else {
      console.log(results);
      res.status(201).json(results);
    }
  })
});

//when business page reviews render
app.get('/server/reviews/friends', (req, res) => {
  db.getFriendsReviews(req.query.userId, req.query.businessId, (err, results) => {
    if (err) {
      res.status(400);
      res.end('Unable to retrieve friend reviews');
    } else {
      res.status(201).json(results);
    }
  })
})

//when business page reviews render
app.get('/server/reviews/others', (req, res) => {
  db.getStrangersReviews(req.query.userId, req.query.businessId, (err, results) => {
    if (err) {
      res.status(400);
      res.end('Unable to retrieve others reviews');
    } else {
      res.status(201).json(results);
    }
  })
})

// when user clicks add review author as friend on business page
app.get('/server/addfriend', (req, res) => {
  db.addFriend(req.query.userId, req.query.friendId, (err, results) => {
    if (err) {
      res.status(400);
      res.end('Unable to add friend');
    } else {
      res.status(201).json(results);
    }
  })
})

app.get('/server/checkfriend', (req, res) => {
  db.friendChecker(req.query.userId, req.query.friendId, (err, results) => {
    if (err) {
      res.status(400);
      res.end('Unable to add friend');
    } else {
      res.status(201).json(results);
    }
  })
})

app.get('/server/user/:id', (req, res) => {
  db.getUsernameById(req.params.id, (err, results) => {
    if (err) {
      res.send(400)
      res.end('Unable to retrieve username from id')
    } else {
      console.log(results);
      res.status(201).json(results)
    }
  })
})

// when user clicks on his/her profile
app.get('/profiles/:id', (req, res) => {
  res.status(200).json('ok');
});

app.get('/server/profile/checkins', (req, res) => {
  let userId = req.body.userId;
  let business = req.body.business.id;
  db.checkCheckIn(userId, businessId, resp => {
    console.log(resp);
    res.status(201).json(resp)

  })

})

app.post('/profile/favorites', (req, res) => {
  const { userId, businessId } = req.body;
  console.log(userId, businessId)
  db.addFavorite(userId, businessId, (err, result) => {
    res.status(201).json(result);
  })
})

app.get('/profile/favorites/:userId', (req, res) => {
  console.log(req.params);
  const { userId } = req.params;
  db.getFavorite(parseInt(userId), (err, result) => {
      res.status(200).json(result);
  });
});

app.get('/user/friends/:id', (req, res) => {
  db.getFriends(parseInt(req.params.id), (err, result) => {
    res.status(200).json(result);
  });
});

app.get('/user/checkins/:id', (req, res) => {
  db.getCheckins(parseInt(req.params.id), (err, result) => {
    res.status(200).json(result);
  });
});

app.get('/user/reviews/:id', (req, res) => {
  db.getReviews(parseInt(req.params.id), (err, result) => {
    res.status(200).json(result);
  });
});

app.get('/user/favorites/:id', (req, res) => {
  db.getFavorites(parseInt(req.params.id), (err, result) => {
    res.status(200).json(result);
  });
});

const server = app.listen(process.env.PORT || 3000, () => {
  var port = server.address().port;
  console.log('Listening at port %s', port);
});

module.exports = server;

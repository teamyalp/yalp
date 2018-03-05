const mysql = require('mysql');

let connection;

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection({
    host: 'lg7j30weuqckmw07.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'ybr7ph732nxw8g1g',
    password: 'cmk1cc2z3q81thtz',
    database: 'e36d84um3m6uotkz',
  });
} else {
  connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'yalp',
  });
}

const getUser = (user, cb) => {
  const query = 'SELECT * FROM users;';
  connection.query(query, (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
    }
  });
};

const postUser = (user, cb) => {
  const query = 'INSERT INTO users (name, email, password, username) VALUES (?, ?, ?, ?);';
  const columns = [user.name, user.email, user.password, user.username];
  connection.query(query, columns, (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
    }
  });
};

const userExists = (username, cb) => {
  const query = 'SELECT * FROM users WHERE username = ?;';
  connection.query(query, [username], (err, results) => {
    if (err) {
      cb(err, null);
    } else if (results.length) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  });
};

const getUserByUsername = (username, cb) => {
  const query = 'SELECT * FROM users WHERE username = ?;';
  connection.query(query, [username], (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
    }
  });
};

const getBusinessById = (id, cb) => {
  const query = `SELECT businesses.name FROM businesses WHERE businesses.id = ${id};`;
  connection.query(query, (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
    }
  });
};

const addFriend = (userId, friendId, cb) => {
  const query = `INSERT INTO friends (user_id1, user_id2) VALUES (${userId}, ${friendId});`;
  connection.query(query, (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
    }
  });
};

const friendChecker = (userId, friendId, cb) => {
  const query1 = `SELECT friends.user_id2 FROM friends WHERE friends.user_id1 = ${userId} AND friends.user_id2 = ${friendId};`;
  const query2 = `SELECT friends.user_id1 FROM friends WHERE friends.user_id2 = ${userId} AND friends.user_id1 = ${friendId};`;
  let checker = false;
  connection.query(query1, (err, results) => {
    if (err) {
      cb(err, null);
    } else if (results.length) {
      checker = true;
    }
  });
  connection.query(query2, (err, results) => {
    if (err) {
      cb(err, null);
    } else if (results.length) {
      checker = true;
    }
  });
  cb(null, checker);
};

const getFriendsReviews = (userId, businessId, cb) => {
  const query = `SELECT reviews.text, reviews.user_id, reviews.rating FROM reviews INNER JOIN friends ON friends.user_id1 = ${userId} AND friends.user_id2 = reviews.user_id AND reviews.business_id = "${businessId}";`;
  connection.query(query, (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
    }
  });
};

const getStrangersReviews = (userId, businessId, cb) => {
  const query = `SELECT reviews.text, reviews.user_id, reviews.rating FROM reviews WHERE reviews.text NOT IN (SELECT reviews.text FROM reviews INNER JOIN friends ON friends.user_id1 = ${userId} AND friends.user_id2 = reviews.user_id) AND reviews.business_id = "${businessId}";`;
  connection.query(query, (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
    }
  });
};

const checkFavorite = (userId, businessId, cb) => {
  const query = 'SELECT * FROM favorites WHERE favorites.user_id = ? AND favorites.business_id = ?;';
  connection.query(query, [userId, businessId], (err, results) => {
    if (err) {
      cb(err, false);
    } else if (results.length) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  });
};

const addFavorite = (userId, businessId, cb) => {
  checkFavorite(userId, businessId, (err, bool) => {
    if (bool) {
      cb(null, false);
    } else {
      const query = 'INSERT INTO favorites (user_id, business_id) VALUES (?, ?);';
      connection.query(query, [userId, businessId], (err1) => {
        if (err1) {
          cb(err1, false);
        } else {
          cb(null, true);
        }
      });
    }
  });
};

const checkCheckIn = (userId, businessId, cb) => {
  const query = `SELECT * FROM checkins WHERE checkins.user_id = ${userId} AND checkins.business_id = "${businessId}";`;
  connection.query(query, (err, results) => {
    if (err) {
      cb(err, null);
    } else if (results.length) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  });
};

// for a particular business, return all checkins of friends
// requires two separate checkin functions (getCheckins1 & getCheckins2), since friends table operates in two directions.
const getFriendsCheckins1 = (userId, businessId, cb) => {
  const query = `SELECT checkins.user_id, checkins.createdAt FROM checkins INNER JOIN friends ON friends.user_id1 = ${userId} AND checkins.business_id = ${businessId} AND friends.user_id2 = checkins.user_id;`;
  connection.query(query, (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
    }
  });
};

const getFriendsCheckins2 = (userId, businessId, cb) => {
  const query = `SELECT checkins.user_id, checkins.createdAt FROM checkins INNER JOIN friends ON friends.user_id2 = ${userId} AND checkins.business_id = ${businessId} AND friends.user_id1 = checkins.user_id;`;
  connection.query(query, (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
    }
  });
};

const getFriendsFavorites1 = (userId, businessId, cb) => {
  const query = `SELECT favorites.user_id, favorites.createdAt FROM favorites INNER JOIN friends ON friends.user_id1 = ${userId} AND favorites.business_id = ${businessId} AND friends.user_id2 = favorites.user_id;`;
  connection.query(query, (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
    }
  });
};

const getFriendsFavorites2 = (userId, businessId, cb) => {
  const query = `SELECT favorites.user_id, favorites.createdAt FROM favorites INNER JOIN friends ON friends.user_id2 = ${userId} AND favorites.business_id = ${businessId} AND friends.user_id1 = favorites.user_id;`;
  connection.query(query, (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
    }
  });
};

const addCheckIn = (userId, businessId, cb) => {
  checkCheckIn(userId, businessId, (err, bool) => {
    if (bool) {
      cb(false);
    } else {
      const query = `INSERT INTO checkins (user_id, business_id) VALUES (${userId}, "${businessId}");`;
      connection.query(query, (err1, results) => {
        if (err1) {
          cb(err1);
        } else {
          cb(null, results);
        }
      });
    }
  });
};

// temp function for searches, using mock data
const tempSearch = (search, cb) => {
  const query = 'SELECT * FROM businesses;';
  connection.query(query, (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
    }
  });
};

const addNewReview = (userId, businessId, review, cb) => {
  const query = 'INSERT INTO reviews (user_id, business_id, rating, text) VALUES (?, ?, ?, ?)';
  const params = [userId, businessId, review.rating, review.text];
  connection.query(query, params, (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
    }
  });
};

const getUsernameById = (userId, cb) => {
  const query = `SELECT * FROM users WHERE id=${userId}`;
  connection.query(query, (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
    }
  });
};

const getFavorite = (userId, cb) => {
  const query = 'SELECT * from favorites where favorites.user_id = ?';
  connection.query(query, [userId], (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
    }
  });
};

const getFriends = (userId, cb) => {
  const query = 'select users.* from (select * from friends where user_id1 = ?) a left join users on a.user_id2 = users.id;';
  connection.query(query, [userId], (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
    }
  });
};

const getCheckins = (userId, cb) => {
  const query = 'select a.id, businesses.name, a.createdAt from (select * from checkins where checkins.user_id = ?) a left join businesses on businesses.id = a.business_id;';
  connection.query(query, [userId], (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
    }
  });
};

const getReviews = (userId, cb) => {
  const query = 'select a.id, businesses.name, a.text, a.rating, a.createdAt from (select * from reviews where reviews.user_id = ?) a left join businesses on a.business_id = businesses.id';
  connection.query(query, [userId], (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
    }
  });
};

const getFavorites = (userId, cb) => {
  const query = 'select a.id, businesses.name from (select * from favorites where favorites.user_id = ?) a left join businesses on businesses.id = a.business_id;';
  connection.query(query, [userId], (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
    }
  });
};

module.exports = {
  connection,
  getUser,
  postUser,
  userExists,
  getUserByUsername,
  getBusinessById,
  tempSearch,
  getStrangersReviews,
  getFriendsReviews,
  addFavorite,
  addCheckIn,
  checkCheckIn,
  checkFavorite,
  addNewReview,
  getUsernameById,
  getFavorite,
  getFriendsCheckins1,
  getFriendsCheckins2,
  addFriend,
  friendChecker,
  getFriends,
  getCheckins,
  getReviews,
  getFavorites,
  getFriendsFavorites1,
  getFriendsFavorites2,
};

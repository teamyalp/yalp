//DATABASE SPECS
const db = require('../../database/index.js')
var expect = require('chai').expect

//SERVER SPECS
const assert = require('assert');
// const expect = require('chai').expect;
const request = require('supertest');

describe('loading express', function() {
  let server;

  beforeEach(function() {
    server = require('../../server/index.js');
  });

  afterEach(function() {
    server.close();
  });

  it('should respond to POST /login', function() {
    request(server)
      .post('/login')
      .set('Accept', 'application/json')
      .send({
        username: 'connorchen',
        password: 'connorchen'
      })
      .expect(201)
      .then(resp => {
        expect(resp.body).to.eql([]);
      });
  });

  it('should respond to POST /signup', function() {
    request(server)
      .post('/signup')
      .set('Accept', 'application/json')
      .send({
        name: 'abc',
        username: 'abc',
        password: 'abc',
        email: 'abc'
      })
      .expect(201)
      .then(resp => {
        expect(resp.body.affectedRows).to.equal(1);
      });
  });

  it('should respond to POST /businesses/search', function() {
    request(server)
      .post('/businesses/search')
      .set('Accept', 'application/json')
      .expect(201)
      .then(resp => {
        expect(resp.body).to.equal('ok');
      });
  });

  it('should respond to GET /businesses/id', function() {
    request(server)
      .get('/businesses/id')
      .set('Accept', 'application/json')
      .expect(200)
      .then(resp => {
        expect(resp.body).to.equal('ok');
      });
  });

  it('should respond to GET /profiles/id', function() {
    request(server)
      .get('/profiles/id')
      .set('Accept', 'application/json')
      .expect(200)
      .then(resp => {
        expect(resp.body).to.equal('ok');
      });
  });

  it('should 404 to GET /foo/bar', function(done) {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });
});


//DATABASE SPECS

it('getUsers should get all users from our database', function (done) {
    db.getUser({}, (err, result) => {
        if (err) {
            done(err);
            return;
        }
        expect(result[0].id).to.equal(1);
        done();
    });
})

it('postUser adds a new user to our user table', function (done) {

    let user = { name: "testName", email: "testEmail", password: "testPassword", username: "testUsername" }

    db.postUser(user, (result) => {
        if (!result) {
            done();
            return;
        }
        expect(result.affectedRows).to.equal(1);
        done();
    })
})

it('should retrieve a business from the database using its id number', function (done) {

    let businessID = 1;

    db.getBusinessById(businessID, (error, result) => {
        if (error) {
            done(error);
            return;
        }
        expect(result[0].hasOwnProperty('name')).to.equal(true);
        done();
    })
})


// const postUser = function (user, cb) {
//     //name, email, password, username
//     let query = `INSERT INTO users (name, email, password, username) VALUES (?, ?, ?, ?)`

//     connection.query(query, [user.name, user.email, user.password, user.username], (results, err) => {
//         if (err) {
//             cb(err)
//         } else {
//             cb(null, results)
//         }
//     })
// }

const db = require('../database/index.js');
const { expect } = require('chai');

it('getUsers should get all users from our database', (done) => {
  db.getUser({}, (err, result) => {
    if (err) {
      done(err);
      return;
    }
    expect(result[0].id).to.equal(1);
    done();
  });
});

it('postUser adds a new user to our user table', (done) => {
  const user = {
    name: 'testName',
    email: 'testEmail',
    password: 'testPassword',
    username: 'testUsername',
  };

  db.postUser(user, (result) => {
    if (!result) {
      done();
      return;
    }
    expect(result.affectedRows).to.equal(1);
    done();
  });
});

it('should retrieve a business from the database using its id number', (done) => {
  const businessID = 1;

  db.getBusinessById(businessID, (error, result) => {
    if (error) {
      done(error);
      return;
    }
    expect(result[0].hasOwnProperty('name')).to.equal(true);
    done();
  });
});

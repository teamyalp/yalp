const db = require('../../database/index.js')
var expect = require('chai').expect


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

it('should retrieve a user from the database using his or her id number', function (done) {
    
    let userID = 1;

    db.getUserById(userID, (error, result) => {
        if (error) {
            done(error);
            return;
        }
        expect(result[0].hasOwnProperty('name')).to.equal(true);
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
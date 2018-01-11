const assert = require('assert');
const expect = require('chai').expect;
const request = require('supertest');

describe('loading express', function() {
  let server;

  beforeEach(function() {
    server = require('../index.js');
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

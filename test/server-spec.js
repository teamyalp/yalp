const { expect } = require('chai');
const request = require('supertest');

describe('loading express', () => {
  let server;

  beforeEach(() => {
    server = require('../server/index.js');
  });

  afterEach(() => {
    server.close();
  });

  it('should respond to POST /login', () => {
    request(server)
      .post('/login')
      .set('Accept', 'application/json')
      .send({
        username: 'connorchen',
        password: 'connorchen',
      })
      .expect(201)
      .then((resp) => {
        expect(resp.body).to.eql([]);
      });
  });

  it('should respond to POST /signup', () => {
    request(server)
      .post('/signup')
      .set('Accept', 'application/json')
      .send({
        name: 'abc',
        username: 'abc',
        password: 'abc',
        email: 'abc',
      })
      .expect(201)
      .then((resp) => {
        expect(resp.body.affectedRows).to.equal(1);
      });
  });

  it('should respond to POST /businesses/search', () => {
    request(server)
      .post('/businesses/search')
      .set('Accept', 'application/json')
      .expect(201)
      .then((resp) => {
        expect(resp.body).to.equal('ok');
      });
  });

  it('should respond to GET /businesses/id', () => {
    request(server)
      .get('/businesses/id')
      .set('Accept', 'application/json')
      .expect(200)
      .then((resp) => {
        expect(resp.body).to.equal('ok');
      });
  });

  it('should respond to GET /profiles/id', () => {
    request(server)
      .get('/profiles/id')
      .set('Accept', 'application/json')
      .expect(200)
      .then((resp) => {
        expect(resp.body).to.equal('ok');
      });
  });

  it('should 404 to GET /foo/bar', (done) => {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });
});

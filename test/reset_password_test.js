import chai from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
// eslint-disable-next-line no-unused-vars
import app from '../src/app';
import db from '../src/db/db';

chai.use(chaiHttp);

chai.should();
const { expect } = chai;

const api = chai.request('http://localhost:5000');

const data = fs.readFileSync(`${__dirname}/assumed/token.txt`);
const token = data.toString();

describe('REQUEST PASSWORD RESET', () => {

  it('Should respond to user trying to request reset with an NO EMAIL', (done) => {
    api
      .post('/api/v1/password/reset/')
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(400);
        res.body.should.have.property('success').equal('false');
        res.body.should.have.property('error').equal('Please provide a valid email!');
        done();
      });
  });

  it('Should respond to user trying to request reset with an INVALID EMAIL', (done) => {
    api
      .post('/api/v1/password/reset/')
      .send({ email: 'torsami77@gmail.com' })
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(404);
        res.body.should.have.property('success').equal('false');
        res.body.should.have.property('error').equal('No user found with such email');
        done();
      });
  });
/*
  it('Should ', (done) => {
    api
      .post('/api/v1/password/reset/')
      .send(db.users[0])
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(200);
        res.body.data.should.have.property('success').equal('true');
        res.body.data.token.should.be.a('string');
        res.body.data.should.have.property('error').equal('password reset link sent to your email');
        token = res.body.data.token;
        done();
      });
  });
*/
});
describe('CREATE NEW PASSWORD', () => {
  it('Should respond to unauthorised attempt to CHANGE PASSWORD', (done) => {
    api
      .post('/api/v1/password/createnew/')
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(401);
        res.body.should.have.property('success').equal('false');
        res.body.should.have.property('error').equal('Unauthorised User!');
        done();
      });
  });

  it('Should respond to user with empty PASSWORD FIELD', (done) => {
    api
      .post('/api/v1/password/createnew/')
      .set('authorization', token)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(400);
        res.body.should.have.property('success').equal('false');
        res.body.should.have.property('error').equal('Please Enter a New Password!');
        done();
      });
  });

  it('Should respond to user with short PASSWORD', (done) => {
    api
      .post('/api/v1/password/createnew')
      .set('authorization', token)
      .send({ password: 'asdf', verify: 'asdf' })
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(400);
        res.body.should.have.property('success').equal('false');
        res.body.should.have.property('error').equal('Password too Short!');
        done();
      });
  });

  it('Should respond to user with NOT MATCHING PASSWORD', (done) => {
    api
      .post('/api/v1/password/createnew/')
      .set('authorization', token)
      .send({ password: 'asdfghjkl' })
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(400);
        res.body.should.have.property('success').equal('false');
        res.body.should.have.property('error').equal('Password Does\'t match!');
        done();
      });
  });
  /*
  it('Should let user CREATE NEW password', (done) => {
    api
      .post('/api/v1/password/createnew/')
      .set('authorization', token)
      .send({ password: 'asdfghjkl', verify: 'asdfghjkl' })
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(200);
        res.body.data.should.have.property('success').equal('true');
        res.body.data.token.should.be.a('string');
        res.body.data.should.have.property('message').equal('Your password has been reset Successfully!');
        done();
      });
  });
  */
});

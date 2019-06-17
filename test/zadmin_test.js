import chai from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
// eslint-disable-next-line no-unused-vars
import app from '../src/app';
import db from '../src/db/db';
import assumedData from './assumed/assume';

chai.use(chaiHttp);

chai.should();
const { expect } = chai;

const api = chai.request('http://localhost:5000');

const data = fs.readFileSync(`${__dirname}/assumed/token.txt`);
const token = data.toString();

describe('ADMIN Activities', () => {
  it('should NOT let NON-ADMIN user to view sold AD', (done) => {
    api
      .get('/api/v1/car/')
      .set('authorization', token)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(403);
        res.body.should.have.property('success').equal('false');
        res.body.should.have.property('error').equal('You need Admin priviledges to view this set of data!');
        done();
      });
  });

  let adminToken;
  it('AUTHENTICATE ADMIN', (done) => {
    api
      .post('/api/v1/signin')
      .send(assumedData.admin)
      .end((err, res) => {
        res.body.data.should.have.property('token');
        res.body.data.token.should.be.a('string');
        adminToken = res.body.data.token;
        done();
      });
  });

  it('should let ADMIN user to view all AD including sold AD', (done) => {
    api
      .get('/api/v1/car/')
      .set('authorization', adminToken)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(200);
        res.body.should.have.property('success').equal('true');
        res.body.data.should.be.a('array');
        done();
      });
  });

  it('should respond to ADMIN"s attempt to DELETE AD without reference', (done) => {
    api
      .delete('/api/v1/car/:carId/')
      .set('authorization', adminToken)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(400);
        res.body.should.have.property('success').equal('false');
        res.body.should.have.property('error').equal('Please provide a valid Ad reference!');
        done();
      });
  });

  it('should respond to ADMIN"s attempt to DELETE non-exitent AD', (done) => {
    api
      .delete('/api/v1/car/0/')
      .set('authorization', adminToken)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(404);
        res.body.should.have.property('success').equal('false');
        res.body.should.have.property('error').equal('Ad not found!');
        done();
      });
  });

  it('should let ADMIN to DELETE AD successfuly', (done) => {
    api
      .delete('/api/v1/car/3/')
      .set('authorization', adminToken)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(200);
        res.body.data.should.have.property('success').equal('true');
        res.body.data.should.have.property('message').equal('Car Ad successfully deleted!');
        done();
      });
  });
});

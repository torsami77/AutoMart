/* eslint-disable func-names */
import chai from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
// eslint-disable-next-line no-unused-vars
import app from '../src/app';
import assumedData from './assumed/assume';

chai.use(chaiHttp);

chai.should();
const { expect } = chai;

const api = chai.request('http://localhost:5000');


describe('Auto Mart', () => {
  it('Should get 404 response', (done) => {
    api
      .get('/invalidendpoint')
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('error').equal('Endpoint not found!');
        res.body.should.have.property('success').equal(false);
        done();
      });
  });
});

describe('Users Sign Up Tests', () => {
  it('should NOT let user sign up without email', (done) => {
    api
      .post('/api/v1/signup')
      .send(assumedData.noEmailUsers)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(400);
        res.body.should.have.property('error').equal('Please Enter a Valid Email');
        res.body.should.have.property('success').equal('false');
        res.body.should.have.property('field').equal('email');
        done();
      });
  });

  it('should NOT let user sign up without username', (done) => {
    api
      .post('/api/v1/signup')
      .send(assumedData.noUsernameUsers)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(400);
        res.body.should.have.property('error').equal('Please Provide a Username');
        res.body.should.have.property('success').equal('false');
        res.body.should.have.property('field').equal('username');
        done();
      });
  });

  it('should NOT let user sign up without firstname', (done) => {
    api
      .post('/api/v1/signup')
      .send(assumedData.noFirstNameUsers)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(400);
        res.body.should.have.property('error').equal('Please Enter your First Name');
        res.body.should.have.property('success').equal('false');
        res.body.should.have.property('field').equal('firstName');
        done();
      });
  });

  it('should NOT let user sign up without lastname', (done) => {
    api
      .post('/api/v1/signup')
      .send(assumedData.noLastNameUsers)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(400);
        res.body.should.have.property('error').equal('Please Enter your Last Name');
        res.body.should.have.property('success').equal('false');
        res.body.should.have.property('field').equal('lastName');
        done();
      });
  });

  it('should NOT let user sign up without address', (done) => {
    api
      .post('/api/v1/signup')
      .send(assumedData.noAddressUsers)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(400);
        res.body.should.have.property('error').equal('Please Enter your Address');
        res.body.should.have.property('success').equal('false');
        res.body.should.have.property('field').equal('address');
        done();
      });
  });

  it('should NOT let user sign up without password', (done) => {
    api
      .post('/api/v1/signup')
      .send(assumedData.noPasswordUsers)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(400);
        res.body.should.have.property('error').equal('Please Provide a Password');
        res.body.should.have.property('success').equal('false');
        res.body.should.have.property('field').equal('password');
        done();
      });
  });

  it('should NOT let user sign up with a less than 8 character password', (done) => {
    api
      .post('/api/v1/signup')
      .send(assumedData.lessPass)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(400);
        res.body.should.have.property('error').equal('Password is Too Short!');
        res.body.should.have.property('success').equal('false');
        res.body.should.have.property('field').equal('password');
        done();
      });
  });

  it('should not let user sign up with mismatch password', (done) => {
    api
      .post('/api/v1/signup')
      .send(assumedData.passMismatchUsers)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(400);
        res.body.should.have.property('error').equal('Verifiable Password Does not Match!');
        res.body.should.have.property('success').equal('false');
        res.body.should.have.property('field').equal('verify');
        done();
      });
  });

  it('should let users sign up successfully', (done) => {
    api
      .post('/api/v1/signup')
      .send(assumedData.newUsers)
      .end((err, res) => {
        console.log(err);
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.data.should.be.a('object');
        expect(res)
          .to.have.nested.property('body.data')
          .that.includes.all.keys(['id', 'token', 'first_name', 'last_name', 'email']);
        res.body.data.id.should.be.a('number');
        res.body.data.token.should.be.a('string');
        res.body.data.first_name.should.be.a('string');
        res.body.data.last_name.should.be.a('string');
        res.body.data.email.should.be.a('string');
        res.body.data.should.have.property('success').equals('true');
        res.body.data.should.have.property('message').equals('Your Signed up was successful');
        done();
      });
  });
});


describe('Users Sign In Tests', () => {
  it('should NOT let users sign in with no Email', (done) => {
    api
      .post('/api/v1/signin')
      .send(assumedData.noEmailUsers)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(400);
        res.body.should.have.property('error').equal('Please Enter a Valid Email!');
        res.body.should.have.property('success').equal('false');
        res.body.should.have.property('field').equal('email');
        done();
      });
  });

  it('should NOT let users sign in with no Password', (done) => {
    api
      .post('/api/v1/signin')
      .send(assumedData.noPasswordUsers)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(400);
        res.body.should.have.property('error').equal('Please enter your password!');
        res.body.should.have.property('success').equal('false');
        res.body.should.have.property('field').equal('password');
        done();
      });
  });

  it('should NOT let users sign in with Unregistered Account', (done) => {
    api
      .post('/api/v1/signin')
      .send(assumedData.falseUsers)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(401);
        res.body.should.have.property('error').equal('Invalid Signin Credentials!');
        res.body.should.have.property('success').equal('false');
        done();
      });
  });

  it('should NOT let users signin with wrong password', function () {
    this.timeout(5000);
    api
      .post('/api/v1/signin')
      .send(assumedData.passMismatchUsers)
      .end((_err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(401);
        res.body.should.have.property('error').equal('Invalid Signin Credentials!');
        res.body.should.have.property('success').equal('false');
      });
  });

  it('should let users sign in successfully', (done) => {
    api
      .post('/api/v1/signin')
      .send(assumedData.newUsers)
      .end((err, res) => {
        res.should.have.status(202);
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(202);
        res.body.data.should.have.property('message').equal('Auth successful!');
        res.body.data.should.have.property('token');
        fs.writeFileSync(`${__dirname}/assumed/token.txt`, res.body.data.token, () => {
        });
        done();
      });
  });
});

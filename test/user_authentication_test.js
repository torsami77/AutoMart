
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import assumedData from './assumed/assume';

chai.use(chaiHttp);

chai.should();
const { expect } = chai;

const api = chai.request('http://localhost:5000');

let token;
let userId;

/*
describe('Auto Mart', () => {
  it('should get 404 page', (done) => {
    chai.request(app)
      .get('/invalidendpoint')
      .end((err, res) => {
        res.body.should.be.a('object');
        res.should.have.status(404);
        res.body.should.have.property('status').eql(404);
        res.body.should.have.property('data').equal('Invalid endpoint');
        done();
      });
  });
});
*/
describe('Users Sign Up Tests', () => {
  it('should NOT let user sign up without email', (done) => {
    api
      .post('/api/v1/signup')
      .send(assumedData.noEmailUsers)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(401);
        res.body.should.have.property('error').equal('Please Enter a Valid Email');
        done();
      });
  });

  it('should NOT let user sign up without username', (done) => {
    api
      .post('/api/v1/signup')
      .send(assumedData.noUsernameUsers)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(401);
        res.body.should.have.property('error').equal('Please Provide a Username');
        done();
      });
  });

  it('should NOT let user sign up without firstname', (done) => {
    api
      .post('/api/v1/signup')
      .send(assumedData.noFirstNameUsers)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(401);
        res.body.should.have.property('error').equal('Please Enter your First Name');
        done();
      });
  });

  it('should NOT let user sign up without lastname', (done) => {
    api
      .post('/api/v1/signup')
      .send(assumedData.noLastNameUsers)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(401);
        res.body.should.have.property('error').equal('Please Enter your Last Name');
        done();
      });
  });

  it('should NOT let user sign up without password', (done) => {
    api
      .post('/api/v1/signup')
      .send(assumedData.noPasswordUsers)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(401);
        res.body.should.have.property('error').equal('Please Provide a Password');
        done();
      });
  });

  it('should NOT let user sign up with a less than 8 character password', (done) => {
    api
      .post('/api/v1/signup')
      .send(assumedData.lessPass)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(401);
        res.body.should.have.property('error').equal('Password is Too Short!');
        done();
      });
  });

  it('should not let user sign up with mismatch password', (done) => {
    api
      .post('/api/v1/signup')
      .send(assumedData.passMismatchUsers)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(401);
        res.body.should.have.property('error').equal('Verifiable Password Does not Match!');
        done();
      });
  });

  it('should let users sign up successfully', (done) => {
    api
      .post('/api/v1/signup')
      .send(assumedData.newUsers)
      .end((err, res) => {
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
        userId = res.body.data.id;
        done();
      });
  });
});


/*
describe('Users Sign In Tests', () => {
  it('should NOT let users sign in with wrong credentials', (done) => {
    const User = {
      username: 'invalidUser',
      password: fakeData.newUsers.password,
    };
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(User)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('status').equal(400);
        res.body.data.should.have.property('error').equal('Invalid signin credentials!');
        done();
      });
  });

  it('should NOT let users signin with wrong password', (done) => {
    const User = {
      username: fakeData.newUsers.email,
      password: 'wrongpassword',
    };
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(User)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('status').equal(400);
        res.body.data.should.have.property('error').equal('Invalid signin credentials!');
        done();
      });
  });

  it('should let users sign in successfully', (done) => {
    const User = {
      username: fakeData.newUsers.email,
      password: fakeData.newUsers.password,
    };
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send(User)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(200);
        res.body.data.should.have.property('message').equal('Sign in Successful!');
        res.body.data.should.have.property('Token');
        token = res.body.Token;
        done();
      });
  });
});

export default { token, userId };
*/

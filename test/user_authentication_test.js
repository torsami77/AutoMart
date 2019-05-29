/*
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import fakeData from './faker/fake';

chai.use(chaiHttp);

chai.should();
const expect = chai.expect();


let token;
let userId;

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

describe('Users Sign Up Tests', () => {
  it('should NOT let user sign up without email', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(fakeData.noEmailUsers)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(404);
        res.body.should.have.property('error').equal('Please Enter a Valid Email');
        done();
      });
  });

  it('should NOT let user sign up without username', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(fakeData.noUsernameUsers)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(404);
        res.body.should.have.property('error').equal('Please Provide a Username');
        done();
      });
  });

  it('should NOT let user sign up without firstname', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(fakeData.noFirstNameUsers)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(404);
        res.body.should.have.property('error').equal('Please Enter your First Name');
        done();
      });
  });

  it('should NOT let user sign up without lastname', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(fakeData.noLastNameUsers)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(404);
        res.body.should.have.property('error').equal('Please Enter your Last Name');
        done();
      });
  });

  it('should NOT let user sign up without password', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(fakeData.noPasswordUsers)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(404);
        res.body.should.have.property('error').equal('Please Provide a Password');
        done();
      });
  });

  it('should NOT let user sign up with a less than 8 character password', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(fakeData.lessPass)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(404);
        res.body.should.have.property('error').equal('Password is Too Short!');
        done();
      });
  });

  it('should not let user sign up with mismatch password', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(fakeData.passMismatchUsers)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(404);
        res.body.should.have.property('error').equal('Verifiable Password Does not Match!');
        done();
      });
  });

  it('should let users sign up successfully', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(fakeData.newUsers)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.data.should.be.a('object');
        expect(res)
          .to.have.nested.property('body.data[0]')
          .that.includes.all.keys(['token', 'id', 'first_name', 'last_name', 'email', 'admin']);
        res.body.data.token.should.be.a('string');
        res.body.data.id.should.be.a('integer');
        res.body.data.first_name.should.be.a('string');
        res.body.data.last_name.should.be.a('string');
        res.body.data.email.should.be.a('string');
        res.body.data.admin.should.be.a('boolean');
        userId = res.body.data.id;
        done();
      });
  });
});

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

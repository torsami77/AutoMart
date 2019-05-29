/*
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import fakeData from './faker/fake';
import authData from './user_authentication_test';

chai.use(chaiHttp);

chai.should();
const expect = chai.expect();

const { token } = authData;
// eslint-disable-next-line import/no-mutable-exports
let carId;


describe('User Seller Activities', () => {
  it('should NOT let unauthenticated user (seller) create a new Advert ', (done) => {
    chai.request(app)
      .post('/api/v1/car/')
      .send(fakeData.newAdvert)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(404);
        res.body.data.should.have.property('message').equal('Unauthorised User!');
        done();
      });
  });

  it('should NOT let invalid Token user to post new Advert/affect posted Advert', (done) => {
    chai.request(app)
      .post('/api/v1/car')
      .send(fakeData.newAdvert)
      .set('authorization', 'represents invalid toke')
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(404);
        res.body.data.should.have.property('message').equal('Unauthorised User!');
        done();
      });
  });

  it('should let authenticated user (seller) to create new Advert', (done) => {
    chai.request(app)
      .post('/api/v1/car')
      .send(fakeData.newAdvert)
      .set('authorization', token)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(200);
        res.body.data.should.be.a('object');
        expect(res)
          .to.have.nested.property('body.data[0]')
          .that.includes.all.keys(['email', 'created_on', 'manufacturer', 'model',
          'price', 'state', 'status']);
        res.body.data.email.should.be.a('string');
        res.body.data.created_on.should.be.a('string');
        res.body.data.manufacturer.should.be.a('string');
        res.body.data.model.should.be.a('string');
        res.body.data.price.should.be.a('float');
        res.body.data.state.should.be.a('string');
        res.body.data.status.should.be.a('string');
        carId = res.body.data.id;
        done();
      });
  });

  it('Should let Authenticated User (seller) to mark his/her posted Advert as sold', (done) => {
    chai.request(app)
      .patch(`/api/v1/car/${carId}/status`)
      .send(fakeData.updateAdvert)
      .set('authorization', token)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(200);
        res.body.data.should.have.property('message').equal('Advert updated!');
        res.body.data.should.have.property('status').equal(fakeData.updateAdvert.sold);
        done();
      });
  });

  it('Should let Authenticated User (seller) to update the price of his/her posted AD.', (done) => {
    chai.request(app)
      .patch(`/api/v1/car/${carId}/price`)
      .send(fakeData.updateAdvert)
      .set('authorization', token)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(200);
        res.body.data.should.have.property('message').equal('Advert updated!');
        res.body.data.should.have.property('price').equal(fakeData.updateAdvert.price);
        done();
      });
  });
});

export default carId;
*/

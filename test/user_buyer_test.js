/*
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import fakeData from './faker/fake';
import authData from './user_authentication_test';


chai.use(chaiHttp);

chai.should();
const expect = chai.expect();

let orderId;
const { token } = authData;


describe('User Buyer Activities', () => {
  it('should NOT let unauthenticated user (buyer) to make a purchase order', (done) => {
    chai.request(app)
      .post('/api/v1/order/')
      .send(fakeData.purchaseOrder)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(404);
        res.body.data.should.have.property('message').equal('Unauthorised User!');
        done();
      });
  });

  it('should let authenticated user (buyer) to make a purchase order', (done) => {
    chai.request(app)
      .post('/api/v1/order/')
      .send(fakeData.purchaseOrder)
      .set('authorization', token)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(200);
        res.body.data.should.have.property('message').equal('Purchase order Placed successfully!');
        expect(res)
          .to.have.nested.property('body.data[0]')
          .that.includes.all.keys(['id', 'car_id', 'created_on',
          'status', 'price', 'price_offered']);
        res.body.data.id.should.be.a('integer');
        res.body.data.car_id.should.be.a('integer');
        res.body.data.created_on.should.be.a('string');
        res.body.data.status.should.be.a('string');
        res.body.data.price.should.be.a('float');
        res.body.data.price_offered.should.be.a('float');
        orderId = res.body.data.id;
        done();
      });
  });

  it('should let authenticated user (buyer) to Update the price of a purchase order', (done) => {
    chai.request(app)
      .patch(`/api/v1/order/${orderId}/price`)
      .send(fakeData.updateOrder)
      .set('authorization', token)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(200);
        res.body.data.should.have.property('message').equal('Purchase order updated successfully!');
        expect(res)
          .to.have.nested.property('body.data[0]')
          .that.includes.all.keys(['id', 'car_id', 'status', 'old_price_offered',
          'new_price_offered']);
        res.body.data.id.should.be.a('integer');
        res.body.data.car_id.should.be.a('integer');
        res.body.data.status.should.be.a('string');
        res.body.data.old_price_offered.should.be.a('float');
        res.body.data.new_price_offered.should.be.a('float');
        done();
      });
  });
});
*/

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

const data = fs.readFileSync(`${__dirname}/assumed/token.txt`);
const token = data.toString();
// eslint-disable-next-line import/no-mutable-exports
let orderId;


describe('User Buyer Activities', () => {
  it('should NOT let unauthenticated user (buyer) to make a purchase order', (done) => {
    api
      .post('/api/v1/order/')
      .send(assumedData.newOrder)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(401);
        res.body.should.have.property('success').equal('false');
        res.body.should.have.property('error').equal('Unauthorised User!');
        done();
      });
  });

  it('should NOT let auth user (buyer) to attempt a purchase order with invalid order id', (done) => {
    api
      .post('/api/v1/order/')
      .set('authorization', token)
      .send(assumedData.invalidOrderReff)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(400);
        res.body.should.have.property('success').equal('false');
        res.body.should.have.property('error').equal('Please provide a valid order reference!');
        done();
      });
  });

  it('should NOT let auth user (buyer) to attempt a purchase order with invalid price value', (done) => {
    api
      .post('/api/v1/order/')
      .set('authorization', token)
      .send(assumedData.invalidOrderAmount)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(400);
        res.body.should.have.property('success').equal('false');
        res.body.should.have.property('error').equal('Please provide a valid price value!');
        done();
      });
  });

  it('should respond to auth user (buyer) attempting a purchase with NON-EXISTENT reference', (done) => {
    api
      .post('/api/v1/order/')
      .set('authorization', token)
      .send(assumedData.orderNotFound)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(404);
        res.body.should.have.property('success').equal('false');
        res.body.should.have.property('error').equal('Ad not found, Please provide actual car Id!');
        done();
      });
  });

  it('should let authenticated user (buyer) to make a purchase order', (done) => {
    api
      .post('/api/v1/order/')
      .set('authorization', token)
      .send(assumedData.newOrder)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(201);
        res.body.data.should.have.property('message').equal('Your Order has been placed successfully!');
        res.body.data.should.have.property('success').equal('true');
        expect(res)
          .to.have.nested.property('body.data')
          .that.includes.all.keys(['id', 'carId', 'created_on',
            'status', 'price', 'price_offered']);
        res.body.data.id.should.be.a('number');
        res.body.data.carId.should.be.a('number');
        res.body.data.created_on.should.be.a('string');
        res.body.data.status.should.be.a('string');
        res.body.data.price.should.be.a('string');
        res.body.data.price_offered.should.be.a('number');
        orderId = res.body.data.id;
        done();
      });
  });

  it('should NOT let unauthenticated user (buyer) to UPDATE purchase order', (done) => {
    api
      .patch(`/api/v1/order/${orderId}/price`)
      .send(assumedData.newOrderUpdate)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(401);
        res.body.should.have.property('success').equal('false');
        res.body.should.have.property('error').equal('Unauthorised User!');
        done();
      });
  });

  it('should NOT let auth user (buyer) to attempt a purchase UPDATE with invalid order id', (done) => {
    api
      .patch('/api/v1/order/kkkk/price')
      .set('authorization', token)
      .send(assumedData.invalidOrderReffUpdate)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(400);
        res.body.should.have.property('success').equal('false');
        res.body.should.have.property('error').equal('Please provide a valid order reference!');
        done();
      });
  });

  it('should NOT let auth user (buyer) to attempt a purchase UPDATE with invalid price value', (done) => {
    api
      .patch(`/api/v1/order/${orderId}/price`)
      .set('authorization', token)
      .send(assumedData.invalidOrderAmountUpdate)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(400);
        res.body.should.have.property('success').equal('false');
        res.body.should.have.property('error').equal('Please provide a valid price value!');
        done();
      });
  });


  it('should NOT let auth user (buyer) to attempt a UPDATE purchase with NOT Found Ad', (done) => {
    api
      .patch(`/api/v1/order/${orderId}/price`)
      .set('authorization', token)
      .send(assumedData.AdFoundorderNotFound)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(404);
        res.body.should.have.property('success').equal('false');
        res.body.should.have.property('error').equal('Ad not found!');
        done();
      });
  });

  it('should NOT let auth user (buyer) to attempt a UPDATE purchase with NOT Found order', (done) => {
    api
      .patch(`/api/v1/order/${orderId}/price`)
      .set('authorization', token)
      .send(assumedData.AdFoundorderNotFound)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(404);
        res.body.should.have.property('success').equal('false');
        res.body.should.have.property('error').equal('Ad not found!');
        done();
      });
  });

  it('should let authenticated user (buyer) to UPDATE the price of their purchase order', (done) => {
    api
      .patch(`/api/v1/order/${orderId}/price`)
      .set('authorization', token)
      .send(assumedData.updateOrder)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(201);
        res.body.data.should.have.property('message').equal('Your Order has been updated successfully!');
        expect(res)
          .to.have.nested.property('body.data')
          .that.includes.all.keys(['id', 'carId', 'status', 'old_price_offered',
            'new_price_offered']);
        res.body.data.id.should.be.a('number');
        res.body.data.carId.should.be.a('number');
        res.body.data.status.should.be.a('string');
        res.body.data.old_price_offered.should.be.a('number');
        res.body.data.new_price_offered.should.be.a('number');
        done();
      });
  });

  it('should NOT let auth user (buyer) to attempt FLAG with INVALID refference', (done) => {
    api
      .post('/api/v1/flag')
      .set('authorization', token)
      .send(assumedData.flagNoRef)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(400);
        res.body.should.have.property('success').equal('false');
        res.body.should.have.property('error').equal('Please provide a valid Ad reference!');
        done();
      });
  });

  it('should NOT let auth user (buyer) to attempt FLAG withOUT REASON', (done) => {
    api
      .post('/api/v1/flag')
      .set('authorization', token)
      .send(assumedData.flagNoReason)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(400);
        res.body.should.have.property('success').equal('false');
        res.body.should.have.property('error').equal('Please indicate your reason for this red flag!');
        done();
      });
  });

  it('should NOT let auth user (buyer) to attempt FLAG withOUT DESCRIPTION', (done) => {
    api
      .post('/api/v1/flag')
      .set('authorization', token)
      .send(assumedData.flagNoDescription)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(400);
        res.body.should.have.property('success').equal('false');
        res.body.should.have.property('error').equal('Please enter description for your red flag!');
        done();
      });
  });

  it('should NOT let auth user (buyer) to attempt FLAG with NOT Found refference', (done) => {
    api
      .post('/api/v1/flag')
      .set('authorization', token)
      .send(assumedData.newFlagNotFound)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(404);
        res.body.should.have.property('success').equal('false');
        res.body.should.have.property('error').equal('Ad not found!');
        done();
      });
  });

  it('should let auth user (buyer) to FLAG an AD successfully', (done) => {
    api
      .post('/api/v1/flag')
      .set('authorization', token)
      .send(assumedData.newFlag)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(201);
        res.body.data.should.have.property('success').equal('true');
        res.body.data.should.have.property('message').equal('Red flag raised successfully!');
        res.body.data.id.should.be.a('number');
        res.body.data.car_Id.should.be.a('number');
        res.body.data.reason.should.be.a('string');
        res.body.data.description.should.be.a('string');
        done();
      });
  });
});

/* eslint-disable func-names */
import chai from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
import util from 'util';
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
let carId;


describe('User Seller Activities', () => {
  it('should NOT let unauthenticated user (seller) create a new Advert ', (done) => {
    api
      .post('/api/v1/car/')
      .send(assumedData.newAdvert)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(401);
        res.body.should.have.property('error').equal('Unauthorised User!');
        res.body.should.have.property('success').equal('false');
        done();
      });
  });

  it('Should NOT let invalid Token user to post new Advert/affect posted Advert', (done) => {
    api
      .post('/api/v1/car')
      .set('token', 'invalidtoken')
      .set('Accept', 'application.json')
      .field('manufacturer', assumedData.newAdvert.manufacturer)
      .field('model', assumedData.newAdvert.model)
      .field('body_type', assumedData.newAdvert.bodyType)
      .field('year', assumedData.newAdvert.year)
      .field('mileage', assumedData.newAdvert.mileage)
      .field('state', assumedData.newAdvert.state)
      .field('location', assumedData.newAdvert.location)
      .field('transmission', assumedData.newAdvert.transmission)
      .field('vehicle_inspection_number', assumedData.newAdvert.vehicleInspectionNumber)
      .field('licence', assumedData.newAdvert.licence)
      .field('description', assumedData.newAdvert.description)
      .field('price', assumedData.newAdvert.price)
      .attach('image_url', `${__dirname}/assumed/blank.pdf`)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(401);
        res.body.should.have.property('error').equal('Unauthorised User!');
        res.body.should.have.property('success').equal('false');
        done();
      });
  });

  it('Should NOT let Authenticated User (Seller) to post new Advert without MANUFACTURER input', (done) => {
    api
      .post('/api/v1/car')
      .set('token', token)
      .set('Accept', 'application.json')
      .field('model', assumedData.newAdvert.model)
      .field('body_type', assumedData.newAdvert.bodyType)
      .field('year', assumedData.newAdvert.year)
      .field('mileage', assumedData.newAdvert.mileage)
      .field('state', assumedData.newAdvert.state)
      .field('location', assumedData.newAdvert.location)
      .field('transmission', assumedData.newAdvert.transmission)
      .field('vehicle_inspection_number', assumedData.newAdvert.vehicleInspectionNumber)
      .field('licence', assumedData.newAdvert.licence)
      .field('description', assumedData.newAdvert.description)
      .field('price', assumedData.newAdvert.price)
      .attach('image_url', `${__dirname}/assumed/blank.pdf`)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(400);
        res.body.should.have.property('error').equal('manufacturer field cannot be empty!');
        res.body.should.have.property('success').equal('false');
        done();
      });
  });

  it('Should NOT let Auth User (Seller) to post new Advert without MODEL input', (done) => {
    api
      .post('/api/v1/car')
      .set('token', token)
      .set('Accept', 'application.json')
      .field('manufacturer', assumedData.newAdvert.manufacturer)
      .field('body_type', assumedData.newAdvert.bodyType)
      .field('year', assumedData.newAdvert.year)
      .field('mileage', assumedData.newAdvert.mileage)
      .field('state', assumedData.newAdvert.state)
      .field('location', assumedData.newAdvert.location)
      .field('transmission', assumedData.newAdvert.transmission)
      .field('vehicle_inspection_number', assumedData.newAdvert.vehicleInspectionNumber)
      .field('licence', assumedData.newAdvert.licence)
      .field('description', assumedData.newAdvert.description)
      .field('price', assumedData.newAdvert.price)
      .attach('image_url', `${__dirname}/assumed/blank.pdf`)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(400);
        res.body.should.have.property('error').equal('model field cannot be empty!');
        res.body.should.have.property('success').equal('false');
        done();
      });
  });

  it('Should NOT let Auth User (Seller) to post new Advert without BODY TYPE input', (done) => {
    api
      .post('/api/v1/car')
      .set('token', token)
      .set('Accept', 'application.json')
      .field('manufacturer', assumedData.newAdvert.manufacturer)
      .field('model', assumedData.newAdvert.model)
      .field('year', assumedData.newAdvert.year)
      .field('mileage', assumedData.newAdvert.mileage)
      .field('state', assumedData.newAdvert.state)
      .field('location', assumedData.newAdvert.location)
      .field('transmission', assumedData.newAdvert.transmission)
      .field('vehicle_inspection_number', assumedData.newAdvert.vehicleInspectionNumber)
      .field('licence', assumedData.newAdvert.licence)
      .field('description', assumedData.newAdvert.description)
      .field('price', assumedData.newAdvert.price)
      .attach('image_url', `${__dirname}/assumed/blank.pdf`)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(400);
        res.body.should.have.property('error').equal('body type field cannot be empty!');
        res.body.should.have.property('success').equal('false');
        done();
      });
  });


  it('Should NOT let Auth User (Seller) to post new Advert with INVALID YEAR input', (done) => {
    api
      .post('/api/v1/car')
      .set('token', token)
      .set('Accept', 'application.json')
      .field('manufacturer', assumedData.newAdvert.manufacturer)
      .field('model', assumedData.newAdvert.model)
      .field('body_type', assumedData.newAdvert.year)
      .field('year', 'year')
      .field('mileage', assumedData.newAdvert.mileage)
      .field('state', assumedData.newAdvert.state)
      .field('location', assumedData.newAdvert.location)
      .field('transmission', assumedData.newAdvert.transmission)
      .field('vehicle_inspection_number', assumedData.newAdvert.vehicleInspectionNumber)
      .field('licence', assumedData.newAdvert.licence)
      .field('description', assumedData.newAdvert.description)
      .field('price', assumedData.newAdvert.price)
      .attach('image_url', `${__dirname}/assumed/blank.pdf`)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(422);
        res.body.should.have.property('error').equal('invalid year input!');
        res.body.should.have.property('success').equal('false');
        done();
      });
  });

  it('Should NOT let Auth User (Seller) to post new Advert without STATE input', (done) => {
    api
      .post('/api/v1/car')
      .set('token', token)
      .set('Accept', 'application.json')
      .field('manufacturer', assumedData.newAdvert.manufacturer)
      .field('model', assumedData.newAdvert.model)
      .field('body_type', assumedData.newAdvert.bodyType)
      .field('year', assumedData.newAdvert.year)
      .field('mileage', assumedData.newAdvert.mileage)
      .field('location', assumedData.newAdvert.location)
      .field('transmission', assumedData.newAdvert.transmission)
      .field('vehicle_inspection_number', assumedData.newAdvert.vehicleInspectionNumber)
      .field('licence', assumedData.newAdvert.licence)
      .field('description', assumedData.newAdvert.description)
      .field('price', assumedData.newAdvert.price)
      .attach('image_url', `${__dirname}/assumed/blank.pdf`)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(400);
        res.body.should.have.property('error').equal('state field cannot be empty!');
        res.body.should.have.property('success').equal('false');
        done();
      });
  });

  it('Should NOT let Auth User (Seller) to post new Advert with INVALID MILEAGE input', (done) => {
    api
      .post('/api/v1/car')
      .set('token', token)
      .set('Accept', 'application.json')
      .field('manufacturer', assumedData.newAdvert.manufacturer)
      .field('model', assumedData.newAdvert.model)
      .field('body_type', assumedData.newAdvert.bodyType)
      .field('year', assumedData.newAdvert.year)
      .field('mileage', 'mileage')
      .field('state', assumedData.newAdvert.state)
      .field('location', assumedData.newAdvert.location)
      .field('transmission', assumedData.newAdvert.transmission)
      .field('vehicle_inspection_number', assumedData.newAdvert.vehicleInspectionNumber)
      .field('licence', assumedData.newAdvert.licence)
      .field('description', assumedData.newAdvert.description)
      .field('price', assumedData.newAdvert.price)
      .attach('image_url', `${__dirname}/assumed/blank.pdf`)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(422);
        res.body.should.have.property('error').equal('invalid mileage input!');
        res.body.should.have.property('success').equal('false');
        done();
      });
  });

  it('Should NOT let Auth User (Seller) to post new Advert without PRICE input', (done) => {
    api
      .post('/api/v1/car')
      .set('token', token)
      .set('Accept', 'application.json')
      .field('manufacturer', assumedData.newAdvert.manufacturer)
      .field('model', assumedData.newAdvert.model)
      .field('body_type', assumedData.newAdvert.bodyType)
      .field('year', assumedData.newAdvert.year)
      .field('mileage', assumedData.newAdvert.mileage)
      .field('state', assumedData.newAdvert.state)
      .field('location', assumedData.newAdvert.location)
      .field('transmission', assumedData.newAdvert.transmission)
      .field('vehicle_inspection_number', assumedData.newAdvert.vehicleInspectionNumber)
      .field('licence', assumedData.newAdvert.licence)
      .field('description', assumedData.newAdvert.description)
      .attach('image_url', `${__dirname}/assumed/blank.pdf`)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(400);
        res.body.should.have.property('error').equal('price field cannot be empty!');
        res.body.should.have.property('success').equal('false');
        done();
      });
  });

  it('Should NOT let Auth User (Seller) to post new Advert with INVALID PRICE input', (done) => {
    api
      .post('/api/v1/car')
      .set('token', token)
      .set('Accept', 'application.json')
      .field('manufacturer', assumedData.newAdvert.manufacturer)
      .field('model', assumedData.newAdvert.model)
      .field('body_type', assumedData.newAdvert.bodyType)
      .field('year', assumedData.newAdvert.year)
      .field('mileage', assumedData.newAdvert.mileage)
      .field('state', assumedData.newAdvert.state)
      .field('location', assumedData.newAdvert.location)
      .field('transmission', assumedData.newAdvert.transmission)
      .field('vehicle_inspection_number', assumedData.newAdvert.vehicleInspectionNumber)
      .field('licence', assumedData.newAdvert.licence)
      .field('price', 'price')
      .field('description', assumedData.newAdvert.description)
      .attach('image_url', `${__dirname}/assumed/blank.pdf`)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(422);
        res.body.should.have.property('error').equal('invalid price input!');
        res.body.should.have.property('success').equal('false');
        done();
      });
  });


  it('should NOT let Auth User (Seller) to post new Advert without valid IMAGE format', (done) => {
    api
      .post('/api/v1/car')
      .set('token', token)
      .set('Accept', 'application.json')
      .field('manufacturer', assumedData.newAdvert.manufacturer)
      .field('model', assumedData.newAdvert.model)
      .field('body_type', assumedData.newAdvert.bodyType)
      .field('year', assumedData.newAdvert.year)
      .field('mileage', assumedData.newAdvert.mileage)
      .field('state', assumedData.newAdvert.state)
      .field('location', assumedData.newAdvert.location)
      .field('transmission', assumedData.newAdvert.transmission)
      .field('vehicle_inspection_number', assumedData.newAdvert.vehicleInspectionNumber)
      .field('licence', assumedData.newAdvert.licence)
      .field('description', assumedData.newAdvert.description)
      .field('price', assumedData.newAdvert.price)
      .attach('image_url', `${__dirname}/assumed/blank.pdf`)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(422);
        res.body.should.have.property('error').equal('Please provide a valid image file!');
        done();
      });
  });

  it('should let Auth User (Seller) to post new Advert with CAR IMAGE input', function (done) {
    this.timeout(20000);
    api
      .post('/api/v1/car')
      .set('token', token)
      .set('Accept', 'application.json')
      .field('manufacturer', assumedData.newAdvert.manufacturer)
      .field('model', assumedData.newAdvert.model)
      .field('body_type', assumedData.newAdvert.bodyType)
      .field('year', assumedData.newAdvert.year)
      .field('mileage', assumedData.newAdvert.mileage)
      .field('state', assumedData.newAdvert.state)
      .field('location', assumedData.newAdvert.location)
      .field('transmission', assumedData.newAdvert.transmission)
      .field('vehicle_inspection_number', assumedData.newAdvert.vehicleInspectionNumber)
      .field('licence', assumedData.newAdvert.licence)
      .field('description', assumedData.newAdvert.description)
      .field('price', assumedData.newAdvert.price)
      .attach('image_url', `${__dirname}/assumed/download.png`)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(201);
        res.body.data.should.be.a('object');
        expect(res)
          .to.have.nested.property('body.data')
          .that.includes.all.keys(['id', 'email', 'created_on', 'manufacturer', 'model',
            'price', 'state', 'status', 'image_gallery']);
        res.body.data.id.should.be.a('number');
        res.body.data.email.should.be.a('string');
        res.body.data.created_on.should.be.a('string');
        res.body.data.manufacturer.should.be.a('string');
        res.body.data.model.should.be.a('string');
        res.body.data.price.should.be.a('number');
        res.body.data.state.should.be.a('string');
        res.body.data.status.should.be.a('string');
        res.body.data.image_gallery.should.be.a('array');
        res.body.data.should.have.property('message').equal('Your Ad has been added successfully!');
        carId = res.body.data.id;
        done();
      });
  });

  it('Should NOT let UnAuth User (Seller) change Ad price', (done) => {
    api
      .patch(`/api/v1/car/${carId}/price`)
      .send(assumedData.newPrice)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(401);
        res.body.should.have.property('success').equal('false');
        res.body.should.have.property('error').equal('Unauthorised User!');
        done();
      });
  });

  it('Should NOT let Auth User (Seller) change price of sold or not owned AD', function (done) {
    this.timeout(5000);
    api
      .patch('/api/v1/car/5/price')
      .set('token', token)
      .send(assumedData.newPrice)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(404);
        res.body.should.have.property('success').equal('false');
        res.body.should.have.property('field').equal('price');
        res.body.should.have.property('error').equal('Ad not found or not owned by you!');
        done();
      });
  });

  it('Should NOT let Auth User (Seller) change Ad price to invalid value ', (done) => {
    api
      .patch(`/api/v1/car/${carId}/price`)
      .set('token', token)
      .send(assumedData.invalidPrice)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(400);
        res.body.should.have.property('error').equal('Invalid Price value!');
        done();
      });
  });

  it('should NOT let Auth User (Seller) change Ad price with invalid reference', (done) => {
    api
      .patch('/api/v1/car/:carId/price')
      .set('token', token)
      .send(assumedData.newPrice)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(400);
        res.body.should.have.property('field').equal('car_id');
        res.body.should.have.property('error').equal('Invalid Car ID!');
        done();
      });
  });

  it('should let Auth User (Seller) change Ad price sucessfully', function (done) {
    this.timeout(20000);
    api
      .patch(`/api/v1/car/${carId}/price`)
      .set('token', token)
      .send(assumedData.newPrice)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(200);
        res.body.should.have.property('data');
        res.body.data.should.be.a('object');
        expect(res)
          .to.have.nested.property('body.data')
          .that.includes.all.keys(['id', 'owner', 'email', 'created_on', 'manufacturer', 'model',
            'price', 'state', 'status', 'message', 'success', 'field']);
        res.body.data.id.should.be.a('number');
        res.body.data.owner.should.be.a('number');
        res.body.data.email.should.be.a('string');
        res.body.data.created_on.should.be.a('string');
        res.body.data.manufacturer.should.be.a('string');
        res.body.data.model.should.be.a('string');
        res.body.data.price.should.be.a('number');
        res.body.data.state.should.be.a('string');
        res.body.data.status.should.be.a('string');
        res.body.data.should.have.property('message').equal('New price Updated!');
        res.body.data.should.have.property('success').equal('true');
        res.body.data.should.have.property('field').equal('price');
        done();
      });
  });

  it('Should NOT let UnAuth User (Seller) Mark Ad as sold', (done) => {
    api
      .patch(`/api/v1/car/${carId}/status`)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(401);
        res.body.should.have.property('success').equal('false');
        res.body.should.have.property('error').equal('Unauthorised User!');
        done();
      });
  });

  /*
  it('Should NOT let Auth User (Seller) change status to sold of NOT OWNED AD', (done) => {
    api
      .patch('/api/v1/car/1/status')
      .send(assumedData.newUsers)
      .set('token', token)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(403);
        res.body.should.have.property('success').equal('false');
        res.body.should.have.property('field').equal('status');
        res.body.should.have.property('error').equal('You are not allowed to mark this Ad as sold!');
        done();
      });
  });
  */
/*
  it('should NOT let Auth User (Seller) Mark Ad as sold with invalid reference', (done) => {
    api
      .patch('/api/v1/car/:carId/status')
      .send(assumedData.newUsers)
      .set('token', token)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(400);
        res.body.should.have.property('success').equal('false');
        res.body.should.have.property('field').equal('carId');
        res.body.should.have.property('error').equal('Invalid Car ID!');
        done();
      });
  });

  it('should let Auth User (Seller) Mark AD as sold sucessfully', function (done) {
    this.timeout(20000);
    api
      .patch(`/api/v1/car/${carId}/status`)
      .send(assumedData.newUsers)
      .set('token', token)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(200);
        res.body.should.have.property('data');
        res.body.data.should.be.a('object');
        expect(res)
          .to.have.nested.property('body.data')
          .that.includes.all.keys(['id', 'owner', 'email', 'created_on', 'manufacturer', 'model',
            'price', 'state', 'status', 'message', 'success', 'field']);
        res.body.data.id.should.be.a('number');
        res.body.data.owner.should.be.a('number');
        res.body.data.email.should.be.a('string');
        res.body.data.created_on.should.be.a('string');
        res.body.data.manufacturer.should.be.a('string');
        res.body.data.model.should.be.a('string');
        res.body.data.price.should.be.a('number');
        res.body.data.state.should.be.a('string');
        res.body.data.status.should.be.a('string');
        res.body.data.should.have.property('message').equal('AD marked as sold!');
        res.body.data.should.have.property('success').equal('true');
        res.body.data.should.have.property('field').equal('sold');
        done();
      });
  });
  */
});

export default carId;

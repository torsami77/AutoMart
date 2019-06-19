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
      .set('authorization', 'invalidtoken')
      .set('Accept', 'application.json')
      .field('manufacturer', assumedData.newAdvert.manufacturer)
      .field('model', assumedData.newAdvert.model)
      .field('bodyType', assumedData.newAdvert.bodyType)
      .field('year', assumedData.newAdvert.year)
      .field('mileage', assumedData.newAdvert.mileage)
      .field('state', assumedData.newAdvert.state)
      .field('location', assumedData.newAdvert.location)
      .field('transmission', assumedData.newAdvert.transmission)
      .field('vehicleInspectionNumber', assumedData.newAdvert.vehicleInspectionNumber)
      .field('licence', assumedData.newAdvert.licence)
      .field('description', assumedData.newAdvert.description)
      .field('price', assumedData.newAdvert.price)
      .attach('carImage', `${__dirname}/assumed/blank.pdf`)
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
      .set('authorization', token)
      .set('Accept', 'application.json')
      .field('model', assumedData.newAdvert.model)
      .field('bodyType', assumedData.newAdvert.bodyType)
      .field('year', assumedData.newAdvert.year)
      .field('mileage', assumedData.newAdvert.mileage)
      .field('state', assumedData.newAdvert.state)
      .field('location', assumedData.newAdvert.location)
      .field('transmission', assumedData.newAdvert.transmission)
      .field('vehicleInspectionNumber', assumedData.newAdvert.vehicleInspectionNumber)
      .field('licence', assumedData.newAdvert.licence)
      .field('description', assumedData.newAdvert.description)
      .field('price', assumedData.newAdvert.price)
      .attach('carImage', `${__dirname}/assumed/blank.pdf`)
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
      .set('authorization', token)
      .set('Accept', 'application.json')
      .field('manufacturer', assumedData.newAdvert.manufacturer)
      .field('bodyType', assumedData.newAdvert.bodyType)
      .field('year', assumedData.newAdvert.year)
      .field('mileage', assumedData.newAdvert.mileage)
      .field('state', assumedData.newAdvert.state)
      .field('location', assumedData.newAdvert.location)
      .field('transmission', assumedData.newAdvert.transmission)
      .field('vehicleInspectionNumber', assumedData.newAdvert.vehicleInspectionNumber)
      .field('licence', assumedData.newAdvert.licence)
      .field('description', assumedData.newAdvert.description)
      .field('price', assumedData.newAdvert.price)
      .attach('carImage', `${__dirname}/assumed/blank.pdf`)
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
      .set('authorization', token)
      .set('Accept', 'application.json')
      .field('manufacturer', assumedData.newAdvert.manufacturer)
      .field('model', assumedData.newAdvert.model)
      .field('year', assumedData.newAdvert.year)
      .field('mileage', assumedData.newAdvert.mileage)
      .field('state', assumedData.newAdvert.state)
      .field('location', assumedData.newAdvert.location)
      .field('transmission', assumedData.newAdvert.transmission)
      .field('vehicleInspectionNumber', assumedData.newAdvert.vehicleInspectionNumber)
      .field('licence', assumedData.newAdvert.licence)
      .field('description', assumedData.newAdvert.description)
      .field('price', assumedData.newAdvert.price)
      .attach('carImage', `${__dirname}/assumed/blank.pdf`)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(400);
        res.body.should.have.property('error').equal('body type field cannot be empty!');
        res.body.should.have.property('success').equal('false');
        done();
      });
  });

  it('Should NOT let Auth User (Seller) to post new Advert without YEAR input', (done) => {
    api
      .post('/api/v1/car')
      .set('authorization', token)
      .set('Accept', 'application.json')
      .field('manufacturer', assumedData.newAdvert.manufacturer)
      .field('model', assumedData.newAdvert.model)
      .field('bodyType', assumedData.newAdvert.year)
      .field('mileage', assumedData.newAdvert.mileage)
      .field('state', assumedData.newAdvert.state)
      .field('location', assumedData.newAdvert.location)
      .field('transmission', assumedData.newAdvert.transmission)
      .field('vehicleInspectionNumber', assumedData.newAdvert.vehicleInspectionNumber)
      .field('licence', assumedData.newAdvert.licence)
      .field('description', assumedData.newAdvert.description)
      .field('price', assumedData.newAdvert.price)
      .attach('carImage', `${__dirname}/assumed/blank.pdf`)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(400);
        res.body.should.have.property('error').equal('year field cannot be empty!');
        res.body.should.have.property('success').equal('false');
        done();
      });
  });

  it('Should NOT let Auth User (Seller) to post new Advert with INVALID YEAR input', (done) => {
    api
      .post('/api/v1/car')
      .set('authorization', token)
      .set('Accept', 'application.json')
      .field('manufacturer', assumedData.newAdvert.manufacturer)
      .field('model', assumedData.newAdvert.model)
      .field('bodyType', assumedData.newAdvert.year)
      .field('year', 'year')
      .field('mileage', assumedData.newAdvert.mileage)
      .field('state', assumedData.newAdvert.state)
      .field('location', assumedData.newAdvert.location)
      .field('transmission', assumedData.newAdvert.transmission)
      .field('vehicleInspectionNumber', assumedData.newAdvert.vehicleInspectionNumber)
      .field('licence', assumedData.newAdvert.licence)
      .field('description', assumedData.newAdvert.description)
      .field('price', assumedData.newAdvert.price)
      .attach('carImage', `${__dirname}/assumed/blank.pdf`)
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
      .set('authorization', token)
      .set('Accept', 'application.json')
      .field('manufacturer', assumedData.newAdvert.manufacturer)
      .field('model', assumedData.newAdvert.model)
      .field('bodyType', assumedData.newAdvert.bodyType)
      .field('year', assumedData.newAdvert.year)
      .field('mileage', assumedData.newAdvert.mileage)
      .field('location', assumedData.newAdvert.location)
      .field('transmission', assumedData.newAdvert.transmission)
      .field('vehicleInspectionNumber', assumedData.newAdvert.vehicleInspectionNumber)
      .field('licence', assumedData.newAdvert.licence)
      .field('description', assumedData.newAdvert.description)
      .field('price', assumedData.newAdvert.price)
      .attach('carImage', `${__dirname}/assumed/blank.pdf`)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(400);
        res.body.should.have.property('error').equal('state field cannot be empty!');
        res.body.should.have.property('success').equal('false');
        done();
      });
  });

  it('Should NOT let Auth User (Seller) to post new Advert without LOCATION input', (done) => {
    api
      .post('/api/v1/car')
      .set('authorization', token)
      .set('Accept', 'application.json')
      .field('manufacturer', assumedData.newAdvert.manufacturer)
      .field('model', assumedData.newAdvert.model)
      .field('bodyType', assumedData.newAdvert.bodyType)
      .field('year', assumedData.newAdvert.year)
      .field('mileage', assumedData.newAdvert.mileage)
      .field('state', assumedData.newAdvert.state)
      .field('transmission', assumedData.newAdvert.transmission)
      .field('vehicleInspectionNumber', assumedData.newAdvert.vehicleInspectionNumber)
      .field('licence', assumedData.newAdvert.licence)
      .field('description', assumedData.newAdvert.description)
      .field('price', assumedData.newAdvert.price)
      .attach('carImage', `${__dirname}/assumed/blank.pdf`)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(400);
        res.body.should.have.property('error').equal('location field cannot be empty!');
        res.body.should.have.property('success').equal('false');
        done();
      });
  });

  it('Should NOT let Auth User (Seller) to post new Advert without TRANSMISSION input', (done) => {
    api
      .post('/api/v1/car')
      .set('authorization', token)
      .set('Accept', 'application.json')
      .field('manufacturer', assumedData.newAdvert.manufacturer)
      .field('model', assumedData.newAdvert.model)
      .field('bodyType', assumedData.newAdvert.bodyType)
      .field('year', assumedData.newAdvert.year)
      .field('mileage', assumedData.newAdvert.mileage)
      .field('state', assumedData.newAdvert.state)
      .field('location', assumedData.newAdvert.location)
      .field('vehicleInspectionNumber', assumedData.newAdvert.vehicleInspectionNumber)
      .field('licence', assumedData.newAdvert.licence)
      .field('description', assumedData.newAdvert.description)
      .field('price', assumedData.newAdvert.price)
      .attach('carImage', `${__dirname}/assumed/blank.pdf`)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(400);
        res.body.should.have.property('error').equal('transmission field cannot be empty!');
        res.body.should.have.property('success').equal('false');
        done();
      });
  });

  it('Should NOT let Auth User (Seller) to post new Advert without Veh-Ins-Num input', (done) => {
    api
      .post('/api/v1/car')
      .set('authorization', token)
      .set('Accept', 'application.json')
      .field('manufacturer', assumedData.newAdvert.manufacturer)
      .field('model', assumedData.newAdvert.model)
      .field('bodyType', assumedData.newAdvert.bodyType)
      .field('year', assumedData.newAdvert.year)
      .field('mileage', assumedData.newAdvert.mileage)
      .field('state', assumedData.newAdvert.state)
      .field('location', assumedData.newAdvert.location)
      .field('transmission', assumedData.newAdvert.transmission)
      .field('licence', assumedData.newAdvert.licence)
      .field('description', assumedData.newAdvert.description)
      .field('price', assumedData.newAdvert.price)
      .attach('carImage', `${__dirname}/assumed/blank.pdf`)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(400);
        res.body.should.have.property('error').equal('vehicle inspection number field cannot be empty!');
        res.body.should.have.property('success').equal('false');
        done();
      });
  });

  it('Should NOT let Auth User (Seller) to post new Advert without LICENCE input', (done) => {
    api
      .post('/api/v1/car')
      .set('authorization', token)
      .set('Accept', 'application.json')
      .field('manufacturer', assumedData.newAdvert.manufacturer)
      .field('model', assumedData.newAdvert.model)
      .field('bodyType', assumedData.newAdvert.bodyType)
      .field('year', assumedData.newAdvert.year)
      .field('mileage', assumedData.newAdvert.mileage)
      .field('state', assumedData.newAdvert.state)
      .field('location', assumedData.newAdvert.location)
      .field('transmission', assumedData.newAdvert.transmission)
      .field('vehicleInspectionNumber', assumedData.newAdvert.vehicleInspectionNumber)
      .field('description', assumedData.newAdvert.description)
      .field('price', assumedData.newAdvert.price)
      .attach('carImage', `${__dirname}/assumed/blank.pdf`)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(400);
        res.body.should.have.property('error').equal('licence field cannot be empty!');
        res.body.should.have.property('success').equal('false');
        done();
      });
  });

  it('Should NOT let Auth User (Seller) to post new Advert without MILEAGE input', (done) => {
    api
      .post('/api/v1/car')
      .set('authorization', token)
      .set('Accept', 'application.json')
      .field('manufacturer', assumedData.newAdvert.manufacturer)
      .field('model', assumedData.newAdvert.model)
      .field('bodyType', assumedData.newAdvert.bodyType)
      .field('year', assumedData.newAdvert.year)
      .field('state', assumedData.newAdvert.state)
      .field('location', assumedData.newAdvert.location)
      .field('transmission', assumedData.newAdvert.transmission)
      .field('vehicleInspectionNumber', assumedData.newAdvert.vehicleInspectionNumber)
      .field('licence', assumedData.newAdvert.licence)
      .field('description', assumedData.newAdvert.description)
      .field('price', assumedData.newAdvert.price)
      .attach('carImage', `${__dirname}/assumed/blank.pdf`)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(400);
        res.body.should.have.property('error').equal('mileage field cannot be empty!');
        res.body.should.have.property('success').equal('false');
        done();
      });
  });

  it('Should NOT let Auth User (Seller) to post new Advert with INVALID MILEAGE input', (done) => {
    api
      .post('/api/v1/car')
      .set('authorization', token)
      .set('Accept', 'application.json')
      .field('manufacturer', assumedData.newAdvert.manufacturer)
      .field('model', assumedData.newAdvert.model)
      .field('bodyType', assumedData.newAdvert.bodyType)
      .field('year', assumedData.newAdvert.year)
      .field('mileage', 'mileage')
      .field('state', assumedData.newAdvert.state)
      .field('location', assumedData.newAdvert.location)
      .field('transmission', assumedData.newAdvert.transmission)
      .field('vehicleInspectionNumber', assumedData.newAdvert.vehicleInspectionNumber)
      .field('licence', assumedData.newAdvert.licence)
      .field('description', assumedData.newAdvert.description)
      .field('price', assumedData.newAdvert.price)
      .attach('carImage', `${__dirname}/assumed/blank.pdf`)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(422);
        res.body.should.have.property('error').equal('invalid mileage input!');
        res.body.should.have.property('success').equal('false');
        done();
      });
  });

  it('Should NOT let Auth User (Seller) to post new Advert without DESCRIPTION input', (done) => {
    api
      .post('/api/v1/car')
      .set('authorization', token)
      .set('Accept', 'application.json')
      .field('manufacturer', assumedData.newAdvert.manufacturer)
      .field('model', assumedData.newAdvert.model)
      .field('bodyType', assumedData.newAdvert.bodyType)
      .field('year', assumedData.newAdvert.year)
      .field('mileage', assumedData.newAdvert.mileage)
      .field('state', assumedData.newAdvert.state)
      .field('location', assumedData.newAdvert.location)
      .field('transmission', assumedData.newAdvert.transmission)
      .field('vehicleInspectionNumber', assumedData.newAdvert.vehicleInspectionNumber)
      .field('licence', assumedData.newAdvert.licence)
      .field('price', assumedData.newAdvert.price)
      .attach('carImage', `${__dirname}/assumed/blank.pdf`)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(400);
        res.body.should.have.property('error').equal('description field cannot be empty!');
        res.body.should.have.property('success').equal('false');
        done();
      });
  });

  it('Should NOT let Auth User (Seller) to post new Advert without PRICE input', (done) => {
    api
      .post('/api/v1/car')
      .set('authorization', token)
      .set('Accept', 'application.json')
      .field('manufacturer', assumedData.newAdvert.manufacturer)
      .field('model', assumedData.newAdvert.model)
      .field('bodyType', assumedData.newAdvert.bodyType)
      .field('year', assumedData.newAdvert.year)
      .field('mileage', assumedData.newAdvert.mileage)
      .field('state', assumedData.newAdvert.state)
      .field('location', assumedData.newAdvert.location)
      .field('transmission', assumedData.newAdvert.transmission)
      .field('vehicleInspectionNumber', assumedData.newAdvert.vehicleInspectionNumber)
      .field('licence', assumedData.newAdvert.licence)
      .field('description', assumedData.newAdvert.description)
      .attach('carImage', `${__dirname}/assumed/blank.pdf`)
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
      .set('authorization', token)
      .set('Accept', 'application.json')
      .field('manufacturer', assumedData.newAdvert.manufacturer)
      .field('model', assumedData.newAdvert.model)
      .field('bodyType', assumedData.newAdvert.bodyType)
      .field('year', assumedData.newAdvert.year)
      .field('mileage', assumedData.newAdvert.mileage)
      .field('state', assumedData.newAdvert.state)
      .field('location', assumedData.newAdvert.location)
      .field('transmission', assumedData.newAdvert.transmission)
      .field('vehicleInspectionNumber', assumedData.newAdvert.vehicleInspectionNumber)
      .field('licence', assumedData.newAdvert.licence)
      .field('price', 'price')
      .field('description', assumedData.newAdvert.description)
      .attach('carImage', `${__dirname}/assumed/blank.pdf`)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(422);
        res.body.should.have.property('error').equal('invalid price input!');
        res.body.should.have.property('success').equal('false');
        done();
      });
  });


  it('should NOT let Auth User (Seller) to post new Advert without CAR IMAGE input', (done) => {
    api
      .post('/api/v1/car')
      .set('authorization', token)
      .set('Accept', 'application.json')
      .field('manufacturer', assumedData.newAdvert.manufacturer)
      .field('model', assumedData.newAdvert.model)
      .field('bodyType', assumedData.newAdvert.bodyType)
      .field('year', assumedData.newAdvert.year)
      .field('mileage', assumedData.newAdvert.mileage)
      .field('state', assumedData.newAdvert.state)
      .field('location', assumedData.newAdvert.location)
      .field('transmission', assumedData.newAdvert.transmission)
      .field('vehicleInspectionNumber', assumedData.newAdvert.vehicleInspectionNumber)
      .field('licence', assumedData.newAdvert.licence)
      .field('description', assumedData.newAdvert.description)
      .field('price', assumedData.newAdvert.price)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(400);
        res.body.should.have.property('error').equal('Upload at least one image!');
        done();
      });
  });

  it('should NOT let Auth User (Seller) to post new Advert without valid IMAGE format', (done) => {
    api
      .post('/api/v1/car')
      .set('authorization', token)
      .set('Accept', 'application.json')
      .field('manufacturer', assumedData.newAdvert.manufacturer)
      .field('model', assumedData.newAdvert.model)
      .field('bodyType', assumedData.newAdvert.bodyType)
      .field('year', assumedData.newAdvert.year)
      .field('mileage', assumedData.newAdvert.mileage)
      .field('state', assumedData.newAdvert.state)
      .field('location', assumedData.newAdvert.location)
      .field('transmission', assumedData.newAdvert.transmission)
      .field('vehicleInspectionNumber', assumedData.newAdvert.vehicleInspectionNumber)
      .field('licence', assumedData.newAdvert.licence)
      .field('description', assumedData.newAdvert.description)
      .field('price', assumedData.newAdvert.price)
      .attach('carImage', `${__dirname}/assumed/blank.pdf`)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(422);
        res.body.should.have.property('error').equal('Please provide a valid image file!');
        done();
      });
  });

  /*
  it('should let Auth User (Seller) to post new Advert with CAR IMAGE input', (done) => {
    api
      .post('/api/v1/car')
      .set('authorization', token)
      .set('Accept', 'application.json')
      .field('manufacturer', assumedData.newAdvert.manufacturer)
      .field('model', assumedData.newAdvert.model)
      .field('bodyType', assumedData.newAdvert.bodyType)
      .field('year', assumedData.newAdvert.year)
      .field('mileage', assumedData.newAdvert.mileage)
      .field('state', assumedData.newAdvert.state)
      .field('transmission', assumedData.newAdvert.transmission)
      .field('vehicleInspectionNumber', assumedData.newAdvert.vehicleInspectionNumber)
      .field('licence', assumedData.newAdvert.licence)
      .field('description', assumedData.newAdvert.description)
      .field('price', assumedData.newAdvert.price)
      .attach('carImage', `${__dirname}/assumed/download.png`)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(201);
        res.body.data.should.be.a('object');
        expect(res)
          .to.have.nested.property('body.data')
          .that.includes.all.keys(['id', 'email', 'created_on', 'manufacturer', 'model',
            'price', 'state', 'status', 'imageGallery']);
        res.body.data.id.should.be.a('number');
        res.body.data.email.should.be.a('string');
        res.body.data.created_on.should.be.a('string');
        res.body.data.manufacturer.should.be.a('string');
        res.body.data.model.should.be.a('string');
        res.body.data.price.should.be.a('number');
        res.body.data.state.should.be.a('string');
        res.body.data.status.should.be.a('string');
        res.body.data.imageGallery.should.be.a('array');
        res.body.data.should.have.property('message').equal('Your Ad has been added successfully!');
        carId = res.body.data.id;
        done();
      });
  });
*/

  it('Should NOT let Auth User (Seller) change price of sold or not owned AD', (done) => {
    api
      .patch('/api/v1/car/1/price')
      .set('authorization', token)
      .send(assumedData.newPrice)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(403);
        res.body.should.have.property('error').equal('You cannot change the price of this Ad!');
        done();
      });
  });

  it('Should NOT let Auth User (Seller) change Ad price to invalid value ', (done) => {
    api
      .patch(`/api/v1/car/${carId}/price`)
      .set('authorization', token)
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
      .set('authorization', token)
      .send(assumedData.newPrice)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(400);
        res.body.should.have.property('error').equal('Invalid Param Request!');
        done();
      });
  });
});

export default carId;


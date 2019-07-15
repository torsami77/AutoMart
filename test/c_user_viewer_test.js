/* eslint-disable func-names */
import chai from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
// eslint-disable-next-line no-unused-vars
import app from '../src/app';
import carId from './b_user_seller_test';

chai.use(chaiHttp);

chai.should();
const { expect } = chai;

const api = chai.request('http://localhost:5000');

const data = fs.readFileSync(`${__dirname}/assumed/token.txt`);
const token = data.toString();


describe('User Viewer Activities', () => {
  it('should respond to viewer trying to view a specific AD without valid AD reference', (done) => {
    api
      .get('/api/v1/car/:carId/')
      .set('token', token)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(400);
        res.body.should.have.property('success').equal('false');
        res.body.should.have.property('error').equal('Please provide a valid Ad reference!');
        done();
      });
  });

  it('Should respond to viewer on an AD that doesnt exist ', (done) => {
    api
      .get('/api/v1/car/1000000/')
      .set('token', token)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(404);
        res.body.should.have.property('success').equal('false');
        res.body.should.have.property('error').equal('Ad not found!');
        done();
      });
  });

  it('Should let viewer view a SPECIFIC AVAILABLE AD successfully', function (done) {
    this.timeout(10000);
    api
      .get('/api/v1/car/1/')
      .set('token', token)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(200);
        res.body.should.have.property('success').equal('true');
        expect(res)
          .to.have.nested.property('body.data')
          .that.includes.all.keys(['id', 'owner', 'created_on', 'state', 'status', 'price', 'manufacturer', 'model',
            'body_type', 'year', 'mileage', 'transmission', 'vehicle_inspection_number', 'licence', 'description',
            'image_gallery', 'orders', 'flags']);
        res.body.data.id.should.be.a('number');
        res.body.data.owner.should.be.a('number');
        res.body.data.created_on.should.be.a('string');
        res.body.data.state.should.be.a('string');
        res.body.data.status.should.be.a('string');
        res.body.data.price.should.be.a('string');
        res.body.data.manufacturer.should.be.a('string');
        res.body.data.model.should.be.a('string');
        res.body.data.body_type.should.be.a('string');
        res.body.data.year.should.be.a('string');
        res.body.data.mileage.should.be.a('string');
        res.body.data.transmission.should.be.a('string');
        res.body.data.vehicle_inspection_number.should.be.a('string');
        res.body.data.licence.should.be.a('string');
        res.body.data.image_gallery.should.be.a('array');
        res.body.data.orders.should.be.a('array');
        res.body.data.flags.should.be.a('array');
        done();
      });
  });


  it('Should let viewer view all available AD successfully', (done) => {
    api
      .get('/api/v1/car?status=available')
      .set('token', token)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(200);
        res.body.should.have.property('success').equal('true');
        res.body.should.have.property('data');
        res.body.data.should.be.a('array');
        expect(res)
          .to.have.nested.property('body.data[0]')
          .that.includes.all.keys(['id', 'owner', 'created_on', 'state', 'status', 'price', 'manufacturer', 'model',
            'body_type', 'year', 'mileage', 'transmission', 'vehicle_inspection_number', 'licence', 'description',
            'image_gallery', 'orders', 'flags']);
        const firstItem = res.body.data[0];
        firstItem.id.should.be.a('number');
        firstItem.owner.should.be.a('number');
        firstItem.created_on.should.be.a('string');
        firstItem.state.should.be.a('string');
        firstItem.status.should.be.a('string');
        firstItem.price.should.be.a('string');
        firstItem.manufacturer.should.be.a('string');
        firstItem.model.should.be.a('string');
        firstItem.body_type.should.be.a('string');
        firstItem.year.should.be.a('string');
        firstItem.mileage.should.be.a('string');
        firstItem.transmission.should.be.a('string');
        firstItem.vehicle_inspection_number.should.be.a('string');
        firstItem.licence.should.be.a('string');
        firstItem.image_gallery.should.be.a('array');
        firstItem.orders.should.be.a('array');
        firstItem.flags.should.be.a('array');
        done();
      });
  });

  it('Should let Viewer View all unsold cars within a price range', (done) => {
    const minPrice = 1000.00;
    const maxPrice = 2000.00;

    const leastValue = (base) => {
      if (minPrice <= parseFloat(base)) {
        return true;
      }
      return false;
    };

    const mostValue = (base) => {
      if (maxPrice >= parseFloat(base)) {
        return true;
      }
      return false;
    };
    api
      .get(`/api/v1/car?status=available&min_price=${minPrice}&max_price=${maxPrice}`)
      .set('token', token)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(200);
        res.body.should.have.property('success').equal('true');
        res.body.should.have.property('data');
        res.body.data.should.be.a('array');
        res.body.data[0].should.be.a('object');
        expect(leastValue(res.body.data[0].price)).to.equal(true);
        expect(mostValue(res.body.data[0].price)).to.equal(true);
        done();
      });
  });

  it('Should let viewer to view all unsold ADs of particular STATE(new)', (done) => {
    api
      .get('/api/v1/car?status=available&state=new')
      .set('token', token)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(200);
        res.body.should.have.property('success').equal('true');
        res.body.should.have.property('data');
        res.body.data.should.be.a('array');
        expect(res)
          .to.have.nested.property('body.data[0]')
          .that.includes.all.keys(['id', 'owner', 'created_on',
            'state', 'status', 'price', 'manufacturer', 'model', 'body_type']);
        const firstItem = res.body.data[0];
        firstItem.id.should.be.a('number');
        firstItem.owner.should.be.a('number');
        firstItem.created_on.should.be.a('string');
        firstItem.should.have.property('state').equal('new');
        firstItem.should.have.property('status').equal('available');
        firstItem.price.should.be.a('string');
        firstItem.manufacturer.should.be.a('string');
        firstItem.model.should.be.a('string');
        firstItem.body_type.should.be.a('string');
        done();
      });
  });


  it('Should let viewer to view all unsold ADs of particular STATE(used)', (done) => {
    api
      .get('/api/v1/car?status=available&state=used')
      .set('token', token)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(200);
        res.body.should.have.property('success').equal('true');
        res.body.should.have.property('data');
        res.body.data.should.be.a('array');
        expect(res)
          .to.have.nested.property('body.data[0]')
          .that.includes.all.keys(['id', 'owner', 'created_on',
            'state', 'status', 'price', 'manufacturer', 'model', 'body_type']);
        const firstItem = res.body.data[0];
        firstItem.id.should.be.a('number');
        firstItem.owner.should.be.a('number');
        firstItem.created_on.should.be.a('string');
        firstItem.should.have.property('state').equal('used');
        firstItem.should.have.property('status').equal('available');
        firstItem.price.should.be.a('string');
        firstItem.manufacturer.should.be.a('string');
        firstItem.model.should.be.a('string');
        firstItem.body_type.should.be.a('string');
        done();
      });
  });


  it('Should let viewer to view all unsold ADs of BODY TYPE(salon)', (done) => {
    api
      .get('/api/v1/car?status=available&body_type=salon')
      .set('token', token)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(200);
        res.body.should.have.property('success').equal('true');
        res.body.should.have.property('data');
        res.body.data.should.be.a('array');
        expect(res)
          .to.have.nested.property('body.data[0]')
          .that.includes.all.keys(['id', 'owner', 'created_on',
            'state', 'status', 'price', 'manufacturer', 'model', 'body_type']);
        const firstItem = res.body.data[0];
        firstItem.id.should.be.a('number');
        firstItem.owner.should.be.a('number');
        firstItem.created_on.should.be.a('string');
        firstItem.state.should.be.a('string');
        firstItem.should.have.property('status').equal('available');
        firstItem.price.should.be.a('string');
        firstItem.manufacturer.should.be.a('string');
        firstItem.model.should.be.a('string');
        firstItem.should.have.property('body_type').equal('salon');
        done();
      });
  });

  it('Should let viewer to view all unsold ADs of MANUFACTURER(toyota)', (done) => {
    api
      .get('/api/v1/car?status=available&manufacturer=toyota')
      .set('token', token)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(200);
        res.body.should.have.property('success').equal('true');
        res.body.should.have.property('data');
        res.body.data.should.be.a('array');
        expect(res)
          .to.have.nested.property('body.data[0]')
          .that.includes.all.keys(['id', 'owner', 'created_on',
            'state', 'status', 'price', 'manufacturer', 'model', 'body_type']);
        const firstItem = res.body.data[0];
        firstItem.id.should.be.a('number');
        firstItem.owner.should.be.a('number');
        firstItem.created_on.should.be.a('string');
        firstItem.state.should.be.a('string');
        firstItem.should.have.property('status').equal('available');
        firstItem.price.should.be.a('string');
        firstItem.should.have.property('manufacturer').equal('toyota');
        firstItem.model.should.be.a('string');
        firstItem.body_type.should.be.a('string');
        done();
      });
  });

  it('Should let viewer to view all AVAILABLE, STATE(new), MODEL(venza), MANUFACTURER(toyota) of MAX_PRICE(2000) (', (done) => {
    const maxPrice = 2000.00;
    const mostValue = (base) => {
      if (maxPrice >= base) {
        return true;
      }
      return false;
    };
    api
      .get('/api/v1/car?status=available&manufacturer=toyota&model=venza&max_price=2000')
      .set('token', token)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(200);
        res.body.should.have.property('success').equal('true');
        res.body.should.have.property('data');
        res.body.data.should.be.a('array');
        expect(res)
          .to.have.nested.property('body.data[0]')
          .that.includes.all.keys(['id', 'owner', 'created_on',
            'state', 'status', 'price', 'manufacturer', 'model', 'body_type']);
        const firstItem = res.body.data[0];
        firstItem.id.should.be.a('number');
        firstItem.owner.should.be.a('number');
        firstItem.created_on.should.be.a('string');
        firstItem.state.should.be.a('string');
        firstItem.should.have.property('status').equal('available');
        firstItem.price.should.be.a('string');
        firstItem.should.have.property('manufacturer').equal('toyota');
        firstItem.should.have.property('model').equal('venza');
        firstItem.body_type.should.be.a('string');
        expect(mostValue(res.body.data[0].price)).to.equal(true);
        done();
      });
  });
});

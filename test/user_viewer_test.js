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


describe('User Viewer Activities', () => {
  it('should respond to viewer trying to view a specific AD without valid AD reference', (done) => {
    api
      .get('/api/v1/car/:carId/')
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(401);
        res.body.should.have.property('success').equal('false');
        res.body.should.have.property('error').equal('Please provide a valid Ad reference!');
        done();
      });
  });

  it('Should respond to viewer on an AD that doesnt exist ', (done) => {
    api
      .get('/api/v1/car/12/')
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(404);
        res.body.should.have.property('success').equal('false');
        res.body.should.have.property('error').equal('Ad not found!');
        done();
      });
  });

  it('Should let viewer view a specific AD successfully', (done) => {
    api
      .get('/api/v1/car/1/')
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(200);
        res.body.should.have.property('success').equal('true');
        expect(res)
          .to.have.nested.property('body.data')
          .that.includes.all.keys(['id', 'owner', 'created_on', 'state', 'status', 'price', 'manufacturer', 'model',
            'bodyType', 'year', 'mileage', 'transmission', 'vehicleInspectionNumber', 'licence', 'description', 
            'imageGallery', 'orders', 'flags']);
        res.body.data.id.should.be.a('number');
        res.body.data.owner.should.be.a('number');
        res.body.data.created_on.should.be.a('string');
        res.body.data.state.should.be.a('string');
        res.body.data.status.should.be.a('string');
        res.body.data.price.should.be.a('number');
        res.body.data.manufacturer.should.be.a('string');
        res.body.data.model.should.be.a('string');
        res.body.data.bodyType.should.be.a('string');
        res.body.data.year.should.be.a('number');
        res.body.data.mileage.should.be.a('number');
        res.body.data.transmission.should.be.a('string');
        res.body.data.vehicleInspectionNumber.should.be.a('string');
        res.body.data.licence.should.be.a('string');
        res.body.data.imageGallery.should.be.a('array');
        res.body.data.orders.should.be.a('array');
        res.body.data.flags.should.be.a('array');
        done();
      });
  });


  it('Should let viewer view all available AD successfully', (done) => {
    api
      .get('/api/v1/car?status=available')
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(200);
        res.body.should.have.property('success').equal('true');
        res.body.should.have.property('data');
        res.body.data.should.be.a('array');
        expect(res)
          .to.have.nested.property('body.data[0]')
          .that.includes.all.keys(['id', 'owner', 'created_on', 'state', 'status', 'price', 'manufacturer', 'model',
            'bodyType', 'year', 'mileage', 'transmission', 'vehicleInspectionNumber', 'licence', 'description', 
            'imageGallery', 'orders', 'flags']);
        const firstItem = res.body.data[0];
        firstItem.id.should.be.a('number');
        firstItem.owner.should.be.a('number');
        firstItem.created_on.should.be.a('string');
        firstItem.state.should.be.a('string');
        firstItem.status.should.be.a('string');
        firstItem.price.should.be.a('number');
        firstItem.manufacturer.should.be.a('string');
        firstItem.model.should.be.a('string');
        firstItem.bodyType.should.be.a('string');
        firstItem.year.should.be.a('number');
        firstItem.mileage.should.be.a('number');
        firstItem.transmission.should.be.a('string');
        firstItem.vehicleInspectionNumber.should.be.a('string');
        firstItem.licence.should.be.a('string');
        firstItem.imageGallery.should.be.a('array');
        firstItem.orders.should.be.a('array');
        firstItem.flags.should.be.a('array');
        done();
      });
  });

  it('Should let Viewer View all unsold cars within a price range', (done) => {
    const minPrice = 1000.00;
    const maxPrice = 2000.00;

    const leastValue = (base) => {
      if (minPrice <= base) {
        return true;
      }
      return false;
    };

    const mostValue = (base) => {
      if (maxPrice >= base) {
        return true;
      }
      return false;
    };
    api
      .get(`/api/v1/car?status=available&minPrice=${minPrice}$maxPrice=${maxPrice}`)
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
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(200);
        res.body.should.have.property('success').equal('true');
        res.body.should.have.property('data');
        res.body.data.should.be.a('array');
        expect(res)
          .to.have.nested.property('body.data[0]')
          .that.includes.all.keys(['id', 'owner', 'created_on',
            'state', 'status', 'price', 'manufacturer', 'model', 'bodyType']);
        const firstItem = res.body.data[0];
        firstItem.id.should.be.a('number');
        firstItem.owner.should.be.a('number');
        firstItem.created_on.should.be.a('string');
        firstItem.should.have.property('state').equal('new');
        firstItem.should.have.property('status').equal('available');
        firstItem.price.should.be.a('number');
        firstItem.manufacturer.should.be.a('string');
        firstItem.model.should.be.a('string');
        firstItem.bodyType.should.be.a('string');
        done();
      });
  });


  it('Should let viewer to view all unsold ADs of particular STATE(used)', (done) => {
    api
      .get('/api/v1/car?status=available&state=used')
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(200);
        res.body.should.have.property('success').equal('true');
        res.body.should.have.property('data');
        res.body.data.should.be.a('array');
        expect(res)
          .to.have.nested.property('body.data[0]')
          .that.includes.all.keys(['id', 'owner', 'created_on',
            'state', 'status', 'price', 'manufacturer', 'model', 'bodyType']);
        const firstItem = res.body.data[0];
        firstItem.id.should.be.a('number');
        firstItem.owner.should.be.a('number');
        firstItem.created_on.should.be.a('string');
        firstItem.should.have.property('state').equal('used');
        firstItem.should.have.property('status').equal('available');
        firstItem.price.should.be.a('number');
        firstItem.manufacturer.should.be.a('string');
        firstItem.model.should.be.a('string');
        firstItem.bodyType.should.be.a('string');
        done();
      });
  });


  it('Should let viewer to view all unsold ADs of BODY TYPE(salon)', (done) => {
    api
      .get('/api/v1/car?status=available&bodyType=salon')
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(200);
        res.body.should.have.property('success').equal('true');
        res.body.should.have.property('data');
        res.body.data.should.be.a('array');
        expect(res)
          .to.have.nested.property('body.data[0]')
          .that.includes.all.keys(['id', 'owner', 'created_on',
            'state', 'status', 'price', 'manufacturer', 'model', 'bodyType']);
        const firstItem = res.body.data[0];
        firstItem.id.should.be.a('number');
        firstItem.owner.should.be.a('number');
        firstItem.created_on.should.be.a('string');
        firstItem.state.should.be.a('string');
        firstItem.should.have.property('status').equal('available');
        firstItem.price.should.be.a('number');
        firstItem.manufacturer.should.be.a('string');
        firstItem.model.should.be.a('string');
        firstItem.should.have.property('bodyType').equal('salon');
        done();
      });
  });

  it('Should let viewer to view all unsold ADs of MANUFACTURER(toyota)', (done) => {
    api
      .get('/api/v1/car?status=available&manufacturer=toyota')
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(200);
        res.body.should.have.property('success').equal('true');
        res.body.should.have.property('data');
        res.body.data.should.be.a('array');
        expect(res)
          .to.have.nested.property('body.data[0]')
          .that.includes.all.keys(['id', 'owner', 'created_on',
            'state', 'status', 'price', 'manufacturer', 'model', 'bodyType']);
        const firstItem = res.body.data[0];
        firstItem.id.should.be.a('number');
        firstItem.owner.should.be.a('number');
        firstItem.created_on.should.be.a('string');
        firstItem.state.should.be.a('string');
        firstItem.should.have.property('status').equal('available');
        firstItem.price.should.be.a('number');
        firstItem.should.have.property('manufacturer').equal('toyota');
        firstItem.model.should.be.a('string');
        firstItem.bodyType.should.be.a('string');
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
      .get('/api/v1/car?status=available&manufacturer=toyota&model=venza&maxPrice=2000')
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(200);
        res.body.should.have.property('success').equal('true');
        res.body.should.have.property('data');
        res.body.data.should.be.a('array');
        expect(res)
          .to.have.nested.property('body.data[0]')
          .that.includes.all.keys(['id', 'owner', 'created_on',
            'state', 'status', 'price', 'manufacturer', 'model', 'bodyType']);
        const firstItem = res.body.data[0];
        firstItem.id.should.be.a('number');
        firstItem.owner.should.be.a('number');
        firstItem.created_on.should.be.a('string');
        firstItem.state.should.be.a('string');
        firstItem.should.have.property('status').equal('available');
        firstItem.price.should.be.a('number');
        firstItem.should.have.property('manufacturer').equal('toyota');
        firstItem.should.have.property('model').equal('venza');
        firstItem.bodyType.should.be.a('string');
        expect(mostValue(res.body.data[0].price)).to.equal(true);
        done();
      });
  });
});

/*
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import carId from './user_seller_test';


chai.use(chaiHttp);

chai.should();
const expect = chai.expect();


describe('User General Activities', () => {
  it('should respond to invalid id request to view a specific car', (done) => {
    chai.request(app)
      .get('/api/v1/car/<:car-id>/')
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(404);
        res.body.data.should.have.property('message').equal('invalid Car Id!');
        done();
      });
  });

  it('should let general user view a specific car', (done) => {
    chai.request(app)
      .get(`/api/v1/car/${carId}/`)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(200);
        res.body.data.should.have.property('message').equal('invalid Car Id!');
        expect(res)
          .to.have.nested.property('body.data[0]')
          .that.includes.all.keys(['id', 'owner', 'created_on',
          'state', 'status', 'price', 'manufacturer', 'model', 'body_type']);
        res.body.data.id.should.be.a('integer');
        res.body.data.owner.should.be.a('integer');
        res.body.data.created_on.should.be.a('string');
        res.body.data.state.should.be.a('string');
        res.body.data.status.should.be.a('string');
        res.body.data.price.should.be.a('float');
        res.body.data.manufacturer.should.be.a('float');
        res.body.data.model.should.be.a('string');
        res.body.data.body_type.should.be.a('float');
        done();
      });
  });

  it('should let general user View all unsold cars', (done) => {
    chai.request(app)
      .get('/api/v1/car?status=available')
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(200);
        res.body.data.should.be.a('array');
        res.body.data[0].should.be.a('object');
        const firstItem = res.body.data[0];
        expect(firstItem)
          .to.have.nested.property('body.data[0]')
          .that.includes.all.keys(['id', 'owner', 'created_on',
          'state', 'status', 'price', 'manufacturer', 'model', 'body_type']);
        firstItem.id.should.be.a('integer');
        firstItem.owner.should.be.a('integer');
        firstItem.created_on.should.be.a('string');
        firstItem.state.should.be.a('string');
        firstItem.should.have.property('status').equal('available');
        firstItem.price.should.be.a('float');
        firstItem.manufacturer.should.be.a('float');
        firstItem.model.should.be.a('string');
        firstItem.body_type.should.be.a('float');
        done();
      });
  });

  it('should let general user View all unsold cars within a price range', (done) => {
    const minPrice = 200.00;
    const maxPrice = 1000.00;

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

    chai.request(app)
      .get(`/api/v1/car?status=available&min_price=${minPrice}&max_price=${maxPrice}`)
      .end((err, res) => {
        expect(leastValue(res.body.data[0].price)).to.equal(true);
        expect(mostValue(res.body.data[0].price)).to.equal(true);
        done();
      });
  });
});
*/

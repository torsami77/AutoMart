/*
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';
import fakeData from './faker/fake';


chai.use(chaiHttp);

chai.should();
const expect = chai.expect();


describe('Admin Activities', () => {
  it('should enable Admin to delete a specific posted AD record', (done) => {
    chai.request(app)
      .delete('/api/v1/car/:car_id/')
      .send(fakeData.admin)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(200);
        res.body.should.have.property('data').equal('Car Ad successfully deleted');
        done();
      });
  });

  it('should enable Admin to delete a specific posted AD record', (done) => {
    const adStatus = (base) => {
      if (base === 'sold' || base === 'available') {
        return true;
      }
      return false;
    };

    chai.request(app)
      .delete('/api/v1/car/:car_id/')
      .send(fakeData.admin)
      .end((err, res) => {
        res.body.should.be.a('object');
        res.body.should.have.property('status').equal(200);
        res.body.data.should.be.a('array');
        res.body.data[0].should.be.a('object');
        const firstItem = res.body.data[0];
        expect(firstItem)
          .to.have.nested.property('body.data[0]')
          .that.includes.all.keys(['id', 'owner', 'created_on', 'state', 'status',
            'price', 'manufacturer', 'model', 'body_type']);
        firstItem.id.should.be.a('integer');
        firstItem.owner.should.be.a('integer');
        firstItem.created_on.should.be.a('string');
        firstItem.state.should.be.a('string');
        expect(adStatus(firstItem.status)).to.equal(true);
        firstItem.price.should.be.a('float');
        firstItem.manufacturer.should.be.a('float');
        firstItem.model.should.be.a('string');
        firstItem.body_type.should.be.a('float');
        done();
        done();
      });
  });
});
*/

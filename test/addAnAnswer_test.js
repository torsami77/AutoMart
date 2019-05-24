/* eslint-disable no-undef */

import chai from 'chai';
import chaiHttp from 'chai-http';

// eslint-disable-next-line no-unused-vars
const { should, expect } = chai;

const url = 'api/v1/questions/1/answers';

chai.use(chaiHttp);

const randusername = Math.random().toString(36).substring(8);

// eslint-disable-next-line prefer-const
let body = {
  username: `${randusername}`,
  email: `${randusername}@gmail.com`,
  password: 'staticpassword',
  verify: 'staticpassword',
};

const api = chai.request('http://localhost:5000');


describe('Testing Environment', () => {
  it('Test 1', () => {
    expect(body.email).to.be.a('string');
  });
});

describe('pass', () => {
  it('Test 2', () => {
    expect(body.password).to.be.a('string');
  });
});

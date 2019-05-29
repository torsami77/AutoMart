import faker from 'faker';

const fakeData = {
  newUsers: {
    first_name: 'Samson',
    last_name: 'Samuel',
    username: 'Sami',
    email: 'sami@automart.ng',
    password: 'password101',
    verify: 'password101',
  },

  noFirstNameUsers: {
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    username: faker.name.findName(),
    password: '11110000',
    verify: '11110000',
  },

  noLastNameUsers: {
    first_name: faker.name.firstName(),
    email: faker.internet.email(),
    username: faker.name.findName(),
    password: '11110000',
    verify: '11110000',
  },

  noEmailUsers: {
    first_name: faker.name.firstName(),
    lastName: faker.name.lastName(),
    username: faker.name.findName(),
    password: '11110000',
    verify: '11110000',
  },

  noPasswordUsers: {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    username: faker.name.findName(),
    email: faker.internet.email(),
    verify: '11110000',
  },
  passMismatchUsers: {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    username: faker.name.findName(),
    email: faker.internet.email(),
    password: '111100',
    verify: '11110000',
  },
  lessPass: {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    username: faker.name.findName(),
    email: faker.internet.email(),
    password: '111',
    verify: '11110000',
  },
  noUsernameUsers: {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    password: '11110000',
    verify: '11110000',
  },

  newAdvert: {
    email: 'torsami77@automart.ng',
    manufacturer: 'Toyota',
    model: 'Corola 2016',
    price: 1700.00,
    state: 'New',
    status: 'Available',
  },

  updateAdvert: {
    status: 'sold',
    price: 500.00,
  },

  purchaseOrder: {
    price_offered: 300.00,
  },
  updateOrder: {
    price_offered: 500.00,
  },
};

export default fakeData;

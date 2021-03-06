"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const users = [{
  id: 1,
  email: 'string@gmail.com',
  first_name: 'Samson',
  last_name: 'Samuel',
  username: 'sami',
  password: '$2y$12$.Q1A5rIvpMHwlXaq7QMneOCa6Zv5kS.Z.7t4tbPPfRg4BmXrdtva2',
  address: 'Jos',
  is_admin: false,
  created_on: '2019-06-01T11:05:17.601Z'
}, {
  id: 2,
  email: 'george@automart.com',
  first_name: 'George',
  last_name: 'Sunday',
  username: 'Leke',
  password: '$2a$10$91EiXTaYsD3IxbHFUlRW/uW8crhztFfdZXeqdG5svnNa8yy0xSzjS',
  address: 'Jos',
  is_admin: true,
  created_on: '2019-06-01T11:05:17.601Z'
}];
const cars = [{
  id: 1,
  owner: 1,
  created_on: '2019-06-08T19:36:58.679Z',
  state: 'new',
  status: 'available',
  price: 1500.00,
  manufacturer: 'toyota',
  model: 'venza',
  bodyType: 'salon',
  year: 2016,
  mileage: 2000,
  transmission: 'auto',
  vehicleInspectionNumber: '123456js',
  licence: 'PLA-BASSA-624',
  description: 'well well well story story story',
  imageGallery: [],
  orders: [{
    id: 1,
    buyer: 1,
    car_id: 1,
    amount: [1500.00],
    status: 'pending'
  }],
  flags: [{
    id: 1,
    car_id: 1,
    created_on: '2019-06-08T19:36:58.679Z',
    reason: 'pricing',
    description: 'Give reasonable discount'
  }]
}, {
  id: 2,
  owner: 2,
  created_on: '2019-06-08T19:36:58.679Z',
  state: 'used',
  status: 'available',
  price: 1000.00,
  manufacturer: 'toyota',
  model: 'camry',
  bodyType: 'SUV',
  year: 2019,
  mileage: 2000,
  transmission: 'auto',
  vehicleInspectionNumber: '123456js',
  licence: 'PLA-BASSA-624',
  description: 'well well well story story story',
  imageGallery: [],
  orders: [{
    id: 1,
    buyer: 1,
    car_id: 1,
    amount: [1500.00],
    status: 'pending'
  }],
  flags: [{
    id: 1,
    car_id: 1,
    created_on: '2019-06-08T19:36:58.679Z',
    reason: 'pricing',
    description: 'Give reasonable discount'
  }]
}, {
  id: 3,
  owner: 2,
  created_on: '2019-06-08T19:36:58.679Z',
  state: 'used',
  status: 'available',
  price: 1000.00,
  manufacturer: 'toyota',
  model: 'camry',
  bodyType: 'SUV',
  year: 2019,
  mileage: 2000,
  transmission: 'auto',
  vehicleInspectionNumber: '123456js',
  licence: 'PLA-BASSA-624',
  description: 'well well well story story story',
  imageGallery: [],
  orders: [{
    id: 1,
    buyer: 1,
    car_id: 1,
    amount: [1500.00],
    status: 'pending'
  }],
  flags: [{
    id: 1,
    car_id: 1,
    created_on: '2019-06-08T19:36:58.679Z',
    reason: 'pricing',
    description: 'Give reasonable discount'
  }]
}, {
  id: 4,
  owner: 2,
  created_on: '2019-06-08T19:36:58.679Z',
  state: 'used',
  status: 'sold',
  price: 1000.00,
  manufacturer: 'nissan',
  model: 'murano',
  bodyType: 'SUV',
  year: 2019,
  mileage: 2000,
  transmission: 'auto',
  vehicleInspectionNumber: '123456js',
  licence: 'PLA-BASSA-625',
  description: 'well well well story story story',
  imageGallery: [],
  orders: [{
    id: 1,
    buyer: 1,
    car_id: 1,
    amount: [1500.00],
    status: 'pending'
  }],
  flags: [{
    id: 1,
    car_id: 1,
    created_on: '2019-06-08T19:36:58.679Z',
    reason: 'pricing',
    description: 'Give reasonable discount'
  }]
}];
var _default = {
  users,
  cars
};
exports.default = _default;
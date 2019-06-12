const carId = 1;

const assumedData = {
  sellerUser: {
    email: 'seller@automart.com',
    firstName: 'Samson',
    lastName: 'Samuel',
    username: 'samsam',
    password: 'password101',
    verify: 'password101',
    address: 'Jos',
    is_admin: false,
  },
  newUsers: {
    email: 'torsami@automart.com',
    firstName: 'Samson',
    lastName: 'Samuel',
    username: 'sami77',
    password: 'password101',
    verify: 'password101',
    address: 'Jos',
    is_admin: false,
  },
  noAddressUsers: {
    email: 'torsami@automart.com',
    firstName: 'Samson',
    lastName: 'Samuel',
    username: 'sami77',
    password: 'password101',
    verify: 'password101',
    is_admin: false,
  },
  noFirstNameUsers: {
    email: 'torsami@automart.com',
    lastName: 'Samuel',
    username: 'sami77',
    password: 'password101',
    verify: 'password101',
    address: 'Jos',
    is_admin: false,
  },
  noLastNameUsers: {
    email: 'torsami@automart.com',
    firstName: 'Samson',
    username: 'sami77',
    password: 'password101',
    verify: 'password101',
    address: 'Jos',
    is_admin: false,
  },
  noEmailUsers: {
    firstName: 'Samson',
    lastName: 'Samuel',
    username: 'sami77',
    password: 'password101',
    verify: 'password101',
    address: 'Jos',
    is_admin: false,
  },
  noPasswordUsers: {
    email: 'torsami@automart.com',
    firstName: 'Samson',
    lastName: 'Samuel',
    username: 'sami77',
    verify: 'password101',
    address: 'Jos',
    is_admin: false,
  },
  passMismatchUsers: {
    email: 'torsami@automart.com',
    firstName: 'Samson',
    lastName: 'Samuel',
    username: 'sami77',
    password: 'password101x',
    verify: 'password101',
    address: 'Jos',
    is_admin: false,
  },
  lessPass: {
    email: 'torsami@automart.com',
    firstName: 'Samson',
    lastName: 'Samuel',
    username: 'sami77',
    password: 'pass',
    verify: 'pass',
    address: 'Jos',
    is_admin: false,
  },
  noUsernameUsers: {
    email: 'torsami@automart.com',
    firstName: 'Samson',
    lastName: 'Samuel',
    password: 'password101',
    verify: 'password101',
    address: 'Jos',
    is_admin: false,
  },
  falseUsers: {
    email: 'shembell@automart.com',
    firstName: 'Shembell',
    lastName: 'Samuel',
    username: 'Piero',
    password: 'password101',
    verify: 'password101',
    address: 'Jos',
    is_admin: false,
  },

  newAdvert: {
    manufacturer: 'Toyota',
    model: 'Venza',
    bodyType: 'Saloon',
    year: 1999,
    mileage: 2000,
    state: 'new',
    transmission: 'auto',
    vehicleInspectionNumber: '123jkl',
    licence: 'PLA-BSA-123',
    description: 'Well well well story story story',
    price: 12000,
  },
  noManufacturerAdvert: {
    model: 'Venza',
    bodytype: 'Saloon',
    year: 2019,
    mileage: 2000,
    state: 'new',
    transmission: 'auto',
    vehicleInspectionNumber: '123jkl',
    licence: 'PLA-BSA-123',
    description: 'Well well well story story story',
    price: 12000,
  },
  noModelAdvert: {
    manufacturer: 'Toyota',
    bodytype: 'Saloon',
    year: 2019,
    mileage: 2000,
    state: 'new',
    transmission: 'auto',
    vehicleInspectionNumber: '123jkl',
    licence: 'PLA-BSA-123',
    description: 'Well well well story story story',
    price: 12000,
  },
  noBodyTypeAdvert: {
    manufacturer: 'Toyota',
    model: 'Venza',
    year: 2019,
    mileage: 2000,
    state: 'new',
    transmission: 'auto',
    vehicleInspectionNumber: '123jkl',
    licence: 'PLA-BSA-123',
    description: 'Well well well story story story',
    price: 12000,
  },
  noYearAdvert: {
    manufacturer: 'Toyota',
    model: 'Venza',
    bodytype: 'Saloon',
    mileage: 2000,
    state: 'new',
    transmission: 'auto',
    vehicleInspectionNumber: '123jkl',
    licence: 'PLA-BSA-123',
    description: 'Well well well story story story',
    price: 12000,
  },
  noMileageAdvert: {
    manufacturer: 'Toyota',
    model: 'Venza',
    bodytype: 'Saloon',
    year: 2019,
    state: 'new',
    transmission: 'auto',
    vehicleInspectionNumber: '123jkl',
    licence: 'PLA-BSA-123',
    description: 'Well well well story story story',
    price: 12000,
  },
  noStateAdvert: {
    manufacturer: 'Toyota',
    model: 'Venza',
    bodytype: 'Saloon',
    year: '2019',
    mileage: 2000,
    transmission: 'auto',
    vehicleInspectionNumber: '123jkl',
    licence: 'PLA-BSA-123',
    description: 'Well well well story story story',
    price: 12000,
  },
  noTransmisionAdvert: {
    manufacturer: 'Toyota',
    model: 'Venza',
    bodytype: 'Saloon',
    year: 2019,
    mileage: 2000,
    state: 'new',
    vehicleInspectionNumber: '123jkl',
    licence: 'PLA-BSA-123',
    description: 'Well well well story story story',
    price: 12000,
  },
  noVINAdvert: {
    manufacturer: 'Toyota',
    model: 'Venza',
    bodytype: 'Saloon',
    year: 2019,
    mileage: 2000,
    state: 'new',
    transmission: 'auto',
    licence: 'PLA-BSA-123',
    description: 'Well well well story story story',
    price: 12000,
  },
  noLicenceAdvert: {
    manufacturer: 'Toyota',
    model: 'Venza',
    bodytype: 'Saloon',
    year: 2019,
    mileage: 2000,
    state: 'new',
    transmission: 'auto',
    vehicleInspectionNumber: '123jkl',
    description: 'Well well well story story story',
    price: 12000,
  },
  noDescriptionAdvert: {
    manufacturer: 'Toyota',
    model: 'Venza',
    bodytype: 'Saloon',
    year: 2019,
    mileage: 2000,
    state: 'new',
    transmission: 'auto',
    vehicleInspectionNumber: '123jkl',
    licence: 'PLA-BSA-123',
    price: 12000,
  },
  noPriceAdvert: {
    manufacturer: 'Toyota',
    model: 'Venza',
    bodytype: 'Saloon',
    year: 2019,
    mileage: 2000,
    state: 'new',
    transmission: 'auto',
    vehicleInspectionNumber: '123jkl',
    licence: 'PLA-BSA-123',
    description: 'Well well well story story story',
  },
  newPrice: {
    price: 400,
  },
  invalidPrice: {
    price: 'price',
  },
  newOrder: {
    carId,
    amount: 200,
  },
  updateOrder: {
    order: carId,
    amount: 300,
  },
  orderNotFound: {
    carId: 0,
    amount: 200,
  },
  invalidOrderReff: {
    carId: ',jkk',
    amount: 200,
  },
  invalidOrderAmount: {
    carId,
    amount: 'jkjk',
  },
  newOrderUpdate: {
    carId,
    amount: 200,
  },
  updateOrderUpdate: {
    carId,
    amount: 300,
  },
  orderNotFoundUpdate: {
    carId: 0,
    amount: 200,
  },
  invalidOrderReffUpdate: {
    carId: ',jkk',
    amount: 200,
  },
  AdFoundorderNotFound: {
    carId: 0,
    amount: 200,

  },
  invalidOrderAmountUpdate: {
    carId,
    amount: 'jkjk',
  },
  newFlag: {
    carId,
    reason: 'Price too low',
    description: 'Seller might be trying to defraud',
  },
  flagNoRef: {
    reason: 'Price too low',
    description: 'Seller might be trying to defraud',
  },
  flagNoReason: {
    carId,
    description: 'Seller might be trying to defraud',
  },
  flagNoDescription: {
    carId,
    reason: 'Price too low',
  },
  newFlagNotFound: {
    carId: 0,
    reason: 'Price too low',
    description: 'Seller might be trying to defraud',
  },

  admin: {
    id: 2,
    email: 'george@automart.com',
    firstName: 'George',
    lastName: 'Sunday',
    username: 'Leke',
    password: 'password101',
    verify: 'password',
    address: 'Jos',
    is_admin: true,
    created_on: '2019-06-01T11:05:17.601Z',
  },
};

export default assumedData;

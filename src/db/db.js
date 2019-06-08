const users = [
  {
    id: 1,
    email: 'string@gmail.com',
    first_name: 'Samson',
    last_name: 'Samuel',
    username: 'sami',
    password: 'password101',
    address: 'Jos',
    is_admin: false,
    created_on: '2019-06-01T11:05:17.601Z',
  },

];

const cars = [
  {
    id: 1,
    owner: 1,
    created_on: 'Wed May 29 2019 15:56:22 GMT+0100 (West Africa Standard Time)',
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
    orders: [
      {
        id: 1,
        buyer: 1,
        car_id: 1,
        amount: 1500.00,
        status: 'pending',
      },
    ],
    flags: [
      {
        id: 1,
        car_id: 1,
        created_on: 'Wed May 29 2019 15:56:22 GMT+0100 (West Africa Standard Time)',
        reason: 'pricing',
        description: 'Give reasonable discount',
      },
    ],
  },
  {
    id: 2,
    owner: 2,
    created_on: 'Wed May 29 2019 15:56:22 GMT+0100 (West Africa Standard Time)',
    state: 'used',
    status: 'available',
    price: 1000.00,
    manufacturer: 'toyota',
    model: 'camry',
    bodyType: 'SUV',
    year: 2019,
    mileage: 2000,
    transmission: 'auto',
    vehicleIinspectionNumber: '123456js',
    licence: 'PLA-BASSA-624',
    description: 'well well well story story story',
    imageGallery: [],
    orders: [
      {
        id: 1,
        buyer: 1,
        car_id: 1,
        amount: 1500.00,
        status: 'pending',
      },
    ],
    flags: [
      {
        id: 1,
        car_id: 1,
        created_on: 'Wed May 29 2019 15:56:22 GMT+0100 (West Africa Standard Time)',
        reason: 'pricing',
        description: 'Give reasonable discount',
      },
    ],
  },
];


export default {
  users, cars,
};

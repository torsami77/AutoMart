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
    created_on: 'Wed May 29 2019 15:56:22 GMT+0100 (West Africa Standard Time)',
  },

];

const cars = [
  {
    id: 1,
    owner: 1,
    created_on: 'Wed May 29 2019 15:56:22 GMT+0100 (West Africa Standard Time)',
    state: 'new',
    status: 'Available',
    price: 1500.00,
    manufacturer: 'Toyota',
    model: 'Venza',
    body_type: 'Van',
    order: [
      {
        id: 1,
        buyer: 1,
        car_id: 1,
        amount: 1500.00,
        status: 'pending',
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
    ],
  },
];


export default {
  users, cars,
};

const users_entry = [
	{id: 1,
	 email: 'string@gmail.com',
	 first_name: 'Samson',
	 last_name: 'Samuel',
	 password: 'password101',
	 address: 'Jos',
	 is_admin: false,
	 created_on: new date()
	}

];

const cars = [
	{id: 1,
	 owner: 1,
	 created_on: new date(),
	 state: 'new',
	 status: 'Available',
	 price:1500.00,
	 manufacturer: 'Toyota',
	 model: 'Venza',
	 body_type: 'Van',
	}
];

const order = [
	{id: 1,
	 buyer: 1,
	 car_id: 1,
	 amount: 1500.00,
	 status: 'pending'
	}
];

const flags = [
	{id:1,
	 car_id: 1,
	 created_on: new date(),
	 reason: 'pricing',
	 description: 'Give reasonable discount'
	}
];

export default { users_entry, cars, order, flags };

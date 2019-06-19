import models from './models';

const newU = {
  id: 1,
  email: 'newuser@automart.com',
  first_name: 'Samson',
  last_name: 'Samuel',
  username: 'newuser',
  password: '$2y$12$.Q1A5rIvpMHwlXaq7QMneOCa6Zv5kS.Z.7t4tbPPfRg4BmXrdtva2',
  address: 'Jos',
  is_admin: false,
  created_on: '2019-06-01T11:05:17.601Z',
};

// eslint-disable-next-line no-unused-vars
async function example(req, res) {
  try {
  const data = await models.createClause('users', 'email, first_name, last_name, username, password, address, is_admin, created_on',
    '$1, $2, $3, $4, $5, $6, $7, $8', [newU.email, newU.first_name, newU.last_name, newU.username, newU.password, newU.address,
      newU.is_admin, newU.created_on]);
      console.log(data);
  return res.status(200).send({ data });
} catch(error) {
  return res.status(400).send(error);
}
}

export default example;

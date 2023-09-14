import Mock from '../mock';

// const JWT_SECRET = 'jwt_secret_key';
// const JWT_VALIDITY = '7 days';

const userList = [
  {
    id: 1,
    role: 'Warehouse Admin',
    name: 'Rahul Garg',
    username: 'gargr0109',
    email: 'gargr0109@gmail.com',
    avatar: '/assets/images/profile.jpg',
    age: 22
  }
];


Mock.onPost('/api/auth/login').reply(async (config) => {
  try {
    const { email } = JSON.parse(config.data);
    const user = userList.find((u) => u.email === email);

    if (!user) return [400, { message: 'Invalid email or password' }];

    const payload = { user: userList[0] };
    return [200, payload];
  } catch (err) {
    console.error(err);
    return [500, { message: 'Internal server error' }];
  }
});



Mock.onGet('/api/auth/profile').reply((config) => {
  try {
  

    const payload = { user: userList[0] };
    return [200, payload];
  } catch (err) {
    console.error(err);
    return [500, { message: 'Internal server error' }];
  }
});

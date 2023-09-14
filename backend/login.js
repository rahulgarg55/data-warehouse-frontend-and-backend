const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const { authorizeAdmin } = require('./authorizationMiddleware');
const { authorizeCustomer } = require('./authorizationMiddleware');

const app = express();
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());


const connectionPool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'datawarehouse',
});


app.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log('Email:', email);
  console.log('Password:', password);
  authenticateUser(email, password, (error, userRole) => {
    if (error) {
      console.log('error', error);
      return res.status(500).json({ message: 'error hai broo' });
    }

    if (!userRole) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = {
      id: email,
      role: userRole,
    };

    const accessToken = jwt.sign(user, 'sk_test_51Kb3jnSDwXbsOnZOQ4FuUW2Tw44ygW4hAJ11yx57i7Hze0CB5eYsOlcoodwThlZyzAAa3k0BXG41HwRBQ7dw1GYf00bJuew2St');
    console.log('Generated Token:', accessToken);
    res.json({ accessToken });
  });
});
app.post('/register-customer', (req, res) => {
  const { email, password, ip_address } = req.body;
  console.log('Email:', email);
  console.log('Password:', password);
  console.log('ip_address', ip_address);
  connectionPool.query(
    'INSERT INTO users (email, password, ip_address, isonline, role_code) VALUES (?, ?, ?, ?, ?)',
    [email, password, ip_address, 0, '2'],
    (error, results) => {
      if (error) {
        console.error('Error creating customer:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

      res.json({ message: 'Customer registered successfully' });
    }
  );
});
app.post('/login-customer', (req, res) => {
  const { email, password } = req.body;
  connectionPool.query(
    'SELECT * FROM users WHERE email = ? AND password = ? AND role_code = ?',
    [email, password, '2'],
    (error, results) => {
      if (error) {
        console.error('Error fetching customer:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const customer = {
        id: results[0].email,
        role: 'customer',
      };

      const accessToken = jwt.sign(customer, 'sk_test_51Kb3jnSDwXbsOnZOQ4FuUW2Tw44ygW4hAJ11yx57i7Hze0CB5eYsOlcoodwThlZyzAAa3k0BXG41HwRBQ7dw1GYf00bJuew2St');
      console.log('Generated Token:', accessToken);
      res.json({ accessToken });
    }
  );
});

app.post('/create-user', authorizeAdmin, (req, res) => {
  const { email, password, ip_address, role_code } = req.body;

  connectionPool.query(
    'INSERT INTO users (email, password, ip_address, isonline, role_code) VALUES (?, ?, ?, ?, ?)',
    [email, password, ip_address, 0, role_code],
    (error, results) => {
      if (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

      res.json({ message: 'User created successfully' });
    }
  );
});

function authenticateUser(email, password, callback) {
  connectionPool.query(
    'SELECT role_code FROM users WHERE email = ? AND password = ?',
    [email, password],
    (error, results) => {
      if (error) {
        console.error('Error fetching user:', error);
        return callback(error, null);
      }

      if (results.length === 0) {
        return callback(null, null);
      }

      const userRole = results[0].role_code;

      if (userRole === null || userRole === undefined) {
        return callback(null, null);
      }
      callback(null, userRole);
    }
  );
}


app.get('/check-role/:email', (req, res) => {
  const { email } = req.params;
  connectionPool.query(
    'SELECT role_code FROM users WHERE email = ?',
    [email],
    (error, results) => {
      if (error) {
        console.error('Error fetching user role:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      const userRole = results[0].role_code;

      res.json({ role_code: userRole });
    }
  );
});
module.exports = app;



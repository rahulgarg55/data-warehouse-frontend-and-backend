const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const connectionPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'datawarehouse',
});

router.post('/add-customer', (req, res) => {
    const { name, address, phone, role_code } = req.body;

    connectionPool.query(
        'INSERT INTO customer (name, address, phone, role_code) VALUES (?, ?, ?, ?)',
        [name, address, phone, role_code],
        (error, results) => {
            if (error) {
                console.error('Error adding customer:', error);
                return res.status(500).json({ message: 'Internal server error' });
            }

            res.json({ message: 'Customer added successfully' });
        }
    );
});

router.get('/list-customers', (req, res) => {
    connectionPool.query('SELECT * FROM customer', (error, results) => {
        if (error) {
            console.error('Error fetching customers:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }

        res.json(results);
    });
});

router.put('/update-customer/:customer_id', (req, res) => {
    const { customer_id } = req.params;
    const { name, address, phone } = req.body;

    connectionPool.query(
        'UPDATE customer SET name = ?, address = ?, phone = ? WHERE customer_id = ?',
        [name, address, phone, customer_id],
        (error, results) => {
            if (error) {
                console.error('Error updating customer:', error);
                return res.status(500).json({ message: 'Internal server error' });
            }

            res.json({ message: 'Customer updated successfully' });
        }
    );
});

router.delete('/delete-customer/:customer_id', (req, res) => {
    const { customer_id } = req.params;

    connectionPool.query(
        'DELETE FROM customer WHERE customer_id = ?',
        [customer_id],
        (error, results) => {
            if (error) {
                console.error('Error deleting customer:', error);
                return res.status(500).json({ message: 'Internal server error' });
            }

            res.json({ message: 'Customer deleted successfully' });
        }
    );
});

module.exports = router;

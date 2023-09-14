const express = require('express');
const router = express.Router();
const mysql = require('mysql');


const connectionPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'datawarehouse',
});


router.post('/add-supplier', (req, res) => {
    const { supplier_name, supplier_address, supplier_phone, role_code } = req.body;

    connectionPool.query(
        'INSERT INTO supplier (supplier_name, supplier_address, supplier_phone, role_code) VALUES (?, ?, ?, ?)',
        [supplier_name, supplier_address, supplier_phone, role_code],
        (error, results) => {
            if (error) {
                console.error('Error adding supplier:', error);
                return res.status(500).json({ message: 'Internal server error' });
            }

            res.json({ message: 'Supplier added successfully' });
        }
    );
});

router.get('/get-suppliers', (req, res) => {
    connectionPool.query('SELECT * FROM supplier', (error, results) => {
        if (error) {
            console.error('Error getting suppliers:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }

        res.json(results);
    });
});

router.get('/get-supplier/:id', (req, res) => {
    const { id } = req.params;

    connectionPool.query('SELECT * FROM supplier WHERE supplier_id = ?', [id], (error, results) => {
        if (error) {
            console.error('Error getting supplier:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        res.json(results[0]);
    });
});

router.put('/update-supplier/:id', (req, res) => {
    const { id } = req.params;
    const { supplier_name, supplier_address, supplier_phone } = req.body;

    connectionPool.query(
        'UPDATE supplier SET supplier_name = ?, supplier_address = ?, supplier_phone = ? WHERE supplier_id = ?',
        [supplier_name, supplier_address, supplier_phone, id],
        (error, results) => {
            if (error) {
                console.error('Error updating supplier:', error);
                return res.status(500).json({ message: 'Internal server error' });
            }

            res.json({ message: 'Supplier updated successfully' });
        }
    );
});

router.delete('/delete-supplier/:id', (req, res) => {
    const { id } = req.params;

    connectionPool.query('DELETE FROM supplier WHERE supplier_id = ?', [id], (error, results) => {
        if (error) {
            console.error('Error deleting supplier:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }

        res.json({ message: 'Supplier deleted successfully' });
    });
});

router.get('/supplier-with-least-stock', (req, res) => {
    connectionPool.query(
        'SELECT s.supplier_name ' +
        'FROM supplier s ' +
        'JOIN product p ON s.supplier_id = p.supplier_id ' +
        'ORDER BY p.current_stock ASC LIMIT 1',
        (error, results) => {
            if (error) {
                console.error('Error fetching supplier with least stock:', error);
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (results.length === 0) {
                return res.status(404).json({ message: 'No supplier found' });
            }

            const supplierName = results[0].supplier_name;
            res.json({ supplierName });
        }
    );
});


module.exports = router;

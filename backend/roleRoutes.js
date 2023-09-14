const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const connectionPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'datawarehouse',
});

router.post('/create-role', (req, res) => {
    const { role_name, status } = req.body;
    connectionPool.query(
        'INSERT INTO role (role_name, status) VALUES (?, ?)',
        [role_name, status],
        (error, results) => {
            if (error) {
                console.error('Error creating role:', error);
                return res.status(500).json({ message: 'Internal server error' });
            }

            res.json({ message: 'Role created successfully' });
        }
    );
});

router.get('/get-roles', (req, res) => {
    connectionPool.query('SELECT * FROM role', (error, results) => {
        if (error) {
            console.error('Error fetching roles:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }

        res.json(results);
    });
});

router.put('/update-role/:role_code', (req, res) => {
    const { role_code } = req.params;
    const { role_name, status } = req.body;

    connectionPool.query(
        'UPDATE role SET role_name = ?, status = ? WHERE role_code = ?',
        [role_name, status, role_code],
        (error, results) => {
            if (error) {
                console.error('Error updating role:', error);
                return res.status(500).json({ message: 'Internal server error' });
            }
            res.json({ message: 'Role updated successfully' });
        }
    );
});

router.delete('/delete-role/:role_code', (req, res) => {
    const { role_code } = req.params;

    connectionPool.query(
        'DELETE FROM role WHERE role_code = ?',
        [role_code],
        (error, results) => {
            if (error) {
                console.error('Error deleting role:', error);
                return res.status(500).json({ message: 'Internal server error' });
            }

            res.json({ message: 'Role deleted successfully' });
        }
    );
});

module.exports = router;

const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
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


router.post('/add-product', (req, res) => {
    const { product_name, brand, current_stock, price, supplier_id } = req.body;
    const admin_email = req.user.admin_id;
    console.log("admin_email:", admin_email);
    connectionPool.getConnection((error, connection) => {
        if (error) {
            console.error('Error getting connection:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }

        connection.beginTransaction((err) => {
            if (err) {
                console.error('Error starting transaction:', err);
                connection.release();
                return res.status(500).json({ message: 'Internal server error' });
            }
            connection.query(
                'SELECT id FROM users WHERE email = ?',
                [admin_email],
                (error, userResults) => {
                    if (error) {
                        console.error('Error fetching user:', error);
                        connection.rollback();
                        connection.release();
                        return res.status(500).json({ message: 'Internal server error' });
                    }
                    if (!userResults || userResults.length === 0) {
                        connection.rollback();
                        connection.release();
                        return res.status(404).json({ message: 'Admin user not found' });
                    }

                    const user_id = userResults[0].id;

                    connection.query(
                        'INSERT INTO product (product_name, brand, current_stock, price, supplier_id) VALUES (?, ?, ?, ?, ?)',
                        [product_name, brand, current_stock, price, supplier_id],
                        (error, productResults) => {
                            if (error) {
                                console.error('Error adding product:', error);
                                connection.rollback();
                                connection.release();
                                return res.status(500).json({ message: 'Internal server error' });
                            }

                            const product_id = productResults.insertId;

                            const transactionQuery = `
                                INSERT INTO transaction (transaction_date, user_id, total_amount, transaction_type)
                                VALUES (NOW(), ?, ?, 'incoming')
                            `;
                            const transactionValues = [user_id, price];

                            connection.query(transactionQuery, transactionValues, (error) => {
                                if (error) {
                                    console.error('Error adding transaction:', error);
                                    connection.rollback();
                                    connection.release();
                                    return res.status(500).json({ message: 'Internal server error' });
                                }

                                connection.commit((error) => {
                                    if (error) {
                                        console.error('Error committing transaction:', error);
                                        connection.rollback();
                                        connection.release();
                                        return res.status(500).json({ message: 'Internal server error' });
                                    }

                                    connection.release();
                                    res.json({ message: 'Product added successfully' });
                                });
                            });
                        }
                    );
                }
            );
        });
    });
});

router.get('/list-products', (req, res) => {
    connectionPool.query('SELECT * FROM product', (error, results) => {
        if (error) {
            console.error('Error fetching products:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }

        res.json(results);
    });
});
router.get('/fetch-products', (req, res) => {
    connectionPool.query('SELECT * FROM product', (error, results) => {
        if (error) {
            console.error('Error fetching products:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }

        res.json(results);
    });
});

router.put('/edit-product/:product_id', (req, res) => {
    const { product_name, brand, current_stock, price, supplier_id } = req.body;
    const { product_id } = req.params;

    connectionPool.query(
        'UPDATE product SET product_name = ?, brand = ?, current_stock = ?, price = ?, supplier_id = ? WHERE product_id = ?',
        [product_name, brand, current_stock, price, supplier_id, product_id],
        (error, results) => {
            if (error) {
                console.error('Error editing product:', error);
                return res.status(500).json({ message: 'Internal server error' });
            }

            res.json({ message: 'Product details updated successfully' });
        }
    );
});

router.delete('/delete-product/:product_id', (req, res) => {
    const { product_id } = req.params;

    connectionPool.query('DELETE FROM product WHERE product_id = ?', [product_id], (error, results) => {
        if (error) {
            console.error('Error deleting product:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }

        res.json({ message: 'Product deleted successfully' });
    });
});
router.post('/purchase-product', (req, res) => {
    const customer_email = req.user.customer_id;
    const { product_id, quantity } = req.body;

    connectionPool.getConnection((error, connection) => {
        if (error) {
            console.error('Error getting connection:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }

        connection.beginTransaction((err) => {
            if (err) {
                console.error('Error starting transaction:', err);
                connection.release();
                return res.status(500).json({ message: 'Internal server error' });
            }

            connection.query(
                'SELECT id FROM users WHERE email = ?',
                [customer_email],
                (error, userResults) => {
                    if (error) {
                        console.error('Error fetching user:', error);
                        connection.rollback();
                        connection.release();
                        return res.status(500).json({ message: 'Internal server error' });
                    }
                    if (!userResults || userResults.length === 0) {
                        connection.rollback();
                        connection.release();
                        return res.status(404).json({ message: 'Customer user not found' });
                    }

                    const customer_id = userResults[0].id;

                    connection.query(
                        'SELECT price, current_stock FROM product WHERE product_id = ?',
                        [product_id],
                        (error, productResults) => {
                            if (error) {
                                console.error('Error fetching product details:', error);
                                connection.rollback();
                                connection.release();
                                return res.status(500).json({ message: 'Internal server error' });
                            }

                            if (productResults.length === 0) {
                                connection.rollback();
                                connection.release();
                                return res.status(404).json({ message: 'Product not found' });
                            }

                            const price = productResults[0].price;
                            const available_stock = productResults[0].current_stock;

                            if (available_stock < quantity) {
                                connection.rollback();
                                connection.release();
                                return res.status(400).json({ message: 'Insufficient stock' });
                            }

                            const total_amount = price * quantity;

                            const transactionQuery = `
                                INSERT INTO transaction (transaction_date, user_id, total_amount, transaction_type)
                                VALUES (NOW(), ?, ?, 'outgoing')
                            `;
                            const transactionValues = [customer_id, total_amount];

                            connection.query(transactionQuery, transactionValues, (error) => {
                                if (error) {
                                    console.error('Error adding transaction:', error);
                                    connection.rollback();
                                    connection.release();
                                    return res.status(500).json({ message: 'Internal server error' });
                                }

                                const outgoingTransactionQuery = `
                                    INSERT INTO outgoing_transaction (transaction_date, customer_id, total_amount)
                                    VALUES (NOW(), ?, ?)
                                `;
                                const outgoingTransactionValues = [customer_id, total_amount];

                                connection.query(outgoingTransactionQuery, outgoingTransactionValues, (error) => {
                                    if (error) {
                                        console.error('Error adding outgoing transaction:', error);
                                        connection.rollback();
                                        connection.release();
                                        return res.status(500).json({ message: 'Internal server error' });
                                    }

                                    connection.query(
                                        'UPDATE product SET current_stock = current_stock - ? WHERE product_id = ?',
                                        [quantity, product_id],
                                        (error) => {
                                            if (error) {
                                                console.error('Error updating product stock:', error);
                                                connection.rollback();
                                                connection.release();
                                                return res.status(500).json({ message: 'Internal server error' });
                                            }

                                            connection.commit((error) => {
                                                if (error) {
                                                    console.error('Error committing transaction:', error);
                                                    connection.rollback();
                                                    connection.release();
                                                    return res.status(500).json({ message: 'Internal server error' });
                                                }

                                                connection.release();
                                                res.json({ message: 'Product purchased successfully' });
                                            });
                                        }
                                    );
                                });
                            });
                        }
                    );
                }
            );
        });
    });
});
module.exports = router;
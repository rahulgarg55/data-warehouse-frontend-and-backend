const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const { PDFDocument, rgb } = require('pdf-lib');
const { promisify } = require('util');
const fs = require('fs');
const path = require('path');

const { authorizeAdmin } = require('./authorizationMiddleware');

const connectionPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'datawarehouse',
});
const writeFileAsync = promisify(fs.writeFile);

router.post('/add-incoming-transaction', authorizeAdmin, (req, res) => {
    const { transaction_date, admin_id, total_amount } = req.body;

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
                'INSERT INTO incoming_transaction (transaction_date, admin_id, total_amount) VALUES (?, ?, ?)',
                [transaction_date, admin_id, total_amount],
                (error, results) => {
                    if (error) {
                        console.error('Error adding incoming transaction:', error);
                        connection.rollback();
                        connection.release();
                        return res.status(500).json({ message: 'Internal server error' });
                    }

                    const incomingTransactionId = results.insertId;

                    const incomingTransactionDetails = req.body.incoming_transaction_details;
                    const values = incomingTransactionDetails.map(detail => [
                        incomingTransactionId,
                        detail.product_id,
                        detail.quantity,
                        detail.price
                    ]);

                    connection.query(
                        'INSERT INTO incoming_transaction_detail (incoming_transaction_id, product_id, quantity, price) VALUES ?',
                        [values],
                        (error) => {
                            if (error) {
                                console.error('Error adding incoming transaction details:', error);
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
                                res.json({ message: 'Incoming transaction added successfully' });
                            });
                        }
                    );
                }
            );
        });
    });
});

router.post('/add-outgoing-transaction', (req, res) => {
    const { transaction_date, user_id, total_amount } = req.body;

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
                'INSERT INTO outgoing_transaction (transaction_date, user_id, total_amount) VALUES (?, ?, ?)',
                [transaction_date, user_id, total_amount],
                (error, results) => {
                    if (error) {
                        console.error('Error adding outgoing transaction:', error);
                        connection.rollback();
                        connection.release();
                        return res.status(500).json({ message: 'Internal server error' });
                    }

                    const outgoingTransactionId = results.insertId;

                    const outgoingTransactionDetails = req.body.outgoing_transaction_details;
                    const values = outgoingTransactionDetails.map(detail => [
                        outgoingTransactionId,
                        detail.product_id,
                        detail.quantity,
                        detail.price
                    ]);

                    connection.query(
                        'INSERT INTO outgoing_transaction_detail (outgoing_transaction_id, product_id, quantity, price) VALUES ?',
                        [values],
                        (error) => {
                            if (error) {
                                console.error('Error adding outgoing transaction details:', error);
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
                                res.json({ message: 'Outgoing transaction added successfully' });
                            });
                        }
                    );
                }
            );
        });
    });
});
router.get('/get-transactions', (req, res) => {
    connectionPool.query('SELECT * FROM transaction', (error, results) => {
        if (error) {
            console.error('Error getting transactions:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }

        res.json(results);
    });
});
router.post('/add-transaction', (req, res) => {
    const { transaction_date, user_id, total_amount, transaction_type } = req.body;


    connectionPool.query(
        'INSERT INTO transaction (transaction_date, user_id, total_amount, transaction_type) VALUES (?, ?, ?, ?)',
        [transaction_date, user_id, total_amount, transaction_type],
        (error, results) => {
            if (error) {
                console.error('Error adding transaction:', error);
                return res.status(500).json({ message: 'Internal server error' });
            }

            const newTransactionId = results.insertId;
            res.json({ message: 'Transaction added successfully', id: newTransactionId });
        }
    );
});

router.get('/generate-incoming-pdf/:transaction_id', authorizeAdmin, async (req, res) => {
    const { transaction_id } = req.params;

    const query = `
        SELECT t.incoming_transaction_id, t.transaction_date, t.total_amount, d.product_id, d.quantity, d.price, p.product_name
        FROM incoming_transaction t
        INNER JOIN incoming_transaction_detail d ON t.incoming_transaction_id = d.incoming_transaction_id
        INNER JOIN product p ON d.product_id = p.product_id
        WHERE t.incoming_transaction_id = ?
    `;

    connectionPool.query(query, [transaction_id], async (error, results) => {
        if (error) {
            console.error('Error fetching incoming transaction details:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }

        const transactionData = results;

        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage();

        page.drawText(`Incoming Transaction ID: ${transactionData[0].incoming_transaction_id}`, {
            x: 50,
            y: page.getHeight() - 50,
            size: 18,
            color: rgb(0, 0, 0),
        });


        const pdfBytes = await pdfDoc.save();
        const tempFilePath = path.join('D:', 'GeeksforGeeks Placement 100', `temporary_file_${transaction_id}.pdf`);
        await writeFileAsync(tempFilePath, pdfBytes);



        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="incoming_transaction_${transaction_id}.pdf"`);
        res.send(pdfBytes);
        fs.unlink(tempFilePath, (unlinkError) => {
            if (unlinkError) {
                console.error('Error deleting temporary file:', unlinkError);
            }
        });
    });
});

module.exports = router;
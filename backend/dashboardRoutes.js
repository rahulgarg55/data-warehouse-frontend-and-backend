const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const { authorizeAdmin } = require('./authorizationMiddleware');

const connectionPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'datawarehouse',
});

router.get('/incoming-goods-data', (req, res) => {
    connectionPool.query(
        'SELECT COUNT(*) AS incomingGoodsCount FROM transaction WHERE transaction_type = "incoming"',
        (error, results) => {
            if (error) {
                console.error('Error fetching incoming goods data:', error);
                return res.status(500).json({ message: 'Internal server error' });
            }
            res.json({ count: results[0].incomingGoodsCount });

        }
    );
});

router.get('/outgoing-goods-data', (req, res) => {
    connectionPool.query(
        'SELECT COUNT(*) AS outgoingGoodsCount FROM transaction WHERE transaction_type = "outgoing"',
        (error, results) => {
            if (error) {
                console.error('Error fetching outgoing goods data:', error);
                return res.status(500).json({ message: 'Internal server error' });
            }

            res.json({ count: results[0].outgoingGoodsCount });

        }
    );
});
function updateProductStock(productId, newStock, callback) {
    const updateSql = 'UPDATE product SET current_stock = current_stock + ? WHERE product_id = ?';

    connectionPool.query(updateSql, [newStock, productId], (error, updateResults) => {
        if (error) {
            return callback(error);
        }

        const selectSql = 'SELECT current_stock FROM product WHERE product_id = ?';

        connectionPool.query(selectSql, [productId], (error, selectResults) => {
            if (error) {
                return callback(error);
            }

            const updatedStock = selectResults[0].current_stock;
            callback(null, updatedStock);
        });
    });
}

router.post('/update-product-stock', (req, res) => {
    const productId = req.body.productId;
    const newStock = req.body.newStock;

    updateProductStock(productId, newStock, (error, updatedStock) => {
        if (error) {
            return res.status(500).json({ error });
        }

        res.json({ stock: updatedStock });
    });
});



router.get('/suppliers-data', (req, res) => {
    connectionPool.query('SELECT COUNT(*) AS supplierCount FROM supplier', (error, results) => {
        if (error) {
            console.error('Error fetching suppliers data:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }

        const supplierCount = results[0].supplierCount;
        res.json({ count: supplierCount });

    });
});

router.get('/customers-data', (req, res) => {
    connectionPool.query('SELECT COUNT(*) AS customerCount FROM customer', (error, results) => {
        if (error) {
            console.error('Error fetching customers data:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }

        const customerCount = results[0].customerCount;

        res.json({ count: customerCount });
    });
});

module.exports = router;

const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression')
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const app = express();
const connection = mysql.createConnection({ //we use the same connection for all queries by createconnection
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'datawarehouse',

});
app.use(compression());
const loginRoutes = require('./login');
const roleRoutes = require('./roleRoutes');
const customRoutes = require('./customerRoutes');
const supplierRoutes = require('./supplierRoutes');
const Productroutes = require('./Productroutes');
const Transactionroutes = require('./Transactionroutes');
const dashboardRoutes = require('./dashboardRoutes');



app.use(cors({ origin: '*' }));
app.use(bodyParser.json());



connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database!');
});



app.use('/api', loginRoutes);
app.use('/api', roleRoutes);
app.use('/api', customRoutes);
app.use('/api', supplierRoutes);
app.use('/api', Productroutes);
app.use('/api', Transactionroutes);
app.use('/api', dashboardRoutes);
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

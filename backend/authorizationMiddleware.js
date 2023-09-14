const jwt = require('jsonwebtoken');
function authorizeAdmin(req, res, next) {
    const token = req.header('Authorization');
    console.log("token", token);
    if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing' });
    }
    try {
        const decoded = jwt.verify(token, 'sk_test_51Kb3jnSDwXbsOnZOQ4FuUW2Tw44ygW4hAJ11yx57i7Hze0CB5eYsOlcoodwThlZyzAAa3k0BXG41HwRBQ7dw1GYf00bJuew2St');
        console.log("decoded", decoded);

        if (decoded.role !== 1) {
            console.log('req.user', req.user);
            return res.status(403).json({ message: 'Access denied' });
        }
        req.user = {
            admin_id: decoded.id,
        };
        next();
    }
    catch (error) {
        console.log('error', error);
        return res.status(401).json({ message: 'Invalid token' });
    }
}
function authorizeCustomer(req, res, next) {
    const token = req.header('Authorization');
    console.log("token", token);
    if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing' });
    }
    try {
        const decoded = jwt.verify(token, 'sk_test_51Kb3jnSDwXbsOnZOQ4FuUW2Tw44ygW4hAJ11yx57i7Hze0CB5eYsOlcoodwThlZyzAAa3k0BXG41HwRBQ7dw1GYf00bJuew2St');
        console.log("decoded", decoded);

        if (decoded.role !== 'customer') {
            console.log('req.user', decoded);
            return res.status(403).json({ message: 'Access denied' });
        }
        req.user = {
            customer_id: decoded.id,
        };
        next();
    } catch (error) {
        console.log('error', error);
        return res.status(401).json({ message: 'Invalid token' });
    }
}

module.exports = { authorizeAdmin, authorizeCustomer };
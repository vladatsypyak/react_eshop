const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    const {
        authorization,
    } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: 'Please, provide authorization header' });
    }

    const [, token] = authorization.split(' ');

    if (!token) {
        return res.status(401).json({ message: 'Please, include token to request' });
    }

    try {
        const tokenPayload = jwt.verify(token, "secret");
        req.user = {
            userId: tokenPayload.userId,
            email: tokenPayload.email,
        };
        console.log(req.user);
        return next();
    } catch (err) {
        return res.status(401).json({ message: err.message });
    }
};

module.exports = {
    authMiddleware,
};

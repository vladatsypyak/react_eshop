const jwt = require("jsonwebtoken");

function getTokenPayload(req) {
    const {authorization} = req.headers;
    const [, token] = authorization.split(' ');
    return jwt.verify(token, "secret");
}

module.exports = {
    getTokenPayload
};
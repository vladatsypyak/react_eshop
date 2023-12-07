const jwt = require("jsonwebtoken");

function getTokenPayload(req) {
    const {authorization} = req.headers;
    const [, token] = authorization.split(' ');
    // const tokenPayload = jwt.verify(token, process.env.SECRET_KEY);
    return jwt.verify(token, "secret");
}

module.exports = {
    getTokenPayload
};
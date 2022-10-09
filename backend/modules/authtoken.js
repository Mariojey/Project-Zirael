require('dotenv').config();

const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET 


function generateToken(user, id) {
    return jwt.sign({id, user}, jwtSecret);
}

function decodeToken(token) {
    return jwt.decode(token, jwtSecret);
}

function verifyToken(token, user) {
    try {
        const decodedToken = decodeToken(token);

        return decodedToken.user === user;
    }
    catch {
        return false;
    }
}

module.exports = {generateToken: generateToken, decodeToken: decodeToken, verifyToken: verifyToken}
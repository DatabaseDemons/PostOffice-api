//auth.js
/*
Handles role based authentication

*/

//Create secret token
// const crypto = require('crypto');
// const accessTokenSecret = crypto.randomBytes(64).toString('hex');
// console.log(accessTokenSecret);

// Middleware function to check if user is authorized to access the resource
const jwt = require('jsonwebtoken');


// Middleware function to check if authenticated user is an admin
const authenticateAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.sendStatus(401); // Unauthorized
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden
        }
        if (user.type !== 'admin') { // Check user type
            return res.sendStatus(403); // Forbidden
        }
        req.user = user;
        next();
    });
};


module.exports = { 
    authenticateAdmin
};
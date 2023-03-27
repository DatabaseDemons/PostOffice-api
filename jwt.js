//jwt.js
/*
Handles role based authentication
*/

//Create secret token
// const crypto = require('crypto');
// const accessTokenSecret = crypto.randomBytes(64).toString('hex');
// console.log(accessTokenSecret);

// Middleware function to check if user is authorized to access the resource
const jwt = require('jsonwebtoken');

const init_jwt = (user) => {
    //DEBUG
    //console.log(user);
    // try{
    //     console.log(jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {}));
    // } catch(error)
    // {
    //     console.log(error)
    // }
        
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {});
}


// Middleware function to check if authenticated user is an admin
const authenticate = (req, res, role) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token);
    if (!token) {
        return res.statusCode = 401; // Unauthorized
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.statusCode = 403; // Forbidden
        }
        if (user.type !== role) { // Check user type
            return res.statusCode = 403; // Forbidden
        }
        req.user = user;

    });
};


module.exports = { 
    authenticate,
    init_jwt
};
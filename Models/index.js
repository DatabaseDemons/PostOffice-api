//import all models here

const { Shipment } = require('./shipment');
const { User } = require('./user');
const { Branch } = require('./branch');

module.exports = {
    User, Shipment, Branch,
};
//export all models here (to be read from app.js)
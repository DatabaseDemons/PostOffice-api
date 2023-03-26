//import all models here

const { Shipment } = require('./shipment');
const { User } = require('./user');

module.exports = {
    User, Shipment,
};
//export all models here (to be read from app.js)
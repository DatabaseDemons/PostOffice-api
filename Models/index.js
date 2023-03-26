//import all models here

const { Shipment } = require('./shipment');
const { User } = require('./user');
const { Branch } = require('./branch');
const { POBox } = require('./poBox');

module.exports = {
    User, Shipment, Branch,
    POBox,
};
//export all models here (to be read from app.js)
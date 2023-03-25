//import all controllers here

const { ShipmentController } = require('./shipmentController');
const { UserController } = require('./userController');


module.exports = {
    ShipmentController, UserController,
};
//export all controllers here (to be read from app.js)
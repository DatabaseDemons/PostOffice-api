//import all controllers here

const { ShipmentController } = require('./shipmentController');
const { UserController } = require('./userController');
const { BranchController } = require('./branchController');


module.exports = {
    ShipmentController, UserController,
    BranchController,
};
//export all controllers here (to be read from app.js)
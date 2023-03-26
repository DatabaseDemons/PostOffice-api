//import all controllers here

const { ShipmentController } = require('./shipmentController');
const { UserController } = require('./userController');
const { BranchController } = require('./branchController');
const { POBoxController } = require('./poBoxController');


module.exports = {
    ShipmentController, UserController,
    BranchController, POBoxController,
};
//export all controllers here (to be read from app.js)
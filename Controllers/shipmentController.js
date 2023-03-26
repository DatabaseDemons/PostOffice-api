//Shipment controller

const { Shipment } = require('../Models/index');

class ShipmentController {
    async getAllShipments() {
        return await Shipment.getAllShipments();
    }
    async getShipmentByID(id) {
        return await Shipment.getShipmentByID(id);
    }
}

module.exports = ShipmentController;
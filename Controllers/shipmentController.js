//Shipment controller

const { Shipment } = require('../Models/shipment');

class ShipmentController {
    async getAllShipments() {
        return await Shipment.getAllShipments();
    }
    async getShipmentByID(id) {
        return await Shipment.getShipmentByID(id);
    }
}

module.exports = {
    ShipmentController,
}
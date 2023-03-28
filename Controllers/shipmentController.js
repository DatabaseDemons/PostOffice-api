//Shipment controller


const { Shipment } = require('../Models/shipment');


class ShipmentController {
    async getAllShipments() {
        return await Shipment.getAllShipments();
    }
    async getShipmentByID(id) {
        return await Shipment.getShipmentByID(id);
    }
    async getShipmentByCreationDate(date) {
        return await Shipment.getShipmentByCreationDate(date);
    }
    async getShipmentsByEmail(email) {
        return await Shipment.getShipmentsByEmail(email);
    }
}


module.exports = {
    ShipmentController,
}
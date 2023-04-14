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
    async createShipment(shipment) {
        return await Shipment.createShipment(shipment);
    }
    async updateShipmentStatus(id, status) {
        return await Shipment.updateShipmentStatus(id, status);
    }
}


module.exports = {
    ShipmentController,
}
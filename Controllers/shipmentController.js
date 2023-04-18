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
    async updateShipmentStatus(id, status, location) {
        return await Shipment.updateShipmentStatus(id, status, location);
    }
    async updateShipment(id, key, new_value) {
        return await Shipment.updateShipment(id, key, new_value);
    }
    async deleteShipment(id, isDeleted) {
        return await Shipment.deleteShipment(id, isDeleted);
    }
}


module.exports = {
    ShipmentController,
}
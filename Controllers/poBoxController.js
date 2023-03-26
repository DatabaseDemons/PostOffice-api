//PO box controller

const { POBox } = require('../Models/index');

class POBoxController {
    async getAllPOBoxes() {
        return await POBox.getAllPOBoxes();
    }
    async getPOBoxByID(id) {
        return await POBox.getPOBoxByID(id);
    }
}

module.exports = POBoxController;
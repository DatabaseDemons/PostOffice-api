//PO box controller

const { POBox } = require('../Models/poBox');

class POBoxController {
    async getAllPOBoxes() {
        return await POBox.getAllPOBoxes();
    }
    // Gets all PO boxes owned by a specific branch.
    async getAllPOBoxesByBranch(branch_addr) {
        return await POBox.getAllPOBoxesByBranch(branch_addr);
    }
    async getPOBoxByID(id) {
        return await POBox.getPOBoxByID(id);
    }
}

module.exports = {
    POBoxController,
}
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
    async getPOBoxByEmail(email) {
        return await POBox.getPOBoxByEmail(email);
    }
}

module.exports = {
    POBoxController,
}
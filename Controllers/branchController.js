//Branch controller

const { Branch } = require('../Models/index');

class BranchController {
    async getAllBranches() {
        return await Branch.getAllBranches();
    }
    async getBranchByID(address) {
        return await Branch.getBranchByID(address);
    }
}

module.exports = BranchController;
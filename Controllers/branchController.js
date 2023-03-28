//Branch controller

const { Branch } = require('../Models/branch');

class BranchController {
    async getAllBranches() {
        return await Branch.getAllBranches();
    }
    async getBranchByAddress(address) {
        return await Branch.getBranchByAddress(address);
    }
}

module.exports = {
    BranchController,
}
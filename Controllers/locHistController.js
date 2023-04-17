//Loc Hist controller

const { LocHistory } = require('../Models/locHist');


class locHistController {
    async getAllLocHist() {
        return await LocHistory.getAllLocHist();
    }
    async getLocHistbyID (filter) {
        return await LocHistory.getLocHistbyID(filter);
    }
}


module.exports = {
    locHistController,
}

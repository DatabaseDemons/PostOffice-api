//Job controller

const { Report } = require('../Models/report');


class ReportController {
    async getShipmentReport(filter) {
        return await Report.getShipmentReport(filter);
    }
}


module.exports = {
    ReportController,
}

//Report controller

const { Report } = require('../Models/report');


class ReportController {
    async getEmployeeReport(filter) {
        return await Report.getEmployeeReport(filter);
    }
    async getShipmentReport(filter) {
        return await Report.getShipmentReport(filter);
    }
}


module.exports = {
    ReportController,
}

//Job controller

const { Job } = require('../Models/job');


class JobController {
    async getAllJobs() {
        return await Job.getAllJobs();
    }
    async getJobReportByEmail(email) {
        return await Job.getJobByEmail(email);
    }
    async getSelfReport(filter) {
        return await Job.getSelfReport(filter);
    }
    async createPackages(job) {
        return await Job.createPackage(job);
    }
}


module.exports = {
    JobController,
}
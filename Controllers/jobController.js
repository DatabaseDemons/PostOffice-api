//Job controller

const { Job } = require('../Models/job');


class JobController {
    async getAllJobs() {
        return await Job.getAllJobs();
    }
    async getSelfReport(filter) {
        return await Job.getSelfReport(filter);
    }
    async getAllEmployeeReport(filter) {
        return await Job.getSelfReport(filter);
    }
    async createJob(job) {
        return await Job.createJob(job);
    }
}


module.exports = {
    JobController,
}

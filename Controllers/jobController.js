//Job controller

const { Job } = require('../Models/job');


class JobController {
    async getAllJobs() {
        return await Job.getAllJobs();
    }
    async getJobByEmail(email) {
        return await Job.getJobByEmail(email);
    }
    async createPackages(job) {
        return await Job.createPackage(job);
    }
}


module.exports = {
    JobController,
}
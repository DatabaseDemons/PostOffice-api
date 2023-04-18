//Job controller

const { Job } = require('../Models/job');


class JobController {
    async getAllJobs() {
        return await Job.getAllJobs();
    }
    async getJobByID(id) {
        return await Job.getJobByID(id);
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
    async updateJob(id, key, new_value) {
        return await Job.updateJob(id, key, new_value);
    }
}


module.exports = {
    JobController,
}

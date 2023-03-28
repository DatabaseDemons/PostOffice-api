//Tracks controller
const { Tracks } = require('../Models/tracks');

class TracksController {
    async getAllTracks() {
        return await Tracks.getAllTracks();
    }
    async createTracks(data) {
        return await Tracks.createTracks(data);
    }
}

module.exports = {
    TracksController,
}
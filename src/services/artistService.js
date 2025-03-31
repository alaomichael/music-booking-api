const Artist = require('../models/artist');

class ArtistService {
    static async createArtist(data) {
        return await Artist.create(data);
    }

    static async getArtists() {
        return await Artist.findAll();
    }
}

module.exports = ArtistService;
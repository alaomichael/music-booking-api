const ArtistService = require('../services/artistService');

exports.createArtist = async (req, res) => {
    try {
        const artist = await ArtistService.createArtist(req.body);
        res.status(201).json(artist);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create artist' });
    }
};

exports.getArtists = async (req, res) => {
    try {
        const artists = await ArtistService.getArtists();
        res.status(200).json(artists);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve artists' });
    }
};
const Artist = require('../models/artist');

exports.createArtist = async (req, res) => {
    try {
        const artist = await Artist.create(req.body);
        res.status(201).json(artist);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create artist' });
    }
};

exports.getArtists = async (req, res) => {
    try {
        const artists = await Artist.findAll();
        res.status(200).json(artists);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve artists' });
    }
};
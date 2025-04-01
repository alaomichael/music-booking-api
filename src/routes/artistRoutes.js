const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artistController');
const auth = require('../middleware/auth');

router.post('/', auth, artistController.createArtist);
router.get('/', auth, artistController.getArtists);

module.exports = router;
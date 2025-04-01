const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const auth = require('../middleware/auth');

router.post('/', auth, bookingController.createBooking);
router.put('/:id', auth, bookingController.updateBooking);
router.get('/', auth, bookingController.getBookings);

module.exports = router;
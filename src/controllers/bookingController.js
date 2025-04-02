const BookingService = require('../services/bookingService');

exports.createBooking = async (req, res) => {
    try {
        const { event_id, status, payment_details } = req.body;
        const user_id = req.user.id; // From JWT
        const booking = await BookingService.createBooking({ event_id, user_id, status, payment_details });
        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create booking' });
    }
};

exports.updateBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const booking = await BookingService.updateBooking(id, status);
        res.status(200).json(booking);
    } catch (error) {
        res.status(error.message === 'Booking not found' ? 404 : 400).json({ error: error.message });
    }
};



exports.getBookings = async (req, res) => {
    try {
        const bookings = await BookingService.getBookings();
        res.status(200).json(bookings);
    } catch (error) {
        console.log("Error message", error);
        res.status(500).json({ error: 'Failed to retrieve bookings' });
    }
};
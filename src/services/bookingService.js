const Booking = require('../models/booking');

class BookingService {
    static async createBooking({ event_id, user_id, status, payment_details }) {
        return await Booking.create({ event_id, user_id, status, payment_details });
    }

    static async updateBooking(id, status) {
        const booking = await Booking.update(id, status);
        if (!booking) throw new Error('Booking not found');
        return booking;
    }
}

module.exports = BookingService;
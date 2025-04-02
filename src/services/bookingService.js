const Booking = require('../models/booking');

class BookingService {
    static async createBooking({ event_id, user_id, status, payment_details }) {
        // Validate card format
        const cardRegex = /^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$/;
        if (!cardRegex.test(payment_details.card)) {
            throw new Error('Card in payment_details must be in the format XXXX-XXXX-XXXX-XXXX');
        }
        return await Booking.create({ event_id, user_id, status, payment_details });
    }

    static async updateBooking(id, status) {
        const booking = await Booking.update(id, status);
        if (!booking) throw new Error('Booking not found');
        return booking;
    }
    
    static async getBookings() {
        return await Booking.findAll();
    }
}

module.exports = BookingService;
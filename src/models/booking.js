const pool = require('../config/database');

class Booking {
    static async create({ event_id, user_id, status, payment_details }) {
        const query = `
            INSERT INTO bookings (event_id, user_id, status, payment_details)
            VALUES ($1, $2, $3, $4) RETURNING *;
        `;
        const values = [event_id, user_id, status, JSON.stringify(payment_details)];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    static async update(id, status) {
        const query = `
            UPDATE bookings SET status = $1 WHERE id = $2 RETURNING *;
        `;
        const values = [status, id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }
}

module.exports = Booking;
const pool = require('../config/database');

class User {
    static async create({ email, password, name }) {
        const query = `
            INSERT INTO users (email, password, name)
            VALUES ($1, $2, $3) RETURNING id, email, name, created_at;
        `;
        const values = [email, password, name];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    static async findByEmail(email) {
        const query = 'SELECT * FROM users WHERE email = $1;';
        const { rows } = await pool.query(query, [email]);
        return rows[0];
    }
}

module.exports = User;
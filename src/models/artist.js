const pool = require('../config/database');

class Artist {
    static async create({ name, bio, genre, contact_info }) {
        const query = `
            INSERT INTO artists (name, bio, genre, contact_info)
            VALUES ($1, $2, $3, $4) RETURNING *;
        `;
        const values = [name, bio, genre, contact_info];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    static async findAll() {
        const query = 'SELECT * FROM artists;';
        const { rows } = await pool.query(query);
        return rows;
    }
}

module.exports = Artist;
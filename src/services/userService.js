const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserService {
    static async register({ email, password, name }) {
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            throw new Error('Email already in use');
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return await User.create({ email, password: hashedPassword, name });
    }

    static async login({ email, password }) {
        const user = await User.findByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid credentials');
        }
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '3h',
        });
        return { token, user: { id: user.id, email: user.email, name: user.name } };
    }
}

module.exports = UserService;
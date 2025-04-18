const UserService = require('../services/userService');

exports.register = async (req, res) => {
    try {
        const user = await UserService.register(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const result = await UserService.login(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};
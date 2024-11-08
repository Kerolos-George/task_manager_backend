const UserService = require('../services/userService');

exports.register = async (req, res) => {
    try {
        const user = await UserService.registerUser(req.body);
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
       
        const { token, user } = await UserService.loginUser(req.body);
        
        // Send token and user info as response
        res.json({ token, user });
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
};


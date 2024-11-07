const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class UserService {

    static async registerUser({ username, email, password }) {
        // Check if the email is already taken
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            throw new Error('User with this email already exists');
        }

        // Check if the username is already taken
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            throw new Error('Username already taken, please choose a different username');
        }

       
        const user = new User({ username, email, password });
        await user.save();
        
        // Return the user without the password
        return await User.findById(user._id).select('-password');
    }



    static async loginUser({ email, password }) {
        if (!email || !password) {
            throw new Error('Email and password are required');
        }
    
        try {
            
            const user = await User.findOne({ email }).select('+password');
            
          
            if (!user || !user.password) {
                throw new Error('Invalid credentials'); 
            }
    
            
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new Error('Invalid credentials');
            }
    
            // Generate JWT token with userId and username in the payload
            const token = jwt.sign(
                { userId: user._id.toString(), username: user.username }, 
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
    
     
            return {token};
        } catch (error) {
            console.error('Login error:', error);
            throw new Error('Failed to login');
        }
    }
    

}

module.exports = UserService;

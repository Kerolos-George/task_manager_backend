const Joi = require('joi');

// Schema for user registration validation
const registrationSchema = Joi.object({
    username: Joi.string().required().messages({
        "string.empty": "Username is required",
        "any.required": "Username is a required field",
    }),
    email: Joi.string().email().required().messages({
        "string.email": "Please enter a valid email address",
        "string.empty": "Email is required",
        "any.required": "Email is a required field",
    }),
    password: Joi.string().min(6).required().messages({
        "string.min": "Password should be at least 6 characters",
        "string.empty": "Password is required",
        "any.required": "Password is a required field",
    }),
});

// Schema for user login validation
const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email": "Please enter a valid email address",
        "string.empty": "Email is required",
        "any.required": "Email is a required field",
    }),
    password: Joi.string().required().messages({
        "string.empty": "Password is required",
        "any.required": "Password is a required field",
    }),
});

// Middleware to validate registration data
exports.validateRegistration = (req, res, next) => {
    const { error } = registrationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

// Middleware to validate login data
exports.validateLogin = (req, res, next) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

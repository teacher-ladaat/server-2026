import Joi from 'joi';

export const validateUser = {
    // user login (email, password)
    login: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    }),
    // user register (username, email, password, repeat_password, phone)
    register: Joi.object({
        username: Joi.string().alphanum().trim().min(5).required(), // .trim() חיתוך רווחים
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        repeat_password: Joi.ref('password'),
        phone: Joi.string().pattern(/^0?(([23489]{1}[0-9]{7})|[57]{1}[0-9]{8})+$/).required(),
    })
    // user update password (old_password, password, repeat_password)
};

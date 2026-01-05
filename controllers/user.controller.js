import User from "../models/user.model.js";

export const getAllUsers = (req, res) => {
    res.send('get all users, req time: ' + (new Date() - req.currentDate));
};

export const register = async (req, res, next) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();

        res.status(201).json(newUser);
    } catch (error) {
        next({ status: 409, message: error.message });
    }
};

export const login = (req, res) => {
    res.send('login');
};
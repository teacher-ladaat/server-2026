import User from "../models/user.model.js";

export const getAllUsers = (req, res, next) => {
    res.send('get all users, req time: ' + (new Date() - req.currentDate));
};

export const register = async (req, res, next) => {
    try {
        const newUser = new User(req.body);
        await newUser.save(); // הולך לפרה-סייב ושומר סיסמא מוצפנת

        // TODO: return token
        res.status(201).json(newUser);
    } catch (error) {
        next({ status: 409, message: error.message });
    }
};

export const login = async (req, res, next) => {
    // verify אימות סיסמא
    try {
        // req.body is valid
        // const user = await User.findOne({ email: req.body.email });

        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !user.comparePasswords(password)) {
            return next({ status: 400, message: `email/password invalid` });
        }

        // TODO: return token
        return res.json(user);
    } catch (error) {
        next({ message: error.message });
    }
};
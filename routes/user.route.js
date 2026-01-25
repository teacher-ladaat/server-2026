import { Router } from "express";
import { getAllUsers, login, register } from "../controllers/user.controller.js";
import { joiValidator } from "../middlewares/joi-validator.middleware.js";
import { validateUser } from "../models/user.model.js";
import { auth, isAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

// get all users
// הוספת מידלוואר רק לנתיב אחד בתוך הראוט
// מבצע לפי הסדר
// ניתן הרשאה רק למנהל
router.get('/', auth, isAdmin, getAllUsers);

// register - add new user (regular POST)
router.post('/', joiValidator(validateUser.register), register);

// login - check exists user
router.post('/login', joiValidator(validateUser.login), login);

export default router;
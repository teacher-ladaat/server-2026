import { Router } from "express";
import { printHello } from "../middlewares/simple.middleware.js";

const router = Router();

// get all users
// הוספת מידלוואר רק לנתיב אחד בתוך הראוט
// מבצע לפי הסדר
router.get('/', printHello, (req, res) => {
    res.send('get all users, req time: ' + (new Date() - req.currentDate));
});

// register - add new user (regular POST)
router.post('/', (req, res) => {
    res.send('register');
});

// login - check exists user
router.post('/login', (req, res) => {
    res.send('login');
});

export default router;
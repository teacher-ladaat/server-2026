// 1. ייבוא אחרי התקנה third-party module
// const express = require('express');
import express from 'express';
import productRouter from './routes/product.route.js';
import userRouter from './routes/user.route.js';
import { addRequestDate, printHello } from './middlewares/simple.middleware.js';
import { blockDays } from './middlewares/blockDays.middleware.js';
import { errorHandler, urlNotFound } from './middlewares/errors.middleware.js';
import morgan from 'morgan';
import cors from 'cors';

import { config } from 'dotenv';

// .env-קורא את כל קבצי ה
// process.env ומכניס את הערכים כאוביקט לתוך
config();

// 2. יצירת השרת
const app = express();

// =============== הגדרות על כל השרת
// app.use(...)
// app.use('/users', ...)
// אם שולחים כתובת, ההגדרות יהיו לכל הכתובות שמתחילות בערך שנשלח
app.use(addRequestDate);

// third-party middlewares
// 1. morgan - מוניטור, לוג של השרת
app.use(morgan('dev'));
// 2. cors
//    פונקציה שמאפשרת גישה לכל לקוח/שרת
// app.use(cors());
// app.use(cors({ methods: 'POST' })); // מאפשר רק בקשות פוסט
app.use(cors({ origin: 'http://127.0.0.1:5500' })); // מאפשר רק לקליינט שמתחיל בכתובת הזו

// bulit-in middlewares
// express middleware creators
// 1. כדי שיצליח לקבל באדי
//    req.body מוסיף
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. קבצים סטטיים - כלומר כאשר נחפש את הקובץ יחפש בתיקיה הזו
//    fs-ויחזיר את תוכן הקובץ בלי להשתמש ב
app.use(express.static('public'));
// app.use(express.static('public/images'));

// קישור של המידלוואר לפני כל הבקשות בשרת
// כאן יש באדי
// json/urlencoded כי הוא נמצא אחרי המידלוואר
app.use(printHello);

// =============== הגדרת הניתובים
// /products-ניתוב שמתחיל ב
// מבצע את המידלווארס לפי הסדר
// עובר לראוטר רק אם לא החזיר תגובה במידלוואר של שבת
// 1. הוספת מידלוואר רק לראוטר אחד
// app.use('/products', blockDays([1, 7]));
// app.use('/products', productRouter);
app.use('/products', printHello, blockDays([7]), productRouter);

// /users-ניתוב שמתחיל ב
app.use('/users', userRouter);

// אחרי כל הראוטרים
app.use(urlNotFound);

// מקשרים את המידלוואר של השגיאות מתחת לכל הראוטרים
// כל שגיאה ש"נזרוק" תגיע לכאן
app.use(errorHandler);

// 3. הרצת השרת על פורט מסוים
const port = process.env.PORT ?? 3000;
app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
});

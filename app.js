// 1. ייבוא אחרי התקנה third-party module
// const express = require('express');
import express from 'express';
import productRouter from './routes/product.route.js';
// import { config } from 'dotenv';

// .env-קורא את כל קבצי ה
// process.env ומכניס את הערכים כאוביקט לתוך
// config();

// 2. יצירת השרת
const app = express();

// =============== הגדרות על כל השרת
// app.use(...)
// app.use('/users', ...)
// אם שולחים כתובת, ההגדרות יהיו לכל הכתובות שמתחילות בערך שנשלח

// כדי שיצליח לקבל באדי
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =============== הגדרת הניתובים
// /products-ניתוב שמתחיל ב
// http://loaclhost:3000/products
// http://loaclhost:3000/products/123 GET
// http://loaclhost:3000/products/123 PUT
// http://loaclhost:3000/products POST
// http://loaclhost:3000/products/123/abc/user POST
// http://loaclhost:3000/product/123 - לא יגיע לראוטר
// יגיע לראוטר של מוצרים שייבאנו
// /products כשמגיע לראוטר חותך את התחילית של
app.use('/products', productRouter);

// 3. הרצת השרת על פורט מסוים
const port = process.env.PORT ?? 3000;
app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
});

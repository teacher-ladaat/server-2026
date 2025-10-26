// 1. ייבוא אחרי התקנה third-party module
// const express = require('express');
import express from 'express';

// 2. יצירת השרת
const app = express();

// כדי שיצליח לקבל באדי
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mock data - נתוני דמה
const products = [
    { id: 100, name: 'milk', price: 5 },
    { id: 101, name: 'cheese', price: 6.5 },
];

// method: GET בקשת
// url: http://localhost:3000/products
app.get('/products', (req, res) => {
    // send מחזיר גם מחרוזות וגם טיפוסים שונים
    // res.send('Hello World!')

    // json להחזרת אוביקטים
    res.json(products);
});
// method: GET בקשת
// url: http://localhost:3000/products/111
app.get('/products/:id', (req, res) => {
    console.log(req.params); // אוביקט עם פרמטרי חובה
    console.log(req.query); // אוביקט עם פרמטרי רשות

    const p = products.find(x => x.id === +req.params.id);

    // json להחזרת אוביקטים
    res.json(p);
});

// method: POST בקשת
// url: http://localhost:3000/products
app.post('/products', (req, res) => {
    console.log(req.body);

    products.push(req.body);

    res.send(req.body);
});

// 3. הרצת השרת על פורט מסוים
const port = 3000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

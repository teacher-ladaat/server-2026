import { Router } from "express";

// הראוטר יכיל את כל הניתובים ששייכים למשאב מסוים
// resource - משאב
// URL - מושפע משם המשאב בד"כ ברבים
// http://localhost:3000/products
const router = Router();

// mock data - נתוני דמה
const products = [
    { id: 100, name: 'milk', price: 5 },
    { id: 101, name: 'cheese', price: 6.5 },
];

// method: GET בקשת
// url: http://localhost:3000/products
router.get('/', (req, res) => {
    // send מחזיר גם מחרוזות וגם טיפוסים שונים
    // res.send('Hello World!')

    // כאן לא מקובל להחזיר סטטוס 404 אם לא מצאנו
    // אלא מחזירים סטטוס 200 עם מערך ריק

    // json להחזרת אוביקטים
    res.json(products);
});

// method: GET בקשת
// url: http://localhost:3000/products/111
router.get('/:id', (req, res) => {
    // console.log(req.params); // אוביקט עם פרמטרי חובה
    // console.log(req.query); // אוביקט עם פרמטרי רשות

    const p = products.find(x => x.id === +req.params.id);

    if (!p) {
        // מחזירים סטטוס של שגיאה
        // json חובה להחזיר אותו לפני שכותבים
        res.status(404).json({ message: `product ${req.params.id} not found!` });
    }
    else {
        // json להחזרת אוביקטים
        // RESTful כך מקובל להחזיר משרת
        // אם לא כתבנו סטטוס יחזיר 200
        res.json(p);
    }
});

// method: POST בקשת
// url: http://localhost:3000/products
router.post('/', (req, res) => {
    console.log(req.body);

    products.push(req.body);

    res.send(req.body);
});

router.put('/:id', (req, res) => {
    console.log(req.body);


    // const id = req.params.id;
    const { id } = req.params; // object destructuring

    const p = products.find(x => x.id === +id);

    if (!p) {
        // מחזירים סטטוס של שגיאה
        // json חובה להחזיר אותו לפני שכותבים
        return res.status(404).json({ message: `product ${req.params.id} not found!` });
    }

    if (+id !== req.body.id) {
        return res.status(409).json({ message: 'id in body not match to params id' });
    }

    // json להחזרת אוביקטים
    // RESTful כך מקובל להחזיר משרת
    // אם לא כתבנו סטטוס יחזיר 200
    p.name = req.body.name || p.name;
    p.price = req.body.price < 0 ? p.price : req.body.price;
    res.json(p);
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const pIndex = products.findIndex(x => x.id === +id);

    if (pIndex === -1) {
        // מחזירים סטטוס של שגיאה
        // json חובה להחזיר אותו לפני שכותבים
        return res.status(404).json({ message: `product ${req.params.id} not found!` });
    }

    // splice - מוחק מהמערך המקורי - משנה אותו
    // slice/filter - יוצר מערך חדש עם ערכים לאחר המחיקה
    products.splice(pIndex, 1);
    res.status(204);
    res.end(); // end - לא מחזיר כלום
    // res.status(204).json();
});

export default router;
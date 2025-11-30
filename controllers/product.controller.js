import { isValidObjectId } from "mongoose";
import Product from "../models/product.model.js";

// mock data - נתוני דמה
const products = [
    { id: 100, name: 'milk', price: 5 },
    { id: 101, name: 'cheese', price: 6.5 },
];

export const getAllProducts = async (req, res, next) => {
    try {
        const { page = 1, limit = 5, name = '' } = req.query;

        // כאן לא מקובל להחזיר סטטוס 404 אם לא מצאנו
        // אלא מחזירים סטטוס 200 עם מערך ריק

        // חיפוש לפי מה שמכיל את הערך בניים
        // /a/i
        // מכיל איי גדולה/קטנה
        // שיטה שניה יותר דינאמית
        // new RegExp('a', 'i')
        const result = await Product.find({ name: new RegExp(name, 'i') })
            .skip((page - 1) * limit) // כמה לדלג
            .limit(limit);// כמה תוצאות להחזיר לכל היותר

        // pagintation - עימוד
        // const result = products
        //     .filter(p => p.name.toLowerCase().includes(name.toLowerCase()))
        //     .slice((page - 1) * limit, page * limit);

        // json להחזרת אוביקטים
        res.json(result);
    } catch (error) {
        // ילך למידלוואר של השגיאות עם שגיאת שרת דיפולטיבית
        next({});
    }
};

export const getProductById = async (req, res, next) => {
    // console.log(req.params); // אוביקט עם פרמטרי חובה
    // console.log(req.query); // אוביקט עם פרמטרי רשות
    const { id } = req.params;

    try {
        if (!isValidObjectId(id)) {
            return next({ status: 404, message: `product ${id} not found!` });
        }

        // זורק שגיאה אם נכשל בהמרה של האיי-די
        const p = await Product.findById(id);

        if (!p) {
            // מחזירים סטטוס של שגיאה
            // json חובה להחזיר אותו לפני שכותבים
            // res.status(404).json({ message: `product ${id} not found!` });
            // next - מקבל פרמטר הולך אוטומטית למידלוואר של השגיאות
            return next({ status: 404, message: `product ${id} not found!` });
        }

        // json להחזרת אוביקטים
        // RESTful כך מקובל להחזיר משרת
        // אם לא כתבנו סטטוס יחזיר 200
        res.json(p);
    } catch (error) {
        // ילך למידלוואר של השגיאות עם שגיאת שרת דיפולטיבית
        next({ message: error.message });
    }
}

export const addProduct = async (req, res, next) => {
    // console.log(req.body);
    // console.log(req.file);

    // 1.
    // יצר אוביקט חדש של מוצר שנמצא באויר
    const newProduct = new Product({
        // סומכים על הערך שנשלח בבאדי שהוא תקין
        // כי את הבדיקות כתבנו במידלוואר של ג'וי שנכנס אליו לפני הקונטרולר
        ...req.body,
        img: req.file?.path,
        // שדה שלא בסכמה לא גורם לשגיאה אבל לא מתווסף למסמך
        // xxx: 123,
    });

    // 2. שמירה בדטהבייס
    await newProduct.save();

    res.json(newProduct);
};

export const updateProduct = async (req, res, next) => {
    console.log(req.body);


    // const id = req.params.id;
    const { id } = req.params; // object destructuring

    try {
        const p = await Product.findByIdAndUpdate(id, {
            $set: req.body // עובר על כל התכונות בבאדי ומעדכן את כולן
        });
        res.json(p);
    } catch (error) {
        
    }

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
};

export const deleteProduct = (req, res, next) => {
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
};
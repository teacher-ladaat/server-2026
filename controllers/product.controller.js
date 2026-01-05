import { isValidObjectId } from "mongoose";
import Product from "../models/product.model.js";

export const getAllProducts = async (req, res, next) => {
    try {
        const { page = 1, limit = 5, name = '' } = req.query;

        // כאן לא מקובל להחזיר סטטוס 404 אם לא מצאנו
        // אלא מחזירים סטטוס 200 עם מערך ריק

        // pagintation - עימוד
        // חיפוש לפי מה שמכיל את הערך בניים
        // /a/i
        // מכיל איי גדולה/קטנה
        // שיטה שניה יותר דינאמית
        // new RegExp('a', 'i')
        const result = await Product.find({ name: new RegExp(name, 'i') })
            .skip((page - 1) * limit) // כמה לדלג
            .limit(limit);// כמה תוצאות להחזיר לכל היותר

        // json להחזרת אוביקטים
        res.json(result);
    } catch (error) {
        // ילך למידלוואר של השגיאות עם שגיאת שרת דיפולטיבית
        next({ message: error.message });
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
    try {
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
        // עם בדיקות תקינות שבסכמה של מונגו
        await newProduct.save();

        res.status(201).json(newProduct);
    } catch (error) {
        // 409 - conflict
        next({ status: 409, message: error.message });
    }
};

export const updateProduct = async (req, res, next) => {
    console.log(req.body);

    // const id = req.params.id;
    const { id } = req.params; // object destructuring

    if (!isValidObjectId(id)) {
        return next({ status: 404, message: `product ${id} not found!` });
    }

    try {
        const p = await Product.findByIdAndUpdate(id, {
            // $set - אם קיימת תכונה כזאת מעדכן אותה ואם לא - מוסיף חדש
            // קיימות אפשרויות נוספות כמו מחיקת שדות, קידום ב++
            $set: req.body // עובר על כל התכונות בבאדי ומעדכן את כולן
        }, {
            new: true, // החזרת האוביקט המעודכן
            runValidators: true // בדיקות תקינות של הסכמה של מונגו
        });

        if (!p) {
            return next({ status: 404, message: `product ${id} not found!` });
        }

        res.json(p);
    } catch (error) {
        next({ message: error.message });
    }
};

export const deleteProduct = async (req, res, next) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return next({ status: 404, message: `product ${id} not found!` });
    }

    try {
        const p = await Product.findByIdAndDelete(id);

        if (!p) { // לא ביצע מחיקה
            return next({ status: 404, message: `product ${id} not found!` });
        }

        // אם הגענו לפה - מחקנו אוביקט מהדטהבייס
        // במחיקה מחזירים סטטוס הצלחה ללא תוכן
        res.status(204).end();
    } catch (error) {
        next({ message: error.message });
    }
};
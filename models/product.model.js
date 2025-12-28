import { model, Schema } from "mongoose";

// 1. יצירת סכמה שהיא תבנית לאוביקט בודד בטבלה
const productSchema = new Schema({
    // _id - נוצר אוטומטית
    // רק אם לא כותבים במפורש

    // לכל שדה נגדיר את הטיפוס
    // בד"כ לא נשתמש בצורה זו
    // למעט בדיקות תקינות שדורשות גישה לדטהבייס
    // למשל ייחודי
    name: { type: String, unique: true },
    price: Number,
    img: String,
    categories: [String], // מערך מחרוזות
    owner: { // אוביקט שמכיל את כל השדות שצריכים של היוזר
        _id: Schema.Types.ObjectId,
        name: String,
        email: String,
    }
});

// 2. מודל מגדיר את האוסף
// המערך שכל איבר בו הוא מסוג productSchema
// SQL table - MongoDB collection
// מקבל שם לאוסף ביחיד בPascalCase והופך לרבים
const Product = model('Product', productSchema);

// 3. ייצוא של המודל כדי שנוכל לבצע שאילתות עליו
export default Product;

// JOI schema - req.body
// יתרונות
// 1. מכיל הרבה יותר פונקציות
// 2. יותר קרוב ללקוח - מתבצע לפני הגישה לדטהבייס
// וגישה לדטהבייס היא פעולה כבדה
// 3. לא תמיד ניתן להשתמש בבדיקות של מונגו
// למשל אם האוביקט לא מתווסף עכשיו לדטהבייס כמו בלוגין

// הגדרות עבור מוצר שנשלח מהקליינט

// הוספת/עדכון מוצר

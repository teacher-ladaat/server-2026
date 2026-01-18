import Joi from 'joi';
import { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

// אוסף משתמשים בדטהבייס
const userSchema = new Schema({
    username: String,
    email: { type: String, unique: true },
    password: String,
    phone: String
});

// פונקציה שמתבצעת לפני שמירה ב-DB
//ניתן לשלוח מערך של פעולות על ה-DB
// חובה להגדיר את הפונקציה כך ולא כפונקצית חץ
//כי יש שימוש ב-this
// וזיס מתנהג בצורה שונה בפונקצית חץ
userSchema.pre('save', function () {
    // this - מקבל את האוביקט שהולך להישמר עכשיו בדטהבייס

    // TODO: הערות 
    //הסולט צריך להגיע ממשתני סביבה
    //צריך לבדוק האם שינינו את הסיסמא

    const salt = bcrypt.genSaltSync(12);
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;

    // כשמסיים את הפונקציה הסיסמא המוצפנת נשמרת אוטומטית
});

export default model('User', userSchema);

export const validateUser = {
    // user login (email, password)
    login: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    }),
    // user register (username, email, password, repeat_password, phone)
    register: Joi.object({
        username: Joi.string().alphanum().trim().min(5).required(), // .trim() חיתוך רווחים
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        repeat_password: Joi.ref('password'),
        phone: Joi.string().pattern(/^0?(([23489]{1}[0-9]{7})|[57]{1}[0-9]{8})+$/).required(),
    })
    // user update password (old_password, password, repeat_password)
};

// סיסמאות באתר
//1. סיסמא חזקה
// 2. נשמור סיסמא מוצפנת

// הצפנה - HASH
// one-way
// סיסמא לסיסמא מוצפנת

//קידוד
// tow-way
// סיסמא לסיסמא מקודדת
// מסיסמא מקודדת לסיסמא רגילה
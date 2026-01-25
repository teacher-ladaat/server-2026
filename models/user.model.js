import Joi from 'joi';
import { model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// אוסף משתמשים בדטהבייס
const userSchema = new Schema({
    username: String,
    email: { type: String, unique: true },
    password: String,
    phone: String,
    // TODO: in `joi` schema
    role: { type:String, enums: ['admin', 'user'], required: true, default: 'user' }
});

// פונקציה שמתבצעת לפני שמירה ב-DB
//ניתן לשלוח מערך של פעולות על ה-DB
// חובה להגדיר את הפונקציה כך ולא כפונקצית חץ
//כי יש שימוש ב-this
// וזיס מתנהג בצורה שונה בפונקצית חץ
userSchema.pre('save', function () {
    // this - מקבל את האוביקט שהולך להישמר עכשיו בדטהבייס

    // TODO 
    //הסולט צריך להגיע ממשתני סביבה
    //צריך לבדוק האם שינינו את הסיסמא

    const salt = bcrypt.genSaltSync(12);
    // מומלץ להשתמש באסינכרוני
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;

    // כשמסיים את הפונקציה הסיסמא המוצפנת נשמרת אוטומטית
});

// method - אוביקט בודד באוסף
//static - כל האוסף/המחלקה
userSchema.method('comparePasswords', function (newPassword) {
    // this - משתמש נוכחי שנשווה אליו את הסיסמא שהתקבלה
    // this.password - סיסמא מוצפנת מהדטהבייס

    // compareSync - משווה סיסמא מוצפנת ללא מוצפנת
    // מומלץ להשתמש באסינכרוני
    const isEqual = bcrypt.compareSync(newPassword, this.password);

    return isEqual;
});

// עבור כל הפונקציות שמחזירות את היוזר לקליינט
userSchema.set('toJSON', {
    virtuals: true,
    transform(doc, converted) {
        delete converted.__v;
        delete converted._id;
        delete converted.password;
        // converted.password = '****';
    }
});

export default model('User', userSchema);

export const generateToken = ({ user_id, role }) => {
    const userPayload = { user_id, role };
    const secretKey = process.env.JWT_SECRET ?? 'secretKey123';
    const token = jwt.sign(userPayload, secretKey, { expiresIn: '1h' });
    return token;
};

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

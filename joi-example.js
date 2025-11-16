import Joi from 'joi';

// 1. object מגדירה אוביקט עם התכונות שנרצה שיהיו בו
const schema = Joi.object({
    username: Joi.string() // טיפוס שלו - מחרוזת
        .alphanum() // אותיות ומספרים
        .min(3) // אורך מינימלי 3
        .max(30) // אורך מקסימלי 30
        .required(), // שדה חובה

    password: Joi.string() // מחרוזת
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')), // ביטוי רגולרי - חיפוש משוכלל במחרוזות

    repeat_password: Joi.ref('password'), // אימות סיסמא משווה לשדה הקודם

    phone: Joi.string()
        .pattern(new RegExp('^0?(([23489]{1}[0-9]{7})|[57]{1}[0-9]{8})+$')), // מספר טלפון ישראלי

    access_token: [ // מערך - אחד מבין הטיפוסים שבמערך
        Joi.string(),
        Joi.number()
    ],

    birth_year: Joi.number() // מספר
        .integer() // שלם
        .min(1900) // ערך מינימלי
        .max(2013), // ערך מקסימלי

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }) // אימייל חוקי לפי תנאים
})
    .with('username', 'birth_year')
    .xor('password', 'access_token')
    .with('password', 'repeat_password');


//  2. שימוש בסכמה

// בצורה סינכרונית
schema.validate({ username: 'abc', birth_year: 1994 });
// -> { value: { username: 'abc', birth_year: 1994 } }

schema.validate({});
// -> { value: {}, error: '"username" is required' }

// Also -
// בצורה אסינכרונית
// גישה לשרת אחר
// גישה לדטהבייס
// גישה לקובץ בפרויקט שלי
try {
    const value = await schema.validateAsync({ username: 'abc', birth_year: 1994 });
}
catch (err) { }

// 1. ייבוא
import mongoose from 'mongoose';

// 2. התחברות למסד נתונים טסט בשרת מקומי
// mongoose.connect('mongodb://127.0.0.1:27017/test');

// מתחבר לדטהבייס באטלס/בענן
// אם לא קיים דטהבייס יוצר חדש
const DB_URI = `mongodb+srv://teacher:teacher@mycluster.prcppnv.mongodb.net/zoo`;
const p = mongoose.connect(DB_URI); // חזר פרומיס
// בהמשך יחזור ערך

// 1. then/catch
/*
p
    .then(data => console.log('mongo connected successfuly'))
    .catch(err => console.log('ERROR:', err.message));
*/

// 2. async-await
// פונקציה אסינכרונית
// לא חובה לעטוף בפונקציה אסינכרונית כי נמצאים בתחביר המודולים של ES6
// ;(async function connectDB() {
try {
    await p;
    // מגיע לשורה 2 רק אחרי שהתליח להתחבר למונגו
    console.log('mongo connected successfuly')
} catch (error) {
    // מגיע לכאן רק אם לא הצליח להתחבר למונגו
    console.log('ERROR:', error.message);
}
// })();

// פעולות גישה לדטהבייס יהיו אסינכרוניות
// connectDB();

// 2. schema+model
// סכמה היא תבנית של כל האוביקטים בטבלת חתולים
const kittySchema = new mongoose.Schema({
  name: String
});

// model - האוסף כולו
const Kitten = mongoose.model('Kitten', kittySchema);

// הוספת איברים לאוסף
const cat1 = new Kitten({ name: 'קיטי' });
// console.log(cat1.name); // 'Silence'

await cat1.save();
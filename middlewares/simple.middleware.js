// במידלוואר כזה בד"כ נבצע לוגינג של המערכת
// הדפסה לקובץ עם כל השגיאות
export const printHello = (req, res, next) => {
    console.log('request type: ', req.method, 'url: ', req.url);

    // בלי פרמטרים
    // שליחה למידלוואר הבא
    next();
};

export const addRequestDate = (req, res, next) => {
    // כאן הוספנו תכונה של התאריך הנוכחי לאוביקט הבקשה
    req.currentDate = new Date();

    // כל שאר הבקשות שיהיו אחרי המידלוואר יקבלו את האוביקט החדש של הבקשה
    // currentDate שיש לו
    next();
};
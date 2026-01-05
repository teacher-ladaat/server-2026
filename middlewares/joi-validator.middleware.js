/**
 * middleware creator
 * @param {*} schema joi validation schema
 * @returns 
 */
export const joiValidator = (schema) => {
    // מחזיר מידלוואר
    // const joiMid = (req, res, next) => {
    return (req, res, next) => {
        const { value, error, warning } = schema.validate(req.body);
        // value - ערך אחרי בדיקת תקינות/המרה, אם לא חוקי מוחזר אוביקט ריק
        // error - תיאור השגיאה כמחרוזת
        // warning? - אזהרות אם הגדרנו

        if (error) {
            return next({ status: 409, message: error });
        }

        // הולך למידלוואר של השגיאות
        // next(value);

        req.body = value; // שינינו את באדי
        // להיות הערך אחרי בדיקת תקינות והמרות

        return next();
    };

    // return joiMid;
}
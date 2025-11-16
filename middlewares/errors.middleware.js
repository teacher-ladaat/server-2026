/**
 * error handling middleware
 * @param {{ status?: number, message?: string }} err error data
 * @param {import("express").Request} req request data
 * @param {import("express").Response} res response data
 * @param {import("express").NextFunction} next function to move to the next middleware
 */
export const errorHandler = (err, req, res, next) => {
    // err - מקבל אוטומטית את כל פרטי השגיאה
    // next מהפרמטר שנשלח ב

    // ערכים דיפולטיביים אם לא קיבלתי ערך
    const stat = err.status ?? 500;
    const { message = 'Server Error!' } = err;
    // const message = err.message ?? 'Server Error!'

    // תמיד רוצים להחזיר שגיאה מהתבנית הבאה
    // 1. סטטוס של שגיאה
    // 2. אוביקט
    // 3. message שמכיל error אם יש שגיאה - באוביקט יהיה השדה

    res.status(stat).json({ error: { message: message, fixMe: 'http://localhost:5000/index.html' } });

    // next - אין צורך כי מחזירים תגובה בוודאות ללקוח
};

/**
 * url not founds
 * @param {import("express").Request} req request data
 * @param {import("express").Response} res response data
 * @param {import("express").NextFunction} next function to move to the next middleware
 */
export const urlNotFound = (req, res, next) => {
    // errorHandler שולח ל
    // כי שלחנו אוביקט - לכן הולך למידלוואר של השגיאות 
    next({ status: 404, message: `url ${req.url} method: ${req.method} not found!` });
};
import jwt from 'jsonwebtoken';

// Authentication - אימות, האם יש טוקן
// Authorization - האם יש הרשאה

// האם הוא נכנס למערכת - לא משנה מה ההרשאה
export const auth = (req, res, next) => {
    try {
        const { authorization = '' } = req.headers;

        // Bearer נניח שיש לנו טוקן מסוג
        const [, token] = authorization.split(' ');

        // verify - בודק אם הטוקן תקין
        const secretKey = process.env.JWT_SECRET ?? 'secretKey123';
        const data = jwt.verify(token, secretKey);

        // אם טוקן חוקי
        console.log(data); // הנתונים של ההרשאות - תפקיד וקוד משתמש
        // next(data); // error middleware

        req.currentUser = data; // כך מעבירים מידע בין מידלווארים
        next();
    } catch (error) {
        // אין טוקן/טוקן לא חוקי
        // 403 (forbidden) - אסור, ללא טוקן
        // אסור לפרט מהי השגיאה - לא מאובטח
        next({ status: 403, message: `Authentication failed` })
    }
};

// האם הוא מנהל
export const isAdmin = (req, res, next) => {
    console.log(req.currentUser);

    if (req.currentUser.role === "admin") {
        return next();
    }
    return next({ status: 401, message: `Authorization failed (no permissions)` });
};

// האם הוא משתמש
// middleware creator

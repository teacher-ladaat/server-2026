// middleware creator - פונקציה שיוצרת מידלוואר ומחזירה אותו
// נשתמש בה כאשר צריכים לשלוח פרמטרים למידלוואר

// ניצור פונקציה שחוסמת את האתר בימים שנשלחו
export function blockDays(days = []) { // days=[1, 7]
    // פונקציית מידלוואר
    /**
     * middleware block server on some days
     * @param {import("express").Request} req request data
     * @param {import("express").Response} res response data
     * @param {import("express").NextFunction} next function to move to the next middleware
     */
    const blockMiddleware = (req, res, next) => {
        // נשנה את הערכים במערך שיהיו החל מאינדקס 0
        // היום בשבוע מתחיל מאפס JS כי בתאריך של
        days = days.map(d => d - 1); // [0, 6]

        const now = new Date();

        // אם התנאי מתקיים עוצר ומחזיר שגיאה
        if (days.includes(now.getDay())) { // האם היום הנוכחי נמצא במערך הימים
            return res.status(500).json({ message: `not working on ${now.getDay() + 1}!!!!!!!!!!` });
        }

        // אם לא יום חסום
        next();
    };

    return blockMiddleware;
}
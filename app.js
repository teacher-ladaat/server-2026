// 1. ייבוא הספריה built-in module
import http from 'http';

// 2. יצירת שרת - createServer
// מגיע לכאן בכל בקשה
const server = http.createServer((req, res) => {
    // req(uset) - בקשה מהלקוח
    // res(ponse) - תגובה ללקוח מהשרת
    
    // switch (req.method)
    // case 'POST': db.add(ppp)
    // case 'GET': return db

    // end - מחזיר ומסיים את הקשר
    res.end(`hello server - method: ${req.method}, url: ${req.url}`);
});

// איפה השרת ירוץ
// על המחשב המקומי - http://localhost
// PORT - באיזה כתובת במחשב
const port = 3000;

// 3. הרצת השרת
server.listen(port, () => {
    console.log(`server listening at: http://localhost:${port}`);
});
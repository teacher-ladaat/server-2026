import path from 'path';
import multer from "multer";

// הגדרות פשוטות
// export const upload = multer({ dest: 'public/' });

// הגדרות מורכבות

// איפה לאחסון את הקבצים ובאיזה שם
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/')
  },
  filename: function (req, file, cb) {
    // req - בקשה
    // file - נתוני הקובץ
    // cb - לשלוח אותו הלאה, למידלוואר הבא

    // סיומת של הקובץ
    const fileExtension = path.extname(file.originalname);

    cb(null, `product${Date.now()}${fileExtension}`);
  }
})

export const upload = multer({ storage: storage });
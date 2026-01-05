import { Router } from "express";
import { addProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controllers/product.controller.js";
import { blockDays } from "../middlewares/blockDays.middleware.js";
import { upload } from "../middlewares/upload-files.middlware.js";

// הראוטר יכיל את כל הניתובים ששייכים למשאב מסוים
// resource - משאב
// URL - מושפע משם המשאב בד"כ ברבים
// http://localhost:3000/products
const router = Router();

// 2. הוספת מידלוואר לראוט אחד
// router.use(blockDays([6]));

// method: GET בקשת
// url: http://localhost:3000/products?page=2&limit=5&name=nnn
router.get('/', getAllProducts);

// method: GET בקשת
// url: http://localhost:3000/products/111
router.get('/:id', getProductById);

// method: POST בקשת
// url: http://localhost:3000/products
router.post('/', upload.single('img'), addProduct);

router.put('/:id', updateProduct);

router.delete('/:id', deleteProduct);

export default router;
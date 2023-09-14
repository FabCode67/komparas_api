import { Router } from "express";
import { addProductImage } from "../../controllers/products/productImages";
import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({ storage });

const router: Router = Router();

router.post('/product-images/:product_id', upload.single('product_image'), addProductImage);

export default router;

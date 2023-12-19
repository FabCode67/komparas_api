import { Router } from "express";
import { addProductImage } from "../../controllers/products/productImages";
import { authenticat, isAdminAuthenticat } from "../../middleware/auth/authorization";
import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({ storage });

const router: Router = Router();

router.post('/product_images/:product_id', isAdminAuthenticat, upload.single('product_image'), addProductImage);

export default router;

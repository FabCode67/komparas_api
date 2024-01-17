import { Router } from "express";

import { addNativeProduct, deleteNativeProduct, getNativeProductById, getNativeProducts, updateNativeProduct } from "../../controllers/products/nativeProductsCrud";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router: Router = Router();

router.post("/native/products/add", upload.single('image'), addNativeProduct);
router.get("/native/products", getNativeProducts);
router.get("/native/products/:productId", getNativeProductById);
router.delete("/native/products/:productId", deleteNativeProduct);
router.put("/native/products/:productId", upload.single('image'), updateNativeProduct);

export default router;

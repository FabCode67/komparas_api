import { Router } from "express";

import { addNativeProduct } from "../../controllers/products/nativeProductsCrud";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router: Router = Router();

router.post("/native/products/add", upload.single('image'), addNativeProduct);

export default router;

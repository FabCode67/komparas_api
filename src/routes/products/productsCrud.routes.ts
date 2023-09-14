import { Router } from "express";

import { 
    getProducts, 
    addProduct,
    deleteProduct,
    updateProduct,
    getProductById,
    getProductsWithImages
} from "../../controllers/products/productCrud";
import { authenticat, isAdminAuthenticat } from "../../middleware/auth/authorization";
import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({ storage });

const router : Router = Router()

router.get("/products", getProducts)
router.get("/products/images", getProductsWithImages)
router.get("/products/:productId", getProductById)
router.post("/products",upload.single('product_image'), addProduct)
router.delete("/products/:productId",isAdminAuthenticat, deleteProduct)
router.put("/products/:productId", isAdminAuthenticat, updateProduct)


export default router
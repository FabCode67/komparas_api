import { Router } from "express";

import { 
    getProducts, 
    addProduct,
    deleteProduct,
    updateProduct,
    getProductById
} from "../../controllers/products/productCrud";
import { authenticat, isAdminAuthenticat } from "../../middleware/auth/authorization";

const router : Router = Router()

router.get("/products", getProducts)
router.get("/products/:productId", getProductById)
router.post("/products", isAdminAuthenticat, addProduct)
router.delete("/products/:productId",isAdminAuthenticat, deleteProduct)
router.put("/products/:productId", isAdminAuthenticat, updateProduct)

export default router
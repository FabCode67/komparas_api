import { Router } from "express";

import { getProducts, addProduct } from "../../controllers/products/productCrud";
import { authenticat, isAdminAuthenticat } from "../../middleware/auth/authorization";

const router : Router = Router()

router.get("/products", getProducts)
router.post("/products", addProduct)

export default router
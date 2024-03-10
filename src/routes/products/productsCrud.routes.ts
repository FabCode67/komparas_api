import { Router } from "express";

import { 
    getProducts, 
    addProduct,
    deleteProduct,
    getProductById,
    getProductsWithImages,
    getProductsByCategory,
    getSingleProductWithImages,
    updateProduct,
    removeProductSpecification,
    getAllProductsWithCategoryName,
    getProductsByVendor
} from "../../controllers/products/productCrud";
import { authenticat, isAdminAuthenticat } from "../../middleware/auth/authorization";
import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({ storage });

const router : Router = Router()

router.get("/products", getProducts)
router.get("/products/category", getAllProductsWithCategoryName)
router.get("/products/images", getProductsWithImages)
router.get("/products/images/:productId", getSingleProductWithImages)
router.get("/products/:productId", getProductById)
router.post("/products/add",upload.single('product_image'), addProduct)
router.put("/products/:productId",upload.single('product_image'),isAdminAuthenticat, updateProduct)
router.delete("/products/:productId", deleteProduct)
router.get('/products/:category_id', getProductsByCategory);
router.get('/products/category/:category_name', getProductsByCategory);
router.delete('/products/:productId/specifications/:specificationId', removeProductSpecification);
router.get('/products/vendor/:vendorId', getProductsByVendor);

export default router
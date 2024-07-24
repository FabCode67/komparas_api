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
    getProductsByVendor,
    getSingleProductById,
    addShopToProduct,
    updateShopInProduct,
    removeShopFromProduct,
    getSingleShopOnProduct,
    getAllShopsOnProduct,
} from "../../controllers/products/productCrud";
import { authenticat, isAdminAuthenticat } from "../../middleware/auth/authorization";
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage });
const router : Router = Router()
router.get("/products", getProducts)
router.post("/products/:productId/add-shop", addShopToProduct)
router.get("/products/category", getAllProductsWithCategoryName)
router.get("/products/images", getProductsWithImages)
router.get("/products/images/:productId", getSingleProductWithImages)
router.get("/products/prod", getProductById)
router.get("/products/:productId", getSingleProductById)
router.post("/products/add",upload.single('product_image'), addProduct)
router.put("/products/:productId",upload.single('product_image'), updateProduct)
router.delete("/products/:productId", deleteProduct)
router.get('/products/:category_id', getProductsByCategory);
router.get('/products/category/:category_name', getProductsByCategory);
router.delete('/products/:productId/specifications/:specificationId', removeProductSpecification);
router.get('/products/vendor/:vendorId', getProductsByVendor);
router.put('/products/:productId/vendors/:vendorId', updateShopInProduct);
router.delete('/products/:productId/vendors/:vendorId', removeShopFromProduct);
router.get('/products/:productId/shops/:vendorId', getSingleShopOnProduct);
router.get('/products/:productId/shops', getAllShopsOnProduct);

export default router
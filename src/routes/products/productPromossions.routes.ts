import { Router } from "express";
import { addProductPromossion, upadateProductPromossion, deleteProductImage } from "../../controllers/products/productPromossions";
import { authenticat, isAdminAuthenticat } from "../../middleware/auth/authorization";

const router: Router = Router();

router.post('/product_promossion/:product_id', addProductPromossion);
router.put('/product_promossion/:product_id/:promossion_id', upadateProductPromossion);
router.delete('/product_promossion/:product_id/:promossion_id', deleteProductImage);

export default router;

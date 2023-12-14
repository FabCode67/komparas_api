import express from 'express';
import { getAllShops, getShopById, addShop, updateShop, deleteShop } from '../../controllers/shop/shop';
import { isAdminAuthenticat } from '../../middleware/auth/authorization';
const router = express.Router();

router.get('/shops', getAllShops);
router.get('/shops/:id', getShopById);
router.post('/shops/add', isAdminAuthenticat, addShop);
router.put('/shops/:id', isAdminAuthenticat, updateShop);
router.delete('/shops/:id', isAdminAuthenticat, deleteShop);

export default router;
import express from 'express';
import { getAllShops, getShopById, addShop, updateShop, deleteShop } from '../../controllers/shop/shop';

const router = express.Router();

router.get('/shops', getAllShops);
router.get('/shops/:id', getShopById);
router.post('/shops', addShop);
router.put('/shops/:id', updateShop);
router.delete('/shops/:id', deleteShop);

export default router;
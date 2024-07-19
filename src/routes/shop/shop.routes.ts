import express from 'express';
import { getAllShops, getShopById, addShop, updateShop, deleteShop } from '../../controllers/shop/shop';
import { isAdminAuthenticat } from '../../middleware/auth/authorization';
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.get('/shops', getAllShops);
router.get('/shops/:id', getShopById);
router.post('/shops/add',upload.single('image'), addShop);
router.put('/shops/:id',upload.single('image'), updateShop);
router.delete('/shops/:id', deleteShop);

export default router;
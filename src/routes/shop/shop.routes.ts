import express from 'express';
import { getAllShops, getShopById, addShop, updateShop, deleteShop } from '../../controllers/shop/shop';
import multer from "multer";
import { addKomparasCode, getKomparasCodes } from '../../controllers/shop/komparasCode';
const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.get('/shops', getAllShops);
router.get('/shops/:id', getShopById);
router.post('/shops/add',upload.single('image'), addShop);
router.put('/shops/:id',upload.single('image'), updateShop);
router.delete('/shops/:id', deleteShop);
router.post('/komparas-codes/add', addKomparasCode);
router.get('/komparas-codes', getKomparasCodes);

export default router;
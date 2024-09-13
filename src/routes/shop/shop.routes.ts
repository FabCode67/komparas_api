import express from 'express';
import { getAllShops, getShopById, addShop, updateShop, deleteShop } from '../../controllers/shop/shop';
import multer from "multer";
import { addKomparasCode, getKomparasCodes, getKomparasCodeBykomparasCode, updateIsSoldConfirmToTrue, updateIsShopSoldConfirmToTrue, getLatestComparasCodeByfullName } from '../../controllers/shop/komparasCode';
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
router.get('/komparas-codes/:komparasCode', getKomparasCodeBykomparasCode);
router.put('/komparas-codes/:komparasCode', updateIsSoldConfirmToTrue);
router.put('/komparas-codes/shop-sold-confirm/:komparasCode', updateIsShopSoldConfirmToTrue);
router.get('/komparas-codes/latest/:fullName', getLatestComparasCodeByfullName);
export default router;
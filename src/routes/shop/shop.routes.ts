import express from 'express';
import { getAllShops, getShopById, addShop, updateShop, deleteShop, toggleShopAcceptance } from '../../controllers/shop/shop';
import multer from "multer";
import { addKomparasCode, getKomparasCodes, getKomparasCodeBykomparasCode, updateIsSoldConfirmToTrue, updateIsShopSoldConfirmToTrue, getLatestComparasCodeByfullName, getLatestComparasCodeByEmailOrPhoneNumber } from '../../controllers/shop/komparasCode';
import { authenticate } from '../../middleware/auth/authorization';
const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.get('/shops', authenticate, getAllShops);
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
router.put('/shops/toggle-acceptance/:id', toggleShopAcceptance);
router.get('/komparas-codes/latestemailOrPhone/:emailOrPhoneNumber', getLatestComparasCodeByEmailOrPhoneNumber);
export default router;
import { Router } from "express";
import { addDayPhone } from "../../controllers/offers/DayPhone";
import { authenticat, isAdminAuthenticat } from "../../middleware/auth/authorization";
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage });
const router: Router = Router();
router.post('/dayphone', upload.single('product_image'), addDayPhone);
export default router;

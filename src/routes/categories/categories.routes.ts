import { Router } from 'express';
import { isAdminAuthenticat } from '../../middleware/auth/authorization';

import { addCategory, getAllCategories, getParentCategories, deleteCategory, getCategoryByNameOrID, updateCategory } from '../../controllers/categories/category';
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage });
const router: Router = Router();

router.post("/category/add", upload.single('image'), addCategory);
router.get("/categories/all", getAllCategories);
router.get("/categories/parents", getParentCategories);
router.delete("/categories/:category_id", deleteCategory);
router.get("/categories/:category", getCategoryByNameOrID);
router.put("/categories/:category_id", upload.single('image'), updateCategory);

export default router;
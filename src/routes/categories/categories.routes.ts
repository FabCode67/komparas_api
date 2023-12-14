import { Router } from 'express';
import { isAdminAuthenticat } from '../../middleware/auth/authorization';

import { addCategory, getAllCategories, getParentCategories, deleteCategory, getCategoryByNameOrID } from '../../controllers/categories/category';
const router: Router = Router();

router.post("/category/add", isAdminAuthenticat, addCategory);
router.get("/categories/all", getAllCategories);
router.get("/categories/parents", getParentCategories);
router.delete("/categories/:category_id", deleteCategory);
router.get("/categories/:category", getCategoryByNameOrID);

export default router;
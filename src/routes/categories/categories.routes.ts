import { Router } from 'express';

import { addCategory, getAllCategories, getParentCategories } from '../../controllers/categories/category';
const router: Router = Router();

router.post("/category/add", addCategory);
router.get("/categories/all", getAllCategories);
router.get("/categories/parents", getParentCategories);
export default router;
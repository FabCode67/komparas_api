import { Router } from 'express';

import { addCategory, getAllCategories } from '../../controllers/categories/category';
const router: Router = Router();

router.post("/category/add", addCategory);
router.get("/categories/all", getAllCategories);
export default router;
import { Router } from 'express';

import {
    getCategories,
    addCategory,
    updateCategory,
    deleteCategory,
    getCategoryById,
    getCategoryByName,
    getCategoryWithProducts, 
    getAllCategoriesWithProducts
} from '../../controllers/categories/category.contorller';

import { authenticat, isAdminAuthenticat } from '../../middleware/auth/authorization';

const router: Router = Router();

router.get('/categories', getCategories);
router.post('/categories/add', authenticat, isAdminAuthenticat, addCategory);
router.put('/categories/update/:id', authenticat, isAdminAuthenticat, updateCategory);
router.delete('/categories/delete/:id', authenticat, isAdminAuthenticat, deleteCategory);
router.get('/categories/:id', getCategoryById);
router.get('/categories/name/:name', getCategoryByName);
router.get("/categories/:categoryId/products", getCategoryWithProducts);
router.get("/categories/products", getAllCategoriesWithProducts);

export default router;
import { Router } from "express";
import {
   getAllSubCategories,
   addSubCategory,
   updateSubCategory,
   deleteSubCategory,
   getSubCategoryById,
   getSubCategoryByName,
   getSubcategoryWithProducts,
   getSubcategoryWithCategory,
   getSubcategoryWithCategoryName

} from "../../controllers/categories/subcategory.controller";

import { authenticat, isAdminAuthenticat } from "../../middleware/auth/authorization";

const router: Router = Router()

router.get("/subcategories/all", getAllSubCategories)
router.post("/subcategories/add", authenticat, isAdminAuthenticat, addSubCategory)
router.put("/subcategories/update/:id", authenticat, isAdminAuthenticat, updateSubCategory)
router.delete("/subcategories/delete/:id", authenticat, isAdminAuthenticat, deleteSubCategory)
router.get("/subcategories/:id", getSubCategoryById)
router.get("/subcategories/name/:name", getSubCategoryByName)
router.get("/subcategories/:subcategoryId/products", getSubcategoryWithProducts)
router.get("/subcategories/:subcategoryId/category", getSubcategoryWithCategory)
router.get("/subcategories/:subcategoryId/category/name", getSubcategoryWithCategoryName)


export default router
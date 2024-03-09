import { Router } from "express";

import { addProductToComparison, getProductComparison, deleteProductFromComparison } from "../../controllers/comparision/ComparisionCurd";

const router: Router = Router();

router.post("/comparison", addProductToComparison);
router.get("/comparisons", getProductComparison);
router.delete("/comparison/:id", deleteProductFromComparison);

export default router;

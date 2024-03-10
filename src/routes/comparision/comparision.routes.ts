import { Router } from "express";

import { addProductToComparison, getProductComparison, deleteProductFromComparison, getProductComparisonByUser } from "../../controllers/comparision/ComparisionCurd";

const router: Router = Router();

router.post("/comparison", addProductToComparison);
router.get("/comparisons", getProductComparison);
router.delete("/comparison/:id", deleteProductFromComparison);
router.get("/comparison/:userId", getProductComparisonByUser);
// router.get("/comparison/info", getAllProsuctsInfoOnComparison);

export default router;

import { Router } from "express";
import { addCustomer, getCustomers, updateCustomer, deleteCustomer, getCustomer } from "../../controllers/customer/customerCrud";

const router: Router = Router();

router.post("/customer", addCustomer);
router.get("/customers", getCustomers);
router.put("/customer/:id", updateCustomer);
router.delete("/customer/:id", deleteCustomer);
router.get("/customer/:id", getCustomer);

export default router;

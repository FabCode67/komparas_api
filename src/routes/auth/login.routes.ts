import { Router } from "express";
import { login } from "../../controllers/auth/login";
import subscribeController from "../../controllers/subs/subs";
import { confirmationController } from "../../controllers/subs/subs";
import { getAllSubscribers } from "../../controllers/subs/subs";
import { forgotPassword } from "../../controllers/auth/forgotPassword";
import { resetPassword } from "../../controllers/auth/forgotPassword";


const router : Router = Router()

router.post("/login", login)
router.post("/subscribe", subscribeController)
router.put("/confirm", confirmationController)
router.get("/subscribers", getAllSubscribers)
router.post("/forgot/password", forgotPassword)
router.put("/reset/password", resetPassword)


export default router
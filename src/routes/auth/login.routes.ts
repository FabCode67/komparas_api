import { Router } from "express";
import { login } from "../../controllers/auth/login";
import subscribeController from "../../controllers/subs/subs";
import { confirmationController } from "../../controllers/subs/subs";
import { getAllSubscribers } from "../../controllers/subs/subs";

const router : Router = Router()

router.post("/login", login)
router.post("/subscribe", subscribeController)
router.put("/confirm", confirmationController)
router.get("/subscribers", getAllSubscribers)


export default router
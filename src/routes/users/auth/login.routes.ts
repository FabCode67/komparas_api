import { Router } from "express";
import { login } from "../../../controllers/auth/login";

const router : Router = Router()

router.post("/login", login)

export default router
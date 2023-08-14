import { Router } from "express";
import { getHello, addHello } from "../../controllers/hello";


const router : Router = Router()

router.get("/hello", getHello)
router.post("/hello", addHello)

export default router

// XPJagMPthuI0knW0
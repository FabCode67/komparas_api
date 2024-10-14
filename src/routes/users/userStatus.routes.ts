import { Router } from "express";

import { enableUser, disableUser } from "../../controllers/Users/userStatus.controller";
import { authenticate } from "../../middleware/auth/authorization";

const router : Router = Router()

router.put("/users/enable/:id",authenticate, enableUser)
router.put("/users/disable/:id",authenticate, disableUser)


export default router
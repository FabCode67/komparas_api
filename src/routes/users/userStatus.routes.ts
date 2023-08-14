import { Router } from "express";

import { enableUser, disableUser } from "../../controllers/Users/userStatus.controller";
import { authenticat, isAdminAuthenticat } from "../../middleware/auth/authorization";

const router : Router = Router()

router.put("/users/enable/:id",isAdminAuthenticat, enableUser)
router.put("/users/disable/:id",isAdminAuthenticat, disableUser)


export default router
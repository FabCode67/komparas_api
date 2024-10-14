import { Router } from "express";

import { changeUserRoleToAdmin, changeUserRoleToVendor, changeUserRoleToBuyer } from "../../controllers/Users/usersRole.controller";
import { authenticate } from "../../middleware/auth/authorization";

const router : Router = Router()

router.put("/users/change/admin/:id",authenticate, changeUserRoleToAdmin)
router.put("/users/change/vendor/:id",authenticate, changeUserRoleToVendor)
router.put("/users/change/buyer/:id",authenticate, changeUserRoleToBuyer)

export default router
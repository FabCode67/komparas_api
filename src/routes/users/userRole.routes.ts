import { Router } from "express";

import { changeUserRoleToAdmin, changeUserRoleToVendor, changeUserRoleToBuyer } from "../../controllers/Users/usersRole.controller";
import { authenticat, isAdminAuthenticat } from "../../middleware/auth/authorization";

const router : Router = Router()

router.put("/users/change/admin/:id",isAdminAuthenticat, changeUserRoleToAdmin)
router.put("/users/change/vendor/:id",isAdminAuthenticat, changeUserRoleToVendor)
router.put("/users/change/buyer/:id",isAdminAuthenticat, changeUserRoleToBuyer)

export default router
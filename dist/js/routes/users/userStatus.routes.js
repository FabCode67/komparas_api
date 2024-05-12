"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userStatus_controller_1 = require("../../controllers/Users/userStatus.controller");
const authorization_1 = require("../../middleware/auth/authorization");
const router = (0, express_1.Router)();
router.put("/users/enable/:id", authorization_1.isAdminAuthenticat, userStatus_controller_1.enableUser);
router.put("/users/disable/:id", authorization_1.isAdminAuthenticat, userStatus_controller_1.disableUser);
exports.default = router;

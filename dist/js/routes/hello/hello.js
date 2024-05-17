"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const hello_1 = require("../../controllers/hello");
const router = (0, express_1.Router)();
router.get("/hello", hello_1.getHello);
router.post("/hello", hello_1.addHello);
exports.default = router;
// XPJagMPthuI0knW0

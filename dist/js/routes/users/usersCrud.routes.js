"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userCrud_controler_1 = require("../../controllers/Users/userCrud.controler");
const contact_1 = require("../../controllers/Users/contact");
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
const router = (0, express_1.Router)();
router.get("/users", userCrud_controler_1.getUsers);
router.post("/users/add", upload.single('profile_picture'), userCrud_controler_1.addUser);
router.put("/users/update/:id", userCrud_controler_1.updateUser);
router.delete("/users/delete/:id", userCrud_controler_1.deleteUser);
router.get("/users/:id", userCrud_controler_1.getUserById);
router.get("/users/email/:email", userCrud_controler_1.getUserByEmail);
router.post("/users/contact", contact_1.sendMessage);
router.get("/messages", contact_1.getMessages);
router.delete("/messages/:id", contact_1.deleteMessage);
exports.default = router;
// XPJagMPthuI0knW0

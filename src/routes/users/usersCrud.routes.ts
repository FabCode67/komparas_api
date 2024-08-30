import { Router } from "express";

import { 
    getUsers, 
    getUserById, 
    getUserByEmail, 
    addUser, 
    updateUser, 
    deleteUser
 } from "../../controllers/Users/userCrud.controler";
 import { sendMessage, getMessages, deleteMessage } from "../../controllers/Users/contact";
 import { authenticat, isAdminAuthenticat } from "../../middleware/auth/authorization";
 import multer from "multer";

 const storage = multer.memoryStorage();
 
 const upload = multer({ storage });
 
 const router : Router = Router()

router.get("/users", getUsers)
router.post("/users/add", upload.single('profile_picture'), addUser);
router.put("/users/update/:id", updateUser)
router.delete("/users/delete/:id", deleteUser)
router.get("/users/:id", getUserById)
router.get("/users/email/:email", getUserByEmail)
router.post("/users/contact", sendMessage)
router.get("/messages", getMessages)
router.delete("/messages/:id", deleteMessage)

export default router


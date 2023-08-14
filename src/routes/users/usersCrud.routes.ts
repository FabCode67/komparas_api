import { Router } from "express";

import { 
    getUsers, 
    getUserById, 
    getUserByEmail, 
    addUser, 
    updateUser, 
    deleteUser
 } from "../../controllers/Users/userCrud.controler";
 import { authenticat, isAdminAuthenticat } from "../../middleware/auth/authorization";

const router : Router = Router()

router.get("/users",isAdminAuthenticat, getUsers)
router.post("/users/add", addUser)
router.put("/users/update/:id", updateUser)
router.delete("/users/delete/:id", authenticat, deleteUser)
router.get("/users/:id", getUserById)
router.get("/users/email/:email", getUserByEmail)

export default router

// XPJagMPthuI0knW0

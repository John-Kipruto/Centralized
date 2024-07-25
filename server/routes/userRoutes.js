import express from "express";

/** User controller functions */
import { 
    registerUser,
    updateUser,
    deleteUser,
    getOne,
    getAll
 } from "../controllers/userController.js";

 import protect from "../middlewares/authMiddleware.js";

 const router = express.Router()

 router.route('/:id').get(protect, getOne).put(updateUser).patch(updateUser).delete(protect, deleteUser)
 router.route('/').get(getAll).post(registerUser)

 export default router


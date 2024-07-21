import express from "express";

/** User controller functions */
import { 
    registerUser,
    authenticateUser,
    loginUser,
    logoutUser,
    updateUser,
    deleteUser,
    getOne,
    getAll
 } from "../controllers/userController.js";

 import protect from "../middlewares/authMiddleware.js";

 const router = express.Router()

 router.get('/auth', protect, authenticateUser)
 router.post('/login', loginUser)
 router.delete('/logout', protect, logoutUser)
 router.route('/:id').get(protect, getOne).put(updateUser).patch(updateUser).delete(protect, deleteUser)
 router.route('/').get(getAll).post(registerUser)

 export default router


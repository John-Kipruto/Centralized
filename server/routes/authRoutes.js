import express from "express";

import { 
    authenticateUser, 
    loginUser, 
    logoutUser
 } from "../controllers/authController.js";

import protect from "../middlewares/authMiddleware.js";

const router =  express.Router()

router.get('/', protect, authenticateUser)
router.post('/login', loginUser)
router.delete('/logout', protect, logoutUser)

export default router
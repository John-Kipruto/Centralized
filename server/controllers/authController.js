import asyncHandler from "express-async-handler"
import bcrypt from "bcryptjs"
import generateToken from "../utils/generateToken.js"

import User from "../models/user.js"

/**
 * @desc Authenticate user
 * GET api/auth
 * @access Private
 */
const authenticateUser = asyncHandler(async (req, res) => {
    res.json(req.user)
})


/**
 * @desc Login a user
 * POST api/auth/login
 * @access Public
 */
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body
    /**Check if user exists in the db */
    const user = await User.findOne({where: {email}})

    /** Check if passwords match */
    const passwordsMatch = await bcrypt.compare(password, user.password)
    
    if(user && passwordsMatch){
        generateToken(res, user.id)
        res.json(user)
    } else{
        res.status(400)
        throw new Error("Invalid email or password")
    }
})



/**
 * @desc Logout a user
 * DELETE api/auth/logout
 * @access Public
 */
const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expiresIn: new Date(0)
    })
    res.status(200).json({
        message: "User logged out!"
    })
})

export {
    authenticateUser,
    loginUser,
    logoutUser
}
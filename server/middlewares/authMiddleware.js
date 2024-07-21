import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import asyncHandler from 'express-async-handler'

const protect = asyncHandler(async (req, res, next) => {
    let token = req.cookies.jwt

    /** Check if token is present in cookie */
    if(token){

        /**Verify the token */
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findByPk(decoded.userId)
        if(user){
            req.user = user
            next()
        } else{
            res.status(400)
            throw new Error("Invalid token")
        }
    } else{
        res.status(401)
        throw new Error("Not authorized, no token")
    }
})

export default protect
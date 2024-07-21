/**Node imports */
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import generateToken from '../utils/generateToken.js'
import * as fs from 'fs'

/** App imports */
import User from "../models/user.js"



/**
 * @desc Get all users
 * GET api/users
 * @access Public
 */
const getAll = asyncHandler(async (req, res) => {
    const users = await User.findAll()
    res.status(200).json(users)
})


/**
 * @desc Get a single user
 * GET api/users/:id
 * @access Public
 */
const getOne = asyncHandler(async (req, res) => {
    const user = await User.findByPk(req.params.id)
    res.status(200).json(user)
})


/**
 * @desc Register a new user
 * POST api/users
 * @access Public
 */
const registerUser = asyncHandler(async (req, res) => {
    console.log(req.body)
    console.log("Creating....")
    let {name, email, password, image} = req.body
    let defaultImage;

    if(image === ""){
        defaultImage = fs.readFileSync('./images/person-placeholder.png')
        console.log(defaultImage)
    }

    if(req.files){
        if(req.files.image){
            defaultImage = req.files.image.data
            console.log("File")
        }
        
    }
    

    /** Check if user email is registered in the database */
    const userExists = await User.findOne({where : {email}})
    if(userExists){
        res.status(400)
        throw new Error("User exists in the database")
    }

    /** Hash the user password */
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        image: defaultImage
    })

    if(user){
        generateToken(res, user.id)
        res.status(201).json(user)
    }

    
})


/**
 * @desc Authenticate user
 * GET api/users/auth
 * @access Private
 */
const authenticateUser = asyncHandler(async (req, res) => {
    res.json(req.user)
})


/**
 * @desc Login a user
 * POST api/users/login
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
 * DELETE api/users/logout
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


/**
 * @desc Update user details
 * PUT  api/users/:id
 * PATCH  api/users/:id
 * @access Private
 */
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findByPk(req.params.id)
    
    if(req.files){
        await user.update({...req.body, image: req.files.image.data })
    } else{
        await user.update({...req.body})
        console.log("Updated user")
    }

    await user.save()
    res.status(201).json(user)

})


/**
 * @desc  Delete user
 * DELETE api/users/:id
 * @access Private
 */
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findByPk(req.params.id)
    await user.destroy()
    res.json({
        message: `User with id: ${req.params.id} deleted successfully!`
    })
})


export {
    registerUser,
    authenticateUser,
    loginUser,
    logoutUser,
    updateUser,
    deleteUser,
    getAll,
    getOne
}
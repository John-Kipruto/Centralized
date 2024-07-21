import User from "../models/user.js"
import bcrypt from "bcryptjs"
import * as fs from 'fs'

async function seedData(){

   /** Hash users passswords */
    const salt = await bcrypt.genSalt(10)
    const adminPassword = await bcrypt.hash("admin", salt)
    const userTest = await bcrypt.hash("userTest", salt)

    const bearded = fs.readFileSync('./images/bearded.jpg')

    /** Seed users to the database */
    console.log("Seeding users to the database...")
    const jane = await User.create({name: "Jane Doe", email: "janedoe@gmail.com", password: userTest, image: bearded})
    await User.create({name: "mike Doe", email: "mikedoe@gmail.com", password: userTest, image: bearded})
    await User.create({name: "alice Doe", email: "alicedoe@gmail.com", password: userTest, image: bearded})
    await User.create({name: "centralized admin", email: "admin@gmail.com", password: adminPassword, image: bearded})

    /** Verify all data is put in the database */
    console.log(".... done seeding.")

    /** Verify all users are in the db */
    console.log("Users in the db include: ")
    console.log(await User.findAll())
    console.log(bearded)
    console.log(jane)


}

export default seedData
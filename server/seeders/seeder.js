import User from "../models/user.js"
import bcrypt from "bcryptjs"
import * as fs from 'fs'

async function seedData(){

   /** Hash users passswords */
    const salt = await bcrypt.genSalt(10)
    const adminPassword = await bcrypt.hash("admin", salt)
    const test = await bcrypt.hash("test123", salt)

    const bearded = fs.readFileSync('./images/bearded.jpg')
    const behance = fs.readFileSync('./images/behance.jpg')
    const bridge = fs.readFileSync('./images/bridge.jpg')
    const classic = fs.readFileSync('./images/classic.jpg')
    const cool = fs.readFileSync('./images/cool.jpg')
    const happy = fs.readFileSync('./images/happy.jpg')
    const labrinth = fs.readFileSync('./images/labrinth.jpg')
    const ladyavatar = fs.readFileSync('./images/lady-avatar.jpg')
    const leafy = fs.readFileSync('./images/leafy.jpg')
    const manavatar = fs.readFileSync('./images/man-avatar.jpg')
    const methode = fs.readFileSync('./images/methode.jpg')
    const red = fs.readFileSync('./images/red.webp')
    const shy = fs.readFileSync('./images/shy.jpg')
    const smirk = fs.readFileSync('./images/smirk.jpg')
    const stunned = fs.readFileSync('./images/stunned.jpeg')
    const sunny = fs.readFileSync('./images/sunny.webp')
    const thoughtful = fs.readFileSync('./images/thoughtful.webp')
    const smilingoldman = fs.readFileSync('./images/smiling-old-man.jpg')
    const happy2 = fs.readFileSync('./images/happy.jpg')
    const shy2 = fs.readFileSync('./images/shy.jpg')

    /** Seed users to the database */
    console.log("Seeding users to the database...")
    
    await User.create({name: "beyonce knowless", email: "beyonce@gmail.com", phoneNumber: "+254756456789", password: test, image: happy})
    await User.create({name: "khalif mainoo", email: "khalif@gmail.com", phoneNumber: "+254756456789", password: test, image: behance})
    await User.create({name: "user test", email: "test@gmail.com", phoneNumber: "+254756456789", password: test, image: bridge})
    await User.create({name: "james bond", email: "james@gmail.com", phoneNumber: "+254756456789", password: test, image: classic})
    await User.create({name: "alice keino", email: "alice@gmail.com", phoneNumber: "+254756456789", password: test, image: cool})
    await User.create({name: "jamal mayers", email: "jamal@gmail.com", phoneNumber: "+254756456789", password: test, image: labrinth})
    await User.create({name: "lady bee", email: "lady@gmail.com", phoneNumber: "+254756456789", password: test, image: ladyavatar})
    await User.create({name: "alfonse eliuds", email: "alfonse@gmail.com", phoneNumber: "+254756456789", password: test, image: leafy})
    await User.create({name: "mike tergat", email: "mike@gmail.com", phoneNumber: "+254756456789", password: test, image: manavatar})
    await User.create({name: "katt williams", email: "katt@gmail.com", phoneNumber: "+254756456789", password: test, image: methode})
    await User.create({name: "dwayne johnson", email: "dwain@gmail.com", phoneNumber: "+254756456789", password: test, image: red})
    await User.create({name: "nelly heills", email: "nelly@gmail.com", phoneNumber: "+254756456789", password: test, image: shy})
    await User.create({name: "wilson meyers", email: "will@gmail.com", phoneNumber: "+254756456789", password: test, image: smirk})
    await User.create({name: "frank alberts", email: "frank@gmail.com", phoneNumber: "+254756456789", password: test, image: stunned})
    await User.create({name: "benjamin jules", email: "benjamin@gmail.com", phoneNumber: "+254756456789", password: test, image: sunny})
    await User.create({name: "jacky maribe", email: "jacky@gmail.com", phoneNumber: "+254756456789", password: test, image: thoughtful})
    await User.create({name: "sheik halif", email: "sheik@gmail.com", phoneNumber: "+254756456789", password: test, image: smilingoldman})
    await User.create({name: "metro bomming", email: "metro@gmail.com", phoneNumber: "+254756456789", password: test, image: happy})
    await User.create({name: "willy albert", email: "willy@gmail.com", phoneNumber: "+254756456789", password: test, image: ladyavatar})
    await User.create({name: "banks alif", email: "banks@gmail.com", phoneNumber: "+254756456789", password: test, image: labrinth})
    await User.create({name: "admin", email: "admin@gmail.com", phoneNumber: "+254756456789", password: test, image: happy})

    /** Verify all data is put in the database */
    console.log(".... done seeding.")




}

export default seedData
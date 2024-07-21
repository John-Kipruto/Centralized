/** Node js imports */
import express from 'express'
import { config } from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import bodyParser from 'body-parser'
import fileUpload from 'express-fileupload'

/** App imports */
import db from './config/database.js'
import User from './models/user.js'
import seedData from './seeders/seeder.js'
import { errorHandler } from './middlewares/errorMiddleware.js'
import userRoutes from './routes/userRoutes.js'


/** Enable .env files to be used */
config()
const port = process.env.PORT || 5000


const app = express()

const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true
}

app.use(cors(corsOptions))
/** Enable sending data from client */

app.use(cookieParser())
// enable files upload 
app.use(express.json({limit : '50mb',extended : true}))
app.use(express.urlencoded({limit : '50mb',extended : true}))
app.use(fileUpload())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());


app.use('/api/users', userRoutes)
try{

    await db.authenticate()
    console.log("Connection established successfully!")

    await User.sync({alter: true})
    console.log("User table was created successfully!")

    /** Seed data to the database */
    // await User.sync({force: true})
    // seedData()
    

} catch(err){

    console.log("Error connecting to the database!")
}

app.use(errorHandler)

app.listen(port, () => console.log(`Listening on port ${port}`))
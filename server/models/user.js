import { DataTypes, Sequelize } from 'sequelize'
import db from '../config/database.js'

const User = db.define(
    "User",
    {

        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false
        },

        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false
        },

        image: {
            type: DataTypes.BLOB("long"),
            allowNull: true
        }
    }
)

export default User
const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const { v4: uuidv4 } = require('uuid')


const ForgotPasswordRequest = sequelize.define('forgotpasswordrequests', {
    id : {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    userid:{
        type:Sequelize.INTEGER,
        unique: false
    },
    isactive: {
        type:Sequelize.BOOLEAN,
        unique: false
    }
})

module.exports = ForgotPasswordRequest
const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const Comments = sequelize.define('comment', {
    id : {
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    comment:{
        type:Sequelize.STRING,
        unique: false
    }
})

module.exports = Comments
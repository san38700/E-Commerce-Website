const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const Posts = sequelize.define('post', {
    id : {
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    img:{
        type:Sequelize.STRING,
        unique: false
    },
    description: {
        type:Sequelize.STRING,
        unique: false
    }
})

module.exports = Posts
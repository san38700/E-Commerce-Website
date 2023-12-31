const Sequelize = require('sequelize')

const sequelize = require('../util/database')

const Review = sequelize.define('review', {
    id : {
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    companyname:{
        type:Sequelize.STRING,
        unique: false
    },
    pros: {
        type:Sequelize.STRING,
        unique: false
    },
    cons: {
        type:Sequelize.STRING,
        unique: false
    },
    rating: {
        type:Sequelize.INTEGER,
        unique: false
    }
})

module.exports = Review
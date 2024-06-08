const { ObjectId } = require('mongodb')
const getDb = require('../util/database').getDb

class User{
    constructor(name, email, cart, id){
      this.name = name;
      this.email = email;
      this.cart = cart
      this._id = id
    }
    save(){
        const db = getDb()
        return db.collection('users')
        .insertOne(this)
        .then(result => {
          console.log(result)
          return result
      })
        .catch(err => {
          console.log(err)
          throw err
      })  
    }

    addToCart(product){
        const cartProductIndex = this.cart.items.findIndex(cp =>{
            return cp.productId.toString() === product._id.toString()
        })
        let newQuantity = 1
        const updatedCartItems = [...this.cart.items]

        if(cartProductIndex >= 0){
            newQuantity = this.cart.items[cartProductIndex].quantity + 1
            updatedCartItems[cartProductIndex].quantity = newQuantity
        }else{
            updatedCartItems.push({productId: new ObjectId(product._id), quantity:1})
        }
         
        const updatedCart = {items: updatedCartItems}
        const db = getDb()
        return db.collection('users')
        .updateOne({_id: new ObjectId(this._id)}, 
        {$set: {cart: updatedCart}})
    }

    static findById(userId){
        const db = getDb() 
        return db.collection('users').findOne({_id: new ObjectId(userId)})
        .then(user => {
            console.log(user)
            return user
        })
        .catch(err => console.log(err))

    }
}



// const Sequelize = require('sequelize')

// const sequelize = require('../util/database')

// const NewUser = sequelize.define('newuser', {
//     id : {
//         type:Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     name:{
//         type:Sequelize.STRING,
//         unique: false
//     },
//     email: {
//         type:Sequelize.STRING,
//         unique: true
//     },
//     password : {
//         type:Sequelize.STRING,
//         unique:false
//     },
//     ispremiumuser : Sequelize.BOOLEAN,
//     totalexpenses :{
//         type: Sequelize.INTEGER,
//         defaultValue: 0
//     }
// })

module.exports = User
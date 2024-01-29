const path = require('path');

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const Razorpay = require('razorpay');
const errorController = require('./controllers/error');
const Product = require('./models/product')
const User = require('./models/user')
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item')
const Order = require('./models/order')
const OrderItem = require('./models/order-item')
const Review = require('./models/review')
const Post = require('./models/post')
const Comment = require('./models/comment')
const Expense = require('./models/expense')
const NewUser = require('./models/usersignup')
const ForgotPasswordRequest = require('./models/forgotpassword')
const Url = require('./models/fileurl')



const sequelize = require('./util/database')

var cors = require('cors')
const app = express();

app.use(cors())

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname,'public')))


const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const userRoutes = require('./routes/user')
const reviewRoutes = require('./routes/nodejs')
const postRoutes = require('./routes/post')
const commentRoutes = require('./routes/comment')
const userSignUp = require('./routes/usersignup')
const expenseRoutes = require('./routes/expense')
const purchaseRoutes = require('./routes/purchase')
const passwordRoutes = require('./routes/forgotpassword')
const { name } = require('ejs');

app.use(bodyParser.json({ extended: false }));



app.use((req,res,next) => {
    User.findByPk(1)
    .then(user => {
        req.user = user
        next()
    })
    .catch(err => console.log(err))
})

app.use(userRoutes);
app.use(expenseRoutes)

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(reviewRoutes)

app.use(postRoutes)


app.use(commentRoutes)

app.use(userSignUp)

app.use(purchaseRoutes)

app.use(passwordRoutes)


app.use(errorController.get404);

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'})
User.hasMany(Product)
User.hasOne(Cart)
Cart.belongsTo(User)
Cart.belongsToMany(Product, {through : CartItem})
Product.belongsToMany(Cart, {through: CartItem})
//Order.belongsTo(User)
//User.hasMany(Order) 
//belongs to previous shop orders
//Order.belongsToMany(Product, {through : OrderItem})


Post.hasMany(Comment);
Comment.belongsTo(Post);

NewUser.hasMany(Expense)
Expense.belongsTo(NewUser)

NewUser.hasMany(Order)
Order.belongsTo(NewUser)

NewUser.hasMany(ForgotPasswordRequest, {
    foreignKey: 'userid', // The foreign key in ForgotPasswordRequest
    sourceKey: 'id', // The primary key in User
    as: 'forgotPasswordRequests' // Alias for the association
})
ForgotPasswordRequest.belongsTo(NewUser,{
    foreignKey: 'userid', // The foreign key in ForgotPasswordRequest
    targetKey: 'id', // The primary key in User
    as: 'user' // Alias for the association
})

NewUser.hasMany(Url)
Url.belongsTo(NewUser)

sequelize
    // .sync({force: true})
    .sync()
    .then(result => app.listen(3000))
    .catch(err => console.log(err))
    // .then(result => {
    //     return User.findByPk(1)
    //     // console.log(result)
        
    // })
    // .then(user => {
    //     if (!user) {
    //         return User.create({name: 'Max', email: 'test@test.com', phone:9})
    //     }
    //     return user
    // })
    // .then(user => {
    //     // console.log(user)
    //     return user.createCart()
        
    // })
    // .then(cart => {
    //     app.listen(3000)
    // })
    // .catch(err => {
    //     console.log(err)
    // })



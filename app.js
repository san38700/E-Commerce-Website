const path = require('path');
const fs = require('fs')

require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet')
const compression = require('compression')
const morgan = require('morgan')
const mongoose = require('mongoose');

// const mongoConnect = require('./util/database').mongoConnect

const User = require('./models/usersignup')

const errorController = require('./controllers/error');
// const Product = require('./models/product')
// const User = require('./models/user')
// const Cart = require('./models/cart')
// const CartItem = require('./models/cart-item')
// const Order = require('./models/order')
// const OrderItem = require('./models/order-item')
// const Review = require('./models/review')
// const Post = require('./models/post')
// const Comment = require('./models/comment')
// const Expense = require('./models/expense')
// const NewUser = require('./models/usersignup')
// const ForgotPasswordRequest = require('./models/forgotpassword')
// const Url = require('./models/fileurl')



var cors = require('cors')
const app = express();

app.use(cors())

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname,'public')))


const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
// const userRoutes = require('./routes/user')
// const reviewRoutes = require('./routes/nodejs')
// const postRoutes = require('./routes/post')
// const commentRoutes = require('./routes/comment')
// const userSignUp = require('./routes/usersignup')
// const expenseRoutes = require('./routes/expense')
// const purchaseRoutes = require('./routes/purchase')
// const passwordRoutes = require('./routes/forgotpassword')
const { name } = require('ejs');

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})


//app.use(bodyParser.json({ extended: false }));
//app.use(helmet())
app.use(compression())
app.use(morgan('combined', {stream: accessLogStream}))


app.use((req, res, next) => {
    User.findById('667285c9cd6a6a3456f06a61')
    .then(user => {
        req.user = user
        next()
    })
    .catch(err => console.log(err))
})


app.use('/admin',adminRoutes)
app.use(shopRoutes)



app.use(errorController.get404)


// app.use((req,res) => {
//     console.log('url',req.url)
//     res.sendFile(path.join(__dirname,`public/${req.url}`))
// })



// mongoConnect(() => {
//     app.listen(3000)
// })

mongoose
  .connect(
    'mongodb+srv://sandeepkumar:bkrhgfM67EfWQIk9@cluster0.br5anyu.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0'
  )
  .then(result => {
    User.findOne().then(user => {
        if (!user) {
          const user = new User({
            name: 'John',
            email: 'john@test.com',
            cart: {
              items: []
            }
          });
          user.save();
        }
      });
    console.log('Connected !')
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });


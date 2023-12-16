const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const Product = require('./models/product')
const User = require('./models/user')



const sequelize = require('./util/database')
var cors = require('cors')
const app = express();

app.use(cors())

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const userRoutes = require('./routes/user')
// const expenseRoutes = require('./routes/expense')
const { name } = require('ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next) => {
    User.findByPk(1)
    .then(user => {
        req.user = user
        next()
    })
    .catch(err => console.log(err))
})

app.use(userRoutes);
// app.use(expenseRoutes)

app.use('/admin', adminRoutes);
app.use(shopRoutes);


app.use(errorController.get404);
Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'})
User.hasMany(Product)

sequelize
    // .sync({force: true})
    .sync()
    .then(result => {
        return User.findByPk(1)
        // console.log(result)
        
    })
    .then(user => {
        if (!user) {
            return User.create({name: 'Max', email: 'test@test.com', phone:9})
        }
        return user
    })
    .then(user => {
        console.log(user)
        app.listen(3000)
    })
    .catch(err => {
        console.log(err)
    })



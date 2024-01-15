const Expense = require('../models/expense')
const NewUser = require('../models/usersignup')
const jwt = require('jsonwebtoken');

exports.addExpense = async (req,res,next) => {
    try{
    const amount = req.body.amount
    const description = req.body.description
    const category = req.body.category
    const token = req.header('Authorization')
    const user = jwt.verify(token,process.env.TOKEN_SECRET)
    console.log('userId >>>', user.userId)
    const data = await Expense.create({amount: amount, description: description, category: category, newuserId: user.userId})
    res.status(201).json({newExpense:data})
    }catch(err){
        console.log(err)
    }
}

exports.authenticate = async (req,res,next) => {
    try {
       const token = req.header('Authorization')
       //console.log(token)
       const user = jwt.verify(token, process.env.TOKEN_SECRET)
       console.log('userId >>>', user.userId)
 
       NewUser.findByPk(user.userId)
         .then(user => {
           req.user = user
           next()
         })
    }
     catch(err){
       console.log(err)
       return res.status(401).json({success:false})
     }
}

exports.getExpense = async (req,res,next) => {
    // const expenses = await Expense.findAll()
    const expenses = await Expense.findAll({where : {newuserid : req.user.id}})
    res.status(200).json({Expenses:expenses, premiumuser: req.user.ispremiumuser})
}



exports.deleteExpense = async (req,res,next) => {
    try{
        if(req.params.id === 'undefined'){
            console.log('id is missing')
            return res.status(400).json({err : 'ID is missing'})
        }
    const expenseId = req.params.id
    await Expense.destroy({where: {id :expenseId}})
    res.sendStatus(200)
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}

exports.editExpense = async (req,res,next) => {
    const expenseId = req.params.id
    await Expense.destroy({where: {id :expenseId}})
    res.sendStatus(200)
    
}
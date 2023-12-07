const Expense = require('../models/expense')

exports.addExpense = async (req,res,next) => {
    try{
    const amount = req.body.Amount
    const description = req.body.Description
    const category = req.body.Category
    const data = await Expense.create({amount: amount, description: description, category: category})
    res.send(category)
    res.status(201).json({newExpense:data})
    }catch(err){
        console.log('Similar data already added in description')
    }
}

exports.getExpense = async (req,res,next) => {
    const expenses = await Expense.findAll()
    res.status(200).json({Expenses:expenses})
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
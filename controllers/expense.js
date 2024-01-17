const Expense = require('../models/expense')
const NewUser = require('../models/usersignup')
const jwt = require('jsonwebtoken');
const sequelize = require('../util/database')

exports.addExpense = async (req,res,next) => {
    let t

    try {
        const t = await sequelize.transaction();
    
        const amount = req.body.amount;
        const description = req.body.description;
        const category = req.body.category;
        const token = req.header('Authorization');
        const user = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log('userId >>>', user.userId);
    
        const data = await Expense.create({ amount, description, category, newuserId: user.userId }, { transaction: t });
    
        const totalUserExpense = await NewUser.findByPk(user.userId);
    
        if (totalUserExpense) {
            const currentTotalExpenses = Number(totalUserExpense.totalexpenses) || 0;
            const newTotalExpenses = currentTotalExpenses + Number(amount);
            console.log(newTotalExpenses);
    
            await totalUserExpense.update({ totalexpenses: newTotalExpenses }, { transaction: t });
        }
    
        await t.commit();
        res.status(201).json({ newExpense: data });
    } catch (err) {
        if (t) await t.rollback();
        console.log(err);
    }
    
    // promises method


    // sequelize.transaction()
    // .then((t) => {
    //     const amount = req.body.amount;
    //     const description = req.body.description;
    //     const category = req.body.category;
    //     const token = req.header('Authorization');
    //     const user = jwt.verify(token, process.env.TOKEN_SECRET);
    //     console.log('userId >>>', user.userId);

    //     Expense.create({ amount: amount, description: description, category: category, newuserId: user.userId }, { transaction: t })
    //         .then((data) => {
    //             return NewUser.findByPk(user.userId)
    //                 .then((totalUserExpense) => {
    //                     if (totalUserExpense) {
    //                         const currentTotalExpenses = Number(totalUserExpense.totalexpenses) || 0;
    //                         const newTotalExpenses = currentTotalExpenses + Number(amount);
    //                         console.log(newTotalExpenses);

    //                         return totalUserExpense.update({ totalexpenses: newTotalExpenses }, { transaction: t })
    //                             .then(() => {
    //                                 return t.commit()
    //                                     .then(() => {
    //                                         res.status(201).json({ newExpense: data });
    //                                     });
    //                             });
    //                     }
    //                 });
    //         })
    //         .catch((err) => {
    //             t.rollback()
    //                 .then(() => {
    //                     console.log(err);
    //                 });
    //         });
    // })
    // .catch((outerErr) => {
    //     console.log('Outer error:', outerErr);
    // });

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
    let t
    try{
        t = await sequelize.transaction()

        if(req.params.id === 'undefined'){
            console.log('id is missing')
            return res.status(400).json({err : 'ID is missing'})
        }
    const expenseId = req.params.id
    //console.log(expenseId)
    const expense = await Expense.findByPk(expenseId)

    const amount = expense.amount
    await Expense.destroy({ where: { id: expenseId }, transaction: t });

    const token = req.header('Authorization');
    const user = jwt.verify(token, process.env.TOKEN_SECRET);
    const totalUserExpense = await NewUser.findByPk(user.userId);
    
        if (totalUserExpense) {
            const currentTotalExpenses = Number(totalUserExpense.totalexpenses) ;
            const newTotalExpenses = currentTotalExpenses - Number(amount);
            //console.log(newTotalExpenses);
    
            await totalUserExpense.update({ totalexpenses: newTotalExpenses }, {transaction: t});
        }
        await t.commit()
        res.status(201).json({success: 'ok'});
    } catch (err) {
        
        if (t) await t.rollback();
        console.log(err);
        
    }
    
}

exports.editExpense = async (req,res,next) => {
    const expenseId = req.params.id
    await Expense.destroy({where: {id :expenseId}})
    res.sendStatus(200)
    
}
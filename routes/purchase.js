const express = require('express')

const router = express.Router()

const purchaseController = require('../controllers/purchase')
const ExpenseController = require('../controllers/expense');

router.post('/purchase/purchase-premium',ExpenseController.authenticate,purchaseController.purchasepremium)

router.post('/purchase/purchase-failure',ExpenseController.authenticate,purchaseController.purchasefailure)

router.post('/purchase/updatetransactionstatus',ExpenseController.authenticate,purchaseController.updateTransactionStatus)

router.get('/premium/leaderboard',purchaseController.leaderboard)

module.exports = router;
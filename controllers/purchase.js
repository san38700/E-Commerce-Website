const Razorpay = require('razorpay');
const Order = require('../models/order')
const { or } = require('sequelize')

exports.purchasepremium = async (req,res) => {
    try{
        var rzp = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        })
        const amount = 2500

        rzp.orders.create({amount, currency: "INR"}, (err, order) => {
            if(err){
                throw new Error(JSON.stringify(err))
            }
            req.user.createOrder({orderid: order.id, status: 'PENDING'}).then(() =>{
                return res.status(201).json({order, key_id: rzp.key_id})
            })
            .catch(err => {
                throw new Error(err)
            })
        })
    }catch(err){
        res.status(403).json({message: 'Something went wrong', error: err})
    }
}

exports.purchasefailure = (req, res) => {
    const orderid  = req.body.response.error.metadata.order_id
    //console.log(req.body.response.error.metadata.order_id)
    Order.update(
        { status: 'FAILED'},
        { where: { orderid: orderid} }
    ).then(() => {
        res.json({ status: 'failure', message: 'Payment failed' });
    }).catch(error => {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    });
}

exports.updateTransactionStatus = async (req, res) => {
    try{
        const {payment_id, order_id} = req.body
        const order = await Order.findOne({where: {orderid: order_id}})
        const promise1 = order.update({paymentid: payment_id, status: 'SUCCESSFUL'})
        const promise2 = req.user.update({ispremiumuser: true})

        Promise.all([promise1, promise2]).then(() =>{
            return res.status(202).json({success: true, message: 'Transaction Successful'})
        }).catch((err) => {
            throw new Error(err)
        })
    }catch(err){
        console.log(err)
        res.status(403).json({error:err, message:'Something went wrong'})
    }
    // try{
    //     const {payment_id, order_id} = req.body
    //     Order.findOne({where: {orderid: order_id}}).then(order => {
    //         order.update({paymentid: payment_id, status: 'SUCCESSFUL'}).then(() => {
    //             req.user.update({ispremiumuser: true}).then(() => {
    //                 return res.status(202).json({success: true, message: 'Transaction Successful'})
    //             }).catch((err) => {
    //                 throw new Error(err)
    //             })
    //         }).catch((err) => {
    //             throw new Error(err)
    //         })
    //     }).catch((err) => {
    //         throw new Error(err)
    //     })
    // }catch(err){
    //     console.log(err)
    // }
}
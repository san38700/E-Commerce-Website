const Review = require('../models/review')

exports.addReview = async (req,res,next) => {
    try{
    const name = req.body.companyname
    const pros = req.body.pros
    const cons = req.body.cons
    const rating = req.body.rating

    const data = await Review.create({companyname: name, pros: pros, cons: cons, rating : rating})
    res.status(201).json({companyname : name, pros : pros, cons : cons, rating : rating})
    } catch(err){
        console.log(err)
        
    }
    
}

exports.getReview = async (req,res,next) => {
    const cmp = req.params.companyName
    console.log(cmp)
    // const reviews = await Review.findAll()
    const reviews = await Review.findAll({where: {companyname: cmp}})
    .then(res => {
        console.log(res)
        
    })
    .catch(err => console.log(err))
    res.status(200).json({Reviews:reviews})
}
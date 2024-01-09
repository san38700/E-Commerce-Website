const User = require('../models/user')

exports.addUser = async (req,res,next) => {
    try{
    const name = req.body.Name
    const phone = req.body.Phone
    const email = req.body.Email

    const data = await User.create({name: name, phone: phone,email: email  })
    res.status(201).json({newUser:data})
    }catch(err){
        console.log(err)
    }
    
}

exports.getUser = async (req,res,next) => {
    const users = await User.findAll()
    res.status(200).json({users:users})
}

exports.deleteUser = async (req,res,next) => {
    try{
        if(req.params.id === 'undefined'){
            console.log('id is missing')
            return res.status(400).json({err : 'ID is missing'})
        }
    const userId = req.params.id
    await User.destroy({where: {id :userId}})
    res.sendStatus(200)
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}

exports.editUser = async (req,res,next) => {
    const userId = req.params.id
    await User.destroy({where: {id :userId}})
    res.sendStatus(200)
}
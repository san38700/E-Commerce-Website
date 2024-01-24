const Sib = require('sib-api-v3-sdk')
<<<<<<< HEAD
const jwt = require('jsonwebtoken');
const NewUser = require('../models/usersignup')
const ForgotPasswordRequest = require('../models/forgotpassword')
const path = require('path');
const bcrypt = require('bcrypt')
const rootDir = require('../util/path')
const { v4: uuidv4 } = require('uuid')

let requestid;
let userid;
=======


>>>>>>> 23bf860ab2e66eab9474fb74d5e8ec39b3105f59

exports.forgotpassword = async (req,res,next) => {
    const {Email} = req.body
    console.log(Email)
<<<<<<< HEAD

    const user = await NewUser.findOne({where : {email : Email}})
    console.log(user.email,user.name)
    
    const requestId = uuidv4();

    await ForgotPasswordRequest.create({ id: requestId, userid : user.id, isactive: true , newuserId: user.id})
    .then(res => console.log('password request created'))
    .catch(err => console.log(err))
    
    const request = await ForgotPasswordRequest.findOne({where: {userid : user.id}})
    console.log(request.id)

=======
>>>>>>> 23bf860ab2e66eab9474fb74d5e8ec39b3105f59
    const client = Sib.ApiClient.instance;

    const apiKey = client.authentications['api-key']
    apiKey.apiKey = process.env.BREVO_API_KEY

    const TranEmailApi = new Sib.TransactionalEmailsApi()

    const sender = {
<<<<<<< HEAD
        email: 'sandeepkratosj@gmail.com',
=======
        email: 'sandeepkratosj@yahoo.in',
>>>>>>> 23bf860ab2e66eab9474fb74d5e8ec39b3105f59
        Name: "Sandeep"
    }

    const receivers = [
        {
            email: Email
        }
    ]

    TranEmailApi.sendTransacEmail(
        {
            sender,
            to: receivers,
<<<<<<< HEAD
            subject: 'Reset Password',
            // textContent: 'Please ignore password reset mail sent by mistake'
            htmlContent: `<p>Please <a href='http://localhost:3000/password/resetpassword/${request.id}'>click here</a> to reset your password</p>`,
        }
    )
    .then(result => {

       res.status(201).json({message: 'Please check your email for resetting your password',id: request.id})
    })
    .catch(err => console.log(err))
}



exports.resetpassword = async (req, res, next) => {
    const id = req.params.id
    console.log(id)

    const request = await ForgotPasswordRequest.findOne({where: {id : id}})
    requestid = request.id
    userid = request.userid
    console.log(request.isactive,request.userid)
    if (request.isactive == true){
        const filePath = path.join(rootDir,'resetpasswordform.html')
        res.sendFile(filePath)
    }else{
        res.send('Link expired')
    }
        
};

exports.newpassword = async (req, res, next) => {
    
    try{
        const { password } = req.body;
        console.log(password)
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        console.log(hashedPassword)

        console.log(requestid)
        console.log(userid)
        const newUser = await NewUser.findOne({ where: {id: userid }});
        const PasswordRequest = await ForgotPasswordRequest.findOne({ where: {userid: userid}})
        newUser.update({password: hashedPassword})
        PasswordRequest.update({isactive: false})

        res.status(201).json({message: "password updated please login"})

    }catch (err) {
        console.log(err)
        res.status(500).json({error: "Internal Server Error"})
    }
    
=======
            subject: 'Test Subject',
            textContent: 'Test Content'
        }
    )
    .then(res => {

       res.status(201).json({message: 'Please check your email for resetting your password'})
        console.log(res)
    })
    .catch(err => console.log(err))
>>>>>>> 23bf860ab2e66eab9474fb74d5e8ec39b3105f59
}
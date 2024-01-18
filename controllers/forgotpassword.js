const Sib = require('sib-api-v3-sdk')



exports.forgotpassword = async (req,res,next) => {
    const {Email} = req.body
    console.log(Email)
    const client = Sib.ApiClient.instance;

    const apiKey = client.authentications['api-key']
    apiKey.apiKey = process.env.BREVO_API_KEY

    const TranEmailApi = new Sib.TransactionalEmailsApi()

    const sender = {
        email: 'sandeepkratosj@yahoo.in',
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
            subject: 'Test Subject',
            textContent: 'Test Content'
        }
    )
    .then(res => {

       res.status(201).json({message: 'Please check your email for resetting your password'})
        console.log(res)
    })
    .catch(err => console.log(err))
}
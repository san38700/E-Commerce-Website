const email = document.getElementById('email')
const form = document.getElementById('form')

form.addEventListener('submit',function (e) {
    e.preventDefault()
    //const email = document.getElementById('email').value
    const obj = {
        Email : email.value
    }

    axios.post('http://localhost:3000/password/forgotpassword', obj)
    .then(res => {
        console.log(res)
        
    })
    .catch(err => console.log(err))
})
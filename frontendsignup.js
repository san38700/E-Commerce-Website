const postUser = document.getElementById('form')

postUser.addEventListener('submit', addUser)

function addUser(e) {
    e.preventDefault()

    const name = document.getElementById('name').value
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value

    let userObj = {
        name: name,
        email: email,
        password: password
    }
    postData()
    function postData() {
        axios
        .post('http://localhost:3000/user/signup',userObj)
        .then(res => {
            console.log(res)
        })
        .catch(err => console.log(err))
    }
}
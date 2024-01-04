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
        .post('http://localhost:3000/user/signup', userObj)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.error(err);
            const errorContainer = document.getElementById('error-container');
    
            if (errorContainer) {
                const div = document.createElement('div');
                div.textContent = err.message || 'An error occurred';
                div.style.color = 'red'; 
                errorContainer.appendChild(div);
            }
        });
    }
}
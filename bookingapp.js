var form = document.getElementById("form")
var button = document.getElementById('submit-id')
var items = document.getElementById('items')
button.addEventListener('click', addItem)

window.addEventListener("DOMContentLoaded",()=>{
    //let storedUserObj = localStorage.getItem('userObj')

    axios.get("http://localhost:3000/user/get-users").then(
        (resp)=>{
            console.log(resp)
            for(let i=0;i<resp.data.users.length;i++){
                showUseronScreen(resp.data.users[i].name, resp.data.users[i].phone,resp.data.users[i].email,resp.data.users[i].id)
            }
        }).catch((err)=>{
            console.log(err)
        })
})

function showUseronScreen(Name,Phone,Email,id){
    var name = document.getElementById('name')
    var email = document.getElementById('email')
    var phone = document.getElementById('phone')
    var id = id
    console.log(name,phone,email)
    let li = document.createElement('li')
    li.innerText = `Name:${Name} Phone:${Phone} Email:${Email}`
    let del = document.createElement('button')
    let edit = document.createElement('button')
    del.appendChild(document.createTextNode('Delete User'))
    edit.appendChild(document.createTextNode('Edit User'))
    del.className = 'btn btn-outline-dark'
    edit.className = 'btn btn-outline-secondary'
    del.style.marginLeft = '5px'
    del.style.marginRight = '5px'
    li.appendChild(del)
    li.appendChild(edit)
    document.getElementById('items').append(li)

    del.addEventListener('click',function(){
    //console.log('deleted')
    //localStorage.removeItem(userObjItem)
    //sxios delete
    //console.log(id)
    axios
        .delete(`http://localhost:3000/user/delete-user/${id}`)
        .then(console.log('success'))
        .catch(err => console.log(err))

    this.parentElement.remove();
    })

    edit.addEventListener('click',(e) => {
        
        const li = e.target.parentElement
        name.value = Name
        phone.value = Phone
        email.value = Email
        axios
            .delete(`http://localhost:3000/user/edit-user/${id}`)
            .then(console.log('success'))
            .catch(err => console.log(err))
        li.remove()
        //localStorage.removeItem(key)
        //const userDetails = JSON.parse(userDetailstring);
        
        
    })
}

// function generateUniqueKey() {
//     return email.value
//  }

function addItem(e) {
    e.preventDefault();
  
    var name = document.getElementById("name");
    var phone = document.getElementById('phone')
    var email = document.getElementById('email');
    var li = document.createElement('li')

    let obj = {
        Name : name.value,
        Phone : phone.value,
        Email : email.value

    }
    postData()
    function postData() {
        axios
         .post('http://localhost:3000/user/add-user',obj)
         .then(res => {
            axios.get('http://localhost:3000/user/add-user').then(res => console.log(res))
            console.log(res)
        })
         .catch(err => console.log(err))
      }
    
    
window.addEventListener("DOMContentLoaded",()=>{
//let storedUserObj = localStorage.getItem('userObj')

axios.get("http://localhost:3000/user/get-users").then(
    (resp)=>{
        console.log(resp)
        for(let i=0;i<resp.data.users.length;i++){
            showUseronScreen(resp.data.users[i].name, resp.data.users[i].phone,resp.data.users[i].email,resp.data.users[i].id)
        }
    }).catch((err)=>{
        console.log(err)
    })
})  
    
    // li.appendChild(document.createTextNode(`Name:${name.value} Phone:${phone.value} Email:${email.value}`));
    // var deleteBtn = document.createElement('button');
    // var editBtn = document.createElement('button');
    // deleteBtn.appendChild(document.createTextNode("Delete User"))
    // deleteBtn.style.marginRight = '5px';
    // deleteBtn.style.marginLeft = '5px';
    // deleteBtn.className = "btn btn-outline-dark";
    // editBtn.className = "btn btn-outline-secondary"
    // editBtn.appendChild(document.createTextNode("Edit User"))
    // deleteBtn.addEventListener('click',removeItem);
    // editBtn.addEventListener('click',editItem);
    // // var key = generateUniqueKey();
    // li.appendChild(deleteBtn);
    // li.appendChild(editBtn);
    
    // // let obj_serialized = JSON.stringify(obj);
    // // localStorage.setItem(key,obj_serialized);


    // items.appendChild(li)
    // function removeItem(e){
    //     const li = e.target.parentElement;
    //     li.remove()
        
    //     // localStorage.removeItem(key)
    // }
    // function editItem(e){
    //     const li = e.target.parentElement;
    //     li.remove()
    //     // const userDetailstring = localStorage.getItem(key)
    //     // localStorage.removeItem(key)
    //     // const userDetails = JSON.parse(userDetailstring);
    //     // console.log(name,userDetails.Name)
    //     // name.value = userDetails.Name
    //     // email.value = userDetails.Email
        
        

    // }
    form.reset();
    
}


// window.addEventListener("DOMContentLoaded",()=>{
//     //let storedUserObj = localStorage.getItem('userObj')

//     axios.get("http://localhost:3000/user/get-users").then(
//         (resp)=>{
//             console.log(resp)
//             for(let i=0;i<resp.data.users.length;i++){
//                 showUseronScreen(resp.data.users[i].name, resp.data.users[i].phone,resp.data.users[i].email,resp.data.users[i].id)
//             }
//         }).catch((err)=>{
//             console.log(err)
//         })
// })

// function showUseronScreen(Name,Phone,Email,id){
//     var name = document.getElementById('name')
//     var email = document.getElementById('email')
//     var phone = document.getElementById('phone')
//     var id = id
//     console.log(name,phone,email)
//     let li = document.createElement('li')
//     li.innerText = `Name:${Name} Phone:${Phone} Email:${Email}`
//     let del = document.createElement('button')
//     let edit = document.createElement('button')
//     del.appendChild(document.createTextNode('Delete User'))
//     edit.appendChild(document.createTextNode('Edit User'))
//     del.className = 'btn btn-outline-dark'
//     edit.className = 'btn btn-outline-secondary'
//     del.style.marginLeft = '5px'
//     del.style.marginRight = '5px'
//     li.appendChild(del)
//     li.appendChild(edit)
//     document.getElementById('items').append(li)

//     del.addEventListener('click',function(){
//     //console.log('deleted')
//     //localStorage.removeItem(userObjItem)
//     //sxios delete
//     //console.log(id)
//     axios
//         .delete(`http://localhost:3000/user/delete-user/${id}`)
//         .then(console.log('success'))
//         .catch(err => console.log(err))

//     this.parentElement.remove();
//     })

//     edit.addEventListener('click',(e) => {
        
//         const li = e.target.parentElement
//         name.value = Name
//         phone.value = Phone
//         email.value = Email
//         axios
//             .delete(`http://localhost:3000/user/edit-user/${id}`)
//             .then(console.log('success'))
//             .catch(err => console.log(err))
//         li.remove()
//         //localStorage.removeItem(key)
//         //const userDetails = JSON.parse(userDetailstring);
        
        
//     })
// }
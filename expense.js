var form = document.getElementById("form")
var button = document.getElementById('submit-id')
var items = document.getElementById('items')
button.addEventListener('click', addItem)
const apiURL ='http://localhost:3000/expense/add-expense'

// function generateUniqueKey() {
//     // Create a timestamp-based key to make it unique each time
//     return description.value
// }

function addItem(e) {
    e.preventDefault();
  
    var amount = document.getElementById("amount-id");
    var description = document.getElementById('description');
    var category = document.getElementById('category');
    var li = document.createElement('li')
    
    // li.appendChild(document.createTextNode(amount));
    // li.appendChild(document.createTextNode(description));
    // li.appendChild(document.createTextNode(category));
    li.appendChild(document.createTextNode(`${amount.value} - ${description.value} - ${category.value}`));
    var deleteBtn = document.createElement('button');
    var editBtn = document.createElement('button');
    deleteBtn.appendChild(document.createTextNode("Delete Expense"))
    deleteBtn.style.marginRight = '5px';
    deleteBtn.style.marginLeft = '5px';
    deleteBtn.className = "btn btn-outline-dark";
    editBtn.className = "btn btn-outline-secondary"
    editBtn.appendChild(document.createTextNode("Edit Expense"))
    deleteBtn.addEventListener('click',removeItem);
    editBtn.addEventListener('click',editItem);
    // var key = generateUniqueKey();
    li.appendChild(deleteBtn);
    li.appendChild(editBtn);
    let obj = {
        Amount : amount.value,
        Description : description.value,
        Category : category.value

    }

    postData()
    function postData() {
        axios
         .post(apiURL,obj)
         .then(res => console.log(res))
         .catch(err => console.log(err))
      }

    // let obj_serialized = JSON.stringify(obj);
    // localStorage.setItem(key,obj_serialized);
    // console.log(localStorage);

    items.appendChild(li)
    function removeItem(e){
        const li = e.target.parentElement;
        li.remove()
        // localStorage.removeItem(key)
    }
    function editItem(e){
        const li = e.target.parentElement;
        li.remove()
        // const expenseDetailString = localStorage.getItem(key)
        // localStorage.removeItem(key)
        // const expenseDetails = JSON.parse(expenseDetailString);
        // console.log(amount,expenseDetails.Amount)
        amount.value = amount.value
        description.value = description.value
        category.value = category.value
        

    }
    form.reset();
}

window.addEventListener("DOMContentLoaded",()=>{
    //let storedUserObj = localStorage.getItem('userObj')

    axios.get('http://localhost:3000/expense/get-expense').then(
        (resp)=>{
            console.log(resp.data)
            for(let i=0;i<resp.data.Expenses.length;i++){
                showUseronScreen(resp.data.Expenses[i].amount,resp.data.Expenses[i].description,resp.data.Expenses[i].category,resp.data.Expenses[i].id)
            
            }
            }).catch((err)=>{
            console.log(err)
            })
})

function showUseronScreen(Amount,Description,Category,id){
    var amount = document.getElementById("amount-id");
    var description = document.getElementById('description');
    var category = document.getElementById('category');
    var id = id
    var li = document.createElement('li')
    // li.appendChild(document.createTextNode(amount));
    // li.appendChild(document.createTextNode(description));
    // li.appendChild(document.createTextNode(category));
    li.appendChild(document.createTextNode(`${Amount} - ${Description} - ${Category}`));
    var deleteBtn = document.createElement('button');
    var editBtn = document.createElement('button');
    deleteBtn.appendChild(document.createTextNode("Delete Expense"))
    deleteBtn.style.marginRight = '5px';
    deleteBtn.style.marginLeft = '5px';
    deleteBtn.className = "btn btn-outline-dark";
    editBtn.className = "btn btn-outline-secondary"
    editBtn.appendChild(document.createTextNode("Edit Expense"))
    deleteBtn.addEventListener('click',removeItem);
    editBtn.addEventListener('click',editItem);
    // var key = generateUniqueKey();
    li.appendChild(deleteBtn);
    li.appendChild(editBtn);

    items.appendChild(li)

    function removeItem(e){
        const li = e.target.parentElement;
        li.remove()
        axios
        .delete(`http://localhost:3000/expense/delete-expense/${id}`)
        .then(console.log('success'))
        .catch(err => console.log(err))

        // localStorage.removeItem(key)
    }
    function editItem(e){
        const li = e.target.parentElement;
        li.remove()
        axios
        .delete(`http://localhost:3000/expense/edit-expense/${id}`)
        .then(console.log('success'))
        .catch(err => console.log(err))

        // const expenseDetailString = localStorage.getItem(key)
        // localStorage.removeItem(key)
        // const expenseDetails = JSON.parse(expenseDetailString);
        // console.log(amount,expenseDetails.Amount)
        amount.value = Amount
        description.value = Description
        category.value = Category
        

    }
}
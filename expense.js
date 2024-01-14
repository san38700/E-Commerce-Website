document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('form');
    const expenseList = document.getElementById('items');

    // Create a single table for all expenses
    const tableElement = document.createElement('table');
    tableElement.style.borderCollapse = 'collapse';
    tableElement.style.width = '100%';

    // Flag to check if headers have been added
    let headersAdded = false;

    // Event listener for form submission
    expenseForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const amount = document.getElementById('amount-id').value;
        const description = document.getElementById('description').value;
        const category = document.getElementById('category').value;

        try {
            // Create a new expense
            const token = localStorage.getItem('jwtToken')
            //console.log(token)
            const response = await axios.post(`http://localhost:3000/expense/add-expense`, { amount, description, category},{headers :{'Authorization': token}});
            console.log(response)
            // Fetch and display expenses
            fetchAndDisplayExpenses();
        } catch (error) {
            console.error(error);
        }
    });

    // Fetch and display expenses on page load
    fetchAndDisplayExpenses();

    // Function to fetch and display Expenses
    async function fetchAndDisplayExpenses() {
        try {
            clearTableContent();
            const token = localStorage.getItem('jwtToken')
            //console.log(token)
            const response = await axios.get('http://localhost:3000/expense/get-expense',{headers: {'Authorization': token }});
            const expenses = response.data.Expenses;
            console.log(expenses);

            // Only add headers if not added yet
            if (!headersAdded) {
                const headerRow = tableElement.insertRow();
                addTableHeader(headerRow, 'Amount');
                addTableHeader(headerRow, 'Description');
                addTableHeader(headerRow, 'Category');
                //addTableHeader(headerRow, ''); // Empty cell for the delete button
                headersAdded = true;
            }

            // Append the table to the expenseList
            expenseList.appendChild(tableElement);

            // Display expenses
            for (let i = 0; i < expenses.length; i++) {
                console.log(expenses[i])
                showExpenseOnScreen(expenses[i], i);
            }
        } catch (error) {
            console.error(error);
        }
    }

    function clearTableContent() {
        // Remove all rows except the first row (headers)
        while (tableElement.rows.length > 1) {
            tableElement.deleteRow(1);
        }
    }

    // Function to display an expense on the screen
    function showExpenseOnScreen(expense, index) {
        console.log(expense)
        // Add a row with cells for each property and the delete button
        const row = tableElement.insertRow();
        addTableCell(row, expense.amount);
        addTableCell(row, expense.description);
        addTableCell(row, expense.category);

        // Add the delete button to the last column
        const deleteCell = row.insertCell();
        deleteCell.style.textAlign = 'center';

        const buttonElement = document.createElement('button');
        buttonElement.className = 'btn btn-primary';
        buttonElement.textContent = 'Delete Expense';
        buttonElement.onclick = () => deleteExpense(expense.id, row);

        deleteCell.appendChild(buttonElement);
    }

    // Function to add a table header cell with name
    function addTableHeader(row, heading) {
        const cell = row.insertCell();
        cell.textContent = heading;
        cell.style.fontWeight = 'bold';
        cell.style.border = '1px solid #ddd';
        cell.style.padding = '8px';
    }

    // Function to add a table cell with value
    function addTableCell(row, value) {
        const cell = row.insertCell();
        cell.textContent = value;
        cell.style.border = '1px solid #ddd';
        cell.style.padding = '8px';
    }

    async function deleteExpense(expenseId, expenseItem) {
        try {
            const response = await axios.delete(`http://localhost:3000/expense/delete-expense/${expenseId}`);

            // Remove the expense item from the DOM
            expenseItem.remove();
        } catch (error) {
            console.error(error);
        }
    }
});

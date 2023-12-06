function displayCartItems() {
    // Retrieve cart items from local storage
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Get the checkout table element
    let checkoutTable = document.getElementById('checkoutTable-div');

    // Clear existing content in the checkout table
    checkoutTable.innerHTML = '';

    // Iterate over cart items and display them in the checkout table
    cartItems.forEach(function (item) {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.description}</td>
            <td>${item.price}</td>
        `;
        checkoutTable.appendChild(row);
    });
}

// Call the function to initially display cart items on the checkout page
displayCartItems();




function clearCheckout() {
    // Clear the cart items in local storage
    localStorage.removeItem('cart');

    // Clear the content in the checkout table
    let checkoutTable = document.getElementById('checkoutTable-div');
    checkoutTable.innerHTML = '';
}

// Add an event listener to the clear button
let clearButton = document.getElementById('clear-button');
clearButton.addEventListener('click', clearCheckout);


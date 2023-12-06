function displayCartItems() {
    // Retrieve cart items from local storage
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Get the checkout table element
    let checkoutTable = document.getElementById('checkoutTable-div');

    // Clear existing content in the table
    checkoutTable.innerHTML = '';


    
// Get a reference to the clear button
let clearButton = document.getElementById('clear-button');

// Add an event listener to the clear button
clearButton.addEventListener('click', function() {
    // Clear the items in the checkout
    clearCheckoutItems();
});

// Function to clear the items in the checkout
function clearCheckoutItems() {
    // Get a reference to the checkout table body
    let checkoutTableBody = document.querySelector('#checkoutTable-div tbody');

    // Clear the content of the table body
    checkoutTableBody.innerHTML = '';

    // Optionally, you can clear any stored data in local storage
    localStorage.removeItem('purchased');
}
}
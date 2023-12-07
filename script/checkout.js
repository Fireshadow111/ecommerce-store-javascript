// function to display products on checkout page
function displayCartItems() {
    // getting products from the "cart" array in local storage or creating a empty array
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    
    let checkoutTable = document.getElementById('checkoutTable-div');

    // clearing products in the checkout table
    checkoutTable.innerHTML = '';

    // looping through all the products using "forEach" and then displaying them on the checkout
    cartItems.forEach(function (item) {
        checkoutTable.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>${item.description}</td>
                <td>${item.price}</td>
            </tr>
        `;
    });
}
displayCartItems();



// function to clear items in the "cart" array and reset it
function clearCheckout() {
    // clearing the products from the "cart" array in local storage
    localStorage.removeItem('cart');

    let checkoutTable = document.getElementById('checkoutTable-div');

    // clearing the products in the table
    checkoutTable.innerHTML = '';

    let cartTotal = document.getElementById('cart-total');

    // clearing the total input tag
    cartTotal.value = '';
}

let clearButton = document.getElementById('clear-button');

clearButton.addEventListener('click', clearCheckout);



// function to calculate the total price
function calculateTotal() {
    // getting products from the "cart" array in local storage or creating a empty array
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    
    // setting the total cost to 0
    let totalCost = 0;

    // looping through the products in the array, if the cart products are less than i, then i + 1
    for (let i = 0; i < cartItems.length; i++) {
        // parseing the price, removing the "$" and coverting it to a string without the "$" and then muiltiplying by the quantity
        let productsTotal = parseFloat(cartItems[i].price.replace('$', '')) * cartItems[i].quantity;

        // letting the total cost = 0 plus the price of the product
        totalCost = totalCost + productsTotal;
    }

    // displaying the total cost in the input tag to 2 decimal places using "toFixed"
    document.getElementById('cart-total').value = `$${totalCost.toFixed(2)}`;
}
displayCartItems();
calculateTotal();




//adding an messege when the checkout button is clicked
let checkoutButton = document.getElementById('checkout-button');

checkoutButton.addEventListener('click', function() {

   alert('Thank you for your purchase')

})
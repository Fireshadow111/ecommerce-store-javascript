let purchased = []

let productsTable = document.querySelector('[data-productsCard]')


let products = JSON.parse(localStorage.getItem('products'))


function displayProducts() {

    let dProducts = products.map(function(item, index) {

        return `
        <div class="col-md-4 my-5 d-flex justify-content-center">
        <div class="card h-100" style="width: 18rem;">
        <img src="${item.url}" class="card-img-top" alt="">
        <div class="card-body">
            <h5 style="color: white; background-color: black;" class="card-title">${item.name}</h5>
            <p class="card-text" style="font-size: 17px; font-weight: bolder;"><i>${item.description}</i></p>
            <p class="card-text" style="font-size: 17px;">${item.price}</p>
            <button id = "products-add-cart-button" class="btn btn-primary">Add to Cart</button>
        </div>
    </div>
    </div>
        `
    

})
productsTable.innerHTML = dProducts.join('')

}
displayProducts()  




let productsSortButton = document.getElementById('products-sort-button')


productsSortButton.addEventListener('click', function() {
    products.sort(function(a, b) {
        let price1 = a.price;
        let price2 = b.price;
        if (price1 < price2) {
            return -1; 
        } else if (price1 > price2) {
            return 1; 
        } else {
            return 0; 
        }
    });

    displayProducts()

});



let productsSearchButton = document.getElementById('products-search-button')

 
function searchProducts() {
    let userInput = document.getElementById('products-search-input').value.trim().toUpperCase();
    
    // Filter items based on user input
    let filteredItems = products.filter(item => item.name.toUpperCase().includes(userInput));

    if (filteredItems.length > 0) {
        // If items are found, display only those items
        displayFilteredProducts(filteredItems);
        alert("Item(s) was found");
    } else {
        // If no items are found, show an alert message
        alert("Product was not found");
    }
}

// Event listener for the Search button
productsSearchButton.addEventListener('click', searchProducts);
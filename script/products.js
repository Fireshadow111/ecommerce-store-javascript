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


function addPur(index){
    purchased.push(products[index])
    localStorage.setItem('purchased',JSON.stringify(purchased))

}
addPur()



let productsSortButton = document.getElementById('products-sort-button')


productsSortButton.addEventListener('click', function() {
    products.sort(function(a, b) {
        // Convert price to a numeric value
        let price1 = parseFloat(a.price.replace('$', ''));
        let price2 = parseFloat(b.price.replace('$', ''));
        // Sort from cheapest to most expensive
        if (price1 < price2) {
            return -1;
        } else if (price1 > price2) {
            return 1;
        } else {
            return 0;
        }
    });
    displayProducts();
});









//Searching
let productsSearchButton = document.getElementById('products-search-button');

productsSearchButton.addEventListener('click', function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the user input from the search input field
    let searchTerm = document.getElementById('products-search-input').value.toLowerCase().trim();

    // Filter products based on the search term
    let filteredProducts = products.filter(function(item) {
        return item.name.toLowerCase().includes(searchTerm);
    });

    // Display the filtered products
    displayFilteredProducts(filteredProducts);
});

function displayFilteredProducts(filteredProducts) {
    let dFilteredProducts = filteredProducts.map(function(item, index) {
        return `
        <div class="col-md-4 my-5 d-flex justify-content-center">
            <div class="card h-100" style="width: 18rem;">
                <img src="${item.url}" class="card-img-top" alt="">
                <div class="card-body">
                    <h5 style="color: white; background-color: black;" class="card-title">${item.name}</h5>
                    <p class="card-text" style="font-size: 17px; font-weight: bolder;"><i>${item.description}</i></p>
                    <p class="card-text" style="font-size: 17px;">${item.price}</p>
                    <button id="products-add-cart-button" class="btn btn-primary">Add to Cart</button>
                </div>
            </div>
        </div>`;
    });

    productsTable.innerHTML = dFilteredProducts.join('');
}






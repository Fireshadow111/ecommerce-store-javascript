// second array to store items added to cart
let purchased = [];


let productsTable = document.querySelector('[data-productsCard]');

// getting product information from local storage
let products = JSON.parse(localStorage.getItem('products'));

// function to display products on the product page
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
                    <button id="products-add-cart-button" class="btn btn-primary">Add to Cart</button>
                </div>
            </div>
        </div>`;
    });

    productsTable.innerHTML = dProducts.join('');
}

// pushing the "purchased" array into local storage
function addPur(index) {
    purchased.push(products[index]);
    localStorage.setItem('purchased', JSON.stringify(purchased));
}
displayProducts();



let productsSortButton = document.getElementById('products-sort-button');

productsSortButton.addEventListener('click', function() {
  // creating a function to sort products from cheapest to most expensive
    products.sort(function(a, b) {
        // converting prices from strings to numbers in order to compare them
        let price1 = parseFloat(a.price.replace('$', ''));
        let price2 = parseFloat(b.price.replace('$', ''));
        
        if (price1 < price2) {
         // a should be shown first if -1 is returned
            return -1; 
        } else if (price1 > price2) {
            // b should be shown first if 1 is returned
            return 1; 
        } else {
            // if prices are equal there will be no change
            return 0; 
        }
    });
    displayProducts();
});




let productsSearchButton = document.getElementById('products-search-button');

productsSearchButton.addEventListener('click', function(event) {
    // preventing the default order of the products from displaying 
    event.preventDefault();
    
    // allowing the search to except lowercase case inputs by the user
    let searchInput = document.getElementById('products-search-input').value.toLowerCase()
    
    // creating a new array called "filteredProducts" and filtering through the admin array and checking find a match for the name entered
    let filteredProducts = products.filter(function(item) {
        return item.name.toLowerCase().includes(searchInput);
    });
    
    // displaying the products filtered by the search 
    displayFilteredProducts(filteredProducts);
});

// Function to display products found on the webpage
function displayFilteredProducts(filteredProducts) {
    // looping through the filtered products and dispaying it on the page
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



//Spinner

if (products.length === 0 ){
    productsTable.innerHTML = `<div id="spinner" class="spinner-border text-light" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>`
}
else{
    let dProducts = products.map(function(item, index) {
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

    productsTable.innerHTML = dProducts.join('');
}






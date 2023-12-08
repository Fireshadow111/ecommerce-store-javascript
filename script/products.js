// second array to store items added to cart
let purchased = [];

let productsTable = document.querySelector("[data-productsCard]");

// getting product information from local storage
let products = JSON.parse(localStorage.getItem("products"));

// function to display products on the product page
function displayProducts() {
  let dProducts = products.map(function (item, index) {
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

  productsTable.innerHTML = dProducts.join("");
}

let productsSortButton = document.getElementById("products-sort-button");

function sortCheap() {
  // Creating a function to sort products from cheapest to most expensive
  products.sort(function (x, y) {
    // Removing the dollar sign from the prices so that the prices can be compared properly
    let price1 = parseFloat(x.price.replace("$", ""));
    let price2 = parseFloat(y.price.replace("$", ""));

    if (price1 < price2) {
      // If price1 is less than price 2 then return -1, x should be shown first if -1 is returned
      return -1;
    } else if (price1 > price2) {
      // If price1 is more than price 2 then return 1, y should be shown first if 1 is returned
      return 1;
    } else {
      // If price1 and price2 are equal then there will not be a change
      return 0;
    }
  });

  // Calling the function to display the sorted products on the product page
  displayProducts();
}
productsSortButton.addEventListener("click", function () {
  sortCheap();
});

let productsSearchButton = document.getElementById("products-search-button");

// Function to display products found on the webpage
function findProducts(fProducts) {
  // looping through the filtered products and displaying it on the page
  let dFProducts = fProducts.map(function (item, index) {
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
  productsTable.innerHTML = fProducts.join("");
}
productsSearchButton.addEventListener("click", function (event) {
  // preventing the default layout of the products from overwriting the search result
  event.preventDefault();
  // allowing the search to accept lowercase case inputs by the user
  let search = document
    .getElementById("products-search-input")
    .value.toLowerCase();
  // creating a new array called "filteredProducts" and filtering through the admin array and checking to find a match for the name entered
  let fProducts = products.filter(function (item) {
    return item.name.toLowerCase().includes(search);
  });
  // displaying the products filtered by the search
  findProducts(fProducts);
});

//Spinner
// checking if the "products" array is empty
if (products.length === 0) {
  // If the array is empty then the spinner will display
  productsTable.innerHTML = `
        <div id="spinner" class="spinner-border text-light" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    `;
} else {
  // if there are products in the array then loop through them and display them
  let displayedProducts = products.map(function (item, index) {
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

  // setting the innerHTML of the productsTable
  productsTable.innerHTML = displayedProducts.join("");
}

// function to add products to the checkout page
function addToCart(index) {
  // get products items from local storage or initialize an empty array
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  // adding a variable to the "products" array
  let chosenProduct = products[index];
  // checking if the product is already in the cart using "findIndex" to loop throught the indexs of the products
  let itemIndex = cartItems.findIndex((item) => item.id === chosenProduct.id);

  // if the index is already in the cart then its quantity will be updated
  if (itemIndex !== -1) {
    cartItems[itemIndex].quantity += 1;
  } else {
    // creating an object and assigning properties to the product information in the "products" array
    let cartItem = {
      id: chosenProduct.id,
      name: chosenProduct.name,
      quantity: 1,
      price: chosenProduct.price,
      description: chosenProduct.description,
    };
    //pushing the object into an array
    cartItems.push(cartItem);
  }

  //setting the "cart" array in local storage
  localStorage.setItem("cart", JSON.stringify(cartItems));

  // display the updated cart products on the checkout page
  cartDisplay();
}

let addCartButtons = document.querySelectorAll("#products-add-cart-button");

// adding an event listener to every "add to cart" button using "forEach"
addCartButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    //calling the function with the index of the button clicked
    addToCart(index);
  });
});

// Error Handling

try {
  let productsSortButton = document.getElementById("products-sort-button");

  productsSortButton.addEventListener("click", function () {
    // creating a function to sort products from cheapest to most expensive
    products.sort(function (x, y) {
      // removing the dollar sign from the prices so that the numbers can be compared properly
      let price1 = parseFloat(x.price.replace("$", ""));
      let price2 = parseFloat(y.price.replace("$", ""));

      if (price1 < price2) {
        // if price1 is less than price 2 then return -1, x should be shown first if -1 is returned
        return -1;
      } else if (price1 > price2) {
        // if price1 is more than price 2 then return 1, y should be shown first if 1 is returned
        return 1;
      } else {
        // If price1 and price2 are equal then there will not be a change
        return 0;
      }
    });
    // calling the function to display the products on the admin page
    displayProductAdmin();
  });
} catch (error) {
  alert("Something went wrong");
}

try {
  let productsSearchButton = document.getElementById("products-search-button");
  // Function to display products found on the webpage
  function findProducts(fProducts) {
    // looping through the filtered products and dispaying it on the page
    let dFProducts = fProducts.map(function (item, index) {
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
    productsTable.innerHTML = dFProducts.join("");
  }

  productsSearchButton.addEventListener("click", function (event) {
    // preventing the default layout of the products from overwriting the search result
    event.preventDefault();
    // allowing the search to except lowercase case inputs by the user
    let search = document
      .getElementById("products-search-input")
      .value.toLowerCase();
    // creating a new array called "filteredProducts" and filtering through the admin array and checking find a match for the name entered
    let fProducts = products.filter(function (item) {
      return item.name.toLowerCase().includes(search);
    });
    // displaying the products filtered by the search
    findProducts(fProducts);
  });
} catch (error) {
  alert("Something went wrong");
}

try {
  // function to add products to the checkout page
  function addToCart(index) {
    // get products items from local storage or initialize an empty array
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    // adding a variable to the "products" array
    let chosenProduct = products[index];
    // checking if the product is already in the cart using "findIndex" to loop throught the indexs of the products
    let itemIndex = cartItems.findIndex((item) => item.id === chosenProduct.id);

    // if the index is already in the cart then its quantity will be updated
    if (itemIndex !== -1) {
      cartItems[itemIndex].quantity += 1;
    } else {
      // creating an object and assigning properties to the product information in the "products" array
      let cartItem = {
        id: chosenProduct.id,
        name: chosenProduct.name,
        quantity: 1,
        price: chosenProduct.price,
        description: chosenProduct.description,
      };
      //pushing the object into an array
      cartItems.push(cartItem);
    }

    //setting the "cart" array in local storage
    localStorage.setItem("cart", JSON.stringify(cartItems));

    // display the updated cart products on the checkout page
    cartDisplay();
  }

  let addCartButtons = document.querySelectorAll("#products-add-cart-button");

  // adding an event listener to every "add to cart" button using "forEach"
  addCartButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      //calling the function with the index of the button clicked
      addToCart(index);
    });
  });
} catch (error) {
  alert("Something went wrong");
}

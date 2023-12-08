//Creating array to store product objects
let products = [];

//Constructor function to create product objects
function ProductDetails(id, name, quantity, price, description, url) {
    this.id = id;
    this.name = name;
    this.quantity = quantity;
    this.price = price;
    this.description = description;
    this.url = url;
}

//Creating product objects using the constructor function
let item1 = new ProductDetails('1', 'Razer Blade 15', 1, '$2499.99', 'NVIDIA® GeForce RTX™ 40 Series Intel® Core™ i7 Processor', 'https://i.postimg.cc/9fxHD8sX/razer-laptop.jpg');
let item2 = new ProductDetails('2', 'Razer Viper V2', 1, '$149.99', 'Ultra-lightweight, Ultra-fast Wireless Esports Mouse', 'https://i.postimg.cc/g2nV9ndM/razer-mouse.jpg');
let item3 = new ProductDetails('3', 'BlackWidow Pro', 1, '$229.99', 'Mechanical Gaming Keyboard with Razer Chroma™ RGB', 'https://i.postimg.cc/QdpzT4KG/razer-keyboard.jpg');
let item4 = new ProductDetails('4', 'BlackShark V2 ', 1, '$99.99', 'Multi-platform wired esports headset', 'https://i.postimg.cc/tT96Rz8z/https-hybrismediaprod-blob-core-windows-net-sys-master-phoenix-images-container-hc0-hba-9081218236.jpg');
let item5 = new ProductDetails('5', 'Unleashed Zip Hoodie', 1, '$69.99', 'Everyday apparel thats bold in style and big on comfort', 'https://i.postimg.cc/qBDHJ5y1/razer-hoodie.jpg');
let item6 = new ProductDetails('6', 'Rogue 14 Backpack', 1, '$59.99', 'Lightweight all-weather toploader backpack', 'https://i.postimg.cc/HkdyhwbQ/razer-bag.jpg');

//Pushing the objects into the array "products"
products.push(item1, item2, item3, item4, item5, item6);

//Pushing product objects into local storage
localStorage.setItem('products', JSON.stringify(products));

//Placing the table element into a variable
let adminTable = document.querySelector('[data-adminTable]');

//function to display products on the admin page and to loop through all objects in the array
function displayProductAdmin() {
    let dPAdmin = products.map(function (item, index) {
        return `
        <tr>
            <td style="color: #44d62c; padding-top: 110px">${item.id}</td>
            <td style="color: #44d62c;"><img src ="${item.url}" width="300" height="180"></td> 
            <td style="color: #44d62c; padding-top: 110px">${item.name}</td>
            <td style="color: #44d62c; padding-top: 110px">${item.description}</td>
            <td style="color: #44d62c; padding-top: 110px">${item.price}</td>
            <td><button style="margin-top: 95px" id="admin-edit-button">Edit</button></td>
            <td><button style="margin-top: 95px" id="admin-del-button">Delete</button></td> 
        </tr>`;
    });

    // Setting inner HTML in the table to display the products
    adminTable.innerHTML = dPAdmin.join('');
}
displayProductAdmin();




// creating a function to get and set product information to and from local storage
function setting() {
    localStorage.setItem('products', JSON.stringify(products));
    products = JSON.parse(localStorage.getItem('products'));
}

// Function to delete a product from the array based on its position in the array
function remove(index) {
    products.splice(index, 1);
}

let adminDeleteButton = document.getElementById('admin-del-button');

adminTable.addEventListener('click', function(event) {
    // checking if the button has an id of "admin-del-button"
    if (event.target.id.includes('admin-del-button')) {
        // assigning the event a variable and getting the position from the buttons value attribute
        let index = event.target.value;

        // deleting the product based on it position in the array
         remove(index);
        
        // calling the function to get the updated version of the array with the deleted products
        setting();
        
        displayProductAdmin();
    }
});





let adminSortButton = document.getElementById('admin-sort-button');

adminSortButton.addEventListener('click', function() {
    // Creating a function to sort products from cheapest to most expensive
    products.sort(function(a, b) {
        // removing the dollar sign from the prices so that the numbers can be compared properly
        let price1 = parseFloat(a.price.replace('$', ''));
        let price2 = parseFloat(b.price.replace('$', ''));

        if (price1 < price2) {
            // if price1 is less than price 2 then return -1, a should be shown first if -1 is returned
            return -1;
        } else if (price1 > price2) {
            // if price1 is more than price 2 then return 1, b should be shown first if 1 is returned
            return 1;
        } else {
            // If price1 and price2 are equal then there will not be a change
            return 0;
        }
    });

    // calling the function to display the products on the admin page
    displayProductAdmin();
});





// creating a function to add new products into the "products" array 
let addButton = document.getElementById('admin-add-button');

addButton.addEventListener('click', function () {

    let modalDisplay = document.getElementById('modal-display');

    // creating the html for the modal and sending it to the position of the id "modalDisplay"
    modalDisplay.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p id="modal-i">Image URL:</p>
        <input id="url" type="text" class="form-control">
        <p id="modal-pn">Product Name:</p>
        <input id="pName" type="text" class="form-control">
        <p id="modal-d">Description</p>
        <input id="des" type="text" class="form-control">
        <p id="modal-p">Price</p>
        <input id="price" type="text" class="form-control">
      </div>
      <div class="modal-footer">
        <button id="admin-button-save" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Save</button>
        <button id="admin-button-close" type="button" class="btn btn-primary">Close</button>
      </div>
    </div>
  `;

  // Creating a save button so that the products added can be saved to local storage "products"
  let saveButton = document.getElementById('admin-button-save');
  saveButton.addEventListener('click', function () {
      let name = document.getElementById('pName').value;
      let description = document.getElementById('des').value;
      let price = document.getElementById('price').value;
      let url = document.getElementById('url').value;
  
      // Validation to ensure that that all the input tags have information inside of them
      if (name && description && price && url) {
          // Creating a new product object
          let updatedProduct = {
              id: products.length + 1,
              name: name,
              quantity: 1,
              price: `$${price}`,
              description: description,
              url: url
          };
  
          // Adding the updated products to the products array in local storage
          products.push(updatedProduct);
  
          // updating local storage with the newly created products 
          localStorage.setItem('products', JSON.stringify(products));
          
          //calling this function to display the updated array with the added products
          displayProductAdmin();
      } else {
          // An alert if the user does not fill in all the input tags
          alert("Please enter your product details");
      }
  });
});


//Adding an edit button to edit products
let editButtons = document.querySelectorAll('#admin-edit-button');
//  uding item as a prarameter to access the products in the array and index to access the position of the products in the arra
function editProduct(item, index) {
    
    let modalDisplay = document.getElementById('modal-display');

      // creating the html for the modal and sending it to the position of the id "modalDisplay"
    modalDisplay.innerHTML = `
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p id="modal-i">Image URL:</p>
            <input id="url" class="form-control" value="${item.url}"></input>
            <p id="modal-pn">Product Name:</p>
            <input id="pName" class="form-control" value="${item.name}"></input>
            <p id="modal-d">Description</p>
            <input id="des" class="form-control" value="${item.description}"></input>
            <p id="modal-p">Price</p>
            <input id="price" class="form-control" value="${item.price}"></input>
          </div>
          <div class="modal-footer">
            <button id="admin-button-save" type="button" class="btn btn-secondary">Save Changes</button>
            <button id="admin-button-close" type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
    `;
    let saveChangesButton = document.getElementById('admin-button-save');

    // adding an event listener to allow me to save the changes to the products
    saveChangesButton.addEventListener('click', function () {
        // allowing the users inputs to be accepted by the input tags
        let name = document.getElementById('pName').value;
        let description = document.getElementById('des').value;
        let price = document.getElementById('price').value;
        let url = document.getElementById('url').value;
    
        // validation to check is all fields are filled in
        if (name && description && price && url) {
            // accessing the the items in the"products" array by its index to ensure that the correct product information is returned
            products[index].name = name;
            products[index].description = description;
            // using backticks so that the dollar sign will display before the price
            products[index].price = `$${price}`;
            products[index].url = url;
            // Updating my local storage with the updated information of the products
            localStorage.setItem('products', JSON.stringify(products));
    
            //calling this function to display the updated array with the replaced product information
            displayProductAdmin();
        }
    });
}

// Using "forEach" to allow me to add the event listener to all the edit buttons without having make an event listener for each individual button
editButtons.forEach((editButton, index) => {
    editButton.addEventListener('click', () => {
        // calling the function and accessing the product where the edit button is clicked via its index, and accessing the product in the array via its index
        editProduct(products[index], index);
    });
});




// function closeModal() {
//     // Close the modal without saving changes
//     let editModal = new bootstrap.Modal(document.getElementById('modal-display'));
//     editModal.hide();
// }

// closeModal()

// // Get the "Close" button element by its ID
// let closeButton = document.getElementById('admin-button-close');

// // Add a click event listener to the "Close" button
// closeButton.addEventListener('click', closeModal);





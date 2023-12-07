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

//Function to display products on the admin page and to loop through all objects in the array
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




// creating a function to get product information from local storage
function setting() {
    localStorage.setItem('products', JSON.stringify(products));
    products = JSON.parse(localStorage.getItem('products'));
}

// Function to remove a product from the array
function remove(position) {
    products.splice(position, 1);
}



let adminDeleteButton = document.getElementById('admin-del-button');

adminTable.addEventListener('click', function(event) {
    // checking if the button has an id of "admin-del-button"
    if (event.target.id.includes('admin-del-button')) {
        // assigning the event a variable and getting the position from the buttons value attribute
        let position = event.target.value;
        
        remove(position);
        // Saving the updated position to local storage
        setting();
        
        // Display the updated products on the admin page
        displayProductAdmin();
    }
});





let addButton = document.getElementById('admin-add-button');
addButton.addEventListener('click', function () {
    let addNew = document.getElementById('modal-display');
    addNew.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p id= "modal-i">Image URL:</p>
        <input id="url" display = text class="form-control"></input>
        <p id= "modal-pn">Product Name:</p>
        <input id="pName" display = text class="form-control"></input>
        <p id= "modal-d">Description</p>
        <input id="des" display = text class="form-control"></input>
        <p id= "modal-p">Price</p>
        <input id="price" display = text class="form-control"></input>
      </div>
      <div class="modal-footer">
        <button id= "admin-button-save" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Save</button>
        <button id= "admin-button-close" type="button" class="btn btn-primary">Close</button>
      </div>
    </div>
  `;

    let saveButton = document.getElementById('admin-button-save');
    saveButton.addEventListener('click', function () {
        // Retrieve values from the input fields
        let imageUrl = document.getElementById('url').value;
        let productName = document.getElementById('pName').value;
        let description = document.getElementById('des').value;
        let price = document.getElementById('price').value;

        // Validate input
        if (imageUrl && productName && description && price) {
            // Create a new ProductDetails object
            const newProduct = new ProductDetails(products.length + 1, productName, 1, `$${price}`, description, imageUrl);

            // Add the new item to the products array
            products.push(newProduct);

            // Update local storage
            localStorage.setItem('products', JSON.stringify(products));

            // Display the updated products on the admin page
            displayProductAdmin();

        } else {
            // Alert the user about invalid input
            alert("Invalid input. Please provide all required information.");
        }
      
});
    });
    

    // Change the button id to a class for the edit buttons
let editButtons = document.querySelectorAll('#admin-edit-button');

editButtons.forEach((butEd, index) => {
    butEd.addEventListener('click', () => {
        editModal(products[index], index); // Pass the item and its index for editing
    });
});

function editModal(item, index) {
    document.getElementById('modal-display').innerHTML = `
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p id= "modal-i">Image URL:</p>
            <input id="url" class="form-control" value="${item.url}"></input>
            <p id= "modal-pn">Product Name:</p>
            <input id="pName" class="form-control" value="${item.name}"></input>
            <p id= "modal-d">Description</p>
            <input id="des" class="form-control" value="${item.description}"></input>
            <p id= "modal-p">Price</p>
            <input id="price" class="form-control" value="${item.price.replace('$', '')}"></input>
          </div>
          <div class="modal-footer">
            <button id="admin-button-save" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Save</button>
            <button id="admin-button-close" type="button" class="btn btn-primary">Close</button>
          </div>
        </div>
    `;

    let eItem = new bootstrap.Modal(document.getElementById('modal-display'));
    eItem.show();

    document.getElementById('admin-button-save').addEventListener('click', function () {
        // Retrieve updated values from the input fields
        let imageUrl = document.getElementById('url').value;
        let productName = document.getElementById('pName').value;
        let description = document.getElementById('des').value;
        let price = document.getElementById('price').value;
    
        // Validate input
        if (imageUrl && productName && description && price) {
            // Update the product details
            products[index].url = imageUrl;
            products[index].name = productName;
            products[index].description = description;
            products[index].price = `$${price}`;
    
            // Update local storage
            localStorage.setItem('products', JSON.stringify(products));
    
            // Display the updated products on the admin page
            displayProductAdmin();
    
            // Close the modal
            eItem.hide();
        } else {
            // Alert the user about invalid input
            alert("Invalid input. Please provide all required information.");
        }
    });
}



let adminSortButton = document.getElementById('admin-sort-button');

adminSortButton.addEventListener('click', function() {
    // Creating a function to sort products from cheapest to most expensive
    products.sort(function(a, b) {
        // Converting prices from strings to numbers in order to compare them
        let price1 = parseFloat(a.price.replace('$', ''));
        let price2 = parseFloat(b.price.replace('$', ''));

        if (price1 < price2) {
            // a should be shown first if -1 is returned
            return -1;
        } else if (price1 > price2) {
            // b should be shown first if 1 is returned
            return 1;
        } else {
            // If prices are equal there will be no change
            return 0;
        }
    });

    // Display the sorted products on the admin page
    displayProductAdmin();
});





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
let item5 = new ProductDetails('5', 'Unleashed Zip Hoodie', 1, '$69.99', 'Everyday apparel that\'s bold in style and big on comfort', 'https://i.postimg.cc/qBDHJ5y1/razer-hoodie.jpg');
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


// function addButtonAdmin() {
//     let name = prompt("Enter the product name:");
//     let quantity = parseInt(prompt("Enter the product quantity:"));
//     let price = prompt("Enter the product price:");
//     let description = prompt("Enter the product description:");
//     let url = prompt("Enter the product image URL:");

//     // Validate the input
//     if (name && !isNaN(quantity) && price && description && url) {
//         // Call the addProduct function with the provided values for admin page
//         AddProductAdmin(name, quantity, price, description, url);

//         // Call the addProduct function with the provided values for product page
//         AddProductProducts(name, quantity, price, description, url);
//     } else {
//         // Alert the user about invalid input
//         alert("Invalid input. Please provide all required information.");
//     }
// }

// // Function to add a new product to admin
// function AddProductAdmin(name, quantity, price, description, url) {
//     // Creating an object
//     const newProduct = new ProductDetails(products.length + 1, name, quantity, price, description, url);

//     // Adding the new item to the products array
//     products.push(newProduct);

//     // Updating local storage
//     setting();

//     // Displaying the updated products on the admin page
//     displayProductAdmin();
// }

// let adminAddButton = document.getElementById('admin-add-button');

// adminAddButton.addEventListener('click', addButtonAdmin);


let addButton = document.getElementById('admin-add-button');
addButton.addEventListener('click',function(){
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
})

function modalDisplay(){
    let url = document.getElementById('url').value;
    let name = document.getElementById('pName').value;
    let description = document.getElementById('des').value;
    let price = document.getElementById('price').value;


    if (name && !isNaN && price && description && url) {
           // Call the addProduct function with the provided values for admin page
              AddProductAdmin(url,name, description, price );
        
            // Call the addProduct function with the provided values for product page
             AddProductProducts(url,name, description, price );;
            } else {
                // Alert the user about invalid input
            alert("Invalid input");
            }
         }



         function AddProductAdmin(url, name, description, price,) {
                // Creating an object
                let newProduct = new ProductDetails(products.length + 1, url, name, description, price,);
            
                // Adding the new item to the products array
                products.push(newProduct);
            
                 // Updating local storage
                 setting();
            
                // Displaying the updated products on the admin page
                displayProductAdmin();
            }
            
             let adminAddButton = document.getElementById('admin-button-save');
            
             adminAddButton.addEventListener('click', modalDisplay);

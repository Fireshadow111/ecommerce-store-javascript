//Array
let products = [];

//Creating constructor function
function ProductDetails(id, name, quantity,price, description, url){
    this.id=id;
    this.name = name,
    this.quantity=quantity,
    this.price=price
    this.description = description;
    this.url = url;
   
}

//Making objects with constructor function
let item1 = new ProductDetails('1','Razer Blade 15', 1, '$2499.99', 'NVIDIA® GeForce RTX™ 40 Series Intel® Core™ i7 Processor', 'https://i.postimg.cc/9fxHD8sX/razer-laptop.jpg' )

let item2 = new ProductDetails('2','Razer Viper V2', 1, '$149.99', 'Ultra-lightweight, Ultra-fast Wireless Esports Mouse','https://i.postimg.cc/g2nV9ndM/razer-mouse.jpg')

let item3 = new ProductDetails('3','Razer BlackWidow Pro', 1, '$229.99', 'Mechanical Gaming Keyboard with Razer Chroma™ RGB', 'https://i.postimg.cc/QdpzT4KG/razer-keyboard.jpg' )
let item4 = new ProductDetails('4','Razer BlackShark V2 ', 1, '$99.99', 'Multi-platform wired esports headset','https://i.postimg.cc/tT96Rz8z/https-hybrismediaprod-blob-core-windows-net-sys-master-phoenix-images-container-hc0-hba-9081218236.jpg')

let item5 = new ProductDetails('5','Razer Unleashed Zip Hoodie', 1, '$69.99', 'Everyday apparel thats bold in style and big on comfort', 'https://i.postimg.cc/qBDHJ5y1/razer-hoodie.jpg')

let item6 = new ProductDetails('6','Razer Rogue 14 Backpack', 1, '$59.99','Lightweight all-weather toploader backpack', 'https://i.postimg.cc/HkdyhwbQ/razer-bag.jpg')


//Pusing objects into array
products.push(item1, item2, item3, item4, item5, item6)

//Storing objects into local storage
localStorage.setItem('products', JSON.stringify(products))


//Setting table element to a variable
let adminTable = document.querySelector('[data-adminTable]')


//Function to display product details in a table on the admin page
function displayProductAdmin() {
    let dPAdmin = products.map(function(item, index) {

        return `
        <tr>
        <td style = "color: #44d62c; padding-top: 110px">${item.id}</td>
        <td style = "color: #44d62c;"><img src ="${item.url}" width = "300" height = "180"></td> 
        <td style = "color: #44d62c; padding-top: 110px">${item.name}</td>
        <td style = "color: #44d62c; padding-top: 110px">${item.description}</td>
        <td style = "color: #44d62c; padding-top: 110px">${item.price}</td>
        <td><button style = "margin-top: 95px" id = "admin-edit-button">Edit</button></td>
        <td><button style = "margin-top: 95px" id = "admin-del-button">Delete</button></td> 
        </tr>
        
        
        `

    }) 
    adminTable.innerHTML = dPAdmin.join('')
}
displayProductAdmin()




//Delete button
function setting(){
    localStorage.setItem('products',JSON.stringify(products))
    products = JSON.parse(localStorage.getItem('products'))
}


function remove(position){
    products.splice(position, 1)

}

let adminDeleteButton = document.getElementById('admin-del-button')


adminTable.addEventListener('click', function(event) {
    if (event.target.id.includes('admin-del-button')) {
        let position = event.target.value;
        remove(position);
        setting();
        displayProductAdmin();
    }
});




// Function to handle the "Add" button click
function handleAddButtonClick() {
    // For demonstration purposes, you can prompt the user for new product details
    const name = prompt("Enter the product name:");
    const quantity = parseInt(prompt("Enter the product quantity:"));
    const price = prompt("Enter the product price:");
    const description = prompt("Enter the product description:");
    const url = prompt("Enter the product image URL:");

    // Validate the input
    if (name && !isNaN(quantity) && price && description && url) {
        // Call the addProduct function with the provided values for admin page
        addProductToAdmin(name, quantity, price, description, url);

        // Call the addProduct function with the provided values for product page
        addProductToProducts(name, quantity, price, description, url);
    } else {
        alert("Invalid input. Please provide all required information.");
    }
}

// Function to add a new product to the admin page
function addProductToAdmin(name, quantity, price, description, url) {
    // Create a new ProductDetails object
    const newItem = new ProductDetails(products.length + 1, name, quantity, price, description, url);

    // Add the new item to the products array
    products.push(newItem);

    // Update local storage
    setting();

    // Display the updated products on the admin page
    displayProductAdmin();
}

// Function to add a new product to the products page
function addProductToProducts(name, quantity, price, description, url) {
    // Assume you have a similar display function for the products page, let's call it displayProducts
    // This function should be responsible for updating the product page with the new item
    // For example, you can call displayProducts() here to refresh the products on the product page
    // displayProducts();
}

// Event listener for the "Add" button in the admin page
let adminAddButton = document.getElementById('admin-add-button');

adminAddButton.addEventListener('click', handleAddButtonClick);

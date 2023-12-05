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
        <td><button style = "margin-top: 95px" id = "admin-add-button">Add</button></td>
        <td><button style = "margin-top: 95px" id = "admin-del-button">Delete</button></td> 
        </tr>
        
        
        `

    }) 
    adminTable.innerHTML = dPAdmin.join('')
}
displayProductAdmin()


function remove(position){
    products.splice(position, 1)

}

function favorite(){
    localStorage.setItem('products',JSON.stringify(products))
    //sets the array from local storage to the array(items) in code
    products = JSON.parse(localStorage.getItem('products'))
}

let adminDeleteButton = document.getElementById('admin-delete-button')

adminDeleteButton.addEventListener('click', function(){
    if(event.target.id.contains('admin-delete-button')){
        remove(event.target.value)
     
    }
})

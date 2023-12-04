let products = [];

function ProductDetails(name, quantity,price){
    this.id=id;
    this.name = name,
    this.quantity=quantity,
    this.price=price
    this.description = description;
    this.url = url;
   
}

let item1 = new ProductDetails('Razer Blade 15', 1, '$2499.99', )

let item2 = new ProductDetails('Razer Viper V2', 1, '$149.99')
let item3 = new ProductDetails('Razer BlackWidow', 1, '$229.99')
let item4 = new ProductDetails('Razer BlackShark V2 ', 1, '$99.99')
let item5 = new ProductDetails('Razer Unleashed Zip Hoodie', 1, '$69.99')
let item6 = new ProductDetails('Razer Rogue 14 Backpack', 1, '$59.99')

products.push(item1, item2, item3, item4, item5, item6)

localStorage.setItem('products', JSON.stringify(products))


let adminTable = document.getElementById('adminTable')

function displayProductAdmin() {
    let dAProducts = products.map(function(item, index) {

        return `
        
        <tr>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>R${item.price}</td>
        
        </tr>
        
        
        `

    })
    dAProducts.innerHTML.join('')
}

productTable.style.color = 'white';
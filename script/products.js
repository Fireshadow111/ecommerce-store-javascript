let purchased = []

let productsTable = document.querySelector('[data-productsTable]')


let products = JSON.parse(localStorage.getItem('products'))


function displayProducts() {

    let dProducts = products.map(function(item, index) {

        return `
        
        <tr>
        <td><img src ='${item.url}'</td>
        <td style = "color: #44d62c">${item.name}</td>
        <td style = "color: #44d62c">${item.quantity}</td>
        <td style = "color: #44d62c">${item.description}</td>
        <td style = "color: #44d62c">${item.price}</td>
        <td><button class = "addCartButton">Add to Cart</button></td>
        </tr>
        `
    

})
productsTable.innerHTML = dProducts.join('')

}
displayProducts()
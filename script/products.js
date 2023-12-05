let purchased = []

let productsTable = document.querySelector('[data-productsCard]')


let products = JSON.parse(localStorage.getItem('products'))


function displayProducts() {

    let dProducts = products.map(function(item, index) {

        return `
        <div class="col-md-4 my-5">
        <div class="card" style="width: 18rem;">
        <img src="${item.url}" class="card-img-top" alt="">
        <div class="card-body">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text">${item.description}</p>
            <p class="card-text">Quantity: ${item.quantity}</p>
            <p class="card-text" style="color: #44d62c;">Price: ${item.price}</p>
            <button class="btn btn-primary addCartButton">Add to Cart</button>
        </div>
    </div>
    </div>
        `
    

})
productsTable.innerHTML = dProducts.join('')

}
displayProducts()








// function displayProducts() {

//     let dProducts = products.map(function(item, index) {

//         return `
        
//         <tr>
//         <td><img width = "500px" height = "350px" src ='${item.url}'</td>
//         <td class = "tableData" style = "color: #44d62c">${item.name}</td>
//         <td class style = "color: #44d62c">${item.quantity}</td>
//         <td style = "color: #44d62c">${item.description}</td>
//         <td style = "color: #44d62c">${item.price}</td>
//         <td><button class = "addCartButton">Add to Cart</button></td>
//         </tr>
//         `
    

// })
// productsTable.innerHTML = dProducts.join('')

// }
// displayProducts()
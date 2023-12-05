let purchased = []

let productsTable = document.querySelector('[data-productsCard]')


let products = JSON.parse(localStorage.getItem('products'))


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
            <button id = "products-add-cart-button" class="btn btn-primary">Add to Cart</button>
        </div>
    </div>
    </div>
        `
    

})
productsTable.innerHTML = dProducts.join('')

}
displayProducts()







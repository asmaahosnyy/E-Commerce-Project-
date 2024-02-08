const modal = document.getElementById('productModal');
const closeButton = document.querySelector('.close');
closeButton.addEventListener('click', closeProductDetails);
window.addEventListener('click', function(event) {
    if (event.target === modal) {
        closeProductDetails();
    }
});
const productsContainer = document.querySelector('.pro');
const cartTab = document.getElementById('cartTab');
const shoppingCartBtn = document.getElementById('shoppingCart');
const closeCartBtn = document.querySelector('.closeCart');

shoppingCartBtn.addEventListener('click', toggleCart);
closeCartBtn.addEventListener('click', toggleCart);

fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
        data.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            let titleWords = product.title.split(' ');
            let truncatedTitle = titleWords.slice(0, 5).join(' ');
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.title}" onclick="openProductDetails(${product.id})">
                <h3>${truncatedTitle} <snap style="color: #b5b1b1;">&nbsp;more...</snap></h3>
                <p>$${product.price}</p>
                <div class="stars">
                    <i class="fa-solid fa-star" style="color: #FFD43B;"></i>               
                    <i class="fa-solid fa-star" style="color: #FFD43B;"></i>           
                    <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                </div>
                <button class="add-to-cart">Add to Cart</button>
            `;
            const addToCartBtn = productCard.querySelector('.add-to-cart');
            addToCartBtn.addEventListener('click', function() {
                addToCart(product, 1);
            });
            productsContainer.appendChild(productCard);
        });
    })
    .catch(error => console.error('Error fetching products:', error));

function toggleCart() {
    cartTab.style.inset = cartTab.style.inset === '0px -500px 0px auto' ? '0px 0px 0px auto' : '0px -500px 0px auto';
}

function addToCart(product, quantity) {
    let cart = getCart();
    let productInCart = cart.find((item) => item.id === product.id);
    if (productInCart) {
        productInCart.quantity += quantity;
    } else {
        cart.push({...product, quantity: quantity });
    }

    // Store updated cart in localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItem();
}

function displayCartItem() {
    cart = getCart();
    let cartItemsHTML = ''; // Initialize an empty string to store cart item HTML
    cart.forEach((item) => {
        cartItemsHTML += `
            <tr class="cartItem" id="${item.id}">
                <td><img src="${item.image}" alt="${item.title}" style="width: 50px;"></td>
                <td>${item.title}</td>
                <td class="quantity">
                    <input type="number" min="1" value="${item.quantity}">
                </td>
                <td>$${item.price}</td>
                <td>
                    <button class="removeItem" name="${item.id}"><i class="fa-solid fa-trash" style="color: #99beae;"></i></button>
                </td>
            </tr>`;
    });

    // Append the generated cart items HTML to the cart container
    document.querySelector("#cartItems").innerHTML = cartItemsHTML;

    // Attach event listeners to remove buttons
    let deleteFromCart = Array.from(document.querySelectorAll('.removeItem'));
    deleteFromCart.forEach((button) => button.addEventListener('click', () => {
        removeCartItem(button.name);
    }));

    // Update cart count
    let count = cart.reduce((acc, item) => acc + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;


}

function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function removeCartItem(id) {
    let cart = getCart();
    let itemIndex = cart.findIndex((item) => String(item.id) === String(id));
    if (itemIndex > -1) {
        cart.splice(itemIndex, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItem();
}

function calculateTotal() {
    const cartItems = document.querySelectorAll('.cartItem');
    let total = 0;
    cartItems.forEach(cartItem => {
        const quantity = parseInt(cartItem.querySelector('.quantity input').value);
        const price = parseFloat(cartItem.querySelector('td:nth-child(4)').textContent.replace('$', ''));
        total += quantity * price;
    });
    return total.toFixed(2);
}

function updateTotal() {
    const total = calculateTotal();
    // document.getElementById('totalAmount').textContent = `$${total}`;
}
document.getElementById('cartItems').addEventListener('input', function(event) {
    if (event.target.tagName === 'INPUT') {
        updateTotal();
    }
});
document.querySelector('.checkOut').addEventListener('click', function() {
    const totalPrice = calculateTotal();
    document.getElementById('checkoutTotalAmount').textContent = `Total Price: $${totalPrice}`;
    $('#checkoutAlertModal').modal('show'); // Show Bootstrap modal
    toggleCart();
});
updateTotal();



// =========
function openProductDetails(productId) {
    fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(response => response.json())
        .then(product => {
            const productDetailsContainer = document.getElementById('productDetails');

            productDetailsContainer.innerHTML = `
                <img class="product-image" src="${product.image}" alt="${product.title}">
                <div class="product-details">
                    <h2>${product.title}</h2>
                    <p><span>Price:</span> <br> $${product.price}</p>
                    <p><span>Description:</span> <br> ${product.description}</p>
                    <p><span>Category:</span> <br> ${product.category}</p>
                    <p><span>Rate:</span> <br> ${product.rating.rate} <br>
                    (${product.rating.count} votes)</p>
                </div>
            `;
            document.getElementById('productModal').style.display = 'block';
        })
        .catch(error => console.error('Error fetching product details:', error));
}

function closeProductDetails() {
    document.getElementById('productModal').style.display = 'none';
}





// //ScrollButton 
let mybutton = document.getElementById("scrollBtn");

window.onscroll = function() { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

mybutton.addEventListener("click", function() {
    topFunction();
});

function topFunction() {
    // document.body.scrollTop = 0;
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

(function() {
    cart = getCart();
    let count = cart.reduce((acc, item) => acc + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
    displayCartItem();

})();
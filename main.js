// Slider 
const slides = [
    { image: '/img/slider/img5.jpg', caption: '' },
    { image: '/img/slider/img1.png', caption: 'Explore our exclusive sale items for a limited time!' },
    { image: '/img/slider/img2.jpg', caption: 'Discover the Latest Trends' },
    { image: '/img/slider/img3.jpg', caption: 'Elevate Your Style' },
];

let slideIndex = 0;
let slideInterval;

function updateSliderBackground() {
    const sliderContainer = document.getElementById('slider-container');
    sliderContainer.style.backgroundImage = `url(${slides[slideIndex].image})`;
}

function updateSlideContent() {
    const slideContent = slides[slideIndex];
    const slide = document.querySelector('#slider .slide');
    slide.innerHTML = `
        <h4>${slideContent.caption}</h4>
        <h1>WELCOME TO Our <br>E-SHOPPING STORE</h1>
        <p>Get the best deals on your favorite products</p>
        <button class="btn">Shop Now</button>
    `;
    // slide.style.opacity = 1;
}

function showSlide() {
    updateSliderBackground();
    updateSlideContent();
}

function nextSlide() {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide();
}

function prevSlide() {
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    showSlide();
}

function startSlideShow() {
    slideInterval = setInterval(nextSlide, 1000);
}

function stopSlideShow() {
    clearInterval(slideInterval);
}
showSlide();

document.getElementById('prevBtn').addEventListener('click', () => {
    stopSlideShow();
    prevSlide();
});
document.getElementById('nextBtn').addEventListener('click', () => {
    stopSlideShow();
    nextSlide();
});
startSlideShow();
//============================================================
//Showing some of prodcuct in home page
document.addEventListener("DOMContentLoaded", function() {
    const productsContainer = document.querySelector('.pro');
    const showMoreBtn = document.getElementById('showMoreBtn');

    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            data.slice(0, 8).forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');
                let titleWords = product.title.split(' ');
                let truncatedTitle = titleWords.slice(0, 5).join(' ');
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.title}" onclick="openProduct(${product.id})">
                    <h3>${truncatedTitle}</h3>
                    <p>$${product.price}</p>
                    <div class="stars">
                        <i class="fa-solid fa-star" style="color: #FFD43B;"></i>               
                        <i class="fa-solid fa-star" style="color: #FFD43B;"></i>           
                        <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
                    </div>
                `;
                productsContainer.appendChild(productCard);
            });
            showMoreBtn.addEventListener('click', function() {
                window.location.href = 'shop.html';
            });
        })
        .catch(error => console.error('Error fetching products:', error));
});

function openProduct(productId) {
    window.location.href = `shop.html?id=${productId}`;
}

function addToCart(productId) {
    console.log(`Adding product with ID ${productId} to cart...`);

    var cartItems = JSON.parse(localStorage.getItem('shopping-cart')) || [];

    var existingItemIndex = cartItems.findIndex(item => {
        return JSON.parse(item).productId === productId;
    });

    if (existingItemIndex !== -1) {
        var existingItem = JSON.parse(cartItems[existingItemIndex]);
        existingItem.quantity++;
        cartItems[existingItemIndex] = JSON.stringify(existingItem);
    } else {
        var newItem = {
            productId: productId,
            quantity: 1
        };
        cartItems.push(JSON.stringify(newItem));
    }

    updateCartCount();

    localStorage.setItem('shopping-cart', JSON.stringify(cartItems));
}

function updateCartCount() {
    var cartItems = JSON.parse(localStorage.getItem('shopping-cart')) || [];

    var totalCount = cartItems.reduce((total, item) => {
        return total + JSON.parse(item).quantity;
    }, 0);

    var cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = totalCount;
    }
}



//============================================================


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
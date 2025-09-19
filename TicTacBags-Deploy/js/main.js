// TicTacBags - Main JavaScript File

// Global Variables
let cart = JSON.parse(localStorage.getItem('tictacbags_cart')) || [];
let products = [];
let brands = [];
let orders = JSON.parse(localStorage.getItem('tictacbags_orders')) || [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    loadProducts();
    loadBrands();
    updateCartUI();
    
    // Load page-specific content
    const page = getCurrentPage();
    switch(page) {
        case 'index':
            loadLatestProducts();
            loadFeaturedProducts();
            loadFeaturedBrands();
            break;
        case 'products':
            loadAllProducts();
            break;
        case 'cart':
            loadCartPage();
            break;
        case 'product-detail':
            loadProductDetail();
            break;
        case 'checkout':
            loadCheckoutPage();
            break;
    }
}

function getCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split('/').pop() || 'index.html';
    
    if (filename.includes('product-detail')) return 'product-detail';
    if (filename === 'products.html') return 'products';
    if (filename === 'cart.html') return 'cart';
    if (filename === 'checkout.html') return 'checkout';
    if (filename === 'about.html') return 'about';
    if (filename === 'contact.html') return 'contact';
    return 'index';
}

// Sample Data
function loadProducts() {
    // Load from localStorage or use default data
    const storedProducts = localStorage.getItem('tictacbags_products');
    if (storedProducts) {
        products = JSON.parse(storedProducts);
    } else {
        products = [
            {
                id: 1,
                title: "Premium Leather Backpack",
                category: "Backpacks",
                brand: "TicTac Premium",
                price: 8999,
                image: "https://via.placeholder.com/300x300/007bff/ffffff?text=Leather+Backpack",
                description: "High-quality leather backpack perfect for work and travel. Features multiple compartments and laptop sleeve.",
                featured: true,
                active: true,
                latest: true
            },
            {
                id: 2,
                title: "Designer Handbag",
                category: "Handbags",
                brand: "Fashion Forward",
                price: 12499,
                image: "https://via.placeholder.com/300x300/28a745/ffffff?text=Designer+Handbag",
                description: "Elegant designer handbag crafted with premium materials. Perfect for special occasions and daily use.",
                featured: true,
                active: true,
                latest: false
            },
            {
                id: 3,
                title: "Travel Duffel Bag",
                category: "Travel Bags",
                brand: "Adventure Pro",
                price: 6799,
                image: "https://via.placeholder.com/300x300/ffc107/ffffff?text=Travel+Duffel",
                description: "Spacious travel duffel bag with wheels and telescopic handle. Ideal for weekend trips and vacations.",
                featured: false,
                active: true,
                latest: true
            },
            {
                id: 4,
                title: "Professional Laptop Bag",
                category: "Laptop Bags",
                brand: "TechCarry",
                price: 4599,
                image: "https://via.placeholder.com/300x300/dc3545/ffffff?text=Laptop+Bag",
                description: "Protective laptop bag with padded compartments. Fits laptops up to 15.6 inches.",
                featured: false,
                active: true,
                latest: true
            },
            {
                id: 5,
                title: "Casual Canvas Tote",
                category: "Tote Bags",
                brand: "Casual Co.",
                price: 2999,
                image: "https://via.placeholder.com/300x300/6c757d/ffffff?text=Canvas+Tote",
                description: "Versatile canvas tote bag perfect for shopping, beach trips, and everyday use.",
                featured: true,
                active: true,
                latest: false
            },
            {
                id: 6,
                title: "Sports Gym Bag",
                category: "Sports Bags",
                brand: "FitActive",
                price: 3999,
                image: "https://via.placeholder.com/300x300/17a2b8/ffffff?text=Gym+Bag",
                description: "Durable sports bag with separate shoe compartment and water bottle holder.",
                featured: false,
                active: true,
                latest: true
            }
        ];
        localStorage.setItem('tictacbags_products', JSON.stringify(products));
    }
}

function loadBrands() {
    const storedBrands = localStorage.getItem('tictacbags_brands');
    if (storedBrands) {
        brands = JSON.parse(storedBrands);
    } else {
        brands = [
            { id: 1, name: "TicTac Premium", logo: "https://via.placeholder.com/150x80/333/ffffff?text=TicTac+Premium", active: true },
            { id: 2, name: "Fashion Forward", logo: "https://via.placeholder.com/150x80/333/ffffff?text=Fashion+Forward", active: true },
            { id: 3, name: "Adventure Pro", logo: "https://via.placeholder.com/150x80/333/ffffff?text=Adventure+Pro", active: true },
            { id: 4, name: "TechCarry", logo: "https://via.placeholder.com/150x80/333/ffffff?text=TechCarry", active: true },
            { id: 5, name: "Casual Co.", logo: "https://via.placeholder.com/150x80/333/ffffff?text=Casual+Co", active: true },
            { id: 6, name: "FitActive", logo: "https://via.placeholder.com/150x80/333/ffffff?text=FitActive", active: true }
        ];
        localStorage.setItem('tictacbags_brands', JSON.stringify(brands));
    }
}

// Product Display Functions
function loadLatestProducts() {
    const latestContainer = document.getElementById('latestProducts');
    if (!latestContainer) return;

    const latestProducts = products.filter(p => p.latest && p.active).slice(0, 8);
    latestContainer.innerHTML = '';

    latestProducts.forEach(product => {
        const productCard = createProductCard(product);
        latestContainer.appendChild(productCard);
    });
}

function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featuredProducts');
    if (!featuredContainer) return;

    const featuredProducts = products.filter(p => p.featured && p.active).slice(0, 8);
    featuredContainer.innerHTML = '';

    featuredProducts.forEach(product => {
        const productCard = createProductCard(product);
        featuredContainer.appendChild(productCard);
    });
}

function loadFeaturedBrands() {
    const brandsContainer = document.querySelector('#brandsCarousel .carousel-inner');
    if (!brandsContainer) return;

    const activeBrands = brands.filter(b => b.active);
    brandsContainer.innerHTML = '';

    // Split brands into groups of 4 for carousel items
    for (let i = 0; i < activeBrands.length; i += 4) {
        const brandGroup = activeBrands.slice(i, i + 4);
        const carouselItem = document.createElement('div');
        carouselItem.className = i === 0 ? 'carousel-item active' : 'carousel-item';
        
        const row = document.createElement('div');
        row.className = 'row text-center';
        
        brandGroup.forEach(brand => {
            const col = document.createElement('div');
            col.className = 'col-6 col-md-3 mb-3';
            col.innerHTML = `<img src="${brand.logo}" class="img-fluid brand-logo" alt="${brand.name}">`;
            row.appendChild(col);
        });
        
        carouselItem.appendChild(row);
        brandsContainer.appendChild(carouselItem);
    }
}

function createProductCard(product) {
    const col = document.createElement('div');
    col.className = 'col-lg-3 col-md-4 col-sm-6 mb-4';
    
    col.innerHTML = `
        <div class="card product-card h-100">
            <img src="${product.image}" class="card-img-top" alt="${product.title}">
            <div class="card-body d-flex flex-column">
                <h6 class="product-title">${product.title}</h6>
                <p class="text-muted small mb-2">${product.brand}</p>
                <div class="product-price">Rs ${product.price.toLocaleString()}</div>
                <div class="product-actions mt-auto">
                    <button class="btn btn-outline-primary btn-sm" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-cart me-1"></i>Add to Cart
                    </button>
                    <button class="btn btn-primary btn-sm" onclick="shopNow(${product.id})">Shop Now</button>
                </div>
            </div>
        </div>
    `;
    
    // Add click event to card (excluding buttons)
    col.querySelector('.card').addEventListener('click', function(e) {
        if (!e.target.closest('.product-actions')) {
            window.location.href = `product-detail.html?id=${product.id}`;
        }
    });
    
    return col;
}

// Cart Functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartUI();
    showNotification('Product added to cart!', 'success');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
    loadCartPage(); // Refresh cart page if we're on it
}

function updateCartQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item && quantity > 0) {
        item.quantity = quantity;
        saveCart();
        updateCartUI();
    }
}

function saveCart() {
    localStorage.setItem('tictacbags_cart', JSON.stringify(cart));
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    const cartItems = document.getElementById('cartItems');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    if (cartCount) cartCount.textContent = totalItems;
    if (cartTotal) cartTotal.textContent = totalPrice.toLocaleString();
    
    if (cartItems) {
        cartItems.innerHTML = '';
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="text-center text-muted">Your cart is empty</p>';
        } else {
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.title}">
                    <div class="cart-item-info">
                        <div class="cart-item-title">${item.title}</div>
                        <div class="cart-item-price">Rs ${item.price.toLocaleString()} x ${item.quantity}</div>
                    </div>
                    <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-times"></i>
                    </button>
                `;
                cartItems.appendChild(cartItem);
            });
        }
    }
}

function toggleCart() {
    const slidingCart = document.getElementById('slidingCart');
    const overlay = document.getElementById('cartOverlay');
    
    if (slidingCart && overlay) {
        slidingCart.classList.toggle('open');
        overlay.classList.toggle('show');
    }
}

function shopNow(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    // Add to cart first
    addToCart(productId);
    
    // Redirect to checkout
    setTimeout(() => {
        window.location.href = 'checkout.html';
    }, 500);
}

// Search Functions
function searchProducts() {
    const searchTerm = document.getElementById('searchInput').value.trim();
    if (searchTerm) {
        window.location.href = `products.html?search=${encodeURIComponent(searchTerm)}`;
    }
}

function searchProductsMobile() {
    const searchTerm = document.getElementById('mobileSearchInput').value.trim();
    if (searchTerm) {
        window.location.href = `products.html?search=${encodeURIComponent(searchTerm)}`;
    }
}

// Products Page Functions
function loadAllProducts() {
    const productsContainer = document.getElementById('productsContainer');
    if (!productsContainer) return;

    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('search');
    const category = urlParams.get('category');
    
    let filteredProducts = products.filter(p => p.active);
    
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(p => 
            p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    if (category) {
        filteredProducts = filteredProducts.filter(p => p.category === category);
    }
    
    productsContainer.innerHTML = '';
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsContainer.appendChild(productCard);
    });
    
    if (filteredProducts.length === 0) {
        productsContainer.innerHTML = '<div class="col-12"><p class="text-center text-muted">No products found.</p></div>';
    }
}

// Cart Page Functions
function loadCartPage() {
    const cartTableBody = document.getElementById('cartTableBody');
    const cartSummary = document.getElementById('cartSummary');
    
    if (!cartTableBody) return;
    
    cartTableBody.innerHTML = '';
    
    if (cart.length === 0) {
        cartTableBody.innerHTML = `
            <tr>
                <td colspan="5" class="text-center py-5">
                    <p class="text-muted mb-3">Your cart is empty</p>
                    <a href="products.html" class="btn btn-primary">Continue Shopping</a>
                </td>
            </tr>
        `;
    } else {
        cart.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <div class="d-flex align-items-center">
                        <img src="${item.image}" alt="${item.title}" width="60" height="60" class="rounded me-3">
                        <div>
                            <h6 class="mb-0">${item.title}</h6>
                        </div>
                    </div>
                </td>
                <td>Rs ${item.price.toLocaleString()}</td>
                <td>
                    <div class="quantity-controls">
                        <button onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <input type="number" value="${item.quantity}" min="1" onchange="updateCartQuantity(${item.id}, parseInt(this.value))">
                        <button onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                </td>
                <td>Rs ${(item.price * item.quantity).toLocaleString()}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            cartTableBody.appendChild(row);
        });
    }
    
    updateCartSummary();
}

function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 5000 ? 0 : 200; // Free shipping above Rs 5,000, otherwise Rs 200 default
    const total = subtotal + shipping;
    
    const cartSummary = document.getElementById('cartSummary');
    if (cartSummary) {
        cartSummary.innerHTML = `
            <div class="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>Rs ${subtotal.toLocaleString()}</span>
            </div>
            <div class="d-flex justify-content-between mb-2">
                <span>Shipping:</span>
                <span>${shipping === 0 ? 'Free' : 'Rs ' + shipping.toLocaleString()}</span>
            </div>
            <hr>
            <div class="d-flex justify-content-between fw-bold">
                <span>Total:</span>
                <span>Rs ${total.toLocaleString()}</span>
            </div>
        `;
    }
}

// Product Detail Functions
function loadProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        window.location.href = 'products.html';
        return;
    }
    
    document.title = `${product.title} - TicTacBags`;
    
    const productDetail = document.getElementById('productDetail');
    if (productDetail) {
        productDetail.innerHTML = `
            <div class="row">
                <div class="col-lg-6 mb-4">
                    <img src="${product.image}" class="product-detail-img rounded shadow" alt="${product.title}">
                </div>
                <div class="col-lg-6">
                    <h1 class="display-6 fw-bold mb-3">${product.title}</h1>
                    <p class="text-muted mb-2">Brand: ${product.brand}</p>
                    <p class="text-muted mb-3">Category: ${product.category}</p>
                    <h2 class="text-primary mb-4">Rs ${product.price.toLocaleString()}</h2>
                    <p class="lead mb-4">${product.description}</p>
                    <div class="d-flex gap-3">
                        <button class="btn btn-outline-primary btn-lg" onclick="addToCart(${product.id})">
                            <i class="fas fa-shopping-cart me-2"></i>Add to Cart
                        </button>
                        <button class="btn btn-primary btn-lg" onclick="shopNow(${product.id})">
                            Shop Now
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
}

// Checkout Functions
function loadCheckoutPage() {
    updateCheckoutSummary();
    
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckout);
    }
}

function getShippingCost(subtotal, city = '') {
    if (subtotal > 5000) return 0; // Free shipping above Rs 5,000
    if (city === 'karachi') return 200;
    if (city === 'other') return 400;
    return 200; // Default
}

function updateShippingCost() {
    updateCheckoutSummary();
}

function updateCheckoutSummary() {
    const orderSummary = document.getElementById('orderSummary');
    if (!orderSummary) return;
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const citySelect = document.getElementById('city');
    const selectedCity = citySelect ? citySelect.value : '';
    const shipping = getShippingCost(subtotal, selectedCity);
    const total = subtotal + shipping;
    
    let summaryHTML = '<h5 class="mb-3">Order Summary</h5>';
    
    cart.forEach(item => {
        summaryHTML += `
            <div class="order-item">
                <img src="${item.image}" alt="${item.title}">
                <div class="flex-grow-1">
                    <div class="fw-bold">${item.title}</div>
                    <div class="text-muted">Qty: ${item.quantity}</div>
                </div>
                <div class="fw-bold">Rs ${(item.price * item.quantity).toLocaleString()}</div>
            </div>
        `;
    });
    
    summaryHTML += `
        <hr>
        <div class="order-item">
            <span>Subtotal:</span>
            <span>Rs ${subtotal.toLocaleString()}</span>
        </div>
        <div class="order-item">
            <span>Shipping:</span>
            <span>${shipping === 0 ? 'Free' : 'Rs ' + shipping.toLocaleString()}</span>
        </div>
        <div class="order-item border-top pt-3">
            <strong>Total: Rs ${total.toLocaleString()}</strong>
        </div>
    `;
    
    orderSummary.innerHTML = summaryHTML;
}

function handleCheckout(e) {
    e.preventDefault();
    
    // Check if cart is empty
    if (cart.length === 0) {
        showNotification('Your cart is empty! Please add items before checkout.', 'warning');
        window.location.href = 'products.html';
        return;
    }
    
    const formData = new FormData(e.target);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const selectedCity = formData.get('city');
    const shipping = getShippingCost(subtotal, selectedCity);
    
    const orderData = {
        id: generateOrderId(),
        customerName: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        city: formData.get('city') || '',
        address: formData.get('address'),
        instructions: formData.get('instructions') || '',
        paymentMethod: formData.get('paymentMethod'),
        items: cart.map(item => ({...item})),
        subtotal: subtotal,
        shipping: shipping,
        total: subtotal + shipping,
        status: 'pending',
        date: new Date().toISOString()
    };
    
    console.log('Creating order:', orderData); // Debug log
    
    // Save order
    orders.push(orderData);
    localStorage.setItem('tictacbags_orders', JSON.stringify(orders));
    
    console.log('Orders saved to localStorage:', orders); // Debug log
    
    // Clear cart
    cart = [];
    saveCart();
    
    // Show success message
    showOrderSuccess(orderData.id);
}

function generateOrderId() {
    return 'TTB' + Date.now().toString().slice(-8);
}

function showOrderSuccess(orderId) {
    const checkoutContainer = document.querySelector('.checkout-container');
    if (checkoutContainer) {
        checkoutContainer.innerHTML = `
            <div class="text-center py-5">
                <div class="mb-4">
                    <i class="fas fa-check-circle text-success" style="font-size: 4rem;"></i>
                </div>
                <h2 class="mb-3">Thank You for Your Order!</h2>
                <p class="lead mb-3">Your order ID is: <strong>${orderId}</strong></p>
                <p class="text-muted mb-4">We'll process your order and contact you soon.</p>
                <a href="index.html" class="btn btn-primary btn-lg">Return to Home</a>
            </div>
        `;
    }
}

// Contact Form
function handleContactForm(e) {
    e.preventDefault();
    
    // Simulate form submission
    showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
    e.target.reset();
}

// Utility Functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; max-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Initialize page-specific functionality
document.addEventListener('DOMContentLoaded', function() {
    const page = getCurrentPage();
    
    switch(page) {
        case 'checkout':
            loadCheckoutPage();
            break;
        case 'contact':
            const contactForm = document.getElementById('contactForm');
            if (contactForm) {
                contactForm.addEventListener('submit', handleContactForm);
            }
            break;
    }
    
    // Handle payment method change
    const paymentMethodInputs = document.querySelectorAll('input[name="paymentMethod"]');
    paymentMethodInputs.forEach(input => {
        input.addEventListener('change', function() {
            const onlinePaymentInfo = document.getElementById('onlinePaymentInfo');
            if (onlinePaymentInfo) {
                onlinePaymentInfo.style.display = this.value === 'online' ? 'block' : 'none';
            }
    });
});

// Test function to check if orders are being saved (run in console)
function testOrderSystem() {
    console.log('=== Testing Order System ===');
    console.log('Current cart:', cart);
    console.log('Current orders in localStorage:', JSON.parse(localStorage.getItem('tictacbags_orders') || '[]'));
    
    // Add a test product to cart if empty
    if (cart.length === 0) {
        console.log('Adding test product to cart...');
        addToCart(1);
    }
    
    console.log('Cart after adding product:', cart);
    console.log('You can now test the checkout process.');
    console.log('After placing an order, check localStorage again with: JSON.parse(localStorage.getItem("tictacbags_orders"))');
}
    
    // Handle search form submissions
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchProducts();
            }
        });
    }
    
    const mobileSearchInput = document.getElementById('mobileSearchInput');
    if (mobileSearchInput) {
        mobileSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchProductsMobile();
            }
        });
    }
});
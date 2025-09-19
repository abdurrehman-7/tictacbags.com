// Products Page JavaScript

let filteredProducts = [];
let currentFilters = {
    categories: [],
    priceRanges: [],
    brands: []
};

// Initialize products page
document.addEventListener('DOMContentLoaded', function() {
    if (getCurrentPage() === 'products') {
        initializeProductsPage();
    }
});

function initializeProductsPage() {
    filteredProducts = [...products.filter(p => p.active)];
    
    // Check URL parameters for initial filters
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('search');
    const category = urlParams.get('category');
    
    if (searchTerm) {
        document.getElementById('searchInput').value = searchTerm;
        document.getElementById('mobileSearchInput').value = searchTerm;
        applySearchFilter(searchTerm);
    }
    
    if (category) {
        const categoryCheckbox = document.querySelector(`input[value="${category}"]`);
        if (categoryCheckbox) {
            categoryCheckbox.checked = true;
            currentFilters.categories.push(category);
        }
    }
    
    applyAllFilters();
    displayProducts();
}

function applySearchFilter(searchTerm) {
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(p => 
            p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
}

function applyFilters() {
    // Get selected categories
    currentFilters.categories = Array.from(document.querySelectorAll('input[id^="cat-"]:checked'))
        .map(cb => cb.value);
    
    // Get selected price ranges
    currentFilters.priceRanges = Array.from(document.querySelectorAll('input[id^="price-"]:checked'))
        .map(cb => cb.value);
    
    // Get selected brands
    currentFilters.brands = Array.from(document.querySelectorAll('input[id^="brand-"]:checked'))
        .map(cb => cb.value);
    
    applyAllFilters();
    displayProducts();
}

function applyAllFilters() {
    filteredProducts = [...products.filter(p => p.active)];
    
    // Apply search filter if present
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('search');
    if (searchTerm) {
        applySearchFilter(searchTerm);
    }
    
    // Apply category filter
    if (currentFilters.categories.length > 0) {
        filteredProducts = filteredProducts.filter(p => 
            currentFilters.categories.includes(p.category)
        );
    }
    
    // Apply price filter
    if (currentFilters.priceRanges.length > 0) {
        filteredProducts = filteredProducts.filter(p => {
            return currentFilters.priceRanges.some(range => {
                if (range === '0-50') return p.price < 5000;
                if (range === '50-100') return p.price >= 5000 && p.price <= 10000;
                if (range === '100-150') return p.price >= 10000 && p.price <= 15000;
                if (range === '150+') return p.price > 15000;
                return false;
            });
        });
    }
    
    // Apply brand filter
    if (currentFilters.brands.length > 0) {
        filteredProducts = filteredProducts.filter(p => 
            currentFilters.brands.includes(p.brand)
        );
    }
}

function clearFilters() {
    // Uncheck all filter checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
    });
    
    // Reset filters
    currentFilters = {
        categories: [],
        priceRanges: [],
        brands: []
    };
    
    // Reset sort
    document.getElementById('sortSelect').value = 'default';
    
    // Reapply filters (which will show all products)
    applyAllFilters();
    displayProducts();
}

function sortProducts() {
    const sortValue = document.getElementById('sortSelect').value;
    
    switch (sortValue) {
        case 'name-asc':
            filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'name-desc':
            filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
            break;
        case 'price-asc':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        default:
            // Default sort by ID
            filteredProducts.sort((a, b) => a.id - b.id);
    }
    
    displayProducts();
}

function displayProducts() {
    const productsContainer = document.getElementById('productsContainer');
    const productCount = document.getElementById('productCount');
    
    if (!productsContainer) return;
    
    // Update product count
    if (productCount) {
        const count = filteredProducts.length;
        productCount.textContent = count === 1 ? 
            'Showing 1 product' : 
            `Showing ${count} products`;
    }
    
    // Clear container
    productsContainer.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        productsContainer.innerHTML = `
            <div class="col-12">
                <div class="text-center py-5">
                    <i class="fas fa-search text-muted" style="font-size: 3rem;"></i>
                    <h4 class="mt-3 mb-2">No products found</h4>
                    <p class="text-muted mb-3">Try adjusting your filters or search terms</p>
                    <button class="btn btn-primary" onclick="clearFilters()">Clear Filters</button>
                </div>
            </div>
        `;
        return;
    }
    
    // Display products
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsContainer.appendChild(productCard);
    });
    
    // Add animation to cards
    setTimeout(() => {
        const cards = productsContainer.querySelectorAll('.product-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 50);
}

// Enhanced product card creation for products page
function createProductCardForProductsPage(product) {
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6 mb-4';
    
    col.innerHTML = `
        <div class="card product-card h-100" style="opacity: 0; transform: translateY(30px); transition: all 0.3s ease;">
            <div class="position-relative">
                <img src="${product.image}" class="card-img-top" alt="${product.title}">
                ${product.featured ? '<div class="badge bg-primary position-absolute top-0 start-0 m-2">Featured</div>' : ''}
                ${product.latest ? '<div class="badge bg-success position-absolute top-0 end-0 m-2">New</div>' : ''}
            </div>
            <div class="card-body d-flex flex-column">
                <h5 class="product-title">${product.title}</h5>
                <p class="text-muted small mb-2">
                    <i class="fas fa-tag me-1"></i>${product.brand} | ${product.category}
                </p>
                <p class="card-text text-muted small mb-3">${product.description.substring(0, 100)}...</p>
                <div class="product-price mb-3">Rs ${product.price.toLocaleString()}</div>
                <div class="product-actions mt-auto">
                    <button class="btn btn-outline-primary btn-sm" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-cart me-1"></i>Add to Cart
                    </button>
                    <button class="btn btn-primary btn-sm" onclick="shopNow(${product.id})">
                        <i class="fas fa-bolt me-1"></i>Shop Now
                    </button>
                </div>
                <button class="btn btn-link btn-sm mt-2 p-0 text-decoration-none" onclick="viewProductDetail(${product.id})">
                    <i class="fas fa-eye me-1"></i>View Details
                </button>
            </div>
        </div>
    `;
    
    return col;
}

function viewProductDetail(productId) {
    window.location.href = `product-detail.html?id=${productId}`;
}

// Quick filters for popular categories
function filterByCategory(category) {
    clearFilters();
    const categoryCheckbox = document.querySelector(`input[value="${category}"]`);
    if (categoryCheckbox) {
        categoryCheckbox.checked = true;
        currentFilters.categories = [category];
        applyAllFilters();
        displayProducts();
    }
}

// Search functionality enhancement for products page
function searchProducts() {
    const searchTerm = document.getElementById('searchInput').value.trim();
    if (searchTerm) {
        // Update URL without page reload
        const newUrl = new URL(window.location);
        newUrl.searchParams.set('search', searchTerm);
        window.history.pushState({}, '', newUrl);
        
        // Apply search
        initializeProductsPage();
    }
}

function searchProductsMobile() {
    const searchTerm = document.getElementById('mobileSearchInput').value.trim();
    if (searchTerm) {
        // Update desktop search input
        document.getElementById('searchInput').value = searchTerm;
        
        // Update URL without page reload
        const newUrl = new URL(window.location);
        newUrl.searchParams.set('search', searchTerm);
        window.history.pushState({}, '', newUrl);
        
        // Apply search
        initializeProductsPage();
        
        // Collapse mobile search
        const mobileSearch = document.getElementById('mobileSearch');
        if (mobileSearch.classList.contains('show')) {
            bootstrap.Collapse.getInstance(mobileSearch).hide();
        }
    }
}

// Price range helper
function formatPriceRange(range) {
    switch (range) {
        case '0-50': return 'Under Rs 5000';
        case '50-100': return 'Rs 5000 - Rs 10000';
        case '100-150': return 'Rs 10000 - Rs 15000';
        case '150+': return 'Over Rs 15000';
        default: return range;
    }
}

// Filter summary display
function updateFilterSummary() {
    const filterSummary = document.getElementById('filterSummary');
    if (!filterSummary) return;
    
    const activeFilters = [];
    
    if (currentFilters.categories.length > 0) {
        activeFilters.push(...currentFilters.categories.map(cat => `Category: ${cat}`));
    }
    
    if (currentFilters.priceRanges.length > 0) {
        activeFilters.push(...currentFilters.priceRanges.map(range => `Price: ${formatPriceRange(range)}`));
    }
    
    if (currentFilters.brands.length > 0) {
        activeFilters.push(...currentFilters.brands.map(brand => `Brand: ${brand}`));
    }
    
    if (activeFilters.length > 0) {
        filterSummary.innerHTML = `
            <div class="mb-3">
                <small class="text-muted">Active filters:</small><br>
                ${activeFilters.map(filter => 
                    `<span class="badge bg-secondary me-1">${filter}</span>`
                ).join('')}
            </div>
        `;
    } else {
        filterSummary.innerHTML = '';
    }
}

// Override the createProductCard function for products page
if (getCurrentPage() === 'products') {
    window.createProductCard = createProductCardForProductsPage;
}
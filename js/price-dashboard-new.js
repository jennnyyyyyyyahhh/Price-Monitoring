// Global variables
let currentCategory = 'all';
let currentSort = 'name-asc';
let currentView = 'grid';
let currentPage = 1;
let itemsPerPage = 12;
let priceFilter = { min: '', max: '' };
let searchQuery = '';

// Sample product data
const products = [
    // Fruits
    { id: 1, name: 'Fresh Apples', category: 'fruits', price: 120, unit: 'kg', change: '+5%', status: 'available', image: 'img/apple.jpg', lastUpdated: '2 hours ago' },
    { id: 2, name: 'Bananas', category: 'fruits', price: 80, unit: 'kg', change: '-2%', status: 'available', image: 'img/banana.jpg', lastUpdated: '1 hour ago' },
    { id: 3, name: 'Orange', category: 'fruits', price: 100, unit: 'kg', change: '0%', status: 'available', image: 'img/orange.jpg', lastUpdated: '3 hours ago' },
    
    // Vegetables
    { id: 4, name: 'Cabbage', category: 'vegetables', price: 40, unit: 'kg', change: '+8%', status: 'available', image: 'img/cabbage.jpg', lastUpdated: '1 hour ago' },
    { id: 5, name: 'Tomato', category: 'vegetables', price: 60, unit: 'kg', change: '-3%', status: 'available', image: 'img/tomato.jpg', lastUpdated: '2 hours ago' },
    { id: 6, name: 'Onion', category: 'vegetables', price: 35, unit: 'kg', change: '+12%', status: 'available', image: 'img/onion.jpg', lastUpdated: '30 minutes ago' },
    
    // Meats
    { id: 7, name: 'Chicken', category: 'meats', price: 280, unit: 'kg', change: '+3%', status: 'available', image: 'img/chicken.jpg', lastUpdated: '1 hour ago' },
    { id: 8, name: 'Pork', category: 'meats', price: 320, unit: 'kg', change: '-1%', status: 'available', image: 'img/pork.jpg', lastUpdated: '2 hours ago' },
    
    // Poultry
    { id: 9, name: 'Fresh Chicken', category: 'poultry', price: 280, unit: 'kg', change: '+3%', status: 'available', image: 'img/chicken.jpg', lastUpdated: '1 hour ago' },
    
    // Dairy
    { id: 10, name: 'Fresh Milk', category: 'dairy', price: 65, unit: 'liter', change: '0%', status: 'available', image: 'img/milk.jpg', lastUpdated: '4 hours ago' },
    { id: 11, name: 'Cheese', category: 'dairy', price: 450, unit: 'kg', change: '+2%', status: 'available', image: 'img/cheese.jpg', lastUpdated: '3 hours ago' },
    
    // Rice
    { id: 12, name: 'White Rice', category: 'rice', price: 45, unit: 'kg', change: '+1%', status: 'available', image: 'img/rice.jpg', lastUpdated: '5 hours ago' },
    { id: 13, name: 'Brown Rice', category: 'rice', price: 55, unit: 'kg', change: '0%', status: 'available', image: 'img/brown-rice.jpg', lastUpdated: '4 hours ago' },
    
    // Fish
    { id: 14, name: 'Fresh Fish', category: 'meats', price: 200, unit: 'kg', change: '+7%', status: 'available', image: 'img/fish.jpg', lastUpdated: '2 hours ago' },
    { id: 15, name: 'Tilapia', category: 'meats', price: 180, unit: 'kg', change: '+4%', status: 'available', image: 'img/tilapia.jpg', lastUpdated: '1 hour ago' },
    { id: 16, name: 'Shrimp', category: 'meats', price: 350, unit: 'kg', change: '-2%', status: 'available', image: 'img/shrimp.jpg', lastUpdated: '3 hours ago' }
];

// Category data
const categories = {
    'all': { name: 'ALL CATEGORIES', icon: 'fas fa-th-large', count: products.length },
    'fruits': { name: 'FRUITS', icon: 'fas fa-apple-alt', count: products.filter(p => p.category === 'fruits').length },
    'vegetables': { name: 'VEGETABLES', icon: 'fas fa-carrot', count: products.filter(p => p.category === 'vegetables').length },
    'meats': { name: 'MEATS', icon: 'fas fa-drumstick-bite', count: products.filter(p => p.category === 'meats').length },
    'poultry': { name: 'POULTRY', icon: 'fas fa-egg', count: products.filter(p => p.category === 'poultry').length },
    'dairy': { name: 'DAIRY', icon: 'fas fa-glass-whiskey', count: products.filter(p => p.category === 'dairy').length },
    'rice': { name: 'RICE', icon: 'fas fa-seedling', count: products.filter(p => p.category === 'rice').length }
};

// Notification data
const notifications = [
    {
        id: 1,
        type: 'price-alert',
        title: 'Price Alert: Tomato',
        message: 'Tomato prices have increased by 12% in the last hour',
        time: '5 minutes ago',
        unread: true
    },
    {
        id: 2,
        type: 'supply-alert',
        title: 'Supply Update',
        message: 'New shipment of fresh fruits arrived at the market',
        time: '1 hour ago',
        unread: true
    },
    {
        id: 3,
        type: 'market-update',
        title: 'Market Report',
        message: 'Weekly market analysis report is now available',
        time: '2 hours ago',
        unread: false
    }
];

// DOM elements
let notificationDropdown;
let productContainer;
let categoryList;
let categoriesOverview;
let searchInput;
let sortSelect;
let viewToggle;
let paginationContainer;
let sidebarToggle;
let sidebar;
let mainContent;
let mobileMenuToggle;
let sidebarOverlay;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    setupEventListeners();
    renderCategories();
    renderProducts();
    updateNotifications();
    
    // Auto-refresh prices every 30 seconds
    setInterval(updatePrices, 30000);
});

// Initialize DOM elements
function initializeElements() {
    notificationDropdown = document.querySelector('.notification-dropdown');
    productContainer = document.querySelector('.products-container');
    categoryList = document.querySelector('.category-list');
    categoriesOverview = document.querySelector('.categories-overview');
    searchInput = document.querySelector('#searchInput');
    sortSelect = document.querySelector('#sortSelect');
    viewToggle = document.querySelector('.view-toggle');
    paginationContainer = document.querySelector('.pagination-section');
    sidebarToggle = document.querySelector('.sidebar-toggle');
    sidebar = document.querySelector('.sidebar');
    mainContent = document.querySelector('.main-content');
    mobileMenuToggle = document.querySelector('#mobileMenuToggle');
    sidebarOverlay = document.querySelector('#sidebarOverlay');
}

// Setup event listeners
function setupEventListeners() {
    // Notification dropdown
    document.querySelector('.notification-btn').addEventListener('click', toggleNotifications);
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.notification-container')) {
            closeNotifications();
        }
    });
    
    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
    }
    
    // Sort functionality
    if (sortSelect) {
        sortSelect.addEventListener('change', handleSort);
    }
    
    // View toggle
    if (viewToggle) {
        viewToggle.addEventListener('click', handleViewToggle);
    }
    
    // Sidebar toggle
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }
    
    // Mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileSidebar);
    }
    
    // Sidebar overlay (close sidebar when clicking outside)
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeMobileSidebar);
    }
    
    // Price filter
    const applyFilterBtn = document.querySelector('.apply-filter-btn');
    if (applyFilterBtn) {
        applyFilterBtn.addEventListener('click', handlePriceFilter);
    }
    
    // Quick actions
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(btn => {
        btn.addEventListener('click', handleQuickAction);
    });
    
    // Category overview cards
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            selectCategory(category);
            scrollToProducts();
        });
    });
    
    // Mobile responsive
    window.addEventListener('resize', handleResize);
}

// Notification functions
function toggleNotifications() {
    if (notificationDropdown.style.display === 'block') {
        closeNotifications();
    } else {
        openNotifications();
    }
}

function openNotifications() {
    notificationDropdown.style.display = 'block';
    // Mark notifications as read when opened
    setTimeout(() => {
        notifications.forEach(notification => notification.unread = false);
        updateNotificationBadge();
    }, 1000);
}

function closeNotifications() {
    notificationDropdown.style.display = 'none';
}

function updateNotifications() {
    const notificationList = document.querySelector('.notification-list');
    const notificationBadge = document.querySelector('.notification-badge');
    
    if (!notificationList) return;
    
    // Render notifications
    notificationList.innerHTML = notifications.map(notification => `
        <div class="notification-item ${notification.unread ? 'unread' : ''}">
            <div class="notification-icon ${notification.type}">
                <i class="${getNotificationIcon(notification.type)}"></i>
            </div>
            <div class="notification-content">
                <h4>${notification.title}</h4>
                <p>${notification.message}</p>
                <div class="notification-time">${notification.time}</div>
            </div>
        </div>
    `).join('');
    
    updateNotificationBadge();
}

function updateNotificationBadge() {
    const unreadCount = notifications.filter(n => n.unread).length;
    const badge = document.querySelector('.notification-badge');
    
    if (badge) {
        if (unreadCount > 0) {
            badge.textContent = unreadCount > 9 ? '9+' : unreadCount;
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    }
}

function getNotificationIcon(type) {
    const icons = {
        'price-alert': 'fas fa-exclamation-triangle',
        'supply-alert': 'fas fa-truck',
        'market-update': 'fas fa-chart-line'
    };
    return icons[type] || 'fas fa-bell';
}

// Category functions
function renderCategories() {
    if (!categoryList) return;
    
    categoryList.innerHTML = Object.keys(categories).map(categoryKey => {
        const category = categories[categoryKey];
        return `
            <div class="category-item ${currentCategory === categoryKey ? 'active' : ''}" 
                 data-category="${categoryKey}">
                <div class="category-icon">
                    <i class="${category.icon}"></i>
                </div>
                <span class="category-name">${category.name}</span>
                <span class="category-count">${category.count}</span>
            </div>
        `;
    }).join('');
    
    // Add click listeners to category items
    categoryList.querySelectorAll('.category-item').forEach(item => {
        item.addEventListener('click', () => {
            const category = item.dataset.category;
            selectCategory(category);
        });
    });
    
    // Update category overview cards
    updateCategoryOverview();
}

function updateCategoryOverview() {
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        const categoryKey = card.dataset.category;
        const countElement = card.querySelector('.category-product-count');
        if (countElement && categories[categoryKey]) {
            const count = categories[categoryKey].count;
            countElement.textContent = `${count} product${count !== 1 ? 's' : ''}`;
        }
    });
}

function selectCategory(category) {
    currentCategory = category;
    currentPage = 1;
    
    // Update active category in sidebar
    categoryList.querySelectorAll('.category-item').forEach(item => {
        item.classList.remove('active');
    });
    categoryList.querySelector(`[data-category="${category}"]`).classList.add('active');
    
    // Update active category in overview cards
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.classList.remove('active');
        if (card.dataset.category === category) {
            card.classList.add('active');
        }
    });
    
    // Update page title
    const pageTitle = document.querySelector('#pageTitle');
    if (pageTitle) {
        pageTitle.textContent = categories[category].name;
    }
    
    renderProducts();
}

function scrollToProducts() {
    const productsSection = document.querySelector('.products-section');
    if (productsSection) {
        productsSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Product functions
function renderProducts() {
    if (!productContainer) return;
    
    const filteredProducts = getFilteredProducts();
    const paginatedProducts = getPaginatedProducts(filteredProducts);
    
    // Update product count
    updateProductCount(filteredProducts.length);
    
    if (paginatedProducts.length === 0) {
        productContainer.innerHTML = `
            <div class="no-products">
                <i class="fas fa-search" style="font-size: 3rem; color: #ccc; margin-bottom: 1rem;"></i>
                <h3>No products found</h3>
                <p>Try adjusting your search or filter criteria</p>
            </div>
        `;
        return;
    }
    
    productContainer.innerHTML = paginatedProducts.map(product => `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='img/cover.jpg'">
                <div class="product-status ${product.status}">${product.status}</div>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">
                    <span class="current-price">₱${product.price}</span>
                    <span class="unit">/${product.unit}</span>
                </div>
                <div class="price-change ${getPriceChangeClass(product.change)}">
                    <i class="fas fa-${getPriceChangeIcon(product.change)}"></i>
                    <span>${product.change}</span>
                </div>
                <div class="product-meta">
                    <span class="category">${categories[product.category].name}</span>
                    <span class="last-updated">${product.lastUpdated}</span>
                </div>
            </div>
        </div>
    `).join('');
    
    // Add click listeners to product cards
    productContainer.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const productId = parseInt(card.dataset.productId);
            // Product card click functionality can be added here if needed
        });
    });
    
    renderPagination(filteredProducts.length);
}

function getFilteredProducts() {
    let filtered = products;
    
    // Filter by category
    if (currentCategory !== 'all') {
        filtered = filtered.filter(product => product.category === currentCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
        filtered = filtered.filter(product => 
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }
    
    // Filter by price range
    if (priceFilter.min && priceFilter.max) {
        const min = parseFloat(priceFilter.min);
        const max = parseFloat(priceFilter.max);
        filtered = filtered.filter(product => product.price >= min && product.price <= max);
    }
    
    // Sort products
    filtered = sortProducts(filtered);
    
    return filtered;
}

function sortProducts(products) {
    return products.sort((a, b) => {
        switch (currentSort) {
            case 'name-asc':
                return a.name.localeCompare(b.name);
            case 'name-desc':
                return b.name.localeCompare(a.name);
            case 'price-asc':
                return a.price - b.price;
            case 'price-desc':
                return b.price - a.price;
            case 'updated':
                return new Date(b.lastUpdated) - new Date(a.lastUpdated);
            default:
                return 0;
        }
    });
}

function getPaginatedProducts(products) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return products.slice(startIndex, endIndex);
}

function getPriceChangeClass(change) {
    if (change.startsWith('+')) return 'positive';
    if (change.startsWith('-')) return 'negative';
    return 'stable';
}

function getPriceChangeIcon(change) {
    if (change.startsWith('+')) return 'arrow-up';
    if (change.startsWith('-')) return 'arrow-down';
    return 'minus';
}

function updateProductCount(count) {
    const countElement = document.querySelector('.product-count');
    if (countElement) {
        countElement.textContent = `${count} products found`;
    }
}

// Pagination functions
function renderPagination(totalItems) {
    if (!paginationContainer) return;
    
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    if (totalPages <= 1) {
        paginationContainer.style.display = 'none';
        return;
    }
    
    paginationContainer.style.display = 'flex';
    
    const paginationElement = paginationContainer.querySelector('.pagination');
    if (!paginationElement) return;
    
    let paginationHTML = `
        <button class="page-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(${currentPage - 1})">
            <i class="fas fa-chevron-left"></i>
            Previous
        </button>
        <div class="page-numbers">
    `;
    
    // Show page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
            paginationHTML += `
                <span class="page-number ${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">
                    ${i}
                </span>
            `;
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            paginationHTML += '<span class="page-dots">...</span>';
        }
    }
    
    paginationHTML += `
        </div>
        <button class="page-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(${currentPage + 1})">
            Next
            <i class="fas fa-chevron-right"></i>
        </button>
    `;
    
    paginationElement.innerHTML = paginationHTML;
    
    // Update pagination info
    const paginationInfo = paginationContainer.querySelector('.pagination-info');
    if (paginationInfo) {
        const startItem = (currentPage - 1) * itemsPerPage + 1;
        const endItem = Math.min(currentPage * itemsPerPage, totalItems);
        paginationInfo.textContent = `Showing ${startItem}-${endItem} of ${totalItems} items`;
    }
}

function changePage(page) {
    const totalItems = getFilteredProducts().length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        renderProducts();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Search and filter functions
function handleSearch(e) {
    searchQuery = e.target.value;
    currentPage = 1;
    renderProducts();
}

function handleSort(e) {
    currentSort = e.target.value;
    renderProducts();
}

function handleViewToggle(e) {
    if (e.target.classList.contains('view-btn')) {
        viewToggle.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        currentView = e.target.dataset.view;
        
        // Update product container class for different views
        if (currentView === 'list') {
            productContainer.classList.add('list-view');
        } else {
            productContainer.classList.remove('list-view');
        }
    }
}

function handlePriceFilter() {
    const minInput = document.querySelector('#minPrice');
    const maxInput = document.querySelector('#maxPrice');
    
    priceFilter.min = minInput ? minInput.value : '';
    priceFilter.max = maxInput ? maxInput.value : '';
    
    currentPage = 1;
    renderProducts();
}

function handleQuickAction(e) {
    const action = e.target.closest('.action-btn').dataset.action;
    
    switch (action) {
        case 'export':
            exportData();
            break;
        case 'import':
            importData();
            break;
        case 'refresh':
            refreshData();
            break;
        case 'settings':
            openSettings();
            break;
        default:
            console.log('Quick action:', action);
    }
}

// Sidebar functions
function toggleSidebar() {
    if (window.innerWidth > 768) {
        sidebar.classList.toggle('collapsed');
        
        // Update sidebar toggle icon
        const icon = sidebarToggle.querySelector('i');
        if (sidebar.classList.contains('collapsed')) {
            icon.className = 'fas fa-chevron-right';
        } else {
            icon.className = 'fas fa-chevron-left';
        }
    } else {
        toggleMobileSidebar();
    }
}

function toggleMobileSidebar() {
    sidebar.classList.toggle('mobile-open');
    sidebarOverlay.classList.toggle('active');
    
    // Prevent body scroll when sidebar is open
    if (sidebar.classList.contains('mobile-open')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

function closeMobileSidebar() {
    sidebar.classList.remove('mobile-open');
    sidebarOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function showLoading() {
    const loadingHTML = `
        <div class="loading-overlay" id="loadingOverlay">
            <div class="loading-spinner">
                <div class="spinner"></div>
                <p>Loading...</p>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', loadingHTML);
}

function hideLoading() {
    const loading = document.getElementById('loadingOverlay');
    if (loading) {
        loading.remove();
    }
}

// Data functions
function updatePrices() {
    // Simulate price updates
    products.forEach(product => {
        if (Math.random() < 0.1) { // 10% chance of price change
            const change = (Math.random() - 0.5) * 0.1; // ±5% change
            product.price = Math.round(product.price * (1 + change));
            product.change = change > 0 ? `+${Math.round(change * 100)}%` : `${Math.round(change * 100)}%`;
            product.lastUpdated = 'Just now';
        }
    });
    
    // Re-render if products are currently displayed
    if (productContainer && productContainer.children.length > 0) {
        renderProducts();
    }
    
    // Update category counts
    Object.keys(categories).forEach(key => {
        if (key !== 'all') {
            categories[key].count = products.filter(p => p.category === key).length;
        } else {
            categories[key].count = products.length;
        }
    });
    
    renderCategories();
}

function exportData() {
    const data = JSON.stringify(getFilteredProducts(), null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'price-data.json';
    a.click();
    URL.revokeObjectURL(url);
}

function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const importedData = JSON.parse(e.target.result);
                    console.log('Imported data:', importedData);
                    // Handle imported data here
                } catch (error) {
                    alert('Error importing data: ' + error.message);
                }
            };
            reader.readAsText(file);
        }
    };
    input.click();
}

function refreshData() {
    showLoading();
    
    // Simulate API call
    setTimeout(() => {
        updatePrices();
        hideLoading();
        
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        successMsg.innerHTML = '<i class="fas fa-check"></i> Data refreshed successfully';
        successMsg.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #d4edda;
            color: #155724;
            padding: 1rem 1.5rem;
            border-radius: 6px;
            border: 1px solid #c3e6cb;
            z-index: 2000;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        `;
        document.body.appendChild(successMsg);
        
        setTimeout(() => {
            successMsg.remove();
        }, 3000);
    }, 1500);
}

function openSettings() {
    alert('Settings panel would open here');
}

// Responsive functions
function handleResize() {
    if (window.innerWidth <= 768) {
        sidebar.classList.add('mobile');
        // Close sidebar if it's open and we're switching to mobile
        if (sidebar.classList.contains('mobile-open')) {
            closeMobileSidebar();
        }
    } else {
        sidebar.classList.remove('mobile', 'mobile-open');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset sidebar state for desktop
        if (sidebar.classList.contains('collapsed')) {
            // Keep collapsed state
        } else {
            sidebar.style.transform = '';
        }
    }
    
    // Update main content margin based on sidebar state
    updateMainContentMargin();
}

function updateMainContentMargin() {
    if (window.innerWidth > 768) {
        if (sidebar.classList.contains('collapsed')) {
            if (window.innerWidth > 1024) {
                mainContent.style.marginLeft = '60px';
            } else {
                mainContent.style.marginLeft = '50px';
            }
        } else {
            if (window.innerWidth > 1024) {
                mainContent.style.marginLeft = '280px';
            } else {
                mainContent.style.marginLeft = '250px';
            }
        }
    } else {
        mainContent.style.marginLeft = '0';
    }
}

// Initialize responsive behavior
handleResize();

// Update main content margin on initialization
updateMainContentMargin();

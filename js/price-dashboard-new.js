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
    // Market Price
    { id: 1, name: 'Fresh Apples', category: 'market-price', price: 120, unit: 'kg', change: '+5%', image: '../img/apple.jpg', lastUpdated: '2 hours ago' },
    { id: 2, name: 'Bananas', category: 'market-price', price: 80, unit: 'kg', change: '-2%', image: '../img/banana.jpg', lastUpdated: '1 hour ago' },
    { id: 3, name: 'Tomato', category: 'market-price', price: 60, unit: 'kg', change: '-3%', image: '../img/tomato.jpg', lastUpdated: '2 hours ago' },
    { id: 4, name: 'Fresh Chicken', category: 'market-price', price: 280, unit: 'kg', change: '+3%', image: '../img/chicken.jpg', lastUpdated: '1 hour ago' },
    
    // Alfamart
    { id: 5, name: 'Orange', category: 'alfamart', price: 100, unit: 'kg', change: '0%', image: '../img/orange.jpg', lastUpdated: '3 hours ago' },
    { id: 6, name: 'Cabbage', category: 'alfamart', price: 40, unit: 'kg', change: '+8%', image: '../img/cabbage.jpg', lastUpdated: '1 hour ago' },
    { id: 7, name: 'Fresh Milk', category: 'alfamart', price: 65, unit: 'liter', change: '0%', image: '../img/milk.jpg', lastUpdated: '4 hours ago' },
    
    // Puregold
    { id: 8, name: 'Onion', category: 'puregold', price: 35, unit: 'kg', change: '+12%', image: '../img/onion.jpg', lastUpdated: '30 minutes ago' },
    { id: 9, name: 'Pork', category: 'puregold', price: 320, unit: 'kg', change: '-1%',  image: '../img/pork.jpg', lastUpdated: '2 hours ago' },
    { id: 10, name: 'White Rice', category: 'puregold', price: 45, unit: 'kg', change: '+1%', image: '../img/rice.jpg', lastUpdated: '5 hours ago' },
    
    // Savemore
    { id: 11, name: 'Cheese', category: 'savemore', price: 450, unit: 'kg', change: '+2%', image: '../img/cheese.jpg', lastUpdated: '3 hours ago' },
    { id: 12, name: 'Brown Rice', category: 'savemore', price: 55, unit: 'kg', change: '0%', image: '../img/brown-rice.jpg', lastUpdated: '4 hours ago' },
    { id: 13, name: 'Fresh Fish', category: 'savemore', price: 200, unit: 'kg', change: '+7%', image: '../img/fish.jpg', lastUpdated: '2 hours ago' },
    
    // SM Supermarket
    { id: 14, name: 'Tilapia', category: 'sm-supermarket', price: 180, unit: 'kg', change: '+4%', image: '../img/tilapia.jpg', lastUpdated: '1 hour ago' },
    { id: 15, name: 'Shrimp', category: 'sm-supermarket', price: 350, unit: 'kg', change: '-2%', image: '../img/shrimp.jpg', lastUpdated: '3 hours ago' },
    

];

// Category data
const categories = {
    'all': { name: 'All Categories', icon: 'fas fa-th-large', count: products.length },
    'market-price': { name: 'Market Price', icon: 'fas fa-store', count: products.filter(p => p.category === 'market-price').length },
    'alfamart': { name: 'Alfamart', icon: 'fas fa-shopping-basket', count: products.filter(p => p.category === 'alfamart').length },
    'puregold': { name: 'Puregold', icon: 'fas fa-shopping-cart', count: products.filter(p => p.category === 'puregold').length },
    'savemore': { name: 'Savemore', icon: 'fas fa-tags', count: products.filter(p => p.category === 'savemore').length },
    'sm-supermarket': { name: 'SM Supermarket', icon: 'fas fa-building', count: products.filter(p => p.category === 'sm-supermarket').length },
    'price-trends': { name: 'Price Trends', icon: 'fas fa-chart-line', count: products.filter(p => p.category === 'price-trends').length }
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
        message: 'Weekly market analysis report is now  ble',
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

// Price Trends Chart Functionality
let charts = {};

// Sample historical price data for charts
const priceHistoryData = {
    'market-price': {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        datasets: [{
            label: 'Average Price (₱)',
            data: [85, 88, 92, 89, 91, 95, 98, 102],
            borderColor: '#28a745',
            backgroundColor: 'rgba(40, 167, 69, 0.1)',
            tension: 0.4,
            pointBackgroundColor: '#28a745',
            pointBorderColor: '#28a745',
            pointHoverBackgroundColor: '#1e7e34',
            pointHoverBorderColor: '#1e7e34',
            pointRadius: 6,
            pointHoverRadius: 8,
            borderWidth: 3
        }]
    },
    'alfamart': {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        datasets: [{
            label: 'Average Price (₱)',
            data: [75, 75, 76, 75, 75, 76, 75, 76],
            borderColor: '#007bff',
            backgroundColor: 'rgba(0, 123, 255, 0.1)',
            tension: 0.4,
            pointBackgroundColor: '#007bff',
            pointBorderColor: '#007bff',
            pointHoverBackgroundColor: '#0056b3',
            pointHoverBorderColor: '#0056b3',
            pointRadius: 6,
            pointHoverRadius: 8,
            borderWidth: 3
        }]
    },
    'puregold': {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        datasets: [{
            label: 'Average Price (₱)',
            data: [133, 135, 138, 142, 145, 147, 149, 152],
            borderColor: '#ffc107',
            backgroundColor: 'rgba(255, 193, 7, 0.1)',
            tension: 0.4,
            pointBackgroundColor: '#ffc107',
            pointBorderColor: '#ffc107',
            pointHoverBackgroundColor: '#e0a800',
            pointHoverBorderColor: '#e0a800',
            pointRadius: 6,
            pointHoverRadius: 8,
            borderWidth: 3
        }]
    },
    'savemore': {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        datasets: [{
            label: 'Average Price (₱)',
            data: [165, 163, 160, 158, 155, 153, 150, 148],
            borderColor: '#dc3545',
            backgroundColor: 'rgba(220, 53, 69, 0.1)',
            tension: 0.4,
            pointBackgroundColor: '#dc3545',
            pointBorderColor: '#dc3545',
            pointHoverBackgroundColor: '#c82333',
            pointHoverBorderColor: '#c82333',
            pointRadius: 6,
            pointHoverRadius: 8,
            borderWidth: 3
        }]
    },
    'sm-supermarket': {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        datasets: [{
            label: 'Average Price (₱)',
            data: [265, 268, 270, 272, 275, 278, 280, 283],
            borderColor: '#6f42c1',
            backgroundColor: 'rgba(111, 66, 193, 0.1)',
            tension: 0.4,
            pointBackgroundColor: '#6f42c1',
            pointBorderColor: '#6f42c1',
            pointHoverBackgroundColor: '#59359a',
            pointHoverBorderColor: '#59359a',
            pointRadius: 6,
            pointHoverRadius: 8,
            borderWidth: 3
        }]
    }
};

// Chart configuration
const chartConfig = {
    type: 'line',
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: '#fff',
                bodyColor: '#fff',
                borderColor: '#076b93',
                borderWidth: 1,
                cornerRadius: 8,
                displayColors: true,
                callbacks: {
                    label: function(context) {
                        return context.dataset.label + ': ₱' + context.parsed.y.toFixed(2);
                    }
                }
            }
        },
        scales: {
            x: {
                display: true,
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)',
                    drawBorder: false
                },
                ticks: {
                    color: '#6c757d',
                    font: {
                        size: 12
                    }
                }
            },
            y: {
                display: true,
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)',
                    drawBorder: false
                },
                ticks: {
                    color: '#6c757d',
                    font: {
                        size: 12
                    },
                    callback: function(value) {
                        return '₱' + value.toFixed(0);
                    }
                }
            }
        },
        elements: {
            point: {
                radius: 6,
                hoverRadius: 8,
                borderWidth: 2,
                hoverBorderWidth: 3
            },
            line: {
                borderWidth: 3,
                fill: true
            }
        },
        interaction: {
            intersect: false,
            mode: 'index'
        },
        animation: {
            duration: 1000,
            easing: 'easeInOutQuart'
        }
    }
};

// Initialize individual charts
function initializeCharts() {
    // Create gradient backgrounds
    function createGradient(ctx, color) {
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, color.replace('0.1', '0.01'));
        return gradient;
    }

    // Market Price Chart
    const marketCtx = document.getElementById('marketPriceChart');
    if (marketCtx) {
        const marketGradient = createGradient(marketCtx.getContext('2d'), 'rgba(40, 167, 69, 0.3)');
        const marketData = { ...priceHistoryData['market-price'] };
        marketData.datasets[0].backgroundColor = marketGradient;
        
        charts.marketPrice = new Chart(marketCtx, {
            ...chartConfig,
            data: marketData
        });
    }

    // Alfamart Chart
    const alfamartCtx = document.getElementById('alfamartChart');
    if (alfamartCtx) {
        const alfamartGradient = createGradient(alfamartCtx.getContext('2d'), 'rgba(0, 123, 255, 0.3)');
        const alfamartData = { ...priceHistoryData['alfamart'] };
        alfamartData.datasets[0].backgroundColor = alfamartGradient;
        
        charts.alfamart = new Chart(alfamartCtx, {
            ...chartConfig,
            data: alfamartData
        });
    }

    // Puregold Chart
    const puregoldCtx = document.getElementById('puregoldChart');
    if (puregoldCtx) {
        const puregoldGradient = createGradient(puregoldCtx.getContext('2d'), 'rgba(255, 193, 7, 0.3)');
        const puregoldData = { ...priceHistoryData['puregold'] };
        puregoldData.datasets[0].backgroundColor = puregoldGradient;
        
        charts.puregold = new Chart(puregoldCtx, {
            ...chartConfig,
            data: puregoldData
        });
    }

    // Savemore Chart
    const savemoreCtx = document.getElementById('savemoreChart');
    if (savemoreCtx) {
        const savemoreGradient = createGradient(savemoreCtx.getContext('2d'), 'rgba(220, 53, 69, 0.3)');
        const savemoreData = { ...priceHistoryData['savemore'] };
        savemoreData.datasets[0].backgroundColor = savemoreGradient;
        
        charts.savemore = new Chart(savemoreCtx, {
            ...chartConfig,
            data: savemoreData
        });
    }

    // SM Supermarket Chart
    const smCtx = document.getElementById('smSupermarketChart');
    if (smCtx) {
        const smGradient = createGradient(smCtx.getContext('2d'), 'rgba(111, 66, 193, 0.3)');
        const smData = { ...priceHistoryData['sm-supermarket'] };
        smData.datasets[0].backgroundColor = smGradient;
        
        charts.smSupermarket = new Chart(smCtx, {
            ...chartConfig,
            data: smData
        });
    }

    // Comparison Chart
    const comparisonCtx = document.getElementById('comparisonChart');
    if (comparisonCtx) {
        const ctx = comparisonCtx.getContext('2d');
        
        // Create gradients for each store
        const marketGradient = ctx.createLinearGradient(0, 0, 0, 400);
        marketGradient.addColorStop(0, 'rgba(40, 167, 69, 0.3)');
        marketGradient.addColorStop(1, 'rgba(40, 167, 69, 0.01)');
        
        const alfamartGradient = ctx.createLinearGradient(0, 0, 0, 400);
        alfamartGradient.addColorStop(0, 'rgba(0, 123, 255, 0.3)');
        alfamartGradient.addColorStop(1, 'rgba(0, 123, 255, 0.01)');
        
        const puregoldGradient = ctx.createLinearGradient(0, 0, 0, 400);
        puregoldGradient.addColorStop(0, 'rgba(255, 193, 7, 0.3)');
        puregoldGradient.addColorStop(1, 'rgba(255, 193, 7, 0.01)');
        
        const savemoreGradient = ctx.createLinearGradient(0, 0, 0, 400);
        savemoreGradient.addColorStop(0, 'rgba(220, 53, 69, 0.3)');
        savemoreGradient.addColorStop(1, 'rgba(220, 53, 69, 0.01)');
        
        const smGradient = ctx.createLinearGradient(0, 0, 0, 400);
        smGradient.addColorStop(0, 'rgba(111, 66, 193, 0.3)');
        smGradient.addColorStop(1, 'rgba(111, 66, 193, 0.01)');
        
        charts.comparison = new Chart(comparisonCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                datasets: [
                    {
                        label: 'Market Price',
                        data: [85, 88, 92, 89, 91, 95, 98, 102],
                        borderColor: '#28a745',
                        backgroundColor: marketGradient,
                        tension: 0.4,
                        pointRadius: 6,
                        pointHoverRadius: 8,
                        borderWidth: 3,
                        fill: true,
                        pointBackgroundColor: '#28a745',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2
                    },
                    {
                        label: 'Alfamart',
                        data: [75, 75, 76, 75, 75, 76, 75, 76],
                        borderColor: '#007bff',
                        backgroundColor: alfamartGradient,
                        tension: 0.4,
                        pointRadius: 6,
                        pointHoverRadius: 8,
                        borderWidth: 3,
                        fill: true,
                        pointBackgroundColor: '#007bff',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2
                    },
                    {
                        label: 'Puregold',
                        data: [133, 135, 138, 142, 145, 147, 149, 152],
                        borderColor: '#ffc107',
                        backgroundColor: puregoldGradient,
                        tension: 0.4,
                        pointRadius: 6,
                        pointHoverRadius: 8,
                        borderWidth: 3,
                        fill: true,
                        pointBackgroundColor: '#ffc107',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2
                    },
                    {
                        label: 'Savemore',
                        data: [165, 163, 160, 158, 155, 153, 150, 148],
                        borderColor: '#dc3545',
                        backgroundColor: savemoreGradient,
                        tension: 0.4,
                        pointRadius: 6,
                        pointHoverRadius: 8,
                        borderWidth: 3,
                        fill: true,
                        pointBackgroundColor: '#dc3545',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2
                    },
                    {
                        label: 'SM Supermarket',
                        data: [265, 268, 270, 272, 275, 278, 280, 283],
                        borderColor: '#6f42c1',
                        backgroundColor: smGradient,
                        tension: 0.4,
                        pointRadius: 6,
                        pointHoverRadius: 8,
                        borderWidth: 3,
                        fill: true,
                        pointBackgroundColor: '#6f42c1',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            color: '#fff',
                            padding: 20,
                            usePointStyle: true,
                            font: {
                                size: 12,
                                weight: '600'
                            }
                        }
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(0, 0, 0, 0.9)',
                        titleColor: '#fff',
                        bodyColor: '#fff',
                        borderColor: 'rgba(255, 255, 255, 0.1)',
                        borderWidth: 1,
                        cornerRadius: 8,
                        titleFont: { size: 14, weight: 'bold' },
                        bodyFont: { size: 13 },
                        padding: 12,
                        displayColors: true
                    }
                },
                scales: {
                    x: {
                        display: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            lineWidth: 1
                        },
                        ticks: {
                            color: '#fff',
                            font: {
                                size: 11
                            }
                        }
                    },
                    y: {
                        display: true,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            lineWidth: 1
                        },
                        ticks: {
                            color: '#fff',
                            font: {
                                size: 11
                            },
                            callback: function(value) {
                                return '₱' + value;
                            }
                        }
                    }
                },
                animation: {
                    duration: 1000,
                    easing: 'easeInOutQuart'
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
    }
}

// Refresh trends data
function refreshTrendsData() {
    // Show loading state
    const refreshBtn = document.getElementById('refreshTrends');
    if (refreshBtn) {
        refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Refreshing...';
        refreshBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Update chart data with new values
            Object.keys(charts).forEach(chartKey => {
                if (charts[chartKey] && chartKey !== 'comparison') {
                    const data = charts[chartKey].data.datasets[0].data;
                    // Add some random variation
                    for (let i = 0; i < data.length; i++) {
                        data[i] += (Math.random() - 0.5) * 10;
                        data[i] = Math.max(0, Math.round(data[i]));
                    }
                    charts[chartKey].update();
                }
            });
            
            // Update comparison chart
            if (charts.comparison) {
                charts.comparison.data.datasets.forEach(dataset => {
                    for (let i = 0; i < dataset.data.length; i++) {
                        dataset.data[i] += (Math.random() - 0.5) * 8;
                        dataset.data[i] = Math.max(0, Math.round(dataset.data[i]));
                    }
                });
                charts.comparison.update();
            }
            
            refreshBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh Data';
            refreshBtn.disabled = false;
        }, 1500);
    }
}

// Time range change handler
function handleTimeRangeChange() {
    const timeRange = document.getElementById('trendsTimeRange');
    if (timeRange) {
        timeRange.addEventListener('change', function() {
            const selectedRange = this.value;
            // Update labels based on selected time range
            let newLabels = [];
            
            switch(selectedRange) {
                case '7':
                    newLabels = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
                    break;
                case '30':
                    newLabels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
                    break;
                case '90':
                    newLabels = ['Jan', 'Feb', 'Mar'];
                    break;
                case '365':
                    newLabels = ['Q1', 'Q2', 'Q3', 'Q4'];
                    break;
                default:
                    newLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
            }
            
            // Update all charts with new labels
            Object.keys(charts).forEach(chartKey => {
                if (charts[chartKey]) {
                    charts[chartKey].data.labels = newLabels;
                    // Adjust data points to match new labels
                    charts[chartKey].data.datasets.forEach(dataset => {
                        if (dataset.data.length !== newLabels.length) {
                            // Resize data array to match labels
                            if (dataset.data.length > newLabels.length) {
                                dataset.data = dataset.data.slice(0, newLabels.length);
                            } else {
                                while (dataset.data.length < newLabels.length) {
                                    const lastValue = dataset.data[dataset.data.length - 1];
                                    dataset.data.push(lastValue + Math.round((Math.random() - 0.5) * 20));
                                }
                            }
                        }
                    });
                    charts[chartKey].update();
                }
            });
        });
    }
}

// Initialize charts when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Ensure price trends section is visible
    const priceTrendsSection = document.querySelector('.price-trends-section');
    if (priceTrendsSection) {
        priceTrendsSection.style.display = 'block';
        priceTrendsSection.style.visibility = 'visible';
    }
    
    // Ensure all trend containers are visible
    const trendContainers = document.querySelectorAll('.trend-container');
    trendContainers.forEach(container => {
        container.style.display = 'block';
        container.style.visibility = 'visible';
    });
    
    // Ensure trends grid is visible
    const trendsGrid = document.querySelector('.trends-grid');
    if (trendsGrid) {
        trendsGrid.style.display = 'grid';
        trendsGrid.style.visibility = 'visible';
    }
    
    // Wait for Chart.js to load
    if (typeof Chart !== 'undefined') {
        initializeCharts();
        
        // Add refresh button event listener
        const refreshBtn = document.getElementById('refreshTrends');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', refreshTrendsData);
        }
        
        // Add time range change handler
        handleTimeRangeChange();
    }
});

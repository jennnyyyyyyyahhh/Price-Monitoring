// Global script guard
(function() {
    'use strict';
    
    // Prevent script from running multiple times
    if (window.priceDashboardScriptLoaded) {
        console.log('Price dashboard script already loaded');
        return;
    }
    window.priceDashboardScriptLoaded = true;

// Price Dashboard JavaScript
class PriceDashboard {
    constructor() {
        // Prevent multiple instances
        if (window.dashboardInstance) {
            return window.dashboardInstance;
        }
        window.dashboardInstance = this;
        
        this.products = [];
        this.filteredProducts = [];
        this.currentCategory = 'all';
        this.currentView = 'grid';
        this.currentSort = 'name';
        this.searchTerm = '';
        this.priceRange = { min: null, max: null };
        this.isRendering = false; // Add rendering guard
        
        this.init();
    }

    init() {
        this.loadSampleData();
        this.checkURLParameters();
        this.bindEvents();
        this.updateStats();
        this.renderProducts();
        this.updateCategoryCounts();
    }

    checkURLParameters() {
        const urlParams = new URLSearchParams(window.location.search);
        const categoryParam = urlParams.get('category');
        
        if (categoryParam) {
            this.currentCategory = categoryParam;
            // Update the UI to show the selected category
            this.updateCategoryFilter(categoryParam);
        }
    }

    updateCategoryFilter(category) {
        // Remove active class from all filter items
        document.querySelectorAll('.filter-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Add active class to the selected category
        const targetFilter = document.querySelector(`[data-category="${category}"]`);
        if (targetFilter) {
            targetFilter.classList.add('active');
        }
        
        // Update the current category and filter products
        this.currentCategory = category;
        this.filterProducts();
    }

    loadSampleData() {
        // Prevent loading sample data multiple times
        if (this.products.length > 0) {
            return;
        }
        
        // Sample product data with price monitoring information
        this.products = [
            // Fruits
            {
                id: 1,
                name: "Red Apples",
                category: "fruits",
                currentPrice: 150.00,
                previousPrice: 140.00,
                change: 10.00,
                changePercent: 7.14,
                lastUpdated: "2 hours ago",
                vendor: "Fresh Market",
                image: "../img/apple.jpg",
                unit: "per kg"
            },
            {
                id: 2,
                name: "Bananas",
                category: "fruits",
                currentPrice: 80.00,
                previousPrice: 85.00,
                change: -5.00,
                changePercent: -5.88,
                lastUpdated: "1 hour ago",
                vendor: "Fruit Paradise",
                image: "../img/banana.jpg",
                unit: "per kg"
            },
            {
                id: 3,
                name: "Oranges",
                category: "fruits",
                currentPrice: 120.00,
                previousPrice: 120.00,
                change: 0.00,
                changePercent: 0,
                lastUpdated: "30 minutes ago",
                vendor: "Citrus Corner",
                image: "../img/orange.jpg",
                unit: "per kg"
            },
            
            // Vegetables
            {
                id: 4,
                name: "Tomatoes",
                category: "vegetables",
                currentPrice: 60.00,
                previousPrice: 70.00,
                change: -10.00,
                changePercent: -14.29,
                lastUpdated: "1 hour ago",
                vendor: "Garden Fresh",
                image: "../img/tomato.jpg",
                unit: "per kg"
            },
            {
                id: 5,
                name: "Onions",
                category: "vegetables",
                currentPrice: 45.00,
                previousPrice: 40.00,
                change: 5.00,
                changePercent: 12.5,
                lastUpdated: "3 hours ago",
                vendor: "Veggie Hub",
                image: "../img/onion.jpg",
                unit: "per kg"
            },
            {
                id: 6,
                name: "Cabbage",
                category: "vegetables",
                currentPrice: 35.00,
                previousPrice: 32.00,
                change: 3.00,
                changePercent: 9.38,
                lastUpdated: "2 hours ago",
                vendor: "Green Leaf",
                image: "../img/cabbage.jpg",
                unit: "per piece"
            },
            
            // Meat & Poultry
            {
                id: 7,
                name: "Chicken Breast",
                category: "meat",
                currentPrice: 280.00,
                previousPrice: 270.00,
                change: 10.00,
                changePercent: 3.70,
                lastUpdated: "1 hour ago",
                vendor: "Prime Meats",
                image: "../img/chicken.jpg",
                unit: "per kg"
            },
            {
                id: 8,
                name: "Pork Chops",
                category: "meat",
                currentPrice: 320.00,
                previousPrice: 315.00,
                change: 5.00,
                changePercent: 1.59,
                lastUpdated: "2 hours ago",
                vendor: "Butcher Shop",
                image: "../img/pork.jpg",
                unit: "per kg"
            },
            
            // Rice & Grains
            {
                id: 9,
                name: "Jasmine Rice",
                category: "grains",
                currentPrice: 55.00,
                previousPrice: 52.00,
                change: 3.00,
                changePercent: 5.77,
                lastUpdated: "4 hours ago",
                vendor: "Rice Depot",
                image: "../img/rice.jpg",
                unit: "per kg"
            },
            {
                id: 10,
                name: "Brown Rice",
                category: "grains",
                currentPrice: 65.00,
                previousPrice: 63.00,
                change: 2.00,
                changePercent: 3.17,
                lastUpdated: "3 hours ago",
                vendor: "Healthy Grains",
                image: "../img/brown-rice.jpg",
                unit: "per kg"
            },
            
            // Dairy Products
            {
                id: 11,
                name: "Fresh Milk",
                category: "dairy",
                currentPrice: 85.00,
                previousPrice: 82.00,
                change: 3.00,
                changePercent: 3.66,
                lastUpdated: "1 hour ago",
                vendor: "Dairy Farm",
                image: "../img/milk.jpg",
                unit: "per liter"
            },
            {
                id: 12,
                name: "Cheese",
                category: "dairy",
                currentPrice: 450.00,
                previousPrice: 440.00,
                change: 10.00,
                changePercent: 2.27,
                lastUpdated: "2 hours ago",
                vendor: "Cheese House",
                image: "../img/cheese.jpg",
                unit: "per kg"
            },
            
            // Seafood
            {
                id: 13,
                name: "Tilapia",
                category: "seafood",
                currentPrice: 180.00,
                previousPrice: 175.00,
                change: 5.00,
                changePercent: 2.86,
                lastUpdated: "1 hour ago",
                vendor: "Ocean Fresh",
                image: "../img/tilapia.jpg",
                unit: "per kg"
            },
            {
                id: 14,
                name: "Shrimp",
                category: "seafood",
                currentPrice: 550.00,
                previousPrice: 530.00,
                change: 20.00,
                changePercent: 3.77,
                lastUpdated: "30 minutes ago",
                vendor: "Seafood Market",
                image: "../img/shrimp.jpg",
                unit: "per kg"
            }
        ];

        this.filteredProducts = [...this.products];
    }

    bindEvents() {
        // Category filter events
        document.querySelectorAll('.filter-item').forEach(item => {
            item.addEventListener('click', (e) => {
                this.handleCategoryFilter(e.target.closest('.filter-item'));
            });
        });

        // Search functionality
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchTerm = e.target.value.toLowerCase();
                this.filterProducts();
            });
        }

        // Sort functionality
        document.getElementById('sortSelect').addEventListener('change', (e) => {
            this.currentSort = e.target.value;
            this.sortProducts();
        });

        // View toggle
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleViewToggle(e.target.closest('.view-btn'));
            });
        });

        // Price filter
        document.getElementById('applyPriceFilter').addEventListener('click', () => {
            this.applyPriceFilter();
        });

        // Refresh button
        document.getElementById('refreshBtn').addEventListener('click', () => {
            this.refreshData();
        });

        // Sidebar collapse
        document.getElementById('collapseSidebar').addEventListener('click', () => {
            this.toggleSidebar();
        });

        // Mobile menu toggle
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const mobileSidebarOverlay = document.getElementById('mobileSidebarOverlay');
        const sidebar = document.querySelector('.sidebar');

        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', () => {
                this.toggleMobileSidebar();
            });
        }

        if (mobileSidebarOverlay) {
            mobileSidebarOverlay.addEventListener('click', () => {
                this.closeMobileSidebar();
            });
        }

        // Close mobile sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                const sidebar = document.querySelector('.sidebar');
                const mobileMenuToggle = document.getElementById('mobileMenuToggle');
                
                if (sidebar && sidebar.classList.contains('mobile-open') && 
                    !sidebar.contains(e.target) && 
                    !mobileMenuToggle.contains(e.target)) {
                    this.closeMobileSidebar();
                }
            }
        });

        // Modal events
        document.getElementById('closeModal').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('modalOverlay').addEventListener('click', (e) => {
            if (e.target === document.getElementById('modalOverlay')) {
                this.closeModal();
            }
        });

        // Window resize handler
        window.addEventListener('resize', () => {
            this.handleWindowResize();
        });

        // Touch events for mobile optimization
        this.addTouchOptimizations();
    }

    handleCategoryFilter(filterItem) {
        // Remove active class from all filter items
        document.querySelectorAll('.filter-item').forEach(item => {
            item.classList.remove('active');
        });

        // Add active class to clicked item
        filterItem.classList.add('active');

        // Get category
        this.currentCategory = filterItem.dataset.category;

        // Update category title
        const categoryNames = {
            'all': 'All Products',
            'fruits': 'Fruits',
            'vegetables': 'Vegetables',
            'meat': 'Meat & Poultry',
            'grains': 'Rice & Grains',
            'dairy': 'Dairy Products',
            'seafood': 'Seafood'
        };

        document.getElementById('categoryTitle').textContent = categoryNames[this.currentCategory];

        // Filter and render products
        this.filterProducts();
    }

    handleViewToggle(viewBtn) {
        // Remove active class from all view buttons
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Add active class to clicked button
        viewBtn.classList.add('active');

        // Get view type
        this.currentView = viewBtn.dataset.view;

        // Update container class
        const container = document.getElementById('productsContainer');
        if (this.currentView === 'list') {
            container.classList.add('list-view');
        } else {
            container.classList.remove('list-view');
        }
    }

    filterProducts() {
        this.filteredProducts = this.products.filter(product => {
            // Category filter
            const categoryMatch = this.currentCategory === 'all' || product.category === this.currentCategory;

            // Search filter
            const searchMatch = !this.searchTerm || 
                product.name.toLowerCase().includes(this.searchTerm) ||
                product.vendor.toLowerCase().includes(this.searchTerm);

            // Price range filter
            const priceMatch = (!this.priceRange.min || product.currentPrice >= this.priceRange.min) &&
                             (!this.priceRange.max || product.currentPrice <= this.priceRange.max);

            return categoryMatch && searchMatch && priceMatch;
        });

        this.sortProducts();
        this.renderProducts();
        this.updateProductCount();
    }

    sortProducts() {
        this.filteredProducts.sort((a, b) => {
            switch (this.currentSort) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'price-low':
                    return a.currentPrice - b.currentPrice;
                case 'price-high':
                    return b.currentPrice - a.currentPrice;
                case 'change':
                    return Math.abs(b.changePercent) - Math.abs(a.changePercent);
                case 'updated':
                    // This would require actual timestamps in a real application
                    return a.id - b.id;
                default:
                    return 0;
            }
        });
    }

    renderProducts() {
        // Prevent multiple simultaneous renders
        if (this.isRendering) {
            console.log('Render already in progress, skipping...');
            return;
        }
        this.isRendering = true;
        
        const container = document.getElementById('productsContainer');
        const loadingState = document.getElementById('loadingState');
        const emptyState = document.getElementById('emptyState');

        // Aggressive clearing to prevent duplicates
        if (container) {
            container.innerHTML = '';
            // Remove all child nodes to be extra sure
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
        }

        // Show loading state
        if (loadingState) loadingState.style.display = 'block';
        if (emptyState) emptyState.style.display = 'none';

        // Simulate loading delay
        setTimeout(() => {
            if (loadingState) loadingState.style.display = 'none';

            if (this.filteredProducts.length === 0) {
                if (emptyState) emptyState.style.display = 'block';
                this.isRendering = false;
                return;
            }

            this.filteredProducts.forEach(product => {
                const productCard = this.createProductCard(product);
                container.appendChild(productCard);
            });
            
            // Reset rendering guard
            this.isRendering = false;
        }, 500);
    }

    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.addEventListener('click', () => this.showProductDetails(product));

        const changeClass = product.change > 0 ? 'positive' : product.change < 0 ? 'negative' : 'neutral';
        const changeIcon = product.change > 0 ? '↗' : product.change < 0 ? '↘' : '—';

        card.innerHTML = `
            <div class="product-header">
                <img src="${product.image}" alt="${product.name}" class="product-image" 
                     onerror="this.src='https://via.placeholder.com/50/2e9c6a/white?text=${product.name.charAt(0)}'">
                <div class="product-info">
                    <h4>${product.name}</h4>
                    <span class="product-category">${product.category}</span>
                </div>
            </div>
            <div class="product-pricing">
                <div class="current-price">₱${product.currentPrice.toFixed(2)} <small>${product.unit}</small></div>
                <div class="price-change ${changeClass}">
                    <span>${changeIcon}</span>
                    <span>₱${Math.abs(product.change).toFixed(2)} (${Math.abs(product.changePercent).toFixed(1)}%)</span>
                </div>
            </div>
            <div class="product-meta">
                <span class="last-updated">${product.lastUpdated}</span>
                <span class="vendor-info">${product.vendor}</span>
            </div>
        `;

        return card;
    }

    showProductDetails(product) {
        const modal = document.getElementById('modalOverlay');
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');

        modalTitle.textContent = product.name;

        const changeClass = product.change > 0 ? 'positive' : product.change < 0 ? 'negative' : 'neutral';
        const changeIcon = product.change > 0 ? '↗' : product.change < 0 ? '↘' : '—';

        modalBody.innerHTML = `
            <div style="display: flex; gap: 20px; margin-bottom: 20px;">
                <img src="${product.image}" alt="${product.name}" 
                     style="width: 120px; height: 120px; object-fit: cover; border-radius: 8px;"
                     onerror="this.src='https://via.placeholder.com/120/2e9c6a/white?text=${product.name.charAt(0)}'">
                <div style="flex: 1;">
                    <h3 style="margin-bottom: 8px; color: #2c3e50;">${product.name}</h3>
                    <p style="color: #7f8c8d; text-transform: uppercase; font-size: 12px; margin-bottom: 16px;">${product.category}</p>
                    <div style="font-size: 2rem; font-weight: 700; color: #2c3e50; margin-bottom: 8px;">
                        ₱${product.currentPrice.toFixed(2)} <small style="font-size: 1rem;">${product.unit}</small>
                    </div>
                    <div class="price-change ${changeClass}" style="font-size: 16px;">
                        <span>${changeIcon}</span>
                        <span>₱${Math.abs(product.change).toFixed(2)} (${Math.abs(product.changePercent).toFixed(1)}%)</span>
                    </div>
                </div>
            </div>
            
            <div style="border-top: 1px solid #e1e8ed; padding-top: 20px;">
                <h4 style="margin-bottom: 16px; color: #2c3e50;">Price History</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
                    <div>
                        <strong>Previous Price:</strong><br>
                        ₱${product.previousPrice.toFixed(2)}
                    </div>
                    <div>
                        <strong>Current Price:</strong><br>
                        ₱${product.currentPrice.toFixed(2)}
                    </div>
                </div>
                
                <h4 style="margin-bottom: 16px; color: #2c3e50;">Vendor Information</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                    <div>
                        <strong>Vendor:</strong><br>
                        ${product.vendor}
                    </div>
                    <div>
                        <strong>Last Updated:</strong><br>
                        ${product.lastUpdated}
                    </div>
                </div>
            </div>
        `;

        modal.style.display = 'flex';
    }

    closeModal() {
        document.getElementById('modalOverlay').style.display = 'none';
    }

    applyPriceFilter() {
        const minPrice = parseFloat(document.getElementById('minPrice').value) || null;
        const maxPrice = parseFloat(document.getElementById('maxPrice').value) || null;

        this.priceRange = { min: minPrice, max: maxPrice };
        this.filterProducts();
    }

    updateStats() {
        const totalProducts = this.products.length;
        const priceIncreases = this.products.filter(p => p.change > 0).length;
        const priceDecreases = this.products.filter(p => p.change < 0).length;

        document.getElementById('totalProducts').textContent = totalProducts;
        document.getElementById('priceIncreases').textContent = priceIncreases;
        document.getElementById('priceDecreases').textContent = priceDecreases;
        document.getElementById('lastUpdate').textContent = 'Just now';
    }

    updateCategoryCounts() {
        const counts = {
            all: this.products.length,
            fruits: this.products.filter(p => p.category === 'fruits').length,
            vegetables: this.products.filter(p => p.category === 'vegetables').length,
            meat: this.products.filter(p => p.category === 'meat').length,
            grains: this.products.filter(p => p.category === 'grains').length,
            dairy: this.products.filter(p => p.category === 'dairy').length,
            seafood: this.products.filter(p => p.category === 'seafood').length
        };

        Object.keys(counts).forEach(category => {
            const countElement = document.getElementById(`${category}Count`);
            if (countElement) {
                countElement.textContent = counts[category];
            }
        });
    }

    updateProductCount() {
        const count = this.filteredProducts.length;
        document.getElementById('productCount').textContent = `${count} product${count !== 1 ? 's' : ''} found`;
    }

    refreshData() {
        const refreshBtn = document.getElementById('refreshBtn');
        refreshBtn.style.transform = 'rotate(360deg)';
        refreshBtn.style.transition = 'transform 0.5s ease';

        // Simulate data refresh
        setTimeout(() => {
            // In a real application, this would fetch new data from the server
            this.updateRandomPrices();
            this.updateStats();
            this.filterProducts();
            
            refreshBtn.style.transform = 'rotate(0deg)';
            
            // Show a brief success message
            this.showNotification('Data refreshed successfully!');
        }, 1000);
    }

    updateRandomPrices() {
        // Simulate price changes for demo purposes
        this.products.forEach(product => {
            const randomChange = (Math.random() - 0.5) * 20; // Random change between -10 and +10
            product.previousPrice = product.currentPrice;
            product.currentPrice = Math.max(10, product.currentPrice + randomChange);
            product.change = product.currentPrice - product.previousPrice;
            product.changePercent = (product.change / product.previousPrice) * 100;
            product.lastUpdated = 'Just now';
        });
    }

    toggleSidebar() {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.toggle('collapsed');
    }

    toggleMobileSidebar() {
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.getElementById('mobileSidebarOverlay');
        
        if (sidebar.classList.contains('mobile-open')) {
            this.closeMobileSidebar();
        } else {
            sidebar.classList.add('mobile-open');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeMobileSidebar() {
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.getElementById('mobileSidebarOverlay');
        
        sidebar.classList.remove('mobile-open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    handleWindowResize() {
        // Close mobile sidebar when resizing to larger screen
        if (window.innerWidth > 768) {
            this.closeMobileSidebar();
        }
        
        // Update view if needed
        this.updateResponsiveView();
    }

    updateResponsiveView() {
        // Force grid view on mobile for better UX
        if (window.innerWidth <= 480 && this.currentView === 'list') {
            this.currentView = 'grid';
            const container = document.getElementById('productsContainer');
            container.classList.remove('list-view');
            
            // Update view toggle buttons
            document.querySelectorAll('.view-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.view === 'grid') {
                    btn.classList.add('active');
                }
            });
        }
    }

    addTouchOptimizations() {
        if ('ontouchstart' in window) {
            // Add touch feedback for interactive elements
            const interactiveElements = document.querySelectorAll(
                '.filter-item, .stat-card, .product-card, .refresh-btn, .filter-btn'
            );
            
            interactiveElements.forEach(element => {
                element.addEventListener('touchstart', function() {
                    this.style.transform = 'scale(0.98)';
                    this.style.transition = 'transform 0.1s ease';
                });
                
                element.addEventListener('touchend', function() {
                    setTimeout(() => {
                        this.style.transform = '';
                        this.style.transition = '';
                    }, 100);
                });
                
                // Prevent double-tap zoom on buttons
                if (element.tagName === 'BUTTON') {
                    element.addEventListener('touchend', function(e) {
                        e.preventDefault();
                    });
                }
            });
        }
    }

    addMobileMenuToggle() {
        // This method is now handled in bindEvents for better organization
        // Keeping for backward compatibility
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #2e9c6a;
            color: white;
            padding: 12px 20px;
            border-radius: 6px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1001;
            animation: slideIn 0.3s ease;
            max-width: calc(100vw - 40px);
            word-wrap: break-word;
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Guard to prevent multiple dashboard instances
    if (!window.priceDashboardInitialized) {
        console.log('Initializing Price Dashboard...');
        window.priceDashboardInitialized = true;
        new PriceDashboard();
    } else {
        console.log('Price Dashboard already initialized, skipping...');
    }
});

})(); // End of global script guard

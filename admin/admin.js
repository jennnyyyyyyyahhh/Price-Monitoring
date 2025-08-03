// Admin Dashboard JavaScript
class AdminDashboard {
    constructor() {
        this.currentSection = 'dashboard';
        this.charts = {};
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeCharts();
        this.loadDashboardData();
        this.setupMobileNavigation();
        this.loadSidebarState(); // Load saved sidebar state
    }

    setupEventListeners() {
        // Sidebar navigation
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionId = link.getAttribute('data-section');
                this.showSection(sectionId);
                this.setActiveNavLink(link);
            });
        });

        // Sidebar toggle
        const sidebarToggle = document.getElementById('sidebarToggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => {
                this.toggleSidebar();
            });
        }

        // Logout button
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                this.logout();
            });
        }

        // Mobile sidebar overlay
        const mobileOverlay = document.getElementById('mobileSidebarOverlay');
        if (mobileOverlay) {
            mobileOverlay.addEventListener('click', () => {
                this.closeMobileSidebar();
            });
        }

        // Category filter
        const categoryFilter = document.getElementById('categoryFilter');
        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                this.updateCategoryCharts(e.target.value);
            });
        }
    }

    setupMobileNavigation() {
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        
        const handleMobileLayout = (e) => {
            const sidebar = document.getElementById('sidebar');
            const mainContent = document.getElementById('mainContent');
            const overlay = document.getElementById('mobileSidebarOverlay');
            
            if (e.matches) {
                // Mobile layout - reset desktop collapsed state
                sidebar.classList.remove('collapsed');
                mainContent.classList.remove('expanded');
                
                // Ensure sidebar is hidden on mobile initially
                sidebar.classList.remove('active');
                if (overlay) {
                    overlay.classList.remove('active');
                }
                this.closeMobileSidebar();
            } else {
                // Desktop layout - restore saved collapsed state
                this.closeMobileSidebar();
                this.loadSidebarState();
            }
        };

        mediaQuery.addListener(handleMobileLayout);
        handleMobileLayout(mediaQuery);
        
        // Handle window resize for responsive charts
        this.handleWindowResize();
    }
    
    handleWindowResize() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.updateAllCharts();
                this.adjustLayoutForScreenSize();
            }, 150);
        });
    }
    
    adjustLayoutForScreenSize() {
        const isMobile = window.innerWidth <= 768;
        const isTablet = window.innerWidth <= 992 && window.innerWidth > 768;
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('mainContent');
        
        if (isMobile) {
            // Mobile adjustments
            sidebar.style.width = '280px';
            if (sidebar.classList.contains('active')) {
                this.showMobileSidebarOverlay();
            }
        } else if (isTablet) {
            // Tablet adjustments
            sidebar.style.width = '250px';
        } else {
            // Desktop adjustments
            sidebar.style.width = '280px';
            this.closeMobileSidebar();
        }
    }

    showSection(sectionId) {
        // Hide all sections
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = sectionId;
        }

        // Close mobile sidebar if open
        if (window.innerWidth <= 768) {
            this.closeMobileSidebar();
        }
    }

    setActiveNavLink(activeLink) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('mainContent');
        const toggle = document.getElementById('sidebarToggle');

        if (window.innerWidth <= 768) {
            // Mobile behavior - slide in/out
            const isActive = sidebar.classList.contains('active');
            if (isActive) {
                this.closeMobileSidebar();
            } else {
                sidebar.classList.add('active');
                this.showMobileSidebarOverlay();
            }
        } else {
            // Desktop behavior - collapse/expand
            const isCollapsed = sidebar.classList.contains('collapsed');
            
            if (isCollapsed) {
                // Expand sidebar
                sidebar.classList.remove('collapsed');
                mainContent.classList.remove('expanded');
                toggle.classList.add('sidebar-toggle-animation');
                
                // Store preference
                localStorage.setItem('sidebarCollapsed', 'false');
            } else {
                // Collapse sidebar
                sidebar.classList.add('collapsed');
                mainContent.classList.add('expanded');
                toggle.classList.add('sidebar-toggle-animation');
                
                // Store preference
                localStorage.setItem('sidebarCollapsed', 'true');
            }
            
            // Remove animation class after animation completes
            setTimeout(() => {
                toggle.classList.remove('sidebar-toggle-animation');
            }, 300);
            
            // Update charts after layout change
            setTimeout(() => {
                this.updateAllCharts();
            }, 350);
        }
    }
    
    // Load sidebar state on page load
    loadSidebarState() {
        if (window.innerWidth > 768) {
            const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
            const sidebar = document.getElementById('sidebar');
            const mainContent = document.getElementById('mainContent');
            
            if (isCollapsed) {
                sidebar.classList.add('collapsed');
                mainContent.classList.add('expanded');
            }
        }
    }

    closeMobileSidebar() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('mobileSidebarOverlay');
        
        if (sidebar) {
            sidebar.classList.remove('active');
        }
        if (overlay) {
            overlay.classList.remove('active');
        }
        
        // Re-enable body scroll
        document.body.style.overflow = '';
    }
    
    showMobileSidebarOverlay() {
        const overlay = document.getElementById('mobileSidebarOverlay');
        if (overlay) {
            overlay.classList.add('active');
        }
        
        // Prevent body scroll when sidebar is open
        document.body.style.overflow = 'hidden';
    }

    logout() {
        if (confirm('Are you sure you want to logout?')) {
            // Clear admin session data
            localStorage.removeItem('adminSession');
            // Redirect to login page
            window.location.href = '../html/landing.html';
        }
    }

    loadDashboardData() {
        // Simulate loading dashboard statistics
        this.updateStats();
        
        // Update charts with sample data
        setTimeout(() => {
            this.updateAllCharts();
        }, 500);
    }

    updateStats() {
        // Sample statistics data
        const stats = {
            fruits: { total: 245, change: 12 },
            vegetables: { total: 189, change: 8 },
            seafood: { total: 167, change: -3 },
            poultry: { total: 123, change: 15 },
            meat: { total: 98, change: 5 },
            rice: { total: 76, change: 20 }
        };

        // Update stat cards
        Object.keys(stats).forEach(category => {
            const totalElement = document.getElementById(`${category}Total`);
            if (totalElement) {
                totalElement.textContent = stats[category].total;
            }
        });
    }

    initializeCharts() {
        // Initialize individual category charts only
        this.initCategoryCharts();
    }

    initCategoryCharts() {
        // Initialize individual category charts
        this.initFruitsChart();
        this.initVegetablesChart();
        this.initSeafoodChart();
        this.initPoultryChart();
        this.initMeatChart();
        this.initRiceChart();
    }

    initFruitsChart() {
        const ctx = document.getElementById('fruitsChart');
        if (!ctx) return;

        this.charts.fruits = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [{
                    label: 'Average Price',
                    data: [43, 46, 44, 48],
                    borderColor: '#2e9c6a',
                    backgroundColor: 'rgba(46, 156, 106, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
    }

    initVegetablesChart() {
        const ctx = document.getElementById('vegetablesChart');
        if (!ctx) return;

        this.charts.vegetables = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Tomato', 'Onion', 'Cabbage', 'Carrot'],
                datasets: [{
                    label: 'Price (₱)',
                    data: [35, 28, 32, 40],
                    backgroundColor: ['#27ae60', '#2ecc71', '#58d68d', '#82e0aa'],
                    borderColor: '#27ae60',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    initSeafoodChart() {
        const ctx = document.getElementById('seafoodChart');
        if (!ctx) return;

        this.charts.seafood = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Tilapia', 'Bangus', 'Shrimp', 'Tuna'],
                datasets: [{
                    data: [40, 30, 20, 10],
                    backgroundColor: ['#3498db', '#5dade2', '#85c1e9', '#aed6f1'],
                    borderColor: '#fff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right'
                    }
                }
            }
        });
    }

    initPoultryChart() {
        const ctx = document.getElementById('poultryChart');
        if (!ctx) return;

        this.charts.poultry = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Chicken Price',
                    data: [160, 165, 162, 168, 170, 166],
                    borderColor: '#e67e22',
                    backgroundColor: 'rgba(230, 126, 34, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
    }

    initMeatChart() {
        const ctx = document.getElementById('meatChart');
        if (!ctx) return;

        this.charts.meat = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Pork', 'Beef', 'Goat'],
                datasets: [{
                    label: 'Price per kg (₱)',
                    data: [280, 350, 320],
                    backgroundColor: ['#e74c3c', '#c0392b', '#a93226'],
                    borderColor: '#e74c3c',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    initRiceChart() {
        const ctx = document.getElementById('riceChart');
        if (!ctx) return;

        this.charts.rice = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [{
                    label: 'Rice Price Trend',
                    data: [50, 52, 53, 52],
                    borderColor: '#f39c12',
                    backgroundColor: 'rgba(243, 156, 18, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
    }

    updateCategoryCharts(period) {
        // Update all category charts based on selected period
        console.log(`Updating category charts for ${period} days`);
        
        // Update each category chart with new data based on the period
        this.updateCategoryChart('fruits', period);
        this.updateCategoryChart('vegetables', period);
        this.updateCategoryChart('seafood', period);
        this.updateCategoryChart('poultry', period);
        this.updateCategoryChart('meat', period);
        this.updateCategoryChart('rice', period);
    }

    updateCategoryChart(category, period) {
        const chart = this.charts[category];
        if (!chart) return;

        let labels, data;
        
        switch(period) {
            case '7':
                labels = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
                data = this.generateRandomData(7, category);
                break;
            case '14':
                labels = ['Week 1', 'Week 2'];
                data = this.generateRandomData(2, category);
                break;
            case '21':
                labels = ['Week 1', 'Week 2', 'Week 3'];
                data = this.generateRandomData(3, category);
                break;
            case '30':
                labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
                data = this.generateRandomData(4, category);
                break;
        }

        // Update chart data
        chart.data.labels = labels;
        if (chart.config.type === 'line') {
            chart.data.datasets[0].data = data;
        } else if (chart.config.type === 'bar') {
            chart.data.datasets[0].data = data.slice(0, chart.data.labels.length);
        } else if (chart.config.type === 'doughnut') {
            chart.data.datasets[0].data = data.slice(0, chart.data.labels.length);
        }
        chart.update();
    }

    generateRandomData(count, category) {
        // Generate sample data based on category
        const baseValues = {
            fruits: 45,
            vegetables: 32,
            seafood: 180,
            poultry: 165,
            meat: 280,
            rice: 52
        };
        
        const base = baseValues[category] || 50;
        return Array.from({length: count}, () => 
            Math.floor(base + (Math.random() - 0.5) * base * 0.2)
        );
    }

    updateAllCharts() {
        // Update all charts
        Object.values(this.charts).forEach(chart => {
            if (chart) {
                chart.update();
            }
        });
    }

    // Utility methods for data management
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP'
        }).format(amount);
    }

    formatPercentage(value) {
        return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
    }

    showLoading(element) {
        element.classList.add('loading');
    }

    hideLoading(element) {
        element.classList.remove('loading');
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Initialize admin dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const adminDashboard = new AdminDashboard();
    
    // Make dashboard instance globally available for debugging
    window.adminDashboard = adminDashboard;
});

// Handle page resize
window.addEventListener('resize', () => {
    if (window.adminDashboard) {
        window.adminDashboard.updateAllCharts();
    }
});

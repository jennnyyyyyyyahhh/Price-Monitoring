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
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [{
                    label: 'Average Price',
                    data: [30, 32, 35, 33],
                    borderColor: '#27ae60',
                    backgroundColor: 'rgba(39, 174, 96, 0.1)',
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

    initSeafoodChart() {
        const ctx = document.getElementById('seafoodChart');
        if (!ctx) return;

        this.charts.seafood = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [{
                    label: 'Average Price',
                    data: [185, 180, 175, 180],
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
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
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                datasets: [{
                    label: 'Average Price',
                    data: [275, 280, 285, 281],
                    borderColor: '#e74c3c',
                    backgroundColor: 'rgba(231, 76, 60, 0.1)',
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

// User Management functionality
class UserManagement {
    constructor() {
        this.users = [
            { id: 1, firstName: 'Jenny', lastName: 'Hehe', email: 'jenn@tanzamarket.com', role: 'admin', status: 'active', lastLogin: '2 hours ago', phone: '+63 912 345 6789', storename: 'Manukan' },
            { id: 2, firstName: 'Maria', lastName: 'Poknat', email: 'maria@gmail.com', role: 'vendor', status: 'active', lastLogin: '1 day ago', phone: '+63 918 123 4567', storename: 'Gulayan' },
            { id: 3, firstName: 'Jeff', lastName: 'Tokyo', email: 'jeff.tokyo@tanzamarket.com', role: 'admin', status: 'inactive', lastLogin: '1 week ago', phone: '+63 915 987 6543', storename: 'Manukan' },
            { id: 4, firstName: 'Ana', lastName: 'Olaf', email: 'ana@tanzamarket.com', role: 'admin', status: 'pending', lastLogin: 'Never', phone: '+63 917 456 7890', storename: 'Bigasan' },
            { id: 5, firstName: 'Pedro', lastName: 'Penduko', email: 'pedro@gmail.com', role: 'vendor', status: 'active', lastLogin: '3 days ago', phone: '+63 920 234 5678', storename: 'Prutasan' }
        ];
        this.selectedUsers = new Set();
        this.currentEditingUser = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderUsers();
    }

    setupEventListeners() {
        // Add user button
        const addUserBtn = document.getElementById('addUserBtn');
        if (addUserBtn) {
            addUserBtn.addEventListener('click', () => this.showAddUserModal());
        }

        // Search functionality
        const searchInput = document.getElementById('userSearchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.filterUsers());
        }

        // Filter functionality
        const roleFilter = document.getElementById('roleFilter');
        const statusFilter = document.getElementById('statusFilter');
        if (roleFilter) {
            roleFilter.addEventListener('change', () => this.filterUsers());
        }
        if (statusFilter) {
            statusFilter.addEventListener('change', () => this.filterUsers());
        }

        // Select all checkbox
        const selectAllUsers = document.getElementById('selectAllUsers');
        if (selectAllUsers) {
            selectAllUsers.addEventListener('change', (e) => this.toggleSelectAll(e.target.checked));
        }

        // Modal close buttons
        const closeModal = document.getElementById('closeModal');
        const cancelBtn = document.getElementById('cancelBtn');
        const closeDetailsModal = document.getElementById('closeDetailsModal');
        const closeDetailsBtn = document.getElementById('closeDetailsBtn');

        [closeModal, cancelBtn].forEach(btn => {
            if (btn) {
                btn.addEventListener('click', () => this.hideUserModal());
            }
        });

        [closeDetailsModal, closeDetailsBtn].forEach(btn => {
            if (btn) {
                btn.addEventListener('click', () => this.hideUserDetailsModal());
            }
        });

        // Form submission
        const userForm = document.getElementById('userForm');
        if (userForm) {
            userForm.addEventListener('submit', (e) => this.handleUserFormSubmit(e));
        }

        // Bulk actions
        const bulkActivate = document.getElementById('bulkActivate');
        const bulkDeactivate = document.getElementById('bulkDeactivate');
        const bulkDelete = document.getElementById('bulkDelete');

        if (bulkActivate) {
            bulkActivate.addEventListener('click', () => this.bulkAction('activate'));
        }
        if (bulkDeactivate) {
            bulkDeactivate.addEventListener('click', () => this.bulkAction('deactivate'));
        }
        if (bulkDelete) {
            bulkDelete.addEventListener('click', () => this.bulkAction('delete'));
        }

        // Close modal when clicking outside
        const userModal = document.getElementById('userModal');
        const userDetailsModal = document.getElementById('userDetailsModal');
        
        [userModal, userDetailsModal].forEach(modal => {
            if (modal) {
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        modal.classList.remove('show');
                    }
                });
            }
        });
    }

    renderUsers() {
        const tbody = document.getElementById('usersTableBody');
        if (!tbody) return;

        const searchTerm = document.getElementById('userSearchInput')?.value.toLowerCase() || '';
        const roleFilter = document.getElementById('roleFilter')?.value || '';
        const statusFilter = document.getElementById('statusFilter')?.value || '';

        const filteredUsers = this.users.filter(user => {
            const matchesSearch = `${user.firstName} ${user.lastName} ${user.email}`.toLowerCase().includes(searchTerm);
            const matchesRole = !roleFilter || user.role === roleFilter;
            const matchesStatus = !statusFilter || user.status === statusFilter;
            return matchesSearch && matchesRole && matchesStatus;
        });

        tbody.innerHTML = filteredUsers.map(user => `
            <tr data-user-id="${user.id}">
                <td><input type="checkbox" class="user-checkbox" data-user-id="${user.id}" ${this.selectedUsers.has(user.id) ? 'checked' : ''}></td>
                <td>
                    <div class="user-info">
                        <img src="https://via.placeholder.com/40" alt="User Avatar" class="user-avatar">
                        <div class="user-details">
                            <span class="user-name">${user.firstName} ${user.lastName}</span>
                            <span class="user-id">#${user.id.toString().padStart(3, '0')}</span>
                        </div>
                    </div>
                </td>
                <td>${user.email}</td>
                <td><span class="role-badge ${user.role}">${user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span></td>
                <td><span class="status-badge ${user.status}">${user.status.charAt(0).toUpperCase() + user.status.slice(1)}</span></td>
                <td>${user.lastLogin}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-icon edit-user" data-user-id="${user.id}" title="Edit User">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-icon view-user" data-user-id="${user.id}" title="View Details">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-icon delete-user" data-user-id="${user.id}" title="Delete User">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');

        // Re-attach event listeners for action buttons and checkboxes
        this.attachActionListeners();
        this.updateBulkActionsVisibility();
    }

    attachActionListeners() {
        // Edit user buttons
        document.querySelectorAll('.edit-user').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const userId = parseInt(e.currentTarget.getAttribute('data-user-id'));
                this.editUser(userId);
            });
        });

        // View user buttons
        document.querySelectorAll('.view-user').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const userId = parseInt(e.currentTarget.getAttribute('data-user-id'));
                this.viewUser(userId);
            });
        });

        // Delete user buttons
        document.querySelectorAll('.delete-user').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const userId = parseInt(e.currentTarget.getAttribute('data-user-id'));
                this.deleteUser(userId);
            });
        });

        // User checkboxes
        document.querySelectorAll('.user-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const userId = parseInt(e.target.getAttribute('data-user-id'));
                if (e.target.checked) {
                    this.selectedUsers.add(userId);
                } else {
                    this.selectedUsers.delete(userId);
                }
                this.updateBulkActionsVisibility();
            });
        });
    }

    filterUsers() {
        this.renderUsers();
    }

    toggleSelectAll(checked) {
        this.selectedUsers.clear();
        if (checked) {
            // Get currently visible users
            const visibleUsers = this.getFilteredUsers();
            visibleUsers.forEach(user => this.selectedUsers.add(user.id));
        }
        this.renderUsers();
    }

    getFilteredUsers() {
        const searchTerm = document.getElementById('userSearchInput')?.value.toLowerCase() || '';
        const roleFilter = document.getElementById('roleFilter')?.value || '';
        const statusFilter = document.getElementById('statusFilter')?.value || '';

        return this.users.filter(user => {
            const matchesSearch = `${user.firstName} ${user.lastName} ${user.email}`.toLowerCase().includes(searchTerm);
            const matchesRole = !roleFilter || user.role === roleFilter;
            const matchesStatus = !statusFilter || user.status === statusFilter;
            return matchesSearch && matchesRole && matchesStatus;
        });
    }

    updateBulkActionsVisibility() {
        const bulkActions = document.getElementById('bulkActions');
        const selectedCount = document.getElementById('selectedCount');
        
        if (bulkActions && selectedCount) {
            if (this.selectedUsers.size > 0) {
                bulkActions.style.display = 'flex';
                selectedCount.textContent = this.selectedUsers.size;
            } else {
                bulkActions.style.display = 'none';
            }
        }
    }

    showAddUserModal() {
        this.currentEditingUser = null;
        const modal = document.getElementById('userModal');
        const modalTitle = document.getElementById('modalTitle');
        const form = document.getElementById('userForm');

        if (modal && modalTitle && form) {
            modalTitle.textContent = 'Add New User';
            form.reset();
            modal.classList.add('show');
        }
    }

    editUser(userId) {
        const user = this.users.find(u => u.id === userId);
        if (!user) return;

        this.currentEditingUser = user;
        const modal = document.getElementById('userModal');
        const modalTitle = document.getElementById('modalTitle');

        if (modal && modalTitle) {
            modalTitle.textContent = 'Edit User';
            
            // Populate form fields
            document.getElementById('firstName').value = user.firstName;
            document.getElementById('lastName').value = user.lastName;
            document.getElementById('email').value = user.email;
            document.getElementById('role').value = user.role;
            document.getElementById('status').value = user.status;
            document.getElementById('phone').value = user.phone || ''

            modal.classList.add('show');
        }
    }

    viewUser(userId) {
        const user = this.users.find(u => u.id === userId);
        if (!user) return;

        const modal = document.getElementById('userDetailsModal');
        const content = document.getElementById('userDetailsContent');

        if (modal && content) {
            content.innerHTML = `
                <div class="user-details-avatar">
                    <img src="https://via.placeholder.com/120" alt="User Avatar">
                    <h3>${user.firstName} ${user.lastName}</h3>
                    <span class="role-badge ${user.role}">${user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>
                </div>
                <div class="user-details-info">
                    <div class="detail-item">
                        <span class="detail-label">Email</span>
                        <span class="detail-value">${user.email}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Phone</span>
                        <span class="detail-value">${user.phone || 'Not provided'}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Status</span>
                        <span class="detail-value">
                            <span class="status-badge ${user.status}">${user.status.charAt(0).toUpperCase() + user.status.slice(1)}</span>
                        </span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Last Login</span>
                        <span class="detail-value">${user.lastLogin}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">User ID</span>
                        <span class="detail-value">#${user.id.toString().padStart(3, '0')}</span>
                    </div>
                </div>
            `;
            modal.classList.add('show');
        }
    }

    deleteUser(userId) {
        if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            this.users = this.users.filter(user => user.id !== userId);
            this.selectedUsers.delete(userId);
            this.renderUsers();
            this.showNotification('User deleted successfully', 'success');
        }
    }

    hideUserModal() {
        const modal = document.getElementById('userModal');
        if (modal) {
            modal.classList.remove('show');
        }
    }

    hideUserDetailsModal() {
        const modal = document.getElementById('userDetailsModal');
        if (modal) {
            modal.classList.remove('show');
        }
    }

    handleUserFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const userData = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            role: formData.get('role'),
            status: formData.get('status'),
            phone: formData.get('phone'),
        };

        if (this.currentEditingUser) {
            // Update existing user
            const index = this.users.findIndex(u => u.id === this.currentEditingUser.id);
            if (index !== -1) {
                this.users[index] = { ...this.users[index], ...userData };
                this.showNotification('User updated successfully', 'success');
            }
        } else {
            // Add new user
            const newUser = {
                ...userData,
                id: Math.max(...this.users.map(u => u.id)) + 1,
                lastLogin: 'Never'
            };
            this.users.push(newUser);
            this.showNotification('User added successfully', 'success');
        }

        this.renderUsers();
        this.hideUserModal();
    }

    bulkAction(action) {
        const selectedUserIds = Array.from(this.selectedUsers);
        if (selectedUserIds.length === 0) return;

        let confirmMessage = '';
        switch (action) {
            case 'activate':
                confirmMessage = `Are you sure you want to activate ${selectedUserIds.length} user(s)?`;
                break;
            case 'deactivate':
                confirmMessage = `Are you sure you want to deactivate ${selectedUserIds.length} user(s)?`;
                break;
            case 'delete':
                confirmMessage = `Are you sure you want to delete ${selectedUserIds.length} user(s)? This action cannot be undone.`;
                break;
        }

        if (confirm(confirmMessage)) {
            switch (action) {
                case 'activate':
                    this.users.forEach(user => {
                        if (selectedUserIds.includes(user.id)) {
                            user.status = 'active';
                        }
                    });
                    this.showNotification(`${selectedUserIds.length} user(s) activated`, 'success');
                    break;
                case 'deactivate':
                    this.users.forEach(user => {
                        if (selectedUserIds.includes(user.id)) {
                            user.status = 'inactive';
                        }
                    });
                    this.showNotification(`${selectedUserIds.length} user(s) deactivated`, 'success');
                    break;
                case 'delete':
                    this.users = this.users.filter(user => !selectedUserIds.includes(user.id));
                    this.showNotification(`${selectedUserIds.length} user(s) deleted`, 'success');
                    break;
            }

            this.selectedUsers.clear();
            this.renderUsers();
        }
    }

    showNotification(message, type = 'info') {
        // Create a simple notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10001;
            font-weight: 600;
        `;

        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 3000);
    }
}

// Initialize user management when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Initialize user management if we're on the user management section
    if (document.getElementById('usersTable')) {
        window.userManagement = new UserManagement();
    }
});

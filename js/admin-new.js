// Admin Dashboard JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const menuItems = document.querySelectorAll('.menu-item');
    const contentSections = document.querySelectorAll('.content-section');
    const mainContent = document.querySelector('.main-content');

    // Sidebar collapse functionality
    function collapseSidebar() {
        sidebar.classList.toggle('collapsed');
        localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
        
        // Update main content margin for better responsiveness
        updateMainContentMargin();
    }

    // Update main content margin based on sidebar state
    function updateMainContentMargin() {
        if (sidebar.classList.contains('collapsed')) {
            mainContent.style.marginLeft = '70px';
        } else {
            mainContent.style.marginLeft = '280px';
        }
    }

    // Initialize sidebar state from localStorage
    if (localStorage.getItem('sidebarCollapsed') === 'true') {
        sidebar.classList.add('collapsed');
        updateMainContentMargin();
    }

    // Navbar functionality
    initializeNavbar();

    // Event listeners
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // On mobile, toggle sidebar visibility; on desktop, collapse/expand
            if (window.innerWidth <= 768) {
                sidebar.classList.toggle('active');
                document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
            } else {
                collapseSidebar();
            }
        });
        
        // Touch events for better mobile responsiveness
        sidebarToggle.addEventListener('touchstart', function(e) {
            e.preventDefault();
        });
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && 
            sidebar.classList.contains('active') && 
            !sidebar.contains(e.target) && 
            !sidebarToggle.contains(e.target)) {
            sidebar.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('active');
            document.body.style.overflow = '';
            updateMainContentMargin();
        } else {
            mainContent.style.marginLeft = '0';
        }
    });

    // Close sidebar when clicking outside on mobile - removed since no hamburger menu

    // Navigation functionality
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all menu items
            menuItems.forEach(menuItem => menuItem.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Get the target section
            const targetSection = this.getAttribute('data-section');
            
            // Hide all content sections with smooth transition
            contentSections.forEach(section => {
                section.classList.remove('active');
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
            });
            
            // Show target section with smooth transition
            const targetElement = document.getElementById(targetSection + '-section');
            if (targetElement) {
                setTimeout(() => {
                    targetElement.classList.add('active');
                    targetElement.style.opacity = '1';
                    targetElement.style.transform = 'translateY(0)';
                }, 150);
            }

            // Update page title and browser history
            updatePageTitle(this.textContent.trim());
            
            // Close sidebar on mobile after navigation
            if (window.innerWidth <= 768 && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                document.body.style.overflow = '';
            }
            
            // Scroll to top of content
            if (mainContent) {
                mainContent.scrollTop = 0;
            }
            
            // Add loading effect
            showLoadingEffect(targetElement);
        });
    });

    // Update page title based on active section
    function updatePageTitle(sectionName) {
        document.title = `Admin Dashboard - ${sectionName}`;
        
        // Update browser history without page reload
        const url = new URL(window.location);
        url.searchParams.set('section', sectionName.toLowerCase().replace(/\s+/g, '-'));
        window.history.pushState({section: sectionName}, '', url);
    }

    // Add loading effect to section transitions
    function showLoadingEffect(targetElement) {
        if (!targetElement) return;
        
        // Add loading indicator
        const loadingIndicator = document.createElement('div');
        loadingIndicator.className = 'section-loading';
        loadingIndicator.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        
        const sectionHeader = targetElement.querySelector('.section-header');
        if (sectionHeader) {
            sectionHeader.appendChild(loadingIndicator);
            
            // Remove loading indicator after a short delay
            setTimeout(() => {
                if (loadingIndicator.parentNode) {
                    loadingIndicator.remove();
                }
            }, 800);
        }
    }

    // Handle browser back/forward navigation
    window.addEventListener('popstate', function(event) {
        const urlParams = new URLSearchParams(window.location.search);
        const section = urlParams.get('section');
        
        if (section) {
            const targetMenuItem = document.querySelector(`[data-section="${section.replace(/-/g, '-')}"]`);
            if (targetMenuItem) {
                targetMenuItem.click();
            }
        }
    });

    // Initialize current section from URL
    function initializeFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const section = urlParams.get('section');
        
        if (section) {
            const targetMenuItem = document.querySelector(`[data-section="${section}"]`);
            if (targetMenuItem && !targetMenuItem.classList.contains('active')) {
                targetMenuItem.click();
            }
        }
    }

    function showNotifications() {
        // Create notification modal or dropdown
        const existingModal = document.querySelector('.notification-modal');
        if (existingModal) {
            existingModal.remove();
            return;
        }

        const modal = document.createElement('div');
        modal.className = 'notification-modal';
        modal.innerHTML = `
            <div class="notification-content">
                <div class="notification-header">
                    <h3><i class="fas fa-bell"></i> Notifications</h3>
                    <button class="close-notification">&times;</button>
                </div>
                <div class="notification-list">
                    <div class="notification-item unread">
                        <div class="notification-icon">
                            <i class="fas fa-user-plus"></i>
                        </div>
                        <div class="notification-details">
                            <h4>New Vendor Registration</h4>
                            <p>Farm Fresh Produce has submitted a registration request</p>
                            <small>2 minutes ago</small>
                        </div>
                    </div>
                    <div class="notification-item unread">
                        <div class="notification-icon">
                            <i class="fas fa-exclamation-triangle"></i>
                        </div>
                        <div class="notification-details">
                            <h4>Calamity Alert</h4>
                            <p>Flood warning issued for Region III</p>
                            <small>15 minutes ago</small>
                        </div>
                    </div>
                    <div class="notification-item">
                        <div class="notification-icon">
                            <i class="fas fa-chart-line"></i>
                        </div>
                        <div class="notification-details">
                            <h4>Survey Response</h4>
                            <p>Market Survey #23 has received new responses</p>
                            <small>1 hour ago</small>
                        </div>
                    </div>
                    <div class="notification-item">
                        <div class="notification-icon">
                            <i class="fas fa-store"></i>
                        </div>
                        <div class="notification-details">
                            <h4>Stall Assignment</h4>
                            <p>Stall B-15 has been assigned to Green Valley Farm</p>
                            <small>3 hours ago</small>
                        </div>
                    </div>
                </div>
                <div class="notification-footer">
                    <button class="btn-view-all">View All Notifications</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Close notification modal
        const closeBtn = modal.querySelector('.close-notification');
        closeBtn.addEventListener('click', () => modal.remove());

        // Close when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });

        // Mark as read functionality
        const notificationItems = modal.querySelectorAll('.notification-item');
        notificationItems.forEach(item => {
            item.addEventListener('click', function() {
                this.classList.remove('unread');
            });
        });
    }

    // Dashboard stats animation
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.textContent);
            const increment = target / 50;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = target;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current);
                }
            }, 20);
        });
    }

    // Initialize dashboard stats animation when dashboard is active
    const dashboardSection = document.getElementById('dashboard');
    if (dashboardSection && dashboardSection.classList.contains('active')) {
        setTimeout(animateStats, 500);
    }

    // Re-animate stats when dashboard section becomes active
    const dashboardMenuItem = document.querySelector('[data-section="dashboard"]');
    if (dashboardMenuItem) {
        dashboardMenuItem.addEventListener('click', () => {
            setTimeout(animateStats, 300);
        });
    }

    // Survey form functionality
    const surveyForm = document.getElementById('survey-form');
    if (surveyForm) {
        surveyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const surveyData = Object.fromEntries(formData);
            
            // Simulate survey creation
            showAlert('Survey created successfully!', 'success');
            this.reset();
        });
    }

    // Vendor registration form
    const vendorRegistrationForm = document.getElementById('vendor-registration-form');
    if (vendorRegistrationForm) {
        vendorRegistrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const vendorData = Object.fromEntries(formData);
            
            // Simulate vendor registration
            showAlert('Vendor registered successfully!', 'success');
            this.reset();
        });
    }

    // Calamity event form
    const calamityForm = document.getElementById('calamity-form');
    if (calamityForm) {
        calamityForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const calamityData = Object.fromEntries(formData);
            
            // Simulate calamity event creation
            showAlert('Calamity event recorded successfully!', 'warning');
            this.reset();
        });
    }

    // Alert system
    function showAlert(message, type = 'info') {
        const alertContainer = document.createElement('div');
        alertContainer.className = `alert alert-${type}`;
        alertContainer.innerHTML = `
            <div class="alert-content">
                <i class="fas fa-${getAlertIcon(type)}"></i>
                <span>${message}</span>
                <button class="alert-close">&times;</button>
            </div>
        `;
        
        document.body.appendChild(alertContainer);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (alertContainer.parentNode) {
                alertContainer.remove();
            }
        }, 5000);
        
        // Manual close
        const closeBtn = alertContainer.querySelector('.alert-close');
        closeBtn.addEventListener('click', () => alertContainer.remove());
    }

    function getAlertIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    // Search functionality
    function initializeSearch() {
        const searchInputs = document.querySelectorAll('.search-input');
        
        searchInputs.forEach(input => {
            input.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                const tableRows = this.closest('.table-container').querySelectorAll('tbody tr');
                
                tableRows.forEach(row => {
                    const text = row.textContent.toLowerCase();
                    row.style.display = text.includes(searchTerm) ? '' : 'none';
                });
            });
        });
    }

    // Initialize search
    initializeSearch();

    // Responsive handling
    function handleResize() {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    window.addEventListener('resize', handleResize);

    // Print functionality for reports
    function printReport() {
        window.print();
    }

    // Export functionality (placeholder)
    function exportData(format) {
        showAlert(`Exporting data in ${format.toUpperCase()} format...`, 'info');
        // Implement actual export logic here
    }

    // Make functions globally available
    window.printReport = printReport;
    window.exportData = exportData;

    // Add tooltips for collapsed sidebar
    function addTooltips() {
        menuItems.forEach(item => {
            const text = item.querySelector('span');
            if (text) {
                item.setAttribute('data-tooltip', text.textContent.trim());
            }
        });
    }

    addTooltips();

    // Initialize from URL or default section
    initializeFromURL();
    
    // Initialize default section if no URL parameter
    const defaultMenuItem = document.querySelector('[data-section="dashboard"]');
    if (defaultMenuItem && !document.querySelector('.menu-item.active')) {
        defaultMenuItem.click();
    }

    // Debug: Log toggle button state
    console.log('Admin Dashboard initialized successfully');
    console.log('Toggle button found:', !!sidebarToggle);
    console.log('Sidebar found:', !!sidebar);
    
    // Ensure toggle button is always accessible
    if (sidebarToggle) {
        sidebarToggle.style.pointerEvents = 'auto';
        sidebarToggle.style.cursor = 'pointer';
    }

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Alt + number keys for quick navigation
        if (e.altKey && e.key >= '1' && e.key <= '9') {
            e.preventDefault();
            const index = parseInt(e.key) - 1;
            const menuItem = menuItems[index];
            if (menuItem) {
                menuItem.click();
            }
        }
        
        // Escape key to close mobile sidebar
        if (e.key === 'Escape' && window.innerWidth <= 768) {
            if (sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });

    console.log('Enhanced sidebar navigation initialized');
});

// Navbar functionality
function initializeNavbar() {
    // Notification functionality
    const adminNotificationBtn = document.getElementById('adminNotificationBtn');
    if (adminNotificationBtn) {
        adminNotificationBtn.addEventListener('click', function() {
            // Toggle notification dropdown (to be implemented)
            console.log('Admin notifications clicked');
            
            // Example: Show notification modal or dropdown
            alert('Admin Notifications: \n- 3 new vendor registrations\n- 2 pending surveys\n- System maintenance scheduled\n- 1 calamity alert');
        });
    }

    // Hamburger menu functionality for mobile
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            // Toggle mobile navigation menu
            navMenu.classList.toggle('mobile-active');
            hamburger.classList.toggle('active');
            
            // Animate hamburger lines
            const spans = hamburger.querySelectorAll('span');
            if (hamburger.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu && hamburger && 
            !navMenu.contains(e.target) && 
            !hamburger.contains(e.target) &&
            navMenu.classList.contains('mobile-active')) {
            navMenu.classList.remove('mobile-active');
            hamburger.classList.remove('active');
            
            // Reset hamburger animation
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Handle navbar on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navMenu && hamburger) {
            navMenu.classList.remove('mobile-active');
            hamburger.classList.remove('active');
            
            // Reset hamburger animation
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

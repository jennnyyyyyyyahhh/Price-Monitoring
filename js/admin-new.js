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

    // Initialize all functionality
    initializeNavbar();
    initializeProfileDropdown();
    initializeProfileManagement();
    initializeToggleSwitches();

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

// Profile dropdown functionality
function initializeProfileDropdown() {
    const userInfo = document.querySelector('.user-info');
    const profileDropdown = document.querySelector('.profile-dropdown');

    if (userInfo && profileDropdown) {
        // Toggle dropdown
        userInfo.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            profileDropdown.classList.toggle('active');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!userInfo.contains(e.target) && !profileDropdown.contains(e.target)) {
                userInfo.classList.remove('active');
                profileDropdown.classList.remove('active');
            }
        });

        // Handle dropdown menu clicks
        const dropdownItems = document.querySelectorAll('.dropdown-item[data-section]');
        dropdownItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const section = this.getAttribute('data-section');
                
                // Close dropdown first
                userInfo.classList.remove('active');
                profileDropdown.classList.remove('active');
                
                if (section) {
                    // Update sidebar active state
                    const menuItems = document.querySelectorAll('.menu-item');
                    menuItems.forEach(i => i.classList.remove('active'));
                    
                    // Hide all content sections
                    const contentSections = document.querySelectorAll('.content-section');
                    contentSections.forEach(section => section.classList.remove('active'));
                    
                    // Show the target section
                    const targetSection = document.getElementById(section + '-section');
                    if (targetSection) {
                        setTimeout(() => {
                            targetSection.classList.add('active');
                        }, 50);
                    }
                }
            });
        });
        
        // Handle logout button separately
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                userInfo.classList.remove('active');
                profileDropdown.classList.remove('active');
                handleLogout();
            });
        }
    }
}

// Profile Management functionality for content sections
function initializeProfileManagement() {
    // Initialize edit profile form
    initializeEditForm();
    
    // Initialize password change form
    initializePasswordForm();
    
    // Initialize settings form
    initializeSettingsForm();
    
    // Initialize avatar change functionality
    initializeAvatarChange();
    
    // Initialize password toggles
    initializePasswordToggles();
}

// Initialize edit profile form
function initializeEditForm() {
    const editForm = document.getElementById('profileEditForm');
    const cancelBtn = document.getElementById('cancelEdit');
    
    if (editForm) {
        editForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleProfileUpdate(this);
        });
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            // Navigate back to view profile
            const menuItems = document.querySelectorAll('.menu-item');
            menuItems.forEach(i => i.classList.remove('active'));
            
            const contentSections = document.querySelectorAll('.content-section');
            contentSections.forEach(section => section.classList.remove('active'));
            
            const viewProfileSection = document.getElementById('view-profile-section');
            if (viewProfileSection) {
                setTimeout(() => {
                    viewProfileSection.classList.add('active');
                }, 50);
            }
        });
    }
}

// Initialize password change form
function initializePasswordForm() {
    const passwordForm = document.getElementById('changePasswordForm');
    const cancelBtn = document.getElementById('cancelPasswordChange');
    
    if (passwordForm) {
        passwordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handlePasswordChange(this);
        });
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            // Navigate back to view profile
            const menuItems = document.querySelectorAll('.menu-item');
            menuItems.forEach(i => i.classList.remove('active'));
            
            const contentSections = document.querySelectorAll('.content-section');
            contentSections.forEach(section => section.classList.remove('active'));
            
            const viewProfileSection = document.getElementById('view-profile-section');
            if (viewProfileSection) {
                setTimeout(() => {
                    viewProfileSection.classList.add('active');
                }, 50);
            }
        });
    }
}

// Initialize settings form
function initializeSettingsForm() {
    const settingsForm = document.getElementById('accountSettingsForm');
    const cancelBtn = document.getElementById('cancelSettings');
    
    if (settingsForm) {
        settingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleSettingsUpdate(this);
        });
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            // Navigate back to view profile
            const menuItems = document.querySelectorAll('.menu-item');
            menuItems.forEach(i => i.classList.remove('active'));
            
            const contentSections = document.querySelectorAll('.content-section');
            contentSections.forEach(section => section.classList.remove('active'));
            
            const viewProfileSection = document.getElementById('view-profile-section');
            if (viewProfileSection) {
                setTimeout(() => {
                    viewProfileSection.classList.add('active');
                }, 50);
            }
        });
    }
}

// Initialize avatar change functionality
function initializeAvatarChange() {
    const changeAvatarBtn = document.getElementById('changeAdminPhotoBtn');
    const adminPhotoInput = document.getElementById('adminPhotoInput');
    const adminProfilePreview = document.getElementById('adminProfilePreview');
    
    if (changeAvatarBtn && adminPhotoInput && adminProfilePreview) {
        // Open file explorer when the button is clicked
        changeAvatarBtn.addEventListener('click', function() {
            adminPhotoInput.click();
        });
        
        // Preview the selected image and save to localStorage
        adminPhotoInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const photoData = e.target.result;
                    // Update profile preview
                    adminProfilePreview.src = photoData;
                    // Also update all avatar images
                    const avatars = document.querySelectorAll('.user-avatar, .profile-image');
                    avatars.forEach(avatar => {
                        avatar.src = photoData;
                    });
                    // Save to localStorage for persistence
                    localStorage.setItem('adminPhoto', photoData);
                    showNotification('Profile photo updated successfully!', 'success');
                };
                reader.readAsDataURL(this.files[0]);
            }
        });
    }
    
    // Load saved photo on page load
    const savedPhoto = localStorage.getItem('adminPhoto');
    if (savedPhoto && adminProfilePreview) {
        adminProfilePreview.src = savedPhoto;
        const avatars = document.querySelectorAll('.user-avatar, .profile-image');
        avatars.forEach(avatar => {
            avatar.src = savedPhoto;
        });
    }
}

// Password visibility toggle
function initializePasswordToggles() {
    const passwordToggles = document.querySelectorAll('.password-toggle');
    
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const passwordInput = this.previousElementSibling;
            const icon = this.querySelector('i');
            
            if (passwordInput && passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else if (passwordInput) {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
}

// Toggle switches
function initializeToggleSwitches() {
    const toggleSwitches = document.querySelectorAll('.toggle-switch input');
    
    toggleSwitches.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const settingName = this.id;
            const isEnabled = this.checked;
            
            // Save setting
            handleSettingChange(settingName, isEnabled);
            
            // Show feedback
            const settingLabel = this.closest('.setting-item').querySelector('h4').textContent;
            showNotification(`${settingLabel} ${isEnabled ? 'enabled' : 'disabled'}`, 'success');
        });
    });
}

// Handle settings update
function handleSettingsUpdate(form) {
    const formData = new FormData(form);
    
    // Show loading
    showLoadingSpinner(true);
    
    setTimeout(() => {
        showLoadingSpinner(false);
        
        // Close modal
        closeProfileModal();
        
        // Show success message
        showNotification('Settings saved successfully!', 'success');
    }, 1000);
}

// Handle profile update
function handleProfileUpdate(form) {
    const formData = new FormData(form);
    const profileData = {};
    
    // Collect form data
    for (let [key, value] of formData.entries()) {
        profileData[key] = value;
    }
    
    // Simulate API call
    showLoadingSpinner(true);
    
    setTimeout(() => {
        showLoadingSpinner(false);
        
        // Update profile display
        updateProfileDisplay(profileData);
        
        // Close modal
        closeProfileModal();
        
        // Show success message
        showNotification('Profile updated successfully!', 'success');
    }, 1500);
}

// Handle password change
function handlePasswordChange(form) {
    const formData = new FormData(form);
    const currentPassword = formData.get('currentPassword');
    const newPassword = formData.get('newPassword');
    const confirmPassword = formData.get('confirmPassword');
    
    // Basic validation
    if (newPassword !== confirmPassword) {
        showNotification('New passwords do not match!', 'error');
        return;
    }
    
    if (newPassword.length < 8) {
        showNotification('Password must be at least 8 characters long!', 'error');
        return;
    }
    
    // Simulate API call
    showLoadingSpinner(true);
    
    setTimeout(() => {
        showLoadingSpinner(false);
        
        // Clear form
        form.reset();
        
        // Close modal
        closeProfileModal();
        
        // Show success message
        showNotification('Password changed successfully!', 'success');
    }, 1500);
}

// Handle setting changes
function handleSettingChange(settingName, isEnabled) {
    // Simulate saving to backend
    const settings = JSON.parse(localStorage.getItem('adminSettings') || '{}');
    settings[settingName] = isEnabled;
    localStorage.setItem('adminSettings', JSON.stringify(settings));
}

// Update profile display
function updateProfileDisplay(profileData) {
    // Update dropdown header
    const profileName = document.querySelector('.profile-info h4');
    const profileEmail = document.querySelector('.profile-info p');
    
    if (profileName && profileData.firstName && profileData.lastName) {
        profileName.textContent = `${profileData.firstName} ${profileData.lastName}`;
    }
    
    if (profileEmail && profileData.email) {
        profileEmail.textContent = profileData.email;
    }
    
    // Update user name in header
    const userName = document.querySelector('.user-name');
    if (userName && profileData.firstName) {
        userName.textContent = profileData.firstName;
    }
}

// Handle logout
function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        showLoadingSpinner(true);
        
        setTimeout(() => {
            // Simulate logout process
            showNotification('Logging out...', 'info');
            
            setTimeout(() => {
                // Redirect to login page
                window.location.href = '../html/landing.html';
            }, 1000);
        }, 500);
    }
}

// Handle profile update
function handleProfileUpdate(form) {
    const formData = new FormData(form);
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const department = formData.get('department');
    const position = formData.get('position');
    
    // Save to localStorage
    localStorage.setItem('adminFirstName', firstName);
    localStorage.setItem('adminLastName', lastName);
    localStorage.setItem('adminEmail', email);
    localStorage.setItem('adminPhone', phone);
    localStorage.setItem('adminDepartment', department);
    localStorage.setItem('adminPosition', position);
    
    // Update display elements
    const fullName = `${firstName} ${lastName}`;
    document.getElementById('displayFullName').textContent = fullName;
    document.getElementById('displayEmail').textContent = email;
    document.getElementById('displayPhone').textContent = phone;
    document.getElementById('displayDepartment').textContent = getDepartmentName(department);
    
    // Update navbar user name
    const userNameElements = document.querySelectorAll('.user-name');
    userNameElements.forEach(element => {
        element.textContent = fullName;
    });
    
    showNotification('Profile updated successfully!', 'success');
}

// Handle password change
function handlePasswordChange(form) {
    const formData = new FormData(form);
    const currentPassword = formData.get('currentPassword');
    const newPassword = formData.get('newPassword');
    const confirmPassword = formData.get('confirmPassword');
    
    // Basic validation
    if (newPassword !== confirmPassword) {
        showNotification('New passwords do not match!', 'error');
        return;
    }
    
    if (newPassword.length < 8) {
        showNotification('Password must be at least 8 characters long!', 'error');
        return;
    }
    
    // In a real application, you would send this to the server
    // For now, just show success message
    showNotification('Password changed successfully!', 'success');
    form.reset();
}

// Handle settings update
function handleSettingsUpdate(form) {
    const formData = new FormData(form);
    
    // Save settings to localStorage
    const settings = {
        emailNotifications: form.querySelector('#emailNotifications').checked,
        smsNotifications: form.querySelector('#smsNotifications').checked,
        systemAlerts: form.querySelector('#systemAlerts').checked,
        twoFactorAuth: form.querySelector('#twoFactorAuth').checked,
        sessionTimeout: form.querySelector('#sessionTimeout').checked
    };
    
    localStorage.setItem('adminSettings', JSON.stringify(settings));
    showNotification('Settings saved successfully!', 'success');
}

// Helper function to get department name
function getDepartmentName(value) {
    const departments = {
        'mao': 'Municipal Agriculture Office',
        'city-hall': 'City Hall',
        'it-dept': 'IT Department'
    };
    return departments[value] || value;
}

// Load saved profile data on page load
function loadSavedProfileData() {
    const firstName = localStorage.getItem('adminFirstName') || 'Admin';
    const lastName = localStorage.getItem('adminLastName') || 'User';
    const email = localStorage.getItem('adminEmail') || 'admin@tanzamarket.gov.ph';
    const phone = localStorage.getItem('adminPhone') || '+63 912 345 6789';
    const department = localStorage.getItem('adminDepartment') || 'mao';
    
    // Update form fields
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const departmentSelect = document.getElementById('department');
    
    if (firstNameInput) firstNameInput.value = firstName;
    if (lastNameInput) lastNameInput.value = lastName;
    if (emailInput) emailInput.value = email;
    if (phoneInput) phoneInput.value = phone;
    if (departmentSelect) departmentSelect.value = department;
    
    // Update display elements
    const fullName = `${firstName} ${lastName}`;
    const displayFullName = document.getElementById('displayFullName');
    const displayEmail = document.getElementById('displayEmail');
    const displayPhone = document.getElementById('displayPhone');
    const displayDepartment = document.getElementById('displayDepartment');
    
    if (displayFullName) displayFullName.textContent = fullName;
    if (displayEmail) displayEmail.textContent = email;
    if (displayPhone) displayPhone.textContent = phone;
    if (displayDepartment) displayDepartment.textContent = getDepartmentName(department);
    
    // Update navbar user name
    const userNameElements = document.querySelectorAll('.user-name');
    userNameElements.forEach(element => {
        element.textContent = fullName;
    });
    
    // Load settings
    const savedSettings = localStorage.getItem('adminSettings');
    if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        Object.keys(settings).forEach(key => {
            const checkbox = document.getElementById(key);
            if (checkbox) {
                checkbox.checked = settings[key];
            }
        });
    }
}

// Initialize profile data loading when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(loadSavedProfileData, 100);
});

// Utility functions
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${getNotificationIcon(type)}"></i>
        <span>${message}</span>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        gap: 0.5rem;
        z-index: 9999;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        removeNotification(notification);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
}

function removeNotification(notification) {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100%)';
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

function getNotificationIcon(type) {
    const icons = {
        'success': 'check-circle',
        'error': 'exclamation-circle',
        'warning': 'exclamation-triangle',
        'info': 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function getNotificationColor(type) {
    const colors = {
        'success': '#28a745',
        'error': '#dc3545',
        'warning': '#ffc107',
        'info': '#17a2b8'
    };
    return colors[type] || '#17a2b8';
}

function showLoadingSpinner(show) {
    let spinner = document.querySelector('.loading-spinner');
    
    if (show) {
        if (!spinner) {
            spinner = document.createElement('div');
            spinner.className = 'loading-spinner';
            spinner.innerHTML = `
                <div class="spinner-overlay">
                    <div class="spinner">
                        <i class="fas fa-spinner fa-spin"></i>
                        <p>Loading...</p>
                    </div>
                </div>
            `;
            
            spinner.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
            `;
            
            const spinnerContent = spinner.querySelector('.spinner');
            spinnerContent.style.cssText = `
                background: white;
                padding: 2rem;
                border-radius: 12px;
                text-align: center;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            `;
            
            const icon = spinner.querySelector('i');
            icon.style.cssText = `
                font-size: 2rem;
                color: var(--primary-color);
                margin-bottom: 1rem;
            `;
            
            const text = spinner.querySelector('p');
            text.style.cssText = `
                margin: 0;
                color: #666;
                font-weight: 600;
            `;
            
            document.body.appendChild(spinner);
        }
        
        spinner.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    } else {
        if (spinner) {
            spinner.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
}

// Removed duplicate avatar change functionality - now handled in initializeAvatarChange()

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Escape key to close modals
    if (e.key === 'Escape') {
        const activeModal = document.getElementById('profileModal');
        if (activeModal && activeModal.classList.contains('active')) {
            closeProfileModal();
        }
        
        // Close profile dropdown
        const userInfo = document.querySelector('.user-info');
        const profileDropdown = document.querySelector('.profile-dropdown');
        if (userInfo && profileDropdown) {
            userInfo.classList.remove('active');
            profileDropdown.classList.remove('active');
        }
    }
    
    // Ctrl + P to open profile
    if (e.ctrlKey && e.key === 'p') {
        e.preventDefault();
        openProfileModal('view');
    }

    // Initialize vendor management
    initializeVendorManagement();
});

// Vendor Management System
function initializeVendorManagement() {
    // Sample vendor data
    const vendors = [
        {
            id: 'V001',
            firstName: 'Maria',
            lastName: 'Santos',
            email: 'maria.santos@email.com',
            phone: '+63 912 345 6789',
            businessName: "Maria's Fresh Produce",
            category: 'vegetables',
            stallNumber: 'A-15',
            status: 'active',
            registrationDate: 'Jan 15, 2024',
            address: '123 Main Street, Tanza, Cavite'
        },
        {
            id: 'V002',
            firstName: 'Juan',
            lastName: 'Dela Cruz',
            email: 'juan.delacruz@email.com',
            phone: '+63 923 456 7890',
            businessName: "Juan's Meat Shop",
            category: 'meat',
            stallNumber: 'B-08',
            status: 'active',
            registrationDate: 'Feb 03, 2024',
            address: '456 Second Street, Tanza, Cavite'
        },
        {
            id: 'V003',
            firstName: 'Ana',
            lastName: 'Reyes',
            email: 'ana.reyes@email.com',
            phone: '+63 934 567 8901',
            businessName: "Ana's Fruit Stand",
            category: 'fruits',
            stallNumber: 'C-22',
            status: 'pending',
            registrationDate: 'Aug 10, 2024',
            address: '789 Third Street, Tanza, Cavite'
        },
        {
            id: 'V004',
            firstName: 'Pedro',
            lastName: 'Garcia',
            email: 'pedro.garcia@email.com',
            phone: '+63 945 678 9012',
            businessName: "Pedro's Seafood",
            category: 'seafood',
            stallNumber: 'D-05',
            status: 'suspended',
            registrationDate: 'Dec 20, 2023',
            address: '321 Fourth Street, Tanza, Cavite'
        },
        {
            id: 'V005',
            firstName: 'Lisa',
            lastName: 'Fernandez',
            email: 'lisa.fernandez@email.com',
            phone: '+63 956 789 0123',
            businessName: "Lisa's Rice Store",
            category: 'grains',
            stallNumber: 'E-12',
            status: 'active',
            registrationDate: 'Mar 08, 2024',
            address: '654 Fifth Street, Tanza, Cavite'
        }
    ];

    // Modal elements
    const addVendorModal = document.getElementById('addVendorModal');
    const viewVendorModal = document.getElementById('viewVendorModal');
    const editVendorModal = document.getElementById('editVendorModal');
    const bulkActionsModal = document.getElementById('bulkActionsModal');

    // Button elements
    const addVendorBtn = document.getElementById('addVendorBtn');
    const bulkActionsBtn = document.getElementById('bulkActionsBtn');
    const selectAllVendors = document.getElementById('selectAllVendors');

    // Form elements
    const addVendorForm = document.getElementById('addVendorForm');
    const editVendorForm = document.getElementById('editVendorForm');

    // Search and filter elements
    const vendorSearch = document.getElementById('vendorSearch');
    const statusFilter = document.getElementById('statusFilter');
    const categoryFilter = document.getElementById('categoryFilter');

    let selectedVendors = [];

    // Open Add Vendor Modal
    if (addVendorBtn) {
        addVendorBtn.addEventListener('click', function() {
            openModal(addVendorModal);
        });
    }

    // Open Bulk Actions Modal
    if (bulkActionsBtn) {
        bulkActionsBtn.addEventListener('click', function() {
            const selectedCount = document.querySelectorAll('.vendor-checkbox:checked').length;
            if (selectedCount === 0) {
                alert('Please select vendors first.');
                return;
            }
            document.getElementById('selectedVendorCount').textContent = selectedCount;
            openModal(bulkActionsModal);
        });
    }

    // Select All Vendors
    if (selectAllVendors) {
        selectAllVendors.addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('.vendor-checkbox');
            checkboxes.forEach(checkbox => {
                checkbox.checked = this.checked;
            });
            updateSelectedVendors();
        });
    }

    // Individual vendor checkboxes
    document.addEventListener('change', function(e) {
        if (e.target.classList.contains('vendor-checkbox')) {
            updateSelectedVendors();
        }
    });

    // Action buttons
    document.addEventListener('click', function(e) {
        if (e.target.closest('.action-btn.view')) {
            const vendorId = e.target.closest('.action-btn').dataset.vendorId;
            viewVendor(vendorId);
        } else if (e.target.closest('.action-btn.edit')) {
            const vendorId = e.target.closest('.action-btn').dataset.vendorId;
            editVendor(vendorId);
        } else if (e.target.closest('.action-btn.delete')) {
            const vendorId = e.target.closest('.action-btn').dataset.vendorId;
            deleteVendor(vendorId);
        }
    });

    // Modal close buttons
    document.querySelectorAll('.modal-close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            const modal = this.closest('.modal-overlay');
            closeModal(modal);
        });
    });

    // Cancel buttons
    document.querySelectorAll('[id$="Cancel"], [id$="cancel"]').forEach(cancelBtn => {
        cancelBtn.addEventListener('click', function() {
            const modal = this.closest('.modal-overlay');
            closeModal(modal);
        });
    });

    // Form submissions
    if (addVendorForm) {
        addVendorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const newVendor = Object.fromEntries(formData);
            
            // Generate vendor ID
            newVendor.id = 'V' + String(vendors.length + 1).padStart(3, '0');
            newVendor.registrationDate = new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: '2-digit' 
            });
            
            vendors.push(newVendor);
            refreshVendorTable();
            closeModal(addVendorModal);
            this.reset();
            
            alert('Vendor added successfully!');
        });
    }

    if (editVendorForm) {
        editVendorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const updatedVendor = Object.fromEntries(formData);
            
            const vendorIndex = vendors.findIndex(v => v.id === updatedVendor.vendorId);
            if (vendorIndex !== -1) {
                vendors[vendorIndex] = { ...vendors[vendorIndex], ...updatedVendor };
                refreshVendorTable();
                closeModal(editVendorModal);
                alert('Vendor updated successfully!');
            }
        });
    }

    // Search and filter functionality
    if (vendorSearch) {
        vendorSearch.addEventListener('input', filterVendors);
    }

    if (statusFilter) {
        statusFilter.addEventListener('change', filterVendors);
    }

    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterVendors);
    }

    // Functions
    function openModal(modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    function viewVendor(vendorId) {
        const vendor = vendors.find(v => v.id === vendorId);
        if (!vendor) return;

        // Populate view modal
        document.getElementById('viewVendorName').textContent = `${vendor.firstName} ${vendor.lastName}`;
        document.getElementById('viewVendorBusiness').textContent = vendor.businessName;
        document.getElementById('viewVendorStatus').textContent = vendor.status;
        document.getElementById('viewVendorStatus').className = `status-badge ${vendor.status}`;
        document.getElementById('viewVendorId').textContent = vendor.id;
        document.getElementById('viewVendorEmailDetail').textContent = vendor.email;
        document.getElementById('viewVendorPhoneDetail').textContent = vendor.phone;
        document.getElementById('viewVendorCategory').textContent = vendor.category;
        document.getElementById('viewVendorStall').textContent = vendor.stallNumber;
        document.getElementById('viewVendorRegDate').textContent = vendor.registrationDate;
        document.getElementById('viewVendorAddressDetail').textContent = vendor.address || 'Not provided';

        openModal(viewVendorModal);
    }

    function editVendor(vendorId) {
        const vendor = vendors.find(v => v.id === vendorId);
        if (!vendor) return;

        // Populate edit form
        document.getElementById('editVendorId').value = vendor.id;
        document.getElementById('editVendorFirstName').value = vendor.firstName;
        document.getElementById('editVendorLastName').value = vendor.lastName;
        document.getElementById('editVendorEmail').value = vendor.email;
        document.getElementById('editVendorPhone').value = vendor.phone;
        document.getElementById('editBusinessName').value = vendor.businessName;
        document.getElementById('editBusinessCategory').value = vendor.category;
        document.getElementById('editStallNumber').value = vendor.stallNumber;
        document.getElementById('editVendorStatus').value = vendor.status;
        document.getElementById('editVendorAddress').value = vendor.address || '';

        openModal(editVendorModal);
    }

    function deleteVendor(vendorId) {
        if (confirm('Are you sure you want to delete this vendor?')) {
            const vendorIndex = vendors.findIndex(v => v.id === vendorId);
            if (vendorIndex !== -1) {
                vendors.splice(vendorIndex, 1);
                refreshVendorTable();
                alert('Vendor deleted successfully!');
            }
        }
    }

    function updateSelectedVendors() {
        const checkboxes = document.querySelectorAll('.vendor-checkbox:checked');
        selectedVendors = Array.from(checkboxes).map(cb => cb.dataset.vendorId);
        
        const selectAll = document.getElementById('selectAllVendors');
        const totalCheckboxes = document.querySelectorAll('.vendor-checkbox').length;
        
        if (selectedVendors.length === 0) {
            selectAll.indeterminate = false;
            selectAll.checked = false;
        } else if (selectedVendors.length === totalCheckboxes) {
            selectAll.indeterminate = false;
            selectAll.checked = true;
        } else {
            selectAll.indeterminate = true;
        }
    }

    function filterVendors() {
        const searchTerm = vendorSearch.value.toLowerCase();
        const statusValue = statusFilter.value;
        const categoryValue = categoryFilter.value;

        const filteredVendors = vendors.filter(vendor => {
            const matchesSearch = 
                vendor.firstName.toLowerCase().includes(searchTerm) ||
                vendor.lastName.toLowerCase().includes(searchTerm) ||
                vendor.businessName.toLowerCase().includes(searchTerm) ||
                vendor.email.toLowerCase().includes(searchTerm);
            
            const matchesStatus = statusValue === 'all' || vendor.status === statusValue;
            const matchesCategory = categoryValue === 'all' || vendor.category === categoryValue;

            return matchesSearch && matchesStatus && matchesCategory;
        });

        renderVendorTable(filteredVendors);
    }

    function refreshVendorTable() {
        renderVendorTable(vendors);
        updateVendorStats();
    }

    function renderVendorTable(vendorList) {
        const tbody = document.getElementById('vendorsTableBody');
        if (!tbody) return;

        tbody.innerHTML = vendorList.map(vendor => `
            <tr>
                <td><input type="checkbox" class="vendor-checkbox" data-vendor-id="${vendor.id}"></td>
                <td>${vendor.id}</td>
                <td>
                    <div class="vendor-info">
                        <img src="https://via.placeholder.com/40" alt="Vendor" class="vendor-avatar">
                        <div>
                            <div class="vendor-name">${vendor.firstName} ${vendor.lastName}</div>
                            <div class="vendor-contact">${vendor.email}</div>
                        </div>
                    </div>
                </td>
                <td>${vendor.businessName}</td>
                <td><span class="category-tag ${vendor.category}">${getCategoryName(vendor.category)}</span></td>
                <td>${vendor.stallNumber}</td>
                <td><span class="status-badge ${vendor.status}">${vendor.status}</span></td>
                <td>${vendor.registrationDate}</td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn view" data-vendor-id="${vendor.id}" title="View">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="action-btn edit" data-vendor-id="${vendor.id}" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn delete" data-vendor-id="${vendor.id}" title="Delete">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    function getCategoryName(category) {
        const categoryNames = {
            vegetables: 'Vegetables',
            fruits: 'Fruits',
            meat: 'Meat & Poultry',
            seafood: 'Seafood',
            dairy: 'Dairy',
            grains: 'Rice & Grains'
        };
        return categoryNames[category] || category;
    }

    function updateVendorStats() {
        const activeCount = vendors.filter(v => v.status === 'active').length;
        const pendingCount = vendors.filter(v => v.status === 'pending').length;
        const suspendedCount = vendors.filter(v => v.status === 'suspended').length;
        const totalCount = vendors.length;

        document.getElementById('activeVendorCount').textContent = activeCount;
        document.getElementById('pendingVendorCount').textContent = pendingCount;
        document.getElementById('suspendedVendorCount').textContent = suspendedCount;
        document.getElementById('totalVendorCount').textContent = totalCount;
    }

    // Initialize vendor table
    refreshVendorTable();
}

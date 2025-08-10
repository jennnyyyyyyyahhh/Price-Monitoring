// Vendor Dashboard JS

// Sidebar toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.sidebar');

    // Initialize sidebar toggle functionality
    if (sidebarToggle && sidebar) {
        // Add click event listener
        sidebarToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Toggle button clicked'); // Debug log
            
            // Toggle the collapsed class
            sidebar.classList.toggle('collapsed');
            
            // Save collapsed state to localStorage
            const isCollapsed = sidebar.classList.contains('collapsed');
            localStorage.setItem('sidebarCollapsed', isCollapsed);
            
            console.log('Sidebar collapsed:', isCollapsed); // Debug log
        });

        // Add visual feedback on mousedown
        sidebarToggle.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-50%) scale(0.9)';
        });

        // Reset visual feedback on mouseup
        sidebarToggle.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-50%) scale(1)';
        });

        // Reset visual feedback on mouse leave
        sidebarToggle.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-50%) scale(1)';
        });

        // Load saved sidebar state - Force expanded mode initially
        // Clear any stored collapsed state to ensure content is visible
        localStorage.removeItem('sidebarCollapsed');
        
        // Ensure sidebar starts expanded
        sidebar.classList.remove('collapsed');
        
        // Optional: If you want to restore saved state later, uncomment below
        // const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
        // if (isCollapsed) {
        //     sidebar.classList.add('collapsed');
        // }
    } else {
        console.error('Sidebar toggle elements not found'); // Debug log
    }
});

// Handle menu navigation
const menuItems = document.querySelectorAll('.menu-item');
const contentSections = document.querySelectorAll('.content-section');

menuItems.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default for all menu items
        
        const sectionName = this.getAttribute('data-section');
        console.log('Menu item clicked:', sectionName); // Debug log
        
        if (sectionName) {
            // Update active menu item
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // Hide all content sections
            contentSections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Show the target section with a small delay for smooth transition
            const targetSection = document.getElementById(sectionName + '-section');
            if (targetSection) {
                setTimeout(() => {
                    targetSection.classList.add('active');
                }, 50);
                console.log('Showing section:', sectionName + '-section'); // Debug log
            } else {
                console.error('Section not found:', sectionName + '-section'); // Debug log
            }
        }
    });
});

// Handle vendor photo upload and persistence
const changePhotoBtn = document.getElementById('changePhotoBtn');
const vendorPhotoInput = document.getElementById('vendorPhotoInput');
const vendorPhotoPreview = document.getElementById('vendorPhotoPreview');

// Get topbar user photo element
const topbarUserPhoto = document.getElementById('topbarUserPhoto');

// Get vendor name elements
const vendorNameInput = document.getElementById('vendorNameInput');
const topbarUserName = document.querySelector('.user span');

// Load saved data on page load
window.addEventListener('DOMContentLoaded', function() {
    // Load saved photo
    const savedPhoto = localStorage.getItem('vendorPhoto');
    if (savedPhoto && vendorPhotoPreview) {
        vendorPhotoPreview.src = savedPhoto;
        if (topbarUserPhoto) {
            topbarUserPhoto.src = savedPhoto;
        }
    }
    
    // Load saved vendor name
    const savedName = localStorage.getItem('vendorName');
    if (savedName) {
        if (vendorNameInput) {
            vendorNameInput.value = savedName;
        }
        if (topbarUserName) {
            topbarUserName.textContent = savedName;
        }
    }
    
    // Load other saved profile data
    const savedBusinessName = localStorage.getItem('businessName');
    const savedEmail = localStorage.getItem('vendorEmail');
    const savedPhone = localStorage.getItem('vendorPhone');
    const savedAddress = localStorage.getItem('vendorAddress');
    
    const businessNameInput = document.getElementById('businessNameInput');
    const emailInput = document.getElementById('emailInput');
    const phoneInput = document.getElementById('phoneInput');
    const addressInput = document.getElementById('addressInput');
    
    if (savedBusinessName && businessNameInput) {
        businessNameInput.value = savedBusinessName;
    }
    if (savedEmail && emailInput) {
        emailInput.value = savedEmail;
    }
    if (savedPhone && phoneInput) {
        phoneInput.value = savedPhone;
    }
    if (savedAddress && addressInput) {
        addressInput.value = savedAddress;
    }
});

// Update topbar name when vendor name input changes
if (vendorNameInput && topbarUserName) {
    vendorNameInput.addEventListener('input', function() {
        const newName = this.value;
        // Update topbar immediately
        topbarUserName.textContent = newName;
        // Save to localStorage
        localStorage.setItem('vendorName', newName);
    });
}

if (changePhotoBtn && vendorPhotoInput && vendorPhotoPreview) {
    // Open file explorer when the button is clicked
    changePhotoBtn.addEventListener('click', function() {
        vendorPhotoInput.click();
    });
    
    // Preview the selected image and save to localStorage
    vendorPhotoInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const photoData = e.target.result;
                // Update profile preview
                vendorPhotoPreview.src = photoData;
                // Also update the topbar user photo
                if (topbarUserPhoto) {
                    topbarUserPhoto.src = photoData;
                }
                // Save to localStorage for persistence between refreshes
                localStorage.setItem('vendorPhoto', photoData);
            };
            reader.readAsDataURL(this.files[0]);
        }
    });
}

// Save profile changes
const saveProfileBtn = document.querySelector('.save-profile');
if (saveProfileBtn) {
    saveProfileBtn.addEventListener('click', function() {
        // Save vendor name to localStorage
        if (vendorNameInput) {
            const currentName = vendorNameInput.value;
            localStorage.setItem('vendorName', currentName);
            // Ensure topbar is updated
            if (topbarUserName) {
                topbarUserName.textContent = currentName;
            }
        }
        
        // Save other profile data if needed
        const businessNameInput = document.getElementById('businessNameInput');
        const emailInput = document.getElementById('emailInput');
        const phoneInput = document.getElementById('phoneInput');
        const addressInput = document.getElementById('addressInput');
        
        if (businessNameInput) {
            localStorage.setItem('businessName', businessNameInput.value);
        }
        if (emailInput) {
            localStorage.setItem('vendorEmail', emailInput.value);
        }
        if (phoneInput) {
            localStorage.setItem('vendorPhone', phoneInput.value);
        }
        if (addressInput) {
            localStorage.setItem('vendorAddress', addressInput.value);
        }
        
        // Show success message
        alert('Profile changes saved successfully!');
    });
}

// Toggle notifications
const notifications = document.querySelector('.notifications');
if (notifications) {
    notifications.addEventListener('click', function() {
        // Toggle notifications panel (would be implemented)
        alert('Notifications would open here!');
    });
}

// Floating Submit Report Button functionality
const submitReportBtn = document.getElementById('submitReportBtn');

if (submitReportBtn) {
    submitReportBtn.addEventListener('click', function() {
        // Handle submit report action
        console.log('Submit Report button clicked');
        
        // You can add your submit report functionality here
        // For now, show a simple alert
        alert('Submit Report functionality would be implemented here!\n\nThis could open a form modal or navigate to a report submission page.');
        
        // Example: Open a modal or redirect to report form
        // window.location.href = 'submit-report.html';
        // or showReportModal();
    });
    
    // Add some visual feedback on hover
    submitReportBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.05)';
    });
    
    submitReportBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
}

// Floating Submit Survey Button functionality
const submitSurveyBtn = document.querySelector('.submit-survey-btn');
if (submitSurveyBtn) {
    submitSurveyBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Submit Survey button clicked');
        
        // Add button click animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
        
        // Navigate to survey form or open modal
        alert('Survey form would open here!');
        // window.location.href = 'survey-form.html';
        // or showSurveyModal();
    });
    
    // Add some visual feedback on hover
    submitSurveyBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px) scale(1.05)';
    });
    
    submitSurveyBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
}
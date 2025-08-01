// Vendor Dashboard JS

// Toggle sidebar on mobile
const toggleMenu = document.querySelector('.toggle-menu');
const sidebar = document.querySelector('.sidebar');
const mainContent = document.querySelector('.main-content');

toggleMenu.addEventListener('click', () => {
    sidebar.classList.toggle('expanded');
});

// Close sidebar when clicking outside of it on mobile
document.addEventListener('click', (e) => {
    const isSidebar = e.target.closest('.sidebar');
    const isToggleMenu = e.target.closest('.toggle-menu');
    
    if (!isSidebar && !isToggleMenu && window.innerWidth <= 768 && sidebar.classList.contains('expanded')) {
        sidebar.classList.remove('expanded');
    }
});

// Handle window resize events
window.addEventListener('resize', () => {
    // If window becomes larger than mobile breakpoint, ensure proper sidebar state
    if (window.innerWidth > 768) {
        sidebar.classList.remove('expanded');
    }
});

// Handle menu navigation
const menuItems = document.querySelectorAll('.menu-item');
const contentSections = document.querySelectorAll('.content-section');

menuItems.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Update active menu item
        menuItems.forEach(i => i.classList.remove('active'));
        this.classList.add('active');
        
        // Show corresponding section
        const sectionId = this.getAttribute('data-section') + '-section';
        contentSections.forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');
        
        // On mobile, collapse sidebar after selection
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('expanded');
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

// Example: Save profile changes
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

// Example: Toggle notifications
const notifications = document.querySelector('.notifications');
if (notifications) {
    notifications.addEventListener('click', function() {
        // Toggle notifications panel (would be implemented)
        alert('Notifications would open here!');
    });
}

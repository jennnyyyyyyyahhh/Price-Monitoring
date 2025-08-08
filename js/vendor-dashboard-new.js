// Enhanced Vendor Dashboard JS

// Handle menu navigation
const menuItems = document.querySelectorAll('.menu-item');
const contentSections = document.querySelectorAll('.content-section');

menuItems.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        
        const sectionName = this.getAttribute('data-section');
        
        // Update active menu item
        menuItems.forEach(i => i.classList.remove('active'));
        this.classList.add('active');
        
        // Show corresponding section
        contentSections.forEach(section => {
            section.classList.remove('active');
        });
        
        const targetSection = document.getElementById(sectionName + '-section');
        if (targetSection) {
            targetSection.classList.add('active');
        }
    });
});

// Enhanced Profile Management System
class ProfileManager {
    constructor() {
        this.initializeElements();
        this.bindEvents();
        this.loadSavedData();
        this.originalFormData = {};
    }

    initializeElements() {
        // Photo elements
        this.photoPreview = document.getElementById('vendorPhotoPreview');
        this.photoInput = document.getElementById('vendorPhotoInput');
        this.changePhotoBtn = document.getElementById('changePhotoBtn');
        this.removePhotoBtn = document.getElementById('removePhotoBtn');
        
        // Form elements
        this.profileForm = document.getElementById('profileForm');
        this.saveBtn = document.getElementById('saveProfileBtn');
        this.resetBtn = document.getElementById('resetFormBtn');
        
        // Message elements
        this.messageContainer = document.getElementById('messageContainer');
        this.successMessage = document.getElementById('successMessage');
        this.errorMessage = document.getElementById('errorMessage');
        
        // Topbar elements for live updates
        this.topbarUserPhoto = document.getElementById('topbarUserPhoto');
        this.topbarUserName = document.querySelector('.user span');
    }

    bindEvents() {
        // Photo upload events
        if (this.changePhotoBtn) {
            this.changePhotoBtn.addEventListener('click', () => {
                this.photoInput.click();
            });
        }

        if (this.photoInput) {
            this.photoInput.addEventListener('change', (e) => {
                this.handlePhotoUpload(e);
            });
        }

        if (this.removePhotoBtn) {
            this.removePhotoBtn.addEventListener('click', () => {
                this.removePhoto();
            });
        }

        // Form events
        if (this.profileForm) {
            this.profileForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveProfile();
            });
        }

        if (this.resetBtn) {
            this.resetBtn.addEventListener('click', () => {
                this.resetForm();
            });
        }

        // Real-time validation
        this.addInputValidation();
        
        // Auto-save draft functionality
        this.addAutoSave();
    }

    handlePhotoUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            this.showMessage('Please select a valid image file.', 'error');
            return;
        }

        // Validate file size (2MB limit)
        if (file.size > 2 * 1024 * 1024) {
            this.showMessage('Image size should be less than 2MB.', 'error');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const imageData = e.target.result;
            
            // Update preview
            if (this.photoPreview) {
                this.photoPreview.src = imageData;
            }
            
            // Update topbar photo
            if (this.topbarUserPhoto) {
                this.topbarUserPhoto.src = imageData;
            }
            
            // Save to localStorage
            localStorage.setItem('vendorPhoto', imageData);
            
            this.showMessage('Photo updated successfully!', 'success');
        };
        reader.readAsDataURL(file);
    }

    removePhoto() {
        const defaultPhoto = 'https://via.placeholder.com/150/2e9c6a/ffffff?text=JD';
        
        // Reset to default photo
        if (this.photoPreview) {
            this.photoPreview.src = defaultPhoto;
        }
        
        if (this.topbarUserPhoto) {
            this.topbarUserPhoto.src = defaultPhoto;
        }
        
        // Clear saved photo
        localStorage.removeItem('vendorPhoto');
        
        // Clear file input
        if (this.photoInput) {
            this.photoInput.value = '';
        }
        
        this.showMessage('Photo removed successfully!', 'success');
    }

    saveProfile() {
        const formData = new FormData(this.profileForm);
        const profileData = {};
        
        // Convert FormData to object
        for (let [key, value] of formData.entries()) {
            profileData[key] = value;
        }
        
        // Validate required fields
        const requiredFields = ['firstName', 'lastName', 'businessName', 'businessCategory', 'email', 'phone', 'address', 'city', 'province'];
        const missingFields = requiredFields.filter(field => !profileData[field] || profileData[field].trim() === '');
        
        if (missingFields.length > 0) {
            this.showMessage(`Please fill in all required fields: ${missingFields.join(', ')}`, 'error');
            return;
        }
        
        // Validate email format
        if (!this.isValidEmail(profileData.email)) {
            this.showMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Validate phone format
        if (!this.isValidPhone(profileData.phone)) {
            this.showMessage('Please enter a valid phone number.', 'error');
            return;
        }
        
        // Show loading state
        this.setLoadingState(true);
        
        // Simulate API call
        setTimeout(() => {
            try {
                // Save to localStorage
                localStorage.setItem('vendorProfile', JSON.stringify(profileData));
                
                // Update topbar name
                this.updateTopbarName(profileData.firstName, profileData.lastName);
                
                // Store original data for reset functionality
                this.originalFormData = { ...profileData };
                
                this.setLoadingState(false);
                this.showMessage('Profile updated successfully!', 'success');
                
                // Clear auto-save draft
                localStorage.removeItem('vendorProfileDraft');
                
            } catch (error) {
                this.setLoadingState(false);
                this.showMessage('Error saving profile. Please try again.', 'error');
            }
        }, 1500);
    }

    resetForm() {
        if (confirm('Are you sure you want to reset all changes? This will restore your last saved data.')) {
            this.loadSavedData();
            this.showMessage('Form reset to last saved state.', 'success');
        }
    }

    loadSavedData() {
        // Load saved photo
        const savedPhoto = localStorage.getItem('vendorPhoto');
        if (savedPhoto && this.photoPreview) {
            this.photoPreview.src = savedPhoto;
            if (this.topbarUserPhoto) {
                this.topbarUserPhoto.src = savedPhoto;
            }
        }
        
        // Load saved profile data
        const savedProfile = localStorage.getItem('vendorProfile');
        if (savedProfile) {
            try {
                const profileData = JSON.parse(savedProfile);
                this.populateForm(profileData);
                this.originalFormData = { ...profileData };
            } catch (error) {
                console.error('Error loading saved profile:', error);
            }
        }
        
        // Load draft data if exists
        const draftData = localStorage.getItem('vendorProfileDraft');
        if (draftData) {
            try {
                const draft = JSON.parse(draftData);
                this.populateForm(draft);
                this.showMessage('Draft data restored. Don\'t forget to save!', 'success');
            } catch (error) {
                console.error('Error loading draft:', error);
            }
        }
    }

    populateForm(data) {
        Object.keys(data).forEach(key => {
            const element = document.getElementById(key) || document.querySelector(`[name="${key}"]`);
            if (element) {
                if (element.type === 'checkbox') {
                    element.checked = data[key] === 'on' || data[key] === true;
                } else {
                    element.value = data[key];
                }
            }
        });
    }

    updateTopbarName(firstName, lastName) {
        if (this.topbarUserName) {
            this.topbarUserName.textContent = `${firstName} ${lastName}`;
        }
    }

    addInputValidation() {
        // Real-time email validation
        const emailInput = document.getElementById('email');
        if (emailInput) {
            emailInput.addEventListener('blur', () => {
                if (emailInput.value && !this.isValidEmail(emailInput.value)) {
                    emailInput.style.borderColor = '#dc3545';
                    this.showFieldError(emailInput, 'Please enter a valid email address');
                } else {
                    emailInput.style.borderColor = '#e1e5e9';
                    this.clearFieldError(emailInput);
                }
            });
        }
        
        // Real-time phone validation
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.addEventListener('blur', () => {
                if (phoneInput.value && !this.isValidPhone(phoneInput.value)) {
                    phoneInput.style.borderColor = '#dc3545';
                    this.showFieldError(phoneInput, 'Please enter a valid phone number');
                } else {
                    phoneInput.style.borderColor = '#e1e5e9';
                    this.clearFieldError(phoneInput);
                }
            });
        }
    }

    addAutoSave() {
        let autoSaveTimeout;
        const form = this.profileForm;
        
        if (form) {
            form.addEventListener('input', () => {
                clearTimeout(autoSaveTimeout);
                autoSaveTimeout = setTimeout(() => {
                    this.saveDraft();
                }, 2000); // Auto-save after 2 seconds of inactivity
            });
        }
    }

    saveDraft() {
        const formData = new FormData(this.profileForm);
        const draftData = {};
        
        for (let [key, value] of formData.entries()) {
            draftData[key] = value;
        }
        
        localStorage.setItem('vendorProfileDraft', JSON.stringify(draftData));
    }

    showFieldError(element, message) {
        this.clearFieldError(element);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.style.color = '#dc3545';
        errorDiv.style.fontSize = '0.8rem';
        errorDiv.style.marginTop = '0.25rem';
        errorDiv.textContent = message;
        element.parentNode.appendChild(errorDiv);
    }

    clearFieldError(element) {
        const existingError = element.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }

    setLoadingState(loading) {
        if (this.saveBtn) {
            if (loading) {
                this.saveBtn.disabled = true;
                this.saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
            } else {
                this.saveBtn.disabled = false;
                this.saveBtn.innerHTML = '<i class="fas fa-save"></i> Save Profile';
            }
        }
    }

    showMessage(message, type) {
        if (!this.messageContainer) return;
        
        const messageElement = type === 'success' ? this.successMessage : this.errorMessage;
        
        if (messageElement) {
            messageElement.querySelector('span').textContent = message;
            this.messageContainer.style.display = 'block';
            messageElement.style.display = 'flex';
            
            // Hide other message type
            const otherMessage = type === 'success' ? this.errorMessage : this.successMessage;
            if (otherMessage) {
                otherMessage.style.display = 'none';
            }
            
            // Auto-hide after 5 seconds
            setTimeout(() => {
                this.messageContainer.style.display = 'none';
            }, 5000);
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
        return cleanPhone.length >= 10 && phoneRegex.test(cleanPhone);
    }
}

// Initialize Profile Manager
document.addEventListener('DOMContentLoaded', function() {
    new ProfileManager();
});

// Toggle notifications
const notifications = document.querySelector('.notifications');
if (notifications) {
    notifications.addEventListener('click', function() {
        alert('Notifications feature coming soon!');
    });
}

// Logout functionality
const logoutBtn = document.querySelector('.logout');
if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (confirm('Are you sure you want to logout?')) {
            // Clear session data
            localStorage.removeItem('vendorProfileDraft');
            // Redirect to login or landing page
            window.location.href = '../html/landing.html';
        }
    });
}

// Events Tab Functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            const targetContent = document.getElementById(tabId + '-tab');
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
    
    // Event actions functionality
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach(card => {
        const registerBtns = card.querySelectorAll('.btn-primary');
        registerBtns.forEach(btn => {
            if (!btn.href && btn.textContent.includes('Register') || btn.textContent.includes('Join') || btn.textContent.includes('RSVP') || btn.textContent.includes('Enroll')) {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    const eventTitle = card.querySelector('h3').textContent;
                    alert(`Registration successful for: ${eventTitle}\n\nYou will receive a confirmation email shortly.`);
                });
            }
        });
        
        // Add to calendar functionality
        const calendarBtns = card.querySelectorAll('.btn-secondary');
        calendarBtns.forEach(btn => {
            if (btn.textContent.includes('Add to Calendar')) {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    alert('Calendar event added! Check your default calendar application.');
                });
            }
        });
    });
    
    // Notices Tab Functionality
    const noticeTabBtns = document.querySelectorAll('.notice-tab-btn');
    const noticeTabContents = document.querySelectorAll('.notice-tab-content');
    
    noticeTabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            noticeTabBtns.forEach(b => b.classList.remove('active'));
            noticeTabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            const targetContent = document.getElementById(tabId + '-tab');
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
    
    // Notice Search Functionality
    const noticeSearch = document.getElementById('noticeSearch');
    const noticeTypeFilter = document.getElementById('noticeTypeFilter');
    const noticeCards = document.querySelectorAll('.notice-card');
    
    function filterNotices() {
        const searchTerm = noticeSearch?.value.toLowerCase() || '';
        const selectedType = noticeTypeFilter?.value || '';
        
        noticeCards.forEach(card => {
            const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
            const content = card.querySelector('p')?.textContent.toLowerCase() || '';
            const cardType = card.getAttribute('data-type') || '';
            
            const matchesSearch = title.includes(searchTerm) || content.includes(searchTerm);
            const matchesType = !selectedType || cardType === selectedType;
            
            if (matchesSearch && matchesType) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    if (noticeSearch) {
        noticeSearch.addEventListener('input', filterNotices);
    }
    
    if (noticeTypeFilter) {
        noticeTypeFilter.addEventListener('change', filterNotices);
    }
    
    // Notice Actions Functionality
    const noticeActionBtns = document.querySelectorAll('.notice-actions .btn-primary, .notice-actions .btn-secondary');
    noticeActionBtns.forEach(btn => {
        if (!btn.href) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const action = this.textContent.trim();
                const noticeTitle = this.closest('.notice-card').querySelector('h3').textContent;
                
                switch(action) {
                    case 'Update Price Now':
                        alert(`Redirecting to price update form for the reported item...`);
                        break;
                    case 'Schedule Re-inspection':
                        alert(`Re-inspection scheduled successfully!\n\nInspection Date: August 10, 2025\nTime: 10:00 AM\nInspector: Maria Santos`);
                        break;
                    case 'Submit Reports':
                        alert(`Opening report submission portal...`);
                        break;
                    case 'Request Extension':
                        alert(`Extension request form opened. Please provide justification for the delay.`);
                        break;
                    case 'Schedule Correction':
                        alert(`Correction schedule created. You have 3 days to address all violations.`);
                        break;
                    case 'Download Certificate':
                        alert(`Downloading compliance certificate...`);
                        break;
                    case 'Mark as Read':
                        this.closest('.notice-card').style.opacity = '0.7';
                        this.textContent = 'Marked as Read';
                        this.disabled = true;
                        break;
                    case 'View Details':
                    case 'View Full Report':
                    case 'View Guidelines':
                        alert(`Opening detailed view for: ${noticeTitle}`);
                        break;
                    case 'Submit Response':
                    case 'Appeal Decision':
                    case 'Contact Inspector':
                    case 'Contact Admin':
                        alert(`Opening contact form...`);
                        break;
                    default:
                        alert(`Action: ${action} - Feature coming soon!`);
                }
            });
        }
    });
    
    // Quick Actions Functionality
    const quickActionBtns = document.querySelectorAll('.quick-action-btn');
    quickActionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.querySelector('span').textContent.trim();
            
            switch(action) {
                case 'Update Prices':
                    alert('Redirecting to price management dashboard...');
                    break;
                case 'Submit Report':
                    alert('Opening report submission portal...');
                    break;
                case 'Schedule Inspection':
                    alert('Opening inspection scheduling system...');
                    break;
                case 'Contact Admin':
                    alert('Opening admin contact form...');
                    break;
            }
        });
    });
});

// Cleaning Request Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    const cleaningForm = document.querySelector('#cleaning-request-section .cleaning-form');
    
    // Handle form submission
    if (cleaningForm) {
        cleaningForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Cleaning request submitted!');
            cleaningForm.reset();
        });
    }
});
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
        
        // Update active menu item
        menuItems.forEach(i => i.classList.remove('active'));
        this.classList.add('active');
        
        // Hide all content sections
        contentSections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Show the target section with a small delay for smooth transition
        if (sectionName) {
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

// Survey Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Survey Modal Elements
    const surveyModal = document.getElementById('surveyModal');
    const surveyModalClose = document.getElementById('surveyModalClose');
    
    // Survey Data
    const commodities = {
        fish: [
            "Bangus", "Tilapia", "Galungong (local)", "Galunggong (imported)",
            "Alumahan", "Sapsap", "Tamban", "Daing na galunggong",
            "Labahita", "Dilis", "Tuyo (salinas)", "Tuyo (tamban)"
        ],
        other: [
            "Sugar, Refined", "Sugar, Washed", "Sugar, Brown (raw)",
            "Cooking oil palm (350ml)", "Cooking oil palm (1liter)"
        ],
        fruits: [
            "Calamansi", "Banana (lakatan)", "Banana (Latundan)",
            "Papaya", "Watermelon", "Melon", "Mango (Carabao)"
        ],
        lowland: [
            "Ampalaya", "Sitao", "Petchay (native)", "Squash",
            "Eggplant", "Tomato", "Upo", "Okra", "Radish"
        ],
        highland: [
            "Cabbage (scorpio)", "Carrots", "Habitchuelas (baguio beans)",
            "Petchay (baguio)", "Chayote"
        ],
        meat: [
            "Beef rump", "Beef brisket", "Pork ham/kasim",
            "Pork liempo", "Whole Chicken", "Chicken egg"
        ],
        rice: [
            "NFA (regular milled)", "NFA (well milled)", "Special (blue tag)",
            "Premium (yellow tag)", "Well milled (White tag)", "Regular milled (White tag)"
        ]
    };

    let currentPage = 1;
    let totalItems = 0;

    // Function to open survey modal
    function openSurveyModal() {
        if (surveyModal) {
            surveyModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            updateProgress();
            updateEmptyStates();
        }
    }

    // Function to close survey modal
    function closeSurveyModal() {
        if (surveyModal) {
            surveyModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    }

    // Progress and page management
    window.updateProgress = function() {
        const progressFill = document.getElementById('progressFill');
        const pageIndicator = document.getElementById('pageIndicator');
        
        if (currentPage === 1) {
            progressFill.style.width = '50%';
            pageIndicator.textContent = 'Page 1 of 2 - Basic Information';
        } else {
            progressFill.style.width = '100%';
            pageIndicator.textContent = 'Page 2 of 2 - Product Categories';
        }
    }

    // Form validation functions
    function showError(fieldId, message) {
        const errorElement = document.getElementById(fieldId + 'Error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            document.getElementById(fieldId).style.borderColor = '#e74c3c';
        }
    }

    function hideError(fieldId) {
        const errorElement = document.getElementById(fieldId + 'Error');
        if (errorElement) {
            errorElement.style.display = 'none';
            document.getElementById(fieldId).style.borderColor = '#ddd';
        }
    }

    function validatePage1() {
        let isValid = true;
        
        const requiredFields = [
            {id: 'barangay', message: 'Please select your village or farmstead'},
            {id: 'businessName', message: 'Please enter your farm or business name'},
            {id: 'businessType', message: 'Please select your market role'},
            {id: 'supplySource', message: 'Please enter your supply source'}
        ];
        
        requiredFields.forEach(field => {
            const element = document.getElementById(field.id);
            if (!element.value.trim()) {
                showError(field.id, field.message);
                isValid = false;
            } else {
                hideError(field.id);
            }
        });
        
        return isValid;
    }

    // Page navigation
    window.nextPage = function() {
        if (validatePage1()) {
            document.getElementById('page1').classList.remove('active');
            document.getElementById('page2').classList.add('active');
            currentPage = 2;
            updateProgress();
            window.scrollTo(0, 0);
        }
    }

    window.previousPage = function() {
        document.getElementById('page2').classList.remove('active');
        document.getElementById('page1').classList.add('active');
        currentPage = 1;
        updateProgress();
        window.scrollTo(0, 0);
    }

    // Item management functions
    function createItemRow(category, existingData = null) {
        const row = document.createElement("div");
        row.classList.add("input-group");

        // Commodity select
        let select = document.createElement("select");
        select.innerHTML = `<option value="">Choose a product...</option>` + 
            commodities[category].map(item => `<option value="${item}">${item}</option>`).join("");
        if (existingData) select.value = existingData.commodity;

        // Price input
        let price = document.createElement("input");
        price.type = "number";
        price.placeholder = "Price (₱)";
        price.min = "0";
        price.step = "0.01";
        if (existingData) price.value = existingData.price;

        // Unit select
        let unit = document.createElement("select");
        unit.innerHTML = `
            <option value="">Unit</option>
            <option value="kg">Kilogram (kg)</option>
            <option value="g">Gram (g)</option>
            <option value="pc">Piece (pc)</option>
            <option value="pack">Pack</option>
            <option value="liter">Liter</option>
            <option value="ml">Milliliter (ml)</option>
            <option value="other">Other</option>
        `;
        if (existingData) unit.value = existingData.unit;

        // Calamity select
        let calamity = document.createElement("select");
        calamity.innerHTML = `
            <option value="">No Weather Impact</option>
            <option value="Typhoon">Typhoon</option>
            <option value="Flood">Flood</option>
            <option value="Drought">Drought</option>
            <option value="Earthquake">Earthquake</option>
            <option value="Other">Other Natural Disaster</option>
        `;
        if (existingData) calamity.value = existingData.calamity;

        // Action buttons container
        let buttonContainer = document.createElement("div");
        buttonContainer.style.display = "flex";
        buttonContainer.style.gap = "8px";

        let saveBtn = document.createElement("button");
        saveBtn.innerHTML = "💾 Save";
        saveBtn.onclick = () => {
            if(select.value && price.value && unit.value){
                const supplySource = document.getElementById('supplySource').value;
                if (!supplySource) {
                    alert("Please enter your supply source in the basic information section first.");
                    return;
                }
                saveItem(category, { 
                    commodity: select.value, 
                    price: price.value, 
                    unit: unit.value, 
                    calamity: calamity.value,
                    supplySource: supplySource
                }, row);
            } else {
                alert("Please fill in the product name, price, and unit before saving.");
            }
        };

        let cancelBtn = document.createElement("button");
        cancelBtn.innerHTML = "❌ Cancel";
        cancelBtn.classList.add("btn-danger");
        cancelBtn.onclick = () => row.remove();

        buttonContainer.appendChild(saveBtn);
        buttonContainer.appendChild(cancelBtn);

        row.appendChild(select);
        row.appendChild(price);
        row.appendChild(unit);
        row.appendChild(calamity);
        row.appendChild(buttonContainer);

        return row;
    }

    window.addItem = function(category) {
        const container = document.getElementById(category + "-list");
        const emptyState = document.getElementById(category + "-empty");
        if (emptyState) emptyState.style.display = "none";
        
        container.appendChild(createItemRow(category));
    }

    function saveItem(category, data, rowElement) {
        const container = document.getElementById(category + "-list");

        let savedDiv = document.createElement("div");
        savedDiv.classList.add("saved-item");

        let infoDiv = document.createElement("div");
        infoDiv.classList.add("saved-item-info");
        infoDiv.innerHTML = `
            <strong>${data.commodity}</strong><br>
            <span style="color: #2E8B57; font-size: 1.1em;">₱${parseFloat(data.price).toFixed(2)} per ${data.unit}</span>
            ${data.calamity ? `<br><span style="color: #e74c3c;">⚠️ Affected by: ${data.calamity}</span>` : ""}
            <br><small style="color: #666;">Source: ${data.supplySource}</small>
        `;

        let actionsDiv = document.createElement("div");
        actionsDiv.classList.add("saved-item-actions");

        let editBtn = document.createElement("button");
        editBtn.innerHTML = "✏️ Edit";
        editBtn.classList.add("btn-warning");
        editBtn.onclick = () => {
            savedDiv.remove();
            container.appendChild(createItemRow(category, data));
            updateEmptyStates();
        };

        let deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "🗑️ Delete";
        deleteBtn.classList.add("btn-danger");
        deleteBtn.onclick = () => {
            if (confirm("Are you sure you want to delete this item?")) {
                savedDiv.remove();
                totalItems--;
                updateEmptyStates();
            }
        };

        actionsDiv.appendChild(editBtn);
        actionsDiv.appendChild(deleteBtn);

        savedDiv.appendChild(infoDiv);
        savedDiv.appendChild(actionsDiv);

        container.appendChild(savedDiv);
        rowElement.remove();
        totalItems++;
    }

    function updateEmptyStates() {
        const categories = ["rice", "lowland", "highland", "fruits", "meat", "fish", "other"];
        categories.forEach(category => {
            const container = document.getElementById(category + "-list");
            const emptyState = document.getElementById(category + "-empty");
            const items = container.querySelectorAll(".saved-item");
            
            if (items.length === 0 && emptyState) {
                emptyState.style.display = "block";
            } else if (emptyState) {
                emptyState.style.display = "none";
            }
        });
    }

    // Form management functions
    window.clearForm = function() {
        if(confirm("Are you sure you want to clear all your entries? This action cannot be undone.")) {
            // Clear basic info
            document.getElementById("barangay").value = "";
            document.getElementById("ownerName").value = "";
            document.getElementById("businessName").value = "";
            document.getElementById("businessType").value = "";
            document.getElementById("supplySource").value = "";
            
            // Clear all saved items
            const savedLists = document.querySelectorAll(".saved-items-container");
            savedLists.forEach(list => {
                const savedItems = list.querySelectorAll(".saved-item");
                savedItems.forEach(item => item.remove());
            });
            
            // Clear any input rows
            const inputRows = document.querySelectorAll(".input-group");
            inputRows.forEach(row => row.remove());
            
            totalItems = 0;
            updateEmptyStates();
            
            // Hide any error messages
            const errorMessages = document.querySelectorAll(".error-message");
            errorMessages.forEach(msg => msg.style.display = "none");
            
            // Reset field borders
            const inputs = document.querySelectorAll("input, select");
            inputs.forEach(input => input.style.borderColor = "#ddd");
            
            // Go back to page 1
            if (currentPage === 2) {
                previousPage();
            }
            
            alert("All fields have been cleared successfully!");
        }
    }

    window.submitForm = function() {
        // Check if any items were added
        const savedItems = document.querySelectorAll(".saved-item");
        if (savedItems.length === 0) {
            alert("Please add at least one product before submitting your survey.");
            return;
        }
        
        // Show loading indicator
        document.getElementById("loadingIndicator").style.display = "block";
        
        // Simulate form submission
        setTimeout(() => {
            document.getElementById("loadingIndicator").style.display = "none";
            document.getElementById("successMessage").style.display = "block";
            
            // Scroll to success message
            document.getElementById("successMessage").scrollIntoView({ 
                behavior: "smooth", 
                block: "center" 
            });
            
            alert("🎉 Survey submitted successfully! Thank you for contributing to fair market pricing.");
            
            // Here you would typically send data to server
        }, 2000);
    }

    // Event listeners for modal triggers

    // Floating Submit Survey Button functionality
    const submitSurveyBtn = document.querySelector('.submit-survey-btn');
    if (submitSurveyBtn) {
        submitSurveyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openSurveyModal();
        });
        
        // Add visual feedback on hover
        submitSurveyBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        submitSurveyBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    }

    // Survey Response menu item functionality
    const surveyResponseMenuItem = document.querySelector('.menu-item[data-section="survey-response"]');
    if (surveyResponseMenuItem) {
        surveyResponseMenuItem.addEventListener('click', function(e) {
            e.preventDefault();
            openSurveyModal();
        });
    }

    // Close modal functionality
    if (surveyModalClose) {
        surveyModalClose.addEventListener('click', closeSurveyModal);
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === surveyModal) {
            closeSurveyModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && surveyModal.style.display === 'block') {
            closeSurveyModal();
        }
    });

    // Real-time validation
    const requiredFields = ["barangay", "businessName", "businessType", "supplySource"];
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener("change", function() {
                if (this.value.trim()) {
                    hideError(fieldId);
                }
            });
        }
    });
});

// Profile dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
    const profileDropdown = document.querySelector('.profile-dropdown');
    const dropdownContent = document.querySelector('.dropdown-content');
    
    if (profileDropdown && dropdownContent) {
        // Toggle dropdown when clicking on profile
        profileDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdownContent.classList.toggle('show');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!profileDropdown.contains(e.target)) {
                dropdownContent.classList.remove('show');
            }
        });
        
        // Handle dropdown menu item clicks
        const dropdownItems = dropdownContent.querySelectorAll('a');
        dropdownItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const section = this.getAttribute('data-section');
                
                if (section) {
                    // Close dropdown
                    dropdownContent.classList.remove('show');
                    
                    // Update sidebar active state
                    const menuItems = document.querySelectorAll('.menu-item');
                    menuItems.forEach(i => i.classList.remove('active'));
                    
                    // Find and activate corresponding menu item
                    const correspondingMenuItem = document.querySelector(`.menu-item[data-section="${section}"]`);
                    if (correspondingMenuItem) {
                        correspondingMenuItem.classList.add('active');
                    }
                    
                    // Show the target section
                    const contentSections = document.querySelectorAll('.content-section');
                    contentSections.forEach(section => section.classList.remove('active'));
                    
                    const targetSection = document.getElementById(section + '-section');
                    if (targetSection) {
                        setTimeout(() => {
                            targetSection.classList.add('active');
                        }, 50);
                    }
                }
            });
        });
    }
});

// Profile Management Functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeProfileManagement();
});

function initializeProfileManagement() {
    // Initialize edit profile form
    initializeEditProfileForm();
    
    // Initialize change password form
    initializeChangePasswordForm();
    
    // Initialize account settings form
    initializeAccountSettingsForm();
    
    // Initialize password toggles
    initializePasswordToggles();
    
    // Initialize avatar change functionality
    initializeAvatarChange();
}

// Edit Profile Form
function initializeEditProfileForm() {
    const editForm = document.getElementById('editProfileForm');
    const cancelBtn = document.getElementById('cancelEditProfile');
    
    if (editForm) {
        editForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleProfileUpdate(this);
        });
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            // Reset form to original values
            editForm.reset();
            // Optionally navigate back to view profile
            showNotification('Changes cancelled', 'info');
        });
    }
}

// Change Password Form
function initializeChangePasswordForm() {
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
            passwordForm.reset();
            showNotification('Password change cancelled', 'info');
        });
    }
}

// Account Settings Form
function initializeAccountSettingsForm() {
    const settingsForm = document.getElementById('accountSettingsForm');
    const cancelBtn = document.getElementById('cancelAccountSettings');
    
    if (settingsForm) {
        settingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleSettingsUpdate(this);
        });
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            // Reset all toggles to default state
            resetAccountSettings();
            showNotification('Settings reset to defaults', 'info');
        });
    }
    
    // Initialize toggle switches
    const toggleSwitches = document.querySelectorAll('#account-settings-section .toggle-switch input');
    toggleSwitches.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const settingName = this.id.replace('Vendor', '');
            const isEnabled = this.checked;
            
            // Save setting immediately
            handleSettingChange(settingName, isEnabled);
            
            // Show feedback
            const settingLabel = this.closest('.setting-item').querySelector('h4').textContent;
            showNotification(`${settingLabel} ${isEnabled ? 'enabled' : 'disabled'}`, 'success');
        });
    });
}

// Password Toggle Functionality
function initializePasswordToggles() {
    const passwordToggles = document.querySelectorAll('.password-toggle');
    
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            const passwordInput = document.getElementById(targetId);
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

// Avatar Change Functionality
function initializeAvatarChange() {
    const changeAvatarBtns = document.querySelectorAll('.change-avatar-btn');
    
    changeAvatarBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Create file input
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            fileInput.style.display = 'none';
            
            fileInput.addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        // Update all avatar images
                        const avatars = document.querySelectorAll('.user-avatar, .profile-avatar-large');
                        avatars.forEach(avatar => {
                            avatar.src = e.target.result;
                        });
                        
                        showNotification('Avatar updated successfully!', 'success');
                    };
                    reader.readAsDataURL(file);
                }
            });
            
            document.body.appendChild(fileInput);
            fileInput.click();
            document.body.removeChild(fileInput);
        });
    });
}

// Handle Profile Update
function handleProfileUpdate(form) {
    const formData = new FormData(form);
    const profileData = {};
    
    // Collect form data
    for (let [key, value] of formData.entries()) {
        profileData[key] = value;
    }
    
    // Show loading
    showLoadingSpinner(true);
    
    // Simulate API call
    setTimeout(() => {
        showLoadingSpinner(false);
        
        // Update profile display in view section
        updateProfileDisplay(profileData);
        
        // Show success message
        showNotification('Profile updated successfully!', 'success');
        
        // Optionally navigate to view profile
        setTimeout(() => {
            const viewProfileMenuItem = document.querySelector('.menu-item[data-section="view-profile"]');
            if (viewProfileMenuItem) {
                viewProfileMenuItem.click();
            }
        }, 1000);
    }, 1500);
}

// Handle Password Change
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
    
    // Show loading
    showLoadingSpinner(true);
    
    // Simulate API call
    setTimeout(() => {
        showLoadingSpinner(false);
        
        // Clear form
        form.reset();
        
        // Show success message
        showNotification('Password changed successfully!', 'success');
    }, 1500);
}

// Handle Settings Update
function handleSettingsUpdate(form) {
    // Show loading
    showLoadingSpinner(true);
    
    setTimeout(() => {
        showLoadingSpinner(false);
        showNotification('Settings saved successfully!', 'success');
    }, 1000);
}

// Handle Individual Setting Change
function handleSettingChange(settingName, isEnabled) {
    // Save to localStorage (in real app, this would be an API call)
    const settings = JSON.parse(localStorage.getItem('vendorSettings') || '{}');
    settings[settingName] = isEnabled;
    localStorage.setItem('vendorSettings', JSON.stringify(settings));
}

// Reset Account Settings
function resetAccountSettings() {
    // Reset toggles to default state
    const defaultSettings = {
        emailNotifications: true,
        smsNotifications: false,
        pushNotifications: true,
        profileVisibility: true,
        dataShare: false,
        sessionTimeout: true,
        loginAlerts: true
    };
    
    Object.keys(defaultSettings).forEach(setting => {
        const toggle = document.getElementById(setting + 'Vendor');
        if (toggle) {
            toggle.checked = defaultSettings[setting];
        }
    });
    
    // Save to localStorage
    localStorage.setItem('vendorSettings', JSON.stringify(defaultSettings));
}

// Update Profile Display
function updateProfileDisplay(profileData) {
    // Update view profile section
    const detailRows = document.querySelectorAll('#view-profile-section .detail-row');
    
    detailRows.forEach(row => {
        const label = row.querySelector('label').textContent;
        const valueSpan = row.querySelector('span');
        
        if (label.includes('Full Name') && profileData.firstName && profileData.lastName) {
            valueSpan.textContent = `${profileData.firstName} ${profileData.lastName}`;
        } else if (label.includes('Email') && profileData.email) {
            valueSpan.textContent = profileData.email;
        } else if (label.includes('Business Name') && profileData.businessName) {
            valueSpan.textContent = profileData.businessName;
        } else if (label.includes('Phone') && profileData.phone) {
            valueSpan.textContent = profileData.phone;
        } else if (label.includes('Address') && profileData.address) {
            valueSpan.textContent = profileData.address;
        }
    });
    
    // Update header user name
    const userName = document.querySelector('.user-name');
    if (userName && profileData.firstName) {
        userName.textContent = profileData.firstName + ' ' + (profileData.lastName || '');
    }
}

// Utility Functions
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
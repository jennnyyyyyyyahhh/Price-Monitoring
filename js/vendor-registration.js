// Vendor Registration JavaScript

// Form validation and functionality
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('vendorRegistrationForm');
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    
    // Toggle password visibility
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetInput = document.getElementById(targetId);
            const icon = this.querySelector('i');
            
            if (targetInput.type === 'password') {
                targetInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                targetInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
    
    // Real-time validation
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const contactNumber = document.getElementById('contactNumber');
    
    // Username validation
    username.addEventListener('input', function() {
        const value = this.value.trim();
        if (value.length > 0 && value.length < 4) {
            this.setCustomValidity('Username must be at least 4 characters long');
        } else {
            this.setCustomValidity('');
        }
    });
    
    // Password validation
    password.addEventListener('input', function() {
        const value = this.value;
        if (value.length > 0 && value.length < 8) {
            this.setCustomValidity('Password must be at least 8 characters long');
        } else {
            this.setCustomValidity('');
        }
        
        // Check confirm password match
        if (confirmPassword.value && confirmPassword.value !== value) {
            confirmPassword.setCustomValidity('Passwords do not match');
        } else {
            confirmPassword.setCustomValidity('');
        }
    });
    
    // Confirm password validation
    confirmPassword.addEventListener('input', function() {
        const value = this.value;
        const passwordValue = password.value;
        
        if (value !== passwordValue) {
            this.setCustomValidity('Passwords do not match');
        } else {
            this.setCustomValidity('');
        }
    });
    
    // Contact number formatting
    contactNumber.addEventListener('input', function() {
        let value = this.value.replace(/\D/g, ''); // Remove non-digits
        
        // Philippine number format
        if (value.startsWith('63')) {
            value = '+' + value;
        } else if (value.startsWith('09')) {
            value = '+63' + value.substring(1);
        } else if (value.length === 10 && value.startsWith('9')) {
            value = '+63' + value;
        }
        
        this.value = value;
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Additional validation
        if (!validateForm()) {
            return;
        }
        
        // Show loading state
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Registering...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Show success message
            showSuccessMessage();
            
            // Reset form (optional)
            // form.reset();
        }, 2000);
    });
    
    function validateForm() {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.focus();
                isValid = false;
                return false;
            }
        });
        
        // Check passwords match
        if (password.value !== confirmPassword.value) {
            confirmPassword.focus();
            isValid = false;
        }
        
        // Check terms agreement
        const agreeTerms = document.getElementById('agreeTerms');
        if (!agreeTerms.checked) {
            agreeTerms.focus();
            isValid = false;
        }
        
        return isValid;
    }
    
    function showSuccessMessage() {
        // Create success modal or alert
        const successMessage = document.createElement('div');
        successMessage.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            text-align: center;
            z-index: 1000;
            max-width: 400px;
            width: 90%;
        `;
        
        successMessage.innerHTML = `
            <div style="color: #2e9c6a; font-size: 3rem; margin-bottom: 20px;">
                <i class="fas fa-check-circle"></i>
            </div>
            <h2 style="color: #2e9c6a; margin-bottom: 10px;">Registration Successful!</h2>
            <p style="color: #666; margin-bottom: 20px;">
                Your vendor application has been submitted. You will receive a confirmation email shortly.
            </p>
            <button onclick="this.parentElement.remove(); document.getElementById('overlay').remove();" 
                    style="background: #2e9c6a; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer;">
                Close
            </button>
        `;
        
        // Create overlay
        const overlay = document.createElement('div');
        overlay.id = 'overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 999;
        `;
        
        document.body.appendChild(overlay);
        document.body.appendChild(successMessage);
    }
    
    // Auto-fill market location when market name changes (if needed for other markets)
    const marketName = document.getElementById('marketName');
    const marketLocation = document.getElementById('marketLocation');
    
    marketName.addEventListener('change', function() {
        if (this.value === 'Tanza Public Market') {
            marketLocation.value = 'Tanza Public Market, Poblacion, Tanza, Cavite, Philippines';
        }
    });
    
    // Initial market location fill
    if (marketName.value === 'Tanza Public Market') {
        marketLocation.value = 'Tanza Public Market, Poblacion, Tanza, Cavite, Philippines';
    }
});

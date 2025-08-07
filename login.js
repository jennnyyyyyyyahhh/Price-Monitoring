// Login Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const loginBtn = document.getElementById('loginBtn');
    const errorMessage = document.getElementById('errorMessage');
    const rememberMeCheckbox = document.getElementById('rememberMe');

    // Password visibility toggle
    togglePasswordBtn.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        const icon = this.querySelector('i');
        if (type === 'text') {
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });

    // Form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        
        // Hide previous error messages
        hideError();
        
        // Basic validation
        if (!username || !password) {
            showError('Please fill in all fields');
            return;
        }
        
        // Show loading state
        showLoading();
        
        // Simulate login process (replace with actual authentication)
        setTimeout(() => {
            authenticateUser(username, password);
        }, 1500);
    });

    // Authentication function (demo - replace with actual API call)
    function authenticateUser(username, password) {
        // Demo credentials - replace with actual authentication logic
        const validCredentials = [
            { username: 'admin', password: 'admin123' },
            { username: 'administrator', password: 'admin@2025' },
            { username: 'tanzaadmin', password: 'tanza123' }
        ];
        
        const isValid = validCredentials.some(cred => 
            cred.username === username && cred.password === password
        );
        
        if (isValid) {
            // Success - save login state if remember me is checked
            if (rememberMeCheckbox.checked) {
                localStorage.setItem('rememberLogin', 'true');
                localStorage.setItem('username', username);
            }
            
            // Show success animation
            showSuccess();
            
            // Redirect to admin dashboard after success animation
            setTimeout(() => {
                window.location.href = 'admin/admin.html';
            }, 1000);
        } else {
            hideLoading();
            showError('Invalid username or password. Please try again.');
            
            // Add shake animation to form
            const loginCard = document.querySelector('.login-card');
            loginCard.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                loginCard.style.animation = 'slideUp 0.8s ease-out';
            }, 500);
        }
    }

    // Show loading state
    function showLoading() {
        loginBtn.classList.add('loading');
        loginBtn.disabled = true;
        document.querySelector('.btn-text').style.opacity = '0';
        document.querySelector('.btn-loader').style.display = 'flex';
    }

    // Hide loading state
    function hideLoading() {
        loginBtn.classList.remove('loading');
        loginBtn.disabled = false;
        document.querySelector('.btn-text').style.opacity = '1';
        document.querySelector('.btn-loader').style.display = 'none';
    }

    // Show success state
    function showSuccess() {
        loginBtn.style.background = 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)';
        document.querySelector('.btn-text').textContent = 'Success!';
        document.querySelector('.btn-loader').innerHTML = '<i class="fas fa-check"></i>';
    }

    // Show error message
    function showError(message) {
        document.getElementById('errorText').textContent = message;
        errorMessage.style.display = 'flex';
        errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Hide error message
    function hideError() {
        errorMessage.style.display = 'none';
    }

    // Input focus effects
    const inputs = document.querySelectorAll('.input-container input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
            this.parentElement.style.boxShadow = '0 4px 15px rgba(46, 156, 106, 0.1)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
            this.parentElement.style.boxShadow = 'none';
        });
    });

    // Check for remembered login
    if (localStorage.getItem('rememberLogin') === 'true') {
        const savedUsername = localStorage.getItem('username');
        if (savedUsername) {
            usernameInput.value = savedUsername;
            rememberMeCheckbox.checked = true;
        }
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Enter key to submit form
        if (e.key === 'Enter' && !loginBtn.disabled) {
            loginForm.dispatchEvent(new Event('submit'));
        }
        
        // Escape key to clear form
        if (e.key === 'Escape') {
            usernameInput.value = '';
            passwordInput.value = '';
            hideError();
            usernameInput.focus();
        }
    });

    // Auto-hide error message after 5 seconds
    let errorTimeout;
    function showError(message) {
        document.getElementById('errorText').textContent = message;
        errorMessage.style.display = 'flex';
        errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Clear previous timeout
        if (errorTimeout) {
            clearTimeout(errorTimeout);
        }
        
        // Set new timeout
        errorTimeout = setTimeout(() => {
            hideError();
        }, 5000);
    }

    // Particle animation enhancement
    function createDynamicParticles() {
        const particlesContainer = document.querySelector('.particles');
        
        // Remove existing particles
        particlesContainer.innerHTML = '';
        
        // Create new particles
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random position
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            // Random animation duration and delay
            particle.style.animationDuration = (5 + Math.random() * 5) + 's';
            particle.style.animationDelay = Math.random() * 2 + 's';
            
            particlesContainer.appendChild(particle);
        }
    }

    // Initialize dynamic particles
    createDynamicParticles();
    
    // Recreate particles every 30 seconds for variety
    setInterval(createDynamicParticles, 30000);

    // Form validation enhancements
    function validateInput(input) {
        const value = input.value.trim();
        const container = input.parentElement;
        
        // Remove existing validation classes
        container.classList.remove('valid', 'invalid');
        
        if (value.length > 0) {
            if (input.type === 'text' && value.length >= 3) {
                container.classList.add('valid');
            } else if (input.type === 'password' && value.length >= 6) {
                container.classList.add('valid');
            } else {
                container.classList.add('invalid');
            }
        }
    }

    // Add real-time validation
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            validateInput(this);
            hideError(); // Hide error on input
        });
    });

    // Focus on username input when page loads
    setTimeout(() => {
        usernameInput.focus();
    }, 500);
});

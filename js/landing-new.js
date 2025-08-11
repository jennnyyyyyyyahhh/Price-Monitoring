// Landing Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
    
    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Form submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Simulate form submission
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
    
    // Weather data (simulated)
    const weatherCards = document.querySelectorAll('.weather-card');
    const weatherData = [
        { day: 'Mon', icon: 'fa-cloud-sun', low: 24, high: 33, desc: 'Partly cloudy' },
        { day: 'Tue', icon: 'fa-cloud-rain', low: 26, high: 36, desc: 'Rain-storm' },
        { day: 'Wed', icon: 'fa-sun', low: 35, high: 29, desc: 'Sunny' },
        { day: 'Thu', icon: 'fa-bolt', low: 25, high: 29, desc: 'Thunderstorms' },
        { day: 'Fri', icon: 'fa-cloud', low: 27, high: 32, desc: 'Cloudy' }
    ];
    
    // Animate weather cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.weather-card, .feature-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s, transform 0.6s';
        observer.observe(el);
    });
    
    // Stats counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.textContent);
                animateCounter(target, 0, finalValue, 2000);
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    function animateCounter(element, start, end, duration) {
        const startTime = performance.now();
        const suffix = element.textContent.includes('+') ? '+' : '';
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(start + (end - start) * progress);
            
            element.textContent = current + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
    
    // Grocery bag animation
    const groceryBag = document.querySelector('.grocery-bag');
    if (groceryBag) {
        // Remove floating animation
        // groceryBag.style.animation = 'float 6s ease-in-out infinite';
        
        // Add CSS for floating animation
        const style = document.createElement('style');
        style.textContent = `
            /* Removed floating animations */
            
            .navbar.scrolled {
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
            }
            
            @media (max-width: 768px) {
                .nav-menu.active {
                    display: flex;
                    flex-direction: column;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    width: 100%;
                    background: white;
                    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
                    padding: 2rem;
                    gap: 1rem;
                }
                
                .hamburger.active span:nth-child(1) {
                    transform: rotate(45deg) translate(5px, 5px);
                }
                
                .hamburger.active span:nth-child(2) {
                    opacity: 0;
                }
                
                .hamburger.active span:nth-child(3) {
                    transform: rotate(-45deg) translate(7px, -6px);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Parallax effect for hero section (removed)
    // window.addEventListener('scroll', function() {
    //     const scrolled = window.pageYOffset;
    //     const parallaxElements = document.querySelectorAll('.grocery-illustration');
    //     
    //     parallaxElements.forEach(element => {
    //         const speed = 0.5;
    //         element.style.transform = `translateY(${scrolled * speed}px)`;
    //     });
    // });
});

// Utility function for smooth scrolling to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
document.addEventListener('DOMContentLoaded', function() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.className = 'scroll-to-top';
    scrollButton.onclick = scrollToTop;
    
    const style = document.createElement('style');
    style.textContent = `
        .scroll-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: #4CAF50;
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            font-size: 1.2rem;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s;
            z-index: 1000;
        }
        
        .scroll-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        
        .scroll-to-top:hover {
            background: #45a049;
            transform: translateY(-3px);
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(scrollButton);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    });

    // Notification System
    const notificationBtn = document.getElementById('notificationBtn');
    const notificationDropdown = document.getElementById('notificationDropdown');
    const markAllRead = document.getElementById('markAllRead');
    const notificationBadge = document.getElementById('notificationBadge');
    
    let notifications = [
        {
            id: 1,
            type: 'price-alert',
            title: 'Price Alert: Tomatoes',
            message: 'Price increased by 15% in the last hour',
            time: '2 minutes ago',
            unread: true
        },
        {
            id: 2,
            type: 'supply-alert', 
            title: 'Low Supply Alert: Rice',
            message: 'Only 5 vendors have rice available',
            time: '15 minutes ago',
            unread: true
        },
        {
            id: 3,
            type: 'market-update',
            title: 'Market Update',
            message: 'New pricing data available for vegetables',
            time: '1 hour ago',
            unread: true
        }
    ];

    // Toggle notification dropdown
    if (notificationBtn && notificationDropdown) {
        notificationBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            notificationDropdown.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!notificationBtn.contains(e.target) && !notificationDropdown.contains(e.target)) {
                notificationDropdown.classList.remove('show');
            }
        });
    }

    // Mark all notifications as read
    if (markAllRead) {
        markAllRead.addEventListener('click', function() {
            notifications.forEach(notification => {
                notification.unread = false;
            });
            
            const unreadItems = document.querySelectorAll('.notification-item.unread');
            unreadItems.forEach(item => {
                item.classList.remove('unread');
            });
            
            updateNotificationBadge();
        });
    }

    // Mark individual notifications as read
    const notificationItems = document.querySelectorAll('.notification-item');
    notificationItems.forEach(item => {
        item.addEventListener('click', function() {
            const notificationId = parseInt(this.dataset.id);
            const notification = notifications.find(n => n.id === notificationId);
            
            if (notification && notification.unread) {
                notification.unread = false;
                this.classList.remove('unread');
                updateNotificationBadge();
            }
        });
    });

    // Update notification badge count
    function updateNotificationBadge() {
        const unreadCount = notifications.filter(n => n.unread).length;
        
        if (notificationBadge) {
            if (unreadCount > 0) {
                notificationBadge.textContent = unreadCount;
                notificationBadge.style.display = 'flex';
            } else {
                notificationBadge.style.display = 'none';
            }
        }
    }

    // Initialize notification badge
    updateNotificationBadge();

    // Add bell shake animation
    const bellShakeStyle = document.createElement('style');
    bellShakeStyle.textContent = `
        @keyframes bellShake {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(-15deg); }
            75% { transform: rotate(15deg); }
        }
        
        .notification-btn.shake {
            animation: bellShake 0.6s ease-in-out;
        }
    `;
    document.head.appendChild(bellShakeStyle);

    // Function to add new notification (for demo purposes)
    function addNewNotification(notification) {
        const newNotification = {
            id: Date.now(),
            type: notification.type || 'market-update',
            title: notification.title,
            message: notification.message,
            time: 'Just now',
            unread: true
        };
        
        notifications.unshift(newNotification);
        updateNotificationBadge();
        
        // Add shake animation to bell
        notificationBtn.classList.add('shake');
        setTimeout(() => {
            notificationBtn.classList.remove('shake');
        }, 600);
    }

    // Make function available globally for demo
    window.addNewNotification = addNewNotification;

    // Login/Sign Up Modal Functionality
    const authModal = document.getElementById('authModal');
    const loginSignupBtn = document.getElementById('loginSignupBtn');
    const closeModal = document.getElementById('closeModal');
    const switchForm = document.getElementById('switchForm');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const modalTitle = document.getElementById('modalTitle');
    const switchText = document.getElementById('switchText');

    let isLoginMode = true;

    // Open modal
    if (loginSignupBtn) {
        loginSignupBtn.addEventListener('click', function(e) {
            e.preventDefault();
            authModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Close modal function
    function closeModalFunction() {
        authModal.classList.remove('active');
        document.body.style.overflow = '';
        // Reset to login form
        if (!isLoginMode) {
            switchFormMode();
        }
        // Clear form data
        clearForms();
    }

    // Close modal events
    if (closeModal) {
        closeModal.addEventListener('click', closeModalFunction);
    }

    // Close modal when clicking outside
    if (authModal) {
        authModal.addEventListener('click', function(e) {
            if (e.target === authModal) {
                closeModalFunction();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && authModal.classList.contains('active')) {
            closeModalFunction();
        }
    });

    // Switch between login and signup forms
    function switchFormMode() {
        if (isLoginMode) {
            // Switch to signup
            loginForm.classList.remove('active');
            signupForm.classList.add('active');
            modalTitle.textContent = 'Create Your Account';
            switchText.textContent = 'Already have an account?';
            switchForm.textContent = 'Login';
            isLoginMode = false;
        } else {
            // Switch to login
            signupForm.classList.remove('active');
            loginForm.classList.add('active');
            modalTitle.textContent = 'Login to Your Account';
            switchText.textContent = "Don't have an account?";
            switchForm.textContent = 'Sign Up';
            isLoginMode = true;
        }
        clearForms();
    }

    if (switchForm) {
        switchForm.addEventListener('click', switchFormMode);
    }

    // Clear form data
    function clearForms() {
        const inputs = authModal.querySelectorAll('input');
        inputs.forEach(input => {
            if (input.type !== 'checkbox') {
                input.value = '';
            } else {
                input.checked = false;
            }
        });
        const selects = authModal.querySelectorAll('select');
        selects.forEach(select => {
            select.selectedIndex = 0;
        });
    }

    // Password toggle functionality
    const passwordToggles = document.querySelectorAll('.password-toggle');
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    // Form submissions
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            const rememberMe = document.getElementById('rememberMe').checked;
            
            if (email && password) {
                // Show loading state
                const submitBtn = this.querySelector('.auth-btn');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
                submitBtn.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    alert(`Welcome back!\nEmail: ${email}\nRemember me: ${rememberMe ? 'Yes' : 'No'}`);
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    closeModalFunction();
                }, 1500);
            }
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const phone = document.getElementById('signupPhone').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const userType = document.getElementById('userType').value;
            const agreeTerms = document.getElementById('agreeTerms').checked;
            
            // Validation
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            if (password.length < 6) {
                alert('Password must be at least 6 characters long!');
                return;
            }
            
            if (!agreeTerms) {
                alert('Please agree to the Terms and Conditions!');
                return;
            }
            
            if (name && email && phone && password && userType) {
                // Show loading state
                const submitBtn = this.querySelector('.auth-btn');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
                submitBtn.disabled = true;
                
                // Simulate API call
                setTimeout(() => {
                    alert(`Account created successfully!\nName: ${name}\nEmail: ${email}\nUser Type: ${userType}`);
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    closeModalFunction();
                }, 2000);
            }
        });
    }

    // Social login buttons
    const googleBtn = document.querySelector('.google-btn');
    const facebookBtn = document.querySelector('.facebook-btn');
    
    if (googleBtn) {
        googleBtn.addEventListener('click', function() {
            alert('Google login would be implemented here!');
        });
    }
    
    if (facebookBtn) {
        facebookBtn.addEventListener('click', function() {
            alert('Facebook login would be implemented here!');
        });
    }

    // Floating Submit Report Button functionality
    const submitReportBtn = document.getElementById('submitReportBtn');
    const reportModal = document.getElementById('reportModal');
    const closeReportModal = document.getElementById('closeReportModal');
    const reportForm = document.getElementById('reportForm');
    const fileUploadArea = document.getElementById('fileUploadArea');
    const reportImageInput = document.getElementById('reportImage');
    const filePreview = document.getElementById('filePreview');
    const previewImage = document.getElementById('previewImage');
    const removeFileBtn = document.getElementById('removeFile');

    if (submitReportBtn) {
        submitReportBtn.addEventListener('click', function() {
            console.log('Submit Report button clicked from landing page');
            if (reportModal) {
                reportModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
        
        // Add some visual feedback on hover
        submitReportBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        submitReportBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    }

    // Close report modal
    if (closeReportModal) {
        closeReportModal.addEventListener('click', function() {
            reportModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Close modal when clicking outside
    if (reportModal) {
        reportModal.addEventListener('click', function(e) {
            if (e.target === reportModal) {
                reportModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // File upload functionality
    if (fileUploadArea && reportImageInput) {
        fileUploadArea.addEventListener('click', function() {
            reportImageInput.click();
        });

        fileUploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.style.borderColor = '#4CAF50';
            this.style.background = '#f0f8f0';
        });

        fileUploadArea.addEventListener('dragleave', function(e) {
            e.preventDefault();
            this.style.borderColor = '#ccc';
            this.style.background = '#fafafa';
        });

        fileUploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            this.style.borderColor = '#ccc';
            this.style.background = '#fafafa';
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleFileSelection(files[0]);
            }
        });

        reportImageInput.addEventListener('change', function(e) {
            if (e.target.files.length > 0) {
                handleFileSelection(e.target.files[0]);
            }
        });
    }

    // Remove file
    if (removeFileBtn) {
        removeFileBtn.addEventListener('click', function() {
            reportImageInput.value = '';
            filePreview.style.display = 'none';
            fileUploadArea.style.display = 'block';
        });
    }

    // Handle file selection
    function handleFileSelection(file) {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImage.src = e.target.result;
                filePreview.style.display = 'block';
                fileUploadArea.style.display = 'none';
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please select a valid image file (PNG, JPG, JPEG)');
        }
    }

    // Handle report form submission
    if (reportForm) {
        reportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('reportName').value;
            const email = document.getElementById('reportEmail').value;
            const description = document.getElementById('reportDescription').value;
            const imageFile = reportImageInput.files[0];
            
            // Simple validation
            if (!name || !email || !description) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Simulate report submission
            alert('Report submitted successfully!\n\nThank you for your feedback. We will review your report and take appropriate action.');
            
            // Reset form and close modal
            reportForm.reset();
            filePreview.style.display = 'none';
            fileUploadArea.style.display = 'block';
            reportModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            console.log('Report submitted:', {
                name: name,
                email: email,
                description: description,
                hasImage: !!imageFile
            });
        });
    }
});

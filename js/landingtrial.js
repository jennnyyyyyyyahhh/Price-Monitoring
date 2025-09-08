// DOM Elements
const notificationBell = document.getElementById('notificationBell');
const notificationBadge = document.getElementById('notificationBadge');
const notificationDropdown = document.getElementById('notificationDropdown');
const loginBtn = document.getElementById('loginBtn');

// Notification System
let notificationCount = 5;
let notifications = [
    {
        type: 'price-drop',
        title: 'Fresh Tomatoes - Tanza Market',
        message: 'Now ₱65/kg (was ₱85/kg) - Save 24% at Maria\'s Farm',
        time: '2 mins ago'
    },
    {
        type: 'price-drop',
        title: 'Local Rice - Farmer\'s Direct',
        message: 'Now ₱48/kg (was ₱55/kg) - Save 13% from Laguna Farms',
        time: '5 mins ago'
    },
    {
        type: 'alert',
        title: 'Organic Apples - Limited Stock',
        message: '₱95/kg - Only 10kg left at Public Market',
        time: '10 mins ago'
    },
    {
        type: 'price-drop',
        title: 'Ripe Bananas - Morning Harvest',
        message: 'Now ₱35/kg (was ₱45/kg) - Fresh from Batangas Farms',
        time: '15 mins ago'
    },
    {
        type: 'price-drop',
        title: 'Carrots - Bulk Discount',
        message: 'Now ₱50/kg (was ₱65/kg) - Highland Vegetables',
        time: '20 mins ago'
    }
];

// Initialize page when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    initializeNotifications();
    initializeAnimations();
    initializeScrollEffects();
    initializePriceDropCards();
    updateNotificationBadge();
});

// Notification Functions
function initializeNotifications() {
    // Toggle notification dropdown
    notificationBell.addEventListener('click', function(e) {
        e.stopPropagation();
        notificationDropdown.classList.toggle('show');
        
        // Add click animation
        notificationBell.style.transform = 'scale(1.2)';
        setTimeout(() => {
            notificationBell.style.transform = 'scale(1)';
        }, 150);
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!notificationDropdown.contains(e.target) && e.target !== notificationBell) {
            notificationDropdown.classList.remove('show');
        }
    });

    // Mark all as read functionality
    const markReadBtn = document.querySelector('.mark-read');
    markReadBtn.addEventListener('click', function() {
        notificationCount = 0;
        updateNotificationBadge();
        showToast('All notifications marked as read!', 'success');
    });

    // Individual notification clicks
    const notificationItems = document.querySelectorAll('.notification-item');
    notificationItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            item.style.opacity = '0.6';
            setTimeout(() => {
                item.remove();
                notificationCount--;
                updateNotificationBadge();
                showToast('Notification dismissed', 'info');
            }, 300);
        });
    });
}

function updateNotificationBadge() {
    if (notificationCount > 0) {
        notificationBadge.textContent = notificationCount;
        notificationBadge.style.display = 'flex';
    } else {
        notificationBadge.style.display = 'none';
    }
}

function addNewNotification(notification) {
    notifications.unshift(notification);
    notificationCount++;
    updateNotificationBadge();
    
    // Show toast notification
    showToast(`New price alert: ${notification.title}`, 'info');
    
    // Bell animation
    notificationBell.style.animation = 'none';
    setTimeout(() => {
        notificationBell.style.animation = 'bell-shake 0.5s ease-in-out';
    }, 10);
}

// Toast Notification System
function showToast(message, type = 'info') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas ${getToastIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="toast-close">&times;</button>
    `;

    // Add toast styles
    toast.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getToastColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        min-width: 300px;
        animation: slideInRight 0.3s ease-out;
        font-family: 'Segoe UI', sans-serif;
        font-weight: 600;
    `;

    document.body.appendChild(toast);

    // Close button functionality
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
        toast.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => toast.remove(), 300);
    });

    // Auto remove after 4 seconds
    setTimeout(() => {
        if (document.body.contains(toast)) {
            toast.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => toast.remove(), 300);
        }
    }, 4000);
}

function getToastIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-times-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    return icons[type] || icons.info;
}

function getToastColor(type) {
    const colors = {
        success: '#4caf50',
        error: '#f44336',
        warning: '#ff7043',
        info: '#2196f3'
    };
    return colors[type] || colors.info;
}

// Add CSS animations for toast
const toastStyles = document.createElement('style');
toastStyles.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes bell-shake {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(15deg); }
        75% { transform: rotate(-15deg); }
    }
    
    .toast-content {
        display: flex;
        align-items: center;
        gap: 0.8rem;
    }
    
    .toast-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0.8;
        transition: opacity 0.3s ease;
    }
    
    .toast-close:hover {
        opacity: 1;
    }
`;
document.head.appendChild(toastStyles);

// Price Drop Card Interactions
function initializePriceDropCards() {
    const notifyButtons = document.querySelectorAll('.btn-notify');
    
    notifyButtons.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            const card = btn.closest('.price-drop-card');
            const productName = card.querySelector('h3').textContent;
            const newPrice = card.querySelector('.new-price').textContent;
            
            // Change button text and style
            btn.textContent = 'Tracking Vendor! ✓';
            btn.style.background = '#4caf50';
            btn.disabled = true;
            
            // Show success message
            showToast(`You'll track ${productName} prices from this vendor!`, 'success');
            
            // Simulate adding to watch list
            setTimeout(() => {
                const notification = {
                    type: 'price-drop',
                    title: `${productName} Vendor Added`,
                    message: `Current price: ${newPrice} - You'll get alerts from this stall!`,
                    time: 'Just now'
                };
                addNewNotification(notification);
            }, 1000);
        });
    });
}

// Scroll Effects
function initializeScrollEffects() {
    // Header background change on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        const scrolled = window.pageYOffset;
        
        if (scrolled > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 25px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    const animatedElements = document.querySelectorAll('.feature-card, .price-drop-card, .weather-card, .about-stat');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
}

// Add fadeInUp animation
const scrollAnimationStyles = document.createElement('style');
scrollAnimationStyles.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(scrollAnimationStyles);

// Hero Section Animations
function initializeAnimations() {
    // Floating price cards animation
    const priceCards = document.querySelectorAll('.price-card');
    priceCards.forEach((card, index) => {
        // Random floating animation with different delays
        const delay = index * 500;
        setTimeout(() => {
            card.style.animation = `float 3s ease-in-out infinite`;
            card.style.animationDelay = `${index * 0.5}s`;
        }, delay);
    });

    // Hero stats counter animation
    setTimeout(() => {
        animateCounters();
    }, 1000);
}

function animateCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const text = stat.textContent;
        const isNumber = /^\d+/.test(text);
        
        if (isNumber) {
            const finalNumber = parseInt(text.replace(/\D/g, ''));
            const suffix = text.replace(/^[\d,]+/, '');
            let currentNumber = 0;
            const increment = finalNumber / 50;
            
            const updateCounter = () => {
                currentNumber += increment;
                if (currentNumber < finalNumber) {
                    stat.textContent = Math.floor(currentNumber).toLocaleString() + suffix;
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = finalNumber.toLocaleString() + suffix;
                }
            };
            
            updateCounter();
        }
    });
}

// Login Button Interaction
if (loginBtn) {
    loginBtn.addEventListener('click', function() {
        showToast('Login/Signup feature coming soon!', 'info');
        
        // Button animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Simulate real-time price updates
function simulateRealTimePriceUpdates() {
    setInterval(() => {
        const products = ['Fresh Tomatoes', 'Lettuce', 'Organic Carrots', 'Green Beans', 'Farm Cabbage'];
        const vendors = ['Maria\'s Organic Farm', 'Green Valley Farms', 'Highland Vegetables', 'Sunshine Farm Co.', 'Fresh Harvest Farm', 'Mountain View Farm'];
        
        const randomProduct = products[Math.floor(Math.random() * products.length)];
        const randomVendor = vendors[Math.floor(Math.random() * vendors.length)];
        const oldPrice = Math.floor(Math.random() * 50) + 50;
        const discount = Math.floor(Math.random() * 20) + 10;
        const newPrice = oldPrice - Math.floor(oldPrice * discount / 100);
        
        const notification = {
            type: 'price-drop',
            title: `${randomProduct} - Market`,
            message: `Now ₱${newPrice}/kg (was ₱${oldPrice}/kg) - ${randomVendor}`,
            time: 'Just now'
        };
        
        // Only add notification if there are fewer than 10
        if (notificationCount < 10) {
            addNewNotification(notification);
        }
    }, 30000); // Every 30 seconds
}

// Weather data simulation
function updateWeatherData() {
    const weatherCards = document.querySelectorAll('.weather-card');
    const conditions = ['Sunny', 'Partly Cloudy', 'Light Rain', 'Clear Skies'];
    const impacts = ['Great Harvest', 'Good for Crops', 'Farming Weather', 'Perfect Growing'];
    
    weatherCards.forEach((card, index) => {
        if (!card.classList.contains('today')) {
            const temp = Math.floor(Math.random() * 10) + 25;
            const condition = conditions[Math.floor(Math.random() * conditions.length)];
            const impact = impacts[Math.floor(Math.random() * impacts.length)];
            
            setTimeout(() => {
                card.querySelector('.weather-temp').textContent = `${temp}°C`;
                card.querySelector('.weather-condition').textContent = condition;
                card.querySelector('.price-impact span').textContent = impact;
            }, index * 200);
        }
    });
}

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    const submitBtn = contactForm.querySelector('.btn-primary');
    
    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const inputs = contactForm.querySelectorAll('.form-input, .form-textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = '#e74c3c';
                isValid = false;
            } else {
                input.style.borderColor = 'transparent';
            }
        });
        
        if (isValid) {
            showToast('Message sent successfully! We\'ll connect you with our farming community.', 'success');
            inputs.forEach(input => input.value = '');
        } else {
            showToast('Please fill in all required fields.', 'error');
        }
    });
}

// Start simulations
setTimeout(() => {
    simulateRealTimePriceUpdates();
    updateWeatherData();
}, 3000);

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Press 'N' to toggle notifications
    if (e.key.toLowerCase() === 'n' && !e.ctrlKey && !e.metaKey) {
        notificationDropdown.classList.toggle('show');
    }
    
    // Press Escape to close notifications
    if (e.key === 'Escape') {
        notificationDropdown.classList.remove('show');
    }
});

// Performance optimization
let ticking = false;

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
    }
}

function updateScrollEffects() {
    // Update scroll-based effects here
    ticking = false;
}

window.addEventListener('scroll', requestTick);

console.log('🌱 FarmFresh Market initialized! Press "N" to toggle notifications, or click the bell icon.');

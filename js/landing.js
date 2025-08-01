// Guard to prevent multiple initializations
if (window.landingPageInitialized) {
    console.log('Landing page already initialized, skipping...');
} else {
    window.landingPageInitialized = true;

// Dynamic categories data
const categories = [
    {
        name: "Fruits",
        img: "../img/fruitss.jpg",
        category: "fruits"
    },
    {
        name: "Vegetables",
        img: "../img/veggies.jpg",
        category: "vegetables"
    },
    {
        name: "Meat & Poultry",
        img: "../img/meat.jpg",
        category: "meat"
    },
    {
        name: "Rice & Grains",
        img: "../img/rice.jpg",
        category: "grains"
    }
];

// Mobile Menu Functionality
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileNavMenu = document.getElementById('mobileNavMenu');
const mobileNavOverlay = document.getElementById('mobileNavOverlay');
const mobileCloseBtn = document.getElementById('mobileCloseBtn');

function openMobileMenu() {
    mobileNavMenu.classList.add('open');
    mobileNavOverlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
    mobileNavMenu.classList.remove('open');
    mobileNavOverlay.style.display = 'none';
    document.body.style.overflow = '';
}

// Mobile menu event listeners
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', openMobileMenu);
}

if (mobileCloseBtn) {
    mobileCloseBtn.addEventListener('click', closeMobileMenu);
}

if (mobileNavOverlay) {
    mobileNavOverlay.addEventListener('click', closeMobileMenu);
}

// Mobile navigation link actions
const mobileBlog = document.getElementById('mobileBlog');
const mobileServices = document.getElementById('mobileServices');

if (mobileBlog) {
    mobileBlog.addEventListener('click', function(e) {
        e.preventDefault();
        closeMobileMenu();
        setTimeout(() => {
            const blogSection = document.querySelector('.blog-section');
            if (blogSection) {
                window.scrollTo({ top: blogSection.offsetTop, behavior: 'smooth' });
            }
        }, 300);
    });
}

if (mobileServices) {
    mobileServices.addEventListener('click', function(e) {
        e.preventDefault();
        closeMobileMenu();
        setTimeout(() => {
            const servicesSection = document.querySelector('.services-section');
            if (servicesSection) {
                window.scrollTo({ top: servicesSection.offsetTop, behavior: 'smooth' });
            }
        }, 300);
    });
}

// Render categories dynamically
const categoriesContainer = document.getElementById('categories');
// Check if categories are already rendered to prevent duplication
if (categoriesContainer && categoriesContainer.children.length === 0) {
    categories.forEach((cat, idx) => {
        const card = document.createElement('div');
        card.className = 'category-card' + (idx === 0 ? ' selected' : '');
        card.innerHTML = `
            <img src="${cat.img}" alt="${cat.name}" onerror="this.src='https://via.placeholder.com/90/2e9c6a/white?text=${cat.name.charAt(0)}'">
            <div class="category-title">${cat.name}</div>
        `;
        card.onclick = () => {
            // Navigate to price dashboard with specific category
            window.location.href = `price-dashboard.html?category=${cat.category}`;
        };
        categoriesContainer.appendChild(card);
    });
}

// Get Started button action
document.getElementById('getStartedBtn').onclick = function() {
    window.location.href = 'price-dashboard.html';
};

// Scroll to Latest Blog section when Blog nav is clicked
const blogNav = document.getElementById('blogNav');
if (blogNav) {
    blogNav.onclick = function(e) {
        e.preventDefault();
        const blogSection = document.querySelector('.blog-section');
        if (blogSection) {
            window.scrollTo({ top: blogSection.offsetTop, behavior: 'smooth' });
        }
    };
}

// Scroll to Our Services section when Services nav is clicked
const servicesNav = document.getElementById('servicesNav');
if (servicesNav) {
    servicesNav.onclick = function(e) {
        e.preventDefault();
        const servicesSection = document.querySelector('.services-section');
        if (servicesSection) {
            window.scrollTo({ top: servicesSection.offsetTop, behavior: 'smooth' });
        }
    };
}

// Dynamic blog data
const blogs = [
    {
        title: "From Farm to Table, Exploring the Journey of Agro Produce",
        img: "../img/farm1.jpg",
        desc: "Exploring the Journey of Agro Produce\" delves into the intricate process of bringing agricultural products from farms to consumers' tables. This enlightening exploration traces the various stages of production, including cultivation, harvesting, processing, packaging, distribution, and retail.",
        link: "#"
    },
    {
        title: "Empowering Farmers, Technology's Role in Modern Agriculture",
        img: "../img/market.jpg",
        desc: "Exploring the Journey of Agro Produce\" delves into the intricate process of bringing agricultural products from farms to consumers' tables. This enlightening exploration traces the various stages of production, including cultivation, harvesting, processing, packaging, distribution, and retail.",
        link: "#"
    },
    {
        title: "Exploring Organic Farming, Healthier Alternatives for a Better Future",
        img: "../img/fish.jpg",
        desc: "Exploring the Journey of Agro Produce\" delves into the intricate process of bringing agricultural products from farms to consumers' tables. This enlightening exploration traces the various stages of production, including cultivation, harvesting, processing, packaging, distribution, and retail.",
        link: "#"
    }
];

// Render blogs dynamically
const blogsContainer = document.getElementById('blogs');
// Check if blogs are already rendered to prevent duplication
if (blogsContainer && blogsContainer.children.length === 0) {
    blogs.forEach(blog => {
        const card = document.createElement('div');
        card.className = 'blog-card';
        card.innerHTML = `
            <img src="${blog.img}" alt="${blog.title}">
            <div class="blog-content">
                <h3>${blog.title}</h3>
                <p>${blog.desc}</p>
                <a href="${blog.link}" class="read-more">Read More</a>
            </div>
        `;
        blogsContainer.appendChild(card);
    });
}

// Dynamic services data
const services = [
    {
        label: "GAD CORNER",
        img: "../img/gadd.jpg"
    },
    {
        label: "SDG",
        img: "../img/sdgg.png"
    },
    {
        label: "LAW",
        img: "../img/law.jpg"
    }
];

// Render services dynamically
const servicesContainer = document.getElementById('services');
// Check if services are already rendered to prevent duplication
if (servicesContainer && servicesContainer.children.length === 0) {
    services.forEach(service => {
        const card = document.createElement('div');
        card.className = 'service-card';
        card.innerHTML = `
            <img src="${service.img}" alt="${service.label}">
            <a href="#" class="service-label">${service.label}</a>
        `;
        servicesContainer.appendChild(card);
    });
}

// Notification bell functionality
document.getElementById('notificationBell').onclick = function(e) {
    e.preventDefault();
    
    // Create notification dropdown if it doesn't exist
    let notificationDropdown = document.getElementById('notificationDropdown');
    if (!notificationDropdown) {
        notificationDropdown = document.createElement('div');
        notificationDropdown.id = 'notificationDropdown';
        notificationDropdown.className = 'notification-dropdown';
        notificationDropdown.innerHTML = `
            <div class="notification-header">
                <h3>Notifications</h3>
                <span class="close-notifications">&times;</span>
            </div>
            <div class="notification-content">
                <div class="notification-item">
                    <div class="notification-icon">🔔</div>
                    <div class="notification-text">
                        <p><strong>New Price Update</strong></p>
                        <p>Rice prices have been updated in your area</p>
                        <span class="notification-time">2 hours ago</span>
                    </div>
                </div>
                <div class="notification-item">
                    <div class="notification-icon">📊</div>
                    <div class="notification-text">
                        <p><strong>Market Report</strong></p>
                        <p>Weekly market analysis is now available</p>
                        <span class="notification-time">1 day ago</span>
                    </div>
                </div>
                <div class="notification-item">
                    <div class="notification-icon">🎯</div>
                    <div class="notification-text">
                        <p><strong>Price Alert</strong></p>
                        <p>Tomato prices dropped by 15%</p>
                        <span class="notification-time">3 days ago</span>
                    </div>
                </div>
            </div>
            <div class="notification-footer">
                <a href="#" class="view-all-notifications">View All Notifications</a>
            </div>
        `;
        document.body.appendChild(notificationDropdown);
        
        // Close notification dropdown when clicking the close button
        notificationDropdown.querySelector('.close-notifications').onclick = function() {
            notificationDropdown.style.display = 'none';
        };
        
        // Close notification dropdown when clicking outside
        document.addEventListener('click', function(event) {
            if (!notificationDropdown.contains(event.target) && !document.getElementById('notificationBell').contains(event.target)) {
                notificationDropdown.style.display = 'none';
            }
        });
    }
    
    // Toggle notification dropdown
    if (notificationDropdown.style.display === 'block') {
        notificationDropdown.style.display = 'none';
    } else {
        notificationDropdown.style.display = 'block';
        // Position the dropdown below the bell icon
        const bellRect = this.getBoundingClientRect();
        notificationDropdown.style.top = (bellRect.bottom + 10) + 'px';
        notificationDropdown.style.right = '40px';
    }
};

// Handle window resize for mobile responsiveness
window.addEventListener('resize', function() {
    // Close mobile menu on resize to larger screen
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
    
    // Reposition notification dropdown if open
    const notificationDropdown = document.getElementById('notificationDropdown');
    if (notificationDropdown && notificationDropdown.style.display === 'block') {
        const bellIcon = document.getElementById('notificationBell');
        if (bellIcon) {
            const bellRect = bellIcon.getBoundingClientRect();
            notificationDropdown.style.top = (bellRect.bottom + 10) + 'px';
            
            // Adjust positioning for mobile
            if (window.innerWidth <= 480) {
                notificationDropdown.style.right = '10px';
                notificationDropdown.style.left = '10px';
            } else {
                notificationDropdown.style.right = '40px';
                notificationDropdown.style.left = 'auto';
            }
        }
    }
});

// Touch event optimization for mobile
if ('ontouchstart' in window) {
    // Add touch event listeners for better mobile experience
    const cards = document.querySelectorAll('.category-card, .blog-card, .service-card');
    cards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        card.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

} // End of guard condition
// Simple admin navigation logic
const navLinks = document.querySelectorAll('.nav-links a');
const sections = {
    dashboardSection: document.getElementById('dashboardSection'),
    categoriesSection: document.getElementById('categoriesSection'),
    blogsSection: document.getElementById('blogsSection'),
    servicesSection: document.getElementById('servicesSection')
};

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        // Hide all sections
        Object.values(sections).forEach(sec => sec.style.display = 'none');
        // Show the selected section
        if (this.id === 'manageCategoriesNav') {
            sections.categoriesSection.style.display = 'block';
        } else if (this.id === 'manageBlogsNav') {
            sections.blogsSection.style.display = 'block';
        } else if (this.id === 'manageServicesNav') {
            sections.servicesSection.style.display = 'block';
        } else {
            sections.dashboardSection.style.display = 'block';
        }
    });
});

// You can expand this file to add CRUD logic for categories, blogs, and services.
// --- Utility functions ---
function getData(key, fallback) {
    return JSON.parse(localStorage.getItem(key)) || fallback;
}
function setData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// --- Categories CRUD ---
let categories = getData('categories', [
    { name: "Fruits", img: "./img/fruitss.jpg" },
    { name: "Vegetables", img: "./img/veggies.jpg" }
]);

function renderAdminCategories() {
    const container = document.getElementById('adminCategories');
    container.innerHTML = '';
    categories.forEach((cat, idx) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <input value="${cat.name}" data-idx="${idx}" class="cat-name">
            <input value="${cat.img}" data-idx="${idx}" class="cat-img">
            <button data-idx="${idx}" class="delete-cat">Delete</button>
        `;
        container.appendChild(div);
    });
    // Add new
    const addDiv = document.createElement('div');
    addDiv.innerHTML = `
        <input placeholder="New name" id="newCatName">
        <input placeholder="New img path" id="newCatImg">
        <button id="addCatBtn">Add</button>
    `;
    container.appendChild(addDiv);
}
renderAdminCategories();

document.getElementById('adminCategories').addEventListener('input', function(e) {
    if (e.target.classList.contains('cat-name')) {
        categories[e.target.dataset.idx].name = e.target.value;
        setData('categories', categories);
    }
    if (e.target.classList.contains('cat-img')) {
        categories[e.target.dataset.idx].img = e.target.value;
        setData('categories', categories);
    }
});
document.getElementById('adminCategories').addEventListener('click', function(e) {
    if (e.target.classList.contains('delete-cat')) {
        categories.splice(e.target.dataset.idx, 1);
        setData('categories', categories);
        renderAdminCategories();
    }
    if (e.target.id === 'addCatBtn') {
        const name = document.getElementById('newCatName').value;
        const img = document.getElementById('newCatImg').value;
        if (name && img) {
            categories.push({ name, img });
            setData('categories', categories);
            renderAdminCategories();
        }
    }
});

// --- Blogs CRUD ---
let blogs = getData('blogs', [
    { title: "Sample Blog", img: "./img/farm1.jpg", desc: "Description here", link: "#" }
]);

function renderAdminBlogs() {
    const container = document.getElementById('adminBlogs');
    container.innerHTML = '';
    blogs.forEach((blog, idx) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <input value="${blog.title}" data-idx="${idx}" class="blog-title">
            <input value="${blog.img}" data-idx="${idx}" class="blog-img">
            <input value="${blog.desc}" data-idx="${idx}" class="blog-desc">
            <input value="${blog.link}" data-idx="${idx}" class="blog-link">
            <button data-idx="${idx}" class="delete-blog">Delete</button>
        `;
        container.appendChild(div);
    });
    // Add new
    const addDiv = document.createElement('div');
    addDiv.innerHTML = `
        <input placeholder="New title" id="newBlogTitle">
        <input placeholder="New img path" id="newBlogImg">
        <input placeholder="New desc" id="newBlogDesc">
        <input placeholder="New link" id="newBlogLink">
        <button id="addBlogBtn">Add</button>
    `;
    container.appendChild(addDiv);
}
renderAdminBlogs();

document.getElementById('adminBlogs').addEventListener('input', function(e) {
    if (e.target.classList.contains('blog-title')) {
        blogs[e.target.dataset.idx].title = e.target.value;
        setData('blogs', blogs);
    }
    if (e.target.classList.contains('blog-img')) {
        blogs[e.target.dataset.idx].img = e.target.value;
        setData('blogs', blogs);
    }
    if (e.target.classList.contains('blog-desc')) {
        blogs[e.target.dataset.idx].desc = e.target.value;
        setData('blogs', blogs);
    }
    if (e.target.classList.contains('blog-link')) {
        blogs[e.target.dataset.idx].link = e.target.value;
        setData('blogs', blogs);
    }
});
document.getElementById('adminBlogs').addEventListener('click', function(e) {
    if (e.target.classList.contains('delete-blog')) {
        blogs.splice(e.target.dataset.idx, 1);
        setData('blogs', blogs);
        renderAdminBlogs();
    }
    if (e.target.id === 'addBlogBtn') {
        const title = document.getElementById('newBlogTitle').value;
        const img = document.getElementById('newBlogImg').value;
        const desc = document.getElementById('newBlogDesc').value;
        const link = document.getElementById('newBlogLink').value;
        if (title && img && desc && link) {
            blogs.push({ title, img, desc, link });
            setData('blogs', blogs);
            renderAdminBlogs();
        }
    }
});

// --- Services CRUD ---
let services = getData('services', [
    { label: "GAD CORNER", img: "./img/gadd.jpg" },
    { label: "SDG", img: "./img/sdgg.png" },
    { label: "LAW", img: "./img/law.jpg" }
]);

function renderAdminServices() {
    const container = document.getElementById('adminServices');
    container.innerHTML = '';
    services.forEach((service, idx) => {
        const div = document.createElement('div');
        div.innerHTML = `
            <input value="${service.label}" data-idx="${idx}" class="service-label-input">
            <input value="${service.img}" data-idx="${idx}" class="service-img">
            <button data-idx="${idx}" class="delete-service">Delete</button>
        `;
        container.appendChild(div);
    });
    // Add new
    const addDiv = document.createElement('div');
    addDiv.innerHTML = `
        <input placeholder="New label" id="newServiceLabel">
        <input placeholder="New img path" id="newServiceImg">
        <button id="addServiceBtn">Add</button>
    `;
    container.appendChild(addDiv);
}
renderAdminServices();

document.getElementById('adminServices').addEventListener('input', function(e) {
    if (e.target.classList.contains('service-label-input')) {
        services[e.target.dataset.idx].label = e.target.value;
        setData('services', services);
    }
    if (e.target.classList.contains('service-img')) {
        services[e.target.dataset.idx].img = e.target.value;
        setData('services', services);
    }
});
document.getElementById('adminServices').addEventListener('click', function(e) {
    if (e.target.classList.contains('delete-service')) {
        services.splice(e.target.dataset.idx, 1);
        setData('services', services);
        renderAdminServices();
    }
    if (e.target.id === 'addServiceBtn') {
        const label = document.getElementById('newServiceLabel').value;
        const img = document.getElementById('newServiceImg').value;
        if (label && img) {
            services.push({ label, img });
            setData('services', services);
            renderAdminServices();
        }
    }
});

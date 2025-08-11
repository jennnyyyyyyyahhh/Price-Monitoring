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
    meat: [ // Corresponds to "Farmstead Livestock & Poultry"
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

function updateProgress() {
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

function nextPage() {
    if (validatePage1()) {
        document.getElementById('page1').classList.remove('active');
        document.getElementById('page2').classList.add('active');
        currentPage = 2;
        updateProgress();
        window.scrollTo(0, 0);
    }
}

function previousPage() {
    document.getElementById('page2').classList.remove('active');
    document.getElementById('page1').classList.add('active');
    currentPage = 1;
    updateProgress();
    window.scrollTo(0, 0);
}

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

function addItem(category) {
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

function clearForm() {
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

function submitForm() {
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

// Add event listeners for real-time validation
document.addEventListener("DOMContentLoaded", function() {
    const requiredFields = ["barangay", "businessName", "businessType", "supplySource"];
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        field.addEventListener("change", function() {
            if (this.value.trim()) {
                hideError(fieldId);
            }
        });
    });
    
    // Initialize empty states
    updateEmptyStates();
    updateProgress();
});

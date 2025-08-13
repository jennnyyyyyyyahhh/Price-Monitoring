// Export Modal Functionality
function initializeExportModal() {
    const exportBtn = document.getElementById('exportBtn');
    const exportModal = document.getElementById('exportModal');
    const closeExportModal = document.getElementById('closeExportModal');
    const exportForm = document.getElementById('exportForm');
    const formatOptions = document.querySelectorAll('.format-option');
    const exportProcessing = document.getElementById('exportProcessing');
    const exportSuccess = document.getElementById('exportSuccess');
    const closeExportSuccess = document.getElementById('closeExportSuccess');

    // Show export modal when clicking the export button
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            exportModal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    }

    // Close export modal
    if (closeExportModal) {
        closeExportModal.addEventListener('click', function() {
            exportModal.style.display = 'none';
            document.body.style.overflow = '';
        });
    }

    // Close on click outside the modal
    if (exportModal) {
        exportModal.addEventListener('click', function(e) {
            if (e.target === exportModal) {
                exportModal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }

    // Handle format selection styling
    if (formatOptions) {
        formatOptions.forEach(option => {
            const radioInput = option.querySelector('input[type="radio"]');
            
            // Update active class based on checked state
            radioInput.addEventListener('change', function() {
                formatOptions.forEach(opt => opt.classList.remove('active'));
                if (this.checked) {
                    option.classList.add('active');
                }
            });
            
            // Click on the label should check the radio
            option.addEventListener('click', function() {
                radioInput.checked = true;
                formatOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
            });
        });
    }

    // Handle form submission and PDF generation
    if (exportForm) {
        exportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Hide the form and show processing animation
            exportForm.style.display = 'none';
            exportProcessing.style.display = 'block';
            
            // Get selected time period
            const timeFilter = document.querySelector('input[name="timeFilter"]:checked').value;
            
            // Get selected options
            const options = [];
            document.querySelectorAll('input[name="exportOptions"]:checked').forEach(option => {
                options.push(option.value);
            });
            
            // Get selected format
            const format = document.querySelector('input[name="format"]:checked').value;
            
            // Simulate PDF generation (would be replaced with actual PDF generation logic)
            setTimeout(function() {
                generatePDF(timeFilter, options, format);
                
                // Hide processing and show success
                exportProcessing.style.display = 'none';
                exportSuccess.style.display = 'block';
            }, 2000);
        });
    }

    // Close success message and reset modal
    if (closeExportSuccess) {
        closeExportSuccess.addEventListener('click', function() {
            exportModal.style.display = 'none';
            document.body.style.overflow = '';
            
            // Reset the modal for next use (after a delay to allow animation to complete)
            setTimeout(function() {
                exportSuccess.style.display = 'none';
                exportForm.style.display = 'block';
            }, 300);
        });
    }
}

// Function to generate the PDF or other format
function generatePDF(timeFilter, options, format) {
    console.log('Generating report in format:', format);
    console.log('Time filter:', timeFilter);
    console.log('Selected options:', options);

    // This is where you would implement actual PDF generation logic
    // For now, we'll simulate a file download

    // Create a filename based on the report parameters
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    
    let fileExtension;
    let mimeType;

    switch (format) {
        case 'excel':
            fileExtension = 'xlsx';
            mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            break;
        case 'csv':
            fileExtension = 'csv';
            mimeType = 'text/csv';
            break;
        default:
            fileExtension = 'pdf';
            mimeType = 'application/pdf';
    }

    const filename = `price-report-${timeFilter}-${formattedDate}.${fileExtension}`;
    
    // In a real implementation, you would:
    // 1. Use a library like jsPDF to generate PDF
    // 2. For Excel, use libraries like SheetJS/xlsx
    // 3. For CSV, create the content manually
    
    // For now, we'll simulate the download process with a dummy Blob
    setTimeout(function() {
        // This creates a small placeholder file
        const blob = new Blob(['Price Report Data'], { type: mimeType });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        
        // Clean up
        setTimeout(function() {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);
    }, 500);
}

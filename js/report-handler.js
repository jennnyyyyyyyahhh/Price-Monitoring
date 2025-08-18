// Report functionality
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const viewReportBtns = document.querySelectorAll('.view-btn');
    const viewReportModal = document.getElementById('viewReportModal');
    const closeViewReportModal = document.getElementById('closeViewReportModal');
    const resolveReportBtn = document.getElementById('resolveReportBtn');
    const investigateReportBtn = document.getElementById('investigateReportBtn');
    const assignReportBtn = document.getElementById('assignReportBtn');
    const dismissReportBtn = document.getElementById('dismissReportBtn');
    const changeStatusBtn = document.getElementById('changeStatusBtn');
    const reportStatusBanner = document.querySelector('.report-status-banner');
    const reportFilterSelect = document.getElementById('reportType');
    
    // Show view report modal when clicking on view button
    if (viewReportBtns) {
        viewReportBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const reportId = this.getAttribute('data-id');
                console.log('Viewing report:', reportId);
                if (viewReportModal) {
                    viewReportModal.style.display = 'flex';
                }
            });
        });
    }
    
    // Close report modal
    if (closeViewReportModal && viewReportModal) {
        closeViewReportModal.addEventListener('click', function() {
            viewReportModal.style.display = 'none';
        });
        
        // Close on click outside the modal content
        viewReportModal.addEventListener('click', function(e) {
            if (e.target === viewReportModal) {
                viewReportModal.style.display = 'none';
            }
        });
    }
    
    // Change report status
    if (changeStatusBtn && reportStatusBanner) {
        changeStatusBtn.addEventListener('click', function() {
            // Simple status rotation for demo
            const currentStatus = reportStatusBanner.classList[1];
            
            switch (currentStatus) {
                case 'pending':
                    updateReportStatus('investigating');
                    break;
                case 'investigating':
                    updateReportStatus('resolved');
                    break;
                case 'resolved':
                    updateReportStatus('dismissed');
                    break;
                case 'dismissed':
                    updateReportStatus('pending');
                    break;
                default:
                    updateReportStatus('pending');
            }
        });
    }
    
    // Status action buttons
    if (resolveReportBtn) {
        resolveReportBtn.addEventListener('click', function() {
            updateReportStatus('resolved');
        });
    }
    
    if (investigateReportBtn) {
        investigateReportBtn.addEventListener('click', function() {
            updateReportStatus('investigating');
        });
    }
    
    if (dismissReportBtn) {
        dismissReportBtn.addEventListener('click', function() {
            updateReportStatus('dismissed');
        });
    }
    
    if (assignReportBtn) {
        assignReportBtn.addEventListener('click', function() {
            alert('Staff assignment functionality will be implemented soon.');
        });
    }
    
    // Export and Generate report button functionality removed
    
    // Function to update report status in UI
    function updateReportStatus(status) {
        if (!reportStatusBanner) return;
        
        // Remove all status classes
        reportStatusBanner.classList.remove('pending', 'investigating', 'resolved', 'dismissed');
        
        // Add new status class
        reportStatusBanner.classList.add(status);
        
        // Update status icon and text
        const statusIcon = reportStatusBanner.querySelector('.status-icon i');
        const statusTitle = reportStatusBanner.querySelector('.status-content h3');
        const statusDesc = reportStatusBanner.querySelector('.status-content p');
        
        switch (status) {
            case 'pending':
                statusIcon.className = 'fas fa-exclamation-circle';
                statusTitle.textContent = 'Pending Review';
                statusDesc.textContent = 'This report requires immediate attention';
                break;
            case 'investigating':
                statusIcon.className = 'fas fa-search';
                statusTitle.textContent = 'Under Investigation';
                statusDesc.textContent = 'This report is currently being investigated';
                break;
            case 'resolved':
                statusIcon.className = 'fas fa-check-circle';
                statusTitle.textContent = 'Resolved';
                statusDesc.textContent = 'This report has been successfully resolved';
                break;
            case 'dismissed':
                statusIcon.className = 'fas fa-times-circle';
                statusTitle.textContent = 'Dismissed';
                statusDesc.textContent = 'This report has been dismissed';
                break;
        }
    }
});

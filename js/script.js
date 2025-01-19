// JavaScript for Tab Functionality
function openTab(tabId) {
    // Get all tab content and tab links
    const tabContents = document.querySelectorAll('.tab-content');
    const tabLinks = document.querySelectorAll('.tab-links');

    // Hide all tab content and remove the active class from buttons
    tabContents.forEach(content => {
        content.style.display = 'none';
        content.classList.remove('active');
    });

    tabLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Show the selected tab content and mark the button as active
    const selectedTab = document.getElementById(tabId);
    selectedTab.style.display = 'block';
    selectedTab.classList.add('active');

    const selectedTabButton = document.getElementById(`${tabId}-tab`);
    if (selectedTabButton) {
        selectedTabButton.classList.add('active');
    }
}

// Set default active tab (e.g., Skills)
document.addEventListener('DOMContentLoaded', () => {
    openTab('skills');
});

// Responsive Improvements for Tabs
function adjustTabsForScreenSize() {
    const tabs = document.querySelector('.tabs');
    if (!tabs) return;

    if (window.innerWidth <= 768) {
        tabs.style.flexDirection = 'column';
        tabs.style.alignItems = 'center';
    } else {
        tabs.style.flexDirection = 'row';
        tabs.style.alignItems = 'flex-start';
    }
}

// Listen for screen resizing and adjust tabs accordingly
window.addEventListener('resize', adjustTabsForScreenSize);

// Initial responsiveness check
adjustTabsForScreenSize();

// Header Menu Functionality
function toggleMenu(open) {
    const sidemenu = document.getElementById('sidemenu');
    const barsIcon = document.querySelector('.fas.fa-bars');
    const timesIcon = document.querySelector('.fas.fa-times');

    if (open) {
        sidemenu.style.display = 'flex';
        barsIcon.style.display = 'none';
        timesIcon.style.display = 'block';
    } else {
        sidemenu.style.display = 'none';
        barsIcon.style.display = 'block';
        timesIcon.style.display = 'none';
    }
}

function openmenu() {
    toggleMenu(true);
}

function closemenu() {
    toggleMenu(false);
}

// Manage visibility of menu buttons based on screen size
function toggleMenuButtonsOnResize() {
    const isMobile = window.innerWidth <= 767;
    const barsIcon = document.querySelector('.fas.fa-bars');
    const timesIcon = document.querySelector('.fas.fa-times');

    if (!barsIcon || !timesIcon) return;

    barsIcon.style.display = isMobile ? 'block' : 'none';
    timesIcon.style.display = 'none';
}

// Initial call to set button visibility based on screen size
document.addEventListener('DOMContentLoaded', toggleMenuButtonsOnResize);

// Add an event listener to handle window resizing
window.addEventListener('resize', toggleMenuButtonsOnResize);

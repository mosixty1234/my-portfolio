// JavaScript for Tab Functionality
function openTab(tabId) {
    // Get all tab content and tab links
    const tabContents = document.querySelectorAll('.tab-content');
    const tabLinks = document.querySelectorAll('.tab-links');

    // Hide all tab content and remove active class from buttons
    tabContents.forEach((content) => {
        content.style.display = 'none';
        content.classList.remove('active');
    });

    tabLinks.forEach((link) => {
        link.classList.remove('active');
    });

    // Show the selected tab content and mark the button as active
    document.getElementById(tabId).style.display = 'block';
    document.getElementById(tabId).classList.add('active');
    document.getElementById(`${tabId}-tab`).classList.add('active');
}

// Default active tab (Skills)
document.addEventListener('DOMContentLoaded', () => {
    openTab('skills');
});

// Responsive Improvements for Tabs
function adjustTabsForScreenSize() {
    const tabs = document.querySelector('.tabs');
    if (window.innerWidth <= 768) {
        tabs.style.flexDirection = 'column';
        tabs.style.alignItems = 'center';
    } else {
        tabs.style.flexDirection = 'row';
    }
}

// Listen for screen resizing
window.addEventListener('resize', adjustTabsForScreenSize);

// Initial responsiveness check
adjustTabsForScreenSize();

// header script

function openmenu() {
    if (window.innerWidth <= 767) { // Check if the screen width is for mobile
        document.getElementById('sidemenu').style.display = 'flex';
        document.querySelector('.fas.fa-bars').style.display = 'none';
        document.querySelector('.fas.fa-times').style.display = 'block';
    }
}

function closemenu() {
    if (window.innerWidth <= 767) { // Check if the screen width is for mobile
        document.getElementById('sidemenu').style.display = 'none';
        document.querySelector('.fas.fa-bars').style.display = 'block';
        document.querySelector('.fas.fa-times').style.display = 'none';
    }
}

// Hide menu buttons on desktop by default
function toggleMenuButtonsOnResize() {
    const isMobile = window.innerWidth <= 767;
    const bars = document.querySelector('.fas.fa-bars');
    const times = document.querySelector('.fas.fa-times');

    bars.style.display = isMobile ? 'block' : 'none';
    times.style.display = isMobile ? 'none' : 'none';
}

// Initial call to set button visibility based on screen size
toggleMenuButtonsOnResize();

// Add an event listener to handle window resizing
window.addEventListener('resize', toggleMenuButtonsOnResize);

const scriptURL = 'https://script.google.com/macros/s/AKfycby6NcMwA6I05yEO0XagbkHWqIXSdJDSlOJrSMpvqxctC3XrapfUVcZQ4BJcbkMSSVU/exec'
         const form = document.forms['submit-to-google-sheet']
         const msg = document.getElementById("msg")
          
            form.addEventListener('submit', e => {
              e.preventDefault()
              fetch(scriptURL, { method: 'POST', body: new FormData(form)})
                .then(response => {
                    msg.innerHTML = "Message sent sucessfully"
                    setTimeout(function(){
                        msg.innerHTML =""
                    },5000)
                    form.reset()
                })
                .catch(error => console.error('Error!', error.message))
            })
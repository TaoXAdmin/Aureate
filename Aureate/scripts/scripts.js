// Update the subheadline based on screen orientation
function updateSubheadline() {
    const container = document.getElementById('subheadline-container');
    const rippleImage = document.querySelector('.ripple-image');

    container.innerHTML = '';

    // Check if the viewport is in landscape or portrait
    if (window.innerWidth > window.innerHeight) {
        // Landscape mode
        container.innerHTML = '<p class="subheadline text-shadow">Handcrafted with Precision | Exclusive Limited Editions</p>';
        if (rippleImage) {
            rippleImage.style.width = '40%';
        }
    } else {
        // Portrait mode
        container.innerHTML = '<p class="subheadline text-shadow">Handcrafted with Precision Exclusive Limited Editions</p>';
        if (rippleImage) {
            rippleImage.style.width = '90%';
        }
    }
}

// Appelle la fonction au chargement et lors du redimensionnement
window.addEventListener('load', updateSubheadline);
window.addEventListener('resize', updateSubheadline);


// Initial update on page load
updateSubheadline();

// Update subheadline on window resize
window.addEventListener('resize', updateSubheadline);

// Handle swipe navigation for the product gallery
let touchStartX = 0; // X-coordinate where the touch starts
let touchEndX = 0;   // X-coordinate where the touch ends
const swipeThreshold = 50; // Minimum swipe distance to trigger navigation

const galleryContainer = document.querySelector('.product-gallery');

// Record the starting X position when the touch begins
galleryContainer.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

// Record the ending X position when the touch ends
galleryContainer.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe(); // Handle the swipe event
});

// Handle swipe logic for next/previous product navigation
function handleSwipe() {
    const swipeDistance = touchEndX - touchStartX;

    // Ignore small swipes that don't meet the threshold
    if (Math.abs(swipeDistance) < swipeThreshold) return;

    // Navigate to previous product if swipe is right, otherwise next product
    if (swipeDistance > 0) prevProduct();
    else nextProduct();
}

const products = document.querySelectorAll('.product-item');
const indicatorsContainer = document.querySelector('.gallery-indicators');
let currentIndex = 0; // Index of the currently displayed product

// Create navigation indicators for each product
products.forEach((_, index) => {
    const indicator = document.createElement('div');
    indicator.className = `indicator ${index === 0 ? 'active' : ''}`;

    // Navigate to the selected product when the indicator is clicked
    indicator.addEventListener('click', () => showProduct(index));

    indicatorsContainer.appendChild(indicator);
});

// Show the previous product in the carousel
function prevProduct() {
    showProduct((currentIndex - 1 + products.length) % products.length);
}

// Show the next product in the carousel
function nextProduct() {
    showProduct((currentIndex + 1) % products.length);
}

// Display the product at the specified index
function showProduct(index) {
    // Hide the current product and deactivate its indicator
    products[currentIndex].classList.remove('active');
    indicatorsContainer.children[currentIndex].classList.remove('active');

    // Update the current index to the new product
    currentIndex = index;

    // Show the new product and activate its indicator
    products[currentIndex].classList.add('active');
    indicatorsContainer.children[currentIndex].classList.add('active');
}


setTimeout(() => {
    const loader = document.querySelector('.gold-dust-loader');
    
    // Animation de disparition du loader
    loader.style.animation = 'fadeOut 1s ease-in forwards';
    
    setTimeout(() => {
        loader.style.display = "none";
        
        const headerContent = document.querySelector('.header-content');
        headerContent.style.opacity = "1";
        headerContent.style.transform = "translateY(0)";
        
        // Animation supplémentaire pour le contenu
        headerContent.style.animation = 'fadeIn 1s ease-out';
    }, 1000); // Correspond à la durée de l'animation fadeOut
}, 2500);
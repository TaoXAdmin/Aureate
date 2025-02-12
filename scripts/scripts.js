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

// Initial update on page load and window resize
window.addEventListener('load', updateSubheadline);
window.addEventListener('resize', updateSubheadline);

document.addEventListener('DOMContentLoaded', () => {
    // Product Gallery Functionality
    try {
        // Gallery elements
        const galleryContainer = document.querySelector('.product-gallery');
        const products = document.querySelectorAll('.product-item');
        const indicatorsContainer = document.querySelector('.gallery-indicators');
        let currentIndex = 0;

        // Navigation buttons
        const prevButton = document.querySelector('.gallery-nav.prev');
        const nextButton = document.querySelector('.gallery-nav.next');

        // Swipe handling variables
        let touchStartX = 0;
        let touchEndX = 0;
        const swipeThreshold = 50;

        // Initialize gallery if elements exist
        if (galleryContainer && products.length > 0 && indicatorsContainer) {
            // Create navigation indicators
            products.forEach((_, index) => {
                const indicator = document.createElement('div');
                indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
                indicator.addEventListener('click', () => showProduct(index));
                indicatorsContainer.appendChild(indicator);
            });

            // Add button event listeners
            if (prevButton && nextButton) {
                prevButton.addEventListener('click', prevProduct);
                nextButton.addEventListener('click', nextProduct);
            }

            // Touch event handlers
            galleryContainer.addEventListener('touchstart', e => {
                touchStartX = e.changedTouches[0].screenX;
            });

            galleryContainer.addEventListener('touchend', e => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            });
        }

        function handleSwipe() {
            const swipeDistance = touchEndX - touchStartX;
            if (Math.abs(swipeDistance) < swipeThreshold) return;
            swipeDistance > 0 ? prevProduct() : nextProduct();
        }

        function prevProduct() {
            showProduct((currentIndex - 1 + products.length) % products.length);
        }

        function nextProduct() {
            showProduct((currentIndex + 1) % products.length);
        }

        function showProduct(index) {
            products[currentIndex].classList.remove('active');
            indicatorsContainer.children[currentIndex].classList.remove('active');
            currentIndex = index;
            products[currentIndex].classList.add('active');
            indicatorsContainer.children[currentIndex].classList.add('active');
        }

    } catch (error) {
        console.error('Gallery initialization error:', error);
    }

    // Loader animation
    setTimeout(() => {
        const loader = document.querySelector('.gold-dust-loader');
        if (loader) {
            loader.style.animation = 'fadeOut 1s ease-in forwards';
            setTimeout(() => {
                loader.style.display = "none";
                const headerContent = document.querySelector('.header-content');
                if (headerContent) {
                    headerContent.style.opacity = "1";
                    headerContent.style.transform = "translateY(0)";
                    headerContent.style.animation = 'fadeIn 1s ease-out';
                }
            }, 100);
        }
    }, 2500);

    // Water effect positioning
    function compensateOffset(img) {
        setTimeout(() => {
            const boundingBox = img.getBoundingClientRect();
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const offsetX = boundingBox.left + boundingBox.width / 2 - centerX;
            const offsetY = boundingBox.top + boundingBox.height / 2 - centerY;
            img.style.transform = `translate(calc(-50% - ${offsetX}px), calc(-50% - ${offsetY}px))`;
        }, 100);
    }
	      setTimeout(() => {
          compensateOffset(img);
      }, 1000);

    // Apply water effect to all images
    document.querySelectorAll('.water-effect').forEach(img => {
        img.style.position = "absolute";
        img.style.top = "50%";
        img.style.left = "50%";
        img.style.transform = "translate(-50%, -50%)";
    });
});

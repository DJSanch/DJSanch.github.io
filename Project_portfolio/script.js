document.addEventListener('DOMContentLoaded', function () {
    // Sticky Navbar with Background Transition
    const navbar = document.querySelector('.navbar');
    const heroSection = document.querySelector('.hero');
    const heroHeight = heroSection.offsetHeight;

    // Throttle function to optimize scroll event
    function throttle(func, limit) {
        let inThrottle;
        return function () {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => (inThrottle = false), limit);
            }
        };
    }

    // Scroll event handler
    function handleScroll() {
        if (window.scrollY > heroHeight) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Use requestAnimationFrame for smooth scrolling
    function smoothScroll() {
        requestAnimationFrame(handleScroll);
    }

    // Add throttled scroll event listener
    window.addEventListener('scroll', throttle(smoothScroll, 20));

    // Image Zoom Functionality
    const certificationCards = document.querySelectorAll('.certification-card img');
    const zoomedImageContainer = document.getElementById('zoomed-image-container');
    const zoomedImage = document.getElementById('zoomed-image');
    const closeZoom = document.getElementById('close-zoom');

    // Add click event to certification images
    certificationCards.forEach((card) => {
        card.addEventListener('click', () => {
            const imgSrc = card.getAttribute('data-src'); // Get the image source
            zoomedImage.setAttribute('src', imgSrc); // Set the zoomed image source
            zoomedImageContainer.classList.add('active');
            zoomedImageContainer.style.display = 'flex'; // Show the zoomed image container
        });
    });

    // Close zoomed image
    closeZoom.addEventListener('click', () => {
        zoomedImageContainer.classList.remove('active');
        setTimeout(() => {
            zoomedImageContainer.style.display = 'none';
        }, 300); // Match the transition duration
    });

    // Close zoomed image when clicking outside the image
    zoomedImageContainer.addEventListener('click', (e) => {
        if (e.target === zoomedImageContainer) {
            zoomedImageContainer.classList.remove('active');
            setTimeout(() => {
                zoomedImageContainer.style.display = 'none';
            }, 300); // Match the transition duration
        }
    });

    // Close zoomed image with Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && zoomedImageContainer.style.display === 'flex') {
            zoomedImageContainer.classList.remove('active');
            setTimeout(() => {
                zoomedImageContainer.style.display = 'none';
            }, 300); // Match the transition duration
        }
    });
});
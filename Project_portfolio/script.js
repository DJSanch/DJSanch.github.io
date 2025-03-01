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
    const paragraph = document.querySelector(".about-text p");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    paragraph.classList.add("visible");
                    observer.unobserve(paragraph); // Stop observing after animation
                }
            });
        },
        {
            threshold: 0.5, // Trigger when 50% of the element is visible
        }
    );

    observer.observe(paragraph);

    const aboutButton = document.querySelector('.hero .btn');

    aboutButton.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default anchor behavior

        const targetId = this.getAttribute('href'); // Get the target section ID
        const targetSection = document.querySelector(targetId); // Find the target section

        if (targetSection) {
            // Smoothly scroll to the target section
            targetSection.scrollIntoView({
                behavior: 'smooth', // Smooth scrolling
                block: 'start', // Align to the top of the section
            });
        }
    });

    // Some random colors
    const colors = ["#3CC157", "#2AA7FF", "#1B1B1B", "#FCBC0F", "#F85F36"];

    const numBalls = 50;
    const balls = [];

    for (let i = 0; i < numBalls; i++) {
    let ball = document.createElement("div");
    ball.classList.add("ball");
    ball.style.background = colors[Math.floor(Math.random() * colors.length)];
    ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
    ball.style.top = `${Math.floor(Math.random() * 100)}vh`;
    ball.style.transform = `scale(${Math.random()})`;
    ball.style.width = `${Math.random()}em`;
    ball.style.height = ball.style.width;
    
    balls.push(ball);
    document.body.append(ball);
    }

    // Keyframes
    balls.forEach((el, i, ra) => {
    let to = {
        x: Math.random() * (i % 2 === 0 ? -11 : 11),
        y: Math.random() * 12
    };

    let anim = el.animate(
        [
        { transform: "translate(0, 0)" },
        { transform: `translate(${to.x}rem, ${to.y}rem)` }
        ],
        {
        duration: (Math.random() + 1) * 2000, // random duration
        direction: "alternate",
        fill: "both",
        iterations: Infinity,
        easing: "ease-in-out"
        }
    );
});
});
// Loading screen
window.addEventListener('load', function() {
    setTimeout(function() {
        document.querySelector('.loader').classList.add('hidden');
    }, 1000);
});

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');

// Check for saved user preference, if any, on load of the website
if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
    themeToggle.checked = true;
    themeToggleMobile.checked = true;
}

themeToggle.addEventListener('change', function() {
    if (this.checked) {
        document.body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
    } else {
        document.body.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark');
    }
});

themeToggleMobile.addEventListener('change', function() {
    if (this.checked) {
        document.body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
    } else {
        document.body.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark');
    }
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const offCanvas = document.querySelector('.off-canvas');
const overlay = document.querySelector('.overlay');

hamburger.addEventListener('click', function() {
    offCanvas.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = 'hidden';
});

overlay.addEventListener('click', function() {
    offCanvas.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
});

// Close mobile menu when clicking on a link
const offCanvasLinks = document.querySelectorAll('.off-canvas a');
offCanvasLinks.forEach(link => {
    link.addEventListener('click', function() {
        offCanvas.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Back to top button
const backToTopButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('active');
    } else {
        backToTopButton.classList.remove('active');
    }
});

backToTopButton.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({top: 0, behavior: 'smooth'});
});

// Scroll reveal animation
function animateOnScroll() {
    const elements = document.querySelectorAll('.timeline-item, .exp-item, .skill-category');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Initialize AOS with enhanced configuration
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: false,
    mirror: true,
    offset: 50,
    delay: 100,
    anchorPlacement: 'top-bottom'
});

// Add scroll-triggered animations
document.addEventListener('DOMContentLoaded', function() {
    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const isVisible = (elementTop < window.innerHeight) && (elementBottom >= 0);
            
            if (isVisible) {
                element.classList.add('animate');
            }
        });
    };

    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check

    // Add hover animations to skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.05)';
            card.style.boxShadow = '0 15px 30px rgba(249, 115, 22, 0.3)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
        });
    });

    // Add typing animation to headings
    const headings = document.querySelectorAll('.section-title');
    headings.forEach(heading => {
        const text = heading.textContent;
        heading.textContent = '';
        let i = 0;
        
        const typeWriter = () => {
            if (i < text.length) {
                heading.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing animation when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(heading);
    });

    // Add parallax effect to background elements
    const parallaxElements = document.querySelectorAll('.parallax');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Animate skill bars on scroll
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
}

const skillsSection = document.querySelector('#skills');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            observer.unobserve(entry.target);
        }
    });
}, {threshold: 0.1});

observer.observe(skillsSection);

// Particles.js configuration
particlesJS('particles-js', {
    "particles": {
        "number": {
            "value": 80,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#f97316"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 5
            }
        },
        "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 3,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#f97316",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 6,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "repulse"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 400,
                "line_linked": {
                    "opacity": 1
                }
            },
            "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
            },
            "repulse": {
                "distance": 200,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
});

// Horizontal scroll logic for Projects and Achievements
function setupInfiniteCarousel(gridId, leftBtnId, rightBtnId, visibleCards = 3, autoScroll = true) {
    const grid = document.getElementById(gridId);
    const leftBtn = document.getElementById(leftBtnId);
    const rightBtn = document.getElementById(rightBtnId);
    let cards = Array.from(grid.children);
    let cardIndex = 0;
    let interval;

    // Clone first and last few cards for infinite effect
    function cloneCards() {
        // Remove previous clones
        Array.from(grid.querySelectorAll('.clone')).forEach(el => el.remove());
        // Clone last N cards to the front
        for (let i = cards.length - visibleCards; i < cards.length; i++) {
            let clone = cards[i].cloneNode(true);
            clone.classList.add('clone');
            grid.insertBefore(clone, grid.firstChild);
        }
        // Clone first N cards to the end
        for (let i = 0; i < visibleCards; i++) {
            let clone = cards[i].cloneNode(true);
            clone.classList.add('clone');
            grid.appendChild(clone);
        }
    }

    function getCardWidth() {
        const card = grid.children[visibleCards]; // first real card
        return card.offsetWidth + parseInt(getComputedStyle(grid).gap) || 0;
    }

    function setInitialPosition() {
        grid.style.transition = 'none';
        grid.style.transform = `translateX(-${getCardWidth() * visibleCards}px)`;
        setTimeout(() => grid.style.transition = '', 20);
    }

    function scrollToCard(index) {
        grid.style.transition = '';
        grid.style.transform = `translateX(-${getCardWidth() * (index + visibleCards)}px)`;
    }

    function nextCard() {
        cardIndex++;
        scrollToCard(cardIndex);
        if (cardIndex === cards.length) {
            setTimeout(() => {
                grid.style.transition = 'none';
                cardIndex = 0;
                grid.style.transform = `translateX(-${getCardWidth() * visibleCards}px)`;
            }, 400);
        }
    }

    function prevCard() {
        cardIndex--;
        scrollToCard(cardIndex);
        if (cardIndex < 0) {
            setTimeout(() => {
                grid.style.transition = 'none';
                cardIndex = cards.length - 1;
                grid.style.transform = `translateX(-${getCardWidth() * (cardIndex + visibleCards)}px)`;
            }, 400);
        }
    }

    function resetInterval() {
        if (interval) clearInterval(interval);
        if (autoScroll) interval = setInterval(nextCard, 5000);
    }

    rightBtn.addEventListener('click', () => { nextCard(); resetInterval(); });
    leftBtn.addEventListener('click', () => { prevCard(); resetInterval(); });

    window.addEventListener('resize', () => { setInitialPosition(); });

    // Setup
    cloneCards();
    setInitialPosition();
    resetInterval();

    // Pause on hover
    grid.addEventListener('mouseenter', () => clearInterval(interval));
    grid.addEventListener('mouseleave', resetInterval);
}

document.addEventListener('DOMContentLoaded', function() {
    setupInfiniteCarousel('projects-grid', 'projects-left', 'projects-right', 3, true);
    setupInfiniteCarousel('achievements-grid', 'achievements-left', 'achievements-right', 3, true);
});

// Contact form submission handling with Web3Forms
const contactForm = document.getElementById('contactForm');

// Handle form submission
contactForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission
    const formData = new FormData(contactForm); // Collect form data

    // Send form data to Web3Forms API
    fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        // Check if response is OK (status 200-299)
        if (!response.ok) {
            throw new Error(`Nice To See You Here !`);
        }
        return response.json(); // Parse JSON response
    })
    .then(data => {
        console.log('Response Data:', data); // Log full response for debugging
        // Check if submission was successful (Web3Forms returns success: true)
        if (data.success) {
            alert('Message sent successfully!'); // Show success message
            contactForm.reset(); // Clear form fields
            location.reload(); // Refresh the page after clicking OK
        } else {
            alert('Form submission failed: ' + (data.message || 'Unknown error')); // Show error with details
            contactForm.reset();
            location.reload(); // Refresh the page after clicking OK
        }
    })
    .catch(error => {
        console.error('Fetch Error:', error); // Log detailed error to console
        alert('Thank You  Nice To See You Here!'); // Show generic error message
        contactForm.reset();
        location.reload(); // Refresh the page after clicking OK
    });
});
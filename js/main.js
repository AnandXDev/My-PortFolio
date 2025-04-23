/**
 * Main JavaScript file for Portfolio Website
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Page Loader
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = '<div class="loader"></div>';
    document.body.appendChild(loader);
    
    // Remove loader after page loads
    window.addEventListener('load', function() {
        setTimeout(function() {
            loader.classList.add('loaded');
            // Start skill animations after page load
            animateSkills();
            // Initialize scroll animations
            initScrollAnimations();
            // Initialize parallax effects
            initParallax();
            // Initialize typing effect
            initTypeEffect();
            // Initialize particles effect
            initParticles();
        }, 500);
    });
    
    // Initialize all features
    initNavbar();
    initDarkMode();
    initPortfolioFilter();
    initCustomCursor();
    addScrollRevealAnimations();
    initContactForm();
    initModalEffects();
    initScrollIndicator();
    initMusicPlayer();
    
    // Set skill levels based on their percentages
    document.querySelectorAll('.skill').forEach(function(skill) {
        const percent = skill.querySelector('.skill-name span').textContent;
        const skillLevel = skill.querySelector('.skill-level');
        skillLevel.style.setProperty('--skill-percent', percent);
    });
});

/**
 * Navbar functionality
 * - Change navbar background on scroll
 * - Activate menu items based on scroll position
 */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    // Change navbar background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.padding = '0.5rem 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '1rem 0';
            navbar.style.boxShadow = 'none';
        }

        // Activate menu items based on scroll position
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a.nav-link, .hero a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Close the navbar collapse on mobile
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }
            }
        });
    });
}

/**
 * Dark mode toggle
 */
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const icon = darkModeToggle.querySelector('i');
    
    // Check for saved theme preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    // Apply saved preference
    if (isDarkMode) {
        body.classList.add('auto-dark-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
    
    // Toggle dark mode
    darkModeToggle.addEventListener('click', function() {
        body.classList.toggle('auto-dark-mode');
        icon.classList.add('mode-toggle-animation');
        
        setTimeout(function() {
            if (body.classList.contains('auto-dark-mode')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                localStorage.setItem('darkMode', 'true');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                localStorage.setItem('darkMode', 'false');
            }
            icon.classList.remove('mode-toggle-animation');
        }, 150);
    });
}

/**
 * Portfolio filters functionality
 */
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.btn-filter');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Show/hide portfolio items based on filter
            portfolioItems.forEach(item => {
                item.style.transform = 'scale(0.8)';
                item.style.opacity = '0';
                
                setTimeout(function() {
                    if (filter === 'all' || item.classList.contains(filter)) {
                        item.style.display = 'block';
                        setTimeout(function() {
                            item.style.transform = 'scale(1)';
                            item.style.opacity = '1';
                        }, 50);
                    } else {
                        item.style.display = 'none';
                    }
                }, 300);
            });
        });
    });
}

/**
 * Custom cursor functionality
 */
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    
    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });
    
    // Cursor effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .nav-link, .portfolio-card, .service-card');
    
    interactiveElements.forEach(function(element) {
        element.addEventListener('mouseenter', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.borderColor = 'transparent';
            cursor.style.backgroundColor = 'rgba(249, 115, 22, 0.2)';
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.borderColor = 'var(--accent-color)';
            cursor.style.backgroundColor = 'transparent';
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
    
    // Hide cursor when mouse leaves window
    document.addEventListener('mouseleave', function() {
        cursor.style.opacity = '0';
        cursorDot.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', function() {
        cursor.style.opacity = '1';
        cursorDot.style.opacity = '1';
    });
}

/**
 * Scroll animation for elements
 */
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    
    function checkReveal() {
        revealElements.forEach(function(element) {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 50) {
                element.classList.add('active');
            }
        });
    }
    
    // Initial check
    checkReveal();
    
    // Check on scroll
    window.addEventListener('scroll', checkReveal);
}

/**
 * Typing effect for hero section
 */
function initTypeEffect() {
    const element = document.querySelector('.typing');
    if (!element) return;
    
    const originalText = element.textContent;
    element.textContent = '';
    element.style.opacity = '1';
    
    let charIndex = 0;
    
    function typeCharacter() {
        if (charIndex < originalText.length) {
            element.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeCharacter, 75); // Speed of typing
        } else {
            // Typing complete, add blinking cursor
            element.classList.add('typing-complete');
            
            // After a delay, start the next animation
            setTimeout(() => {
                // Keep the cursor blinking
            }, 2000);
        }
    }
    
    // Add a delay before starting to type
    setTimeout(typeCharacter, 1000);
}

/**
 * Contact form functionality
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                formMessage.textContent = 'Please fill in all required fields';
                formMessage.className = 'alert alert-danger mt-3';
                return;
            }
            
            // Email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                formMessage.textContent = 'Please enter a valid email address';
                formMessage.className = 'alert alert-danger mt-3';
                return;
            }
            
            // Form submission simulation (replace with actual form submission)
            formMessage.textContent = 'Sending message...';
            formMessage.className = 'alert alert-info mt-3';
            
            setTimeout(function() {
                formMessage.textContent = 'Your message has been sent successfully!';
                formMessage.className = 'alert alert-success mt-3';
                contactForm.reset();
                
                // Hide success message after a delay
                setTimeout(function() {
                    formMessage.style.opacity = '0';
                    setTimeout(function() {
                        formMessage.textContent = '';
                        formMessage.className = '';
                        formMessage.style.opacity = '1';
                    }, 500);
                }, 3000);
            }, 1500);
        });
    }
}

/**
 * Enhanced modal effects
 */
function initModalEffects() {
    const portfolioModals = document.querySelectorAll('.portfolio-modal');
    
    portfolioModals.forEach(function(modal) {
        modal.addEventListener('show.bs.modal', function() {
            document.querySelector('.custom-cursor').style.opacity = '0';
            document.querySelector('.cursor-dot').style.opacity = '0';
        });
        
        modal.addEventListener('hidden.bs.modal', function() {
            document.querySelector('.custom-cursor').style.opacity = '1';
            document.querySelector('.cursor-dot').style.opacity = '1';
        });
    });
}

/**
 * Scroll reveal animations
 */
function addScrollRevealAnimations() {
    // Add reveal classes to elements
    document.querySelectorAll('#about .col-lg-6:first-child').forEach(el => el.classList.add('reveal-left'));
    document.querySelectorAll('#about .col-lg-6:last-child').forEach(el => el.classList.add('reveal-right'));
    
    document.querySelectorAll('.service-card').forEach((el, i) => {
        el.classList.add('reveal');
        el.classList.add('delay-' + (i + 1));
    });
    
    document.querySelectorAll('.portfolio-card').forEach(el => el.classList.add('reveal-scale'));
    
    document.querySelectorAll('.contact-info, .contact-form').forEach(el => el.classList.add('reveal'));
    
    // Add staggered animations to skill bars
    document.querySelectorAll('.skill').forEach((el, i) => {
        el.classList.add('reveal-left');
        el.classList.add('delay-' + (i + 1));
    });
}

/**
 * Animate skill bars
 */
function animateSkills() {
    document.querySelectorAll('.skill-level').forEach(function(skill) {
        skill.classList.add('animate');
    });
}

/**
 * Function to enable parallax effect on elements
 */
function initParallax() {
    document.addEventListener('mousemove', function(e) {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        parallaxElements.forEach(function(el) {
            const speed = el.getAttribute('data-speed') || 0.1;
            const x = (window.innerWidth - mouseX * speed) / 100;
            const y = (window.innerHeight - mouseY * speed) / 100;
            
            el.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
    });
}

/**
 * Initialize scroll indicator functionality
 */
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.hero-scroll-indicator a');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    }
}

/**
 * Initialize particles.js
 */
function initParticles() {
    if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
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
                    "value": "#ffffff"
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
                    "value": 0.3,
                    "random": true,
                    "anim": {
                        "enable": true,
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
                    "color": "#ffffff",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": true,
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
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.5
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
    }
}

// Initialize music player functionality
function initMusicPlayer() {
    const musicToggle = document.getElementById('musicToggle');
    const backgroundMusic = document.getElementById('backgroundMusic');
    const volumeSlider = document.getElementById('volumeSlider');
    const trackItems = document.querySelectorAll('.track-item');
    
    // Check if music preference was stored
    const musicEnabled = localStorage.getItem('musicEnabled') === 'true';
    
    // Set initial volume
    const savedVolume = localStorage.getItem('musicVolume');
    const initialVolume = savedVolume ? parseFloat(savedVolume) : 0.5;
    backgroundMusic.volume = initialVolume;
    
    if (volumeSlider) {
        volumeSlider.value = initialVolume;
    }
    
    // Set initial track
    const savedTrackIndex = localStorage.getItem('trackIndex') || 4; // Default to Chill Beats track
    setActiveTrack(parseInt(savedTrackIndex));
    
    // Function to play music
    function playMusic() {
        backgroundMusic.play().then(() => {
            musicToggle.classList.add('playing');
            localStorage.setItem('musicEnabled', 'true');
        }).catch(error => {
            console.log('Autoplay prevented by browser:', error);
            // Most browsers require user interaction to play audio
            musicToggle.classList.remove('playing');
            localStorage.setItem('musicEnabled', 'false');
        });
    }
    
    // Function to pause music
    function pauseMusic() {
        backgroundMusic.pause();
        musicToggle.classList.remove('playing');
        localStorage.setItem('musicEnabled', 'false');
    }
    
    // Function to handle track selection
    function setActiveTrack(index) {
        // Update UI
        trackItems.forEach((item, i) => {
            if (i === index) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        
        // Set the audio source
        const wasPlaying = !backgroundMusic.paused;
        const currentTime = backgroundMusic.currentTime;
        backgroundMusic.src = backgroundMusic.querySelectorAll('source')[index].src;
        
        // Save selected track
        localStorage.setItem('trackIndex', index);
        
        // Resume playback if needed
        if (wasPlaying) {
            backgroundMusic.currentTime = currentTime;
            playMusic();
        }
    }
    
    // Add click event to music toggle button
    if (musicToggle) {
        musicToggle.addEventListener('click', function(e) {
            // Prevent from triggering if we clicked on volume control
            if (e.target === volumeSlider || e.target.closest('.track-select-btn')) {
                return;
            }
            
            if (backgroundMusic.paused) {
                playMusic();
            } else {
                pauseMusic();
            }
        });
    }
    
    // Add change event to volume slider
    if (volumeSlider) {
        volumeSlider.addEventListener('input', function() {
            backgroundMusic.volume = this.value;
            localStorage.setItem('musicVolume', this.value);
            
            // If volume is set to 0, pause the music
            if (parseFloat(this.value) === 0) {
                pauseMusic();
            } else if (backgroundMusic.paused && localStorage.getItem('musicEnabled') === 'true') {
                // If the volume is being increased from 0 and music was enabled before
                playMusic();
            }
        });
        
        // Prevent the click on volume slider from triggering the music toggle
        volumeSlider.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // Track selection listeners
    trackItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            setActiveTrack(index);
            
            // Close the modal
            const modal = bootstrap.Modal.getInstance(document.getElementById('musicModal'));
            if (modal) {
                modal.hide();
            }
            
            // Start playing if music was not playing
            if (backgroundMusic.paused) {
                playMusic();
            }
        });
    });
    
    // Stop propagation for track selection button
    const trackSelectBtn = document.querySelector('.track-select-btn');
    if (trackSelectBtn) {
        trackSelectBtn.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // Set up initial state based on saved preference
    if (musicEnabled) {
        // We'll attempt to play music only on user interaction
        // This is a way to handle it without autoplay restrictions
        document.addEventListener('click', function initialPlayAttempt() {
            playMusic();
            document.removeEventListener('click', initialPlayAttempt);
        }, { once: true });
    }
    
    // Prevent music from stopping when navigating between sections
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (!backgroundMusic.paused) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Check for saved dark mode preference
const savedDarkMode = localStorage.getItem('darkMode');
if (savedDarkMode === 'enabled') {
    document.body.classList.add('auto-dark-mode');
} 
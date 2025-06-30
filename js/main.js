
// Main JavaScript functionality for Alex Morgan's Portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeThemeToggle();
    initializeScrollAnimations();
    initializeSkillBars();
    initializeTestimonials();
    initializeContactForm();
    initializeSmoothScrolling();
    
    console.log('Portfolio initialized successfully');
});

// Navigation functionality
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Navbar scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                updateActiveNavLink(id);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    function updateActiveNavLink(activeId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === activeId) {
                link.classList.add('active');
            }
        });
    }
}

// Theme toggle functionality
function initializeThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', savedTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Add transition effect
        body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            body.style.transition = '';
        }, 300);
        
        console.log(`Theme switched to: ${newTheme}`);
    });
}

// Scroll animations
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .hero-content, .about-content, .skills-grid, .timeline-item, .testimonial-item, .contact-content');
    
    const animationObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Special handling for timeline items
                if (entry.target.classList.contains('timeline-item')) {
                    setTimeout(() => {
                        entry.target.style.animation = 'slideInLeft 0.6s ease-out forwards';
                    }, 200);
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        element.classList.add('animate-on-scroll');
        animationObserver.observe(element);
    });
}

// Skill bars animation
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                
                setTimeout(() => {
                    skillBar.style.width = width;
                }, 200);
                
                skillObserver.unobserve(skillBar);
            }
        });
    }, {
        threshold: 0.5
    });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Testimonials carousel
function initializeTestimonials() {
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const navDots = document.querySelectorAll('.nav-dot');
    let currentTestimonial = 0;
    let testimonialInterval;
    
    function showTestimonial(index) {
        // Hide all testimonials
        testimonialItems.forEach(item => {
            item.classList.remove('active');
        });
        
        // Remove active class from all dots
        navDots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current testimonial
        if (testimonialItems[index]) {
            testimonialItems[index].classList.add('active');
        }
        
        // Activate current dot
        if (navDots[index]) {
            navDots[index].classList.add('active');
        }
        
        currentTestimonial = index;
    }
    
    function nextTestimonial() {
        const next = (currentTestimonial + 1) % testimonialItems.length;
        showTestimonial(next);
    }
    
    function startTestimonialCarousel() {
        testimonialInterval = setInterval(nextTestimonial, 5000);
    }
    
    function stopTestimonialCarousel() {
        if (testimonialInterval) {
            clearInterval(testimonialInterval);
        }
    }
    
    // Navigation dots click handlers
    navDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showTestimonial(index);
            stopTestimonialCarousel();
            startTestimonialCarousel();
        });
    });
    
    // Pause carousel on hover
    const testimonialCarousel = document.querySelector('.testimonials-carousel');
    if (testimonialCarousel) {
        testimonialCarousel.addEventListener('mouseenter', stopTestimonialCarousel);
        testimonialCarousel.addEventListener('mouseleave', startTestimonialCarousel);
    }
    
    // Initialize carousel
    showTestimonial(0);
    startTestimonialCarousel();
    
    console.log('Testimonials carousel initialized');
}

// Contact form handling
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Validate form
            if (validateForm(formObject)) {
                // Show loading state
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;
                
                // Simulate form submission (replace with actual form handling)
                setTimeout(() => {
                    showFormMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
                    contactForm.reset();
                    
                    // Reset button
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }, 2000);
                
                console.log('Form submitted:', formObject);
            }
        });
    }
    
    function validateForm(data) {
        const errors = [];
        
        if (!data.name || data.name.trim().length < 2) {
            errors.push('Please enter a valid name');
        }
        
        if (!data.email || !isValidEmail(data.email)) {
            errors.push('Please enter a valid email address');
        }
        
        if (!data.subject || data.subject.trim().length < 5) {
            errors.push('Please enter a subject');
        }
        
        if (!data.message || data.message.trim().length < 10) {
            errors.push('Please enter a message (at least 10 characters)');
        }
        
        if (errors.length > 0) {
            showFormMessage(errors.join('<br>'), 'error');
            return false;
        }
        
        return true;
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showFormMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create message element
        const messageElement = document.createElement('div');
        messageElement.className = `form-message ${type}`;
        messageElement.innerHTML = message;
        
        // Style the message
        messageElement.style.cssText = `
            padding: 15px 20px;
            margin: 20px 0;
            border-radius: 8px;
            font-weight: 500;
            ${type === 'success' 
                ? 'background: #d4edda; color: #155724; border: 1px solid #c3e6cb;' 
                : 'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
            }
        `;
        
        // Insert message
        contactForm.insertBefore(messageElement, contactForm.firstChild);
        
        // Auto-remove message after 5 seconds
        setTimeout(() => {
            if (messageElement && messageElement.parentNode) {
                messageElement.remove();
            }
        }, 5000);
    }
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for navbar height
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Utility functions
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Performance optimizations
const optimizedScrollHandler = throttle(function() {
    // Any scroll-based functionality can go here
}, 100);

const optimizedResizeHandler = debounce(function() {
    // Handle window resize events
    console.log('Window resized');
}, 250);

window.addEventListener('scroll', optimizedScrollHandler);
window.addEventListener('resize', optimizedResizeHandler);

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        console.log('Page is now visible');
    } else {
        console.log('Page is now hidden');
    }
});

// Log performance metrics
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Page loaded in ${Math.round(loadTime)}ms`);
    
    // Report any performance issues
    if (loadTime > 3000) {
        console.warn('Page load time is above optimal threshold');
    }
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error occurred:', e.error);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    e.preventDefault();
});

console.log('Alex Morgan Portfolio - JavaScript loaded successfully');

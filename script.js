// Mobile Menu Toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !mobileMenu.contains(e.target)) {
        navLinks.classList.remove('active');
        mobileMenu.classList.remove('active');
    }
});

// Gallery Images with Lightbox
const galleryImages = [{
        src: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&q=80',
        alt: 'Custom T-Shirt Design 1',
        title: 'Urban Street Collection'
    },
    {
        src: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80',
        alt: 'Custom T-Shirt Design 2',
        title: 'Street Style Essentials'
    },
    {
        src: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80',
        alt: 'Custom T-Shirt Design 2',
        title: 'Street Style Essentials'
    },
    {
        src: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80',
        alt: 'Custom T-Shirt Design 2',
        title: 'Street Style Essentials'
    },
    {
        src: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80',
        alt: 'Custom T-Shirt Design 4',
        title: 'Custom Design Series'
    },
    {
        src: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80',
        alt: 'Custom T-Shirt Design 4',
        title: 'Custom Design Series'
    },
    {
        src: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80',
        alt: 'Custom T-Shirt Design 4',
        title: 'Custom Design Series'
    },
    {
        src: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80',
        alt: 'Custom T-Shirt Design 4',
        title: 'Custom Design Series'
    },
    {
        src: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
        alt: 'Custom T-Shirt Design 5',
        title: 'Limited Edition Prints'
    },
    {
        src: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&q=80',
        alt: 'Custom T-Shirt Design 6',
        title: 'Artist Collaboration Series'
    }
];

// Create Lightbox
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = `
    <div class="lightbox-content">
        <span class="close-lightbox">&times;</span>
        <img src="" alt="" class="lightbox-img">
        <div class="lightbox-caption"></div>
    </div>
`;
document.body.appendChild(lightbox);

// Function to populate gallery
function populateGallery() {
    const galleryGrid = document.querySelector('.gallery-grid');
    if (!galleryGrid) return;

    galleryGrid.innerHTML = ''; // Clear existing content

    galleryImages.forEach((image, index) => {
        const imgContainer = document.createElement('div');
        imgContainer.className = 'gallery-item-container';

        const img = new Image();
        img.src = image.src;
        img.alt = image.alt;
        img.loading = 'lazy'; // Enable lazy loading
        img.classList.add('gallery-item');

        // Add loading animation
        imgContainer.innerHTML = '<div class="loading-spinner"></div>';

        img.onload = () => {
            imgContainer.innerHTML = ''; // Remove loading spinner
            imgContainer.appendChild(img);
        };

        // Add click event for lightbox
        imgContainer.addEventListener('click', () => {
            const lightboxImg = lightbox.querySelector('.lightbox-img');
            lightboxImg.src = image.src;
            lightboxImg.alt = image.alt;
            lightbox.querySelector('.lightbox-caption').textContent = image.title;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        galleryGrid.appendChild(imgContainer);
    });
}

// Close lightbox
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('close-lightbox')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    populateGallery();
});

// Smooth Scrolling with offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form Submission with Validation
const contactForm = document.getElementById('contact-form');
const formInputs = contactForm.querySelectorAll('input, textarea');

formInputs.forEach(input => {
    input.addEventListener('input', function() {
        if (this.value.trim() !== '') {
            this.classList.add('filled');
        } else {
            this.classList.remove('filled');
        }
    });
});

// Initialize EmailJS
(function() {
    // Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
    emailjs.init("vUyB16AmxVvnqAdn3");
})();

// Form submission handler
async function sendEmail(event) {
    event.preventDefault();

    const submitButton = document.querySelector('#contact-form button[type="submit"]');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    const form = document.getElementById('contact-form');

    // Disable submit button and show loading state
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    try {
        // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual EmailJS service and template IDs
        const result = await emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form);

        // Show success message
        successMessage.style.display = 'block';
        errorMessage.style.display = 'none';
        form.reset();
    } catch (error) {
        // Show error message
        errorMessage.style.display = 'block';
        successMessage.style.display = 'none';
        console.error('Failed to send email:', error);
    } finally {
        // Reset button state
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
    }

    // Hide messages after 5 seconds
    setTimeout(() => {
        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';
    }, 5000);

    return false;
}

// Sticky Header with Scroll Behavior
const header = document.querySelector('.sticky-header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }

    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll Down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll Up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Cache DOM elements
    const header = document.querySelector('.sticky-header');
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links a');
    const galleryGrid = document.querySelector('.gallery-grid');
    const contactForm = document.getElementById('contact-form');

    // State management
    let lastScroll = 0;
    let isMenuOpen = false;

    // Mobile menu functionality
    function toggleMobileMenu(event) {
        if (event) event.stopPropagation();
        isMenuOpen = !isMenuOpen;
        nav.classList.toggle('active', isMenuOpen);
        mobileMenuBtn.setAttribute('aria-expanded', isMenuOpen);
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    }

    // Close menu when clicking outside
    function handleClickOutside(event) {
        if (isMenuOpen && !nav.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
            toggleMobileMenu();
        }
    }

    // Handle mobile menu
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
        document.addEventListener('click', handleClickOutside);

        // Close menu when link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    toggleMobileMenu();
                }
            });
        });
    }

    // Smooth scroll functionality
    function smoothScroll(event) {
        const targetId = event.currentTarget.getAttribute('href');
        if (targetId.startsWith('#')) {
            event.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    }

    // Add smooth scroll to all anchor links
    navLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });

    // Sticky header with throttle
    let ticking = false;

    function handleScroll() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const currentScroll = window.pageYOffset;
                if (currentScroll > lastScroll && currentScroll > 100) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                }
                lastScroll = currentScroll;
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Form handling with validation
    if (contactForm) {
        const formInputs = contactForm.querySelectorAll('input, textarea');

        formInputs.forEach(input => {
            input.addEventListener('input', () => {
                input.classList.toggle('filled', input.value.trim() !== '');
            });
        });

        contactForm.addEventListener('submit', async(e) => {
            e.preventDefault();

            // Disable form during submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            try {
                const formData = new FormData(contactForm);
                const data = Object.fromEntries(formData.entries());

                // Basic validation
                if (!data.name || !data.email || !data.message) {
                    throw new Error('Please fill in all required fields');
                }

                if (!isValidEmail(data.email)) {
                    throw new Error('Please enter a valid email address');
                }

                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Thank you for your message! We\'ll get back to you soon.';
                contactForm.appendChild(successMessage);

                // Reset form
                contactForm.reset();
                formInputs.forEach(input => input.classList.remove('filled'));

                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);

            } catch (error) {
                // Show error message
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.textContent = error.message || 'An error occurred. Please try again.';
                contactForm.appendChild(errorMessage);

                setTimeout(() => {
                    errorMessage.remove();
                }, 5000);

            } finally {
                // Re-enable form
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
            }
        });
    }

    // Utility functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Clean up function
    function cleanup() {
        window.removeEventListener('scroll', handleScroll);
        document.removeEventListener('click', handleClickOutside);
        observer.disconnect();
    }

    // Clean up on page unload
    window.addEventListener('unload', cleanup);
});
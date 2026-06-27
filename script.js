

class ElevateAIChatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.responses = {
            greeting: [
                "Hi!! 👋I'm Yaw's personal assistant. What can I assist you with today?",
                "Welcome!! I'm Yaw's personal assistant, how can I support you today?",
                "Hello!! I'm Yaw's personal assistant Feel free to ask about our services, pricing, or anything else!"
            ],
            services: [
                "We offer 6 main services: Strategy & Consulting, Premium Design, Development, Marketing & Growth, Client Support, and Enterprise Solutions. Which interests you most?",
                "Our services include consulting, design, development, marketing, support, and enterprise solutions. Want to know more about any of these?"
            ],
            pricing: [
                "Pricing depends on your specific needs and project scope. I'd recommend scheduling a consultation with our team to discuss your budget. Would you like to book one?",
                "We offer customized pricing based on your requirements. Let's set up a call to discuss the best plan for you!"
            ],
            contact: [
                "You can reach us at yawowusuofosumanu@gmail.com or +233 245-913-1671. Our team typically responds within 24 hours. Need anything else?",
                "Contact us at yawowusuofosumanu@gmail.com or call +233 245-913-1671. We're here Mon-Fri, 9AM-6PM."
            ],
            aboutUs: [
                "We're Elevate, a team of 250+ experts with 15+ years of experience serving 50+ countries. We specialize in premium solutions that drive real results.",
                "We've helped 500+ clients generate over 10M in revenue with a 98% satisfaction rate. Our mission is to empower businesses through excellence."
            ],
            testimonials: [
                "Our clients love us! We have hundreds of 5-star reviews from satisfied customers. Check out our testimonials section to see what they're saying!",
                "98% satisfaction rate with 500+ happy clients! Our track record speaks for itself."
            ],
            booking: [
                "Great! I can help you book a consultation. Just fill out the contact form on our website and mention your service interest. Our team will reach out within 24 hours!",
                "Let's get you scheduled! Visit our contact form and submit your details. We'll get back to you shortly."
            ],
            default: [
                "That's a great question! Can you tell me more about what you're looking for?",
                "I'm here to help! Feel free to ask about our services, team, or how we can work together.",
                "Good question! Would you like to know more about a specific service or schedule a consultation?"
            ]
        };

        this.keywords = {
            services: ['service', 'services', 'offer', 'what do you', 'help with', 'capabilities'],
            pricing: ['price', 'pricing', 'cost', 'expense', 'rate', 'budget', 'fee', 'charge','how much'],
            contact: ['contact', 'phone', 'email', 'reach', 'call', 'message'],
            about: ['about', 'team', 'company', 'who are you', 'experience', 'years'],
            testimonials: ['testimonial', 'review', 'client', 'feedback', 'satisfied'],
            booking: ['book', 'schedule', 'appointment', 'consultation', 'meeting', 'call'],
            greeting: ['hi', 'hello', 'hey', 'start']
        };

        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        const toggleBtn = document.getElementById('chatbotToggle');
        const closeBtn = document.getElementById('chatbotClose');
        const sendBtn = document.getElementById('chatbotSend');
        const inputField = document.getElementById('chatbotInput');

        toggleBtn.addEventListener('click', () => this.toggleChat());
        closeBtn.addEventListener('click', () => this.closeChat());
        sendBtn.addEventListener('click', () => this.sendMessage());
        inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
    }

    toggleChat() {
        const chatWindow = document.getElementById('chatbotWindow');
        this.isOpen ? this.closeChat() : this.openChat();
    }

    openChat() {
        const chatWindow = document.getElementById('chatbotWindow');
        chatWindow.classList.add('open');
        this.isOpen = true;
        document.getElementById('chatbotInput').focus();
    }

    closeChat() {
        const chatWindow = document.getElementById('chatbotWindow');
        chatWindow.classList.remove('open');
        this.isOpen = false;
    }

    sendMessage() {
        const inputField = document.getElementById('chatbotInput');
        const userMessage = inputField.value.trim();

        if (!userMessage) return;

        this.addMessage(userMessage, 'user');
        inputField.value = '';
        inputField.focus();

        // Simulate bot thinking
        setTimeout(() => {
            const botResponse = this.generateResponse(userMessage);
            this.addMessage(botResponse, 'bot');
        }, 500);
    }

    addMessage(text, sender) {
        const messagesContainer = document.getElementById('chatbotMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${sender}-message`;

        const messageParagraph = document.createElement('p');
        messageParagraph.textContent = text;

        messageDiv.appendChild(messageParagraph);
        messagesContainer.appendChild(messageDiv);

        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        this.messages.push({ text, sender });
    }

    generateResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();

        // Check for keywords
        for (const [category, keywords] of Object.entries(this.keywords)) {
            if (keywords.some(keyword => lowerMessage.includes(keyword))) {
                const responses = this.responses[category];
                return responses[Math.floor(Math.random() * responses.length)];
            }
        }

        // Default response
        const defaultResponses = this.responses.default;
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
}

/* ==================== */
/* Form Handling */
/* ==================== */

function handleContactForm(e) {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value
    };

    // Validate
    if (!formData.name || !formData.email || !formData.service) {
        showNotification('Please fill in all required fields', 'error!');
        return;
    }

    // Here you would typically send the form data to a server
    console.log('Form Data:', formData);

    // Show success message
    showNotification('✓ Thank you! We\'ll be in touch within 24 hours.', 'success!');

    // Reset form
    document.getElementById('contactForm').reset();
}

/* ==================== */
/* Notifications */
/* ==================== */

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 30px;
        right: 30px;
        padding: 16px 24px;
        background: ${type === 'success' ? '#16c784' : type === 'error' ? '#ff6b6b' : '#00d4ff'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        font-weight: 600;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/* ==================== */
/* Smooth Scrolling & Navigation */
/* ==================== */

function setupNavigation() {
    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar blur effect on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
        }
    });
}

/* ==================== */
/* Intersection Observer for Animations */
/* ==================== */

function setupAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe service cards
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.style.animation = 'none';
        card.style.opacity = '0';
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe testimonial cards
    document.querySelectorAll('.testimonial-card').forEach((card, index) => {
        card.style.animation = 'none';
        card.style.opacity = '0';
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe badges
    document.querySelectorAll('.badge').forEach((badge, index) => {
        badge.style.animation = 'none';
        badge.style.opacity = '0';
        badge.style.animationDelay = `${index * 0.1}s`;
        observer.observe(badge);
    });

    // Observe about section
    document.querySelectorAll('.highlight, .about-stat').forEach((elem, index) => {
        elem.style.animation = 'none';
        elem.style.opacity = '0';
        elem.style.animationDelay = `${index * 0.1}s`;
        observer.observe(elem);
    });
}

/* ==================== */
/* Counter Animation */
/* ==================== */

function animateCounters() {
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(element => {
                    animateValue(element);
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        observer.observe(heroStats);
    }

    const aboutStats = document.querySelector('.about-stats');
    if (aboutStats) {
        observer.observe(aboutStats);
    }
}

function animateValue(element) {
    const value = element.textContent;
    const numberMatch = value.match(/[\d.]+/);
    const suffix = value.match(/[a-zA-Z%+]+/);

    if (!numberMatch) return;

    const num = parseFloat(numberMatch[0]);
    const duration = 2000;
    const startTime = Date.now();

    const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const currentValue = Math.floor(num * progress);
        element.textContent = currentValue + (suffix ? suffix[0] : '');

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    };

    animate();
}

/* ==================== */
/* Parallax Effect */
/* ==================== */

function setupParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const gradientSphere = document.querySelector('.gradient-sphere');
        const accentCircle = document.querySelector('.accent-circle');

        if (gradientSphere) {
            gradientSphere.style.transform = `translateY(${scrolled * 0.5}px)`;
        }

        if (accentCircle) {
            accentCircle.style.transform = `rotate(${scrolled * 0.2}deg)`;
        }
    });
}

/* ==================== */
/* Hover Effects on Interactive Elements */
/* ==================== */

function setupHoverEffects() {
    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderColor = 'var(--secondary-color)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.borderColor = 'var(--border-color)';
        });
    });
}

/* ==================== */
/* Performance Optimization */
/* ==================== */

function lazyLoadImages() {
    if ('IntersectionObserver' in window) {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

/* ==================== */
/* Mobile Menu */
/* ==================== */

function setupMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Close menu on mobile after clicking a link
            if (window.innerWidth < 768) {
                navMenu.style.display = 'none';
                setTimeout(() => {
                    navMenu.style.display = '';
                }, 300);
            }
        });
    });
}

/* ==================== */
/* Initialization */
/* ==================== */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize chatbot
    const chatbot = new ElevateAIChatbot();

    // Setup all interactions
    setupNavigation();
    setupAnimations();
    setupHoverEffects();
    animateCounters();
    setupParallax();
    lazyLoadImages();
    setupMobileMenu();

    // Form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Open chatbot with Cmd+K or Ctrl+K
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            const toggle = document.getElementById('chatbotToggle');
            toggle.click();
        }
    });

    console.log('%c✨ Elevate Website Loaded!', 'color: #16c784; font-size: 16px; font-weight: bold;');
    console.log('%cPress Cmd+K or Ctrl+K to open the chatbot!', 'color: #00d4ff; font-size: 12px;');
});

/* ==================== */
/* Add animations to stylesheet dynamically */
/* ==================== */

const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(30px);
        }
    }
`;
document.head.appendChild(style);

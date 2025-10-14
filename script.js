// DOM Elements
const carouselTrack = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicators = document.querySelectorAll('.indicator');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Carousel functionality
class Carousel {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.carousel-slide');
        this.totalSlides = this.slides.length;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 5000; // 5 seconds
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.startAutoPlay();
        this.updateCarousel();
    }
    
    setupEventListeners() {
        // Navigation buttons
        prevBtn.addEventListener('click', () => this.prevSlide());
        nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Pause auto-play on hover
        const carouselContainer = document.querySelector('.carousel-container');
        carouselContainer.addEventListener('mouseenter', () => this.stopAutoPlay());
        carouselContainer.addEventListener('mouseleave', () => this.startAutoPlay());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
        
        // Touch/swipe support
        this.addTouchSupport();
    }
    
    addTouchSupport() {
        const carouselWrapper = document.querySelector('.carousel-wrapper');
        let startX = 0;
        let endX = 0;
        
        carouselWrapper.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            this.stopAutoPlay();
        });
        
        carouselWrapper.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            this.handleSwipe(startX, endX);
            this.startAutoPlay();
        });
    }
    
    handleSwipe(startX, endX) {
        const threshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.prevSlide();
            }
        }
    }
    
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateCarousel();
    }
    
    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateCarousel();
    }
    
    goToSlide(index) {
        this.currentSlide = index;
        this.updateCarousel();
    }
    
    updateCarousel() {
        const translateX = -this.currentSlide * 100;
        carouselTrack.style.transform = `translateX(${translateX}%)`;
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });
        
        // Update slide classes
        this.slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === this.currentSlide);
        });
    }
    
    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayDelay);
    }
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
}

// Smooth scrolling for navigation links
function smoothScroll() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Mobile menu toggle
function mobileMenuToggle() {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Simple scroll animations - just basic fade in
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    // Simple fade in for all cards and sections
    const animateElements = document.querySelectorAll('.glass-card, .section-header, .hero-text');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Navbar scroll effect
function navbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.8)';
            navbar.style.backdropFilter = 'blur(20px)';
        }
    });
}

// Form submission - Let Formspree handle it naturally
function setupContactForm() {
    // No JavaScript interference - let the form submit naturally to Formspree
    console.log('Contact form setup - letting Formspree handle submissions');
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'rgba(0, 255, 136, 0.9)' : type === 'error' ? 'rgba(255, 59, 48, 0.9)' : 'rgba(255, 255, 255, 0.9)'};
        color: ${type === 'success' || type === 'error' ? '#000' : '#333'};
        padding: 15px 20px;
        border-radius: 10px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto close after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Button click animations
function setupButtonAnimations() {
    const buttons = document.querySelectorAll('.btn, .carousel-btn, .indicator');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Minimal parallax effect - just background orbs
function setupParallaxEffect() {
    const orbs = document.querySelectorAll('.gradient-orb');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // Simple parallax for background orbs only
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.2;
            const yPos = -(scrolled * speed);
            orb.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Smooth scroll progress indicator
function setupScrollProgress() {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #00ff88, #00cc6a);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    // Update progress on scroll
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Removed magnetic effect - keeping it simple

// Typing animation for hero title
function setupTypingAnimation() {
    const heroTitle = document.querySelector('.hero-title .gradient-text');
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    // Start typing animation after a short delay
    setTimeout(typeWriter, 1000);
}

// Resume download functionality
function downloadResume() {
    // Link to your actual resume file
    const element = document.createElement('a');
    element.href = 'Tony_Doring_Resume.pdf'; // Change this to your actual resume filename
    element.download = 'Tony_Doring_Resume.pdf';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    // Show notification
    showNotification('Resume downloaded successfully!', 'success');
}

// Scroll to contact section
function scrollToContact() {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
        const offsetTop = contactSection.offsetTop - 70; // Account for fixed navbar
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Generate resume content in HTML format
function generateResumeContent() {
    const currentDate = new Date().toLocaleDateString();
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tony D - Resume</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            color: #333;
            background: #fff;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 3px solid #00cc6a;
            padding-bottom: 20px;
        }
        .name {
            font-size: 2.5em;
            color: #00cc6a;
            margin-bottom: 10px;
        }
        .title {
            font-size: 1.2em;
            color: #666;
            margin-bottom: 15px;
        }
        .contact-info {
            display: flex;
            justify-content: center;
            gap: 30px;
            flex-wrap: wrap;
        }
        .contact-info span {
            color: #555;
        }
        .section {
            margin-bottom: 30px;
        }
        .section-title {
            font-size: 1.5em;
            color: #00cc6a;
            border-bottom: 2px solid #00cc6a;
            padding-bottom: 5px;
            margin-bottom: 15px;
        }
        .job {
            margin-bottom: 25px;
        }
        .job-header {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            margin-bottom: 10px;
        }
        .job-title {
            font-weight: bold;
            font-size: 1.1em;
            color: #333;
        }
        .company {
            font-weight: bold;
            color: #00cc6a;
        }
        .dates {
            color: #666;
            font-style: italic;
        }
        .location {
            color: #666;
            font-size: 0.9em;
        }
        .achievements {
            margin-left: 20px;
        }
        .achievements li {
            margin-bottom: 5px;
            color: #555;
        }
        .skills {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }
        .skill-tag {
            background: #00cc6a;
            color: white;
            padding: 5px 12px;
            border-radius: 15px;
            font-size: 0.9em;
        }
        .summary {
            font-size: 1.1em;
            line-height: 1.8;
            color: #555;
        }
        @media print {
            body { margin: 0; }
            .section { page-break-inside: avoid; }
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="name">Tony D</div>
        <div class="title">Full-Stack Developer & Business Consultant</div>
        <div class="contact-info">
            <span>📧 tony@example.com</span>
            <span>📱 +1 (555) 123-4567</span>
            <span>🌐 Available Worldwide</span>
        </div>
    </div>

    <div class="section">
        <div class="section-title">Professional Summary</div>
        <div class="summary">
            With over 5 years of experience in full-stack development and business consulting, 
            I specialize in creating scalable web applications and providing strategic guidance 
            to help businesses grow and optimize their digital presence. Proven track record of 
            delivering high-impact solutions that drive business growth and technical excellence.
        </div>
    </div>

    <div class="section">
        <div class="section-title">Professional Experience</div>
        
        <div class="job">
            <div class="job-header">
                <div>
                    <div class="job-title">Senior Software Engineer</div>
                    <div class="company">TechCorp Solutions</div>
                    <div class="location">San Francisco, CA</div>
                </div>
                <div class="dates">2021 - Present</div>
            </div>
            <ul class="achievements">
                <li>Led development of microservices architecture serving 100K+ users</li>
                <li>Improved system performance by 60% through optimization</li>
                <li>Mentored 5 junior developers and established best practices</li>
                <li>Managed $3M product budget and coordinated with 5 engineering teams</li>
            </ul>
        </div>

        <div class="job">
            <div class="job-header">
                <div>
                    <div class="job-title">Full-Stack Developer</div>
                    <div class="company">Innovation Labs</div>
                    <div class="location">Austin, TX</div>
                </div>
                <div class="dates">2019 - 2021</div>
            </div>
            <ul class="achievements">
                <li>Built scalable web applications with 99.9% uptime</li>
                <li>Increased user engagement by 45% through UI/UX improvements</li>
                <li>Collaborated with cross-functional teams on product strategy</li>
                <li>Conducted market research that identified $10M market opportunity</li>
            </ul>
        </div>

        <div class="job">
            <div class="job-header">
                <div>
                    <div class="job-title">Software Developer</div>
                    <div class="company">DataFlow Systems</div>
                    <div class="location">New York, NY</div>
                </div>
                <div class="dates">2017 - 2019</div>
            </div>
            <ul class="achievements">
                <li>Developed data processing pipelines handling 1M+ records daily</li>
                <li>Implemented automated testing reducing bugs by 70%</li>
                <li>Optimized database queries improving response time by 50%</li>
                <li>Supported product launches that generated $1M in first-year revenue</li>
            </ul>
        </div>

        <div class="job">
            <div class="job-header">
                <div>
                    <div class="job-title">Junior Developer</div>
                    <div class="company">StartupXYZ</div>
                    <div class="location">Boston, MA</div>
                </div>
                <div class="dates">2015 - 2017</div>
            </div>
            <ul class="achievements">
                <li>Contributed to MVP development that secured $2M funding</li>
                <li>Built responsive web interfaces for mobile-first approach</li>
                <li>Participated in agile development and code reviews</li>
            </ul>
        </div>

        <div class="job">
            <div class="job-header">
                <div>
                    <div class="job-title">Frontend Developer Intern</div>
                    <div class="company">WebTech Corp</div>
                    <div class="location">Seattle, WA</div>
                </div>
                <div class="dates">2014 - 2015</div>
            </div>
            <ul class="achievements">
                <li>Created interactive prototypes using modern web technologies</li>
                <li>Assisted in user interface design and user experience testing</li>
                <li>Learned industry best practices and development workflows</li>
            </ul>
        </div>

        <div class="job">
            <div class="job-header">
                <div>
                    <div class="job-title">Freelance Web Developer</div>
                    <div class="company">Independent</div>
                    <div class="location">Remote</div>
                </div>
                <div class="dates">2012 - 2014</div>
            </div>
            <ul class="achievements">
                <li>Delivered 20+ websites for small businesses and startups</li>
                <li>Managed client relationships and project timelines</li>
                <li>Developed skills in full-stack development and deployment</li>
            </ul>
        </div>
    </div>

    <div class="section">
        <div class="section-title">Key Achievements</div>
        <ul class="achievements">
            <li>Led development of a scalable e-commerce platform that increased conversion rates by 40%</li>
            <li>Built comprehensive analytics dashboard improving decision-making efficiency by 50%</li>
            <li>Developed mobile-first SaaS application that acquired 10,000+ users in first 6 months</li>
            <li>Architected microservices infrastructure reducing system complexity by 70%</li>
        </ul>
    </div>

    <div class="section">
        <div class="section-title">Technical Skills</div>
        <div class="skills">
            <span class="skill-tag">JavaScript/TypeScript</span>
            <span class="skill-tag">React/Vue.js</span>
            <span class="skill-tag">Node.js/Python</span>
            <span class="skill-tag">AWS/Cloud Architecture</span>
            <span class="skill-tag">Docker/Kubernetes</span>
            <span class="skill-tag">PostgreSQL/MongoDB</span>
            <span class="skill-tag">GraphQL</span>
            <span class="skill-tag">Git</span>
            <span class="skill-tag">Agile/Scrum</span>
            <span class="skill-tag">Product Management</span>
            <span class="skill-tag">Business Strategy</span>
        </div>
    </div>

    <div class="section">
        <div class="section-title">Consulting Services</div>
        <ul class="achievements">
            <li><strong>Web Development:</strong> Custom web applications with modern technologies</li>
            <li><strong>Business Strategy:</strong> Data-driven consulting for process optimization</li>
            <li><strong>Cloud Architecture:</strong> Scalable solutions with AWS/Azure platforms</li>
            <li><strong>Digital Transformation:</strong> Strategic guidance for technology adoption</li>
        </ul>
    </div>

    <footer style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; color: #666;">
        <p>Generated on ${currentDate} | Tony D Portfolio & Consulting Services</p>
    </footer>
</body>
</html>
    `;
}

// Dynamic logo loading based on company names
function setupCompanyLogos() {
    const logoImages = document.querySelectorAll('.company-logo-img');
    console.log(`Found ${logoImages.length} logo images to process`);
    
    logoImages.forEach((img) => {
        const companyName = img.alt;
        const logoPath = generateLogoPath(companyName);
        console.log(`Setting logo for ${companyName} to: ${logoPath}`);
        img.src = logoPath;
        
        // Show logo and hide fallback icon when image loads
        img.onload = () => {
            console.log(`✅ Logo loaded successfully for ${companyName}`);
            img.style.display = 'block';
            img.style.visibility = 'visible';
            const fallbackIcon = img.nextElementSibling;
            if (fallbackIcon && fallbackIcon.classList.contains('fallback-icon')) {
                fallbackIcon.style.display = 'none';
                console.log(`Hidden fallback icon for ${companyName}`);
            }
        };
        
        img.onerror = () => {
            console.log(`❌ Logo failed to load for ${companyName} at path: ${logoPath}`);
        };
    });
}

// Generate logo path based on company name
function generateLogoPath(companyName) {
    // Convert company name to logo filename
    // Remove common words and special characters, convert to lowercase
    const cleanName = companyName
        .toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with hyphens
        .replace(/[^a-z0-9-]/g, '')     // Remove special characters
        .replace(/^-+|-+$/g, '')        // Remove leading/trailing hyphens
        .replace(/-+/g, '-');           // Replace multiple hyphens with single
    
    return `logos/${cleanName}-logo.png`;
}

// Simple Timeline - No interaction needed
function setupInteractiveTimeline() {
    console.log('Simple timeline setup - no interaction required');
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize carousel only if it exists
    try {
        const carousel = document.querySelector('.carousel');
        if (carousel) {
            new Carousel();
        }
    } catch (error) {
        console.log('Carousel not found or error:', error);
    }
    
    // Setup other functionalities
    smoothScroll();
    mobileMenuToggle();
    setupScrollAnimations();
    navbarScrollEffect();
    setupContactForm();
    setupButtonAnimations();
    setupParallaxEffect();
    setupScrollProgress();
    setupCompanyLogos();
    setupInteractiveTimeline();
    
    // Optional: Add typing animation (uncomment if desired)
    // setupTypingAnimation();
});

// Handle window resize
window.addEventListener('resize', () => {
    // Recalculate carousel position on resize
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        carousel.style.transform = `translateX(-${window.innerWidth * 0}px)`;
    }
});

// Preload critical images (if any)
function preloadImages() {
    const imageUrls = [
        // Add any image URLs here if needed
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Performance optimization: Lazy load non-critical elements
function setupLazyLoading() {
    const lazyElements = document.querySelectorAll('[data-lazy]');
    
    const lazyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                // Load the element content
                element.classList.remove('lazy');
                lazyObserver.unobserve(element);
            }
        });
    });
    
    lazyElements.forEach(el => lazyObserver.observe(el));
}

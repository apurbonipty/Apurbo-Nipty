// ===== DOM Elements =====
const loadingScreen = document.querySelector('.loading-screen');
const themeBtn = document.querySelector('.theme-btn');
const backToTopBtn = document.querySelector('.back-to-top');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');
const form = document.getElementById('messageForm');

// ===== Loading Screen =====
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 1500);
});

// ===== Theme Toggle =====
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Update button based on saved theme
    updateThemeButton(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    updateThemeButton(newTheme);
    
    // Add animation effect
    document.body.style.opacity = '0.8';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 300);
}

function updateThemeButton(theme) {
    const moonIcon = themeBtn.querySelector('.fa-moon');
    const sunIcon = themeBtn.querySelector('.fa-sun');
    
    if (theme === 'dark') {
        moonIcon.style.opacity = '1';
        sunIcon.style.opacity = '0';
    } else {
        moonIcon.style.opacity = '0';
        sunIcon.style.opacity = '1';
    }
}

themeBtn.addEventListener('click', toggleTheme);

// ===== Back to Top Button =====
function handleScroll() {
    // Back to top button
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
    
    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Section reveal animation
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== Mobile Navigation =====
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ===== Custom Cursor =====
function initCursor() {
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;
        
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        
        // Add delay to outline for smooth trailing effect
        setTimeout(() => {
            cursorOutline.style.left = `${posX}px`;
            cursorOutline.style.top = `${posY}px`;
        }, 100);
        
        // Interactive elements cursor effect
        const interactiveElements = document.querySelectorAll('a, button, .btn, .skill-card, .education-card, .language-card');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorOutline.style.opacity = '0.5';
            });
            
            element.addEventListener('mouseleave', () => {
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.opacity = '0.3';
            });
        });
    });
}

// ===== Skills Data =====
const skillsData = [
    {
        title: "Telegram, Discord & X Community Management",
        icon: "fas fa-users",
        description: "Expert in managing and growing online communities across major platforms."
    },
    {
        title: "Content Scheduling & Posting",
        icon: "fas fa-calendar-alt",
        description: "Strategic content planning and scheduling for maximum engagement."
    },
    {
        title: "User Engagement & Support",
        icon: "fas fa-comments",
        description: "Building active communities through consistent engagement and support."
    },
    {
        title: "Anti-Spam Bots & Automation",
        icon: "fas fa-robot",
        description: "Setting up automated systems for community safety and efficiency."
    },
    {
        title: "Social Media Growth Strategy",
        icon: "fas fa-chart-line",
        description: "Developing strategies to grow community presence and engagement."
    },
    {
        title: "Team Collaboration",
        icon: "fas fa-handshake",
        description: "Working effectively with teams to achieve community goals."
    },
    {
        title: "Problem Solving & Conflict Handling",
        icon: "fas fa-puzzle-piece",
        description: "Resolving conflicts and solving problems to maintain community harmony."
    },
    {
        title: "Basic Graphic Design (Canva)",
        icon: "fas fa-paint-brush",
        description: "Creating engaging visual content for community platforms."
    }
];

// ===== Populate Skills =====
function populateSkills() {
    const skillsGrid = document.querySelector('.skills-grid');
    
    skillsData.forEach(skill => {
        const skillCard = document.createElement('div');
        skillCard.className = 'skill-card glass-card reveal';
        
        skillCard.innerHTML = `
            <div class="skill-icon">
                <i class="${skill.icon}"></i>
            </div>
            <h3>${skill.title}</h3>
            <p>${skill.description}</p>
        `;
        
        skillsGrid.appendChild(skillCard);
    });
}

// ===== Animated Stats Counter =====
function animateStats() {
    const stats = document.querySelectorAll('.stat h4');
    
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current);
        }, 16);
    });
}

// ===== Contact Form Handler =====
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Here you would normally send the data to a server
    // For this example, we'll just show a success message
    const submitBtn = form.querySelector('.btn');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    submitBtn.style.background = 'var(--secondary-color)';
    
    // Reset form
    form.reset();
    
    // Reset button after 3 seconds
    setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
    }, 3000);
    
    // Log the form data (for demo purposes)
    console.log('Form submitted:', { name, email, subject, message });
}

// ===== Smooth Scrolling for Anchor Links =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== Typing Animation =====
function initTypingAnimation() {
    const typingText = document.querySelector('.typing-text');
    const texts = [
        "Community Manager",
        "Telegram & Discord Specialist",
        "X Platform Strategist",
        "Engagement Expert"
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(type, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, 500);
        } else {
            const speed = isDeleting ? 50 : 100;
            setTimeout(type, speed);
        }
    }
    
    // Start typing animation after page load
    setTimeout(type, 1000);
}

// ===== Initialize Progress Bars =====
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
}

// ===== Initialize Everything =====
function init() {
    initTheme();
    initCursor();
    populateSkills();
    initSmoothScroll();
    initTypingAnimation();
    
    // Add reveal class to sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('reveal');
    });
    
    // Event Listeners
    window.addEventListener('scroll', handleScroll);
    form.addEventListener('submit', handleFormSubmit);
    
    // Initial scroll check
    handleScroll();
    
    // Initialize progress bars after a delay
    setTimeout(initProgressBars, 1500);
    
    // Initialize stats animation when about section is visible
    const aboutSection = document.getElementById('about');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(aboutSection);
}

// ===== Initialize on DOM Content Loaded =====
document.addEventListener('DOMContentLoaded', init);
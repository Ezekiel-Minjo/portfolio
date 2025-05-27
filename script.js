// Portfolio JavaScript - Interactive Features
// Author: Ezekiel Minjo

// DOM Content Loaded Event
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all components
  initNavigation();
  initScrollEffects();
  initContactForm();
  initAnimations();
  initSkillsAnimation();
  initProjectInteractions();
});

// Navigation Functionality
function initNavigation() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Toggle mobile menu
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close mobile menu when clicking on nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Active navigation highlighting
  window.addEventListener("scroll", highlightActiveNavLink);
}

// Highlight active navigation link based on scroll position
function highlightActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  let current = "";
  const scrollPos = window.scrollY + 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

// Scroll Effects
function initScrollEffects() {
  // Navbar background on scroll
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(255, 255, 255, 0.98)";
      navbar.style.boxShadow = "0 2px 30px rgba(0, 0, 0, 0.15)";
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.95)";
      navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
    }
  });

  // Parallax effect for hero section
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector(".hero");
    if (hero) {
      const rate = scrolled * -0.5;
      hero.style.transform = `translateY(${rate}px)`;
    }
  });
}

// Contact Form Functionality
function initContactForm() {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      handleFormSubmission(this);
    });

    // Real-time form validation
    const formInputs = contactForm.querySelectorAll("input, textarea");
    formInputs.forEach((input) => {
      input.addEventListener("blur", validateField);
      input.addEventListener("input", clearFieldError);
    });
  }
}

// Handle form submission
function handleFormSubmission(form) {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  // Validate all fields
  if (!validateForm(form)) {
    return;
  }

  // Show loading state
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  // Simulate form submission (replace with actual API call)
  setTimeout(() => {
    showNotification(
      "Message sent successfully! I'll get back to you soon.",
      "success"
    );
    form.reset();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }, 2000);
}

// Form validation
function validateForm(form) {
  const inputs = form.querySelectorAll("input[required], textarea[required]");
  let isValid = true;

  inputs.forEach((input) => {
    if (!validateField({ target: input })) {
      isValid = false;
    }
  });

  return isValid;
}

// Validate individual field
function validateField(e) {
  const field = e.target;
  const value = field.value.trim();
  const fieldName = field.name;

  // Remove existing error
  clearFieldError(e);

  let isValid = true;
  let errorMessage = "";

  if (!value) {
    errorMessage = `${
      fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
    } is required`;
    isValid = false;
  } else if (fieldName === "email" && !isValidEmail(value)) {
    errorMessage = "Please enter a valid email address";
    isValid = false;
  } else if (fieldName === "name" && value.length < 2) {
    errorMessage = "Name must be at least 2 characters long";
    isValid = false;
  } else if (fieldName === "message" && value.length < 10) {
    errorMessage = "Message must be at least 10 characters long";
    isValid = false;
  }

  if (!isValid) {
    showFieldError(field, errorMessage);
  }

  return isValid;
}

// Clear field error
function clearFieldError(e) {
  const field = e.target;
  const errorElement = field.parentNode.querySelector(".field-error");
  if (errorElement) {
    errorElement.remove();
  }
  field.style.borderColor = "";
}

// Show field error
function showFieldError(field, message) {
  const errorElement = document.createElement("div");
  errorElement.className = "field-error";
  errorElement.textContent = message;
  errorElement.style.color = "#e74c3c";
  errorElement.style.fontSize = "0.8rem";
  errorElement.style.marginTop = "0.5rem";

  field.style.borderColor = "#e74c3c";
  field.parentNode.appendChild(errorElement);
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Show notification
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
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
        top: 20px;
        right: 20px;
        background: ${
          type === "success"
            ? "#2ecc71"
            : type === "error"
            ? "#e74c3c"
            : "#3498db"
        };
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 400px;
    `;

  document.body.appendChild(notification);

  // Show notification
  setTimeout(() => {
    notification.style.opacity = "1";
    notification.style.transform = "translateX(0)";
  }, 100);

  // Auto-hide after 5 seconds
  setTimeout(() => {
    hideNotification(notification);
  }, 5000);

  // Close button functionality
  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.addEventListener("click", () => hideNotification(notification));
}

// Hide notification
function hideNotification(notification) {
  notification.style.opacity = "0";
  notification.style.transform = "translateX(100%)";
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 300);
}

// Scroll Animations
function initAnimations() {
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".skill-category, .project-card, .about-text, .contact-info, .contact-form"
  );
  animateElements.forEach((el) => {
    el.classList.add("animate-element");
    observer.observe(el);
  });

  // Add CSS for animations
  const style = document.createElement("style");
  style.textContent = `
        .animate-element {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        .animate-element.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
  document.head.appendChild(style);
}

// Skills Animation
function initSkillsAnimation() {
  const skillCategories = document.querySelectorAll(".skill-category");

  skillCategories.forEach((category, index) => {
    category.style.animationDelay = `${index * 0.1}s`;

    // Add hover effect for skill items
    const skillItems = category.querySelectorAll(".skill-item");
    skillItems.forEach((item) => {
      item.addEventListener("mouseenter", function () {
        this.style.transform = "scale(1.05)";
        this.style.boxShadow = "0 4px 12px rgba(102, 126, 234, 0.3)";
      });

      item.addEventListener("mouseleave", function () {
        this.style.transform = "scale(1)";
        this.style.boxShadow = "none";
      });
    });
  });
}

// Project Interactions
function initProjectInteractions() {
  // Add loading states for project links
  const projectLinks = document.querySelectorAll(".project-link");

  projectLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // If it's a GitHub link, add tracking
      if (href && href.includes("github.com")) {
        // Analytics tracking could go here
        console.log("GitHub link clicked:", href);
      }

      // Add visual feedback
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "scale(1.1)";
      }, 100);
    });
  });

  // Add typing effect to project description
  const projectDescription = document.querySelector(".hero-description");
  if (projectDescription) {
    const text = projectDescription.textContent;
    projectDescription.textContent = "";

    let i = 0;
    function typeWriter() {
      if (i < text.length) {
        projectDescription.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 20);
      }
    }

    // Start typing animation after hero loads
    setTimeout(typeWriter, 1000);
  }
}

// Utility Functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Smooth scroll to top
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Add scroll to top button
function addScrollToTopButton() {
  const scrollButton = document.createElement("button");
  scrollButton.innerHTML = "↑";
  scrollButton.className = "scroll-to-top";
  scrollButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;

  document.body.appendChild(scrollButton);

  // Show/hide button based on scroll position
  window.addEventListener(
    "scroll",
    debounce(() => {
      if (window.scrollY > 300) {
        scrollButton.style.opacity = "1";
        scrollButton.style.visibility = "visible";
      } else {
        scrollButton.style.opacity = "0";
        scrollButton.style.visibility = "hidden";
      }
    }, 100)
  );

  // Click handler
  scrollButton.addEventListener("click", scrollToTop);
}

// Initialize scroll to top button
addScrollToTopButton();

// Console log for developers
console.log("🚀 Ezekiel Minjo Portfolio - JavaScript Loaded Successfully!");
console.log("💻 Interested in the code? Check out the GitHub repository!");
console.log("📧 Contact: ezekielminjo4@example.com");

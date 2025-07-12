document.addEventListener('DOMContentLoaded', () => {
    // Scroll-to-Top Button Logic (Applies to pages where the button is present)
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    if (scrollToTopBtn) {
        // Show or hide the button based on scroll position
        window.onscroll = function() {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                scrollToTopBtn.style.display = "block";
            } else {
                scrollToTopBtn.style.display = "none";
            }
        };

        // When the button is clicked, scroll to the top of the document
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth' // Smooth scroll
            });
        });
    }

    // Contact Form Validation Logic
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default form submission
            clearErrors(); // Clear previous errors and success message

            if (validateForm()) {
                showSuccess(); // Show success message
                contactForm.reset(); // Clear form fields
            }
        });
    }

    function validateForm() {
        let isValid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Name validation
        const nameInput = document.getElementById('name');
        if (!nameInput.value.trim()) {
            showError('nameError', 'Name is required.');
            markInvalid(nameInput);
            isValid = false;
        }

        // Email validation
        const emailInput = document.getElementById('email');
        if (!emailInput.value.trim()) {
            showError('emailError', 'Email is required.');
            markInvalid(emailInput);
            isValid = false;
        } else if (!emailRegex.test(emailInput.value)) {
            showError('emailError', 'Please enter a valid email address.');
            markInvalid(emailInput);
            isValid = false;
        }

        // Message validation
        const messageInput = document.getElementById('message');
        if (!messageInput.value.trim()) {
            showError('messageError', 'Message is required.');
            markInvalid(messageInput);
            isValid = false;
        } else if (messageInput.value.trim().length < 10) {
            showError('messageError', 'Message must be at least 10 characters.');
            markInvalid(messageInput);
            isValid = false;
        }

        return isValid;
    }

    function showError(id, message) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = message;
        }
    }

    function markInvalid(element) {
        if (element && element.parentElement) {
            element.parentElement.classList.add('error');
        }
    }

    function clearErrors() {
        // Clear all error messages
        document.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
        });

        // Remove 'error' class from all form-groups
        document.querySelectorAll('.form-group').forEach(el => {
            el.classList.remove('error');
        });

        // Hide the success message
        if (successMessage) {
            successMessage.style.display = 'none';
        }
    }

    function showSuccess() {
        if (successMessage) {
            successMessage.textContent = 'Thank you for contacting us! We will get back to you soon.';
            successMessage.style.display = 'block';

            // Hide after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        }
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        clearErrors();
        
        if (validateForm()) {
            showSuccess();
            form.reset();
        }
    });

    function validateForm() {
        let isValid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Name validation
        const name = document.getElementById('name');
        if (!name.value.trim()) {
            showError('nameError', 'Name is required');
            markInvalid(name);
            isValid = false;
        }

        // Email validation
        const email = document.getElementById('email');
        if (!email.value.trim()) {
            showError('emailError', 'Email is required');
            markInvalid(email);
            isValid = false;
        } else if (!emailRegex.test(email.value)) {
            showError('emailError', 'Please enter a valid email');
            markInvalid(email);
            isValid = false;
        }

        // Message validation
        const message = document.getElementById('message');
        if (!message.value.trim()) {
            showError('messageError', 'Message is required');
            markInvalid(message);
            isValid = false;
        } else if (message.value.trim().length < 10) {
            showError('messageError', 'Message must be at least 10 characters');
            markInvalid(message);
            isValid = false;
        }

        return isValid;
    }

    function showError(id, message) {
        const element = document.getElementById(id);
        element.textContent = message;
    }

    function markInvalid(element) {
        element.parentElement.classList.add('error');
    }

    function clearErrors() {
        // Clear messages
        document.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
        });
        
        // Remove error classes
        document.querySelectorAll('.form-group').forEach(el => {
            el.classList.remove('error');
        });
        
        // Hide success message
        successMessage.style.display = 'none';
    }

    function showSuccess() {
        successMessage.textContent = 'Thank you for contacting us!';
        successMessage.style.display = 'block';
        
        // Hide after 5 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    }
});
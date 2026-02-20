// Multi-step Form Logic
let currentStep = 1;
const totalSteps = 4;

// Initialize
document.addEventListener('DOMContentLoaded', function () {
    showStep(currentStep);
    updateProgressBar();
});

// Profile Image Preview
document.getElementById('profileImage').addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const preview = document.getElementById('profilePreview');
            const placeholder = document.getElementById('profilePlaceholder');
            preview.src = e.target.result;
            preview.style.display = 'block';
            placeholder.style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
});

// Password Strength Indicator
document.getElementById('password').addEventListener('input', function (e) {
    const password = e.target.value;
    const strengthBar = document.getElementById('passwordStrengthBar');

    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;

    strengthBar.className = 'password-strength-bar';
    if (strength <= 2) {
        strengthBar.classList.add('strength-weak');
    } else if (strength === 3) {
        strengthBar.classList.add('strength-medium');
    } else {
        strengthBar.classList.add('strength-strong');
    }
});

// Phone Number Formatting
document.getElementById('phone').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 10) value = value.substr(0, 10);
    e.target.value = value;
});

// ID Card Formatting
document.getElementById('idCard').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 13) value = value.substr(0, 13);
    e.target.value = value;
});

// Zip Code Formatting
document.getElementById('zipCode').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 5) value = value.substr(0, 5);
    e.target.value = value;
});

// Navigation Buttons
document.getElementById('nextBtn').addEventListener('click', function () {
    if (validateStep(currentStep)) {
        currentStep++;
        showStep(currentStep);
        updateProgressBar();
    }
});

document.getElementById('prevBtn').addEventListener('click', function () {
    currentStep--;
    showStep(currentStep);
    updateProgressBar();
});

// Form Submit
document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();

    if (validateStep(currentStep)) {
        // Prepare form data
        const formData = new FormData(this);

        // Here you would typically send the data to your server
        console.log('Form data:', Object.fromEntries(formData));

        document.getElementById('successMessage').style.display = 'block';

        // Simulate redirect after 2 seconds
        setTimeout(() => {
            Swal.fire({
                icon: 'success',
                title: 'สมัครสมาชิกสำเร็จ!',
                text: 'ยินดีต้อนรับสู่ระบบ กำลังนำคุณไปยังหน้าเข้าสู่ระบบ...',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                background: '#fff',
                iconColor: '#28a745'
            }).then(() => {
                window.location.href = 'login.html';
            });
        }, 500);
    }
});

// Show specific step
function showStep(step) {
    // Hide all steps
    const steps = document.querySelectorAll('.form-step');
    steps.forEach(s => s.classList.remove('active'));

    // Show current step
    const currentStepElement = document.querySelector(`.form-step[data-step="${step}"]`);
    if (currentStepElement) {
        currentStepElement.classList.add('active');
    }

    // Update buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');

    if (step === 1) {
        prevBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'block';
    }

    if (step === totalSteps) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'block';
    } else {
        nextBtn.style.display = 'block';
        submitBtn.style.display = 'none';
    }
}

// Update progress bar
function updateProgressBar() {
    const progressSteps = document.querySelectorAll('.progress-step');
    const progressLines = document.querySelectorAll('.progress-line');

    progressSteps.forEach((step, index) => {
        const stepNumber = index + 1;

        if (stepNumber < currentStep) {
            step.classList.add('completed');
            step.classList.remove('active');
        } else if (stepNumber === currentStep) {
            step.classList.add('active');
            step.classList.remove('completed');
        } else {
            step.classList.remove('active', 'completed');
        }
    });

    progressLines.forEach((line, index) => {
        if (index + 1 < currentStep) {
            line.classList.add('completed');
        } else {
            line.classList.remove('completed');
        }
    });
}

// Validate current step
function validateStep(step) {
    // Reset all error messages
    document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');

    let isValid = true;

    switch (step) {
        case 1:
            // Validate Step 1: Basic Information
            if (!document.getElementById('firstName').value.trim()) {
                document.getElementById('firstNameError').style.display = 'block';
                isValid = false;
            }
            if (!document.getElementById('lastName').value.trim()) {
                document.getElementById('lastNameError').style.display = 'block';
                isValid = false;
            }
            break;

        case 2:
            // Validate Step 2: Personal Information
            if (!document.getElementById('birthDate').value) {
                document.getElementById('birthDateError').style.display = 'block';
                isValid = false;
            }

            const gender = document.querySelector('input[name="gender"]:checked');
            if (!gender) {
                isValid = false;
            }

            const idCard = document.getElementById('idCard').value;
            if (idCard.length !== 13) {
                document.getElementById('idCardError').style.display = 'block';
                isValid = false;
            }

            const phone = document.getElementById('phone').value;
            if (phone.length !== 10) {
                document.getElementById('phoneError').style.display = 'block';
                isValid = false;
            }
            break;

        case 3:
            // Validate Step 3: Address
            if (!document.getElementById('address').value.trim()) {
                document.getElementById('addressError').style.display = 'block';
                isValid = false;
            }

            if (!document.getElementById('province').value) {
                document.getElementById('provinceError').style.display = 'block';
                isValid = false;
            }

            const zipCode = document.getElementById('zipCode').value;
            if (zipCode.length !== 5) {
                document.getElementById('zipCodeError').style.display = 'block';
                isValid = false;
            }
            break;

        case 4:
            // Validate Step 4: Account Information
            const email = document.getElementById('email').value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                document.getElementById('emailError').style.display = 'block';
                isValid = false;
            }

            const username = document.getElementById('username').value;
            if (username.length < 4) {
                document.getElementById('usernameError').style.display = 'block';
                isValid = false;
            }

            const password = document.getElementById('password').value;
            if (password.length < 8) {
                document.getElementById('passwordError').style.display = 'block';
                isValid = false;
            }

            const confirmPassword = document.getElementById('confirmPassword').value;
            if (password !== confirmPassword) {
                document.getElementById('confirmPasswordError').style.display = 'block';
                isValid = false;
            }
            break;
    }

    if (!isValid) {
        // Scroll to first error
        const firstError = document.querySelector('.error-message[style*="block"]');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    return isValid;
}

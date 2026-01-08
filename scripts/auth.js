// ============================================
// AUTHENTICATION LOGIC
// Handles user registration, login, and logout
// ============================================

/**
 * Register new user
 * @param {Object} formData - Registration form data
 * @returns {Object} Result object with success and message
 */
function registerUser(formData) {
    try {
        // Validate form data
        const validation = validateRegistrationData(formData);
        if (!validation.valid) {
            return { success: false, message: validation.message };
        }

        // Create user
        const user = createUser({
            name: formData.name.trim(),
            email: formData.email.trim(),
            dob: formData.dob,
            password: formData.password
        });

        // Auto-login after registration
        createSession(user.id);

        return {
            success: true,
            message: 'Registration successful!',
            user: user
        };
    } catch (error) {
        return {
            success: false,
            message: error.message || 'Registration failed. Please try again.'
        };
    }
}

/**
 * Login user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Object} Result object with success and message
 */
function loginUser(email, password) {
    try {
        // HARDCODED TEST ACCOUNT FOR DEMO/TESTING
        // Allow testers to use this account when hosted on GitHub Pages
        if (email.toLowerCase() === 'demo@test.com' && password === 'demo123') {
            // Check if demo user exists, if not create it
            let demoUser = getUserByEmail('demo@test.com');

            if (!demoUser) {
                // Create demo user with sample progress
                demoUser = {
                    id: 'demo_user_id',
                    name: 'Demo Tester',
                    email: 'demo@test.com',
                    dob: '1995-01-01',
                    password: hashPassword('demo123'),
                    game1Score: 15,
                    game2Score: 12,
                    game3Score: 18,
                    game1Level: 3,
                    game2Level: 2,
                    game3Level: 4,
                    game1Completed: 5,
                    game2Completed: 4,
                    game3Completed: 6,
                    createdAt: new Date().toISOString()
                };

                // Save demo user
                const users = getAllUsers();
                users.push(demoUser);
                saveUsers(users);
            }

            // Create session for demo user
            createSession(demoUser.id);

            return {
                success: true,
                message: 'Demo login successful!',
                user: demoUser
            };
        }

        // Regular authentication flow
        // Get user by email
        const user = getUserByEmail(email);

        if (!user) {
            return {
                success: false,
                message: 'Invalid email or password'
            };
        }

        // Verify password
        if (!verifyPassword(password, user.password)) {
            return {
                success: false,
                message: 'Invalid email or password'
            };
        }

        // Create session
        createSession(user.id);

        return {
            success: true,
            message: 'Login successful!',
            user: user
        };
    } catch (error) {
        return {
            success: false,
            message: 'Login failed. Please try again.'
        };
    }
}

/**
 * Logout current user
 */
function logoutUser() {
    clearSession();
    window.location.href = 'index.html';
}

/**
 * Check authentication and redirect if needed
 * @param {boolean} requireAuth - Whether authentication is required
 */
function checkAuth(requireAuth = true) {
    const loggedIn = isLoggedIn();

    if (requireAuth && !loggedIn) {
        // Redirect to login if authentication required but not logged in
        window.location.href = 'index.html';
    } else if (!requireAuth && loggedIn) {
        // Redirect to dashboard if on login/register page but already logged in
        window.location.href = 'dashboard.html';
    }
}

/**
 * Validate registration form data
 * @param {Object} data - Form data
 * @returns {Object} Validation result
 */
function validateRegistrationData(data) {
    // Name validation
    if (!data.name || data.name.trim().length < 2) {
        return {
            valid: false,
            message: 'Name must be at least 2 characters long'
        };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        return {
            valid: false,
            message: 'Please enter a valid email address'
        };
    }

    // Date of birth validation
    if (!data.dob) {
        return {
            valid: false,
            message: 'Please enter your date of birth'
        };
    }

    const age = calculateAge(data.dob);
    if (age < 13) {
        return {
            valid: false,
            message: 'You must be at least 13 years old to register'
        };
    }

    // Password validation
    if (!data.password || data.password.length < 6) {
        return {
            valid: false,
            message: 'Password must be at least 6 characters long'
        };
    }

    // Confirm password validation
    if (data.password !== data.confirmPassword) {
        return {
            valid: false,
            message: 'Passwords do not match'
        };
    }

    return { valid: true };
}

/**
 * Show error message in form
 * @param {string} elementId - ID of error message element
 * @param {string} message - Error message
 */
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

/**
 * Hide error message
 * @param {string} elementId - ID of error message element
 */
function hideError(elementId) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

/**
 * Show loading state on button
 * @param {HTMLElement} button - Button element
 * @param {boolean} loading - Loading state
 */
function setButtonLoading(button, loading) {
    if (loading) {
        button.disabled = true;
        button.dataset.originalText = button.textContent;
        button.innerHTML = '<span class="spinner"></span> Processing...';
    } else {
        button.disabled = false;
        button.textContent = button.dataset.originalText || button.textContent;
    }
}

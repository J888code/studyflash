// Authentication Module
const Auth = {
    // Sign up with email and password
    async signUp(email, password, displayName) {
        try {
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);

            // Update display name
            await userCredential.user.updateProfile({
                displayName: displayName
            });

            // Create user document in Firestore
            await Database.createUserProfile(userCredential.user.uid, {
                email: email,
                displayName: displayName,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                subscription: 'free',
                coins: 100, // Starting coins
                xp: 0,
                level: 1,
                streak: 0,
                achievements: [],
                settings: {
                    theme: 'default',
                    soundEnabled: true,
                    notificationsEnabled: true
                }
            });

            return { success: true, user: userCredential.user };
        } catch (error) {
            console.error('Sign up error:', error);
            return { success: false, error: error.message };
        }
    },

    // Sign in with email and password
    async signIn(email, password) {
        try {
            const userCredential = await auth.signInWithEmailAndPassword(email, password);
            return { success: true, user: userCredential.user };
        } catch (error) {
            console.error('Sign in error:', error);
            return { success: false, error: error.message };
        }
    },

    // Sign in with Google
    async signInWithGoogle() {
        try {
            const provider = new firebase.auth.GoogleAuthProvider();
            const userCredential = await auth.signInWithPopup(provider);

            // Check if new user
            if (userCredential.additionalUserInfo.isNewUser) {
                await Database.createUserProfile(userCredential.user.uid, {
                    email: userCredential.user.email,
                    displayName: userCredential.user.displayName,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    subscription: 'free',
                    coins: 100,
                    xp: 0,
                    level: 1,
                    streak: 0,
                    achievements: [],
                    settings: {
                        theme: 'default',
                        soundEnabled: true,
                        notificationsEnabled: true
                    }
                });
            }

            return { success: true, user: userCredential.user };
        } catch (error) {
            console.error('Google sign in error:', error);
            return { success: false, error: error.message };
        }
    },

    // Sign out
    async signOut() {
        try {
            await auth.signOut();
            return { success: true };
        } catch (error) {
            console.error('Sign out error:', error);
            return { success: false, error: error.message };
        }
    },

    // Reset password
    async resetPassword(email) {
        try {
            await auth.sendPasswordResetEmail(email);
            return { success: true };
        } catch (error) {
            console.error('Password reset error:', error);
            return { success: false, error: error.message };
        }
    },

    // Get current user
    getCurrentUser() {
        return currentUser;
    },

    // Check if user is signed in
    isSignedIn() {
        return currentUser !== null;
    },

    // Called when user signs in
    async onUserSignedIn(user) {
        // Load user data from database
        await Database.loadUserData(user.uid);

        // Update UI
        this.updateAuthUI(true, user);

        // Check daily login
        await Database.checkDailyLogin(user.uid);
    },

    // Called when user signs out
    onUserSignedOut() {
        // Clear local data
        this.updateAuthUI(false, null);

        // Show login screen
        App.showView('auth');
    },

    // Update UI based on auth state
    updateAuthUI(isSignedIn, user) {
        const authView = document.getElementById('auth-view');
        const mainApp = document.querySelector('.app');
        const userNameEl = document.getElementById('user-display-name');
        const userAvatarEl = document.getElementById('user-avatar');

        if (isSignedIn && user) {
            if (authView) authView.style.display = 'none';
            if (mainApp) mainApp.style.display = 'block';
            if (userNameEl) userNameEl.textContent = user.displayName || 'Student';
            if (userAvatarEl && user.photoURL) {
                userAvatarEl.src = user.photoURL;
            }

            // Show dashboard
            if (typeof App !== 'undefined' && App.showView) {
                App.showView('dashboard');
            }
        } else {
            if (authView) authView.style.display = 'flex';
            if (mainApp) mainApp.style.display = 'none';
        }
    },

    // Initialize auth UI handlers
    initAuthUI() {
        // Login form
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const email = document.getElementById('login-email').value;
                const password = document.getElementById('login-password').value;

                const btn = loginForm.querySelector('button[type="submit"]');
                btn.disabled = true;
                btn.textContent = 'Signing in...';

                const result = await this.signIn(email, password);

                btn.disabled = false;
                btn.textContent = 'Sign In';

                if (!result.success) {
                    this.showAuthError('login-error', result.error);
                }
            });
        }

        // Signup form
        const signupForm = document.getElementById('signup-form');
        if (signupForm) {
            signupForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const name = document.getElementById('signup-name').value;
                const email = document.getElementById('signup-email').value;
                const password = document.getElementById('signup-password').value;
                const confirmPassword = document.getElementById('signup-confirm-password').value;

                if (password !== confirmPassword) {
                    this.showAuthError('signup-error', 'Passwords do not match');
                    return;
                }

                if (password.length < 6) {
                    this.showAuthError('signup-error', 'Password must be at least 6 characters');
                    return;
                }

                const btn = signupForm.querySelector('button[type="submit"]');
                btn.disabled = true;
                btn.textContent = 'Creating account...';

                const result = await this.signUp(email, password, name);

                btn.disabled = false;
                btn.textContent = 'Create Account';

                if (!result.success) {
                    this.showAuthError('signup-error', result.error);
                }
            });
        }

        // Google sign in buttons
        document.querySelectorAll('.google-signin-btn').forEach(btn => {
            btn.addEventListener('click', async () => {
                btn.disabled = true;
                const result = await this.signInWithGoogle();
                btn.disabled = false;

                if (!result.success) {
                    alert(result.error);
                }
            });
        });

        // Forgot password
        const forgotPasswordBtn = document.getElementById('forgot-password-btn');
        if (forgotPasswordBtn) {
            forgotPasswordBtn.addEventListener('click', async () => {
                const email = document.getElementById('login-email').value;
                if (!email) {
                    alert('Please enter your email address first');
                    return;
                }

                const result = await this.resetPassword(email);
                if (result.success) {
                    alert('Password reset email sent! Check your inbox.');
                } else {
                    alert(result.error);
                }
            });
        }

        // Toggle between login and signup
        const showSignupBtn = document.getElementById('show-signup');
        const showLoginBtn = document.getElementById('show-login');
        const loginSection = document.getElementById('login-section');
        const signupSection = document.getElementById('signup-section');

        if (showSignupBtn) {
            showSignupBtn.addEventListener('click', () => {
                loginSection.style.display = 'none';
                signupSection.style.display = 'block';
            });
        }

        if (showLoginBtn) {
            showLoginBtn.addEventListener('click', () => {
                signupSection.style.display = 'none';
                loginSection.style.display = 'block';
            });
        }

        // Logout button
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.signOut());
        }
    },

    // Show auth error message
    showAuthError(elementId, message) {
        const errorEl = document.getElementById(elementId);
        if (errorEl) {
            errorEl.textContent = message;
            errorEl.style.display = 'block';

            setTimeout(() => {
                errorEl.style.display = 'none';
            }, 5000);
        }
    }
};

// Initialize auth UI when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    Auth.initAuthUI();
});

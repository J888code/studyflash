// Stripe Payment Integration
const Payments = {
    // Stripe publishable key - Replace with your own
    stripeKey: 'pk_test_51Sooh5BUp6lJR18OQyeg2zLV72aVRFNqFoLPQwumLnwumwX0X6ofOSnXfaHDVMhoy6VglyMDAvkup89szrn5mbSJ00dEP1fkMy',
    stripe: null,

    // Price IDs from Stripe Dashboard
    PRICES: {
        monthly: 'price_1SopAVBUp6lJR18OZjVeI3m1',
        yearly: 'price_1SopBDBUp6lJR18O9SRS7eO1',
        lifetime: 'price_1SopBrBUp6lJR18OD2eSClya',
        coins_500: 'price_COINS_500_ID',
        coins_1200: 'price_COINS_1200_ID',
        coins_3000: 'price_COINS_3000_ID'
    },

    // Initialize Stripe
    init() {
        if (typeof Stripe !== 'undefined') {
            this.stripe = Stripe(this.stripeKey);
        }
    },

    // Create checkout session for subscription
    async createSubscription(priceId) {
        const user = Auth.getCurrentUser();
        if (!user) {
            alert('Please sign in to subscribe');
            return;
        }

        try {
            // In production, this calls your backend API
            const response = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    priceId: priceId,
                    userId: user.uid,
                    email: user.email,
                    mode: priceId === this.PRICES.lifetime ? 'payment' : 'subscription'
                })
            });

            const session = await response.json();

            // Redirect to Stripe Checkout
            const result = await this.stripe.redirectToCheckout({
                sessionId: session.id
            });

            if (result.error) {
                alert(result.error.message);
            }
        } catch (error) {
            console.error('Payment error:', error);
            // For demo purposes, simulate successful payment
            this.simulatePayment(priceId);
        }
    },

    // Purchase coins
    async purchaseCoins(priceId, coinAmount) {
        const user = Auth.getCurrentUser();
        if (!user) {
            alert('Please sign in to purchase coins');
            return;
        }

        try {
            const response = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    priceId: priceId,
                    userId: user.uid,
                    email: user.email,
                    mode: 'payment',
                    metadata: {
                        type: 'coins',
                        amount: coinAmount
                    }
                })
            });

            const session = await response.json();

            const result = await this.stripe.redirectToCheckout({
                sessionId: session.id
            });

            if (result.error) {
                alert(result.error.message);
            }
        } catch (error) {
            console.error('Payment error:', error);
            this.simulateCoinPurchase(coinAmount);
        }
    },

    // Cancel subscription
    async cancelSubscription() {
        const user = Auth.getCurrentUser();
        if (!user) return;

        if (!confirm('Are you sure you want to cancel your subscription? You will lose access to premium features at the end of your billing period.')) {
            return;
        }

        try {
            const response = await fetch('/api/cancel-subscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user.uid
                })
            });

            const result = await response.json();

            if (result.success) {
                alert('Your subscription has been cancelled. You will have access until the end of your billing period.');
            }
        } catch (error) {
            console.error('Cancel error:', error);
            alert('Could not cancel subscription. Please contact support.');
        }
    },

    // Restore purchases (for lifetime users)
    async restorePurchases() {
        const user = Auth.getCurrentUser();
        if (!user) {
            alert('Please sign in first');
            return;
        }

        try {
            const response = await fetch('/api/restore-purchases', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user.uid,
                    email: user.email
                })
            });

            const result = await response.json();

            if (result.restored) {
                await Database.updateUserData(user.uid, {
                    subscription: result.subscription
                });
                alert('Purchases restored successfully!');
                location.reload();
            } else {
                alert('No previous purchases found for this account.');
            }
        } catch (error) {
            console.error('Restore error:', error);
            alert('Could not restore purchases. Please contact support.');
        }
    },

    // Simulate payment for demo (remove in production)
    simulatePayment(priceId) {
        const user = Auth.getCurrentUser();
        if (!user) return;

        let subscription = 'free';
        let expiryDate = null;

        if (priceId === this.PRICES.monthly) {
            subscription = 'monthly';
            expiryDate = new Date();
            expiryDate.setMonth(expiryDate.getMonth() + 1);
        } else if (priceId === this.PRICES.yearly) {
            subscription = 'yearly';
            expiryDate = new Date();
            expiryDate.setFullYear(expiryDate.getFullYear() + 1);
        } else if (priceId === this.PRICES.lifetime) {
            subscription = 'lifetime';
        }

        Database.updateUserData(user.uid, {
            subscription: subscription,
            subscriptionExpiry: expiryDate
        });

        alert('Payment successful! Welcome to StudyFlash Premium!');
        SoundFX.play('achievement');
        Gamification.showNotification('Premium Activated!', 'Enjoy all premium features', 'achievement');

        // Close pricing modal and refresh
        App.closePricingModal();
        location.reload();
    },

    // Simulate coin purchase for demo
    simulateCoinPurchase(amount) {
        const user = Auth.getCurrentUser();
        if (!user) return;

        Database.updateUserData(user.uid, {
            coins: firebase.firestore.FieldValue.increment(amount)
        });

        alert(`Successfully purchased ${amount} coins!`);
        SoundFX.play('coin');
        Gamification.showNotification('Coins Added!', `+${amount} coins`, 'reward');
    },

    // Show subscription management
    showManageSubscription() {
        const modal = document.getElementById('manage-subscription-modal');
        if (modal) {
            modal.style.display = 'flex';
            this.loadSubscriptionDetails();
        }
    },

    // Load subscription details
    async loadSubscriptionDetails() {
        const user = Auth.getCurrentUser();
        if (!user) return;

        const status = await Database.checkSubscription(user.uid);
        const container = document.getElementById('subscription-details');

        if (!container) return;

        if (status.isPremium) {
            let expiryText = '';
            if (status.plan === 'lifetime') {
                expiryText = 'Never expires';
            } else if (status.expiresAt) {
                expiryText = `Renews on ${status.expiresAt.toLocaleDateString()}`;
            }

            container.innerHTML = `
                <div class="subscription-info">
                    <h3>Current Plan: ${status.plan.charAt(0).toUpperCase() + status.plan.slice(1)}</h3>
                    <p>${expiryText}</p>
                    ${status.plan !== 'lifetime' ? `
                        <button class="btn btn-secondary" onclick="Payments.cancelSubscription()">
                            Cancel Subscription
                        </button>
                    ` : ''}
                </div>
            `;
        } else {
            container.innerHTML = `
                <div class="subscription-info">
                    <h3>Current Plan: Free</h3>
                    <p>Upgrade to Premium for unlimited access!</p>
                    <button class="btn btn-primary" onclick="App.showPricing()">
                        View Plans
                    </button>
                </div>
            `;
        }
    }
};

// Initialize payments when Stripe is loaded
document.addEventListener('DOMContentLoaded', () => {
    Payments.init();
});

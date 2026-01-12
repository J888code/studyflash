// StudyFlash Backend Server
// This handles Stripe payments and webhooks

const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const admin = require('firebase-admin');

const app = express();

// Initialize Firebase Admin
admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
    })
});

const db = admin.firestore();

// Middleware
app.use(cors());
app.use(express.json());

// Stripe webhook needs raw body
app.use('/webhook', express.raw({ type: 'application/json' }));

// Your domain
const DOMAIN = process.env.DOMAIN || 'http://localhost:3000';

// Price IDs - Set these in Stripe Dashboard
const PRICES = {
    monthly: process.env.STRIPE_MONTHLY_PRICE_ID,
    yearly: process.env.STRIPE_YEARLY_PRICE_ID,
    lifetime: process.env.STRIPE_LIFETIME_PRICE_ID,
    coins_500: process.env.STRIPE_COINS_500_PRICE_ID,
    coins_1200: process.env.STRIPE_COINS_1200_PRICE_ID,
    coins_3000: process.env.STRIPE_COINS_3000_PRICE_ID
};

// Create Checkout Session
app.post('/api/create-checkout-session', async (req, res) => {
    try {
        const { priceId, userId, email, mode, metadata } = req.body;

        const sessionConfig = {
            customer_email: email,
            line_items: [{
                price: priceId,
                quantity: 1
            }],
            mode: mode || 'subscription',
            success_url: `${DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${DOMAIN}/cancel`,
            metadata: {
                userId: userId,
                ...metadata
            }
        };

        // For subscriptions, allow customer to manage later
        if (mode === 'subscription') {
            sessionConfig.subscription_data = {
                metadata: { userId }
            };
        }

        const session = await stripe.checkout.sessions.create(sessionConfig);

        res.json({ id: session.id });
    } catch (error) {
        console.error('Checkout error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Cancel Subscription
app.post('/api/cancel-subscription', async (req, res) => {
    try {
        const { userId } = req.body;

        // Get user's subscription ID from Firestore
        const userDoc = await db.collection('users').doc(userId).get();
        const userData = userDoc.data();

        if (!userData?.stripeSubscriptionId) {
            return res.status(400).json({ error: 'No active subscription found' });
        }

        // Cancel at period end (user keeps access until end of billing period)
        await stripe.subscriptions.update(userData.stripeSubscriptionId, {
            cancel_at_period_end: true
        });

        res.json({ success: true });
    } catch (error) {
        console.error('Cancel error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Restore Purchases
app.post('/api/restore-purchases', async (req, res) => {
    try {
        const { userId, email } = req.body;

        // Search for customer in Stripe
        const customers = await stripe.customers.list({
            email: email,
            limit: 1
        });

        if (customers.data.length === 0) {
            return res.json({ restored: false });
        }

        const customer = customers.data[0];

        // Check for active subscriptions
        const subscriptions = await stripe.subscriptions.list({
            customer: customer.id,
            status: 'active'
        });

        if (subscriptions.data.length > 0) {
            const sub = subscriptions.data[0];
            const plan = sub.items.data[0].price.id === PRICES.yearly ? 'yearly' : 'monthly';

            await db.collection('users').doc(userId).update({
                subscription: plan,
                stripeCustomerId: customer.id,
                stripeSubscriptionId: sub.id,
                subscriptionExpiry: admin.firestore.Timestamp.fromDate(
                    new Date(sub.current_period_end * 1000)
                )
            });

            return res.json({ restored: true, subscription: plan });
        }

        // Check for lifetime purchase
        const charges = await stripe.charges.list({
            customer: customer.id,
            limit: 100
        });

        const lifetimePurchase = charges.data.find(charge =>
            charge.paid && charge.metadata?.type === 'lifetime'
        );

        if (lifetimePurchase) {
            await db.collection('users').doc(userId).update({
                subscription: 'lifetime',
                stripeCustomerId: customer.id
            });

            return res.json({ restored: true, subscription: 'lifetime' });
        }

        res.json({ restored: false });
    } catch (error) {
        console.error('Restore error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Stripe Webhook Handler
app.post('/webhook', async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
        console.error('Webhook signature verification failed:', err);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed': {
            const session = event.data.object;
            await handleCheckoutComplete(session);
            break;
        }

        case 'customer.subscription.updated':
        case 'customer.subscription.deleted': {
            const subscription = event.data.object;
            await handleSubscriptionChange(subscription);
            break;
        }

        case 'invoice.payment_succeeded': {
            const invoice = event.data.object;
            await handleInvoicePaid(invoice);
            break;
        }

        case 'invoice.payment_failed': {
            const invoice = event.data.object;
            await handlePaymentFailed(invoice);
            break;
        }

        default:
            console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
});

// Handle successful checkout
async function handleCheckoutComplete(session) {
    const userId = session.metadata.userId;

    if (!userId) {
        console.error('No userId in session metadata');
        return;
    }

    const updateData = {
        stripeCustomerId: session.customer
    };

    // Check if it's a subscription or one-time payment
    if (session.mode === 'subscription') {
        const subscription = await stripe.subscriptions.retrieve(session.subscription);
        const priceId = subscription.items.data[0].price.id;

        updateData.subscription = priceId === PRICES.yearly ? 'yearly' : 'monthly';
        updateData.stripeSubscriptionId = session.subscription;
        updateData.subscriptionExpiry = admin.firestore.Timestamp.fromDate(
            new Date(subscription.current_period_end * 1000)
        );
    } else if (session.mode === 'payment') {
        // One-time payment (lifetime or coins)
        if (session.metadata.type === 'coins') {
            const coinAmount = parseInt(session.metadata.amount) || 0;
            updateData.coins = admin.firestore.FieldValue.increment(coinAmount);
        } else {
            // Lifetime purchase
            updateData.subscription = 'lifetime';
        }
    }

    await db.collection('users').doc(userId).update(updateData);
    console.log(`Updated user ${userId}:`, updateData);
}

// Handle subscription changes
async function handleSubscriptionChange(subscription) {
    const userId = subscription.metadata.userId;

    if (!userId) return;

    if (subscription.status === 'active') {
        const priceId = subscription.items.data[0].price.id;
        await db.collection('users').doc(userId).update({
            subscription: priceId === PRICES.yearly ? 'yearly' : 'monthly',
            subscriptionExpiry: admin.firestore.Timestamp.fromDate(
                new Date(subscription.current_period_end * 1000)
            )
        });
    } else if (['canceled', 'unpaid'].includes(subscription.status)) {
        await db.collection('users').doc(userId).update({
            subscription: 'free',
            subscriptionExpiry: null
        });
    }
}

// Handle successful invoice payment (subscription renewal)
async function handleInvoicePaid(invoice) {
    if (invoice.subscription) {
        const subscription = await stripe.subscriptions.retrieve(invoice.subscription);
        await handleSubscriptionChange(subscription);
    }
}

// Handle failed payment
async function handlePaymentFailed(invoice) {
    const userId = invoice.metadata?.userId;
    if (!userId) return;

    // You could send an email notification here
    console.log(`Payment failed for user ${userId}`);
}

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

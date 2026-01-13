// StudyFlash Backend Server - Simplified
// Handles Stripe payments only

const express = require('express');
const cors = require('cors');

const app = express();

// Initialize Stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Middleware
app.use(cors());
app.use(express.json());

// Your domain
const DOMAIN = process.env.DOMAIN || 'https://j888code.github.io/studyflash';

// Create Checkout Session
app.post('/api/create-checkout-session', async (req, res) => {
    try {
        const { priceId, userId, email, mode } = req.body;

        const session = await stripe.checkout.sessions.create({
            customer_email: email,
            line_items: [{
                price: priceId,
                quantity: 1
            }],
            mode: mode || 'subscription',
            success_url: `${DOMAIN}?payment=success`,
            cancel_url: `${DOMAIN}?payment=cancelled`,
            metadata: {
                userId: userId
            }
        });

        res.json({ id: session.id, url: session.url });
    } catch (error) {
        console.error('Checkout error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Health check
app.get('/', (req, res) => {
    res.json({ status: 'StudyFlash server is running!' });
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

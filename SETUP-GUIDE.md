# StudyFlash - Complete Setup Guide

Follow these steps to deploy your StudyFlash app to production.

---

## STEP 1: Create Firebase Project (Free)

### 1.1 Go to Firebase Console
1. Open https://console.firebase.google.com/
2. Click "Create a project" (or "Add project")
3. Enter project name: `studyflash` (or your preferred name)
4. Disable Google Analytics (optional, can enable later)
5. Click "Create project"

### 1.2 Enable Authentication
1. In Firebase Console, click "Authentication" in left sidebar
2. Click "Get started"
3. Click "Email/Password" → Enable it → Save
4. Click "Google" → Enable it → Add your email as support email → Save

### 1.3 Create Firestore Database
1. Click "Firestore Database" in left sidebar
2. Click "Create database"
3. Select "Start in production mode"
4. Choose location closest to your users (e.g., `europe-west2` for UK)
5. Click "Enable"

### 1.4 Set Firestore Security Rules
1. In Firestore, click "Rules" tab
2. Replace with these rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;

      // Subcollections (decks, cards, etc.)
      match /{subcollection}/{document=**} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }

    // Public leaderboard (read-only for everyone)
    match /leaderboard/{entry} {
      allow read: if true;
      allow write: if false; // Only server can write
    }
  }
}
```

3. Click "Publish"

### 1.5 Get Firebase Config
1. Click the gear icon → "Project settings"
2. Scroll down to "Your apps"
3. Click the web icon (`</>`)
4. Enter app nickname: `StudyFlash Web`
5. Click "Register app"
6. Copy the `firebaseConfig` object - you'll need this!

### 1.6 Get Service Account Key (for backend)
1. In Project Settings, click "Service accounts" tab
2. Click "Generate new private key"
3. Save the JSON file securely (NEVER share this!)

---

## STEP 2: Set Up Stripe (Payments)

### 2.1 Create Stripe Account
1. Go to https://stripe.com
2. Click "Start now" and create account
3. Verify your email
4. Complete business profile (can use personal details for testing)

### 2.2 Get API Keys
1. In Stripe Dashboard, click "Developers" → "API keys"
2. Copy your "Publishable key" (starts with `pk_test_`)
3. Copy your "Secret key" (starts with `sk_test_`)

### 2.3 Create Products and Prices
1. Click "Products" in Stripe Dashboard
2. Create these products:

**Product 1: Monthly Subscription**
- Name: StudyFlash Pro Monthly
- Price: £4.99/month (recurring)
- Copy the Price ID (starts with `price_`)

**Product 2: Yearly Subscription**
- Name: StudyFlash Pro Yearly
- Price: £39.99/year (recurring)
- Copy the Price ID

**Product 3: Lifetime Access**
- Name: StudyFlash Pro Lifetime
- Price: £79.99 (one-time)
- Copy the Price ID

**Product 4-6: Coin Packs** (optional)
- 500 coins: £1.99
- 1200 coins: £3.99
- 3000 coins: £7.99

### 2.4 Set Up Webhook
1. Click "Developers" → "Webhooks"
2. Click "Add endpoint"
3. Enter your server URL: `https://your-server.com/webhook`
4. Select events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Click "Add endpoint"
6. Copy the "Signing secret" (starts with `whsec_`)

---

## STEP 3: Update Your Code

### 3.1 Update Firebase Config
Open `js/firebase-config.js` and replace with your config:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef"
};
```

### 3.2 Update Stripe Publishable Key
Open `js/payments.js` and update:

```javascript
stripeKey: 'pk_test_YOUR_PUBLISHABLE_KEY',
```

### 3.3 Update Price IDs
In `js/payments.js`, update the PRICES object with your Price IDs from Stripe.

---

## STEP 4: Deploy Frontend (Free on Vercel)

### 4.1 Create GitHub Repository
1. Go to https://github.com and sign in/create account
2. Click "New repository"
3. Name it `studyflash`
4. Keep it public (or private if you prefer)
5. Click "Create repository"

### 4.2 Push Code to GitHub
Open terminal in your project folder:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/studyflash.git
git push -u origin main
```

### 4.3 Deploy to Vercel
1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "New Project"
4. Import your `studyflash` repository
5. Click "Deploy"
6. Your site is now live at `studyflash.vercel.app`!

### 4.4 Add Custom Domain
1. In Vercel, go to your project → Settings → Domains
2. Add your domain (e.g., `studyflash.com`)
3. Follow instructions to update DNS settings at your domain registrar

---

## STEP 5: Deploy Backend Server

### Option A: Deploy to Railway (Easiest)

1. Go to https://railway.app and sign up with GitHub
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository, then select the `server` folder
4. Add environment variables (from `.env.example`):
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_CLIENT_EMAIL`
   - `FIREBASE_PRIVATE_KEY`
   - `DOMAIN` (your Vercel URL)
5. Railway will auto-deploy
6. Copy your Railway URL (e.g., `studyflash-server.railway.app`)

### Option B: Deploy to Render (Free Tier)

1. Go to https://render.com and sign up
2. Click "New Web Service"
3. Connect your GitHub repo
4. Set root directory: `server`
5. Build command: `npm install`
6. Start command: `npm start`
7. Add environment variables
8. Click "Create Web Service"

### 5.1 Update Frontend API URL
After deploying backend, update `js/payments.js`:

```javascript
// Change from '/api/create-checkout-session' to your full URL:
const response = await fetch('https://your-server.railway.app/api/create-checkout-session', {
```

---

## STEP 6: Go Live with Stripe

When ready for real payments:

1. In Stripe Dashboard, click "Activate your account"
2. Complete verification (ID, bank details, etc.)
3. Replace test keys with live keys:
   - `pk_test_xxx` → `pk_live_xxx`
   - `sk_test_xxx` → `sk_live_xxx`
4. Create live webhook endpoint
5. Update all Price IDs to live versions

---

## STEP 7: Final Checklist

- [ ] Firebase project created
- [ ] Authentication enabled (Email + Google)
- [ ] Firestore database created with security rules
- [ ] Firebase config added to `firebase-config.js`
- [ ] Stripe account created
- [ ] Products and prices created in Stripe
- [ ] Webhook endpoint configured
- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Railway/Render
- [ ] Custom domain connected (optional)
- [ ] Privacy Policy email updated (`privacy@studyflash.com`)
- [ ] Terms of Service email updated (`support@studyflash.com`)
- [ ] Tested: Sign up, sign in, create deck, study cards
- [ ] Tested: Payment flow (use Stripe test card: `4242 4242 4242 4242`)

---

## Useful Links

- Firebase Console: https://console.firebase.google.com/
- Stripe Dashboard: https://dashboard.stripe.com/
- Vercel Dashboard: https://vercel.com/dashboard
- Railway Dashboard: https://railway.app/dashboard

## Test Card Numbers (Stripe Test Mode)

- **Successful payment**: `4242 4242 4242 4242`
- **Declined card**: `4000 0000 0000 0002`
- **Requires authentication**: `4000 0025 0000 3155`

Use any future expiry date and any 3-digit CVC.

---

## Troubleshooting

### "Firebase not initialized"
- Make sure firebase-config.js is loaded before other scripts
- Check that your config values are correct

### "Stripe checkout not working"
- Check browser console for errors
- Verify your publishable key is correct
- Make sure backend server is running

### "Can't sign in with Google"
- Enable Google auth in Firebase Console
- Add your domain to authorized domains in Firebase > Authentication > Settings

### "Payments work in test but not live"
- Replace ALL test keys with live keys
- Create live products/prices (test ones don't work in live mode)
- Complete Stripe account verification

---

## Monthly Costs Estimate

| Service | Free Tier | Paid |
|---------|-----------|------|
| Vercel (frontend) | 100GB bandwidth | $20/mo for more |
| Railway (backend) | $5 free credit | $5-20/mo |
| Firebase | 50K reads/day | $0.06/100K reads |
| Stripe | N/A | 2.9% + 30p per transaction |
| Domain | N/A | £10-15/year |

**Estimated total: £0-10/month** until you have significant traffic.

---

Need help? Create an issue on GitHub or email support@studyflash.com

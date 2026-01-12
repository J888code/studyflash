// Database Module - Firestore Integration
const Database = {
    userData: null,
    userDecks: [],

    // Create user profile
    async createUserProfile(uid, data) {
        try {
            await db.collection('users').doc(uid).set(data);
            return { success: true };
        } catch (error) {
            console.error('Error creating user profile:', error);
            return { success: false, error: error.message };
        }
    },

    // Load user data
    async loadUserData(uid) {
        try {
            const doc = await db.collection('users').doc(uid).get();
            if (doc.exists) {
                this.userData = doc.data();

                // Update gamification with user data
                Gamification.stats = {
                    xp: this.userData.xp || 0,
                    level: this.userData.level || 1,
                    streak: this.userData.streak || 0,
                    totalCardsStudied: this.userData.totalCardsStudied || 0,
                    totalStudyTime: this.userData.totalStudyTime || 0,
                    achievements: this.userData.achievements || [],
                    coins: this.userData.coins || 0
                };

                // Load decks
                await this.loadUserDecks(uid);

                return { success: true, data: this.userData };
            }
            return { success: false, error: 'User profile not found' };
        } catch (error) {
            console.error('Error loading user data:', error);
            return { success: false, error: error.message };
        }
    },

    // Update user data
    async updateUserData(uid, data) {
        try {
            await db.collection('users').doc(uid).update(data);
            Object.assign(this.userData, data);
            return { success: true };
        } catch (error) {
            console.error('Error updating user data:', error);
            return { success: false, error: error.message };
        }
    },

    // Load user's decks
    async loadUserDecks(uid) {
        try {
            // Load user's custom decks
            const customDecks = await db.collection('users').doc(uid)
                .collection('decks').get();

            this.userDecks = [];
            customDecks.forEach(doc => {
                this.userDecks.push({
                    id: doc.id,
                    ...doc.data(),
                    isCustom: true
                });
            });

            // Also include pre-made decks from data.js
            // These are loaded from the static GCSEData object

            return { success: true, decks: this.userDecks };
        } catch (error) {
            console.error('Error loading decks:', error);
            return { success: false, error: error.message };
        }
    },

    // Create a new deck
    async createDeck(deckData) {
        const uid = Auth.getCurrentUser()?.uid;
        if (!uid) return { success: false, error: 'Not signed in' };

        try {
            const deckRef = await db.collection('users').doc(uid)
                .collection('decks').add({
                    ...deckData,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                    cardCount: 0
                });

            const newDeck = {
                id: deckRef.id,
                ...deckData,
                isCustom: true,
                cardCount: 0
            };

            this.userDecks.push(newDeck);

            return { success: true, deck: newDeck };
        } catch (error) {
            console.error('Error creating deck:', error);
            return { success: false, error: error.message };
        }
    },

    // Update a deck
    async updateDeck(deckId, data) {
        const uid = Auth.getCurrentUser()?.uid;
        if (!uid) return { success: false, error: 'Not signed in' };

        try {
            await db.collection('users').doc(uid)
                .collection('decks').doc(deckId).update({
                    ...data,
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                });

            // Update local cache
            const deckIndex = this.userDecks.findIndex(d => d.id === deckId);
            if (deckIndex !== -1) {
                Object.assign(this.userDecks[deckIndex], data);
            }

            return { success: true };
        } catch (error) {
            console.error('Error updating deck:', error);
            return { success: false, error: error.message };
        }
    },

    // Delete a deck
    async deleteDeck(deckId) {
        const uid = Auth.getCurrentUser()?.uid;
        if (!uid) return { success: false, error: 'Not signed in' };

        try {
            // Delete all cards in the deck first
            const cards = await db.collection('users').doc(uid)
                .collection('decks').doc(deckId)
                .collection('cards').get();

            const batch = db.batch();
            cards.forEach(doc => batch.delete(doc.ref));
            await batch.commit();

            // Delete the deck
            await db.collection('users').doc(uid)
                .collection('decks').doc(deckId).delete();

            // Update local cache
            this.userDecks = this.userDecks.filter(d => d.id !== deckId);

            return { success: true };
        } catch (error) {
            console.error('Error deleting deck:', error);
            return { success: false, error: error.message };
        }
    },

    // Add card to deck
    async addCard(deckId, cardData) {
        const uid = Auth.getCurrentUser()?.uid;
        if (!uid) return { success: false, error: 'Not signed in' };

        try {
            const cardRef = await db.collection('users').doc(uid)
                .collection('decks').doc(deckId)
                .collection('cards').add({
                    ...cardData,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    // Spaced repetition fields
                    easeFactor: 2.5,
                    interval: 0,
                    repetitions: 0,
                    nextReview: firebase.firestore.FieldValue.serverTimestamp(),
                    lastReview: null
                });

            // Update deck card count
            await db.collection('users').doc(uid)
                .collection('decks').doc(deckId).update({
                    cardCount: firebase.firestore.FieldValue.increment(1)
                });

            return { success: true, cardId: cardRef.id };
        } catch (error) {
            console.error('Error adding card:', error);
            return { success: false, error: error.message };
        }
    },

    // Get cards for a deck
    async getCards(deckId, isPreMade = false) {
        const uid = Auth.getCurrentUser()?.uid;

        try {
            if (isPreMade) {
                // Return pre-made cards from GCSEData
                const deck = GCSEData.decks.find(d => d.id === deckId);
                return { success: true, cards: deck?.cards || [] };
            }

            if (!uid) return { success: false, error: 'Not signed in' };

            const snapshot = await db.collection('users').doc(uid)
                .collection('decks').doc(deckId)
                .collection('cards').get();

            const cards = [];
            snapshot.forEach(doc => {
                cards.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            return { success: true, cards };
        } catch (error) {
            console.error('Error getting cards:', error);
            return { success: false, error: error.message };
        }
    },

    // Update card (after review)
    async updateCard(deckId, cardId, data) {
        const uid = Auth.getCurrentUser()?.uid;
        if (!uid) return { success: false, error: 'Not signed in' };

        try {
            await db.collection('users').doc(uid)
                .collection('decks').doc(deckId)
                .collection('cards').doc(cardId).update(data);

            return { success: true };
        } catch (error) {
            console.error('Error updating card:', error);
            return { success: false, error: error.message };
        }
    },

    // Delete card
    async deleteCard(deckId, cardId) {
        const uid = Auth.getCurrentUser()?.uid;
        if (!uid) return { success: false, error: 'Not signed in' };

        try {
            await db.collection('users').doc(uid)
                .collection('decks').doc(deckId)
                .collection('cards').doc(cardId).delete();

            // Update deck card count
            await db.collection('users').doc(uid)
                .collection('decks').doc(deckId).update({
                    cardCount: firebase.firestore.FieldValue.increment(-1)
                });

            return { success: true };
        } catch (error) {
            console.error('Error deleting card:', error);
            return { success: false, error: error.message };
        }
    },

    // Get cards due for review
    async getDueCards(deckId = null) {
        const uid = Auth.getCurrentUser()?.uid;
        if (!uid) return { success: false, error: 'Not signed in' };

        try {
            const now = new Date();
            let dueCards = [];

            if (deckId) {
                // Get due cards from specific deck
                const snapshot = await db.collection('users').doc(uid)
                    .collection('decks').doc(deckId)
                    .collection('cards')
                    .where('nextReview', '<=', now)
                    .get();

                snapshot.forEach(doc => {
                    dueCards.push({
                        id: doc.id,
                        deckId: deckId,
                        ...doc.data()
                    });
                });
            } else {
                // Get due cards from all decks
                for (const deck of this.userDecks) {
                    const snapshot = await db.collection('users').doc(uid)
                        .collection('decks').doc(deck.id)
                        .collection('cards')
                        .where('nextReview', '<=', now)
                        .get();

                    snapshot.forEach(doc => {
                        dueCards.push({
                            id: doc.id,
                            deckId: deck.id,
                            deckName: deck.name,
                            ...doc.data()
                        });
                    });
                }
            }

            return { success: true, cards: dueCards };
        } catch (error) {
            console.error('Error getting due cards:', error);
            return { success: false, error: error.message };
        }
    },

    // Save study session
    async saveStudySession(sessionData) {
        const uid = Auth.getCurrentUser()?.uid;
        if (!uid) return { success: false, error: 'Not signed in' };

        try {
            await db.collection('users').doc(uid)
                .collection('studySessions').add({
                    ...sessionData,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                });

            // Update user stats
            await this.updateUserData(uid, {
                totalCardsStudied: firebase.firestore.FieldValue.increment(sessionData.cardsStudied || 0),
                totalStudyTime: firebase.firestore.FieldValue.increment(sessionData.duration || 0),
                xp: firebase.firestore.FieldValue.increment(sessionData.xpEarned || 0)
            });

            return { success: true };
        } catch (error) {
            console.error('Error saving study session:', error);
            return { success: false, error: error.message };
        }
    },

    // Check daily login
    async checkDailyLogin(uid) {
        try {
            const userDoc = await db.collection('users').doc(uid).get();
            const userData = userDoc.data();

            const lastLogin = userData.lastLoginDate?.toDate();
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (!lastLogin || lastLogin < today) {
                // New day login
                const yesterday = new Date(today);
                yesterday.setDate(yesterday.getDate() - 1);

                let newStreak = 1;
                if (lastLogin && lastLogin >= yesterday) {
                    // Consecutive day
                    newStreak = (userData.streak || 0) + 1;
                }

                // Calculate daily reward
                const rewardCoins = Math.min(10 + (newStreak * 5), 100);

                await this.updateUserData(uid, {
                    lastLoginDate: firebase.firestore.FieldValue.serverTimestamp(),
                    streak: newStreak,
                    coins: firebase.firestore.FieldValue.increment(rewardCoins)
                });

                // Show daily reward notification
                Gamification.showNotification(
                    `Day ${newStreak} Streak!`,
                    `+${rewardCoins} coins`,
                    'reward'
                );

                return { success: true, streak: newStreak, reward: rewardCoins };
            }

            return { success: true, alreadyLoggedIn: true };
        } catch (error) {
            console.error('Error checking daily login:', error);
            return { success: false, error: error.message };
        }
    },

    // Get leaderboard
    async getLeaderboard(limit = 20) {
        try {
            const snapshot = await db.collection('users')
                .orderBy('xp', 'desc')
                .limit(limit)
                .get();

            const leaderboard = [];
            let rank = 1;

            snapshot.forEach(doc => {
                const data = doc.data();
                leaderboard.push({
                    rank: rank++,
                    displayName: data.displayName || 'Anonymous',
                    xp: data.xp || 0,
                    level: data.level || 1,
                    isCurrentUser: doc.id === Auth.getCurrentUser()?.uid
                });
            });

            return { success: true, leaderboard };
        } catch (error) {
            console.error('Error getting leaderboard:', error);
            return { success: false, error: error.message };
        }
    },

    // Get study calendar data
    async getStudyCalendar(uid, months = 6) {
        try {
            const startDate = new Date();
            startDate.setMonth(startDate.getMonth() - months);

            const snapshot = await db.collection('users').doc(uid)
                .collection('studySessions')
                .where('timestamp', '>=', startDate)
                .get();

            const calendarData = {};

            snapshot.forEach(doc => {
                const data = doc.data();
                const date = data.timestamp.toDate().toISOString().split('T')[0];

                if (!calendarData[date]) {
                    calendarData[date] = {
                        cardsStudied: 0,
                        studyTime: 0
                    };
                }

                calendarData[date].cardsStudied += data.cardsStudied || 0;
                calendarData[date].studyTime += data.duration || 0;
            });

            return { success: true, calendar: calendarData };
        } catch (error) {
            console.error('Error getting study calendar:', error);
            return { success: false, error: error.message };
        }
    },

    // Check subscription status
    async checkSubscription(uid) {
        try {
            const doc = await db.collection('users').doc(uid).get();
            const userData = doc.data();

            if (userData.subscription === 'free') {
                return { isPremium: false, plan: 'free' };
            }

            // Check if subscription is still valid
            if (userData.subscriptionExpiry) {
                const expiry = userData.subscriptionExpiry.toDate();
                if (expiry > new Date()) {
                    return {
                        isPremium: true,
                        plan: userData.subscription,
                        expiresAt: expiry
                    };
                } else {
                    // Subscription expired
                    await this.updateUserData(uid, { subscription: 'free' });
                    return { isPremium: false, plan: 'free', expired: true };
                }
            }

            // Lifetime subscription
            if (userData.subscription === 'lifetime') {
                return { isPremium: true, plan: 'lifetime' };
            }

            return { isPremium: false, plan: 'free' };
        } catch (error) {
            console.error('Error checking subscription:', error);
            return { isPremium: false, plan: 'free', error: error.message };
        }
    }
};

// Storage Layer - LocalStorage helpers
const Storage = {
    KEYS: {
        DECKS: 'studyflash_decks',
        STATS: 'studyflash_stats',
        SETTINGS: 'studyflash_settings'
    },

    // Get data from localStorage
    get(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('Storage get error:', e);
            return null;
        }
    },

    // Save data to localStorage
    set(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (e) {
            console.error('Storage set error:', e);
            return false;
        }
    },

    // Remove data from localStorage
    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('Storage remove error:', e);
            return false;
        }
    },

    // Get all decks
    getDecks() {
        return this.get(this.KEYS.DECKS) || [];
    },

    // Save all decks
    saveDecks(decks) {
        return this.set(this.KEYS.DECKS, decks);
    },

    // Get a single deck by ID
    getDeck(deckId) {
        const decks = this.getDecks();
        return decks.find(d => d.id === deckId);
    },

    // Save a single deck (add or update)
    saveDeck(deck) {
        const decks = this.getDecks();
        const index = decks.findIndex(d => d.id === deck.id);

        if (index >= 0) {
            decks[index] = deck;
        } else {
            decks.push(deck);
        }

        return this.saveDecks(decks);
    },

    // Delete a deck
    deleteDeck(deckId) {
        const decks = this.getDecks();
        const filtered = decks.filter(d => d.id !== deckId);
        return this.saveDecks(filtered);
    },

    // Get stats
    getStats() {
        return this.get(this.KEYS.STATS) || {
            totalReviews: 0,
            quizzesTaken: 0,
            correctAnswers: 0,
            totalQuizQuestions: 0,
            lastStudyDate: null,
            streak: 0,
            bestStreak: 0
        };
    },

    // Save stats
    saveStats(stats) {
        return this.set(this.KEYS.STATS, stats);
    },

    // Update streak
    updateStreak() {
        const stats = this.getStats();
        const today = new Date().toDateString();
        const lastDate = stats.lastStudyDate ? new Date(stats.lastStudyDate).toDateString() : null;

        if (lastDate === today) {
            // Already studied today
            return stats.streak;
        }

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        if (lastDate === yesterday.toDateString()) {
            // Studied yesterday, continue streak
            stats.streak++;
        } else if (lastDate !== today) {
            // Missed a day, reset streak
            stats.streak = 1;
        }

        if (stats.streak > stats.bestStreak) {
            stats.bestStreak = stats.streak;
        }

        stats.lastStudyDate = new Date().toISOString();
        this.saveStats(stats);

        return stats.streak;
    },

    // Record a review
    recordReview() {
        const stats = this.getStats();
        stats.totalReviews++;
        this.updateStreak();
        this.saveStats(stats);
    },

    // Record quiz results
    recordQuiz(correct, total) {
        const stats = this.getStats();
        stats.quizzesTaken++;
        stats.correctAnswers += correct;
        stats.totalQuizQuestions += total;
        this.saveStats(stats);
    },

    // Generate unique ID
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
};

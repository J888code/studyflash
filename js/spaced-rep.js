// Spaced Repetition - SM-2 Algorithm Implementation
const SpacedRep = {
    // Quality ratings:
    // 1 = Hard (complete blackout, wrong answer)
    // 3 = Medium (correct with difficulty)
    // 5 = Easy (perfect response)

    // Calculate next review based on SM-2 algorithm
    calculateNextReview(card, quality) {
        // Ensure quality is in valid range (1-5)
        quality = Math.max(1, Math.min(5, quality));

        let { easeFactor, interval, repetitions } = card;

        // If quality < 3, reset (card was forgotten)
        if (quality < 3) {
            repetitions = 0;
            interval = 0;
        } else {
            // Calculate new ease factor
            // EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
            easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));

            // EF cannot go below 1.3
            easeFactor = Math.max(1.3, easeFactor);

            // Calculate interval
            if (repetitions === 0) {
                interval = 1; // First successful review: 1 day
            } else if (repetitions === 1) {
                interval = 6; // Second successful review: 6 days
            } else {
                interval = Math.round(interval * easeFactor);
            }

            repetitions++;
        }

        // Calculate next review date
        const nextReview = new Date();
        nextReview.setDate(nextReview.getDate() + interval);

        return {
            easeFactor: Math.round(easeFactor * 100) / 100, // Round to 2 decimal places
            interval,
            repetitions,
            nextReview: nextReview.toISOString(),
            lastReview: new Date().toISOString()
        };
    },

    // Review a card and update its spaced repetition data
    reviewCard(deckId, cardId, quality) {
        const deck = Storage.getDeck(deckId);
        if (!deck) return null;

        const cardIndex = deck.cards.findIndex(c => c.id === cardId);
        if (cardIndex === -1) return null;

        const card = deck.cards[cardIndex];
        const newData = this.calculateNextReview(card, quality);

        // Update card with new spaced repetition data
        Object.assign(deck.cards[cardIndex], newData);
        Storage.saveDeck(deck);

        // Record the review in stats
        Storage.recordReview();

        return deck.cards[cardIndex];
    },

    // Get cards sorted by priority (most urgent first)
    getPriorityQueue(deckId) {
        const deck = Storage.getDeck(deckId);
        if (!deck) return [];

        const now = new Date();

        return deck.cards
            .map(card => ({
                ...card,
                priority: this.calculatePriority(card, now)
            }))
            .sort((a, b) => b.priority - a.priority);
    },

    // Calculate priority score for a card
    calculatePriority(card, now) {
        // New cards have highest priority
        if (!card.nextReview) return 1000;

        const nextReview = new Date(card.nextReview);
        const daysDue = (now - nextReview) / (1000 * 60 * 60 * 24);

        // Cards overdue by more days have higher priority
        if (daysDue > 0) {
            return 500 + daysDue * 10;
        }

        // Cards due soon have medium priority
        if (daysDue > -1) {
            return 100;
        }

        // Future cards have low priority
        return 0;
    },

    // Get study session cards (mix of due and new)
    getStudySession(deckId, maxCards = 20) {
        const deck = Storage.getDeck(deckId);
        if (!deck) return [];

        const now = new Date();
        const dueCards = [];
        const newCards = [];
        const reviewCards = [];

        deck.cards.forEach(card => {
            if (!card.nextReview || card.repetitions === 0) {
                newCards.push(card);
            } else if (new Date(card.nextReview) <= now) {
                dueCards.push(card);
            } else {
                reviewCards.push(card);
            }
        });

        // Prioritize: due cards first, then new cards
        // Shuffle within each category for variety
        const shuffle = arr => arr.sort(() => Math.random() - 0.5);

        const session = [
            ...shuffle(dueCards),
            ...shuffle(newCards)
        ].slice(0, maxCards);

        return session;
    },

    // Get daily review session (all due cards across all decks)
    getDailyReview(maxCards = 50) {
        const decks = Storage.getDecks();
        const now = new Date();
        const allDueCards = [];

        decks.forEach(deck => {
            deck.cards.forEach(card => {
                if (!card.nextReview || new Date(card.nextReview) <= now) {
                    allDueCards.push({
                        ...card,
                        deckId: deck.id,
                        deckName: deck.name
                    });
                }
            });
        });

        // Sort by priority and limit
        return allDueCards
            .map(card => ({
                ...card,
                priority: this.calculatePriority(card, now)
            }))
            .sort((a, b) => b.priority - a.priority)
            .slice(0, maxCards);
    },

    // Get learning progress for a deck
    getLearningProgress(deckId) {
        const deck = Storage.getDeck(deckId);
        if (!deck || deck.cards.length === 0) {
            return { new: 0, learning: 0, reviewing: 0, mastered: 0 };
        }

        let newCount = 0;
        let learning = 0;
        let reviewing = 0;
        let mastered = 0;

        deck.cards.forEach(card => {
            if (card.repetitions === 0) {
                newCount++;
            } else if (card.interval < 7) {
                learning++;
            } else if (card.interval < 21) {
                reviewing++;
            } else {
                mastered++;
            }
        });

        return {
            new: newCount,
            learning,
            reviewing,
            mastered,
            total: deck.cards.length
        };
    },

    // Estimate time to mastery
    estimateMasteryTime(deckId) {
        const progress = this.getLearningProgress(deckId);
        const cardsToMaster = progress.new + progress.learning + progress.reviewing;

        // Rough estimate: ~3-4 weeks per card on average
        const avgDaysPerCard = 25;
        const estimatedDays = Math.ceil(cardsToMaster * avgDaysPerCard / 10);

        return estimatedDays;
    }
};

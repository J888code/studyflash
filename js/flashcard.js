// Flashcard Operations
const Flashcard = {
    // Create a new deck
    createDeck(name, subject) {
        const deck = {
            id: Storage.generateId(),
            name: name,
            subject: subject,
            isPremade: false,
            cards: [],
            createdAt: new Date().toISOString(),
            lastStudied: null
        };

        Storage.saveDeck(deck);
        return deck;
    },

    // Delete a deck
    deleteDeck(deckId) {
        return Storage.deleteDeck(deckId);
    },

    // Update deck name/subject
    updateDeck(deckId, updates) {
        const deck = Storage.getDeck(deckId);
        if (!deck) return null;

        Object.assign(deck, updates);
        Storage.saveDeck(deck);
        return deck;
    },

    // Add a card to a deck
    addCard(deckId, front, back) {
        const deck = Storage.getDeck(deckId);
        if (!deck) return null;

        const card = {
            id: Storage.generateId(),
            front: front,
            back: back,
            easeFactor: 2.5,
            interval: 0,
            repetitions: 0,
            nextReview: null,
            lastReview: null,
            createdAt: new Date().toISOString()
        };

        deck.cards.push(card);
        Storage.saveDeck(deck);
        return card;
    },

    // Add a card with hint
    addCardWithHint(deckId, front, back, hint) {
        const deck = Storage.getDeck(deckId);
        if (!deck) return null;

        const card = {
            id: Storage.generateId(),
            front: front,
            back: back,
            hint: hint || '',
            easeFactor: 2.5,
            interval: 0,
            repetitions: 0,
            nextReview: null,
            lastReview: null,
            createdAt: new Date().toISOString()
        };

        deck.cards.push(card);
        Storage.saveDeck(deck);
        return card;
    },

    // Update a card
    updateCard(deckId, cardId, updates) {
        const deck = Storage.getDeck(deckId);
        if (!deck) return null;

        const cardIndex = deck.cards.findIndex(c => c.id === cardId);
        if (cardIndex === -1) return null;

        Object.assign(deck.cards[cardIndex], updates);
        Storage.saveDeck(deck);
        return deck.cards[cardIndex];
    },

    // Delete a card
    deleteCard(deckId, cardId) {
        const deck = Storage.getDeck(deckId);
        if (!deck) return false;

        deck.cards = deck.cards.filter(c => c.id !== cardId);
        Storage.saveDeck(deck);
        return true;
    },

    // Get all cards from a deck
    getCards(deckId) {
        const deck = Storage.getDeck(deckId);
        return deck ? deck.cards : [];
    },

    // Get cards due for review
    getDueCards(deckId) {
        const deck = Storage.getDeck(deckId);
        if (!deck) return [];

        const now = new Date();
        return deck.cards.filter(card => {
            if (!card.nextReview) return true; // Never reviewed
            return new Date(card.nextReview) <= now;
        });
    },

    // Get all due cards across all decks
    getAllDueCards() {
        const decks = Storage.getDecks();
        const now = new Date();
        const dueCards = [];

        decks.forEach(deck => {
            deck.cards.forEach(card => {
                if (!card.nextReview || new Date(card.nextReview) <= now) {
                    dueCards.push({
                        ...card,
                        deckId: deck.id,
                        deckName: deck.name
                    });
                }
            });
        });

        return dueCards;
    },

    // Get deck statistics
    getDeckStats(deckId) {
        const deck = Storage.getDeck(deckId);
        if (!deck) return null;

        const now = new Date();
        let learning = 0;
        let reviewing = 0;
        let mastered = 0;
        let due = 0;

        deck.cards.forEach(card => {
            if (card.repetitions === 0) {
                learning++;
            } else if (card.interval >= 21) {
                mastered++;
            } else {
                reviewing++;
            }

            if (!card.nextReview || new Date(card.nextReview) <= now) {
                due++;
            }
        });

        return {
            total: deck.cards.length,
            learning,
            reviewing,
            mastered,
            due,
            masteryPercent: deck.cards.length > 0
                ? Math.round((mastered / deck.cards.length) * 100)
                : 0
        };
    },

    // Get overall statistics
    getOverallStats() {
        const decks = Storage.getDecks();
        let total = 0;
        let learning = 0;
        let reviewing = 0;
        let mastered = 0;
        let due = 0;

        const now = new Date();

        decks.forEach(deck => {
            deck.cards.forEach(card => {
                total++;

                if (card.repetitions === 0) {
                    learning++;
                } else if (card.interval >= 21) {
                    mastered++;
                } else {
                    reviewing++;
                }

                if (!card.nextReview || new Date(card.nextReview) <= now) {
                    due++;
                }
            });
        });

        return { total, learning, reviewing, mastered, due };
    },

    // Mark deck as studied
    markDeckStudied(deckId) {
        const deck = Storage.getDeck(deckId);
        if (!deck) return;

        deck.lastStudied = new Date().toISOString();
        Storage.saveDeck(deck);
    },

    // Get recently studied decks
    getRecentDecks(limit = 5) {
        const decks = Storage.getDecks();
        return decks
            .filter(d => d.lastStudied)
            .sort((a, b) => new Date(b.lastStudied) - new Date(a.lastStudied))
            .slice(0, limit);
    },

    // Duplicate a premade deck for user editing
    duplicateDeck(deckId) {
        const original = Storage.getDeck(deckId);
        if (!original) return null;

        const newDeck = {
            ...original,
            id: Storage.generateId(),
            name: original.name + ' (Copy)',
            isPremade: false,
            cards: original.cards.map(card => ({
                ...card,
                id: Storage.generateId(),
                easeFactor: 2.5,
                interval: 0,
                repetitions: 0,
                nextReview: null,
                lastReview: null
            })),
            createdAt: new Date().toISOString(),
            lastStudied: null
        };

        Storage.saveDeck(newDeck);
        return newDeck;
    }
};

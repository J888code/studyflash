// Quiz Mode Logic
const Quiz = {
    currentQuiz: null,
    currentQuestion: 0,
    score: 0,
    answers: [],
    timer: null,
    timeLeft: 30,

    // Initialize a new quiz
    start(deckId, type = 'multiple', count = 10, timed = false) {
        const deck = Storage.getDeck(deckId);
        if (!deck || deck.cards.length === 0) return null;

        // Get cards for quiz
        let cards = [...deck.cards];

        // Shuffle cards
        cards = cards.sort(() => Math.random() - 0.5);

        // Limit to requested count
        if (count !== 'all') {
            cards = cards.slice(0, Math.min(parseInt(count), cards.length));
        }

        this.currentQuiz = {
            deckId,
            deckName: deck.name,
            type,
            timed,
            cards,
            allCards: deck.cards // Keep reference to all cards for generating wrong answers
        };

        this.currentQuestion = 0;
        this.score = 0;
        this.answers = [];
        this.timeLeft = 30;

        return this.getQuestion();
    },

    // Get current question
    getQuestion() {
        if (!this.currentQuiz) return null;

        const { cards, type, allCards } = this.currentQuiz;
        if (this.currentQuestion >= cards.length) return null;

        const card = cards[this.currentQuestion];

        if (type === 'multiple') {
            return {
                questionNum: this.currentQuestion + 1,
                totalQuestions: cards.length,
                question: card.front,
                correctAnswer: card.back,
                options: this.generateOptions(card, allCards),
                cardId: card.id
            };
        } else {
            // Type answer mode
            return {
                questionNum: this.currentQuestion + 1,
                totalQuestions: cards.length,
                question: card.front,
                correctAnswer: card.back,
                cardId: card.id
            };
        }
    },

    // Generate multiple choice options
    generateOptions(correctCard, allCards) {
        const options = [correctCard.back];

        // Get wrong answers from other cards
        const otherCards = allCards.filter(c => c.id !== correctCard.id);
        const shuffled = otherCards.sort(() => Math.random() - 0.5);

        // Add up to 3 wrong answers
        for (let i = 0; i < Math.min(3, shuffled.length); i++) {
            options.push(shuffled[i].back);
        }

        // If not enough cards, add placeholder wrong answers
        while (options.length < 4) {
            options.push('Not applicable');
        }

        // Shuffle options
        return options.sort(() => Math.random() - 0.5);
    },

    // Check answer for multiple choice
    checkAnswer(selectedAnswer) {
        if (!this.currentQuiz) return null;

        const card = this.currentQuiz.cards[this.currentQuestion];
        const isCorrect = selectedAnswer === card.back;

        this.answers.push({
            question: card.front,
            correctAnswer: card.back,
            userAnswer: selectedAnswer,
            isCorrect
        });

        if (isCorrect) {
            this.score++;
        }

        return {
            isCorrect,
            correctAnswer: card.back
        };
    },

    // Check typed answer (fuzzy matching)
    checkTypedAnswer(userAnswer) {
        if (!this.currentQuiz) return null;

        const card = this.currentQuiz.cards[this.currentQuestion];
        const correctAnswer = card.back.toLowerCase().trim();
        const typedAnswer = userAnswer.toLowerCase().trim();

        // Check for exact match or close match
        const isCorrect = this.fuzzyMatch(typedAnswer, correctAnswer);

        this.answers.push({
            question: card.front,
            correctAnswer: card.back,
            userAnswer: userAnswer,
            isCorrect
        });

        if (isCorrect) {
            this.score++;
        }

        return {
            isCorrect,
            correctAnswer: card.back
        };
    },

    // Fuzzy matching for typed answers - more lenient
    fuzzyMatch(typed, correct) {
        // Clean function - remove punctuation and normalize
        const clean = str => str.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, ' ').trim();
        const cleanTyped = clean(typed);
        const cleanCorrect = clean(correct);

        // Exact match
        if (cleanTyped === cleanCorrect) return true;

        // Handle multiple valid answers (separated by / or , or "or")
        const possibleAnswers = correct.split(/[\/,]|\bor\b/i).map(a => clean(a));
        if (possibleAnswers.some(ans => ans === cleanTyped)) return true;

        // Check if typed answer is contained in correct answer or vice versa
        if (cleanCorrect.includes(cleanTyped) && cleanTyped.length >= 3) return true;
        if (cleanTyped.includes(cleanCorrect) && cleanCorrect.length >= 3) return true;

        // Check for similar answers (allow small typos using Levenshtein-like check)
        const similarity = this.getSimilarity(cleanTyped, cleanCorrect);
        if (similarity >= 0.85) return true;

        // For longer answers, check if key words match
        const correctWords = cleanCorrect.split(' ').filter(w => w.length > 2);
        const typedWords = cleanTyped.split(' ').filter(w => w.length > 2);

        if (correctWords.length >= 2) {
            let matches = 0;
            correctWords.forEach(word => {
                if (typedWords.some(tw => tw === word || this.getSimilarity(tw, word) >= 0.8)) {
                    matches++;
                }
            });
            if (matches / correctWords.length >= 0.6) return true;
        }

        return false;
    },

    // Calculate similarity between two strings (0 to 1)
    getSimilarity(str1, str2) {
        if (str1 === str2) return 1;
        if (str1.length === 0 || str2.length === 0) return 0;

        // Simple character-based similarity
        const longer = str1.length > str2.length ? str1 : str2;
        const shorter = str1.length > str2.length ? str2 : str1;

        let matches = 0;
        for (let i = 0; i < shorter.length; i++) {
            if (longer.includes(shorter[i])) matches++;
        }

        // Also check for substring match
        if (longer.includes(shorter)) return 0.9;

        return matches / longer.length;
    },

    // Move to next question
    nextQuestion() {
        this.currentQuestion++;
        this.timeLeft = 30;

        if (this.currentQuestion >= this.currentQuiz.cards.length) {
            return this.finish();
        }

        return this.getQuestion();
    },

    // Finish quiz and get results
    finish() {
        if (!this.currentQuiz) return null;

        this.stopTimer();

        const total = this.currentQuiz.cards.length;
        const percentage = Math.round((this.score / total) * 100);

        let message;
        if (percentage >= 90) {
            message = "Excellent! You've mastered this material!";
        } else if (percentage >= 70) {
            message = "Great job! Keep practising to improve.";
        } else if (percentage >= 50) {
            message = "Good effort! Review the cards you missed.";
        } else {
            message = "Keep studying! Practice makes perfect.";
        }

        // Record quiz in stats
        Storage.recordQuiz(this.score, total);

        return {
            score: this.score,
            total,
            percentage,
            message,
            answers: this.answers,
            deckName: this.currentQuiz.deckName
        };
    },

    // Timer functions
    startTimer(callback) {
        this.timeLeft = 30;
        this.timer = setInterval(() => {
            this.timeLeft--;
            callback(this.timeLeft);

            if (this.timeLeft <= 0) {
                this.stopTimer();
                // Auto-submit with wrong answer
                this.checkAnswer('TIME_UP');
            }
        }, 1000);
    },

    stopTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    },

    // Get quiz stats
    getQuizStats() {
        const stats = Storage.getStats();

        return {
            totalQuizzes: stats.quizzesTaken,
            totalQuestions: stats.totalQuizQuestions,
            correctAnswers: stats.correctAnswers,
            accuracy: stats.totalQuizQuestions > 0
                ? Math.round((stats.correctAnswers / stats.totalQuizQuestions) * 100)
                : 0
        };
    },

    // Get available decks for quiz
    getAvailableDecks() {
        const decks = Storage.getDecks();
        return decks
            .filter(d => d.cards.length >= 4) // Need at least 4 cards for multiple choice
            .map(d => ({
                id: d.id,
                name: d.name,
                cardCount: d.cards.length
            }));
    }
};

// Match Pairs Quiz Mode
const MatchPairs = {
    currentGame: null,
    selectedCards: [],
    matchedPairs: [],
    moves: 0,
    startTime: null,
    timer: null,

    start(deckId, pairCount = 6) {
        const deck = Storage.getDeck(deckId);
        if (!deck || deck.cards.length < pairCount) return null;

        // Shuffle and get cards
        let cards = [...deck.cards].sort(() => Math.random() - 0.5);
        cards = cards.slice(0, pairCount);

        // Create pairs (front and back as separate cards)
        const gamePairs = [];
        cards.forEach((card, index) => {
            gamePairs.push({
                id: `front-${index}`,
                pairId: index,
                content: card.front,
                type: 'front',
                isFlipped: false,
                isMatched: false
            });
            gamePairs.push({
                id: `back-${index}`,
                pairId: index,
                content: card.back,
                type: 'back',
                isFlipped: false,
                isMatched: false
            });
        });

        // Shuffle pairs
        const shuffledPairs = gamePairs.sort(() => Math.random() - 0.5);

        this.currentGame = {
            deckId,
            deckName: deck.name,
            cards: shuffledPairs,
            totalPairs: pairCount
        };

        this.selectedCards = [];
        this.matchedPairs = [];
        this.moves = 0;
        this.startTime = Date.now();

        return {
            cards: shuffledPairs,
            totalPairs: pairCount
        };
    },

    selectCard(cardId) {
        if (!this.currentGame) return null;

        const card = this.currentGame.cards.find(c => c.id === cardId);
        if (!card || card.isMatched || card.isFlipped) return null;

        // Flip the card
        card.isFlipped = true;
        this.selectedCards.push(card);

        // Check if two cards are selected
        if (this.selectedCards.length === 2) {
            this.moves++;
            const [card1, card2] = this.selectedCards;

            // Check if they match (same pairId, different types)
            if (card1.pairId === card2.pairId && card1.type !== card2.type) {
                // Match found!
                card1.isMatched = true;
                card2.isMatched = true;
                this.matchedPairs.push(card1.pairId);
                this.selectedCards = [];

                SoundFX.play('correct');

                // Check if game is complete
                if (this.matchedPairs.length === this.currentGame.totalPairs) {
                    return this.finish();
                }

                return { isMatch: true, isComplete: false };
            } else {
                // No match - will need to flip back
                SoundFX.play('wrong');
                return {
                    isMatch: false,
                    isComplete: false,
                    flipBack: [card1.id, card2.id]
                };
            }
        }

        return { cardFlipped: true };
    },

    flipBack() {
        this.selectedCards.forEach(card => {
            card.isFlipped = false;
        });
        this.selectedCards = [];
    },

    finish() {
        const endTime = Date.now();
        const timeSeconds = Math.floor((endTime - this.startTime) / 1000);

        // Calculate score based on moves and time
        const perfectMoves = this.currentGame.totalPairs;
        const moveScore = Math.max(0, 100 - (this.moves - perfectMoves) * 5);
        const timeBonus = Math.max(0, 50 - Math.floor(timeSeconds / 10));
        const totalScore = moveScore + timeBonus;

        // Calculate stars
        let stars = 1;
        if (this.moves <= perfectMoves + 2) stars = 3;
        else if (this.moves <= perfectMoves + 5) stars = 2;

        // Award XP
        const xpEarned = Math.floor(totalScore / 2);
        Gamification.addXP(xpEarned, 'Match pairs complete!');

        // Record in calendar
        StudyCalendar.recordQuiz();

        return {
            isComplete: true,
            moves: this.moves,
            time: timeSeconds,
            score: totalScore,
            stars,
            xpEarned,
            deckName: this.currentGame.deckName
        };
    },

    getState() {
        if (!this.currentGame) return null;

        return {
            cards: this.currentGame.cards,
            moves: this.moves,
            matchedCount: this.matchedPairs.length,
            totalPairs: this.currentGame.totalPairs
        };
    }
};

// Main App Logic with Gamification
const App = {
    currentView: 'dashboard',
    currentDeckId: null,
    studySession: [],
    studyIndex: 0,
    editingCardId: null,
    comboTimeout: null,

    // Initialize the app
    init() {
        // Initialize GCSE decks
        initializeGCSEDecks();

        // Apply saved card theme
        const savedTheme = Gamification.getCardTheme();
        CardThemes.applyTheme(savedTheme);

        // Set up navigation
        this.setupNavigation();

        // Set up event listeners
        this.setupEventListeners();

        // Update XP bar and coins
        this.updateXPBar();
        this.updateCoins();

        // Load dashboard
        this.showView('dashboard');
        this.updateDashboard();

        // Check achievements on load
        Gamification.checkAchievements();

        // Check for daily reward
        this.checkDailyReward();

        // Update premium status
        this.updatePremiumStatus();

        // Check for ads (for free users)
        setTimeout(() => this.checkAds(), 30000); // Show ad after 30 seconds
    },

    // Navigation setup
    setupNavigation() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                const view = link.dataset.view;
                this.showView(view);
                SoundFX.play('click');
            });
        });
    },

    // Show a specific view
    showView(viewId) {
        // Hide all views
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));

        // Show requested view
        const view = document.getElementById(viewId);
        if (view) {
            view.classList.add('active');
            this.currentView = viewId;
        }

        // Update nav
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.toggle('active', link.dataset.view === viewId);
        });

        // Load view data
        switch(viewId) {
            case 'dashboard':
                this.updateDashboard();
                break;
            case 'decks':
                this.updateDecks();
                break;
            case 'profile':
                this.updateProfile();
                break;
            case 'quiz':
                this.updateQuizSetup();
                break;
        }
    },

    // Update XP bar in nav
    updateXPBar() {
        const data = Gamification.getData();
        const level = Gamification.getLevel(data.xp);
        const progress = Gamification.getProgress();

        document.getElementById('level-icon').textContent = level.icon;
        document.getElementById('level-num').textContent = `Lv. ${level.level}`;
        document.getElementById('xp-fill').style.width = `${progress.percent}%`;
        document.getElementById('xp-text').textContent = `${data.xp} XP`;
    },

    // Show combo
    showCombo(combo) {
        const display = document.getElementById('combo-display');
        const number = document.getElementById('combo-number');

        number.textContent = combo + 'x';
        display.style.display = 'block';

        // Reset animation
        number.style.animation = 'none';
        setTimeout(() => number.style.animation = 'comboPulse 0.3s ease', 10);

        // Hide after delay
        clearTimeout(this.comboTimeout);
        this.comboTimeout = setTimeout(() => {
            display.style.display = 'none';
        }, 2000);
    },

    // Setup all event listeners
    setupEventListeners() {
        // Dashboard
        document.getElementById('start-review').addEventListener('click', () => this.startDailyReview());
        document.getElementById('quick-quiz').addEventListener('click', () => this.showView('quiz'));
        document.getElementById('start-pomodoro').addEventListener('click', () => this.showPomodoro());

        // Daily Rewards
        document.getElementById('claim-reward-btn').addEventListener('click', () => this.claimDailyReward());
        document.getElementById('close-reward-btn').addEventListener('click', () => this.hideDailyReward());

        // Pomodoro Timer
        document.getElementById('pomodoro-start').addEventListener('click', () => this.startPomodoro());
        document.getElementById('pomodoro-pause').addEventListener('click', () => this.pausePomodoro());
        document.getElementById('pomodoro-stop').addEventListener('click', () => this.stopPomodoro());
        document.getElementById('pomodoro-close').addEventListener('click', () => this.hidePomodoro());

        // Match Pairs
        document.getElementById('exit-match').addEventListener('click', () => this.exitMatchPairs());
        document.getElementById('retry-match').addEventListener('click', () => this.retryMatchPairs());
        document.getElementById('back-from-match').addEventListener('click', () => this.showQuizSetup());

        // Pricing / Monetization
        document.getElementById('upgrade-btn').addEventListener('click', () => this.showPricing());
        document.getElementById('pricing-close').addEventListener('click', () => this.hidePricing());

        // Decks view
        document.getElementById('create-deck-btn').addEventListener('click', () => this.showModal('create-deck-modal'));

        // Deck tabs
        document.querySelectorAll('.deck-tabs .tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.deck-tabs .tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                tab.classList.add('active');
                document.getElementById(tab.dataset.tab).classList.add('active');
            });
        });

        // Deck detail
        document.getElementById('back-to-decks').addEventListener('click', () => this.showView('decks'));
        document.getElementById('add-card-btn').addEventListener('click', () => {
            this.editingCardId = null;
            document.getElementById('card-modal-title').textContent = 'Add New Card';
            document.getElementById('card-front-input').value = '';
            document.getElementById('card-back-input').value = '';
            this.showModal('add-card-modal');
        });
        document.getElementById('study-deck').addEventListener('click', () => this.startStudySession());
        document.getElementById('quiz-deck').addEventListener('click', () => this.startQuizFromDeck());

        // Modal handlers
        document.getElementById('save-deck').addEventListener('click', () => this.saveDeck());
        document.getElementById('save-card').addEventListener('click', () => this.saveCard());

        // Modal close buttons
        document.querySelectorAll('.modal-close, .modal-cancel').forEach(btn => {
            btn.addEventListener('click', () => this.hideModal());
        });

        document.getElementById('modal-overlay').addEventListener('click', (e) => {
            if (e.target.id === 'modal-overlay') this.hideModal();
        });

        // Study view
        document.getElementById('flashcard').addEventListener('click', () => this.flipCard());
        document.getElementById('exit-study').addEventListener('click', () => this.exitStudy());
        document.querySelectorAll('.rating-btn').forEach(btn => {
            btn.addEventListener('click', () => this.rateCard(parseInt(btn.dataset.rating)));
        });

        // Quiz view
        document.querySelectorAll('.quiz-type').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.quiz-type').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });

        document.getElementById('start-quiz').addEventListener('click', () => this.startQuiz());
        document.getElementById('submit-answer').addEventListener('click', () => this.submitTypedAnswer());
        document.getElementById('type-answer-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.submitTypedAnswer();
        });
        document.getElementById('next-question').addEventListener('click', () => this.nextQuizQuestion());
        document.getElementById('retry-quiz').addEventListener('click', () => this.retryQuiz());
        document.getElementById('back-to-quiz-setup').addEventListener('click', () => this.showQuizSetup());

        // Profile - Sound toggle
        document.getElementById('sound-toggle').addEventListener('click', (e) => {
            const toggle = e.currentTarget;
            toggle.classList.toggle('active');
            Gamification.setSoundEnabled(toggle.classList.contains('active'));
            if (toggle.classList.contains('active')) {
                SoundFX.play('click');
            }
        });
    },

    // Dashboard updates
    updateDashboard() {
        const stats = Flashcard.getOverallStats();
        const userStats = Storage.getStats();
        const gameData = Gamification.getData();

        document.getElementById('cards-due').textContent = stats.due;
        document.getElementById('streak-count').textContent = userStats.streak;
        document.getElementById('total-cards').textContent = stats.total;
        document.getElementById('mastered-cards').textContent = stats.mastered;

        // Update daily challenge
        const { challenge, progress } = Gamification.getDailyChallenge();
        if (challenge) {
            document.getElementById('challenge-desc').textContent = challenge.desc;
            const percent = Math.min(100, (progress / challenge.target) * 100);
            document.getElementById('challenge-progress-fill').style.width = `${percent}%`;
        }

        // Update streak fire effect
        const streakEl = document.getElementById('streak-count');
        if (userStats.streak >= 3) {
            streakEl.classList.add('streak-fire');
        } else {
            streakEl.classList.remove('streak-fire');
        }

        // Recent decks
        const recentDecks = Flashcard.getRecentDecks();
        const recentContainer = document.getElementById('recent-decks');

        if (recentDecks.length === 0) {
            recentContainer.innerHTML = `
                <div class="empty-state">
                    <h3>No recent activity</h3>
                    <p>Start studying to see your recent decks here</p>
                </div>
            `;
        } else {
            recentContainer.innerHTML = recentDecks.map(deck => `
                <div class="deck-list-item" data-deck-id="${deck.id}">
                    <div>
                        <strong>${deck.name}</strong>
                        <span class="deck-subject">${deck.subject}</span>
                    </div>
                    <span>${deck.cards.length} cards</span>
                </div>
            `).join('');

            recentContainer.querySelectorAll('.deck-list-item').forEach(item => {
                item.addEventListener('click', () => {
                    this.openDeck(item.dataset.deckId);
                });
            });
        }

        // Update XP bar and coins
        this.updateXPBar();
        this.updateCoins();

        // Update calendar and leaderboard
        this.updateCalendar();
        this.updateLeaderboard();
    },

    // Decks view updates
    updateDecks() {
        const decks = Storage.getDecks();
        const userDecks = decks.filter(d => !d.isPremade);
        const premadeDecks = decks.filter(d => d.isPremade);

        // User decks
        const userContainer = document.getElementById('user-decks');
        if (userDecks.length === 0) {
            userContainer.innerHTML = `
                <div class="empty-state">
                    <h3>No decks yet</h3>
                    <p>Create your first deck to start studying</p>
                </div>
            `;
        } else {
            userContainer.innerHTML = userDecks.map(deck => this.renderDeckCard(deck)).join('');
            this.attachDeckListeners(userContainer);
        }

        // Premade decks
        const premadeContainer = document.getElementById('premade-decks');
        premadeContainer.innerHTML = premadeDecks.map(deck => this.renderDeckCard(deck, true)).join('');
        this.attachDeckListeners(premadeContainer);
    },

    renderDeckCard(deck, isPremade = false) {
        const stats = Flashcard.getDeckStats(deck.id);
        return `
            <div class="deck-card" data-deck-id="${deck.id}">
                <div class="deck-card-header">
                    <div>
                        <h3>${deck.name}</h3>
                        <span class="deck-subject">${deck.subject}</span>
                    </div>
                    ${isPremade ? '<span class="deck-badge">GCSE</span>' : ''}
                </div>
                <div class="deck-card-stats">
                    <span class="deck-stat"><strong>${deck.cards.length}</strong> cards</span>
                    <span class="deck-stat"><strong>${stats.due}</strong> due</span>
                    <span class="deck-stat"><strong>${stats.masteryPercent}%</strong> mastered</span>
                </div>
            </div>
        `;
    },

    attachDeckListeners(container) {
        container.querySelectorAll('.deck-card').forEach(card => {
            card.addEventListener('click', () => {
                this.openDeck(card.dataset.deckId);
            });
        });
    },

    // Open a deck
    openDeck(deckId) {
        this.currentDeckId = deckId;
        const deck = Storage.getDeck(deckId);
        if (!deck) return;

        // Track subject for achievement
        Gamification.trackSubject(deck.subject);

        document.getElementById('deck-title').textContent = deck.name;
        document.getElementById('card-count').textContent = `${deck.cards.length} cards`;

        // Render cards
        const cardsList = document.getElementById('cards-list');
        if (deck.cards.length === 0) {
            cardsList.innerHTML = `
                <div class="empty-state">
                    <h3>No cards yet</h3>
                    <p>Add your first flashcard to this deck</p>
                </div>
            `;
        } else {
            cardsList.innerHTML = deck.cards.map(card => `
                <div class="card-item" data-card-id="${card.id}">
                    <div class="card-content">
                        <div class="card-front-preview">${this.truncate(card.front, 60)}</div>
                        <div class="card-back-preview">${this.truncate(card.back, 80)}</div>
                    </div>
                    <div class="card-actions">
                        <button class="card-action-btn edit-card" title="Edit">✏️</button>
                        <button class="card-action-btn delete delete-card" title="Delete">🗑️</button>
                    </div>
                </div>
            `).join('');

            // Attach card action listeners
            cardsList.querySelectorAll('.edit-card').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const cardId = btn.closest('.card-item').dataset.cardId;
                    this.editCard(cardId);
                });
            });

            cardsList.querySelectorAll('.delete-card').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const cardId = btn.closest('.card-item').dataset.cardId;
                    this.deleteCard(cardId);
                });
            });
        }

        // Hide add card button for premade decks
        document.getElementById('add-card-btn').style.display = deck.isPremade ? 'none' : 'block';

        this.showView('deck-detail');
    },

    truncate(str, len) {
        return str.length > len ? str.substring(0, len) + '...' : str;
    },

    // Modal handling
    showModal(modalId) {
        document.getElementById('modal-overlay').classList.add('active');
        document.getElementById(modalId).classList.add('active');
    },

    hideModal() {
        document.getElementById('modal-overlay').classList.remove('active');
        document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
    },

    // Save new deck
    saveDeck() {
        const name = document.getElementById('deck-name-input').value.trim();
        const subject = document.getElementById('deck-subject-select').value;

        if (!name) {
            alert('Please enter a deck name');
            return;
        }

        Flashcard.createDeck(name, subject);
        Gamification.recordDeckCreated();
        document.getElementById('deck-name-input').value = '';
        this.hideModal();
        this.updateDecks();
    },

    // Edit card
    editCard(cardId) {
        const deck = Storage.getDeck(this.currentDeckId);
        const card = deck.cards.find(c => c.id === cardId);
        if (!card) return;

        this.editingCardId = cardId;
        document.getElementById('card-modal-title').textContent = 'Edit Card';
        document.getElementById('card-front-input').value = card.front;
        document.getElementById('card-back-input').value = card.back;
        this.showModal('add-card-modal');
    },

    // Save card (new or edit)
    saveCard() {
        const front = document.getElementById('card-front-input').value.trim();
        const back = document.getElementById('card-back-input').value.trim();

        if (!front || !back) {
            alert('Please fill in both front and back of the card');
            return;
        }

        if (this.editingCardId) {
            Flashcard.updateCard(this.currentDeckId, this.editingCardId, { front, back });
        } else {
            Flashcard.addCard(this.currentDeckId, front, back);
        }

        this.hideModal();
        this.openDeck(this.currentDeckId);
    },

    // Delete card
    deleteCard(cardId) {
        if (confirm('Are you sure you want to delete this card?')) {
            Flashcard.deleteCard(this.currentDeckId, cardId);
            this.openDeck(this.currentDeckId);
        }
    },

    // Study session
    startStudySession() {
        const deck = Storage.getDeck(this.currentDeckId);
        if (!deck || deck.cards.length === 0) {
            alert('This deck has no cards to study');
            return;
        }

        // Get due cards first
        this.studySession = SpacedRep.getStudySession(this.currentDeckId);

        // If no cards are due, offer to study all cards anyway
        if (this.studySession.length === 0) {
            if (confirm('No cards are due for review yet. Would you like to practice all cards anyway?')) {
                // Shuffle all cards for practice
                this.studySession = [...deck.cards].sort(() => Math.random() - 0.5).slice(0, 20);
            } else {
                return;
            }
        }

        this.studyIndex = 0;
        Gamification.resetCombo();
        Flashcard.markDeckStudied(this.currentDeckId);
        this.showStudyCard();
        this.showView('study');

        document.getElementById('study-deck-name').textContent = deck.name;
    },

    startDailyReview() {
        this.studySession = SpacedRep.getDailyReview();
        if (this.studySession.length === 0) {
            alert('No cards due for review today! Great job keeping up!');
            return;
        }

        this.studyIndex = 0;
        this.currentDeckId = null; // Mixed decks
        Gamification.resetCombo();
        this.showStudyCard();
        this.showView('study');

        document.getElementById('study-deck-name').textContent = 'Daily Review';
    },

    showStudyCard() {
        if (this.studyIndex >= this.studySession.length) {
            this.finishStudy();
            return;
        }

        const card = this.studySession[this.studyIndex];
        document.getElementById('card-front-text').textContent = card.front;
        document.getElementById('card-back-text').textContent = card.back;
        document.getElementById('study-progress').textContent =
            `${this.studyIndex + 1} / ${this.studySession.length}`;

        // Reset card state
        document.getElementById('flashcard').classList.remove('flipped', 'correct-animation', 'wrong-animation');
        document.getElementById('rating-buttons').style.display = 'none';
        document.querySelector('.flip-hint').style.display = 'block';
    },

    flipCard() {
        const flashcard = document.getElementById('flashcard');
        flashcard.classList.toggle('flipped');
        SoundFX.play('flip');

        if (flashcard.classList.contains('flipped')) {
            document.getElementById('rating-buttons').style.display = 'block';
            document.querySelector('.flip-hint').style.display = 'none';
        }
    },

    rateCard(rating) {
        const card = this.studySession[this.studyIndex];
        const deckId = card.deckId || this.currentDeckId;
        const flashcard = document.getElementById('flashcard');

        // Record review with gamification
        Gamification.recordReview(rating);

        // Show combo if applicable
        const gameData = Gamification.getData();
        if (gameData.combo > 1) {
            this.showCombo(gameData.combo);
        }

        // Play sound and animate
        if (rating >= 3) {
            SoundFX.play('correct');
            flashcard.classList.add('correct-animation');
        } else {
            SoundFX.play('wrong');
            flashcard.classList.add('wrong-animation');
        }

        // Update spaced repetition
        SpacedRep.reviewCard(deckId, card.id, rating);

        // Update XP bar
        this.updateXPBar();

        // Move to next card after animation
        setTimeout(() => {
            this.studyIndex++;
            this.showStudyCard();
        }, 500);
    },

    exitStudy() {
        this.studySession = [];
        this.studyIndex = 0;
        document.getElementById('combo-display').style.display = 'none';
        this.showView('dashboard');
        this.updateDashboard();
    },

    finishStudy() {
        const count = this.studySession.length;
        Gamification.showNotification('Session Complete! 🎉', `You reviewed ${count} cards`, 'achievement');
        this.exitStudy();
    },

    // Quiz functions
    updateQuizSetup() {
        const decks = Quiz.getAvailableDecks();
        const select = document.getElementById('quiz-deck-select');

        select.innerHTML = decks.map(d =>
            `<option value="${d.id}">${d.name} (${d.cardCount} cards)</option>`
        ).join('');

        if (decks.length === 0) {
            select.innerHTML = '<option value="">No decks available (need 4+ cards)</option>';
        }
    },

    startQuizFromDeck() {
        this.showView('quiz');
        document.getElementById('quiz-deck-select').value = this.currentDeckId;
    },

    startQuiz() {
        const deckId = document.getElementById('quiz-deck-select').value;
        if (!deckId) {
            alert('Please select a deck');
            return;
        }

        const type = document.querySelector('.quiz-type.active').dataset.type;
        const count = document.getElementById('quiz-count').value;
        const timed = document.getElementById('quiz-timer').checked;

        // Handle match pairs mode
        if (type === 'match') {
            this.startMatchPairs();
            return;
        }

        const question = Quiz.start(deckId, type, count, timed);
        if (!question) {
            alert('Could not start quiz. Make sure the deck has enough cards.');
            return;
        }

        document.getElementById('quiz-setup').style.display = 'none';
        document.getElementById('quiz-game').style.display = 'block';
        document.getElementById('quiz-results').style.display = 'none';

        this.showQuizQuestion(question);

        if (timed) {
            document.getElementById('quiz-timer-display').style.display = 'block';
            Quiz.startTimer((time) => {
                document.getElementById('quiz-timer-display').textContent = `${time}s`;
            });
        }
    },

    showQuizQuestion(question) {
        document.getElementById('quiz-question-num').textContent =
            `Question ${question.questionNum} of ${question.totalQuestions}`;
        document.getElementById('quiz-score').textContent = `Score: ${Quiz.score}`;
        document.getElementById('quiz-question-text').textContent = question.question;

        const type = Quiz.currentQuiz.type;

        if (type === 'multiple') {
            document.getElementById('quiz-answers').style.display = 'grid';
            document.getElementById('quiz-type-answer').style.display = 'none';

            document.getElementById('quiz-answers').innerHTML = question.options.map(opt =>
                `<button class="quiz-answer" data-answer="${this.escapeHtml(opt)}">${opt}</button>`
            ).join('');

            document.querySelectorAll('.quiz-answer').forEach(btn => {
                btn.addEventListener('click', () => this.selectAnswer(btn));
            });
        } else {
            document.getElementById('quiz-answers').style.display = 'none';
            document.getElementById('quiz-type-answer').style.display = 'flex';
            document.getElementById('type-answer-input').value = '';
            document.getElementById('type-answer-input').focus();
        }

        document.getElementById('next-question').style.display = 'none';
    },

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    selectAnswer(btn) {
        if (btn.classList.contains('disabled')) return;

        Quiz.stopTimer();

        const selected = btn.dataset.answer;
        const result = Quiz.checkAnswer(selected);

        // Disable all buttons
        document.querySelectorAll('.quiz-answer').forEach(b => {
            b.classList.add('disabled');
            if (b.dataset.answer === result.correctAnswer) {
                b.classList.add('correct');
            }
        });

        if (result.isCorrect) {
            SoundFX.play('correct');
        } else {
            btn.classList.add('incorrect');
            SoundFX.play('wrong');
        }

        document.getElementById('quiz-score').textContent = `Score: ${Quiz.score}`;
        document.getElementById('next-question').style.display = 'block';
    },

    submitTypedAnswer() {
        const input = document.getElementById('type-answer-input');
        const answer = input.value.trim();

        if (!answer) return;

        Quiz.stopTimer();

        const result = Quiz.checkTypedAnswer(answer);

        // Show feedback
        input.disabled = true;
        input.style.borderColor = result.isCorrect ? 'var(--success)' : 'var(--danger)';

        if (result.isCorrect) {
            SoundFX.play('correct');
        } else {
            SoundFX.play('wrong');
            const feedback = document.createElement('p');
            feedback.style.color = 'var(--success)';
            feedback.style.marginTop = '10px';
            feedback.textContent = `Correct answer: ${result.correctAnswer}`;
            document.getElementById('quiz-type-answer').appendChild(feedback);
        }

        document.getElementById('quiz-score').textContent = `Score: ${Quiz.score}`;
        document.getElementById('next-question').style.display = 'block';
    },

    nextQuizQuestion() {
        // Reset timer display if needed
        if (Quiz.currentQuiz.timed) {
            Quiz.startTimer((time) => {
                document.getElementById('quiz-timer-display').textContent = `${time}s`;
            });
        }

        // Clean up any feedback
        const feedback = document.querySelector('#quiz-type-answer p');
        if (feedback) feedback.remove();
        document.getElementById('type-answer-input').disabled = false;
        document.getElementById('type-answer-input').style.borderColor = '';

        const question = Quiz.nextQuestion();

        if (question && question.score !== undefined) {
            // Quiz finished
            this.showQuizResults(question);
        } else if (question) {
            this.showQuizQuestion(question);
        }
    },

    showQuizResults(results) {
        document.getElementById('quiz-game').style.display = 'none';
        document.getElementById('quiz-results').style.display = 'block';

        document.getElementById('final-score').textContent = results.score;
        document.getElementById('total-questions').textContent = results.total;
        document.getElementById('results-message').textContent = results.message;

        // Show stars based on percentage
        const percent = results.percentage;
        let stars = '⭐';
        if (percent >= 50) stars = '⭐⭐';
        if (percent >= 80) stars = '⭐⭐⭐';
        if (percent === 100) stars = '🌟🌟🌟';
        document.getElementById('celebration-stars').textContent = stars;

        // Record quiz result with gamification
        Gamification.recordQuizResult(results.score, results.total);
        this.updateXPBar();

        // Confetti for perfect score
        if (percent === 100) {
            this.showConfetti();
        }

        // Show breakdown
        const breakdown = document.getElementById('results-breakdown');
        breakdown.innerHTML = results.answers.map(a => `
            <div class="result-item ${a.isCorrect ? 'correct' : 'incorrect'}">
                <strong>${a.isCorrect ? '✓' : '✗'}</strong> ${a.question}
                ${!a.isCorrect ? `<br><small>Your answer: ${a.userAnswer} | Correct: ${a.correctAnswer}</small>` : ''}
            </div>
        `).join('');
    },

    showConfetti() {
        const colors = ['#6366f1', '#22c55e', '#f59e0b', '#ef4444', '#a855f7', '#06b6d4'];
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animationDelay = Math.random() * 0.5 + 's';
                document.body.appendChild(confetti);

                setTimeout(() => confetti.remove(), 3000);
            }, i * 30);
        }
    },

    retryQuiz() {
        const deckId = Quiz.currentQuiz.deckId;
        const type = Quiz.currentQuiz.type;
        const count = Quiz.currentQuiz.cards.length;
        const timed = Quiz.currentQuiz.timed;

        const question = Quiz.start(deckId, type, count, timed);
        document.getElementById('quiz-results').style.display = 'none';
        document.getElementById('quiz-game').style.display = 'block';
        this.showQuizQuestion(question);
    },

    showQuizSetup() {
        document.getElementById('quiz-results').style.display = 'none';
        document.getElementById('quiz-game').style.display = 'none';
        document.getElementById('quiz-setup').style.display = 'block';
        document.getElementById('quiz-timer-display').style.display = 'none';
    },

    // Profile view
    updateProfile() {
        const data = Gamification.getData();
        const level = Gamification.getLevel(data.xp);
        const progress = Gamification.getProgress();
        const userStats = Storage.getStats();

        // Profile header
        document.getElementById('profile-avatar').textContent = level.icon;
        document.getElementById('profile-level').textContent = `Level ${level.level}`;
        document.getElementById('profile-title').textContent = level.title;
        document.getElementById('profile-xp-fill').style.width = `${progress.percent}%`;

        if (progress.isMax) {
            document.getElementById('profile-xp-text').textContent = `${data.xp} XP (MAX LEVEL!)`;
        } else {
            document.getElementById('profile-xp-text').textContent =
                `${progress.current} / ${progress.needed} XP to Level ${progress.nextLevel.level}`;
        }

        // Stats
        document.getElementById('profile-total-xp').textContent = data.xp;
        document.getElementById('profile-reviews').textContent = data.totalReviews;
        document.getElementById('profile-quizzes').textContent = data.quizzesTaken;
        document.getElementById('profile-best-combo').textContent = data.bestCombo;

        // Achievements
        const achievements = Gamification.getAchievements();
        const achievementsGrid = document.getElementById('achievements-grid');
        achievementsGrid.innerHTML = achievements.map(a => `
            <div class="achievement-card ${a.unlocked ? 'unlocked' : 'locked'}">
                <span class="achievement-icon">${a.icon}</span>
                <div class="achievement-name">${a.name}</div>
                <div class="achievement-desc">${a.desc}</div>
            </div>
        `).join('');

        // Card Themes
        const themes = CardThemes.getAllThemes();
        const currentTheme = Gamification.getCardTheme();
        const themeGrid = document.getElementById('theme-grid');
        themeGrid.innerHTML = themes.map(t => `
            <div class="theme-option ${t.id === currentTheme ? 'active' : ''}"
                 data-theme="${t.id}"
                 style="background: ${t.front}">
                <span>${t.icon}</span>
                <span>${t.name}</span>
            </div>
        `).join('');

        themeGrid.querySelectorAll('.theme-option').forEach(option => {
            option.addEventListener('click', () => {
                const themeId = option.dataset.theme;
                CardThemes.applyTheme(themeId);
                SoundFX.play('click');

                // Update UI
                themeGrid.querySelectorAll('.theme-option').forEach(o => o.classList.remove('active'));
                option.classList.add('active');
            });
        });

        // Sound toggle state
        const soundToggle = document.getElementById('sound-toggle');
        soundToggle.classList.toggle('active', Gamification.isSoundEnabled());

        // Power-ups shop
        this.updateShop();
    },

    // Update coins display
    updateCoins() {
        document.getElementById('coin-count').textContent = PowerUps.getCoins();
    },

    // Daily reward check
    checkDailyReward() {
        if (DailyRewards.canClaim()) {
            this.showDailyRewardPopup();
        }
    },

    showDailyRewardPopup() {
        const status = DailyRewards.getStatus();
        const container = document.getElementById('reward-days');

        container.innerHTML = status.rewards.map((reward, i) => {
            let stateClass = 'locked';
            if (reward.claimed) stateClass = 'claimed';
            else if (i === status.currentDay) stateClass = 'current';

            return `
                <div class="reward-day ${stateClass}">
                    <div class="reward-day-num">Day ${i + 1}</div>
                    <span class="reward-day-icon">${reward.icon}</span>
                    <div class="reward-day-coins">+${reward.coins}</div>
                </div>
            `;
        }).join('');

        document.getElementById('daily-reward-popup').style.display = 'flex';
    },

    claimDailyReward() {
        const result = DailyRewards.claim();
        if (result.success) {
            this.updateCoins();
            this.updateXPBar();
            Gamification.showNotification(`Day ${result.day} Reward!`, `+${result.reward.coins} coins, +${result.reward.xp} XP`, 'achievement');
            this.showDailyRewardPopup(); // Refresh the display
            setTimeout(() => this.hideDailyReward(), 1500);
        }
    },

    hideDailyReward() {
        document.getElementById('daily-reward-popup').style.display = 'none';
    },

    // Pomodoro Timer
    showPomodoro() {
        const state = PomodoroTimer.getState();
        document.getElementById('pomodoro-sessions').textContent = state.sessionsCompleted;
        document.getElementById('pomodoro-timer').textContent = PomodoroTimer.formatTime(state.currentTime);
        document.getElementById('pomodoro-popup').style.display = 'flex';
    },

    hidePomodoro() {
        document.getElementById('pomodoro-popup').style.display = 'none';
    },

    startPomodoro() {
        document.getElementById('pomodoro-start').style.display = 'none';
        document.getElementById('pomodoro-pause').style.display = 'block';

        PomodoroTimer.start(
            (time, isBreak) => {
                document.getElementById('pomodoro-timer').textContent = PomodoroTimer.formatTime(time);
                const status = document.getElementById('pomodoro-status');
                if (isBreak) {
                    status.textContent = 'Break Time!';
                    status.classList.add('break');
                } else {
                    status.textContent = 'Focus Time';
                    status.classList.remove('break');
                }
            },
            (isBreak, sessions) => {
                document.getElementById('pomodoro-sessions').textContent = sessions;
                this.updateXPBar();
                document.getElementById('pomodoro-start').style.display = 'block';
                document.getElementById('pomodoro-pause').style.display = 'none';

                if (!isBreak) {
                    Gamification.showNotification('Pomodoro Complete!', '+50 XP - Time for a break!', 'achievement');
                } else {
                    Gamification.showNotification('Break Over!', 'Ready to study again?', 'xp');
                }
            }
        );
    },

    pausePomodoro() {
        const state = PomodoroTimer.state;
        if (state.isPaused) {
            PomodoroTimer.resume();
            document.getElementById('pomodoro-pause').textContent = 'Pause';
        } else {
            PomodoroTimer.pause();
            document.getElementById('pomodoro-pause').textContent = 'Resume';
        }
    },

    stopPomodoro() {
        PomodoroTimer.stop();
        document.getElementById('pomodoro-timer').textContent = '25:00';
        document.getElementById('pomodoro-status').textContent = 'Focus Time';
        document.getElementById('pomodoro-status').classList.remove('break');
        document.getElementById('pomodoro-start').style.display = 'block';
        document.getElementById('pomodoro-pause').style.display = 'none';
        document.getElementById('pomodoro-pause').textContent = 'Pause';
    },

    // Study Calendar
    updateCalendar() {
        const heatmapData = StudyCalendar.getHeatmapData(12);
        const container = document.getElementById('heatmap-container');

        // Group by weeks
        const weeks = [];
        for (let i = 0; i < heatmapData.length; i += 7) {
            weeks.push(heatmapData.slice(i, i + 7));
        }

        container.innerHTML = weeks.map(week => `
            <div class="heatmap-week">
                ${week.map(day => `
                    <div class="heatmap-day level-${day.intensity}"
                         title="${day.date}: ${day.cards} cards"></div>
                `).join('')}
            </div>
        `).join('');
    },

    // Leaderboard
    async updateLeaderboard() {
        const container = document.getElementById('leaderboard-preview');
        const rankEl = document.getElementById('user-rank');

        // Show loading state
        if (container) container.innerHTML = '<div class="loading">Loading leaderboard...</div>';

        const data = await Leaderboard.getData();

        if (rankEl) rankEl.textContent = `Rank #${data.userRank}`;
        if (data.isLive && container) {
            container.setAttribute('data-live', 'true');
        }

        if (container) {
            container.innerHTML = data.entries.slice(0, 5).map((entry, i) => {
                let positionClass = '';
                if (entry.rank === 1) positionClass = 'gold';
                else if (entry.rank === 2) positionClass = 'silver';
                else if (entry.rank === 3) positionClass = 'bronze';

                return `
                    <div class="leaderboard-entry ${entry.isUser ? 'user' : ''}">
                        <span class="leaderboard-position ${positionClass}">#${entry.rank}</span>
                        <span class="leaderboard-name">${entry.name}</span>
                        <span class="leaderboard-xp">${entry.xp} XP</span>
                    </div>
                `;
            }).join('');
        }
    },

    // Match Pairs Mode
    startMatchPairs() {
        const deckId = document.getElementById('quiz-deck-select').value;
        if (!deckId) {
            alert('Please select a deck');
            return;
        }

        const result = MatchPairs.start(deckId, 6);
        if (!result) {
            alert('Deck needs at least 6 cards for match pairs');
            return;
        }

        document.getElementById('quiz-setup').style.display = 'none';
        document.getElementById('match-pairs-game').style.display = 'block';

        this.renderMatchGrid();
    },

    renderMatchGrid() {
        const state = MatchPairs.getState();
        const container = document.getElementById('match-grid');

        document.getElementById('match-moves').textContent = `Moves: ${state.moves}`;
        document.getElementById('match-pairs-count').textContent = `${state.matchedCount} / ${state.totalPairs}`;

        container.innerHTML = state.cards.map(card => `
            <div class="match-card ${card.isFlipped ? 'flipped' : ''} ${card.isMatched ? 'matched' : ''}"
                 data-card-id="${card.id}">
                <div class="match-card-content">${card.content}</div>
            </div>
        `).join('');

        container.querySelectorAll('.match-card').forEach(cardEl => {
            cardEl.addEventListener('click', () => {
                const cardId = cardEl.dataset.cardId;
                const result = MatchPairs.selectCard(cardId);

                if (result) {
                    this.renderMatchGrid();

                    if (result.flipBack) {
                        setTimeout(() => {
                            MatchPairs.flipBack();
                            this.renderMatchGrid();
                        }, 1000);
                    }

                    if (result.isComplete) {
                        this.showMatchResults(result);
                    }
                }
            });
        });
    },

    showMatchResults(results) {
        document.getElementById('match-pairs-game').style.display = 'none';
        document.getElementById('match-results').style.display = 'block';

        document.getElementById('match-stars').textContent = '⭐'.repeat(results.stars);
        document.getElementById('match-final-moves').textContent = results.moves;
        document.getElementById('match-time').textContent = `${results.time}s`;
        document.getElementById('match-xp').textContent = `+${results.xpEarned}`;

        this.updateXPBar();
    },

    exitMatchPairs() {
        document.getElementById('match-pairs-game').style.display = 'none';
        document.getElementById('match-results').style.display = 'none';
        document.getElementById('quiz-setup').style.display = 'block';
    },

    retryMatchPairs() {
        document.getElementById('match-results').style.display = 'none';
        this.startMatchPairs();
    },

    // Power-ups Shop
    updateShop() {
        const powerUps = PowerUps.getInventory();
        const coins = PowerUps.getCoins();
        const container = document.getElementById('shop-grid');

        container.innerHTML = powerUps.map(powerUp => `
            <div class="shop-item">
                <span class="shop-item-icon">${powerUp.icon}</span>
                <div class="shop-item-name">${powerUp.name}</div>
                <div class="shop-item-desc">${powerUp.desc}</div>
                <div class="shop-item-price">
                    <span>🪙</span>
                    <span>${powerUp.cost}</span>
                </div>
                ${powerUp.owned > 0 ? `<div class="shop-item-owned">Owned: ${powerUp.owned}</div>` : ''}
                <button class="btn btn-primary btn-small buy-powerup"
                        data-powerup="${powerUp.id}"
                        ${coins < powerUp.cost ? 'disabled' : ''}>
                    Buy
                </button>
            </div>
        `).join('');

        container.querySelectorAll('.buy-powerup').forEach(btn => {
            btn.addEventListener('click', () => {
                const result = PowerUps.purchase(btn.dataset.powerup);
                if (result.success) {
                    Gamification.showNotification('Purchased!', result.message, 'xp');
                    this.updateShop();
                    this.updateCoins();
                } else {
                    alert(result.message);
                }
            });
        });
    },

    // Pricing / Monetization
    showPricing() {
        this.renderPricingPlans();
        this.renderCoinPacks();
        this.renderContentPacks();
        document.getElementById('pricing-popup').style.display = 'flex';
    },

    hidePricing() {
        document.getElementById('pricing-popup').style.display = 'none';
    },

    renderPricingPlans() {
        const container = document.getElementById('pricing-plans');
        const currentPlan = Premium.getCurrentPlan();
        const isPremium = Premium.isPremium();

        const plans = ['monthly', 'yearly', 'lifetime'];
        container.innerHTML = plans.map(planId => {
            const plan = Premium.PLANS[planId];
            const isFeatured = planId === 'yearly';
            const isCurrent = currentPlan.id === planId && isPremium;

            return `
                <div class="pricing-plan ${isFeatured ? 'featured' : ''}" data-plan="${planId}">
                    ${plan.badge ? `<span class="plan-badge">${plan.badge}</span>` : ''}
                    <div class="plan-name">${plan.name}</div>
                    <div class="plan-price">${plan.priceDisplay}</div>
                    ${plan.savings ? `<div class="plan-price-note">${plan.savings}</div>` : '<div class="plan-price-note">&nbsp;</div>'}
                    <ul class="plan-features">
                        ${plan.features.map(f => `<li>${f}</li>`).join('')}
                    </ul>
                    <button class="btn ${isCurrent ? 'btn-secondary' : 'btn-primary'}"
                            ${isCurrent ? 'disabled' : ''}
                            onclick="App.purchasePlan('${planId}')">
                        ${isCurrent ? 'Current Plan' : 'Subscribe'}
                    </button>
                </div>
            `;
        }).join('');
    },

    renderCoinPacks() {
        const container = document.getElementById('coin-packs');
        container.innerHTML = Premium.COIN_PACKS.map(pack => `
            <div class="coin-pack" onclick="App.purchaseCoins('${pack.id}')">
                ${pack.bonus ? `<span class="coin-pack-bonus">${pack.bonus}</span>` : ''}
                <div class="coin-pack-amount">
                    <span>🪙</span>
                    <span>${pack.coins}</span>
                </div>
                <div class="coin-pack-price">${pack.priceDisplay}</div>
            </div>
        `).join('');
    },

    renderContentPacks() {
        const container = document.getElementById('content-packs');
        container.innerHTML = Premium.CONTENT_PACKS.map(pack => {
            const owned = Premium.ownsContentPack(pack.id);
            return `
                <div class="content-pack ${owned ? 'owned' : ''}" onclick="App.purchaseContent('${pack.id}')">
                    <div class="content-pack-name">${pack.name}</div>
                    <div class="content-pack-desc">${pack.desc}</div>
                    <div class="content-pack-price">${owned ? '✓ Owned' : pack.priceDisplay}</div>
                </div>
            `;
        }).join('');
    },

    async purchasePlan(planId) {
        // Purchases disabled until Stripe is fully set up
        alert('Premium subscriptions coming soon! We are setting up our payment system.');
        return;
    },

    async purchaseCoins(packId) {
        // Purchases disabled until Stripe is fully set up
        alert('Coin purchases coming soon! We are setting up our payment system.');
        return;

        if (result.success) {
            Gamification.showNotification('Coins Added!', `+${pack.coins} coins`, 'xp');
            this.updateCoins();
            this.renderCoinPacks();
        }
    },

    async purchaseContent(packId) {
        if (Premium.ownsContentPack(packId)) return;

        const pack = Premium.CONTENT_PACKS.find(p => p.id === packId);
        if (!confirm(`Buy ${pack.name} for ${pack.priceDisplay}?`)) return;

        this.showProcessing('Processing payment...');
        const result = await Premium.purchase('content', packId);
        this.hideProcessing();

        if (result.success) {
            Gamification.showNotification('Content Unlocked!', pack.name, 'achievement');
            this.renderContentPacks();
        }
    },

    showProcessing(text) {
        const overlay = document.createElement('div');
        overlay.id = 'processing-overlay';
        overlay.className = 'processing-overlay';
        overlay.innerHTML = `
            <div class="processing-spinner"></div>
            <div class="processing-text">${text}</div>
        `;
        document.body.appendChild(overlay);
    },

    hideProcessing() {
        const overlay = document.getElementById('processing-overlay');
        if (overlay) overlay.remove();
    },

    updatePremiumStatus() {
        const statusEl = document.getElementById('premium-status');
        const isPremium = Premium.isPremium();

        if (isPremium) {
            const status = Premium.getStatus();
            const planName = status.plan.name;
            const isLifetime = status.plan.id === 'lifetime';

            statusEl.innerHTML = `
                <div class="premium-badge ${isLifetime ? 'lifetime' : ''}">
                    <span>⭐</span>
                    <span>${planName}</span>
                </div>
            `;

            // Hide ads and watch ad button
            document.getElementById('watch-ad-btn').style.display = 'none';
            Ads.closeBanner();
        } else {
            statusEl.innerHTML = `
                <button class="btn-upgrade" id="upgrade-btn" onclick="App.showPricing()">⭐ Go Pro</button>
            `;

            // Show watch ad button for free users
            document.getElementById('watch-ad-btn').style.display = 'block';
        }
    },

    // Check ads
    checkAds() {
        if (Ads.shouldShowAd()) {
            Ads.showAd('banner');
        }
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

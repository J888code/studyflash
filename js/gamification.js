// Gamification System - XP, Levels, Achievements, Combos
const Gamification = {
    // XP rewards for different actions
    XP_REWARDS: {
        CARD_REVIEW: 10,
        CARD_EASY: 15,
        CARD_MEDIUM: 10,
        CARD_HARD: 5,
        QUIZ_CORRECT: 20,
        QUIZ_PERFECT: 100,
        DAILY_STREAK: 50,
        ACHIEVEMENT: 200,
        COMBO_BONUS: 5, // Per combo level
        CHALLENGE_COMPLETE: 150
    },

    // Level thresholds
    LEVELS: [
        { level: 1, xp: 0, title: 'Beginner', icon: '🌱' },
        { level: 2, xp: 100, title: 'Learner', icon: '📚' },
        { level: 3, xp: 300, title: 'Student', icon: '✏️' },
        { level: 4, xp: 600, title: 'Scholar', icon: '🎓' },
        { level: 5, xp: 1000, title: 'Expert', icon: '⭐' },
        { level: 6, xp: 1500, title: 'Master', icon: '🏆' },
        { level: 7, xp: 2200, title: 'Genius', icon: '🧠' },
        { level: 8, xp: 3000, title: 'Prodigy', icon: '💎' },
        { level: 9, xp: 4000, title: 'Legend', icon: '👑' },
        { level: 10, xp: 5500, title: 'GCSE Champion', icon: '🔥' }
    ],

    // Achievement definitions
    ACHIEVEMENTS: [
        { id: 'first_card', name: 'First Steps', desc: 'Review your first card', icon: '👣', condition: (s) => s.totalReviews >= 1 },
        { id: 'ten_cards', name: 'Getting Started', desc: 'Review 10 cards', icon: '🚀', condition: (s) => s.totalReviews >= 10 },
        { id: 'hundred_cards', name: 'Centurion', desc: 'Review 100 cards', icon: '💯', condition: (s) => s.totalReviews >= 100 },
        { id: 'five_hundred', name: 'Dedication', desc: 'Review 500 cards', icon: '🎯', condition: (s) => s.totalReviews >= 500 },
        { id: 'first_quiz', name: 'Quiz Taker', desc: 'Complete your first quiz', icon: '❓', condition: (s) => s.quizzesTaken >= 1 },
        { id: 'quiz_master', name: 'Quiz Master', desc: 'Complete 10 quizzes', icon: '🧩', condition: (s) => s.quizzesTaken >= 10 },
        { id: 'perfect_quiz', name: 'Perfectionist', desc: 'Get 100% on a quiz', icon: '✨', condition: (s) => s.perfectQuizzes >= 1 },
        { id: 'streak_3', name: 'On Fire', desc: '3 day streak', icon: '🔥', condition: (s) => s.streak >= 3 },
        { id: 'streak_7', name: 'Week Warrior', desc: '7 day streak', icon: '⚡', condition: (s) => s.streak >= 7 },
        { id: 'streak_30', name: 'Monthly Master', desc: '30 day streak', icon: '🌟', condition: (s) => s.streak >= 30 },
        { id: 'combo_5', name: 'Combo King', desc: 'Get a 5x combo', icon: '🎮', condition: (s) => s.bestCombo >= 5 },
        { id: 'combo_10', name: 'Unstoppable', desc: 'Get a 10x combo', icon: '💥', condition: (s) => s.bestCombo >= 10 },
        { id: 'early_bird', name: 'Early Bird', desc: 'Study before 8am', icon: '🌅', condition: (s) => s.earlyBird },
        { id: 'night_owl', name: 'Night Owl', desc: 'Study after 10pm', icon: '🦉', condition: (s) => s.nightOwl },
        { id: 'all_subjects', name: 'Well Rounded', desc: 'Study all GCSE subjects', icon: '🌈', condition: (s) => s.subjectsStudied >= 6 },
        { id: 'speed_demon', name: 'Speed Demon', desc: 'Answer 10 cards in under 1 minute', icon: '⚡', condition: (s) => s.speedRun },
        { id: 'create_deck', name: 'Creator', desc: 'Create your first deck', icon: '🎨', condition: (s) => s.decksCreated >= 1 },
        { id: 'level_5', name: 'Rising Star', desc: 'Reach level 5', icon: '⭐', condition: (s) => s.level >= 5 },
        { id: 'level_10', name: 'Ultimate', desc: 'Reach level 10', icon: '👑', condition: (s) => s.level >= 10 }
    ],

    // Daily challenges
    DAILY_CHALLENGES: [
        { id: 'review_20', name: 'Daily Dose', desc: 'Review 20 cards today', target: 20, type: 'reviews' },
        { id: 'quiz_3', name: 'Quiz Time', desc: 'Complete 3 quizzes today', target: 3, type: 'quizzes' },
        { id: 'perfect_1', name: 'Perfection', desc: 'Get 100% on a quiz', target: 1, type: 'perfect' },
        { id: 'combo_3', name: 'Combo Challenge', desc: 'Get a 3x combo', target: 3, type: 'combo' },
        { id: 'streak_keep', name: 'Keep It Up', desc: 'Maintain your streak', target: 1, type: 'streak' },
        { id: 'all_due', name: 'Clear the Queue', desc: 'Review all due cards', target: 1, type: 'clearDue' },
        { id: 'speed_10', name: 'Speed Round', desc: 'Review 10 cards in 2 minutes', target: 1, type: 'speed' },
        { id: 'new_cards', name: 'Explorer', desc: 'Learn 10 new cards', target: 10, type: 'newCards' }
    ],

    // Get gamification data
    getData() {
        const data = Storage.get('studyflash_game') || {
            xp: 0,
            level: 1,
            combo: 0,
            bestCombo: 0,
            achievements: [],
            dailyChallenge: null,
            dailyChallengeDate: null,
            dailyProgress: {},
            totalReviews: 0,
            quizzesTaken: 0,
            perfectQuizzes: 0,
            streak: 0,
            decksCreated: 0,
            subjectsStudied: [],
            earlyBird: false,
            nightOwl: false,
            speedRun: false,
            cardTheme: 'default',
            appTheme: 'dark',
            soundEnabled: true
        };
        return data;
    },

    // Save gamification data
    saveData(data) {
        Storage.set('studyflash_game', data);
    },

    // Add XP and check for level up
    addXP(amount, reason = '') {
        const data = this.getData();
        const oldLevel = this.getLevel(data.xp);
        data.xp += amount;
        const newLevel = this.getLevel(data.xp);
        data.level = newLevel.level;

        this.saveData(data);

        // Check for level up
        if (newLevel.level > oldLevel.level) {
            this.showLevelUp(newLevel);
            SoundFX.play('levelup');
        } else if (amount > 0) {
            this.showXPGain(amount, reason);
        }

        // Check achievements
        this.checkAchievements();

        return { xp: data.xp, level: newLevel, gained: amount };
    },

    // Get current level info
    getLevel(xp) {
        let currentLevel = this.LEVELS[0];
        for (const level of this.LEVELS) {
            if (xp >= level.xp) {
                currentLevel = level;
            } else {
                break;
            }
        }
        return currentLevel;
    },

    // Get XP progress to next level
    getProgress() {
        const data = this.getData();
        const currentLevel = this.getLevel(data.xp);
        const currentIndex = this.LEVELS.findIndex(l => l.level === currentLevel.level);
        const nextLevel = this.LEVELS[currentIndex + 1];

        if (!nextLevel) {
            return { current: data.xp, needed: currentLevel.xp, percent: 100, isMax: true };
        }

        const xpIntoLevel = data.xp - currentLevel.xp;
        const xpNeeded = nextLevel.xp - currentLevel.xp;
        const percent = Math.round((xpIntoLevel / xpNeeded) * 100);

        return {
            current: xpIntoLevel,
            needed: xpNeeded,
            percent,
            isMax: false,
            nextLevel
        };
    },

    // Combo system
    incrementCombo() {
        const data = this.getData();
        data.combo++;
        if (data.combo > data.bestCombo) {
            data.bestCombo = data.combo;
        }

        // Combo bonus XP
        if (data.combo > 1) {
            const bonus = data.combo * this.XP_REWARDS.COMBO_BONUS;
            data.xp += bonus;
            this.showCombo(data.combo, bonus);
        }

        this.saveData(data);
        return data.combo;
    },

    resetCombo() {
        const data = this.getData();
        data.combo = 0;
        this.saveData(data);
    },

    // Record a card review
    recordReview(rating) {
        const data = this.getData();
        data.totalReviews++;

        // Check time for achievements
        const hour = new Date().getHours();
        if (hour < 8) data.earlyBird = true;
        if (hour >= 22) data.nightOwl = true;

        this.saveData(data);

        // Record to calendar
        StudyCalendar.recordActivity(1);

        // Add XP based on rating (with power-up multiplier)
        let xp = this.XP_REWARDS.CARD_REVIEW;
        let reason = 'Card reviewed';

        if (rating === 5) {
            xp = this.XP_REWARDS.CARD_EASY;
            reason = 'Easy card!';
            this.incrementCombo();
        } else if (rating === 3) {
            xp = this.XP_REWARDS.CARD_MEDIUM;
            reason = 'Good recall';
            this.incrementCombo();
        } else {
            xp = this.XP_REWARDS.CARD_HARD;
            reason = 'Keep trying';
            this.resetCombo();
        }

        // Apply power-up multiplier
        xp = xp * PowerUps.getXPMultiplier();

        this.addXP(xp, reason);
        this.updateDailyProgress('reviews', 1);
    },

    // Record quiz result
    recordQuizResult(correct, total) {
        const data = this.getData();
        data.quizzesTaken++;

        // Record to calendar
        StudyCalendar.recordQuiz();

        if (correct === total) {
            data.perfectQuizzes++;
            this.addXP(this.XP_REWARDS.QUIZ_PERFECT * PowerUps.getXPMultiplier(), 'Perfect quiz!');
            this.updateDailyProgress('perfect', 1);
        }

        this.addXP(correct * this.XP_REWARDS.QUIZ_CORRECT * PowerUps.getXPMultiplier(), `${correct} correct answers`);
        this.updateDailyProgress('quizzes', 1);
        this.saveData(data);
    },

    // Record deck creation
    recordDeckCreated() {
        const data = this.getData();
        data.decksCreated++;
        this.saveData(data);
        this.checkAchievements();
    },

    // Track subjects studied
    trackSubject(subject) {
        const data = this.getData();
        if (!data.subjectsStudied.includes(subject)) {
            data.subjectsStudied.push(subject);
            this.saveData(data);
            this.checkAchievements();
        }
    },

    // Check and unlock achievements
    checkAchievements() {
        const data = this.getData();
        const stats = { ...data, ...Storage.getStats() };

        this.ACHIEVEMENTS.forEach(achievement => {
            if (!data.achievements.includes(achievement.id) && achievement.condition(stats)) {
                data.achievements.push(achievement.id);
                this.showAchievement(achievement);
                data.xp += this.XP_REWARDS.ACHIEVEMENT;
                SoundFX.play('achievement');
            }
        });

        this.saveData(data);
    },

    // Get unlocked achievements
    getAchievements() {
        const data = this.getData();
        return this.ACHIEVEMENTS.map(a => ({
            ...a,
            unlocked: data.achievements.includes(a.id)
        }));
    },

    // Daily challenge system
    getDailyChallenge() {
        const data = this.getData();
        const today = new Date().toDateString();

        // Generate new challenge if needed
        if (data.dailyChallengeDate !== today) {
            const randomIndex = Math.floor(Math.random() * this.DAILY_CHALLENGES.length);
            data.dailyChallenge = this.DAILY_CHALLENGES[randomIndex];
            data.dailyChallengeDate = today;
            data.dailyProgress = {};
            this.saveData(data);
        }

        return {
            challenge: data.dailyChallenge,
            progress: data.dailyProgress[data.dailyChallenge.type] || 0
        };
    },

    // Update daily progress
    updateDailyProgress(type, amount) {
        const data = this.getData();
        const today = new Date().toDateString();

        if (data.dailyChallengeDate === today && data.dailyChallenge) {
            data.dailyProgress[type] = (data.dailyProgress[type] || 0) + amount;

            // Check if challenge completed
            if (data.dailyChallenge.type === type &&
                data.dailyProgress[type] >= data.dailyChallenge.target) {
                this.completeDailyChallenge();
            }

            this.saveData(data);
        }
    },

    completeDailyChallenge() {
        this.addXP(this.XP_REWARDS.CHALLENGE_COMPLETE, 'Daily challenge complete!');
        this.showChallengeComplete();
        SoundFX.play('challenge');
    },

    // UI Notifications
    showXPGain(amount, reason) {
        this.showNotification(`+${amount} XP`, reason, 'xp');
    },

    showLevelUp(level) {
        this.showNotification(`Level Up! ${level.icon}`, `You are now ${level.title}`, 'levelup');
    },

    showCombo(combo, bonus) {
        this.showNotification(`${combo}x Combo! 🔥`, `+${bonus} bonus XP`, 'combo');
    },

    showAchievement(achievement) {
        this.showNotification(`Achievement Unlocked! ${achievement.icon}`, achievement.name, 'achievement');
    },

    showChallengeComplete() {
        this.showNotification('Challenge Complete! 🎯', '+150 XP', 'challenge');
    },

    showNotification(title, message, type) {
        const container = document.getElementById('notifications') || this.createNotificationContainer();

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-title">${title}</div>
            <div class="notification-message">${message}</div>
        `;

        container.appendChild(notification);

        // Animate in
        setTimeout(() => notification.classList.add('show'), 10);

        // Remove after delay
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 2500);
    },

    createNotificationContainer() {
        const container = document.createElement('div');
        container.id = 'notifications';
        document.body.appendChild(container);
        return container;
    },

    // Theme management
    getCardTheme() {
        return this.getData().cardTheme;
    },

    setCardTheme(theme) {
        const data = this.getData();
        data.cardTheme = theme;
        this.saveData(data);
    },

    getAppTheme() {
        return this.getData().appTheme;
    },

    setAppTheme(theme) {
        const data = this.getData();
        data.appTheme = theme;
        this.saveData(data);
        document.body.dataset.theme = theme;
    },

    isSoundEnabled() {
        return this.getData().soundEnabled;
    },

    setSoundEnabled(enabled) {
        const data = this.getData();
        data.soundEnabled = enabled;
        this.saveData(data);
    }
};

// Sound Effects
const SoundFX = {
    sounds: {
        flip: { freq: 800, duration: 0.05, type: 'sine' },
        correct: { freq: 523, duration: 0.15, type: 'sine', slide: 659 },
        wrong: { freq: 200, duration: 0.2, type: 'sawtooth' },
        combo: { freq: 440, duration: 0.1, type: 'sine', slide: 880 },
        levelup: { freq: 523, duration: 0.4, type: 'sine', arpeggio: [523, 659, 784, 1047] },
        achievement: { freq: 659, duration: 0.3, type: 'sine', arpeggio: [659, 784, 988] },
        challenge: { freq: 784, duration: 0.3, type: 'sine', slide: 1047 },
        click: { freq: 1000, duration: 0.02, type: 'sine' }
    },

    audioContext: null,

    getContext() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        return this.audioContext;
    },

    play(soundName) {
        if (!Gamification.isSoundEnabled()) return;

        const sound = this.sounds[soundName];
        if (!sound) return;

        try {
            const ctx = this.getContext();

            if (sound.arpeggio) {
                // Play arpeggio
                sound.arpeggio.forEach((freq, i) => {
                    setTimeout(() => this.playTone(freq, sound.duration / sound.arpeggio.length, sound.type), i * 100);
                });
            } else if (sound.slide) {
                // Play with pitch slide
                this.playSlide(sound.freq, sound.slide, sound.duration, sound.type);
            } else {
                // Simple tone
                this.playTone(sound.freq, sound.duration, sound.type);
            }
        } catch (e) {
            // Audio not supported
        }
    },

    playTone(freq, duration, type) {
        const ctx = this.getContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.frequency.value = freq;
        oscillator.type = type;

        gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + duration);
    },

    playSlide(startFreq, endFreq, duration, type) {
        const ctx = this.getContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.frequency.setValueAtTime(startFreq, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(endFreq, ctx.currentTime + duration);
        oscillator.type = type;

        gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + duration);
    }
};

// Pomodoro Timer System
const PomodoroTimer = {
    settings: {
        studyDuration: 25 * 60, // 25 minutes
        shortBreak: 5 * 60,     // 5 minutes
        longBreak: 15 * 60,     // 15 minutes
        sessionsUntilLongBreak: 4
    },

    state: {
        isRunning: false,
        isPaused: false,
        currentTime: 25 * 60,
        isBreak: false,
        sessionsCompleted: 0,
        totalStudyTime: 0,
        interval: null
    },

    getState() {
        const saved = Storage.get('studyflash_pomodoro');
        if (saved) {
            this.state = { ...this.state, ...saved };
        }
        return this.state;
    },

    saveState() {
        Storage.set('studyflash_pomodoro', {
            sessionsCompleted: this.state.sessionsCompleted,
            totalStudyTime: this.state.totalStudyTime
        });
    },

    start(onTick, onComplete) {
        if (this.state.isRunning) return;

        this.state.isRunning = true;
        this.state.isPaused = false;
        this.state.currentTime = this.settings.studyDuration;

        this.state.interval = setInterval(() => {
            if (!this.state.isPaused) {
                this.state.currentTime--;

                if (onTick) onTick(this.state.currentTime, this.state.isBreak);

                if (this.state.currentTime <= 0) {
                    this.completeSession(onComplete);
                }
            }
        }, 1000);
    },

    pause() {
        this.state.isPaused = true;
    },

    resume() {
        this.state.isPaused = false;
    },

    stop() {
        if (this.state.interval) {
            clearInterval(this.state.interval);
            this.state.interval = null;
        }
        this.state.isRunning = false;
        this.state.isPaused = false;
        this.state.currentTime = this.settings.studyDuration;
        this.state.isBreak = false;
    },

    completeSession(onComplete) {
        clearInterval(this.state.interval);
        this.state.interval = null;

        if (!this.state.isBreak) {
            // Completed a study session
            this.state.sessionsCompleted++;
            this.state.totalStudyTime += this.settings.studyDuration;
            this.saveState();

            // Award XP for completing a pomodoro
            Gamification.addXP(50, 'Pomodoro complete!');

            // Check for long break
            if (this.state.sessionsCompleted % this.settings.sessionsUntilLongBreak === 0) {
                this.state.currentTime = this.settings.longBreak;
            } else {
                this.state.currentTime = this.settings.shortBreak;
            }
            this.state.isBreak = true;
        } else {
            // Break finished
            this.state.currentTime = this.settings.studyDuration;
            this.state.isBreak = false;
        }

        this.state.isRunning = false;
        if (onComplete) onComplete(this.state.isBreak, this.state.sessionsCompleted);
        SoundFX.play('achievement');
    },

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    },

    getTodayStats() {
        return {
            sessions: this.state.sessionsCompleted,
            totalMinutes: Math.floor(this.state.totalStudyTime / 60)
        };
    }
};

// Power-ups System
const PowerUps = {
    POWER_UPS: {
        doubleXP: {
            id: 'doubleXP',
            name: 'Double XP',
            desc: 'Earn 2x XP for 10 minutes',
            icon: '⚡',
            duration: 10 * 60 * 1000, // 10 minutes
            cost: 200
        },
        streakShield: {
            id: 'streakShield',
            name: 'Streak Shield',
            desc: 'Protect your streak for 1 day',
            icon: '🛡️',
            duration: 24 * 60 * 60 * 1000, // 24 hours
            cost: 300
        },
        comboBoost: {
            id: 'comboBoost',
            name: 'Combo Boost',
            desc: 'Start with 3x combo',
            icon: '🔥',
            duration: 0,
            cost: 150
        },
        revealHint: {
            id: 'revealHint',
            name: 'Hint Reveal',
            desc: 'Reveal first letter in quiz',
            icon: '💡',
            duration: 0,
            cost: 50
        }
    },

    getData() {
        return Storage.get('studyflash_powerups') || {
            coins: 500, // Start with some coins
            activePowerUps: {},
            inventory: {}
        };
    },

    saveData(data) {
        Storage.set('studyflash_powerups', data);
    },

    getCoins() {
        return this.getData().coins;
    },

    addCoins(amount) {
        const data = this.getData();
        data.coins += amount;
        this.saveData(data);
        return data.coins;
    },

    purchase(powerUpId) {
        const powerUp = this.POWER_UPS[powerUpId];
        if (!powerUp) return { success: false, message: 'Invalid power-up' };

        const data = this.getData();
        if (data.coins < powerUp.cost) {
            return { success: false, message: 'Not enough coins!' };
        }

        data.coins -= powerUp.cost;
        data.inventory[powerUpId] = (data.inventory[powerUpId] || 0) + 1;
        this.saveData(data);

        SoundFX.play('correct');
        return { success: true, message: `Purchased ${powerUp.name}!` };
    },

    activate(powerUpId) {
        const data = this.getData();
        if (!data.inventory[powerUpId] || data.inventory[powerUpId] <= 0) {
            return { success: false, message: 'You don\'t have this power-up!' };
        }

        const powerUp = this.POWER_UPS[powerUpId];
        data.inventory[powerUpId]--;

        if (powerUp.duration > 0) {
            data.activePowerUps[powerUpId] = Date.now() + powerUp.duration;
        }

        this.saveData(data);
        SoundFX.play('combo');

        return { success: true, message: `${powerUp.name} activated!` };
    },

    isActive(powerUpId) {
        const data = this.getData();
        const expiry = data.activePowerUps[powerUpId];
        if (!expiry) return false;

        if (Date.now() > expiry) {
            delete data.activePowerUps[powerUpId];
            this.saveData(data);
            return false;
        }
        return true;
    },

    getXPMultiplier() {
        return this.isActive('doubleXP') ? 2 : 1;
    },

    hasStreakShield() {
        return this.isActive('streakShield');
    },

    getInventory() {
        const data = this.getData();
        return Object.entries(this.POWER_UPS).map(([id, powerUp]) => ({
            ...powerUp,
            owned: data.inventory[id] || 0
        }));
    }
};

// Daily Login Rewards
const DailyRewards = {
    REWARDS: [
        { day: 1, coins: 50, xp: 25, icon: '🎁' },
        { day: 2, coins: 75, xp: 50, icon: '🎁' },
        { day: 3, coins: 100, xp: 75, icon: '🎁' },
        { day: 4, coins: 125, xp: 100, icon: '🎁' },
        { day: 5, coins: 150, xp: 125, icon: '🎁' },
        { day: 6, coins: 200, xp: 150, icon: '🎁' },
        { day: 7, coins: 300, xp: 200, powerUp: 'doubleXP', icon: '🎊' }
    ],

    getData() {
        return Storage.get('studyflash_daily_rewards') || {
            lastClaim: null,
            currentDay: 0,
            totalClaims: 0
        };
    },

    saveData(data) {
        Storage.set('studyflash_daily_rewards', data);
    },

    canClaim() {
        const data = this.getData();
        if (!data.lastClaim) return true;

        const lastClaim = new Date(data.lastClaim);
        const now = new Date();
        const hoursSince = (now - lastClaim) / (1000 * 60 * 60);

        return hoursSince >= 24;
    },

    claim() {
        if (!this.canClaim()) {
            return { success: false, message: 'Already claimed today!' };
        }

        const data = this.getData();
        const now = new Date();
        const lastClaim = data.lastClaim ? new Date(data.lastClaim) : null;

        // Check if streak is broken (more than 48 hours)
        if (lastClaim) {
            const hoursSince = (now - lastClaim) / (1000 * 60 * 60);
            if (hoursSince > 48) {
                data.currentDay = 0; // Reset streak
            }
        }

        data.currentDay = (data.currentDay % 7) + 1;
        data.lastClaim = now.toISOString();
        data.totalClaims++;

        const reward = this.REWARDS[data.currentDay - 1];
        this.saveData(data);

        // Give rewards
        PowerUps.addCoins(reward.coins);
        Gamification.addXP(reward.xp, `Day ${data.currentDay} login bonus!`);

        if (reward.powerUp) {
            const powerUpData = PowerUps.getData();
            powerUpData.inventory[reward.powerUp] = (powerUpData.inventory[reward.powerUp] || 0) + 1;
            PowerUps.saveData(powerUpData);
        }

        SoundFX.play('achievement');
        return {
            success: true,
            reward,
            day: data.currentDay,
            message: `Day ${data.currentDay} reward claimed!`
        };
    },

    getStatus() {
        const data = this.getData();
        return {
            currentDay: data.currentDay,
            canClaim: this.canClaim(),
            rewards: this.REWARDS.map((r, i) => ({
                ...r,
                claimed: i < data.currentDay,
                current: i === data.currentDay
            }))
        };
    }
};

// Study Calendar / Heatmap
const StudyCalendar = {
    getData() {
        return Storage.get('studyflash_calendar') || {};
    },

    saveData(data) {
        Storage.set('studyflash_calendar', data);
    },

    recordActivity(cardsReviewed = 1) {
        const data = this.getData();
        const today = new Date().toISOString().split('T')[0];

        if (!data[today]) {
            data[today] = { cards: 0, quizzes: 0, minutes: 0 };
        }

        data[today].cards += cardsReviewed;
        this.saveData(data);
    },

    recordQuiz() {
        const data = this.getData();
        const today = new Date().toISOString().split('T')[0];

        if (!data[today]) {
            data[today] = { cards: 0, quizzes: 0, minutes: 0 };
        }

        data[today].quizzes++;
        this.saveData(data);
    },

    recordStudyTime(minutes) {
        const data = this.getData();
        const today = new Date().toISOString().split('T')[0];

        if (!data[today]) {
            data[today] = { cards: 0, quizzes: 0, minutes: 0 };
        }

        data[today].minutes += minutes;
        this.saveData(data);
    },

    getHeatmapData(weeks = 12) {
        const data = this.getData();
        const result = [];
        const today = new Date();

        for (let i = weeks * 7 - 1; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];

            const activity = data[dateStr] || { cards: 0, quizzes: 0, minutes: 0 };
            const intensity = this.getIntensity(activity.cards);

            result.push({
                date: dateStr,
                ...activity,
                intensity,
                dayOfWeek: date.getDay()
            });
        }

        return result;
    },

    getIntensity(cards) {
        if (cards === 0) return 0;
        if (cards < 10) return 1;
        if (cards < 25) return 2;
        if (cards < 50) return 3;
        return 4;
    },

    getStreak() {
        const data = this.getData();
        let streak = 0;
        const today = new Date();

        for (let i = 0; i < 365; i++) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];

            if (data[dateStr] && data[dateStr].cards > 0) {
                streak++;
            } else if (i > 0) {
                break;
            }
        }

        return streak;
    },

    getStats() {
        const data = this.getData();
        let totalCards = 0;
        let totalQuizzes = 0;
        let totalMinutes = 0;
        let activeDays = 0;

        Object.values(data).forEach(day => {
            totalCards += day.cards || 0;
            totalQuizzes += day.quizzes || 0;
            totalMinutes += day.minutes || 0;
            if (day.cards > 0 || day.quizzes > 0) activeDays++;
        });

        return { totalCards, totalQuizzes, totalMinutes, activeDays };
    }
};

// Leaderboard System (Live data from Firebase)
const Leaderboard = {
    cachedData: null,
    lastFetch: null,

    async getData() {
        // Check if we have recent cached data (less than 5 minutes old)
        if (this.cachedData && this.lastFetch) {
            const minutesSince = (Date.now() - this.lastFetch) / (1000 * 60);
            if (minutesSince < 5) {
                return this.cachedData;
            }
        }

        // Fetch live data from Firebase
        try {
            if (typeof Database !== 'undefined' && Auth.isSignedIn()) {
                const result = await Database.getLeaderboard(20);

                if (result.success && result.leaderboard.length > 0) {
                    const entries = result.leaderboard.map(user => ({
                        name: user.displayName,
                        xp: user.xp,
                        level: user.level,
                        rank: user.rank,
                        isUser: user.isCurrentUser
                    }));

                    const userEntry = entries.find(e => e.isUser);

                    this.cachedData = {
                        entries: entries.slice(0, 10),
                        userRank: userEntry ? userEntry.rank : entries.length + 1,
                        totalPlayers: entries.length,
                        lastUpdate: new Date().toISOString(),
                        isLive: true
                    };
                    this.lastFetch = Date.now();

                    return this.cachedData;
                }
            }
        } catch (error) {
            console.error('Error fetching live leaderboard:', error);
        }

        // Fallback to local data if Firebase fails
        return this.getLocalData();
    },

    getLocalData() {
        const userData = Gamification.getData();
        return {
            entries: [{
                name: 'You',
                xp: userData.xp || 0,
                level: userData.level || 1,
                rank: 1,
                isUser: true
            }],
            userRank: 1,
            totalPlayers: 1,
            lastUpdate: new Date().toISOString(),
            isLive: false
        };
    },

    async refreshLeaderboard() {
        this.cachedData = null;
        this.lastFetch = null;
        return await this.getData();
    },

    async getWeeklyLeaderboard() {
        const data = await this.getData();
        return {
            ...data,
            entries: data.entries.map(e => ({
                ...e,
                weeklyXP: Math.floor(e.xp * 0.2)
            })).sort((a, b) => b.weeklyXP - a.weeklyXP)
        };
    }
};

// Monetization System
const Premium = {
    // Subscription Plans
    PLANS: {
        free: {
            id: 'free',
            name: 'Free',
            price: 0,
            features: [
                '5 GCSE decks',
                'Basic themes',
                'Daily challenges',
                'Ads supported'
            ],
            limits: {
                decks: 5,
                customDecks: 2,
                dailyReviews: 50,
                quizzesPerDay: 3
            }
        },
        monthly: {
            id: 'monthly',
            name: 'Pro Monthly',
            price: 4.99,
            priceDisplay: '£4.99/month',
            features: [
                'All 17+ GCSE decks',
                'All premium themes',
                'Unlimited reviews',
                'Unlimited quizzes',
                'No ads',
                '2x XP boost',
                'Advanced statistics',
                'Priority support'
            ],
            limits: {
                decks: -1, // unlimited
                customDecks: -1,
                dailyReviews: -1,
                quizzesPerDay: -1
            }
        },
        yearly: {
            id: 'yearly',
            name: 'Pro Yearly',
            price: 39.99,
            priceDisplay: '£39.99/year',
            savings: 'Save 33%!',
            features: [
                'Everything in Pro Monthly',
                '500 bonus coins',
                'Exclusive yearly badge',
                '2 months FREE'
            ],
            limits: {
                decks: -1,
                customDecks: -1,
                dailyReviews: -1,
                quizzesPerDay: -1
            }
        },
        lifetime: {
            id: 'lifetime',
            name: 'Lifetime',
            price: 79.99,
            priceDisplay: '£79.99 once',
            badge: 'BEST VALUE',
            features: [
                'Everything forever',
                '2000 bonus coins',
                'Exclusive lifetime badge',
                'All future updates',
                'Never pay again'
            ],
            limits: {
                decks: -1,
                customDecks: -1,
                dailyReviews: -1,
                quizzesPerDay: -1
            }
        }
    },

    // Coin Packs for purchase
    COIN_PACKS: [
        { id: 'small', coins: 500, price: 0.99, priceDisplay: '£0.99', bonus: '' },
        { id: 'medium', coins: 1200, price: 1.99, priceDisplay: '£1.99', bonus: '+20%' },
        { id: 'large', coins: 3000, price: 4.99, priceDisplay: '£4.99', bonus: '+50%' },
        { id: 'mega', coins: 7500, price: 9.99, priceDisplay: '£9.99', bonus: '+100%' }
    ],

    // Premium Content Packs
    CONTENT_PACKS: [
        {
            id: 'science_bundle',
            name: 'Science Mega Bundle',
            desc: 'Biology, Chemistry & Physics - 500+ cards',
            price: 2.99,
            priceDisplay: '£2.99',
            decks: ['biology-cells', 'biology-body', 'chemistry-atomic', 'chemistry-reactions', 'physics-forces', 'physics-waves']
        },
        {
            id: 'languages_bundle',
            name: 'Languages Bundle',
            desc: 'French, Spanish & German essentials',
            price: 2.99,
            priceDisplay: '£2.99',
            decks: ['french-phrases', 'french-vocab', 'spanish-phrases']
        },
        {
            id: 'humanities_bundle',
            name: 'Humanities Bundle',
            desc: 'History, Geography & RE',
            price: 2.99,
            priceDisplay: '£2.99',
            decks: ['history-ww1', 'history-ww2', 'geography-physical', 'geography-human', 'religious-studies']
        }
    ],

    // Get premium data
    getData() {
        return Storage.get('studyflash_premium') || {
            isPremium: false,
            plan: 'free',
            purchaseDate: null,
            expiryDate: null,
            purchasedPacks: [],
            totalSpent: 0,
            transactions: []
        };
    },

    saveData(data) {
        Storage.set('studyflash_premium', data);
    },

    // Check if user is premium
    isPremium() {
        const data = this.getData();
        if (!data.isPremium) return false;

        // Check expiry for non-lifetime plans
        if (data.plan !== 'lifetime' && data.expiryDate) {
            if (new Date() > new Date(data.expiryDate)) {
                data.isPremium = false;
                data.plan = 'free';
                this.saveData(data);
                return false;
            }
        }
        return true;
    },

    // Get current plan
    getCurrentPlan() {
        const data = this.getData();
        return this.PLANS[data.plan] || this.PLANS.free;
    },

    // Check feature limit
    checkLimit(feature, current) {
        const plan = this.getCurrentPlan();
        const limit = plan.limits[feature];
        if (limit === -1) return true; // unlimited
        return current < limit;
    },

    // Get remaining for a limit
    getRemaining(feature, current) {
        const plan = this.getCurrentPlan();
        const limit = plan.limits[feature];
        if (limit === -1) return 'Unlimited';
        return Math.max(0, limit - current);
    },

    // Simulate purchase (in real app, this would connect to Stripe/PayPal)
    purchase(type, itemId) {
        return new Promise((resolve) => {
            // Simulate payment processing
            setTimeout(() => {
                const data = this.getData();
                const transaction = {
                    id: 'txn_' + Date.now(),
                    type,
                    itemId,
                    date: new Date().toISOString()
                };

                if (type === 'subscription') {
                    const plan = this.PLANS[itemId];
                    if (plan) {
                        data.isPremium = true;
                        data.plan = itemId;
                        data.purchaseDate = new Date().toISOString();

                        // Set expiry
                        if (itemId === 'monthly') {
                            const expiry = new Date();
                            expiry.setMonth(expiry.getMonth() + 1);
                            data.expiryDate = expiry.toISOString();
                        } else if (itemId === 'yearly') {
                            const expiry = new Date();
                            expiry.setFullYear(expiry.getFullYear() + 1);
                            data.expiryDate = expiry.toISOString();
                            // Bonus coins for yearly
                            PowerUps.addCoins(500);
                        } else if (itemId === 'lifetime') {
                            data.expiryDate = null; // Never expires
                            // Bonus coins for lifetime
                            PowerUps.addCoins(2000);
                        }

                        data.totalSpent += plan.price;
                        transaction.amount = plan.price;
                    }
                } else if (type === 'coins') {
                    const pack = this.COIN_PACKS.find(p => p.id === itemId);
                    if (pack) {
                        PowerUps.addCoins(pack.coins);
                        data.totalSpent += pack.price;
                        transaction.amount = pack.price;
                    }
                } else if (type === 'content') {
                    const pack = this.CONTENT_PACKS.find(p => p.id === itemId);
                    if (pack && !data.purchasedPacks.includes(itemId)) {
                        data.purchasedPacks.push(itemId);
                        data.totalSpent += pack.price;
                        transaction.amount = pack.price;
                    }
                }

                data.transactions.push(transaction);
                this.saveData(data);

                resolve({ success: true, transaction });
            }, 1500); // Simulate network delay
        });
    },

    // Check if content pack is owned
    ownsContentPack(packId) {
        const data = this.getData();
        return data.purchasedPacks.includes(packId) || this.isPremium();
    },

    // Get premium themes (only available for premium users)
    getPremiumThemes() {
        return ['holographic', 'diamond', 'rainbow', 'aurora', 'cosmic'];
    },

    // Check if theme is premium
    isThemePremium(themeId) {
        return this.getPremiumThemes().includes(themeId);
    },

    // Get subscription status
    getStatus() {
        const data = this.getData();
        const plan = this.getCurrentPlan();

        return {
            isPremium: this.isPremium(),
            plan: plan,
            expiryDate: data.expiryDate,
            daysRemaining: data.expiryDate ?
                Math.ceil((new Date(data.expiryDate) - new Date()) / (1000 * 60 * 60 * 24)) :
                null,
            totalSpent: data.totalSpent,
            purchasedPacks: data.purchasedPacks
        };
    },

    // Show ads (returns false if premium)
    shouldShowAds() {
        return !this.isPremium();
    },

    // Get XP multiplier (premium gets 2x)
    getXPMultiplier() {
        return this.isPremium() ? 2 : 1;
    }
};

// Ad System (Simulated)
const Ads = {
    lastAdTime: 0,
    adInterval: 5 * 60 * 1000, // Show ad every 5 minutes

    shouldShowAd() {
        if (Premium.isPremium()) return false;

        const now = Date.now();
        if (now - this.lastAdTime > this.adInterval) {
            return true;
        }
        return false;
    },

    showAd(type = 'banner') {
        if (Premium.isPremium()) return;

        this.lastAdTime = Date.now();

        if (type === 'interstitial') {
            this.showInterstitialAd();
        } else if (type === 'rewarded') {
            return this.showRewardedAd();
        } else {
            this.showBannerAd();
        }
    },

    showBannerAd() {
        // Create banner ad element
        let banner = document.getElementById('ad-banner');
        if (!banner) {
            banner = document.createElement('div');
            banner.id = 'ad-banner';
            banner.className = 'ad-banner';
            banner.innerHTML = `
                <div class="ad-content">
                    <span class="ad-label">Advertisement</span>
                    <div class="ad-text">Upgrade to Premium for an ad-free experience!</div>
                    <button class="ad-upgrade-btn" onclick="App.showPricing()">Go Premium</button>
                    <button class="ad-close" onclick="Ads.closeBanner()">&times;</button>
                </div>
            `;
            document.body.appendChild(banner);
        }
        banner.style.display = 'block';
    },

    closeBanner() {
        const banner = document.getElementById('ad-banner');
        if (banner) banner.style.display = 'none';
    },

    showInterstitialAd() {
        return new Promise((resolve) => {
            const overlay = document.createElement('div');
            overlay.className = 'ad-interstitial';
            overlay.innerHTML = `
                <div class="ad-interstitial-content">
                    <div class="ad-interstitial-header">
                        <span class="ad-label">Advertisement</span>
                        <span class="ad-timer" id="ad-timer">Skip in 5s</span>
                    </div>
                    <div class="ad-interstitial-body">
                        <div class="ad-promo">
                            <h2>🎓 Ace Your GCSEs!</h2>
                            <p>Upgrade to StudyFlash Pro for unlimited access</p>
                            <ul>
                                <li>✓ No more ads</li>
                                <li>✓ All 17+ GCSE decks</li>
                                <li>✓ 2x XP boost</li>
                                <li>✓ Premium themes</li>
                            </ul>
                            <button class="btn btn-primary btn-large" onclick="App.showPricing()">
                                Upgrade Now - £4.99/mo
                            </button>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(overlay);

            let countdown = 5;
            const timer = setInterval(() => {
                countdown--;
                const timerEl = document.getElementById('ad-timer');
                if (timerEl) {
                    if (countdown <= 0) {
                        timerEl.innerHTML = '<button class="ad-skip-btn" id="skip-ad">Skip →</button>';
                        document.getElementById('skip-ad').onclick = () => {
                            overlay.remove();
                            resolve();
                        };
                        clearInterval(timer);
                    } else {
                        timerEl.textContent = `Skip in ${countdown}s`;
                    }
                }
            }, 1000);
        });
    },

    showRewardedAd() {
        return new Promise((resolve) => {
            const overlay = document.createElement('div');
            overlay.className = 'ad-interstitial';
            overlay.innerHTML = `
                <div class="ad-interstitial-content">
                    <div class="ad-interstitial-header">
                        <span class="ad-label">Watch to earn reward</span>
                        <span class="ad-timer" id="ad-timer">0:15</span>
                    </div>
                    <div class="ad-interstitial-body">
                        <div class="ad-promo rewarded">
                            <h2>🎁 Watch & Earn!</h2>
                            <p>Watch this short ad to receive:</p>
                            <div class="reward-preview">
                                <span class="reward-icon">🪙</span>
                                <span class="reward-amount">+50 Coins</span>
                            </div>
                            <div class="ad-progress">
                                <div class="ad-progress-fill" id="ad-progress-fill"></div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(overlay);

            let progress = 0;
            const duration = 15; // 15 seconds
            const progressFill = overlay.querySelector('#ad-progress-fill');
            const timerEl = overlay.querySelector('#ad-timer');

            const interval = setInterval(() => {
                progress++;
                progressFill.style.width = (progress / duration * 100) + '%';
                timerEl.textContent = `0:${String(duration - progress).padStart(2, '0')}`;

                if (progress >= duration) {
                    clearInterval(interval);
                    PowerUps.addCoins(50);
                    overlay.remove();
                    Gamification.showNotification('Reward Earned!', '+50 coins', 'achievement');
                    resolve({ rewarded: true, coins: 50 });
                }
            }, 1000);
        });
    }
};

// Card Themes
const CardThemes = {
    themes: {
        default: {
            name: 'Classic',
            front: 'linear-gradient(135deg, #1e293b, #334155)',
            back: 'linear-gradient(135deg, #6366f1, #7c3aed)',
            text: '#f8fafc',
            border: '#475569',
            icon: '📚'
        },
        ocean: {
            name: 'Ocean',
            front: 'linear-gradient(135deg, #0c4a6e, #0369a1)',
            back: 'linear-gradient(135deg, #06b6d4, #22d3ee)',
            text: '#ffffff',
            border: '#0ea5e9',
            icon: '🌊'
        },
        sunset: {
            name: 'Sunset',
            front: 'linear-gradient(135deg, #7c2d12, #c2410c)',
            back: 'linear-gradient(135deg, #f97316, #fb923c)',
            text: '#ffffff',
            border: '#ea580c',
            icon: '🌅'
        },
        forest: {
            name: 'Forest',
            front: 'linear-gradient(135deg, #14532d, #166534)',
            back: 'linear-gradient(135deg, #22c55e, #4ade80)',
            text: '#ffffff',
            border: '#16a34a',
            icon: '🌲'
        },
        galaxy: {
            name: 'Galaxy',
            front: 'linear-gradient(135deg, #1e1b4b, #312e81)',
            back: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
            text: '#ffffff',
            border: '#7c3aed',
            icon: '🌌'
        },
        candy: {
            name: 'Candy',
            front: 'linear-gradient(135deg, #be185d, #db2777)',
            back: 'linear-gradient(135deg, #ec4899, #f472b6)',
            text: '#ffffff',
            border: '#f472b6',
            icon: '🍬'
        },
        neon: {
            name: 'Neon',
            front: 'linear-gradient(135deg, #0f0f0f, #1a1a2e)',
            back: 'linear-gradient(135deg, #00ff88, #00ffff)',
            text: '#ffffff',
            border: '#00ff88',
            icon: '💡',
            glow: true
        },
        gold: {
            name: 'Gold',
            front: 'linear-gradient(135deg, #78350f, #92400e)',
            back: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
            text: '#1c1917',
            border: '#d97706',
            icon: '✨'
        },
        minimal: {
            name: 'Minimal',
            front: 'linear-gradient(135deg, #ffffff, #f1f5f9)',
            back: 'linear-gradient(135deg, #f8fafc, #e2e8f0)',
            text: '#1e293b',
            border: '#cbd5e1',
            icon: '⬜'
        },
        fire: {
            name: 'Fire',
            front: 'linear-gradient(135deg, #450a0a, #7f1d1d)',
            back: 'linear-gradient(135deg, #ef4444, #f87171)',
            text: '#ffffff',
            border: '#dc2626',
            icon: '🔥',
            animated: true
        },
        // Premium Themes
        holographic: {
            name: 'Holographic',
            front: 'linear-gradient(135deg, #ff00ff, #00ffff, #ffff00)',
            back: 'linear-gradient(135deg, #00ffff, #ff00ff, #00ff00)',
            text: '#ffffff',
            border: '#ff00ff',
            icon: '🌈',
            premium: true,
            animated: true
        },
        diamond: {
            name: 'Diamond',
            front: 'linear-gradient(135deg, #e0f7fa, #b2ebf2, #80deea)',
            back: 'linear-gradient(135deg, #4dd0e1, #26c6da, #00bcd4)',
            text: '#004d40',
            border: '#00bcd4',
            icon: '💎',
            premium: true,
            glow: true
        },
        rainbow: {
            name: 'Rainbow',
            front: 'linear-gradient(135deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3)',
            back: 'linear-gradient(135deg, #5f27cd, #341f97, #222f3e)',
            text: '#ffffff',
            border: '#ff6b6b',
            icon: '🦄',
            premium: true
        },
        aurora: {
            name: 'Aurora',
            front: 'linear-gradient(135deg, #0c0c1e, #1a1a3e, #2d2d5e)',
            back: 'linear-gradient(135deg, #00d9ff, #00ff88, #ff00ff)',
            text: '#ffffff',
            border: '#00ff88',
            icon: '🌌',
            premium: true,
            glow: true
        },
        cosmic: {
            name: 'Cosmic',
            front: 'linear-gradient(135deg, #0f0f23, #1a1a2e, #16213e)',
            back: 'linear-gradient(135deg, #e94560, #533483, #0f3460)',
            text: '#ffffff',
            border: '#e94560',
            icon: '🚀',
            premium: true
        }
    },

    getTheme(id) {
        return this.themes[id] || this.themes.default;
    },

    getAllThemes() {
        return Object.entries(this.themes).map(([id, theme]) => ({
            id,
            ...theme
        }));
    },

    applyTheme(themeId) {
        const theme = this.getTheme(themeId);
        const root = document.documentElement;

        root.style.setProperty('--card-front-bg', theme.front);
        root.style.setProperty('--card-back-bg', theme.back);
        root.style.setProperty('--card-text', theme.text);
        root.style.setProperty('--card-border', theme.border);

        if (theme.glow) {
            root.style.setProperty('--card-glow', `0 0 20px ${theme.border}`);
        } else {
            root.style.setProperty('--card-glow', 'none');
        }

        Gamification.setCardTheme(themeId);
    }
};

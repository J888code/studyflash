/* ============================================
   CODEQUEST - Core Game Logic
   Handles XP, Levels, Progress, Achievements
   ============================================ */

const CodeQuest = {
    // ==========================================
    // Configuration
    // ==========================================
    config: {
        xpPerLevel: 100,
        maxLevel: 100,
        livesMax: 3,
        livesRegenTime: 30 * 60 * 1000, // 30 minutes
        streakBonusXP: 50,
        hintCost: 25, // coins
    },

    // ==========================================
    // Level XP Requirements (progressive)
    // ==========================================
    getLevelXP(level) {
        return Math.floor(100 * Math.pow(1.15, level - 1));
    },

    getTotalXPForLevel(level) {
        let total = 0;
        for (let i = 1; i < level; i++) {
            total += this.getLevelXP(i);
        }
        return total;
    },

    // ==========================================
    // Default Player Data
    // ==========================================
    getDefaultPlayer() {
        return {
            username: 'Player1',
            avatar: 'default',
            title: 'Newbie',
            level: 1,
            xp: 0,
            totalXP: 0,
            coins: 100,
            lives: 3,
            livesLastRegen: Date.now(),
            streak: 0,
            lastLoginDate: null,
            achievements: [],
            completedLessons: {},
            unlockedPaths: ['webdev'],
            inventory: {
                avatars: ['default'],
                themes: ['default'],
                titles: ['Newbie']
            },
            settings: {
                sound: true,
                music: true,
                theme: 'default'
            },
            stats: {
                lessonsCompleted: 0,
                totalCodingTime: 0,
                perfectRuns: 0,
                hintsUsed: 0,
                bossesDefeated: 0
            },
            createdAt: Date.now()
        };
    },

    // ==========================================
    // Local Storage Management
    // ==========================================
    savePlayer(player) {
        localStorage.setItem('codequest_player', JSON.stringify(player));
    },

    loadPlayer() {
        const saved = localStorage.getItem('codequest_player');
        if (saved) {
            const player = JSON.parse(saved);
            // Regenerate lives if needed
            this.regenerateLives(player);
            // Check streak
            this.checkStreak(player);
            return player;
        }
        return this.getDefaultPlayer();
    },

    resetPlayer() {
        localStorage.removeItem('codequest_player');
        return this.getDefaultPlayer();
    },

    // ==========================================
    // XP & Leveling
    // ==========================================
    addXP(player, amount) {
        player.xp += amount;
        player.totalXP += amount;

        // Check for level up
        while (player.xp >= this.getLevelXP(player.level) && player.level < this.config.maxLevel) {
            player.xp -= this.getLevelXP(player.level);
            player.level++;
            this.onLevelUp(player);
        }

        this.savePlayer(player);
        return player;
    },

    onLevelUp(player) {
        // Award coins on level up
        player.coins += 50;

        // Check for level-based achievements
        this.checkAchievement(player, 'level_5', player.level >= 5);
        this.checkAchievement(player, 'level_10', player.level >= 10);
        this.checkAchievement(player, 'level_25', player.level >= 25);
        this.checkAchievement(player, 'level_50', player.level >= 50);
        this.checkAchievement(player, 'level_100', player.level >= 100);

        // Unlock new titles
        if (player.level >= 10 && !player.inventory.titles.includes('Code Warrior')) {
            player.inventory.titles.push('Code Warrior');
        }
        if (player.level >= 25 && !player.inventory.titles.includes('Syntax Master')) {
            player.inventory.titles.push('Syntax Master');
        }
        if (player.level >= 50 && !player.inventory.titles.includes('Bug Slayer')) {
            player.inventory.titles.push('Bug Slayer');
        }

        // Show level up notification
        this.showNotification('LEVEL UP!', `You are now Level ${player.level}!`, 'levelup');
    },

    getXPProgress(player) {
        const required = this.getLevelXP(player.level);
        return {
            current: player.xp,
            required: required,
            percentage: Math.min((player.xp / required) * 100, 100)
        };
    },

    // ==========================================
    // Lives System
    // ==========================================
    regenerateLives(player) {
        const now = Date.now();
        const timePassed = now - player.livesLastRegen;
        const livesToRegen = Math.floor(timePassed / this.config.livesRegenTime);

        if (livesToRegen > 0 && player.lives < this.config.livesMax) {
            player.lives = Math.min(player.lives + livesToRegen, this.config.livesMax);
            player.livesLastRegen = now;
            this.savePlayer(player);
        }

        return player;
    },

    loseLife(player) {
        if (player.lives > 0) {
            player.lives--;
            if (player.lives === 0) {
                player.livesLastRegen = Date.now();
            }
            this.savePlayer(player);
        }
        return player;
    },

    getTimeUntilNextLife(player) {
        if (player.lives >= this.config.livesMax) return 0;
        const timePassed = Date.now() - player.livesLastRegen;
        return Math.max(0, this.config.livesRegenTime - (timePassed % this.config.livesRegenTime));
    },

    // ==========================================
    // Streak System
    // ==========================================
    checkStreak(player) {
        const today = new Date().toDateString();
        const lastLogin = player.lastLoginDate;

        if (!lastLogin) {
            player.streak = 1;
            player.lastLoginDate = today;
        } else if (lastLogin !== today) {
            const yesterday = new Date(Date.now() - 86400000).toDateString();
            if (lastLogin === yesterday) {
                player.streak++;
                this.addXP(player, this.config.streakBonusXP);
                this.showNotification('STREAK!', `${player.streak} day streak! +${this.config.streakBonusXP} XP`, 'streak');
            } else {
                player.streak = 1;
            }
            player.lastLoginDate = today;
        }

        // Streak achievements
        this.checkAchievement(player, 'streak_7', player.streak >= 7);
        this.checkAchievement(player, 'streak_30', player.streak >= 30);

        this.savePlayer(player);
        return player;
    },

    // ==========================================
    // Coins & Shop
    // ==========================================
    addCoins(player, amount) {
        player.coins += amount;
        this.savePlayer(player);
        return player;
    },

    spendCoins(player, amount) {
        if (player.coins >= amount) {
            player.coins -= amount;
            this.savePlayer(player);
            return true;
        }
        return false;
    },

    purchaseItem(player, itemType, itemId, cost) {
        if (this.spendCoins(player, cost)) {
            if (!player.inventory[itemType].includes(itemId)) {
                player.inventory[itemType].push(itemId);
                this.savePlayer(player);
            }
            return true;
        }
        return false;
    },

    // ==========================================
    // Lesson Progress
    // ==========================================
    completeLesson(player, pathId, lessonId, xpReward, perfect = false) {
        // Initialize path if not exists
        if (!player.completedLessons[pathId]) {
            player.completedLessons[pathId] = [];
        }

        // Mark lesson as completed
        if (!player.completedLessons[pathId].includes(lessonId)) {
            player.completedLessons[pathId].push(lessonId);
            player.stats.lessonsCompleted++;

            // Bonus XP for perfect run
            let totalXP = xpReward;
            if (perfect) {
                totalXP += Math.floor(xpReward * 0.5);
                player.stats.perfectRuns++;
                this.checkAchievement(player, 'perfect_10', player.stats.perfectRuns >= 10);
            }

            this.addXP(player, totalXP);
            this.addCoins(player, Math.floor(xpReward / 10));

            // Check completion achievements
            this.checkAchievement(player, 'first_lesson', true);
            this.checkAchievement(player, 'lessons_10', player.stats.lessonsCompleted >= 10);
            this.checkAchievement(player, 'lessons_50', player.stats.lessonsCompleted >= 50);
        }

        this.savePlayer(player);
        return player;
    },

    isLessonCompleted(player, pathId, lessonId) {
        return player.completedLessons[pathId]?.includes(lessonId) || false;
    },

    getPathProgress(player, pathId, totalLessons) {
        const completed = player.completedLessons[pathId]?.length || 0;
        return {
            completed,
            total: totalLessons,
            percentage: Math.floor((completed / totalLessons) * 100)
        };
    },

    // ==========================================
    // Achievements
    // ==========================================
    achievements: {
        first_lesson: { name: 'First Blood', desc: 'Complete your first lesson', icon: '🎯' },
        lessons_10: { name: 'Getting Started', desc: 'Complete 10 lessons', icon: '📚' },
        lessons_50: { name: 'Scholar', desc: 'Complete 50 lessons', icon: '🎓' },
        perfect_10: { name: 'Perfectionist', desc: 'Get 10 perfect runs', icon: '💎' },
        level_5: { name: 'Rising Star', desc: 'Reach Level 5', icon: '⭐' },
        level_10: { name: 'Code Warrior', desc: 'Reach Level 10', icon: '⚔️' },
        level_25: { name: 'Syntax Master', desc: 'Reach Level 25', icon: '🔮' },
        level_50: { name: 'Bug Slayer', desc: 'Reach Level 50', icon: '🐛' },
        level_100: { name: 'Legendary Coder', desc: 'Reach Level 100', icon: '👑' },
        streak_7: { name: 'Week Warrior', desc: '7 day streak', icon: '🔥' },
        streak_30: { name: 'Dedicated', desc: '30 day streak', icon: '💪' },
        night_owl: { name: 'Night Owl', desc: 'Code after midnight', icon: '🦉' },
        speed_demon: { name: 'Speed Demon', desc: 'Complete a lesson under 30 seconds', icon: '⚡' },
        boss_first: { name: 'Boss Hunter', desc: 'Defeat your first boss', icon: '🏆' }
    },

    checkAchievement(player, achievementId, condition) {
        if (condition && !player.achievements.includes(achievementId)) {
            player.achievements.push(achievementId);
            const achievement = this.achievements[achievementId];
            if (achievement) {
                this.showNotification('ACHIEVEMENT UNLOCKED!', `${achievement.icon} ${achievement.name}`, 'achievement');
                player.coins += 25; // Bonus coins for achievement
            }
            this.savePlayer(player);
        }
    },

    getAchievements(player) {
        return Object.entries(this.achievements).map(([id, data]) => ({
            id,
            ...data,
            unlocked: player.achievements.includes(id)
        }));
    },

    // ==========================================
    // Leaderboard (Mock Data + Local)
    // ==========================================
    getMockLeaderboard() {
        return [
            { rank: 1, username: 'NeonMaster', level: 87, totalXP: 125000, avatar: 'cyber' },
            { rank: 2, username: 'ByteQueen', level: 76, totalXP: 98000, avatar: 'hacker' },
            { rank: 3, username: 'PixelKnight', level: 72, totalXP: 89000, avatar: 'retro' },
            { rank: 4, username: 'SyntaxSorcerer', level: 68, totalXP: 78000, avatar: 'wizard' },
            { rank: 5, username: 'CodeNinja', level: 65, totalXP: 72000, avatar: 'ninja' },
            { rank: 6, username: 'GridRunner', level: 61, totalXP: 65000, avatar: 'runner' },
            { rank: 7, username: 'BugHunter', level: 58, totalXP: 58000, avatar: 'hunter' },
            { rank: 8, username: 'DataDragon', level: 54, totalXP: 52000, avatar: 'dragon' },
            { rank: 9, username: 'LoopLegend', level: 51, totalXP: 48000, avatar: 'legend' },
            { rank: 10, username: 'ArrayAce', level: 49, totalXP: 45000, avatar: 'ace' },
        ];
    },

    getLeaderboardWithPlayer(player) {
        const leaderboard = this.getMockLeaderboard();

        // Find where player would rank
        let playerRank = leaderboard.length + 1;
        for (let i = 0; i < leaderboard.length; i++) {
            if (player.totalXP > leaderboard[i].totalXP) {
                playerRank = i + 1;
                break;
            }
        }

        return {
            leaderboard,
            playerRank,
            player: {
                rank: playerRank,
                username: player.username,
                level: player.level,
                totalXP: player.totalXP,
                avatar: player.avatar
            }
        };
    },

    // ==========================================
    // Notifications
    // ==========================================
    showNotification(title, message, type = 'info') {
        // Create notification element
        const popup = document.createElement('div');
        popup.className = 'achievement-popup';
        popup.innerHTML = `
            <div class="achievement-popup-header">${type.toUpperCase()}</div>
            <div class="achievement-popup-title">${title}</div>
            <div class="achievement-popup-desc">${message}</div>
        `;

        document.body.appendChild(popup);

        // Play sound if enabled
        const player = this.loadPlayer();
        if (player.settings.sound) {
            this.playSound(type);
        }

        // Animate in
        setTimeout(() => popup.classList.add('show'), 100);

        // Remove after delay
        setTimeout(() => {
            popup.classList.remove('show');
            setTimeout(() => popup.remove(), 500);
        }, 3000);
    },

    // ==========================================
    // Sound Effects
    // ==========================================
    sounds: {
        levelup: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1...',
        achievement: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1...',
        correct: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1...',
        wrong: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1...',
    },

    playSound(soundName) {
        // Placeholder - would use actual audio files
        console.log(`Playing sound: ${soundName}`);
    },

    // ==========================================
    // UI Helpers
    // ==========================================
    updateUI(player) {
        // Update XP bar
        const xpProgress = this.getXPProgress(player);
        const xpFill = document.querySelector('.nav-xp-fill, .xp-bar-fill');
        if (xpFill) {
            xpFill.style.width = `${xpProgress.percentage}%`;
        }

        // Update level display
        const levelDisplay = document.querySelector('.level-badge, .nav-level');
        if (levelDisplay) {
            levelDisplay.textContent = `LVL ${player.level}`;
        }

        // Update coins
        const coinsDisplay = document.querySelector('.coins-display');
        if (coinsDisplay) {
            coinsDisplay.textContent = player.coins;
        }

        // Update lives
        const livesDisplay = document.querySelector('.lives-display');
        if (livesDisplay) {
            livesDisplay.innerHTML = '❤️'.repeat(player.lives) + '🖤'.repeat(this.config.livesMax - player.lives);
        }

        // Update streak
        const streakDisplay = document.querySelector('.streak-display');
        if (streakDisplay) {
            streakDisplay.textContent = `🔥 ${player.streak}`;
        }
    },

    // ==========================================
    // Initialize
    // ==========================================
    init() {
        const player = this.loadPlayer();
        this.updateUI(player);

        // Check for night owl achievement
        const hour = new Date().getHours();
        if (hour >= 0 && hour < 5) {
            this.checkAchievement(player, 'night_owl', true);
        }

        console.log('CodeQuest initialized!', player);
        return player;
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    window.player = CodeQuest.init();
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CodeQuest;
}

/* ============================================
   CODEQUEST - Code Editor Module
   Handles code editing, running, and validation
   ============================================ */

const CodeEditor = {
    editor: null,
    currentLesson: null,
    startTime: null,
    hintsUsed: 0,

    // ==========================================
    // Initialize Editor
    // ==========================================
    init(containerId, lesson) {
        this.currentLesson = lesson;
        this.startTime = Date.now();
        this.hintsUsed = 0;

        // Initialize CodeMirror
        const container = document.getElementById(containerId);
        if (!container) return;

        this.editor = CodeMirror(container, {
            value: lesson.starterCode || '',
            mode: this.getMode(lesson.language),
            theme: 'dracula',
            lineNumbers: true,
            lineWrapping: true,
            tabSize: 2,
            indentWithTabs: false,
            autoCloseTags: true,
            autoCloseBrackets: true,
            matchBrackets: true,
            extraKeys: {
                'Ctrl-Enter': () => this.runCode(),
                'Cmd-Enter': () => this.runCode()
            }
        });

        // Set editor size
        this.editor.setSize('100%', '300px');

        // Setup run button
        const runBtn = document.getElementById('run-btn');
        if (runBtn) {
            runBtn.addEventListener('click', () => this.runCode());
        }

        // Setup hint button
        const hintBtn = document.getElementById('hint-btn');
        if (hintBtn) {
            hintBtn.addEventListener('click', () => this.showHint());
        }

        // Setup reset button
        const resetBtn = document.getElementById('reset-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetCode());
        }

        return this.editor;
    },

    // ==========================================
    // Get CodeMirror Mode
    // ==========================================
    getMode(language) {
        const modes = {
            html: 'htmlmixed',
            css: 'css',
            javascript: 'javascript',
            js: 'javascript',
            python: 'python',
            sql: 'sql'
        };
        return modes[language?.toLowerCase()] || 'htmlmixed';
    },

    // ==========================================
    // Get Current Code
    // ==========================================
    getCode() {
        return this.editor ? this.editor.getValue() : '';
    },

    // ==========================================
    // Set Code
    // ==========================================
    setCode(code) {
        if (this.editor) {
            this.editor.setValue(code);
        }
    },

    // ==========================================
    // Reset to Starter Code
    // ==========================================
    resetCode() {
        if (this.currentLesson) {
            this.setCode(this.currentLesson.starterCode);
            this.clearOutput();
            this.clearResults();
        }
    },

    // ==========================================
    // Run Code
    // ==========================================
    runCode() {
        const code = this.getCode();
        const lesson = this.currentLesson;

        if (!lesson) return;

        // Clear previous results
        this.clearResults();

        // Run tests
        const results = this.runTests(code, lesson.tests);

        // Display results
        this.displayResults(results);

        // Render preview for HTML
        if (lesson.language === 'html') {
            this.renderPreview(code);
        }

        // Check if all tests passed
        const allPassed = results.every(r => r.passed);

        if (allPassed) {
            this.onSuccess();
        }

        return results;
    },

    // ==========================================
    // Run Tests
    // ==========================================
    runTests(code, tests) {
        if (!tests) return [];

        return tests.map(test => {
            let passed = false;
            try {
                passed = test.check(code);
            } catch (e) {
                console.error('Test error:', e);
            }
            return {
                name: test.name,
                passed
            };
        });
    },

    // ==========================================
    // Display Results
    // ==========================================
    displayResults(results) {
        const container = document.getElementById('test-results');
        if (!container) return;

        container.innerHTML = '';

        results.forEach(result => {
            const div = document.createElement('div');
            div.className = `test-result ${result.passed ? 'passed' : 'failed'}`;
            div.innerHTML = `
                <span class="test-icon">${result.passed ? '✓' : '✗'}</span>
                <span class="test-name">${result.name}</span>
            `;
            container.appendChild(div);
        });

        // Show pass/fail summary
        const passed = results.filter(r => r.passed).length;
        const total = results.length;
        const summary = document.getElementById('test-summary');
        if (summary) {
            summary.textContent = `${passed}/${total} tests passed`;
            summary.className = passed === total ? 'all-passed' : 'some-failed';
        }
    },

    // ==========================================
    // Clear Results
    // ==========================================
    clearResults() {
        const container = document.getElementById('test-results');
        if (container) container.innerHTML = '';

        const summary = document.getElementById('test-summary');
        if (summary) summary.textContent = '';
    },

    // ==========================================
    // Render HTML Preview
    // ==========================================
    renderPreview(code) {
        const preview = document.getElementById('preview-frame');
        if (!preview) return;

        // Create sandboxed iframe content
        const blob = new Blob([code], { type: 'text/html' });
        const url = URL.createObjectURL(blob);

        preview.src = url;

        // Cleanup old URLs
        setTimeout(() => URL.revokeObjectURL(url), 1000);
    },

    // ==========================================
    // Clear Output/Preview
    // ==========================================
    clearOutput() {
        const preview = document.getElementById('preview-frame');
        if (preview) {
            preview.src = 'about:blank';
        }

        const output = document.getElementById('console-output');
        if (output) {
            output.innerHTML = '';
        }
    },

    // ==========================================
    // Show Hint
    // ==========================================
    showHint() {
        const lesson = this.currentLesson;
        if (!lesson || !lesson.hints) return;

        const player = CodeQuest.loadPlayer();

        // Check if player has coins
        const hintCost = CodeQuest.config.hintCost;
        if (player.coins < hintCost) {
            CodeQuest.showNotification('Not Enough Coins', `Hints cost ${hintCost} coins`, 'error');
            return;
        }

        // Get next hint
        if (this.hintsUsed >= lesson.hints.length) {
            CodeQuest.showNotification('No More Hints', 'You\'ve used all hints for this lesson', 'info');
            return;
        }

        // Deduct coins and show hint
        CodeQuest.spendCoins(player, hintCost);
        player.stats.hintsUsed++;
        CodeQuest.savePlayer(player);

        const hint = lesson.hints[this.hintsUsed];
        this.hintsUsed++;

        // Display hint
        const hintDisplay = document.getElementById('hint-display');
        if (hintDisplay) {
            hintDisplay.innerHTML = `
                <div class="hint-box">
                    <span class="hint-label">HINT ${this.hintsUsed}/${lesson.hints.length}</span>
                    <p>${hint}</p>
                </div>
            `;
        }

        CodeQuest.showNotification('Hint Revealed', `-${hintCost} coins`, 'info');
        CodeQuest.updateUI(player);
    },

    // ==========================================
    // On Success
    // ==========================================
    onSuccess() {
        const lesson = this.currentLesson;
        if (!lesson) return;

        // Calculate time bonus
        const timeSpent = (Date.now() - this.startTime) / 1000;
        const isPerfect = this.hintsUsed === 0;
        const isSpeedRun = timeSpent < 30;

        // Get player and complete lesson
        const player = CodeQuest.loadPlayer();
        const pathId = new URLSearchParams(window.location.search).get('path') || 'webdev';

        // Check if already completed
        if (CodeQuest.isLessonCompleted(player, pathId, lesson.id)) {
            CodeQuest.showNotification('Already Completed', 'You\'ve already finished this lesson', 'info');
            return;
        }

        // Complete the lesson
        CodeQuest.completeLesson(player, pathId, lesson.id, lesson.xp, isPerfect);

        // Speed demon achievement
        if (isSpeedRun) {
            CodeQuest.checkAchievement(player, 'speed_demon', true);
        }

        // Boss achievement
        if (lesson.isBoss) {
            player.stats.bossesDefeated++;
            CodeQuest.checkAchievement(player, 'boss_first', true);
            CodeQuest.savePlayer(player);
        }

        // Show success modal
        this.showSuccessModal(lesson, isPerfect, timeSpent);
    },

    // ==========================================
    // Show Success Modal
    // ==========================================
    showSuccessModal(lesson, isPerfect, timeSpent) {
        let bonusText = '';
        let totalXP = lesson.xp;

        if (isPerfect) {
            const bonus = Math.floor(lesson.xp * 0.5);
            totalXP += bonus;
            bonusText = `<div class="bonus">+${bonus} XP Perfect Bonus!</div>`;
        }

        const modal = document.createElement('div');
        modal.className = 'success-modal';
        modal.innerHTML = `
            <div class="success-content">
                <div class="success-header">${lesson.isBoss ? '🏆 BOSS DEFEATED!' : '✨ LEVEL COMPLETE!'}</div>
                <div class="success-title">${lesson.title}</div>
                <div class="success-xp">+${totalXP} XP</div>
                ${bonusText}
                <div class="success-time">Time: ${Math.floor(timeSpent)}s</div>
                <div class="success-stars">
                    ${'⭐'.repeat(isPerfect ? 3 : this.hintsUsed === 1 ? 2 : 1)}
                </div>
                <button class="btn btn-primary" onclick="window.location.href='path-webdev.html'">
                    Continue
                </button>
            </div>
        `;

        document.body.appendChild(modal);

        // Animate in
        setTimeout(() => modal.classList.add('show'), 100);
    }
};

// Add success modal styles dynamically
const modalStyles = document.createElement('style');
modalStyles.textContent = `
    .success-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 5000;
        opacity: 0;
        transition: opacity 0.3s;
    }

    .success-modal.show {
        opacity: 1;
    }

    .success-content {
        background: var(--bg-darker, #16213e);
        border: 4px solid var(--neon-yellow, #ffcd00);
        padding: 50px;
        text-align: center;
        max-width: 400px;
    }

    .success-header {
        font-family: 'Press Start 2P', cursive;
        font-size: 16px;
        color: var(--neon-yellow, #ffcd00);
        margin-bottom: 20px;
        animation: pulse 1s infinite;
    }

    .success-title {
        font-family: 'Press Start 2P', cursive;
        font-size: 14px;
        color: white;
        margin-bottom: 30px;
    }

    .success-xp {
        font-family: 'VT323', monospace;
        font-size: 48px;
        color: var(--neon-green, #39ff14);
        text-shadow: 0 0 20px var(--neon-green, #39ff14);
    }

    .bonus {
        font-family: 'VT323', monospace;
        font-size: 24px;
        color: var(--neon-pink, #ff2a6d);
        margin: 10px 0;
    }

    .success-time {
        font-family: 'VT323', monospace;
        font-size: 20px;
        color: var(--text-muted, rgba(255,255,255,0.5));
        margin: 15px 0;
    }

    .success-stars {
        font-size: 36px;
        margin: 20px 0;
    }

    .success-content .btn {
        margin-top: 20px;
    }

    .test-result {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px;
        margin: 5px 0;
        border-radius: 4px;
        font-family: 'VT323', monospace;
        font-size: 18px;
    }

    .test-result.passed {
        background: rgba(57, 255, 20, 0.1);
        border: 1px solid var(--neon-green, #39ff14);
        color: var(--neon-green, #39ff14);
    }

    .test-result.failed {
        background: rgba(255, 42, 109, 0.1);
        border: 1px solid var(--neon-pink, #ff2a6d);
        color: var(--neon-pink, #ff2a6d);
    }

    .test-icon {
        font-size: 20px;
    }

    #test-summary {
        font-family: 'Press Start 2P', cursive;
        font-size: 12px;
        margin-top: 15px;
        padding: 10px;
    }

    #test-summary.all-passed {
        color: var(--neon-green, #39ff14);
    }

    #test-summary.some-failed {
        color: var(--neon-pink, #ff2a6d);
    }

    .hint-box {
        background: rgba(255, 205, 0, 0.1);
        border: 2px solid var(--neon-yellow, #ffcd00);
        padding: 15px;
        margin-top: 15px;
    }

    .hint-label {
        font-family: 'Press Start 2P', cursive;
        font-size: 10px;
        color: var(--neon-yellow, #ffcd00);
    }

    .hint-box p {
        font-family: 'VT323', monospace;
        font-size: 18px;
        color: white;
        margin-top: 10px;
    }

    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
`;
document.head.appendChild(modalStyles);

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CodeEditor;
}

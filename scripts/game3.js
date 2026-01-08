document.addEventListener('DOMContentLoaded', () => {
    // Check authentication
    checkAuth(true);
    const currentUser = getCurrentUser();

    // --- CONFIG ---
    const MAX_LEVELS = 23;
    const SCORE_CORRECT = 3;
    const SCORE_WRONG = -1;
    const SHAPES = ['🟢', '🟦', '🔼', '⭐', '🔷', '⚡', '🌀', '⭕'];

    // --- STATE ---
    let currentLevel = currentUser.game3Level || 1;
    let score = currentUser.game3Score || 0;
    let currentPuzzle = null;
    let isClickable = true;

    // --- DOM ELEMENTS ---
    const screens = {
        intro: document.getElementById('intro-screen'),
        game: document.getElementById('game-screen'),
        victory: document.getElementById('victory-screen')
    };

    const ui = {
        level: document.getElementById('level-display'),
        geneHint: document.getElementById('gene-hint'),
        grid: document.getElementById('puzzle-grid'),
        options: document.getElementById('options-container'),
        feedback: document.getElementById('feedback-overlay'),
        finalScore: document.getElementById('final-score'),
        finalRank: document.getElementById('final-rank')
    };

    // Update Initial Stats Bar
    updateStatsBar();
    document.getElementById('username-display').textContent = currentUser.name.split(' ')[0];
    document.getElementById('introLevel').textContent = currentLevel;

    // --- INTRO SEQUENCE ---
    // Skip intro animation and go directly to game
    switchScreen('game');
    loadLevel(currentLevel);

    // --- CORE LOGIC ---
    function loadLevel(lvl) {
        if (lvl > MAX_LEVELS) {
            endGame();
            return;
        }

        isClickable = true;
        ui.level.textContent = `Lv. ${lvl}`;
        ui.geneHint.textContent = getRandomEncouragement();

        // Generate Puzzle
        currentPuzzle = generatePuzzle(lvl);
        renderPuzzle(currentPuzzle);
    }

    function generatePuzzle(lvl) {
        if (lvl <= 8) return generateSequencePuzzle(lvl);
        if (lvl <= 16) return generateShiftPuzzle(lvl);
        return generateMatrixPuzzle(lvl);
    }

    // Logic 1: Sequence (Levels 1-8)
    function generateSequencePuzzle(lvl) {
        const len = 2 + (lvl % 3); // Pattern length varies
        const palette = getRandomPalette(len + 2);
        const sequence = palette.slice(0, len);

        let grid = [];
        for (let i = 0; i < 8; i++) grid.push(sequence[i % len]);

        const answer = sequence[8 % len];
        const options = generateOptions(answer, palette);

        return {
            grid, answer, options,
            hint: "Look at the repeating order of shapes."
        };
    }

    // Logic 2: Shift (Levels 9-16)
    function generateShiftPuzzle(lvl) {
        const palette = getRandomPalette(3);
        const [a, b, c] = palette;

        // Row 1: A B C
        // Row 2: C A B (Shifted right)
        // Row 3: B C ? (Answer: A)

        const grid = [
            a, b, c,
            c, a, b,
            b, c
        ];

        const answer = a;
        const options = generateOptions(answer, SHAPES);

        return {
            grid, answer, options,
            hint: "Each row shifts the shapes one step."
        };
    }

    // Logic 3: Matrix/Latin Square (Levels 17-23)
    function generateMatrixPuzzle(lvl) {
        const palette = getRandomPalette(3);
        const [a, b, c] = palette;

        // Latin Square: Unique in row and col
        // A B C
        // B C A
        // C A B

        const grid = [
            a, b, c,
            b, c, a,
            c, a
        ];

        const answer = b;
        const options = generateOptions(answer, SHAPES);

        return {
            grid, answer, options,
            hint: "Every row and column must have unique shapes."
        };
    }

    function generateOptions(answer, palette) {
        const wrong = palette.filter(s => s !== answer).sort(() => Math.random() - 0.5).slice(0, 2);
        // Ensure we always have 3 options, filling with random if palette is small
        while (wrong.length < 2) {
            const r = SHAPES[Math.floor(Math.random() * SHAPES.length)];
            if (r !== answer && !wrong.includes(r)) wrong.push(r);
        }
        return [answer, ...wrong].sort(() => Math.random() - 0.5);
    }

    function getRandomPalette(count) {
        return SHAPES.slice().sort(() => Math.random() - 0.5).slice(0, count);
    }

    // --- RENDER ---
    function renderPuzzle(puzzle) {
        ui.grid.innerHTML = '';
        ui.options.innerHTML = '';

        // Grid
        puzzle.grid.forEach(s => {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.textContent = s;
            ui.grid.appendChild(cell);
        });

        // Empty Slot
        const q = document.createElement('div');
        q.className = 'cell question-mark';
        q.textContent = '?';
        ui.grid.appendChild(q);

        // Options
        puzzle.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.textContent = opt;
            btn.onclick = () => handleAnswer(opt);
            ui.options.appendChild(btn);
        });
    }

    function updateStatsBar() {
        document.getElementById('currentScore').textContent = score;
        document.getElementById('currentLevel').textContent = currentLevel;
        document.getElementById('levelsCompleted').textContent = currentLevel - 1;
    }

    // --- INTERACTION ---
    function handleAnswer(selected) {
        if (!isClickable) return;

        if (selected === currentPuzzle.answer) {
            // Correct
            isClickable = false;
            score += SCORE_CORRECT;
            showFeedback('Correct!', 'success');
            celebrate();

            updateStatsBar();

            // Save Progress
            updateGameScore(currentUser.id, 3, SCORE_CORRECT, currentLevel + 1);

            setTimeout(() => {
                currentLevel++;
                updateStatsBar();
                loadLevel(currentLevel);
            }, 1000);
        } else {
            // Wrong
            score = Math.max(0, score + SCORE_WRONG);
            showFeedback('-1', 'error');
            ui.geneHint.textContent = `💡 Hint: ${currentPuzzle.hint}`;

            const gameScreen = document.getElementById('game-screen');
            gameScreen.classList.add('shake');
            setTimeout(() => gameScreen.classList.remove('shake'), 500);
            updateStatsBar();

            // Save updated score
            updateGameScore(currentUser.id, 3, SCORE_WRONG, currentLevel);
        }
    }

    function showFeedback(text, type) {
        ui.feedback.textContent = text;
        ui.feedback.className = ''; // reset
        ui.feedback.classList.remove('hidden');
        ui.feedback.style.color = type === 'success' ? '#00b894' : '#d63031';

        // Trigger animation reflow
        void ui.feedback.offsetWidth;

        setTimeout(() => {
            ui.feedback.classList.add('hidden');
        }, 800);
    }

    function celebrate() {
        // Simple confetti effect
        for (let i = 0; i < 20; i++) {
            const c = document.createElement('div');
            c.className = 'confetti';
            c.style.left = Math.random() * 100 + 'vw';
            c.style.backgroundColor = ['#fab1a0', '#00b894', '#0984e3', '#fdcb6e'][Math.floor(Math.random() * 4)];
            c.style.animationDuration = (Math.random() * 1 + 1) + 's';
            document.body.appendChild(c);
            setTimeout(() => c.remove(), 2000);
        }
    }

    function switchScreen(screenName) {
        // Hide all screens
        Object.values(screens).forEach(s => {
            s.classList.remove('active');
            if (!s.classList.contains('hidden')) {
                s.classList.add('hidden');
            }
        });

        // Show target screen
        const target = screens[screenName];
        if (target) {
            target.classList.remove('hidden');
            // Small delay for smooth transition
            setTimeout(() => target.classList.add('active'), 10);
        }
    }

    function endGame() {
        switchScreen('victory');
        ui.finalScore.textContent = score;

        let rank = 'Novice';
        if (score > 60) rank = 'Pattern Grandmaster 🧞‍♂️';
        else if (score > 40) rank = 'Logic Wizard 🧙‍♂️';
        else if (score > 20) rank = 'Apprentice 🎓';

        ui.finalRank.textContent = rank;
    }

    function getRandomEncouragement() {
        const msgs = ["You can do this! 💪", "Focus on the shapes 👀", "Patterns are everywhere 🔍", "Keep going! 🎯"];
        return msgs[Math.floor(Math.random() * msgs.length)];
    }

    // Restart
    const btnRestart = document.getElementById('btn-restart');
    if (btnRestart) {
        btnRestart.onclick = () => {
            if (confirm("Restart from Level 1?")) {
                // Reset to level 1 and score 0
                updateGameScore(currentUser.id, 3, -score, 1); // Reset score to 0 by subtracting current score
                location.reload();
            }
        };
    }
});

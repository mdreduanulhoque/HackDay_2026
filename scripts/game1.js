// ============================================
// GAME 1: PATTERN DETECTIVE
// Identify whether stories are about Shape, Color, or Feeling
// ============================================

// Story database with progressive difficulty
const GAME1_STORIES = [
    // ========== EASY LEVEL (1-10) ==========
    {
        id: 1,
        difficulty: 'easy',
        level: 1,
        story: "The circle rolled down the hill, perfectly round and smooth. It bounced along the path, maintaining its circular form with every rotation.",
        correctAnswer: 'shape',
        explanation: "The story repeatedly mentions 'circle', 'round', and 'circular form' - all describing a geometric shape."
    },
    {
        id: 2,
        difficulty: 'easy',
        level: 1,
        story: "She felt a warm happiness spread through her chest like sunshine. Smiling broadly, joy radiated from her every movement.",
        correctAnswer: 'feeling',
        explanation: "The story describes emotions: 'happiness', 'joy', and 'smiling' - all indicating a positive feeling."
    },
    {
        id: 3,
        difficulty: 'easy',
        level: 2,
        story: "The walls were painted a brilliant red, matching the crimson curtains. Everything in the room glowed with the same ruby hue.",
        correctAnswer: 'color',
        explanation: "The story focuses on color words: 'red', 'crimson', and 'ruby' - all describing shades of the same color."
    },
    {
        id: 4,
        difficulty: 'easy',
        level: 2,
        story: "The triangle stood tall, its three sides forming perfect angles. Each corner pointed sharply, creating a distinct geometric figure.",
        correctAnswer: 'shape',
        explanation: "The story describes a triangle with 'three sides', 'angles', and 'corners' - geometric shape characteristics."
    },
    {
        id: 5,
        difficulty: 'easy',
        level: 3,
        story: "Anxiety gripped her stomach as she waited. The nervous tension made her hands shake and her heart race with worry.",
        correctAnswer: 'feeling',
        explanation: "The story conveys emotional states: 'anxiety', 'nervous tension', and 'worry' - all describing feelings of unease."
    },
    {
        id: 6,
        difficulty: 'easy',
        level: 3,
        story: "The ocean stretched endlessly, a deep blue expanse meeting the azure sky. Turquoise waves danced beneath the cobalt horizon.",
        correctAnswer: 'color',
        explanation: "The story emphasizes blue colors: 'blue', 'azure', 'turquoise', and 'cobalt' - all shades of blue."
    },
    {
        id: 7,
        difficulty: 'easy',
        level: 4,
        story: "The square box sat on the table, each of its four equal sides perfectly aligned. Its right angles formed a flawless rectangular outline.",
        correctAnswer: 'shape',
        explanation: "The story describes a square/rectangle: 'four equal sides', 'right angles', and 'rectangular outline' - geometric shapes."
    },
    {
        id: 8,
        difficulty: 'easy',
        level: 4,
        story: "Sadness washed over him like a cold wave. His eyes welled up with tears as the melancholy settled deep in his soul.",
        correctAnswer: 'feeling',
        explanation: "The story describes sad emotions: 'sadness', 'tears', and 'melancholy' - all indicating sorrowful feelings."
    },
    {
        id: 9,
        difficulty: 'easy',
        level: 5,
        story: "The forest was lush with green leaves. Emerald moss covered the ground while jade vines climbed verdant trees.",
        correctAnswer: 'color',
        explanation: "The story focuses on green: 'green', 'emerald', 'jade', and 'verdant' - all shades of green."
    },
    {
        id: 10,
        difficulty: 'easy',
        level: 5,
        story: "The sphere rolled across the floor, its curved surface reflecting light from every angle. The ball's rounded shape made it move effortlessly.",
        correctAnswer: 'shape',
        explanation: "The story describes a sphere/ball: 'sphere', 'curved surface', 'rounded shape' - all referring to a round 3D shape."
    },

    // ========== MEDIUM LEVEL (11-20) ==========
    {
        id: 11,
        difficulty: 'medium',
        level: 6,
        story: "She painted the sky with strokes of melancholy blue, each layer deeper than the last. The canvas captured the sapphire tears of twilight.",
        correctAnswer: 'color',
        explanation: "Despite metaphorical language, the story is about blue: 'melancholy blue', 'sapphire' - color descriptions."
    },
    {
        id: 12,
        difficulty: 'medium',
        level: 6,
        story: "His thoughts moved in spirals, winding inward like a coiled spring. The helical pattern of his reasoning twisted tighter with each consideration.",
        correctAnswer: 'shape',
        explanation: "The story describes spiral shapes: 'spirals', 'coiled', 'helical pattern', and 'twisted' - all spiral/circular shapes."
    },
    {
        id: 13,
        difficulty: 'medium',
        level: 7,
        story: "The weight in his chest wasn't physical, but it pressed down with the force of a thousand disappointments. Regret clouded every breath.",
        correctAnswer: 'feeling',
        explanation: "The story describes emotional weight: 'disappointments' and 'regret' - feelings of burden and sorrow."
    },
    {
        id: 14,
        difficulty: 'medium',
        level: 7,
        story: "Morning crept through the window in shades of amber and gold. The honey-colored light turned everything it touched into warm bronze.",
        correctAnswer: 'color',
        explanation: "The story focuses on warm colors: 'amber', 'gold', 'honey-colored', and 'bronze' - golden/orange hues."
    },
    {
        id: 15,
        difficulty: 'medium',
        level: 8,
        story: "Her life had edges now, sharp boundaries where softness used to be. The angular decisions cut her path into distinct segments.",
        correctAnswer: 'shape',
        explanation: "The story uses shape metaphors: 'edges', 'sharp boundaries', 'angular' - describing angular shapes and lines."
    },
    {
        id: 16,
        difficulty: 'medium',
        level: 8,
        story: "Wonder filled her eyes as she gazed at the stars. Awe and amazement sparked within her, igniting a childlike curiosity.",
        correctAnswer: 'feeling',
        explanation: "The story conveys emotions of amazement: 'wonder', 'awe', 'amazement', and 'curiosity' - feelings of fascination."
    },
    {
        id: 17,
        difficulty: 'medium',
        level: 9,
        story: "The sunset bled crimson across the horizon, staining the clouds with shades of scarlet and rose. Blood-red light painted the evening.",
        correctAnswer: 'color',
        explanation: "The story describes red hues: 'crimson', 'scarlet', 'rose', and 'blood-red' - all variations of red."
    },
    {
        id: 18,
        difficulty: 'medium',
        level: 9,
        story: "The building rose in stark vertical lines, each floor stacked like rectangular blocks. Its geometric precision dominated the skyline.",
        correctAnswer: 'shape',
        explanation: "The story describes architectural shapes: 'vertical lines', 'rectangular blocks', 'geometric precision' - geometric shapes."
    },
    {
        id: 19,
        difficulty: 'medium',
        level: 10,
        story: "Contentment settled over her like a warm blanket. Peace filled the quiet moments, bringing a gentle satisfaction to her weary heart.",
        correctAnswer: 'feeling',
        explanation: "The story describes peaceful emotions: 'contentment', 'peace', and 'satisfaction' - feelings of calm happiness."
    },
    {
        id: 20,
        difficulty: 'medium',
        level: 10,
        story: "Midnight wrapped the world in inky darkness. Obsidian shadows swallowed the charcoal streets in an ebony embrace.",
        correctAnswer: 'color',
        explanation: "The story focuses on black/dark colors: 'inky', 'obsidian', 'charcoal', and 'ebony' - all dark color descriptors."
    },

    // ========== HARD LEVEL (21-30) ==========
    {
        id: 21,
        difficulty: 'hard',
        level: 11,
        story: "Society's expectations formed invisible walls around her choices. The rigid structure of tradition boxed her in, leaving little room to breathe.",
        correctAnswer: 'shape',
        explanation: "The story uses shape metaphors: 'walls', 'structure', and 'boxed in' - describing restrictive geometric shapes."
    },
    {
        id: 22,
        difficulty: 'hard',
        level: 11,
        story: "The truth wasn't black and white, but rather existed in the pearl-grey spaces between certainty and doubt. Silver linings adorned clouds of ambiguity.",
        correctAnswer: 'color',
        explanation: "The story discusses grey tones: 'black and white', 'pearl-grey', 'silver' - colors representing moral ambiguity."
    },
    {
        id: 23,
        difficulty: 'hard',
        level: 12,
        story: "The realization struck like lightning, electric and impossible to ignore. Excitement and terror intertwined, creating a cocktail of overwhelming sensation.",
        correctAnswer: 'feeling',
        explanation: "The story describes intense emotions: 'excitement' and 'terror' - powerful conflicting feelings."
    },
    {
        id: 24,
        difficulty: 'hard',
        level: 12,
        story: "Time moved not in a straight line but in loops and circles, bringing him back to familiar places with new understanding. The cyclical nature of growth spiraled ever upward.",
        correctAnswer: 'shape',
        explanation: "The story describes circular/spiral patterns: 'loops', 'circles', 'cyclical', 'spiraled' - non-linear shapes."
    },
    {
        id: 25,
        difficulty: 'hard',
        level: 13,
        story: "Envy tinged her admiration with something bitter. She wrestled with the green-eyed monster silently, ashamed of the resentment blooming within.",
        correctAnswer: 'feeling',
        explanation: "The story is primarily about the emotion of envy and resentment. While 'green-eyed monster' appears, it's an idiom for jealousy, not a literal color description."
    },
    {
        id: 26,
        difficulty: 'hard',
        level: 13,
        story: "The landscape stretched flat and endless, horizons forming parallel lines that never touched. Flatness dominated everything, removing all dimension from the world.",
        correctAnswer: 'shape',
        explanation: "The story describes flat, linear geometry: 'flat', 'parallel lines', 'flatness', 'dimension' - geometric concepts."
    },
    {
        id: 27,
        difficulty: 'hard',
        level: 14,
        story: "Her reputation remained spotless, pristine as fresh snow. The unblemished white of her record stood in stark contrast to the stained pasts of others.",
        correctAnswer: 'color',
        explanation: "The story uses white/color metaphors: 'spotless', 'pristine', 'fresh snow', 'unblemished white' - describing whiteness/purity."
    },
    {
        id: 28,
        difficulty: 'hard',
        level: 14,
        story: "Nostalgia washed through him in waves, each memory carrying the sweet ache of times gone by. The bittersweet longing for yesterday consumed his present.",
        correctAnswer: 'feeling',
        explanation: "The story describes complex emotions: 'nostalgia', 'ache', 'bittersweet longing' - feelings about the past."
    },
    {
        id: 29,
        difficulty: 'hard',
        level: 15,
        story: "Their relationship existed in sharp contrasts, zigzagging between harmony and discord. The jagged edges of conflict carved irregular patterns into their history.",
        correctAnswer: 'shape',
        explanation: "The story uses shape language: 'sharp contrasts', 'zigzagging', 'jagged edges', 'irregular patterns' - angular, uneven shapes."
    },
    {
        id: 30,
        difficulty: 'hard',
        level: 15,
        story: "Hope glimmered faintly like a candle in the dark. Despite everything, optimism persisted, refusing to be extinguished by circumstance.",
        correctAnswer: 'feeling',
        explanation: "The story describes hopeful emotions: 'hope', 'optimism', 'persisted' - feelings of positive expectation despite difficulty."
    }
];

// Game state
let gameState = {
    currentStoryIndex: 0,
    score: 0,
    level: 1,
    attempts: 0,
    userId: null
};

// ============================================
// GAME INITIALIZATION
// ============================================

function initGame1() {
    checkAuth(true);
    const user = getCurrentUser();

    if (!user) {
        window.location.href = 'index.html';
        return;
    }

    gameState.userId = user.id;
    gameState.score = user.game1Score;
    gameState.level = user.game1Level;
    gameState.currentStoryIndex = Math.min(user.game1Completed, GAME1_STORIES.length - 1);

    updateUI();
    loadStory();
}

// ============================================
// UI UPDATES
// ============================================

function updateUI() {
    document.getElementById('currentScore').textContent = gameState.score;
    document.getElementById('currentLevel').textContent = gameState.level;
    document.getElementById('storiesCompleted').textContent = gameState.currentStoryIndex;
}

function loadStory() {
    if (gameState.currentStoryIndex >= GAME1_STORIES.length) {
        showGameComplete();
        return;
    }

    const story = GAME1_STORIES[gameState.currentStoryIndex];

    // Update story text
    document.getElementById('storyText').textContent = story.story;

    // Update difficulty badge
    const difficultyBadge = document.getElementById('difficultyBadge');
    difficultyBadge.textContent = story.difficulty;
    difficultyBadge.className = `difficulty-badge difficulty-${story.difficulty}`;

    // Update level badge
    document.getElementById('levelNumber').textContent = story.level;

    // Hide result display
    document.getElementById('resultDisplay').classList.remove('show');

    // Enable answer buttons
    const buttons = document.querySelectorAll('.answer-btn');
    buttons.forEach(btn => btn.disabled = false);

    // Show story card with animation
    const storyCard = document.querySelector('.story-card');
    storyCard.style.animation = 'none';
    setTimeout(() => {
        storyCard.style.animation = 'fadeIn 0.5s ease-out';
    }, 10);
}

function checkAnswer(selectedAnswer) {
    const story = GAME1_STORIES[gameState.currentStoryIndex];
    const isCorrect = selectedAnswer === story.correctAnswer;

    // Disable buttons
    const buttons = document.querySelectorAll('.answer-btn');
    buttons.forEach(btn => btn.disabled = true);

    // Update score
    const scoreChange = isCorrect ? 3 : -1;
    gameState.score = Math.max(0, gameState.score + scoreChange);
    gameState.attempts++;

    // Update level (every 3 correct answers)
    if (isCorrect && gameState.attempts % 3 === 0) {
        gameState.level++;
    }

    // Save to storage
    updateGameScore(gameState.userId, 1, scoreChange, gameState.level);

    // Show result
    showResult(isCorrect, scoreChange, story.explanation);

    // Update UI
    updateUI();

    // Move to next story if correct
    if (isCorrect) {
        gameState.currentStoryIndex++;
    }
}

function showResult(isCorrect, scoreChange, explanation) {
    const resultDisplay = document.getElementById('resultDisplay');
    const resultIcon = document.getElementById('resultIcon');
    const resultMessage = document.getElementById('resultMessage');
    const scoreChangeText = document.getElementById('scoreChange');
    const explanationText = document.getElementById('explanationText');

    // Set content
    if (isCorrect) {
        resultDisplay.className = 'result-display correct show';
        resultIcon.textContent = '✅';
        resultMessage.textContent = 'Correct!';
        scoreChangeText.textContent = `+${scoreChange} points`;
    } else {
        resultDisplay.className = 'result-display wrong show';
        resultIcon.textContent = '❌';
        resultMessage.textContent = 'Incorrect';
        scoreChangeText.textContent = `${scoreChange} point`;
    }

    explanationText.textContent = explanation;

    // Scroll to result
    resultDisplay.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function nextStory() {
    loadStory();
}

function showGameComplete() {
    document.getElementById('storyText').textContent =
        "🎉 Congratulations! You've completed all available stories! Your cognitive skills are top-notch!";

    document.getElementById('answerSection').style.display = 'none';

    const actionsDiv = document.querySelector('.game-actions');
    actionsDiv.innerHTML = `
    <a href="dashboard.html" class="btn btn-primary btn-lg">
      Return to Dashboard
    </a>
    <button class="btn btn-secondary btn-lg" onclick="resetGame()">
      Play Again
    </button>
  `;
}

function resetGame() {
    if (confirm('Are you sure you want to restart the game? Your score will be kept.')) {
        gameState.currentStoryIndex = 0;
        document.getElementById('answerSection').style.display = 'block';
        loadStory();
    }
}

// Initialize game on page load
document.addEventListener('DOMContentLoaded', initGame1);

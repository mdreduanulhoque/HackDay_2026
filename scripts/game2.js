// ============================================
// GAME 2: NUMBER HUNTER
// Find the hidden number in each story
// ============================================

// Story database with progressive difficulty
const GAME2_STORIES = [
    // ========== EASY LEVEL (1-10) ==========
    {
        id: 1,
        difficulty: 'easy',
        level: 1,
        story: "She had three apples in her basket when she left the market. The red fruits would make a perfect pie for dinner.",
        correctAnswer: 3,
        explanation: "The story directly states she had 'three apples' in her basket."
    },
    {
        id: 2,
        difficulty: 'easy',
        level: 1,
        story: "The clock struck seven times, echoing through the empty hall. It was getting late, and the day was nearly over.",
        correctAnswer: 7,
        explanation: "The clock struck 'seven times', indicating it was 7 o'clock."
    },
    {
        id: 3,
        difficulty: 'easy',
        level: 2,
        story: "Tom collected fifteen seashells along the beach. Each one was unique and beautiful in its own way.",
        correctAnswer: 15,
        explanation: "Tom collected 'fifteen seashells' according to the story."
    },
    {
        id: 4,
        difficulty: 'easy',
        level: 2,
        story: "The recipe called for two cups of flour and a pinch of salt. She carefully measured each ingredient.",
        correctAnswer: 2,
        explanation: "The recipe required 'two cups of flour'."
    },
    {
        id: 5,
        difficulty: 'easy',
        level: 3,
        story: "Nine planets once circled our sun, though that classification has since changed. The solar system continues to fascinate us.",
        correctAnswer: 9,
        explanation: "The story mentions 'nine planets' that once circled the sun."
    },
    {
        id: 6,
        difficulty: 'easy',
        level: 3,
        story: "She practiced piano for forty-five minutes every day without fail. Her dedication was truly admirable.",
        correctAnswer: 45,
        explanation: "She practiced for 'forty-five minutes' daily."
    },
    {
        id: 7,
        difficulty: 'easy',
        level: 4,
        story: "The building had twenty floors, each one filled with busy offices. Workers came and went throughout the day.",
        correctAnswer: 20,
        explanation: "The building had 'twenty floors' as directly stated."
    },
    {
        id: 8,
        difficulty: 'easy',
        level: 4,
        story: "He counted six birds sitting on the wire. They sang together in perfect harmony.",
        correctAnswer: 6,
        explanation: "He counted 'six birds' on the wire."
    },
    {
        id: 9,
        difficulty: 'easy',
        level: 5,
        story: "The marathon was twenty-six miles long. Runners trained for months to prepare for the grueling distance.",
        correctAnswer: 26,
        explanation: "The marathon distance was 'twenty-six miles'."
    },
    {
        id: 10,
        difficulty: 'easy',
        level: 5,
        story: "One hundred balloons floated toward the ceiling at the party. The room was filled with color and joy.",
        correctAnswer: 100,
        explanation: "There were 'one hundred balloons' at the party."
    },

    // ========== MEDIUM LEVEL (11-20) ==========
    {
        id: 11,
        difficulty: 'medium',
        level: 6,
        story: "Born in nineteen ninety-seven, she celebrated her silver jubilee this year. Time had flown by faster than she expected.",
        correctAnswer: 25,
        explanation: "A silver jubilee is the 25th anniversary. If she was born in 1997 and is celebrating her 25th year, the answer is 25."
    },
    {
        id: 12,
        difficulty: 'medium',
        level: 6,
        story: "A baker's dozen of cookies sat on the cooling rack. The extra one was a traditional bonus.",
        correctAnswer: 13,
        explanation: "A baker's dozen is 13 (a dozen plus one extra)."
    },
    {
        id: 13,
        difficulty: 'medium',
        level: 7,
        story: "The temperature dropped to a freezing point overnight. Water began to solidify in the pipes.",
        correctAnswer: 32,
        explanation: "The freezing point of water in Fahrenheit is 32 degrees (or 0 in Celsius, but the context suggests Fahrenheit is more common)."
    },
    {
        id: 14,
        difficulty: 'medium',
        level: 7,
        story: "She saved a quarter of her paycheck each month. The remaining portion went to bills and expenses.",
        correctAnswer: 25,
        explanation: "A quarter represents 25% or 25 out of 100."
    },
    {
        id: 15,
        difficulty: 'medium',
        level: 8,
        story: "The twins turned twenty-one last week. They could finally celebrate their coming of age together.",
        correctAnswer: 21,
        explanation: "The twins were 'twenty-one' years old."
    },
    {
        id: 16,
        difficulty: 'medium',
        level: 8,
        story: "At noon precisely, the sun reached its highest point. Shadows became almost invisible beneath objects.",
        correctAnswer: 12,
        explanation: "Noon is 12 o'clock (12:00 PM)."
    },
    {
        id: 17,
        difficulty: 'medium',
        level: 9,
        story: "A score of years had passed since they last met. The reunion brought back memories they thought were forgotten.",
        correctAnswer: 20,
        explanation: "A score is 20 (as in 'four score and seven years ago' means 87 years)."
    },
    {
        id: 18,
        difficulty: 'medium',
        level: 9,
        story: "The diamond anniversary celebration was magnificent. Their love had endured through the decades.",
        correctAnswer: 60,
        explanation: "A diamond anniversary represents 60 years of marriage."
    },
    {
        id: 19,
        difficulty: 'medium',
        level: 10,
        story: "She lived on the thirteenth floor, though some buildings skip that number out of superstition. She didn't mind at all.",
        correctAnswer: 13,
        explanation: "She lived on the 'thirteenth floor'."
    },
    {
        id: 20,
        difficulty: 'medium',
        level: 10,
        story: "A fortnight passed before he returned home. The two weeks had felt like an eternity.",
        correctAnswer: 14,
        explanation: "A fortnight is 14 days (two weeks)."
    },

    // ========== HARD LEVEL (21-30) ==========
    {
        id: 21,
        difficulty: 'hard',
        level: 11,
        story: "If a dozen eggs cost six dollars, and you buy half that amount, you'll pay this many dollars.",
        correctAnswer: 3,
        explanation: "A dozen eggs costs $6. Half a dozen (6 eggs) would cost half of $6, which is $3."
    },
    {
        id: 22,
        difficulty: 'hard',
        level: 11,
        story: "The square had sides of equal length. If one side measured five units, its area was this many square units.",
        correctAnswer: 25,
        explanation: "A square's area is side × side. If each side is 5 units, the area is 5 × 5 = 25 square units."
    },
    {
        id: 23,
        difficulty: 'hard',
        level: 12,
        story: "She started with fifty dollars. After spending two-fifths at the store, she had this much remaining.",
        correctAnswer: 30,
        explanation: "Two-fifths of $50 is $20. So she has $50 - $20 = $30 remaining."
    },
    {
        id: 24,
        difficulty: 'hard',
        level: 12,
        story: "The conference ran from Tuesday to Thursday of the same week. It lasted this many days.",
        correctAnswer: 3,
        explanation: "Tuesday, Wednesday, Thursday = 3 days."
    },
    {
        id: 25,
        difficulty: 'hard',
        level: 13,
        story: "If today is Wednesday and her birthday is exactly a week from yesterday, her birthday falls on this day of the week numerically. Sunday is one.",
        correctAnswer: 3,
        explanation: "Yesterday was Tuesday. A week from Tuesday is next Tuesday. If Sunday=1, Monday=2, Tuesday=3."
    },
    {
        id: 26,
        difficulty: 'hard',
        level: 13,
        story: "The triangle's angles must sum to a specific total. This fundamental property of triangles equals this many degrees.",
        correctAnswer: 180,
        explanation: "The sum of angles in any triangle is always 180 degrees."
    },
    {
        id: 27,
        difficulty: 'hard',
        level: 14,
        story: "She doubled her money, then tripled the result. If she started with two dollars, she ended with how many?",
        correctAnswer: 12,
        explanation: "Starting with $2, doubled is $4, then tripled is $4 × 3 = $12."
    },
    {
        id: 28,
        difficulty: 'hard',
        level: 14,
        story: "The year marking the turn of the millennium brought celebrations worldwide. That year was this number.",
        correctAnswer: 2000,
        explanation: "The turn of the millennium (third millennium) was the year 2000."
    },
    {
        id: 29,
        difficulty: 'hard',
        level: 15,
        story: "His age is a prime number between ten and fifteen. If you add its digits together, you get four. How old is he?",
        correctAnswer: 13,
        explanation: "Prime numbers between 10-15 are 11 and 13. Only 13 has digits (1+3) that sum to 4."
    },
    {
        id: 30,
        difficulty: 'hard',
        level: 15,
        story: "The clock showed quarter past nine in the evening. In twenty-four hour format, this would be represented as this number.",
        correctAnswer: 21,
        explanation: "Quarter past nine in the evening is 9:15 PM. In 24-hour format, this is 21:15, so the hour is 21."
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

function initGame2() {
    checkAuth(true);
    const user = getCurrentUser();

    if (!user) {
        window.location.href = 'index.html';
        return;
    }

    gameState.userId = user.id;
    gameState.score = user.game2Score;
    gameState.level = user.game2Level;
    gameState.currentStoryIndex = Math.min(user.game2Completed, GAME2_STORIES.length - 1);

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
    if (gameState.currentStoryIndex >= GAME2_STORIES.length) {
        showGameComplete();
        return;
    }

    const story = GAME2_STORIES[gameState.currentStoryIndex];

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

    // Clear and enable input
    const input = document.getElementById('numberInput');
    input.value = '';
    input.disabled = false;
    input.focus();

    // Enable submit button
    document.getElementById('submitBtn').disabled = false;

    // Show story card with animation
    const storyCard = document.querySelector('.story-card');
    storyCard.style.animation = 'none';
    setTimeout(() => {
        storyCard.style.animation = 'fadeIn 0.5s ease-out';
    }, 10);
}

function submitAnswer() {
    const input = document.getElementById('numberInput');
    const userAnswer = parseInt(input.value);

    if (isNaN(userAnswer)) {
        alert('Please enter a valid number');
        return;
    }

    checkAnswer(userAnswer);
}

function checkAnswer(userAnswer) {
    const story = GAME2_STORIES[gameState.currentStoryIndex];
    const isCorrect = userAnswer === story.correctAnswer;

    // Disable input and button
    document.getElementById('numberInput').disabled = true;
    document.getElementById('submitBtn').disabled = true;

    // Update score
    const scoreChange = isCorrect ? 3 : -1;
    gameState.score = Math.max(0, gameState.score + scoreChange);
    gameState.attempts++;

    // Update level (every 3 correct answers)
    if (isCorrect && gameState.attempts % 3 === 0) {
        gameState.level++;
    }

    // Save to storage
    updateGameScore(gameState.userId, 2, scoreChange, gameState.level);

    // Show result
    showResult(isCorrect, scoreChange, story.explanation, story.correctAnswer);

    // Update UI
    updateUI();

    // Move to next story if correct
    if (isCorrect) {
        gameState.currentStoryIndex++;
    }
}

function showResult(isCorrect, scoreChange, explanation, correctAnswer) {
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
        resultMessage.textContent = `Incorrect - The answer was ${correctAnswer}`;
        scoreChangeText.textContent = `${scoreChange} point`;
    }

    explanationText.textContent = explanation;

    // Scroll to result
    resultDisplay.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function nextStory() {
    gameState.currentStoryIndex++;
    loadStory();
}

function showGameComplete() {
    document.getElementById('storyText').textContent =
        "🎉 Congratulations! You've completed all available stories! Your numerical intelligence is outstanding!";

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

// Handle Enter key
document.addEventListener('DOMContentLoaded', function () {
    initGame2();

    document.getElementById('numberInput').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            submitAnswer();
        }
    });
});

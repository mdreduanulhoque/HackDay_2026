// ============================================
// LEADERBOARD MANAGEMENT
// Handles leaderboard rankings and display
// ============================================

/**
 * Get leaderboard for a specific game
 * @param {number} gameType - Game type (1 or 2)
 * @param {number} limit - Maximum number of players to return
 * @returns {Array} Sorted array of players with ranks
 */
function getLeaderboard(gameType, limit = 10) {
    const users = getAllUsers();
    const scoreKey = `game${gameType}Score`;

    // Sort by score (descending) and then by createdAt (ascending for tie-breaking)
    const sortedUsers = users
        .map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            score: user[scoreKey],
            level: user[`game${gameType}Level`],
            completed: user[`game${gameType}Completed`]
        }))
        .sort((a, b) => {
            if (b.score !== a.score) {
                return b.score - a.score;
            }
            return a.email.localeCompare(b.email);
        })
        .slice(0, limit);

    // Add rank
    return sortedUsers.map((user, index) => ({
        ...user,
        rank: index + 1
    }));
}

/**
 * Get user's rank in leaderboard
 * @param {string} userId - User ID
 * @param {number} gameType - Game type (1 or 2)
 * @returns {Object} Rank info
 */
function getUserRank(userId, gameType) {
    const leaderboard = getLeaderboard(gameType, 9999);
    const userRank = leaderboard.find(entry => entry.id === userId);

    return {
        rank: userRank ? userRank.rank : null,
        totalPlayers: leaderboard.length,
        score: userRank ? userRank.score : 0
    };
}

/**
 * Get top 3 players for a game
 * @param {number} gameType - Game type (1 or 2)
 * @returns {Array} Top 3 players
 */
function getTopPlayers(gameType) {
    return getLeaderboard(gameType, 3);
}

/**
 * Get leaderboard display HTML
 * @param {number} gameType - Game type (1 or 2)
 * @param {string} currentUserId - Current user ID (optional, for highlighting)
 * @returns {string} HTML string
 */
function renderLeaderboard(gameType, currentUserId = null) {
    const leaderboard = getLeaderboard(gameType, 10);

    if (leaderboard.length === 0) {
        return '<p class="text-muted text-center">No players yet. Be the first!</p>';
    }

    let html = '<div class="leaderboard-list">';

    leaderboard.forEach(player => {
        const isCurrentUser = player.id === currentUserId;
        const rankClass = getRankClass(player.rank);
        const medal = getRankMedal(player.rank);

        html += `
      <div class="leaderboard-item ${isCurrentUser ? 'current-user' : ''}" data-user-id="${player.id}">
        <div class="leaderboard-rank ${rankClass}">
          ${medal ? medal : player.rank}
        </div>
        <div class="leaderboard-info">
          <div class="leaderboard-name">
            ${player.name}
            ${isCurrentUser ? '<span class="badge badge-primary">You</span>' : ''}
          </div>
          <div class="leaderboard-stats">
            Level ${player.level} • ${player.completed} completed
          </div>
        </div>
        <div class="leaderboard-score">
          ${player.score}
          <span class="score-label">pts</span>
        </div>
      </div>
    `;
    });

    html += '</div>';
    return html;
}

/**
 * Get CSS class for rank
 * @param {number} rank - Player rank
 * @returns {string} CSS class
 */
function getRankClass(rank) {
    if (rank === 1) return 'rank-gold';
    if (rank === 2) return 'rank-silver';
    if (rank === 3) return 'rank-bronze';
    return '';
}

/**
 * Get medal emoji for top 3
 * @param {number} rank - Player rank
 * @returns {string} Medal emoji or empty string
 */
function getRankMedal(rank) {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return '';
}

/**
 * Show user profile modal
 * @param {string} userId - User ID
 */
function showUserProfile(userId) {
    const user = getUserById(userId);
    if (!user) return;

    const modal = document.getElementById('userProfileModal');
    if (!modal) return;

    const game1Rank = getUserRank(userId, 1);
    const game2Rank = getUserRank(userId, 2);

    document.getElementById('profileName').textContent = user.name;
    document.getElementById('profileEmail').textContent = user.email;
    document.getElementById('profileAge').textContent = calculateAge(user.dob);
    document.getElementById('profileJoined').textContent = formatDate(user.createdAt);

    document.getElementById('profileGame1Score').textContent = user.game1Score;
    document.getElementById('profileGame1Rank').textContent = `#${game1Rank.rank}`;
    document.getElementById('profileGame1Level').textContent = user.game1Level;

    document.getElementById('profileGame2Score').textContent = user.game2Score;
    document.getElementById('profileGame2Rank').textContent = `#${game2Rank.rank}`;
    document.getElementById('profileGame2Level').textContent = user.game2Level;

    const game3Rank = getUserRank(userId, 3);
    document.getElementById('profileGame3Score').textContent = user.game3Score;
    document.getElementById('profileGame3Rank').textContent = `#${game3Rank.rank}`;
    document.getElementById('profileGame3Level').textContent = user.game3Level;

    modal.style.display = 'flex';
}

/**
 * Close user profile modal
 */
function closeUserProfile() {
    const modal = document.getElementById('userProfileModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

/**
 * Get user stats summary
 * @param {string} userId - User ID
 * @returns {Object} Stats object
 */
function getUserStats(userId) {
    const user = getUserById(userId);
    if (!user) return null;

    const game1Rank = getUserRank(userId, 1);
    const game2Rank = getUserRank(userId, 2);

    return {
        totalScore: user.game1Score + user.game2Score + user.game3Score,
        totalCompleted: user.game1Completed + user.game2Completed + user.game3Completed,
        game1: {
            score: user.game1Score,
            level: user.game1Level,
            rank: game1Rank.rank,
            completed: user.game1Completed
        },
        game2: {
            score: user.game2Score,
            level: user.game2Level,
            rank: game2Rank.rank,
            completed: user.game2Completed
        },
        game3: {
            score: user.game3Score,
            level: user.game3Level,
            rank: getUserRank(userId, 3).rank,
            completed: user.game3Completed
        }
    };
}

// ============================================
// LOCAL STORAGE MANAGEMENT
// Handles all data persistence for users and game scores
// ============================================

const STORAGE_KEYS = {
  USERS: 'game_users',
  SESSION: 'current_session',
  SAMPLE_DATA_INITIALIZED: 'sample_data_init'
};

// ============================================
// USER MANAGEMENT
// ============================================

/**
 * Get all users from local storage
 * @returns {Array} Array of user objects
 */
function getAllUsers() {
  const users = localStorage.getItem(STORAGE_KEYS.USERS);
  return users ? JSON.parse(users) : [];
}

/**
 * Save users array to local storage
 * @param {Array} users - Array of user objects
 */
function saveUsers(users) {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
}

/**
 * Get user by ID
 * @param {string} userId - User ID
 * @returns {Object|null} User object or null if not found
 */
function getUserById(userId) {
  const users = getAllUsers();
  return users.find(user => user.id === userId) || null;
}

/**
 * Get user by email
 * @param {string} email - User email
 * @returns {Object|null} User object or null if not found
 */
function getUserByEmail(email) {
  const users = getAllUsers();
  return users.find(user => user.email.toLowerCase() === email.toLowerCase()) || null;
}

/**
 * Create new user
 * @param {Object} userData - User data (name, email, dob, password)
 * @returns {Object} Created user object
 */
function createUser(userData) {
  const users = getAllUsers();
  
  // Check if email already exists
  if (getUserByEmail(userData.email)) {
    throw new Error('Email already registered');
  }
  
  const newUser = {
    id: generateId(),
    name: userData.name,
    email: userData.email.toLowerCase(),
    dob: userData.dob,
    password: hashPassword(userData.password),
    game1Score: 0,
    game2Score: 0,
    game3Score: 0,
    game1Level: 1,
    game2Level: 1,
    game3Level: 1,
    game1Completed: 0,
    game2Completed: 0,
    game3Completed: 0,
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  saveUsers(users);
  return newUser;
}

/**
 * Update user data
 * @param {string} userId - User ID
 * @param {Object} updates - Fields to update
 * @returns {Object} Updated user object
 */
function updateUser(userId, updates) {
  const users = getAllUsers();
  const userIndex = users.findIndex(user => user.id === userId);
  
  if (userIndex === -1) {
    throw new Error('User not found');
  }
  
  users[userIndex] = { ...users[userIndex], ...updates };
  saveUsers(users);
  return users[userIndex];
}

/**
 * Update user game score
 * @param {string} userId - User ID
 * @param {number} gameType - Game type (1 or 2)
 * @param {number} scoreChange - Score change (+3 or -1)
 * @param {number} newLevel - New level (optional)
 */
function updateGameScore(userId, gameType, scoreChange, newLevel = null) {
  const user = getUserById(userId);
  if (!user) throw new Error('User not found');
  
  const scoreKey = `game${gameType}Score`;
  const levelKey = `game${gameType}Level`;
  const completedKey = `game${gameType}Completed`;
  
  const updates = {
    [scoreKey]: Math.max(0, user[scoreKey] + scoreChange),
    [completedKey]: user[completedKey] + 1
  };
  
  if (newLevel !== null) {
    updates[levelKey] = newLevel;
  }
  
  return updateUser(userId, updates);
}

// ============================================
// SESSION MANAGEMENT
// ============================================

/**
 * Create user session
 * @param {string} userId - User ID
 */
function createSession(userId) {
  const session = {
    userId: userId,
    loginTime: new Date().toISOString()
  };
  localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
}

/**
 * Get current session
 * @returns {Object|null} Session object or null
 */
function getSession() {
  const session = localStorage.getItem(STORAGE_KEYS.SESSION);
  return session ? JSON.parse(session) : null;
}

/**
 * Get currently logged in user
 * @returns {Object|null} User object or null
 */
function getCurrentUser() {
  const session = getSession();
  if (!session) return null;
  return getUserById(session.userId);
}

/**
 * Clear session (logout)
 */
function clearSession() {
  localStorage.removeItem(STORAGE_KEYS.SESSION);
}

/**
 * Check if user is logged in
 * @returns {boolean}
 */
function isLoggedIn() {
  return getSession() !== null;
}

// ============================================
// SAMPLE DATA INITIALIZATION
// ============================================

/**
 * Initialize sample leaderboard data
 */
function initializeSampleData() {
  // Check if already initialized
  if (localStorage.getItem(STORAGE_KEYS.SAMPLE_DATA_INITIALIZED)) {
    return;
  }
  
  const sampleUsers = [
    { name: 'Alex Storm', email: 'alex@example.com', password: 'password123', dob: '1995-03-15', game1Score: 45, game2Score: 38, game3Score: 30, game1Level: 6, game2Level: 5, game3Level: 4 },
    { name: 'Jamie Nova', email: 'jamie@example.com', password: 'password123', dob: '1998-07-22', game1Score: 52, game2Score: 48, game3Score: 60, game1Level: 7, game2Level: 6, game3Level: 8 },
    { name: 'Sam Phoenix', email: 'sam@example.com', password: 'password123', dob: '1992-11-08', game1Score: 31, game2Score: 42, game3Score: 10, game1Level: 4, game2Level: 5, game3Level: 2 },
    { name: 'Taylor Blaze', email: 'taylor@example.com', password: 'password123', dob: '1996-05-19', game1Score: 38, game2Score: 29, game3Score: 25, game1Level: 5, game2Level: 4, game3Level: 3 },
    { name: 'Jordan Frost', email: 'jordan@example.com', password: 'password123', dob: '1994-09-30', game1Score: 27, game2Score: 35, game3Score: 15, game1Level: 3, game2Level: 4, game3Level: 3 },
    { name: 'Casey Ember', email: 'casey@example.com', password: 'password123', dob: '1997-01-12', game1Score: 19, game2Score: 22, game3Score: 5, game1Level: 2, game2Level: 3, game3Level: 1 },
    { name: 'Morgan Volt', email: 'morgan@example.com', password: 'password123', dob: '1999-04-25', game1Score: 12, game2Score: 15, game3Score: 8, game1Level: 2, game2Level: 2, game3Level: 2 }
  ];
  
  const existingUsers = getAllUsers();
  
  sampleUsers.forEach(userData => {
    // Only add if email doesn't exist
    if (!getUserByEmail(userData.email)) {
      const user = {
        id: generateId(),
        name: userData.name,
        email: userData.email,
        dob: userData.dob,
        password: hashPassword(userData.password),
        game1Score: userData.game1Score,
        game2Score: userData.game2Score,
        game3Score: userData.game3Score,
        game1Level: userData.game1Level,
        game2Level: userData.game2Level,
        game3Level: userData.game3Level,
        game1Completed: Math.floor(userData.game1Score / 3),
        game2Completed: Math.floor(userData.game2Score / 3),
        game3Completed: Math.floor(userData.game3Score / 3),
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString()
      };
      existingUsers.push(user);
    }
  });
  
  saveUsers(existingUsers);
  localStorage.setItem(STORAGE_KEYS.SAMPLE_DATA_INITIALIZED, 'true');
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Generate unique ID
 * @returns {string} Unique ID
 */
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}

/**
 * Simple password hashing (for demo purposes)
 * In production, use proper backend authentication
 * @param {string} password - Plain text password
 * @returns {string} Hashed password
 */
function hashPassword(password) {
  // Simple hash for demo - in production use backend with bcrypt
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(36);
}

/**
 * Verify password
 * @param {string} password - Plain text password
 * @param {string} hash - Hashed password
 * @returns {boolean}
 */
function verifyPassword(password, hash) {
  return hashPassword(password) === hash;
}

/**
 * Format date for display
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
}

/**
 * Calculate age from date of birth
 * @param {string} dob - Date of birth (YYYY-MM-DD)
 * @returns {number} Age in years
 */
function calculateAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}

// Initialize sample data on first load
initializeSampleData();

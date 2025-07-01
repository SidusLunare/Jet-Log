const USERS_KEY = "planeSpotUsers";
const CURRENT_USER_KEY = "planeSpotCurrentUser";

/** Load the full users array from localStorage (or empty array) */
export function loadUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
}

/** Persist the full users array back to localStorage */
export function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

/** Register a new user. Returns the new user object or throws on duplicate */
export function registerUser(username, password) {
  const users = loadUsers();

  if (users.some((u) => u.username === username)) {
    alert("Username already taken");
    throw new Error("Username already taken");
  }

  // auto-increment ID
  const id = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;

  const newUser = {
    id,
    username,
    password,
    spotted: [],
  };

  users.push(newUser);
  saveUsers(users);
  return newUser;
}

/** Attempt login. On success, persists current user ID and returns user; else throws */
export function loginUser(username, password) {
  const users = loadUsers();
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) {
    alert("Invalid credentials, please try again.")
    throw new Error("Invalid credentials");
  }
  // store only the ID so we don’t mix passwords in “session”
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user.id));
  return user;
}

/** Clears the “session” */
export function logoutUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

/** Return the currently‐logged‐in user object, or null */
export function getCurrentUser() {
  const id = JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
  if (id == null) return null;
  return loadUsers().find((u) => u.id === id) || null;
}

/** Add an aircraft to the current user’s spotted list */
export function addSpottedAircraft(aircraft) {
  const users = loadUsers();
  const current = getCurrentUser();
  if (!current) throw new Error("No user logged in");

  // find in array and push
  const idx = users.findIndex((u) => u.id === current.id);
  users[idx].spotted.push(aircraft);
  saveUsers(users);
}

/** Example: get the current user’s spotted list (or empty) */
export function getSpottedList() {
  const curr = getCurrentUser();
  return curr ? curr.spotted : [];
}

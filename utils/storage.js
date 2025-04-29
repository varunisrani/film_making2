const STORAGE_KEYS = {
  SCRIPT_DATA: 'film_making_script_data',
  ONE_LINER_DATA: 'film_making_one_liner_data',
  CHARACTER_DATA: 'film_making_character_data',
  SCHEDULE_DATA: 'film_making_schedule_data',
  BUDGET_DATA: 'film_making_budget_data',
  STORYBOARD_DATA: 'film_making_storyboard_data',
  THEME_MODE: 'film_making_theme_mode'
};

/**
 * Save data to localStorage with the given key
 * @param {string} key - The key to store the data under
 * @param {any} data - The data to store
 */
export const saveToStorage = (key, data) => {
  if (typeof window === 'undefined') return; // Guard for SSR
  
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving to localStorage: ${error}`);
  }
};

/**
 * Load data from localStorage by key
 * @param {string} key - The key to retrieve data from
 * @returns {any|null} The stored data or null if not found
 */
export const loadFromStorage = (key) => {
  if (typeof window === 'undefined') return null; // Guard for SSR
  
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error loading from localStorage: ${error}`);
    return null;
  }
};

/**
 * Clear all film making related data from localStorage
 */
export const clearStorage = () => {
  if (typeof window === 'undefined') return; // Guard for SSR
  
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  } catch (error) {
    console.error(`Error clearing localStorage: ${error}`);
  }
};

/**
 * Check if localStorage is available
 * @returns {boolean} True if localStorage is available
 */
export const isStorageAvailable = () => {
  if (typeof window === 'undefined') return false; // Guard for SSR
  
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};

export { STORAGE_KEYS }; 
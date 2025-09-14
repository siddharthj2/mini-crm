// Token management utilities
const TOKEN_KEY = 'minicrm_token';

export const tokenManager = {
  // Store token in localStorage
  setToken: (token) => {
    console.log('Setting token in localStorage');
    localStorage.setItem(TOKEN_KEY, token);
  },

  // Get token from localStorage
  getToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },

  // Remove token from localStorage
  removeToken: () => {
    localStorage.removeItem(TOKEN_KEY);
  },

  // Check if token exists
  hasToken: () => {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  // Get token from URL parameters
  getTokenFromURL: () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    console.log('Token from URL:', token ? 'Found' : 'Not found');
    return token;
  },

  // Clear URL parameters after extracting token
  clearURLParams: () => {
    if (window.location.search.includes('token=')) {
      const url = new URL(window.location);
      url.searchParams.delete('token');
      window.history.replaceState({}, '', url.pathname + url.hash);
    }
  }
};

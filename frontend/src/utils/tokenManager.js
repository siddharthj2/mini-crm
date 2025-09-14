// Token management utilities
const TOKEN_KEY = 'minicrm_token';

export const tokenManager = {
  // Store token in localStorage
  setToken: (token) => {
    console.log('Setting token in localStorage');
    localStorage.setItem(TOKEN_KEY, token);
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('tokenUpdate'));
  },

  // Get token from localStorage
  getToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },

  // Remove token from localStorage
  removeToken: () => {
    localStorage.removeItem(TOKEN_KEY);
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('tokenUpdate'));
  },

  // Check if token exists
  hasToken: () => {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  // Get token from URL parameters (including hash fragment)
  getTokenFromURL: () => {
    // First check query parameters
    const urlParams = new URLSearchParams(window.location.search);
    let token = urlParams.get('token');
    
    // If not found in query params, check hash fragment
    if (!token && window.location.hash) {
      const hashParts = window.location.hash.split('?');
      if (hashParts.length > 1) {
        const hashParams = new URLSearchParams(hashParts[1]);
        token = hashParams.get('token');
      }
    }
    
    console.log('Token from URL:', token ? 'Found' : 'Not found');
    return token;
  },

  // Clear URL parameters after extracting token
  clearURLParams: () => {
    let needsUpdate = false;
    const url = new URL(window.location);
    
    // Clear from query parameters
    if (url.searchParams.has('token')) {
      url.searchParams.delete('token');
      needsUpdate = true;
    }
    
    // Clear from hash fragment
    if (url.hash && url.hash.includes('token=')) {
      const hashParts = url.hash.split('?');
      if (hashParts.length > 1) {
        const hashParams = new URLSearchParams(hashParts[1]);
        hashParams.delete('token');
        const remainingParams = hashParams.toString();
        url.hash = hashParts[0] + (remainingParams ? '?' + remainingParams : '');
        needsUpdate = true;
      }
    }
    
    if (needsUpdate) {
      window.history.replaceState({}, '', url.pathname + url.search + url.hash);
    }
  }
};

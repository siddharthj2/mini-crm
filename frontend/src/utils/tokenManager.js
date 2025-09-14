const TOKEN_KEY = 'minicrm_token';

export const tokenManager = {
  setToken: (token) => {
    console.log('Setting token in localStorage');
    localStorage.setItem(TOKEN_KEY, token);
    window.dispatchEvent(new Event('tokenUpdate'));
  },

  getToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },

  removeToken: () => {
    localStorage.removeItem(TOKEN_KEY);
    window.dispatchEvent(new Event('tokenUpdate'));
  },

  hasToken: () => {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  getTokenFromURL: () => {
    const urlParams = new URLSearchParams(window.location.search);
    let token = urlParams.get('token');
    
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

  clearURLParams: () => {
    let needsUpdate = false;
    const url = new URL(window.location);
    
    if (url.searchParams.has('token')) {
      url.searchParams.delete('token');
      needsUpdate = true;
    }
    
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

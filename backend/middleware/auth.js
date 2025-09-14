function ensureAuthenticated(req, res, next) {
    console.log('Auth check - isAuthenticated:', req.isAuthenticated());
    console.log('Auth check - user:', req.user ? req.user.email : 'No user');
    console.log('Auth check - session:', req.session ? 'Session exists' : 'No session');
    console.log('Auth check - cookies:', req.headers.cookie ? 'Cookies present' : 'No cookies');
    
    if (req.isAuthenticated()) {
      return next();
    }
    
    console.log('Auth failed - redirecting to login');
    res.status(401).json({ message: "Unauthorized. Please login with Google." });
  }
  
module.exports = ensureAuthenticated;
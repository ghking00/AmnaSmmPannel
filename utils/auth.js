const ADMIN_KEY = 'amnapro0088';

// Check if request is from admin using query or headers
export function isAdmin(req) {
  const key = req.query?.key || req.headers['x-admin-key'];
  return key === ADMIN_KEY;
}

// Middleware to protect admin API routes
export function protectAdminRoute(req, res) {
  if (!isAdmin(req)) {
    res.status(403).json({ error: 'Access denied: Admin only' });
    return false;
  }
  return true;
}

// Middleware to require user login (e.g., from token)
export function requireAuth(req, res) {
  const authToken = req.headers.authorization;
  if (!authToken) {
    res.status(401).json({ error: 'Unauthorized' });
    return false;
  }
  // Optionally: validate token logic here
  return true;
}

const jwt = require('jsonwebtoken');

/**
 * Middleware verifyToken:
 * Checks if the request contains a valid JWT in the Authorization header.
 * If the token is valid, decodes the token, attaches the user payload to `req.user`, and calls next().
 * If not, returns an appropriate error response (e.g. token expired, invalid token, or no token).
 */
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers['authorization'];
    
    if (!authHeader) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // Support both "Bearer <token>" format and direct "<token>"
    let token = authHeader;
    if (authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7, authHeader.length);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // The payload containing user ID and role
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token has expired.' });
        }
        return res.status(403).json({ message: 'Invalid token.' });
    }
};

/**
 * Middleware authorizeRole:
 * Restricts access to users with specified roles.
 * Must be used after verifyToken middleware.
 * 
 * @param {...string} allowedRoles - The roles permitted to access this API
 */
const authorizeRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized. User information is missing.' });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden. You do not have permission to access this resource.' });
        }

        next();
    };
};

module.exports = {
    verifyToken,
    authorizeRole
};

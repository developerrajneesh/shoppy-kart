
const jwt = require('jsonwebtoken');
const secretKey = 'edawdihinciewfowfgiuba xmapjxoihduiwedbwmcojwoehdigwduwbdwjdowodhw';
function authenticateUser(req, res, next) {
    const token = req.header('Authorization');
  console.log(token);
    if (!token) {
      return res.status(401).json({ message: 'Authorization token not found' });
    }
  
    try {
      const decoded = jwt.verify(token, secretKey);
      req.user = decoded.user;
      console.log(req.user);
      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  }
module.exports = authenticateUser
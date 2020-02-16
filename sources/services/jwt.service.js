const jwt = require('jsonwebtoken');

class JwtService {
  constructor() {
    this.jwtSecret = 'tkfToken';
  }

  verify(token) {
    try {
      return jwt.verify(token, this.jwtSecret);
    } catch (error) {
      return undefined;
    }
  }

  sign(user, timestamp = Date.now()) {
    return jwt.sign({ user, timestamp }, this.jwtSecret);
  }
}

module.exports = new JwtService();


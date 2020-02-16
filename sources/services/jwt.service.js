const jwt = require('jsonwebtoken');

class JwtService {
  constructor() {
    this.jwtSecret = 'tkfToken';
  }

  getTokenFromHeaders(ctx) {
    let token = ctx.request.headers['x-access-token'] ||
      ctx.request.headers.authorization || undefined;

    if (token && token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trimLeft();
    }

    return token;
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


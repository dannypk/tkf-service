const httpStatusCodes = require('http-status-codes');
const jwtService = require('../services/jwt.service');

const checkToken = (ctx, next) => {
  const token = jwtService.getTokenFromHeaders(ctx);
  
  if (!token) {
    ctx.body = 'Authorization failed.';
    ctx.status = httpStatusCodes.UNAUTHORIZED;
    return;
  }

  const isTokenValid = jwtService.verify(token);
  if (!isTokenValid) {
    ctx.body = 'Credentials not valid';
    ctx.status = httpStatusCodes.UNAUTHORIZED;
    return;
  }

  next();
};

module.exports = {
  checkToken: checkToken
};
const httpStatusCodes = require('http-status-codes');
const jwtService = require('../services/jwt.service');

const checkToken = (ctx, next) => {
  let token = ctx.request.headers['x-access-token'] || ctx.request.headers.authorization; 
  
  if (!token) {
    ctx.body = 'Authorization failed.';
    ctx.status = httpStatusCodes.UNAUTHORIZED;
    return;
  }

  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length).trimLeft();
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
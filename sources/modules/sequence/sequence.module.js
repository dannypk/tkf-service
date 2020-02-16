const config = require('config');
const httpStatusCodes = require('http-status-codes');
const { checkToken } = require('../../middlewares/jwt.middleware');

const sequenceService = require('../../services/sequence.service');

module.exports = {
  setupRoutes
};

function setupRoutes(router) {
  /**
  * @api {get} /sequence/current Get the current sequence
  * @apiGroup sequence
  */

  router.get(`/${config.name}/sequence/current`, checkToken, getCurrentSequence);

  /**
  * @api {get} /sequence/next Get the next sequence
  * @apiGroup sequence
  */
  router.get(`/${config.name}/sequence/next`, checkToken, getNextSequence);

  /**
  * @api {put} /sequence/current Reset the current sequence
  * @apiGroup sequence
  */
  router.put(`/${config.name}/sequence/current`, checkToken, resetCurrentSequence);
}

function getCurrentSequence(ctx) {
  ctx.body = sequenceService.getCurrentSequence();
}

function getNextSequence(ctx) {
  ctx.body = sequenceService.getNextSequence();
}

function resetCurrentSequence(ctx) {
  const { current } = ctx.request.body;
  sequenceService.resetCurrentSequence(current);

  ctx.status = httpStatusCodes.OK;
}

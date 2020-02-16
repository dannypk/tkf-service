const userModule = require('./user/user.module.js');
const sequenceModule = require('./sequence/sequence.module.js');

module.exports = {
  setupRoutes
};

function setupRoutes(router) {
  userModule.setupRoutes(router);
  sequenceModule.setupRoutes(router);
}

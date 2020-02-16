const config = require('config');
const httpStatusCodes = require('http-status-codes');

const jwtService = require('../../services/jwt.service');
const userService = require('../../services/user.service');

module.exports = {
  setupRoutes
};

function setupRoutes(router) {
  /**
   * @api {put} /user/register Register new user
   * @apiGroup user
   * @apiParam {String} name      User's Name.
   * @apiParam {String} email     User's Email.
   * @apiParam {String} password  User's Password sha256 hashed.
   * @apiParamExample {json} Request-Example:
   *     {
   *       "name": "Daniel",
   *       "email": "daniel@github.com",
   *       "password": "KDSLKLK@#39990432492jdksajldsja"
   *     }
   */
  router.put(`/${config.name}/user/register`, registerUser);

  /**
 * @api {post} /user/login Authenticate user
 * @apiGroup user
 * @apiParam {String} email       User's Email.
 * @apiParam {String} password    User's Password sha256 hashed.
 * @apiParamExample {json} Request-Example:
 *     {
 *       "email": "daniel@github.com",
 *       "password": "KDSLKLK@#39990432492jdksajldsja"
 *     }
 */
  router.post(`/${config.name}/user/login`, login);

  /**
 * @api {get} /user/verify Verify users token from header
 * @apiGroup user
 */
  router.get(`/${config.name}/user/verify`, verify);
}

function verify(ctx) {
  const token = jwtService.getTokenFromHeaders(ctx);
  ctx.body = jwtService.verify(token)
}

async function login(ctx) {
  const { email, password } = ctx.request.body;
  const user = await userService.login(email, password);

  if (user) {
    ctx.status = httpStatusCodes.OK;
    ctx.body = {
      token: jwtService.sign(user),
      message: 'Successfully logged in!'
    };
    return;
  }

  ctx.status = httpStatusCodes.UNAUTHORIZED;
  ctx.body = {
    token: null,
    message: 'Authentication failed'
  };
}

async function registerUser(ctx) {
  const { name, email, password } = ctx.request.body;

  ctx.assert(name, 'Sorry, i didnt really catch your name, do you mind saying it again?', httpStatusCodes.BAD_REQUEST);
  ctx.assert(email, 'At which email address can I spam you then?', httpStatusCodes.BAD_REQUEST);
  ctx.assert(password, 'Have you forgotton our secret? Sorry, I mean, your secret.', httpStatusCodes.BAD_REQUEST);

  try {
    await userService.registerUser(name, email, password, ctx.db);
    const user = await userService.findUserByEmail(email);

    ctx.body = {
      token: jwtService.sign(user),
      message: 'user created successfully'
    };
    ctx.status = httpStatusCodes.CREATED;
  } catch (e) {
    ctx.status = httpStatusCodes.CONFLICT;
  }
}

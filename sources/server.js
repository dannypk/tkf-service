const Koa = require('koa');
const config = require('config');
const cors = require('@koa/cors');
const serve = require('koa-static');
const mount = require('koa-mount');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const path = require('path');

const { setupRoutes } = require('./modules/modules');
const initDB = require('./db');

const PORT = process.env.PORT || 15700;
const bodyParserToUse = bodyParser({
  jsonLimit: '50mb'
});

initDB();

const router = new Router();
setupRoutes(router);

router.get(`/${config.name}`, (ctx, next) => _redirect(ctx, next, `/${config.name}/doc/index.html`));
router.get(`/${config.name}/doc`, (ctx, next) => _redirect(ctx, next, `/${config.name}/doc/index.html`));

const app = new Koa();

app.use(mount(`/${config.name}/doc`, serve(path.join(__dirname, '..', 'doc'))));
app.use(cors());
app.use(bodyParserToUse);
app.use(router.routes());

const server = app.listen(PORT, () => console.log(`Server Listening on port ${PORT}`));

const gracefulShutdown = () => {
  console.log('Received kill signal, shutting down gracefully.');
  
  server.close(() => {
    console.log('Closed out remaining connections.');
    process.exit();
  });
  
  setTimeout(() => {
    console.log('Could not close connections in time, forcefully shutting down');
    process.exit();
  }, 10 * 1000);
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

async function _redirect(ctx, next, newPath) {
  ctx.redirect(newPath);
  await next();
}

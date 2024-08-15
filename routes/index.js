const plansRouter = require('./plans.router');
const clientsRouter = require('./clients.router');
const usersRouter = require('./users.router');
const companiesRouter = require('./companies.router');
const nodesRouter = require('./nodes.router');
const productsRouter = require('./products.router');
const surchargesRouter = require('./surcharges.router');
const networksRouter = require('./networks.router');
const devicesRouter = require('./devices.router');
const billingRouter = require('./billing.router');
const authRouter = require('./auth.router');


function routerApi(app) {
  app.use('/clients', clientsRouter);
  app.use('/companies', companiesRouter);
  app.use('/users', usersRouter);
  app.use('/nodes', nodesRouter);
  app.use('/products', productsRouter);
  app.use('/plans', plansRouter);
  app.use('/surcharges', surchargesRouter);
  app.use('/networks', networksRouter);
  app.use('/devices', devicesRouter);
  app.use('/billing', billingRouter);
  app.use('/auth', authRouter);


}

module.exports = routerApi;

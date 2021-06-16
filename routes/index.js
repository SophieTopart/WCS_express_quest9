const moviesRouter = require('./movies');

const setupRoutes = (app) => {
  app.use('/api/movies', moviesRouter);
  app.use('/api/users', usersRouter);
};

module.exports = {
  setupRoutes,
};
module.exports = function coreRoutes(app) {
  // Core Routes
  const core = require('../controllers/core.controller');

  app.route('/*').get(core.index);
};

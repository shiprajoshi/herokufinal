class ErrorsController {
  renderServerError(req, res) {
    res.status(500).render('500', {
      error: 'Oops! Something went wrong...',
    });
  }

  /**
   * Render the server not found responses
   * Performs content-negotiation on the Accept HTTP header
   */
  renderNotFound(req, res) {
    res.status(404).format({
      'text/html'() {
        res.render('modules/core/server/views/404', {
          url: req.originalUrl,
        });
      },
      'application/json'() {
        res.json({
          error: 'Path not found',
        });
      },
      'default'() {
        res.send('Path not found');
      },
    });
  }
}

export default new ErrorsController();

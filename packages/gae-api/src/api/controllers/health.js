/**
 * Provides a health check endpoint that can be used
 * to validate that the server is up
 *
 * @param {*} req
 * @param {*} res
 */
exports.health = (req, res) => {
  res.send(200, 'running');
};

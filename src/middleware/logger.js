/**
 * Request logger middleware.
 * Logs: [timestamp] METHOD /path STATUS
 */
function logger(req, res, next) {
  res.on("finish", () => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.path} ${res.statusCode}`);
  });
  next();
}

module.exports = logger;

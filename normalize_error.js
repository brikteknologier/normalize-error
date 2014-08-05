var formatError = require('format-error').format;
var destroyCircular = require('destroy-circular');
module.exports = function normalizeError(err) {
  var normalized = {
    error: null,
    message: '',
    code: 0
  };

  err = destroyCircular(err);

  if (err instanceof Error) {
    normalized.message = err.message
    normalized.error = formatError(err);
  } else {
    if (typeof err == 'string') normalized.message = err;
    else if (typeof err == 'object') normalized.message = err.message || err.error || JSON.stringify(err);
    normalized.error = err;
  }

  normalized.code = err.code || err.statusCode || 500;

  return normalized;
}


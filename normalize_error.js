var formatError = require('format-error').format;
var destroyCircular = require('destroy-circular');
module.exports = function normalizeError(err) {
  var normalized = {
    error: null,
    message: '',
    code: 0
  };

  var serializableErr = destroyCircular(err);

  if (err instanceof Error) {
    normalized.message = err.toString()
    normalized.stack = err.stack;
    normalized.error = formatError(serializableErr);
  } else {
    if (typeof err == 'string') normalized.message = err;
    else if (typeof err == 'object') normalized.message = err.message || err.error || JSON.stringify(serializableErr);
    normalized.error = err;
  }

  normalized.code = err.code || err.statusCode || 500;

  return normalized;
}


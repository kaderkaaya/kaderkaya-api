module.exports = {
  UNKNOWN: {
    code: -1,
    message: 'unknown error',
  },
  SUCCESS: {
    code: 0,
    message: 'success',
  },
  MICROSERVICE: {
    code: 1,
    message: 'microservice error',
  },
  VALIDATION_ERROR: {
    code: 101,
    message: 'validation error',
  },
  USER_NOT_FOUND: {
    code: 103,
    message: 'user can not be found',
  },
  UNAUTHORIZED: {
    code: 104,
    message: 'unauthorized: missing or invalid token',
  },
  INVALID_CREDENTIALS: {
    code: 105,
    message: 'invalid email or password',
  },
  NOT_FOUND: {
    code: 106,
    message: 'resource not found',
  },
  DUPLICATE_ENTRY: {
    code: 107,
    message: 'duplicate entry',
  },
};

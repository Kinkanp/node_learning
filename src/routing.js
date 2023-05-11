const userService = require('./services/user/user.service');

const routing = {
  '/auth/register': {
    POST: (params) => userService.create(params),
  },
  '/auth/confirm-email': {
    GET: (params) => userService.confirmEmail(params),
  }
}

module.exports = { routing };

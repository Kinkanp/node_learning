const Queue = require('bull');
const { config } = require("../../common/config");

const userEmailConfirmQueue = new Queue('email confirmation', config.redis.url);

module.exports = { userEmailConfirmQueue };



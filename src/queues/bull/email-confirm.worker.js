const { send } = require('../../common/send-email');
const userService = require('../../services/user/user.service');

module.exports = async function(job) {
  console.log('LOCAL: worker started, pid:', process.pid);
  const email = job.data.user.email;

  try {
    await send(email, userService.getConfirmEmailHtmlContent(job.data.user));
    console.log(`LOCAL: Confirmation email for: '${email}' has been sent`);
  } catch(e) {
    console.log(`LOCAL: Unable to send user confirmation email: ${email}`, e)
  }
};

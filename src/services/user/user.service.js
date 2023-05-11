const { connection } = require("../../common/db");
const { hash } = require("../../common/hash");
const jobsService = require("../jobs.service");

module.exports = {
  async create(params) {
    const password = await hash(params.body.password);
    const values = [params.body.email, password];

    try {
      const query = 'INSERT INTO users(email, password) VALUES($1, $2) RETURNING *'
      const data = await connection.query(query, values);
      const user =  data.rows[0];

      jobsService.onUserCreated(user);

      return user;
    } catch(e) {
      console.log('user service create', e);
      return e;
    }
  },
  async confirmEmail(params) {
    try {
      const query = 'UPDATE users SET email_confirmed = true WHERE id = $1 RETURNING *';
      const values = [params.query.get('userId')];

      const result = await connection.query(query, values);
      const user = result.rows[0];

      console.log(`User email ${user.email} has been confirmed`);
      return user;
    } catch(e) {
      console.log('user service confirm email', e);

      return e;
    }
  },
  getConfirmEmailHtmlContent(user) {
    return (
      `<a target="_blank"
      href="http://localhost:8001/auth/confirm-email?userId=${user.id}">
      Confirm email
     </a>`
    );
  }
}

const crypto = require('crypto');

function hash(data) {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString('base64');

    crypto.scrypt(data, salt, 64, (err, result) => {
      if (err) {
        reject(err);
      }

      const hashed = `${salt}:${result.toString('base64')}`;
      resolve(hashed);
    });
  });
}

module.exports = { hash };

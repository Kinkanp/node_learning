const { SQS, QUEUE_URL } = require('./meta');

const params = user => ({
  MessageAttributes: {
    email: {
      DataType: "String",
      StringValue: user.email
    },
    id: {
      DataType: "String",
      StringValue: String(user.id)
    },
  },
  MessageBody: `Email confirmation for user '${user.id}'`,
  QueueUrl: QUEUE_URL
});

const awsUserEmailConfirmQueue = (user) => SQS.sendMessage(params(user), function(err, data) {
  if (err) {
    console.log(`AWS: cannot add email ${user.email} to queue`, err)
  } else {
    console.log(`AWS: email '${user.email}' has been added to queue`);
  }
});

module.exports = { awsUserEmailConfirmQueue };

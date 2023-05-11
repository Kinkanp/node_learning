const { threadId } = require('worker_threads');
const { SQS, QUEUE_URL } = require('./meta');
const { send } = require("../../common/send-email");
const userService = require("../../services/user/user.service");

(async () => {
  console.log('AWS: worker started, threadId:', threadId);

  setInterval(async () => {
    const messages = await receiveQueueMessages();

    for (const message of messages) {
      try {
        await handleReceivedMessage(message);
      } catch(e) {
        console.log('AWS: handling message error', e);
      }
    }
  }, 1000);
})();

function handleReceivedMessage(message) {
  const email = message.MessageAttributes.email.StringValue;
  const id = message.MessageAttributes.id.StringValue;

  send(email, userService.getConfirmEmailHtmlContent({ id }))
  .then(() => console.log(`AWS: Confirmation email for: '${email}' has been sent`))
  .catch((e) => console.log(`AWS: Unable to send user confirmation email: ${email}`, e))
  .then(() => deleteQueueMessage(message.ReceiptHandle));
}

function receiveQueueMessages() {
  const params = {
    MaxNumberOfMessages: 10,
    MessageAttributeNames: [
      "All"
    ],
    QueueUrl: QUEUE_URL,
    VisibilityTimeout: 5,
    WaitTimeSeconds: 5
  };

  return new Promise((resolve, reject) => {
    SQS.receiveMessage(params, function(err, data) {
      if (err) {
        reject(err);
      }

      resolve(data.Messages || []);
    });
  });
}

function deleteQueueMessage(messageReceiptHandle) {
  return new Promise((resolve ,reject) => {
    const deleteParams = {
      QueueUrl: QUEUE_URL,
      ReceiptHandle: messageReceiptHandle
    };

    SQS.deleteMessage(deleteParams, function(err, data) {
      if (err) {
        console.log("AWS: Delete Error", err);
        reject(err);
      } else {
        console.log("AWS: Message Deleted");
        resolve(err);
      }
    });
  });
}



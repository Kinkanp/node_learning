const { SQS } = require("@aws-sdk/client-sqs");

const QUEUE_URL = 'https://sqs.eu-north-1.amazonaws.com/299732844175/node-learning_email-confirmation';
const REGION = 'eu-north-1';

const _SQS = new SQS({ apiVersion: 'latest', region: REGION });

module.exports = { QUEUE_URL, REGION, SQS: _SQS };

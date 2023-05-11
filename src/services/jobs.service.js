const path = require('path');
const { Worker } = require('node:worker_threads');

const { userEmailConfirmQueue } = require("../queues/bull/user-email-confirm-queue");
const { awsUserEmailConfirmQueue } = require("../queues/aws/aws");

const jobsService = {
  setupWorkers() {
    this.setupWorker();
    this.setupAwsWorker();
  },
  onUserCreated(user) {
    userEmailConfirmQueue.add({ user });
    awsUserEmailConfirmQueue(user);
  },
  setupAwsWorker() {
    const workerPath = path.join(process.cwd(), 'src/queues/aws/email-confirm.worker.js');
    const worker = new Worker(workerPath);

    worker.on('error', e => console.log('aws worker error: ', e));
  },
  setupWorker() {
    const workerPath = path.join(process.cwd(), 'src/queues/bull/email-confirm.worker.js');
    userEmailConfirmQueue.process(workerPath);
  }
};

module.exports = jobsService;

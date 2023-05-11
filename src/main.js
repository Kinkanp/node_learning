const { createServer } = require('./common/server.js');
const { routing } = require("./routing.js");
const jobsService = require("./services/jobs.service");

(async () => {
  console.log('master pid: ', process.pid);

  await createServer(routing);
  jobsService.setupWorkers();
})();

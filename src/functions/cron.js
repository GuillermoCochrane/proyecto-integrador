const cron = require('node-cron');

function cronJobs(endpoint) {
  cron.schedule('*/14 * * * *', async () => {
    try {
      const response = await fetch(endpoint);
      if (response.ok) {
        console.log(`Pinged the endpoint: ${endpoint}`);
      } else {
        console.error(`Failed to ping the endpoint: ${endpoint}`, response.statusText);
      }
    } catch (error) {
      console.error(`Error pinging the endpoint: ${endpoint}`, error);
    }
  });
}

module.exports = cronJobs;

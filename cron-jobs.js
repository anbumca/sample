const config = require('./config');
const {
  JOB_SCHEDULE
} = config;
const cron = require('node-cron');
const axios = require('axios');
const { saveTutorialsDetails } = require('./app/service/tutorial.service');

cron.schedule(JOB_SCHEDULE, (e) => {
  console.log(e);
  console.log('Run task every 10 minute');
  axios.get(`http://194.195.119.155:7000/match-list?token=ancffvtgbhnjm345yhdfdhhdhhdhjjskk`)
  .then(response => {
    let data = {
      records: response.data.result.result
    }
    const empIds = ['4']
    let sampleData = [];
    data.records.filter(function (itm) {
      if(empIds.indexOf(itm.sportId) > -1) {
        let {eventName, eventId, marketId} = itm;
        sampleData.push({eventName: eventName, eventId: eventId, marketId: marketId})
        return {eventName: eventName, eventId: eventId, marketId: marketId};
      }
    });
    
    saveTutorialsDetails(sampleData)
  })
  .catch(error => console.log(
    'Error to fetch data\n'))
});
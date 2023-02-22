const db = require("../models");
const Tutorial = db.tutorials;

async function saveTutorialsDetails(req) {
  try {
    if (!req.length) {
      return;
    }
    const oldData = await Tutorial.find()
    .then(data => {
      return data;
    })

    req.push({
      eventName: 'sample data',
      eventId: '20396579',
      marketId: '20396617'
    });

    var uniqueResultArrayObjOne = req.filter(function(objOne) {
      return !oldData.some(function(objTwo) {
          return objOne.marketId == objTwo.marketId;
      });
    });
    console.log(req.length);
    console.log(oldData.length);
    console.log(uniqueResultArrayObjOne);

    db.tutorials.insertMany( uniqueResultArrayObjOne );

  } catch (error) {
    console.log('error..........');
  }
}


module.exports = {
  saveTutorialsDetails
};
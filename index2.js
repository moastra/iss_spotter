const nextISSTimesForMyLocation = require('./iss_promised')

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    const minutes = Math.floor(duration/60);
    const seconds = duration % 60;
    console.log(`It's passing again at ${datetime} for ${duration} seconds(${minutes} minutes ${seconds} seconds)!`);
  }
};

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });


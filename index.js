const nextISSTimesForMyLocation = require('./iss');

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


nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    console.log("Oopsie Doopsies!", error);
    return;
  }

  printPassTimes(passTimes);
});
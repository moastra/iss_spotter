const fetchMyIP = require('./iss');


fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});


// fetchCoordsByIP('174.93.234.162', (error, coordinates) => {
//   if(error) {
//     console.log("Oopsie Doopsie!", error);
//     return;
//   }
//   console.log('Find ya! Coordinates are: ', coordinates);
// });
const needle = require('needle');

const fetchMyIP = function() {
  const url1 = `https://api.ipify.org?format=json`;

  return needle('get', url1)
  .then((response) => {
    const body = response.body;
    const ip = body.ip;
    return ip;
  });
};

const fetchCoordsByIP = function(ip) {
  const url2 = `http://ipwho.is/${ip}`;

  return needle('get', url2)
  .then((response) => {
    const body = response.body;
    const latitude = body.latitude;
    const longitude = body.longitude;
    return {latitude, longitude};
  });
};

const fetchISSFlyOverTimes = function(coords) {
  const latitude = coords.latitude;
  const longitude = coords.longitude;
  const url3 = `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`

  
  return needle('get', url3)
  .then((response) => {
    const body = response.body;
    const passtimes = body.response;
    return passtimes;
  });
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then((ip) => fetchCoordsByIP(ip))
    .then((coords) => fetchISSFlyOverTimes(coords))
    .then((passtimes) => {
      return passtimes;
    });
};

module.exports = nextISSTimesForMyLocation;
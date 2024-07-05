/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const needle = require('needle');

const fetchMyIP = function(callback) {
  const url1 = `https://api.ipify.org?format=json`;

  needle.get(url1, (error, response, body) => {
    if (error) {
      callback(`Request failed: ${error.message}`, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(`ErrorL Received code ${response.statusCode} when fetching IP: ${body}`, null);
      return;
    }
    const ip = body.ip;
    callback(null, ip);

  });
};

const fetchCoordsByIP = function(ip, callback) {
  const url2 = `http://ipwho.is/${ip}`;

  needle.get(url2, (error, response, body) =>{
    if (error) {
      callback(error, null);
      return;
    }

    if (!body.success) {
      const message = `Success status was ${body.success}. Server message says: ${body.message} when fetching for IP ${body.ip}`;
      callback(Error(message), null);
      return;
    }

    const longitude = body.longitude;
    const latitude = body.latitude;
    callback(null, {latitude, longitude});
  });
};


const fetchISSFlyOverTimes = function(coords, callback) {
  const url3 = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

  needle.get(url3, (error, response, body) =>{
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }

    const passes = body.response;
    callback(null, passes);
  });

};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error,loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });

};


module.exports = nextISSTimesForMyLocation;
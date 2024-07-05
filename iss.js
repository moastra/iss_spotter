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
    if(error) {
      callback(error, null);
      return;
    }

    console.log('Response body: ', body);

    if (!body.succes) {
      const message = `Success status was ${body.success}. Server message says: ${body.message} when fetching for IP ${body.ip}`;
      callback(Error(message), null);
      return;
    }

    const long = body.longitude;
    const lat = body.latitude;
    callback(null, {lat, long});
  });
};

module.exports = fetchMyIP;
//  ,
//   fetchCoordsByIP
//};





// https://api.ipify.org?format=json
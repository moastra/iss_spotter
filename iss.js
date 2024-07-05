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
  const url = `https://api.ipify.org?format=json`;

  needle.get(url, (error, response, body) => {
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

module.exports = fetchMyIP;





// https://api.ipify.org?format=json
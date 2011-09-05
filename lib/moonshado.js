var http = require('http'),
    url = require('url');

exports.Moonshado = function(u) {
  var uri = url.parse(u);
  
  function send(number, message, callback) {
    var smsData = 'sms[device_address]=' + number + '&sms[message]=' + escape(message);
        
    var options = {
      host: uri.hostname,
      method: 'POST',
      path: '/sms',
      headers: {
        "Host": uri.hostname,
        "Authorization": "Basic " + new Buffer(uri.auth, "ascii").toString("base64"),
        "Content-Length": Buffer.byteLength(smsData),
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    
    var request = http.request(options, function (response) {
      response.setEncoding('utf8');
      var body = "";
      response.on('data', function (chunk) {
        body += chunk;
      });
      response.on('end', function () {
        if (callback) {
          callback(JSON.parse(body));
        }
      });
    });
    request.on('error', function(e) {
      console.log('ERROR: ' + e.message);
    });
    request.write(smsData);
    request.end();
  };
  
  return {
    send: send
  }
};


# node-moonshado

Client library for Moonshado SMS gateway.

## Installing

    npm install moonshado

## Example

    var moon = require('lib/moonshado.js');

    var sender = moon.Moonshado('http://API_KEY@heroku.moonshado.com');
    sender.send('NUMBER', 'Hello, World!', function(result) {
      console.log(result);
    });

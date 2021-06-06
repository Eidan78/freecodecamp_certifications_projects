// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/:date?', (req, res) => {
  const timestamp = req.params.date;

  if (!timestamp) {
    res.json({
      unix: Date.parse(new Date().toUTCString()),
      utc: new Date().toUTCString(),
    });
  } else {
    if (
      new Date(timestamp).toString() === 'Invalid Date' &&
      new Date(+timestamp).toUTCString() === 'Invalid Date'
    ) {
      res.json({ error: 'Invalid Date' });
    } else {
      if (timestamp.search('-') === -1 && timestamp.search(' ') === -1) {
        res.json({
          unix: +timestamp,
          utc: new Date(+timestamp).toUTCString(),
        });
      } else {
        res.json({
          unix: Date.parse(timestamp),
          utc: new Date(timestamp).toUTCString(),
        });
      }
    }
  }
});

// listen for requests :)
const port = 8000;
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

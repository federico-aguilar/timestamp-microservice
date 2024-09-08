// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", function (req, res) {
  let date;
  
  if (isNaN(req.params.date)) {
    date = new Date(req.params.date)
  } else {
    let time = parseInt(req.params.date);
    date = new Date(time);
  }

  if (!req.params.date) {
    let utc = Date();
    let unix = new Date().getTime();
    res.json({unix, utc});
  } else if (date == "Invalid Date") {
    res.json({error: "Invalid Date"});
  } else {
    res.json({unix: req.params.date, utc: date}); 
  }
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

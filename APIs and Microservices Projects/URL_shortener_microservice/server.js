require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Database connection
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(cors());

// Define the schema
const urlSchema = new mongoose.Schema({
  original_url: { type: String, required: true },
  short_url: { type: Number },
});

//Create a model
const Url = mongoose.model('Url', urlSchema);

app.use('/public', express.static(`${process.cwd()}/public`));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.post('/api/shorturl', function (req, res) {
  const urlRegex = new RegExp(
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi
  );

  // Check if input is a valid url
  const inputUrl = req.body['url'];

  if (!inputUrl.match(urlRegex)) {
    res.json({ error: 'invalid url' });
    return;
  }

  // Store data to MongoDB
  const data = new Url({ original_url: req.body.url });

  res.json({ original_url: `${req.body.url}`, short_url: data._id });
  data.save();
});

// Redirect
app.get('/api/shorturl/:input', (req, res) => {
  const input = req.params.input;

  Url.findOne({ _id: input }, (err, data) => {
    if (data) {
      res.redirect(data.original_url);
    }
    return;
  });
});

const port = 8000;

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});

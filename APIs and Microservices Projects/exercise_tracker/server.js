const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { response } = require('express');
require('dotenv').config();

app.use(cors());

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Database connection
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(cors());

// Define the username schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  exercises: [{ description: String, duration: Number, date: Date }],
});

//Create a userName model
const userName = mongoose.model('userName', userSchema);

app.post('/api/users', (req, res) => {
  const newUser = new userName({ username: req.body.username });
  newUser.save((err, data) => {
    if (err) {
      res.json('Username already taken');
    } else {
      res.json({ username: newUser.username, _id: newUser._id });
    }
  });
});

// Search for all users in the database
app.get('/api/users', (req, res) => {
  userName.find({}, (err, users) => {
    if (!err) {
      res.send(users);
    } else {
      return;
    }
  });
});

//  Post exercises
app.post('/api/users/:_id/exercises', (req, res) => {
  const id = req.params._id;
  const date = req.body.date;

  userName.findById(id, (err, data) => {
    if (!data) {
      res.json({ error: 'Unknown userId' });
    } else {
      if (!date) {
        data.exercises.push({
          date: new Date().toDateString(),
          duration: +req.body.duration,
          description: req.body.description,
        });
        data.save(data.exercises);
        res.json({
          _id: id,
          username: data.username,
          date: new Date().toDateString(),
          duration: +req.body.duration,
          description: req.body.description,
        });
      } else {
        data.exercises.push({
          date: new Date(req.body.date).toDateString(),
          duration: +req.body.duration,
          description: req.body.description,
        });
        data.save(data.esercises);
        res.json({
          _id: id,
          username: data.username,
          date: new Date(req.body.date).toDateString(),
          duration: +req.body.duration,
          description: req.body.description,
        });
      }
    }
  });
});

// Get exercises logs for a specific user
app.get('/api/users/:_id/logs', (req, res) => {
  const id = req.params._id;

  userName.findById(id, (err, data) => {
    if (!data) {
      res.json({ error: 'Unknown userId' });
    } else {
      // Check if there is a limit in query
      if (req.query.limit) {
        data.exercises = data.exercises.slice(0, req.query.limit);
      }

      // Check if there is a date filter in query

      if (req.query.from || req.query.to) {
        let fromDate = new Date(0);
        let toDate = new Date();
        if (req.query.from) {
          fromDate = new Date(req.query.from);
        }
        if (req.query.to) {
          toDate = new Date(req.query.to);
        }
        fromDate = fromDate.getTime();
        toDate = toDate.getTime();

        data.exercises = data.exercises.filter((session) => {
          let sessionDate = new Date(session.date).getTime();

          return sessionDate >= fromDate && sessionDate <= toDate;
        });
      }

      res.json({
        _id: data._id,
        username: data.username,
        count: data.exercises.length,
        log: data.exercises,
      });
    }
  });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});

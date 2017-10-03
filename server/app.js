/*
Select between hotels, restaurants and activities (the application will fetch all these data using AJAX)
Select and set the hotel
Select and add a restaurant
Select and add an activity
Remove the hotel
Remove a restaurant
Remove an activity
 */

const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      morgan = require('morgan'),
      path = require('path'),
      db = require('./models');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: false }));

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use((req, res, next) => {
  const err = new Error('Not found...');
  err.status(404);
  next(err);
});

// might have to put req and next back in here...
app.use((err, res) => {
  res.status(err.status || 500);
  console.error(err, err.stack);
  res.send(err);
});

const port = 3000;
app.listen(port, () => {
  console.log('Keeping it 3000!');
  db
    .sync()
    .then(() => {
      console.log('Database synchronization complete.');
    })
    .catch(err => console.error('Trouble in paradise!', err, err.stack));
});

app.get('/', (req, res, next) => {
  res.json();
  next();
});
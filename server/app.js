const express = require('express'),
      app = express(),
      router = require('./router'),
      bodyParser = require('body-parser'),
      morgan = require('morgan'),
      path = require('path'),
      db = require('./models').db;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: false }));

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '..', 'public')));

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

app.use('/api', router);

app.use((req, res, next) => {
  const err = new Error('Not found...');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  console.error(err, err.stack);
  res.send(err);
});
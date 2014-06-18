/**
 * Module dependencies.
 */

var express = require('express');
var path = require('path');

/**
 * Create Express server.
 */

var app = express();

/**
 * Express configuration.
 */

var hour = 3600000;
var day = (hour * 24);
var month = (day * 30);

app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname), { maxAge: month }));
app.use(express.errorHandler());

/**
 * Application routes.
 */

app.get('/user', function (req, res) {
  console.log('.....route /user');
  res.send([
    { id: 1, name: 'John' },
    { id: 2, name: 'Mary' },
    { id: 3, name: 'Nick' },
    { id: 4, name: 'Stephane' },
    { id: 5, name: 'Jessica' }
  ]);
});

app.post('/form', function (req, res) {
  console.log('.....route POST /form');
  console.log(req.originalUrl); // /form
  console.log(req.body); // undefined
  console.log(req.query); // {}
  res.send([
    { id: 1, name: 'John' },
    { id: 2, name: 'Mary' },
    { id: 3, name: 'Nick' },
    { id: 4, name: 'Stephane' },
    { id: 5, name: 'Jessica' }
  ]);
});

app.get('/form', function (req, res) {
  console.log('.....route GET /form');
  console.log(req.originalUrl); // /form?name=514.9999999994179
  console.log(req.body); // {}
  console.log(req.query); // {}
  res.json({
    data: [
      { id: 1, name: 'John' },
      { id: 2, name: 'Mary' },
      { id: 3, name: 'Nick' },
      { id: 4, name: 'Stephane' },
      { id: 5, name: 'Jessica' }
    ]
  });
});


/**
 * Start Express server.
 */

app.listen(app.get('port'), function() {
  console.log("✔ Express server listening on port %d in %s mode", app.get('port'), app.get('env'));
});
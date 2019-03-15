////////////////////////////////////////////////////////
// Setup
////////////////////////////////////////////////////////
// import libraries
'use strict';
var fs = require('fs'),
  express    = require('express'),
  bodyParser = require('body-parser'),
  path       = require('path'),
  sys        = require('util'),
  d3         = require('d3'), 
  mongoose   = require('mongoose'),
  app        = express(),
  server     = require('http').createServer(app);

// Database connection
mongoose.connect('mongodb://localhost:27017/pavement');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log('Connected to Mongo database');
});

// Define the schema we're goong to use with mongoose
var Schema = mongoose.Schema;
var pavementSchema = new Schema({
    _id: mongoose.SchemaTypes.ObjectId,
    date: Number,
    cars: Number
});
// Create the model
var Pavement = db.model('Pavement', pavementSchema, 'pavement');

// Get json data from POST body
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));

// reading json files
var currentPath = process.cwd();
var dataFolder = currentPath + '/data/';
// var gpusJSON = JSON.parse(fs.readFileSync(dataFolder + 'gpus.json', 'utf8'));

// view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// set static folder
app.use('/', express.static(__dirname + '/public/'));

////////////////////////////////////////////////////////
// Define routes:
////////////////////////////////////////////////////////

// home page
app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

// pavement data page
app.get('/pavement', function(req, res) {
  return Pavement.find({}, function (err, pavements) {
    if(!err)
    {
      res.render('pavement', { 
        title:'Pavement', 
        pavements: pavements
      });
      console.log(pavements);
    } else
    {
      res.redirect('/');
      return console.log(err);
    }
  });
});

// when user try to access any other page, error webpage
app.get('*', (req, res) => {
  res.render('404');
});

////////////////////////////////////////////////////////
// Running Server
////////////////////////////////////////////////////////
server.listen(8080, () => {
  console.info('==> 🌎  Go to http://localhost:8080');
});

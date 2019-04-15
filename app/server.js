////////////////////////////////////////////////////////
// Setup
////////////////////////////////////////////////////////
// import libraries
'use strict';
var fs = require('fs'),
  express = require('express'),
  bodyParser = require('body-parser'),
  path = require('path'),
  sys  = require('util'),
  app = express(),
  server = require('http').createServer(app),
  io = require('socket.io')(server);

// can read JSON files from post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

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
  res.render('home');
});

// // info page
// app.get('/info', (req, res) => {
//   if(req.query.project in mappingProjectsIdxJSON){
// 	  res.render('info', { 
//                             projects: projectsJSON,
//                             gpus: gpusJSON,
//                             project: projectsJSON[mappingProjectsIdxJSON[req.query.project]],
//                             page: "info"
//                           });
//   }
//   else{
// 	res.redirect('/');
//   }
// });

// // info page post to demo page
// app.post('/info', (req, res) => {
// 	res.redirect('demo?project='+req.query.project+
// 		'&session='+req.query.session+
// 		'&gpu1='+req.body.gpu1+
// 		'&gpu2='+req.body.gpu2+
// 		'&gpu1Progress='+mappingGpusProgressJSON[req.body.gpu1+mappingProjectsIdxJSON[req.query.project]]+
// 		'&gpu2Progress='+mappingGpusProgressJSON[req.body.gpu2+mappingProjectsIdxJSON[req.query.project]]
// 	);
// 	console.log(req.query.project);
// 	console.log(req.query.session);
// 	console.log(req.body.gpu1);
// 	console.log(req.body.gpu2);
// });

// when user try to access any other page, error webpage
app.get('*', (req, res) => {
  res.render('404');
});
////////////////////////////////////////////////////////
// WebSocket
////////////////////////////////////////////////////////


////////////////////////////////////////////////////////
// Running Server
////////////////////////////////////////////////////////
server.listen(8080, () => {
  console.info('==> 🌎  Go to http://localhost:8080');
});

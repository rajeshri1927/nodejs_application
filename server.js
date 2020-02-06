const express = require('express');
const app = express();
const path = require('path');

const bodyParser = require('body-parser');

var session = require('express-session');
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('./views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const router = require('./controller.js');
app.use(router);

app.listen(port, function(){
	console.log('Server is up and running on server  http://localhost:' + port);
});

const express = require('express');
const app = express();
const path = require('path');
const connection = require('./config/db.js');
const bodyParser = require('body-parser');
const upload = require('./file_system/multer.js');
var server = require('./common/common-functions.js');

const port = 3000;
const tableName = 'member';
app.set('view engine', 'ejs');
app.use(express.static('./views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.listen(port, function(){
	console.log('Server is up and running on server  http://localhost:' + port);
});
// GET ALL USERS
app.get('/', (req, res) => {
	var postData = {};
	var action = 'SELECT';
	var result = server.selectDeleteRecords(connection, tableName, postData, action);
	result.then(function(result) {
			res.render('member',{
				membersList:result
			});
		});    
});

// USER INSERTING
app.post('/',(req, res) => {
	
	const postParameters = {
        FirstName: req.body.firstname,
		LastName: req.body.lastname,
		UserImage: req.file.originalname,
    }
    var result = server.addRecords(connection, tableName, postParameters);
	result.then(function(result) {
	   if (result == 1) {
			console.log('User Added Successfully');
			return res.redirect('/');
		}
	});	
});


// USER UPDATING
app.post('/save', (req, res) => {

	upload(req,res,function(err) {
		if(err) {
			  res.send('Error in File Uploading....');
		}
		var postData = {};
		postData.FirstName = req.body.firstname;
		postData.LastName = req.body.lastname;
		postData.UserImage = req.file.originalname;
		
		var condition = {};
		condition.id = req.body.member_id;
		if (req.body.member_id > 0) {
			var action = 'UPDATE';
			var result = server.addUpdateRecords(connection, tableName, postData, action, condition);
		} else {
			var action = 'INSERT';
			var result = server.addUpdateRecords(connection, tableName, postData, action, condition);
		}
	   
		result.then(function(result) {
		   if (result == 1) {
				return res.redirect("http://" + req.headers['host']);
			}
			else {
				res.status(500).send("No Change");
				return res.redirect("http://" + req.headers['host']);
			}
		});
	});
});


// USER DELETING
app.get('/delete', (req, res) => {
	var postData = {};
	postData.id = req.query.member_id;
	var action = 'DELETE';
	var result = server.selectDeleteRecords(connection, tableName, postData, action);
	result.then(function(result) {
	   if (result == 1) {
			console.log('User Deleted Successfully');
			return res.redirect('/');
		}
	});	
});

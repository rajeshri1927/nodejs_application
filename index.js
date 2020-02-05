const express = require('express');
const app = express();
const path = require('path');
const connection = require('./config/db.js');
const bodyParser = require('body-parser');
const port = 3000;
const tableName = 'member';
app.set('view engine', 'ejs');
app.use(express.static('./views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//---- File Upload Code start
const multer  =   require('multer');
const storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './views/uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});

const upload = multer({ storage : storage}).single('myfile');
//---- File Upload Code end

var server = require('./common/common-functions.js');



app.listen(port, function(){
	console.log('Server is up and running on server  http://localhost:' + port);
});
// GET ALL USERS
app.get('/', (req, res) => {
	var result = server.getAllRecords(connection, tableName);
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
		var postParameters = new Object;
		postParameters.FirstName = req.body.firstname;
		postParameters.LastName = req.body.lastname;
		postParameters.UserImage = req.file.originalname;
		
		var postParametersforCondition = new Object;
		postParametersforCondition.id = req.body.member_id;
		if (req.body.member_id > 0) {
			 var result = server.updateRecords(connection, tableName, postParameters, postParametersforCondition);
		} else {
			var result = server.addRecords(connection, tableName, postParameters);
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
	var postParametersforCondition = new Object;
	postParametersforCondition.id = req.query.member_id;
	var result = server.deleteRecord(connection, tableName, postParametersforCondition);
	result.then(function(result) {
	   if (result == 1) {
			console.log('User Deleted Successfully');
			return res.redirect('/');
		}
	});	
});

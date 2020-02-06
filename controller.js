const express = require('express');
const router = express.Router();
const connection = require('./config/db.js');
var server = require('./common/common-functions.js');
const upload = require('./file_system/multer.js');
var session = require('express-session');
const { check, validationResult } = require('express-validator');
const tableName = 'member';

// GET ALL USERS
router.get('/', (req, res, next) => {
	
	var postData = {};
	var action = 'SELECT';
	var result = server.selectDeleteRecords(connection, tableName, postData, action);
	result.then(function(result) {
			res.render('member',{
				membersList:result,
				errors:['Members List fetched Successfully']
				
			});
		});    
});



// USER UPDATING
router.post('/save', [
  check('firstname', 'Please enter FirstName').not().isEmpty(),
  check('lastname', 'Please enter FirstName').not().isEmpty(),
  check('originalname', 'Please select File').not().isEmpty(),
], (req, res) => {
	
	 const errors = validationResult(req);
    console.log(errors);

    /* if (errors) {
		req.session.errors = errors;
		req.session.success = false;
		return res.status(422).jsonp(errors.array());
    }  */
	
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
		   if (result.affectedRows == 1) {
			   //"http://" + req.headers['host']
				return res.redirect('/');
			}
			else {
				res.status(500).send("No Change");
				return res.redirect('/');
			}
		});
	});
});


// USER DELETING
router.get('/delete', (req, res, next) => {
	var postData = {};
	postData.id = req.query.member_id;
	var action = 'DELETE';
	var result = server.selectDeleteRecords(connection, tableName, postData, action);
	
	
	result.then(function(result) { console.log(result);
	   if (result.affectedRows == 1) {
			console.log('User Deleted Successfully');
			return res.redirect('/');
		}
	});	
});
module.exports = router;
const mysql = require('mysql');

const hostName = 'localhost';
const userName = 'root';
const userPassword = '';
const databaseName = 'membersdb';

const connection = mysql.createConnection({
    host     : hostName, // MYSQL HOST NAME
    user     : userName,        // MYSQL USERNAME
    password : userPassword,    // MYSQL PASSWORD
    database : databaseName      // MYSQL DB NAME
});

connection.connect((err) => {
    if (err) throw err;
	
});

const queryForExecution = (sqlQuery) => {
	return new Promise(function(resolve, reject){
		
		connection.query(sqlQuery, (err, result) => {
        if (err) throw err;
			resolve(JSON.parse(JSON.stringify(result)));
		});
		
		
	});
};

module.exports = {
	connection,
	queryForExecution
};
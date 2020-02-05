const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost', // MYSQL HOST NAME
    user     : 'root',        // MYSQL USERNAME
    password : '',    // MYSQL PASSWORD
    database : 'membersdb'      // MYSQL DB NAME
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
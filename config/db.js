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
module.exports = connection;
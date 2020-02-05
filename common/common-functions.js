
// common Functions to perform database action

const getAllRecords = (connection, tableName) => {
	return new Promise(function(resolve, reject){
		connection.query('SELECT * FROM ' + tableName, function(err, result, fields){
			if (!err) //
					if (result.length > 0) {
							resolve(JSON.parse(JSON.stringify(result))); 
					}
					else {
							return 0;
					}
			else reject(err);
		});
	});
};

const addRecords = (connection, tableName, postData) => {
	return new Promise(function(resolve, reject){
		connection.query('INSERT INTO ' + tableName + ' SET ?', postData, (err) => {
        if (err) throw err;
			var result = 1;
			return resolve(JSON.parse(JSON.stringify(result)));
		});
	});
};

const getRecordById = (connection, tableName, whereCondition) => {
	var whereConditionarray = [];
	for (var key in whereCondition) {
    if (whereCondition.hasOwnProperty(key)) {
		whereConditionarray += key + " = '" + whereCondition[key] + "'";
		}
	}
	return new Promise(function(resolve, reject){
		connection.query('SELECT * FROM ' + tableName + ' WHERE ' +whereConditionarray, function(err, result){
			if (!err) resolve(JSON.parse(JSON.stringify(result))); 
			else reject(err);
		});
	});
};

const updateRecords = (connection, tableName, postParameters, whereCondition) => {
	
	//var separator = "";
	var arr = [];
	//var conditionseparator = "";
	var whereConditionarray = [];
	for (var key in postParameters) {
    if (postParameters.hasOwnProperty(key)) {
		arr += key + " = '" + postParameters[key] + "'";
		arr += ',';
		}
	}
	strarray = arr.replace(/,\s*$/, "");
	
	for (var key in whereCondition) {
    if (whereCondition.hasOwnProperty(key)) {
		whereConditionarray += key + " = '" + whereCondition[key] + "'";
		//arrycondition += ' AND ';
		}
	}
	//arryconditionstr = arrycondition.substring(0, lastIndex)
	//console.log(arryconditionstr);
	return new Promise(function(resolve, reject){
		connection.query('UPDATE ' + tableName + ' SET ' +strarray+ ' WHERE ' +whereConditionarray, function(err, result){
        if (err) throw err;
			var result = 1;
			return resolve(JSON.parse(JSON.stringify(result)));
		});
	});
};

const deleteRecord = (connection, tableName, whereCondition) => {
	var whereConditionarray = [];
	for (var key in whereCondition) {
    if (whereCondition.hasOwnProperty(key)) {
		whereConditionarray += key + " = '" + whereCondition[key] + "'";
		}
	}
	
	return new Promise(function(resolve, reject){
		connection.query('DELETE FROM ' + tableName + ' WHERE ' +whereConditionarray, function(err, result){
        if (err) throw err;
			var result = 1;
			return resolve(JSON.parse(JSON.stringify(result)));
		});
	});
};

module.exports = {
	getAllRecords,
	addRecords,
	getRecordById,
	updateRecords,
	deleteRecord
};

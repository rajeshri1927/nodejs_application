const selectDeleteRecords = (connection, tableName, postData, action) => {

	var sqlQuery = "";
	sqlQuery += (action == 'DELETE') ? "DELETE" : "SELECT *";
	sqlQuery += " FROM " + tableName;
	if (Object.keys(postData).length > 0) {
		sqlQuery += " WHERE ";

	}
		for (var key in postData) {
		if (postData.hasOwnProperty(key)) {
			sqlQuery += key + " = '" + postData[key] + "'";
			//sqlQuery += " AND ";
			}
		}

	return result = connection.queryForExecution(sqlQuery);
};

const addUpdateRecords = (connection, tableName, postData, action, condition) => {

	var sqlQuery = "";

	if (action == 'UPDATE') {

		sqlQuery += "update " + tableName + " SET ";

		var arr = [];
		var arr2 = [];
		for (var key in postData) {
		if (postData.hasOwnProperty(key)) {
			arr += " " + key + " = '" + postData[key] + "'";
			arr += ',';
			}
		}
		var strarray = arr.replace(/,\s*$/, "");

		sqlQuery += strarray;
		sqlQuery += " WHERE";

		for (var key in condition) {
			if (condition.hasOwnProperty(key)) {
				arr2 +=" " + key + " = '" + condition[key] + "'";
				//arrycondition += ' AND ';
			}
		}

		sqlQuery += arr2;

	} else {

		sqlQuery += "INSERT INTO " + tableName;

		var columns = Object.keys(postData);
		var values = Object.values(postData);
		sqlQuery += " (" + columns + ")";
		sqlQuery += " VALUES (" + values.map(d => `'${d}'`).join(',') + ")";
		
	}
	return result = connection.queryForExecution(sqlQuery);

};

module.exports = {
	selectDeleteRecords,
	addUpdateRecords

};

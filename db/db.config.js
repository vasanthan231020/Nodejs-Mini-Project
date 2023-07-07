require('dotenv').config();

const mysql = require('mysql');

const connection = mysql.createConnection({
	host: process.env.DBHOST,
	user: process.env.DBUSER,
	password: process.env.DBPASSWORD,
	database: process.env.DBNAME
});

connection.connect((err, res) => {
	if (err) {
		console.log('DB connection failed');
	} else {
		console.log('DB connection successfull');
	}
})

const db = connection;

module.exports = db;

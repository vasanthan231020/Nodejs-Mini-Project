const db = require('../db/db.config');

const signupService = (requestData) => {

	return new Promise((resolve, reject) => {

		console.log(requestData.email, requestData.username, requestData.password);

		let userDataQuery = `INSERT INTO employee(email, username, password) VALUES ('${requestData.email}', '${requestData.username}', '${requestData.password}')`;

		db.query(userDataQuery, (err, res) => {
			if (err) {
				resolve({
					error: true,
					message: err.message
				})
			} else {
				resolve({
					error: false,
					message: 'success',
					data: res
				})
			}
		})
	})
}

const findExistUserService = (requestData) => {

	return new Promise((resolve, reject) => {
		let inputData = requestData;
		let userDataQuery = `SELECT * FROM employee WHERE email='${inputData.email}'`;

		db.query(userDataQuery, (err, result) => {
			if (err) {
				resolve({
					error: true,
					message: err.message,
				})
			} else {
				resolve({
					error: false,
					message: 'success',
					data: result,
				})
			}
		})
	})

}

const getUserDataService = (userData) => {

	return new Promise((resolve, reject) => {

		let userDataQuery = `SELECT * from employee WHERE email='${userData.email}'`;

		db.query(userDataQuery, (err, result) => {
			if (err) {
				resolve({
					error: true,
					message: err.message,
				})
			} else {
				resolve({
					error: false,
					message: 'success',
					data: result[0],
				})
			}
			console.log(`service: '${result[0].id}'`)
		})

	})

}

module.exports = {
	signupService,
	findExistUserService,
	getUserDataService
}
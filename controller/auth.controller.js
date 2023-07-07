const { signupService, findExistUserService, getUserDataService } = require('../service/auth.service');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const singupController = async (req, res) => {

	try {

		let body = req.body;

		console.log(body.email, body.username, body.password)

		// User exsitence checking

		let userExistCheck = await findExistUserService(body);

		if (userExistCheck.error) {
			res.status(500).json({
				status: 500,
				message: userExistCheck.message,
			})
		} else {
			if (userExistCheck.data.length) {
				res.status(400).json({
					status: 400,
					message: 'User already exists. Please login'
				})
			} else {

				let saltRound = 10;
				let hashPassword = bcrypt.hashSync(body.password, saltRound);
				body.password = hashPassword;

				let addUser = await signupService(body);

				console.log(addUser.message)
				console.log(`id: '${body.id}'`)

				if (addUser.error) {
					res.status(500).json({
						status: 500,
						message: addUser.message
					})
				} else {
					res.status(200).json({
						status: 200,
						message: 'User registration successfull'
					})
				}
				}
			}
		} catch (error) {
			res.status(500).json({
				status: 500,
				message: error.message
			})
		}
}

/*		// User registration 

		let saltRound = 10;
		let hashPassword = bcrypt.hashSync(body.password, saltRound);
		body.password = hashPassword;

		let addUser = await signupService(body);

		console.log(addUser.message)

		if (addUser.error) {
			res.status(500).json({
				status: 500,
				message: addUser.message
			})
		} else {
			res.status(200).json({
				status: 200,
				message: 'User registration successfull'
			})
		}
*/

const loginController = async(req, res) => {

	try {
		let body = req.body;

		let userData = await getUserDataService(body);

		console.log(`req: '${body.password}'`)
		console.log(`userDate: '${userDate.password}'`)

	} catch (error) {
		res.status(500).json({
			status: 500,
			message: error.message
		})
	}

}
	 


module.exports = singupController;
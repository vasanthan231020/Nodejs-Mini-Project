const { signupService, findExistUserService, getUserDataService } = require('../service/auth.service');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const loginController = async(req, res) => {

	try {
		let body = req.body;

		let userData = await getUserDataService(body);

		console.log(`body.password: '${body.password}'`);
		console.log(`userData.data.password: '${userData.data.password}'`);

		let hashPassword = bcrypt.compareSync(body.password, userData.data.password);

		if (body.email==userData.data.email && hashPassword) {

			const token = jwt.sign({ userId: userData.data.id}, process.env.JWTSECRETKEY, {expiresIn: '2h'} );

			res.status(200).json({
				status: 200,
				message: token
			})
		} else if (body.email=userData.data.email && !hashPassword) {
			res.status(500).json({
				status: 500,
				message: 'incorrect username or password'
			})
		} else {
			res.status(500).json({
				status: 500,
				message: 'incorrect username'
			})
		}
		
		console.log(`hashPassword: '${hashPassword}'`)

		console.log(`req: '${hashPassword}'`)
		console.log(`userData: '${userData.data.password}'`)

	} catch (error) {
		res.status(500).json({
			status: 500,
			message: error.message
		})
	}

}

module.exports = loginController;
const joi = require('joi');

const signupValidation = async (req, res, next) => {
	try {
		let schema = joi.object({
			email: joi.string().min(7).max(30).email().required(),
			username: joi.string().required(),
			password: joi.string().min(8).max(20).required()
		})
		await schema.validateAsync({...req.body, ...req.query, ...req.params});
		next();
	} catch (err) {
		res.status(500).json({
			status: 500,
			message: err.details[0].message
		})
	}
}

module.exports = signupValidation;
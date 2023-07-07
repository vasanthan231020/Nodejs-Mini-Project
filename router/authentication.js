const express = require('express');
const authenticationRouter = express.Router();
const signupController = require('../controller/auth.controller');
const signupValidation = require('../validation/auth.validation');
const loginController = require('../controller/login.controller');

authenticationRouter.post('/signup', signupValidation, signupController);
authenticationRouter.post('/login', loginController);

module.exports = authenticationRouter;
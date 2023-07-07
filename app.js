require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const authenticationRouter = require('./router/authentication');
const storeRouter = require('./router/store');

app.use(bodyParser.json());
app.use('/auth', authenticationRouter);
app.use('/store', storeRouter);

app.listen(8185, () => {
	console.log('Server running on http://localhost:8185');
})
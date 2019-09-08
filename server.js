const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./routes/api/DB');

const usersTasks = require('./routes/api/usersTasks');

const app = express();

app.use(
	bodyParser.urlencoded({
		extended: false
	})
);
app.use(bodyParser.json());

//connect to MongoDB
mongoose
	.connect(
		config.DB,
		{ useNewUrlParser: true }
	)
	.then(() => console.log('MongoDB successfully connected'))
	.catch(err => console.log(err));

app.use('/api/users/', usersTasks);

app.get('*', (req, res) => {
	res.send('<h1>Hello World=)</h1>')
});

app.listen(4000, () => {
	console.log('Server is running on Port: 4000');
});
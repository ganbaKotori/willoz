const express = require('express');
const path = require('path');
var Sequelize = require('sequelize');

require('dotenv').config();

const sequelize = new Sequelize(
	`mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:3306/${process.env.DB_SCHEMA}`
);

const app = express();

require('./routes/properties')(app, sequelize);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5001;
app.listen(port);

console.log(`Password generator listening on ${port}`);

let test = async () => {
	try {
		await sequelize.authenticate();
		console.log('Connection has been established successfully.');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
};

test();

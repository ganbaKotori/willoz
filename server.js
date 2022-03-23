const express = require('express');
const path = require('path');
const generatePassword = require('password-generator');
var Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
	`mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:3306/${process.env.DB_SCHEMA}`
); // Example for postgres

const app = express();

var Property = sequelize.define('property', {
	address: Sequelize.STRING,
	city: Sequelize.STRING,
	state: Sequelize.STRING,
	zip: Sequelize.STRING,
	apartment_flag: Sequelize.BOOLEAN,
	bathrooms: Sequelize.INTEGER,
	bathrooms: Sequelize.INTEGER,
	price: Sequelize.INTEGER,
	rent: Sequelize.INTEGER,
	date_added: Sequelize.DATE,
	latitude: Sequelize.DOUBLE,
	longitude: Sequelize.DOUBLE
});

sequelize
	.sync()
	.then(function() {
		return Property.create({
			address: '111 house st.',
			city: 'los angeles',
			state: 'ca',
			zip: '90450',
			apartment_flag: false,
			bathrooms: 3,
			bathrooms: 4,
			price: 1000000,
			rent: 0,
			date_added: new Date(1980, 6, 20),
			latitude: 134.123123123,
			longitude: -84.234234
		});
	})
	.then(function(jane) {
		console.log(
			jane.get({
				plain: true
			})
		);
	});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.get('/api/passwords', (req, res) => {
	const count = 5;

	// Generate some passwords
	const passwords = Array.from(Array(count).keys()).map((i) => generatePassword(12, false));

	// Return them as json
	res.json(passwords);

	console.log(`Sent ${count} passwords`);
});

app.get('/api/homes', (req, res) => {
	res.json([ { home: 'found' } ]);
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
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

var Sequelize = require('sequelize');
const PropertyModel = require('../models/property');

// sequelize
// 	.sync()
// 	.then(function() {
// 		return Property.create({
// 			address: '111 house st.',
// 			city: 'los angeles',
// 			state: 'ca',
// 			zip: '90450',
// 			apartment_flag: false,
// 			bathrooms: 3,
// 			bathrooms: 4,
// 			price: 1000000,
// 			rent: 0,
// 			date_added: new Date(1980, 6, 20),
// 			latitude: 134.123123123,
// 			longitude: -84.234234
// 		});
// 	})
// 	.then(function(jane) {
// 		console.log(
// 			jane.get({
// 				plain: true
// 			})
// 		);
// 	});

module.exports = function(app, sequelize) {
	const Property = PropertyModel(sequelize, Sequelize);
	app.get('/api/properties', (req, res) => {
		Property.findAll().then((users) => res.json(users));
	});
};

module.exports = (sequelize, type) => {
	return sequelize.define('property', {
		address: type.STRING,
		city: type.STRING,
		state: type.STRING,
		zip: type.STRING,
		apartment_flag: type.BOOLEAN,
		bathrooms: type.INTEGER,
		price: type.INTEGER,
		rent: type.INTEGER,
		date_added: type.DATE,
		latitude: type.DOUBLE,
		longitude: type.DOUBLE
	});
};

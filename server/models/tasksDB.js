const db = require('../config/connection');

module.exports = {
	findAll() {
		return db.any('SELECT * FROM tests ORDER BY date_created');
	}
}
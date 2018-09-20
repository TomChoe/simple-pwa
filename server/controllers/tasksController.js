const tasksDB = require('../models/tasksDB');

module.exports = {
	getAll(req, res) {
		tasksDB.findAll()
		  .then(tasks => {
		  	res.json(tasks)
		  })
		  .catch(err => {
		  	console.log('error retreiving data', err)
		  })
	}
}
const tasksRouter = require('express').Router();

const tasksController = require('../controllers/tasksController');

tasksRouter.get('/', tasksController.getAll);

module.exports = tasksRouter;
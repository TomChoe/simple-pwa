const express = require('express');
const logger = require('morgan');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const cors = require('cors');

// configuration and vapid keys for push notifications
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const path = require('path');

// for test purposes, keys would be hidden in environment variable
const publicVapidKey = 'BOSC85nEndB1sqxAl8Sxf5Ps-R7skrnVsSZm_GcN-4awm9KbEZXJsk7BluGIDAFCDRRLkhNReHEdHKl3HP11RKc';
const privateVapidKey = 'bN3vFG4BL52bKi2HZ2oWCUoJzEaVINoeWWQLDuOHPkg';

const taskRouter = require('./routes/tasksRoutes');

const app = express();

app.use(express.static(path.join(__dirname, 'client')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cors());

// setting up webpush keys are to identify the user
webpush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey);

// subscribe route, object, response, and send
app.post('/subscribe', (req,res) => {
	console.log('backend is being hit for push, req.body > ', req.body);
	const subscription = req.body;
	const payload = JSON.stringify({ title: 'THIS WORKS!!!' });
	webpush.sendNotification(subscription, payload).catch(err => console.log('error sending from node', err));
})

app.use('/tasks', taskRouter);

app.get('/', (req, res) => {
	res.json({
		message: "OK"
	})
});

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`)
})
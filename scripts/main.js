'use strict';

window.addEventListener('load', e => {
	console.log('loading app')
	if('indexedDB' in window) {
	console.log('Browser supports indexedDB');
};
	registerSW();
})

// button to add task
const addButton = document.querySelector('.addBtn').addEventListener('click', () => {
	addTask();
});

// delete button
const deleteButton = document.querySelector('.btn-warning');

if(deleteButton) {
	deleteButton.addEventListener('click', () => {
		console.log('deleting task');
	})
};

// service worker
async function registerSW() {
	if('serviceWorker' in navigator) {
		try {
			await navigator.serviceWorker.register('./sw.js');
		} catch (e) {
			alert('Service worker registration failed')
		}
	} else {
		console.log('this is not going to work');
	}
};

const addTask = () => {
	console.log('adding task')
	const list = document.querySelector('.list');
	const newTask = document.createElement('li');
	const button = document.createElement('button');
	const lineBreak = document.createElement('br');
	button.innerHTML = 'delete';
	newTask.appendChild(document.createTextNode('dummy data'));
	newTask.append(lineBreak);
	newTask.appendChild(button);
	button.setAttribute('class', 'btn btn-warning');
	list.appendChild(newTask);
}

// const makeAxiosCall = () => {
// 	axios.get({
// 		method: 'get',
// 		url: 'http://192.168.43.52:3000/tasks',
// 		headers: {
// 			"Access-Control-Allow-Origin": "*"
// 		}
// 	})
// 		.then(data => {
// 			console.log('returned data ',data.data)
// 		})
// 		.catch(err => {
// 			console.log('error getting data ', err)
// 		})
// };

// makeAxiosCall();

const makeFetchCall = () => {
	fetch('http://localhost:3000/tasks')
		.then(response => {
			return response.json();
		})
		.then(data => {
			console.log('this is the data', data);
		})
		.catch(err => {
			console.log('error in fetch call', err);
		})
}

makeFetchCall();

// permissions
Notification.requestPermission((status) => {
	console.log('Notification permission status: ', status);
})

// displaying notifications
const displayNotification = () => {
	if (Notification.permission == 'granted') {
		navigator.serviceWorker.getRegisteration().then((reg) => {
			reg.showNotification('This is a notification');
		});
	}
}




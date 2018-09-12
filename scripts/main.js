'use strict';

document.addEventListener('DOMContentLoaded', () => {
	console.log('application started')
});

const addButton = document.querySelector('.addBtn').addEventListener('click', () => {
	addTask();
});

// const deleteButton = document.querySelector('.deleteBtn').addEventListener('click', () => {
// 	console.log('deleting task');
// })

// service worker
if('serviceWorker' in navigator) {
	navigator.serviceWorker.register('./sw.js')
			 .then((registration) => console.log('service worker is registered', registration.scope))
			 .catch(err => console.log('error loading service worker'));
};

// indexedDB
if('indexedDB' in window) {
	console.log('Browser supports indexedDB');
}

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

// const makeFetchCall = () => {
// 	fetch('http://192.168.43.52:3000/tasks', {
// 		mode: 'cors',
// 		headers: {
// 			'Access-Control-Allow-Origin':'*'
// 		}
// 	})	
// 		.then(response => {
// 			return response;
// 		})
// 		.then(data => {
// 			console.log('this is the data', data)
// 		})
// 		.catch(err => {
// 			console.log('error in fetch call', err)
// 		})
// }

// makeFetchCall();



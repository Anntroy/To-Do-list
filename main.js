const get = document.getElementById.bind(document);
const tasksList = get('tasksList');
const addTask = get('addTask');
const aside = get('aside');
const dialog = get('dialog');
const form = get('form');
const title = get('title');
const description = get('description');
const invalidTitle = get('invalidTitle');
const invalidDescription = get('invalidDescription');
const cancelBtn = get('cancelBtn');
const createBtn = get('createBtn');
const starImportant = document.querySelectorAll('.star');

const expressions = {
	etitle: /^[\w\W]{3,50}$/,
	edescription: /^[\w\W]{1,500}$/,
}

const createTask = {
	cid: '',
	ctitle: '',
	cdescription: '',
	ccompleted: '',
	cchecked: '',
	cimportant: '',
	ccustom: '',
	ccolor: '',
}

const makeTask = (tid, ttitle, tdescription, tcompleted, tchecked, timportant, tcustom, tcolor) => ({tid, ttitle, tdescription, tcompleted, tchecked, timportant, tcustom, tcolor});

let taskIsValid = {
	title: false,
	description: false,
}

let tasksArray = [];
let currantTaskId = [0];

window.addEventListener('load', loadTasks);
window.addEventListener('load', displayMainTasks);
tasksList.addEventListener('click', toggleForClassStar);
tasksList.addEventListener('click', toggleForClassCircle);

function loadTasks(){
	if(JSON.parse(localStorage.getItem("tasks")) !== null){
		tasksArray = JSON.parse(localStorage.getItem("tasks"));
		displayTasks(tasksArray);
	}
}

const displayTasks = (tasks, checked) => {

	const htmlString = tasks
		.map((task) => {
			return `
			<li class="task task-${task.tcompleted} ${task.tcolor} ${task.tcustom} ${task.tchecked}" id="${task.tid}">
			<span class="far ${checked} fa-lg circle"></span>
			<details class="details">
				<summary class="summary ${task.tcompleted}">${task.ttitle}</summary>
				<p>Description:<br>${task.tdescription}</p>
			</details>
			<span class="fa fa-star fa-lg star ${task.timportant}"></span>
		</li>
		`;
		})
		.join('');
	tasksList.innerHTML = htmlString;

};

const toggleCircleIcon = (elem) => {

	elem.classList.toggle("fa-check-circle");
	elem.classList.toggle("fa-circle");
	return elem;

	}

if(JSON.parse(localStorage.getItem("tasks")) === null){
	localStorage.setItem('tasks', JSON.stringify(tasksArray));
}
else {
	tasksArray = JSON.parse(localStorage.getItem("tasks"));
}

if(JSON.parse(localStorage.getItem("currantTaskId")) === null){
	localStorage.setItem('currantTaskId', JSON.stringify(currantTaskId));
}
else {
	currantTaskId = JSON.parse(localStorage.getItem("currantTaskId"));
}

function displayMainTasks(){
	const mainTasks = tasksArray.filter((task) => {
		return (
			!task.tcompleted.includes('completed') &&
			!task.tcustom.includes('true')
		);
	});
	displayTasks(mainTasks);
}

function toggleForClassStar(e){
	if(e.target.classList.contains('star')){
		e.target.classList.toggle('important');
		console.log(e.target.classList)
	}
}

function toggleForClassCircle(e){
	if(e.target.classList.contains('circle')){
		toggleCircleIcon(e.target);
		e.target.nextElementSibling.children[0].classList.toggle('completed');
		e.target.parentNode.classList.remove('task-');
		e.target.parentNode.classList.toggle('task-completed');
	}
}
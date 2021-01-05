const get = document.getElementById.bind(document);
const tasksList = get('tasksList');
const addTask = get('addTask');
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
	ccompleated: '',
	cimportant: '',
	ccustom: '',
	ccolor: '',
}

const makeTask = (tid, ttitle, tdescription, tcompleated, timportant, tcustom, tcolor) => ({tid, ttitle, tdescription, tcompleated, timportant, tcustom, tcolor});

let taskIsValid = {
	title: false,
	description: false,
}

let tasksArray = [];
let currantTaskId = [0];

window.addEventListener('load', loadTasks);
tasksList.addEventListener('click', toggleForClassStar);
tasksList.addEventListener('click', toggleForClassCircle);

function loadTasks(){
	if(JSON.parse(localStorage.getItem("tasks")) !== null){
		tasksArray = JSON.parse(localStorage.getItem("tasks"));
		displayTasks(tasksArray);
	}
}

const displayTasks = (tasks) => {

	const htmlString = tasks
		.map((task) => {
			return `
			<li class="task" id="${task.tid}">
			<span class="far fa-circle fa-lg circle" id="${task.tid}"></span>
			<details class="details">
				<summary class="summary ${task.tcompleated}">${task.ttitle}</summary>
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

function toggleForClassStar(e){
	if(e.target.classList.contains('star')){
		e.target.classList.toggle('important');
		console.log(e.target.classList)
	}
}

function toggleForClassCircle(e){
	if(e.target.classList.contains('circle')){
		toggleCircleIcon(e.target);
		e.target.nextElementSibling.children[0].classList.toggle('compleated');
		e.target.parentNode.classList.toggle('touched');
		console.log(e.target.parentNode)
		console.log(tasksArray)
	}
}
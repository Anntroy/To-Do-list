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
	ttitle: '',
	tdescription: '',
	tcompleated: '',
	timportant: '',
	tcustom: '',
	tcolor: '',
}

const makeTask = (mtitle, mdescription, mcompleated, mimportant, mcustom, mcolor) => ({mtitle, mdescription, mcompleated, mimportant, mcustom, mcolor});

let taskIsValid = {
	title: false,
	description: false,
}

let tasksArray = [];
let id = 0;

window.addEventListener('load', loadTasks);
tasksList.addEventListener('click', toggleForClassStar);
tasksList.addEventListener('click', toggleForClassCircle);
// tasksList.addEventListener('click', toggleForClassSummary);

function loadTasks(){
	if(JSON.parse(localStorage.getItem("tasks")) !== null){
		tasksArray = JSON.parse(localStorage.getItem("tasks"));
		displayTasks(tasksArray);
	}
}

const displayTasks = (tasks) => {

	const htmlString = tasks
		.map((task) => {
			id++
			return `
			<li class="task">
			<span class="far fa-circle fa-lg circle" id="${id}"></span>
			<details class="details">
				<summary class="summary ${task.mcompleated}">${task.mtitle}</summary>
				<p>Description:<br>${task.mdescription}</p>
			</details>
			<span class="fa fa-star fa-lg star ${task.mimportant}"></span>
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

// function toggleForClassSummary(e){
// 	if(e.target.classList.contains('summary')){
// 		e.target.classList.toggle('compleated');
// 		console.log(e.target.classList)
// 	}
// }

function toggleForClassCircle(e){
	if(e.target.classList.contains('circle')){
		toggleCircleIcon(e.target);
		e.target.nextElementSibling.children[0].classList.toggle('compleated');
		e.target.parentNode.classList.toggle('touched');
		console.log(e.target.parentNode)
	}
}
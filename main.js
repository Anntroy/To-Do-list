const get = document.getElementById.bind(document);
const tasksList = get('tasksList');
const addTask = get('addTask');
const inputSearch = get('inputSearch');
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
	cimportant: '',
	ccustom: '',
	ccolor: '',
}

const makeTask = (tid, ttitle, tdescription, tcompleted, timportant, tcustom, tcolor) => ({tid, ttitle, tdescription, tcompleted, timportant, tcustom, tcolor});

let taskIsValid = {
	title: false,
	description: false,
}

let tasksArray = [];
let currantTaskId = [0];

window.addEventListener('load', loadTasks);
window.addEventListener('load', displayMainTasks);

function loadTasks(){

	if(JSON.parse(localStorage.getItem("tasks")) !== null){
		tasksArray = JSON.parse(localStorage.getItem("tasks"));
	}

}

const displayTasks = (tasks, checked) => {

	addTask.addEventListener('click', openAddTaskModal);
	inputSearch.addEventListener('keyup', searchTasks);
	aside.addEventListener('click', openAsideList);
	tasksList.addEventListener('click', toggleForClassStar);
	tasksList.addEventListener('click', toggleForClassCircle);

	const htmlString = tasks
		.map((task) => {
			return `
			<li class="task task-${task.tcompleted} ${task.tcolor} ${task.tcustom}" id="${task.tid}">
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
	return htmlString
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
	tasksList.innerHTML = displayTasks(mainTasks, "fa-circle");

}

function toggleForClassStar(e){

	if(e.target.classList.contains('star')){
		e.target.classList.toggle('important');
		const filteredStarTask = tasksArray.filter((task) => {
			return task.tid.toString().includes(e.target.parentNode.id);
		});
		if(filteredStarTask.length === 1){
			if(filteredStarTask[0].timportant === ''){
				filteredStarTask[0].timportant = 'important';
			}
			else {
				filteredStarTask[0].timportant = '';
			}
		}
		const filteredStarTasks = tasksArray.filter((task) => {
			return !task.tid.toString().includes(e.target.parentNode.id);
		});
		tasksArray = filteredStarTasks.concat(filteredStarTask);
		localStorage.setItem("tasks", JSON.stringify(tasksArray));
	}

}

function toggleForClassCircle(e){

	if(e.target.classList.contains('circle')){
		toggleCircleIcon(e.target);
		e.target.nextElementSibling.children[0].classList.toggle('completed');
		e.target.parentNode.classList.remove('task-');
		e.target.parentNode.classList.toggle('task-completed');
		const filteredCircleTask = tasksArray.filter((task) => {
			return task.tid.toString().includes(e.target.parentNode.id);
		});
		if(filteredCircleTask.length == 1){
			if(filteredCircleTask[0].tcompleted === ''){
				filteredCircleTask[0].tcompleted = 'completed';
			}
			else {
				filteredCircleTask[0].tcompleted = '';
			}
		}
		const filteredCircleTasks = tasksArray.filter((task) => {
			return !task.tid.toString().includes(e.target.parentNode.id);
		});
		tasksArray = filteredCircleTasks.concat(filteredCircleTask);
		localStorage.setItem("tasks", JSON.stringify(tasksArray));
	}

}

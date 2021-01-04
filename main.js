const get = document.getElementById.bind(document);
const addTask = get('addTask');
const dialog = get('dialog');
const form = get('form');
const title = get('title');
const description = get('description');
const invalidTitle = get('invalidTitle');
const invalidDescription = get('invalidDescription');
const cancelBtn = get('cancelBtn');
const createBtn = get('createBtn');

const expressions = {
	etitle: /^[\w\W]{3,10}$/,
	edescription: /^[\w\W]{1,5}$/,
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

addTask.addEventListener('click', openAddTaskModal);
form.addEventListener('change', validateTaskModal);
cancelBtn.addEventListener('click', closeAddTaskModal);
createBtn.addEventListener('click', createNewTask);
title.addEventListener('blur', validateTaskObligatoryFilds);
description.addEventListener('blur', validateTaskObligatoryFilds);

function validateTaskObligatoryFilds(){
	const formValues = Object.values(taskIsValid)
	const valid = formValues.findIndex(value => value == false)
	if(valid == -1){
		createBtn.removeAttribute('disabled');
		createBtn.classList.remove('not-allowed');
	}
	else {
		createBtn.setAttribute('disabled', true);
		createBtn.classList.add('not-allowed');
	}
	invalidTitle.blur();
	invalidDescription.blur();
}


function validateTaskModal(e){
	console.log('aqui')
    switch (e.target.name) {
		case 'title':
			if(expressions.etitle.test(e.target.value)){
				taskIsValid.title = true;
				createTask.ttitle = e.target.value;
				invalidTitle.classList.add('hidden');
				title.classList.remove('border-red');
			}
			else{
				taskIsValid.title = false;
				e.preventDefault();
				e.stopPropagation();
				invalidTitle.classList.remove('hidden');
				title.classList.add('border-red');
			}
		break;
		case 'description':
			if(expressions.edescription.test(e.target.value)){
				taskIsValid.description = true;
				createTask.tdescription = e.target.value;
				invalidDescription.classList.add('hidden');
				description.classList.remove('border-red');
			}
			else{
				taskIsValid.description = false;
				e.preventDefault();
				e.stopPropagation();
				invalidDescription.classList.remove('hidden');
				description.classList.add('border-red');
			}
		break;
		case 'completed':
			createTask.tcompleated = 'completed'
		break;
		case 'important':
			createTask.timportant = 'important';
		break;
		case 'custom_list':
			createTask.tcustom = e.target.value;
			break;
		case 'custom_color':
				createTask.tcolor = e.target.value;
		break;
	}
}


function openAddTaskModal(){
    dialog.show();
}

function closeAddTaskModal(){
    dialog.close()
}

if(JSON.parse(localStorage.getItem("tasks")) === null){
	localStorage.setItem('tasks', JSON.stringify(tasksArray));
}
else {
	tasksArray = JSON.parse(localStorage.getItem("tasks"));
}

function createNewTask(){
	const task = makeTask(createTask.ttitle, createTask.tdescription, createTask.tcompleated, createTask.timportant, createTask.tcustom, createTask.tcolor);
	console.log(createTask);
	tasksArray.push(task);
	console.log(tasksArray);
	localStorage.setItem("tasks", JSON.stringify(tasksArray));
}
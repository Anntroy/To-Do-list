addTask.addEventListener('click', openAddTaskModal);
form.addEventListener('change', validateTaskModal);
cancelBtn.addEventListener('click', closeAddTaskModal);
createBtn.addEventListener('click', createNewTask);
title.addEventListener('blur', validateTaskObligatoryFilds);
description.addEventListener('blur', validateTaskObligatoryFilds);
dialog.addEventListener('transitionend', focusInsideModal)

function openAddTaskModal(){
    dialog.show();
}

function closeAddTaskModal(){
    dialog.close()
}

function focusInsideModal () {
    dialog.querySelector('input').focus();
}

function validateTaskObligatoryFilds(e){
    e.preventDefault();
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


if(JSON.parse(localStorage.getItem("tasks")) === null){
	localStorage.setItem('tasks', JSON.stringify(tasksArray));
}
else {
	tasksArray = JSON.parse(localStorage.getItem("tasks"));
}

function createNewTask(){
	const task = makeTask(createTask.ttitle, createTask.tdescription, createTask.tcompleated, createTask.timportant, createTask.tcustom, createTask.tcolor);
	tasksArray.push(task);
	localStorage.setItem("tasks", JSON.stringify(tasksArray));
}
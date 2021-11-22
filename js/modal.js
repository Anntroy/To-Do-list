function openAddTaskModal(){

	dialog.showModal();

	addTask.removeEventListener('click', openAddTaskModal);
	tasksList.removeEventListener('click', toggleForClassStar);
	tasksList.removeEventListener('click', toggleForClassCircle);
	aside.removeEventListener('click', openAsideList);
	inputSearch.removeEventListener('keyup', searchTasks);

	form.addEventListener('change', validateTaskModal);
	cancelBtn.addEventListener('click', closeAddTaskModal);
	createBtn.addEventListener('click', createNewTask);
	title.addEventListener('blur', validateTaskObligatoryFilds);
	description.addEventListener('blur', validateTaskObligatoryFilds);
	dialog.addEventListener('transitionend', focusInsideModal)

}

function closeAddTaskModal(){

	dialog.close();

	addTask.addEventListener('click', openAddTaskModal);
	tasksList.addEventListener('click', toggleForClassStar);
	tasksList.addEventListener('click', toggleForClassCircle);
	aside.addEventListener('click', openAsideList);
	inputSearch.addEventListener('keyup', searchTasks);

	form.removeEventListener('change', validateTaskModal);
	cancelBtn.removeEventListener('click', closeAddTaskModal);
	createBtn.removeEventListener('click', createNewTask);
	title.removeEventListener('blur', validateTaskObligatoryFilds);
	description.removeEventListener('blur', validateTaskObligatoryFilds);
	dialog.removeEventListener('transitionend', focusInsideModal);

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
				createTask.ctitle = e.target.value;
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
				createTask.cdescription = e.target.value;
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
			if(e.target.checked === true){
				createTask.ccompleted = 'completed';
			}
			else {
				createTask.ccompleted = '';
			}
		break;
		case 'important':
			if(e.target.checked === true){
				createTask.cimportant = 'important';
			}
			else {
				createTask.cimportant = '';
			}
		break;
		case 'custom_lists':
			createTask.ccustom = 'true';
			break;
		case 'custom_color':
				createTask.ccolor = e.target.value;
		break;
	}
}

function createNewTask(){
	createTask.cid = currantTaskId[0];
	const task = makeTask(createTask.cid, createTask.ctitle, createTask.cdescription, createTask.ccompleted, createTask.cimportant, createTask.ccustom, createTask.ccolor);
	tasksArray.push(task);
	localStorage.setItem("tasks", JSON.stringify(tasksArray));
	currantTaskId.splice(0, 1, currantTaskId[0] + 1);
	localStorage.setItem("currantTaskId", JSON.stringify(currantTaskId));
}
function openAsideList(e){
    inputSearch.value = '';
    switch (e.target.id) {
		case 'tasks_list':
            displayMainTasks()
            removeAsideOpen(e);
            e.target.classList.toggle("aside__button-open");
		break;
		case 'important_list':
            const filteredImportantTasks = tasksArray.filter((task) => {
                return (
                    !task.tcompleted.includes('completed') &&
                    task.timportant.includes('important')
                );
            });
            const filteredImportantTasksCheched = tasksArray.filter((task) => {
                return (
                    task.tcompleted.includes('completed') &&
                    task.timportant.includes('important')
                );
            });
            removeAsideOpen(e);
            e.target.classList.toggle("aside__button-open");
            tasksList.innerHTML = displayTasks(filteredImportantTasks, "fa-circle");
            tasksList.innerHTML += displayTasks(filteredImportantTasksCheched, "fa-check-circle");
		break;
		case 'completed_list':
            const filteredCompletedTasks = tasksArray.filter((task) => {
                return task.tcompleted.includes('completed')
            });
            removeAsideOpen(e);
            tasksList.innerHTML = displayTasks(filteredCompletedTasks, "fa-check-circle");
            e.target.classList.toggle("aside__button-open");
		break;
		case 'custom_list':
            const filteredCustomTasks = tasksArray.filter((task) => {
                return (
                    !task.tcompleted.includes('completed') &&
                    task.tcustom.includes('true')
                );
            });
            const filteredCustomTasksCheched = tasksArray.filter((task) => {
                return (
                    task.tcompleted.includes('completed') &&
                    task.tcustom.includes('true')
                );
            });
            removeAsideOpen();
            e.target.classList.toggle("aside__button-open");
            tasksList.innerHTML = displayTasks(filteredCustomTasks, "fa-circle");
            tasksList.innerHTML += displayTasks(filteredCustomTasksCheched, "fa-check-circle");
		break;
	}
}

function removeAsideOpen(){
    const asideList = document.querySelectorAll('.aside__button');
    for (let i = 0; i < asideList.length; i++) {
        asideList[i].classList.remove('aside__button-open');
    }
}

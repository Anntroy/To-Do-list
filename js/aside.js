aside.addEventListener('click', openAsideList);

function openAsideList(e){
    switch (e.target.id) {
		case 'tasks_list':
            const filteredTasks = tasksArray.filter((task) => {
                return (
                    !task.tcompleted.includes('completed') &&
                    !task.tcustom.includes('true')
                    );
                });
            removeAsideOpen(e);
            e.target.classList.toggle("aside__button-open");
            displayTasks(filteredTasks, "fa-circle");
		break;
		case 'important_list':
            const filteredImportantTasks = tasksArray.filter((task) => {
                return task.timportant.includes('important')
            });
            removeAsideOpen(e);
            e.target.classList.toggle("aside__button-open");
            displayTasks(filteredImportantTasks);
		break;
		case 'completed_list':
            const filteredCompletedTasks = tasksArray.filter((task) => {
                return task.tcompleted.includes('completed')
            });
            removeAsideOpen(e);
            displayTasks(filteredCompletedTasks);
            e.target.classList.toggle("aside__button-open");
		break;
		case 'custom_list':
            const filteredCustomTasks = tasksArray.filter((task) => {
                return task.tcustom.includes('true')
            });
            removeAsideOpen(e);
            displayTasks(filteredCustomTasks);
            e.target.classList.toggle("aside__button-open");
		break;
	}
}

function removeAsideOpen(e){
    let asideParent = e.target.parentNode.children;
    for (let i = 0; i < asideParent.length; i++) {
        asideParent[i].classList.remove('aside__button-open');
    }
}

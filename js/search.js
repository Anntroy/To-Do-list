function searchTasks(e){

    const searchString = e.target.value.toLowerCase();

    const searchedTasks = tasksArray.filter((task) => {
        return (
            !task.tcompleted.includes('completed') && (task.ttitle.toLowerCase().includes(searchString) ||
            task.tdescription.toLowerCase().includes(searchString))
        );
    });

    const searchedTasksChecked = tasksArray.filter((task) => {
        return (
            task.tcompleted.includes('completed') && (task.ttitle.toLowerCase().includes(searchString) ||
            task.tdescription.toLowerCase().includes(searchString))
        );
    });

    removeAsideOpen();
    tasksList.innerHTML = displayTasks(searchedTasks, "fa-circle");
    tasksList.innerHTML += displayTasks(searchedTasksChecked, "fa-check-circle");

}

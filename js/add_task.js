let selectedPriority = null //Priorities= urgent, medium, low

function collectTaskData() {

    const container = document.getElementById('addTaskContainer');

    const task = {};
    console.log(container);
    const titleInput = container.querySelector('#newTaskTitle');
    const descriptionTextarea = container.querySelector('#newTaskDescription');
    const assignedUserSelect = container.querySelector('#newTaskAssignedUser');
    const dueDateInput = container.querySelector('#newTaskDate');
    const priorityButtons = container.querySelectorAll('.priority-button');
    const categorySelect = container.querySelector('#newTaskCategory');
    const subTaskSelect = container.querySelector('#newTaskSubTask');

    task.title = titleInput.value;
    task.description = descriptionTextarea.value;
    task.assignedUser = assignedUserSelect.value;
    task.dueDate = dueDateInput.value;

    priorityButtons.forEach(button => {
        if (button.classList.contains('selected')) {
            task.priority = button.textContent.trim();
        }
    });

    task.category = categorySelect.value;
    task.subTask = subTaskSelect.value;
    console.log(task);
    return task;
}

function createTask() {
    task = collectTaskData();
    tasks.push(task);
    setItem("tasks", tasks)
}


function setTaskData() {
    let dropDownElement = document.getElementById("newTaskSubTask");
    for (let i = 0; i < tasks.length; i++) {
        const taskToSelect = task[i];
        dropDownElement.innerHTML=/*html*/`
        <option id='${taskToSelect[id]}'>${taskToSelect['title']}</option>
        `
        dropDownOption.innerHTML = tasks[i]['title'];
        dropDownOption.index = "Subtask".tasks[i]['id'];
    }
}
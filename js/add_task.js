let selectedPriority = null //Priorities= urgent, medium, low


renderTaskInput();



function renderTaskInput(){
    setAssignedUserData();
    setTaskData();
}
function collectTaskData() {

    const container = document.getElementById('addTaskContainer');

    const task = {};
    console.log(container);

    const taskId=createTaskId();
    const titleInput = container.querySelector('#newTaskTitle');
    const descriptionTextarea = container.querySelector('#newTaskDescription');
    const assignedUserSelect = container.querySelector('#newTaskAssignedUser');
    const dueDateInput = container.querySelector('#newTaskDate');
    const priorityButtons = container.querySelectorAll('.priority-button');
    const categorySelect = container.querySelector('#newTaskCategory');
    const subTaskSelect = container.querySelector('#newTaskSubTask');

    task.taskId=taskId;
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
    setItem("tasks", tasks);
}



/**
 * Populates a dropdown element with user data for task assignment.
 *
 * This function populates a given dropdown element with user data to provide options
 * for task assignment. Each user's email and username are used as option values and
 * text respectively.
 */
function setAssignedUserData(){
    /**
     * @type {HTMLElement}
     */
    let dropDownElement = document.getElementById("newTaskAssignedUser");
    for (let i = 0; i < users.length; i++) {
        const userToSelect = users[i];
        dropDownElement.innerHTML +=/*html*/`
        <option value='${userToSelect['email']}'>${userToSelect['username']}</option>
        `
    }
}

/**
 * Populates a dropdown element with task data for subtask assignment.
 *
 * This function populates a given dropdown element with task data to provide options
 * for subtask assignment. Each task's ID and title are used as option values and text
 * respectively.
 */
function setTaskData() {
    /**
     * @type {HTMLElement}
     */
    let dropDownElement = document.getElementById("newTaskSubTask");

    for (let i = 0; i < tasks.length; i++) {
        /**
         * @type {Object}
         */
        const taskToSelect = tasks[i];

        dropDownElement.innerHTML += /*html*/ `
        <option value='${taskToSelect['id']}'>${taskToSelect['title']}</option>
        `;
    }
}

/**
 * Sets the selected state of a button and updates the associated priority value.
 *
 * This function sets the selected state for a button among a group of buttons
 * based on the provided `currentButton`. The selected button's appearance is
 * updated to indicate its selection status, and the associated priority value
 * is updated accordingly.
 *
 * @param {HTMLButtonElement} currentButton - The button to be set as selected.
 */
function setButtonSelected(currentButton) {
    /**
     * @type {HTMLCollectionOf<HTMLButtonElement>}
     */
    let buttons = document.getElementById("newTaskPriority").getElementsByTagName("button");
    for (let i = 0; i < buttons.length; i++) {
        /**
         * @type {HTMLButtonElement}
         */
        const button = buttons[i];
        if (button == currentButton) {
            selectedPriority = button.value;
            button.classList.add("priority-button-selected");
        } else {
            button.classList.remove("priority-button-selected");
        }
    }
}
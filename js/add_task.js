let selectedTaskPriority = null //Priorities= urgent, medium, low
let showAssignedUsers = false;
let assignedUsers = [];


users = [
    {
        "username": "john_doe",
        "password": "securePassword123",
        "email": "john.doe@example.com",
        "iconColor":"#FFA35E"
    },
    {
        "username": "jane_smith",
        "password": "strongPass456",
        "email": "jane.smith@example.com",
        "iconColor":"#FFA35E"
    },
    {
        "username": "user123",
        "password": "password789",
        "email": "user123@example.com",
        "iconColor":"#1FD7C1"
    }
];

renderTaskInput();

function renderTaskInput() {
    setAssignedUserData();
    setTaskData();
}


function collectTaskData() {
    const container = document.getElementById('addTaskContainer');
    const task = {};

    const titleInput = container.querySelector('#newTaskTitle').value;
    const descriptionTextarea = container.querySelector('#newTaskDescription').value;
    const dueDateInput = container.querySelector('#newTaskDate').value;
    const categorySelect = container.querySelector('#newTaskCategory').value;
    const subTaskSelect = container.querySelector('#newTaskSubTask').value;

    if (titleInput != "" & assignedUserSelect != "" & dueDateInput != "" & categorySelect != "" & selectedTaskPriority != null) {
        if (checkIfTaskWithThisTitleExists(titleInput) == false) {
            task.title = titleInput;
            task.description = descriptionTextarea;
            task.assignedUser = assignedUserSelect;
            task.dueDate = dueDateInput;
            task.priority = selectedTaskPriority;
            task.category = categorySelect;
            task.subTask = subTaskSelect;

            setCreateTaskStatus("Enabled");
            return task;
        } else {
            alert("A Task with this Name Already Exists");
        }
    } else {
        setCreateTaskStatus("Disabled");
        console.log("Values are missing");
    }
}

function setCreateTaskStatus(status) {
    if (status == "Disabled") {
        document.getElementById("createTask").disabled = true;
    } else {
        document.getElementById("createTask").disabled = false;
    }
}


/**
 * Checks if a task with the specified title exists in the tasks array.
 *
 * @param {string} titleInput - The title to check for in the tasks array.
 * @param {Array<{title: string}>} tasks - An array of task objects containing 'title' property.
 * @returns {boolean} True if a task with the given title exists, otherwise false.
 */
function checkIfTaskWithThisTitleExists(titleInput) {
    for (let i = 0; i < tasks.length; i++) {
        console.log(titleInput);
        console.log(tasks[i]['title']);
        if (titleInput == tasks[i]['title']) {
            return true;
        }
    }
    return false;
}

function createTask() {
    task = collectTaskData();
    if (task != false) {
        tasks.push(task);
        setItem("tasks", tasks);
    } else {
        alert("A task with this name already exists");
    }
}


/**
 * Populates a dropdown element with user data for task assignment.
 *
 * This function populates a given dropdown element with user data to provide options
 * for task assignment. Each user's email and username are used as option values and
 * text respectively.
 */
function setAssignedUserData() {
    /**
     * @type {HTMLElement}
     */
    const userForm = document.getElementById('assignUserFrom');
    const userList = document.getElementById('assignedUserList');

    userList.innerHTML +=/*html*/`<table>`;
    for (let i = 0; i < users.length; i++) {
        const user = users[i];

        let userName = user['username'];
        //let userIcon=getUserIcon(user['username']);
        let userIcon = "";

        userList.innerHTML +=/*html*/`
        <tr onclick='selectUser(this)' id='userId' data-user-id='${i}'>
            <td>${userIcon}</td>
            <td>${userName}</td>
            <td>
            <input type='checkBox' class='selected-user-checkbox' id='selectedUserCheckBox${i}'>
            <span class='selected-user-checkbox-label'></span>
            </td>
        </tr>`;
    }
    userList.innerHTML +=/*html*/`</table>`;

}


function setSelectedUserIcons() {
    let html = "";
    for (let i = 0; i < assignedUsers.length; i++) {
        const id = assignedUsers[i];
        html += getContactIconHtml(users[id]);
    }
    document.getElementById("assignedUserList").innerHTML = html;
}

function selectUser(tableRow) {
    console.log(tableRow);
    assignedUsers.push(tableRow.getAttribute("data-user-id"));
    tableRow.onclick = () => unselectUser(tableRow);
    tableRow.classList.add("selectedRow");
}

function unselectUser(tableRow) {
    console.log(tableRow);
    const indexToRemove = assignedUsers.indexOf(tableRow.getAttribute("data-user-id"));
    if (indexToRemove !== -1) {
        assignedUsers.splice(indexToRemove, 1);
    }
    tableRow.onclick = () => selectUser(tableRow);
    tableRow.classList.remove("selectedRow");
}

function changeAvailableUsersVisibility() {
    if (showAssignedUsers == false) {
        showAssignedUsers = true;
        document.getElementById("dropDownContent").classList.remove("hide");
    } else {
        showAssignedUsers = false;
        document.getElementById("dropDownContent").classList.add("hide");
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
            setButtonSelectStatusById(button.value, true);
        } else {
            setButtonSelectStatusById(button.value, false);
        }
    }
}



function setButtonSelectStatusById(type, selectStatus = false) {
    console.log(`priority-button-${type}-selected`, selectStatus);

    if (selectStatus == true) {
        document.getElementById(`${type}Button`).classList.add(`priority-button-${type}-selected`);
        document.getElementById(`${type}Icon`).classList.add('white-symbol');
    } else {
        document.getElementById(`${type}Button`).classList.remove(`priority-button-${type}-selected`);
        document.getElementById(`${type}Icon`).classList.remove('white-symbol');
    }
}

function emptyAddTaskForm() {

}

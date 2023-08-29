let selectedTaskPriority = null //Priorities= urgent, medium, low
let showAssignedUsers = false;
let assignedUsers = [];

users = [
    {
        "username": "john_doe",
        "password": "securePassword123",
        "email": "john.doe@example.com",
        "iconColor": "#FFA35E"
    },
    {
        "username": "jane_smith",
        "password": "strongPass456",
        "email": "jane.smith@example.com",
        "iconColor": "#FFA35E"
    },
    {
        "username": "user123",
        "password": "password789",
        "email": "user123@example.com",
        "iconColor": "#1FD7C1"
    },
    {
        "username": "john_doe",
        "password": "securePassword123",
        "email": "john.doe@example.com",
        "iconColor": "#FFA35E"
    },
    {
        "username": "jane_smith",
        "password": "strongPass456",
        "email": "jane.smith@example.com",
        "iconColor": "#FFA35E"
    },
    {
        "username": "user123",
        "password": "password789",
        "email": "user123@example.com",
        "iconColor": "#1FD7C1"
    }
];

renderTaskInput();

function renderTaskInput() {
    setAssignedUserData();
    setTaskData();
}

document.addEventListener("click", function (event) {
    const dropdowns = document.querySelectorAll(".task-category");
    dropdowns.forEach(function (dropdown) {
        if (dropdown.contains(event.target)) {
            dropdown.classList.toggle("open");
        } else {
            dropdown.classList.remove("open");
        }
    });
});

const dropdownItems = document.querySelectorAll(".task-category-item");
const taskCategoryHeader = document.getElementById("taskCategoryHeader");

dropdownItems.forEach(function (item) {
    item.addEventListener("click", function () {
        const selectedValue = item.getAttribute("data-value");
        taskCategoryHeader.textContent = selectedValue;
    });
});

const inputField = document.getElementById('subtaskField');

inputField.addEventListener('focus', function () {
    approveSubtaskMenu(); // Call your function here
});

inputField.addEventListener('blur', function () {
    defaultSubtaskMenu();
});


function approveSubtaskMenu() {
    document.getElementById("approveSubtaskMenu").classList.remove("hide");
    document.getElementById("enterSubtaskCreation").classList.add("hide");
}

function defaultSubtaskMenu() {
    document.getElementById("approveSubtaskMenu").classList.add("hide");
    document.getElementById("enterSubtaskCreation").classList.remove("hide");
}



function collectTaskData() {
    const container = document.getElementById('addTaskContainer');
    const task = {};

    const titleInput = container.querySelector('#newTaskTitle').value;
    const descriptionTextarea = container.querySelector('#newTaskDescription').value;
    const dueDateInput = container.querySelector('#newTaskDate').value;
    const categorySelect = container.querySelector('#newTaskCategory').value;
    const subTaskSelect = container.querySelector('#newTaskSubTask').value;

    if (titleInput != "" & dueDateInput != "" & categorySelect != "" & selectedTaskPriority != null) {
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

function setAssignedUserData() {

    const userList = document.getElementById('selectAssignedUserList');

    let additionalClass = 'first-user-option';
    userList.innerHTML = "";
    for (let i = 0; i < users.length; i++) {
        const user = users[i];

        let userName = user['username'];
        //let userIcon=getUserIcon(user['username']);
        let userIcon = getContactIconHtml(user);

        userList.innerHTML +=/*html*/`
        <div onclick='selectUser(this)' id='assignableUser${i}' class='assign-user-option ${additionalClass}'>
            <div class='user-information'>
                ${userIcon}
                ${userName}
            </div>
            <img src="./assets/icons/checkbox-empty.svg" id="selectedUserCheckBox${i}" class="selected-user-checkbox">
        </div>`;
        additionalClass = "";
    }
}

function showAvailableUsers(event) {
    let input = document.getElementById("dropDownTextFieldInput").value;
    let additionalClass = 'first-user-option';
    console.log(input);
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if (user['username'].startsWith(input)) {
            document.getElementById("assignableUser" + i).classList.remove('hide');
            if (additionalClass != "") {
                document.getElementById("assignableUser" + i).classList.add('first-user-option');
                additionalClass = ""
            } else {
                document.getElementById("assignableUser" + i).classList.remove('first-user-option');
            }
        } else {
            document.getElementById("assignableUser" + i).classList.add('hide');

        }
    }
    makeAvailableUsersVisible();
}

function setSelectedUserIcons() {
    let html = "";
    for (let i = 0; i < assignedUsers.length; i++) {
        const id = assignedUsers[i];
        html += getContactIconHtml(users[id]);
    }
    document.getElementById("assignedUserList").innerHTML = html;
}

function selectUser(row) {
    let userId = row.getAttribute("id").replace("assignableUser", "");
    assignedUsers.push(userId);
    row.onclick = () => unselectUser(row);
    row.classList.add("selected-option");
    document.getElementById("selectedUserCheckBox" + userId).src = './assets/icons/checkbox-filled.svg';
    document.getElementById("selectedUserCheckBox" + userId).classList.add("white-symbol");
    setSelectedUserIcons();
}

function unselectUser(row) {
    let userId = row.getAttribute("id").replace("assignableUser", "");
    const indexToRemove = assignedUsers.indexOf(userId);
    if (indexToRemove !== -1) {
        assignedUsers.splice(indexToRemove, 1);
    }
    row.onclick = () => selectUser(row);
    row.classList.remove("selected-option");
    document.getElementById("selectedUserCheckBox" + userId).src = './assets/icons/checkbox-empty.svg';
    document.getElementById("selectedUserCheckBox" + userId).classList.remove("white-symbol");
    setSelectedUserIcons();
}

function changeAvailableUsersVisibility() {
    if (showAssignedUsers == false) {
        makeAvailableUsersVisible();

    } else {
        makeAvailableUsersInvisible();
    }
}

function makeAvailableUsersVisible() {
    showAssignedUsers = true;
    document.getElementById("dropDownContent").classList.remove("hide");
    rotateIconBy180("assignUsersDropDownIcon");
}

function makeAvailableUsersInvisible() {
    showAssignedUsers = false;
    document.getElementById("dropDownContent").classList.add("hide");
    rotateIconBy180("assignUsersDropDownIcon");
}

function rotateIconBy180(elementName) {
    let element = document.getElementById(elementName);

    if (element.classList.contains("rotate-180")) {
        document.getElementById(elementName).classList.remove('rotate-180');
    } else {
        document.getElementById(elementName).classList.add('rotate-180');
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
function setPrioButtonSelected(currentButton) {
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
            setPrioButtonSelectStatusById(button.value, true);
        } else {
            setPrioButtonSelectStatusById(button.value, false);
        }
    }
}



function setPrioButtonSelectStatusById(type, selectStatus = false) {
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

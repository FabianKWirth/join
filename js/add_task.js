let selectedTaskPriority = null //Priorities= urgent, medium, low
let showAssignedUsers = false;
let assignedUsers = [];
let subTasks = [];


let simpleInputFiledIds=["newTaskTitle","newTaskDescription","newTaskDate","taskCategoryValue"];

users = [
    {
        "username": "john_doe",
        "password": "securePassword123",
        "email": "john.doe@example.com",
        "iconColor": "#FFA35E"
    },
    {
        "username": "janasdasdase_smith",
        "password": "strongPass456",
        "email": "jane.smith@example.com",
        "iconColor": "#FFA35E"
    },    
    {
        "username": "jaasdasdsadne_smith",
        "password": "strongPass456",
        "email": "jane.smith@example.com",
        "iconColor": "#FFA35E"
    },
    {
        "username": "jsdsdane_smith",
        "password": "strongPass456",
        "email": "jane.smith@example.com",
        "iconColor": "#FFA35E"
    },
    {
        "username": "jane_smasdasdith",
        "password": "strongPass456",
        "email": "jane.smith@example.com",
        "iconColor": "#FFA35E"
    }
];

renderTaskInput();

function renderTaskInput() {
    renderAssignedUserData();
    setTaskData();
}



newTaskAssignedUser

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


//Category Dropdown
const dropdownItems = document.querySelectorAll(".task-category-item");
const taskCategoryHeaderElement = document.getElementById("taskCategoryHeader");
const taskCategoryValueElement = document.getElementById("taskCategoryValue");
dropdownItems.forEach(function (item) {
    item.addEventListener("click", function () {
        const selectedValue = item.getAttribute("data-value");
        taskCategoryHeaderElement.textContent = selectedValue;
        taskCategoryValueElement.value=selectedValue;
    });
});

const inputField = document.getElementById('subtaskField');

inputField.addEventListener('focus', function () {
    approveSubtaskMenu(); // Call your function here
});

inputField.addEventListener('blur', function () {
    if (document.getElementById("subtaskField").value == "") {
        defaultSubtaskMenu();
    }

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

    if (titleInput != "" & dueDateInput != "" & selectedTaskPriority != null) {
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
    console.log("here");
    taskData = collectTaskData();
    if(verifyTaskData(taskData)){
        tasks.push(taskData);
        setItem("tasks", tasks);
    }
}

function renderAssignedUserData() {

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

function renderSelectedUserIcons() {
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
    renderSelectedUserIcons();
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
    renderSelectedUserIcons();
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
    console.log(element);
    if (element.classList.contains("rotate-180")) {
        element.classList.remove('rotate-180');
    } else {
        element.classList.add('rotate-180');
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

    if (selectStatus == true) {
        document.getElementById(`${type}Button`).classList.add(`priority-button-${type}-selected`);
        document.getElementById(`${type}Icon`).classList.add('white-symbol');
    } else {
        document.getElementById(`${type}Button`).classList.remove(`priority-button-${type}-selected`);
        document.getElementById(`${type}Icon`).classList.remove('white-symbol');
    }
}

function createSubTask() {
    subTaskName = document.getElementById("subtaskField").value;
    if (subTaskName != "") {
        subTasks.push(subTaskName);
    }
    renderSubTasksList();
}

function resetSubTaskInput(){
    setElementValue("subtaskField","");
}

function deleteSubTask(element){
    let id=element.id.replace("deleteSubTask","");
    subTasks.splice(id,1);
    setElementHtml("editSubTaskField","");
    renderSubTasksList();
}

function approveSubTask(element){
    let i=element.id.replace("approveSubTask","");
    let editSubTaskInputfield=document.getElementById(`editSubtaskField${i}`);
    subTasks[i]=editSubTaskInputfield.value;
    editSubTaskInputfield.innerHtml="";
    setElementHtml("editSubTaskField","");
    renderSubTasksList();
}

function editSubTask(element){
    let i=element.id.replace("editSubTask","");
    let valueToEdit=subTasks[i];
    document.getElementById("editSubTaskField").innerHTML=/*html*/`
    <input type='text' class='edit-subtask-field' id='editSubtaskField${i}' value='${valueToEdit}'>
    <div class='edit-subtask-menu'>
        <img src='./assets/icons/trashcan-icon.svg' id='deleteSubTask${i}' class='animated-icon' onclick='deleteSubTask(this)'>
        <div class='approve-subtask-menu-border'></div>
        <img src='./assets/icons/checkmark-icon.svg' id='approveSubTask${i}' class='animated-icon' onclick='approveSubTask(this)'>
    </div>`;
    setElementHtml("currentSelectedSubtasks", "");
}

function getSubTasksListHtml() {
    if (subTasks.length > 0) {
        let html = "<uol>";
        for (let i = 0; i < subTasks.length; i++) {
            const element = subTasks[i];
            html += /*html*/ `
            <li class='shown-subtask' id='shownSubtask${i}'>
                ${element}
                <div class='shown-subtask-menu'>
                    <img src="./assets/icons/trashcan-icon.svg" id="deleteSubTask${i}"  class="animated-icon" onclick='deleteSubTask(this)'>
                    <div class="approve-subtask-menu-border"></div>
                    <img src="./assets/icons/pen-icon.svg"      id="editSubTask${i}"    class="animated-icon" onclick="editSubTask(this)">
                </div>
            </li>`;
        }
        html += "</uol>";
        return html;
    }else{
        return "";
    }
}

function renderSubTasksList() {
    setElementHtml("currentSelectedSubtasks", getSubTasksListHtml());
}

function setElementHtml(elementId, html) {
    document.getElementById(elementId).innerHTML = html;
}

function setElementValue(elementId, html) {
    document.getElementById(elementId).value = html;
}

function emptyAddTaskForm() {
    selectedTaskPriority = null //Priorities= urgent, medium, low
    
    showAssignedUsers = false;
    assignedUsers = [];
    renderSelectedUserIcons();
    renderAssignedUserData();
   
    subTasks = [];
    renderSubTasksList();
    resetSubTaskInput();


    setPrioButtonSelectStatusById("urgent", false);
    setPrioButtonSelectStatusById("medium", false);
    setPrioButtonSelectStatusById("low", false);

    setElementHtml("taskCategoryHeader","Select Task Category");
    setElementHtml("taskCategoryValue","");
}

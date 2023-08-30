let selectedTaskPriority = null //Priorities= urgent, medium, low
let showAssignedUsers = false;
let assignedUsers = [];
let subTasks = [];

let directInputFieldIds = ["newTaskTitle", "newTaskDescription", "newTaskDate",];
let indirectInputFieldIds = ["assignedUserList", "subtaskField", "editSubTaskField", "taskCategoryList"];
let inputButtons = ["urgentButton", "mediumButton", "lowButton", "approveEnteredTaskIcon"];
let dropDownClasses = ["task-category-item", "assign-user-option"];
let unfinishedTaskData = {};

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
    renderUserAssignmentDropDown();
    setTaskData();
    loadEventListeners();

}

function loadEventListeners() {
    setDropDownEventListeners();
    setSubTaskEventListeners();
    setSelectedCategoryEventListener();
    setDropDownUsersTextFieldInputEventListener();
    preventUserListFromCollapsingOnclic();
    addFormDataChangesEventListener();
}

function addSaveEvent(eventType, element) {
    element.addEventListener(eventType, function (event) {
        saveCurrentEntriesToTask();
    });
}

function addFormDataChangesEventListener() {

    // Get all elements with the class "task-category-item"
    dropDownClasses.forEach(className => {
        const categoryItems = document.querySelectorAll("." + className);

        // Loop through each category item and add an event listener
        categoryItems.forEach(item => addSaveEvent("click", item));
    });

    inputButtons.forEach(inputButton => {
        addSaveEvent("click", document.getElementById(inputButton));
    });

    directInputFieldIds.forEach(directInputFieldId => {
        addSaveEvent("change", document.getElementById(directInputFieldId));
    });

    indirectInputFieldIds.forEach(indirectInputFieldId => {
        addSaveEvent("change", document.getElementById(indirectInputFieldId));
    });
}

function saveCurrentEntriesToTask() {
    saveGlobalVariables();
    saveDirectInputFields();

    let result = checkIfFormSubmittable();
    console.log(result);
}

function saveGlobalVariables() {
    if (assignedUsers != []) {
        unfinishedTaskData["assignedUsers"] = assignedUsers;
    }

    if (subTasks != []) {
        unfinishedTaskData["subTasks"] = subTasks;
    }

    if (selectedTaskPriority != null) {
        unfinishedTaskData["priority"] = selectedTaskPriority;
    }
}

function saveDirectInputFields() {
    for (let index = 0; index < directInputFieldIds.length; index++) {
        const directInputFiledId = directInputFieldIds[index];
        if (document.getElementById(directInputFiledId).value != "") {
            unfinishedTaskData[directInputFiledId] = document.getElementById(directInputFiledId).value;
        }
    }
}

function checkIfFormSubmittable() {

    if(checkIfPrioIsSet() && checkIfdirectInputFieldIdsAreSet()){
        setCreateTaskStatus("Enabled");
        return true;
    }else{
        setCreateTaskStatus("Disabled");
        return false;
    }
    
}

function checkIfPrioIsSet() {
    let isSubmittable=true;
    if (selectedTaskPriority != null) {
        unfinishedTaskData["priority"] = selectedTaskPriority;
    } else {
        console.log("prio not set");
        isSubmittable = false;
    }

    return isSubmittable;
}

function checkIfdirectInputFieldIdsAreSet() {
    let isSubmittable=true;
    for (let index = 0; index < directInputFieldIds.length; index++) {
        const simpleInputFieldId = directInputFieldIds[index];
        if (document.getElementById(simpleInputFieldId).value == "") {
            console.log(simpleInputFieldId);
            isSubmittable = false;
        }
    }

    return isSubmittable;
}






function setDropDownUsersTextFieldInputEventListener() {
    let inputField = document.getElementById("dropDownUsersTextFieldInput");
    inputField.addEventListener("input", function (event) {
        showAvailableUsers(inputField.value);
    });
}

function setDropDownEventListeners() {
    let eventSrcElementsId = ["dropDownUsersTextFieldInput", "assignUsersDropDownIcon", "taskCategoryName", "taskCategoryHeader"];
    let eventTargets = ["assignedUsersdropDownContent", "assignedUsersdropDownContent", "taskCategoryList", "taskCategoryList"];


    document.addEventListener("click", function (event) {
        index = eventSrcElementsId.indexOf(event.target.id);
        if (index != -1) {
            let element = document.getElementById(eventTargets[index]);

            if (eventTargets[index] == "taskCategoryList") {
                element.classList.toggle("show-block");
            } else {
                element.classList.toggle("show-flex");
            }
        } else {
            for (let i = 0; i < eventTargets.length; i++) {
                let eventTarget = eventTargets[i];
                let element = document.getElementById(eventTarget);
                element.classList.remove("show-flex");
                element.classList.remove("show-block");
            }
        }
    });
}

function setSubTaskEventListeners() {
    const inputField = document.getElementById('subtaskField');

    inputField.addEventListener('focus', function () {
        approveSubtaskMenu(); // Call your function here
    });

    inputField.addEventListener('blur', function () {
        if (document.getElementById("subtaskField").value == "") {
            defaultSubtaskMenu();
        }
    });
}

function preventUserListFromCollapsingOnclic() {
    let selectAssignedUserList = document.getElementById("selectAssignedUserList");
    selectAssignedUserList.addEventListener('click', function (event) {
        event.stopPropagation(); // Stop the event from propagating further up the DOM
    });
}

function setSelectedCategoryEventListener() {
    //Category Dropdown
    let dropdownItems = document.querySelectorAll(".task-category-item");
    const taskCategoryValueElement = document.getElementById("taskCategoryValue");
    dropdownItems.forEach(function (item) {
        item.addEventListener("click", function () {
            const selectedValue = item.getAttribute("data-value");
            document.getElementById('taskCategoryName').innerHTML = selectedValue;
            taskCategoryValueElement.value = selectedValue;
        });
    });
}

function approveSubtaskMenu() {
    document.getElementById("approveSubtaskMenu").classList.remove("hide");
    document.getElementById("enterSubtaskCreation").classList.add("hide");
}

function defaultSubtaskMenu() {
    document.getElementById("approveSubtaskMenu").classList.add("hide");
    document.getElementById("enterSubtaskCreation").classList.remove("hide");
}

function setCreateTaskStatus(status) {
    if (status == "Disabled") {
        document.getElementById("createTask").disabled = true;
    } else {
        document.getElementById("createTask").disabled = false;
    }
}

function renderTaskAddedElement() {
    document.getElementById("addTaskContainer").innerHTML +=/*html*/`<div class="task-created-notification-container">
        <div class="task-created-notification"><p>Task added to board</p><img src="./assets/icons/board-icon.svg"></div>
    </div>`;
}


function renderUserAssignmentDropDown() {
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

function showAvailableUsers(input) {
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
    document.getElementById("assignedUsersdropDownContent").classList.remove("hide");
    rotateIconBy180("assignUsersDropDownIcon");
}

function makeAvailableUsersInvisible() {
    showAssignedUsers = false;
    document.getElementById("assignedUsersdropDownContent").classList.add("hide");
    rotateIconBy180("assignUsersDropDownIcon");
}

function rotateIconBy180(elementName) {
    let element = document.getElementById(elementName);
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
function setPrioButtonSelected(currentButtonValue) {
    /**
     * @type {HTMLCollectionOf<HTMLButtonElement>}
     */
    let buttons = document.getElementById("newTaskPriority").getElementsByTagName("button");
    for (let i = 0; i < buttons.length; i++) {
        /**
         * @type {HTMLButtonElement}
         */
        const button = buttons[i];
        if (button.value === currentButtonValue) {
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
        selectedTaskPriority = type;
        unfinishedTaskData["priority"] = type;
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

function resetSubTaskInput() {
    setElementValue("subtaskField", "");
}

function deleteSubTask(element) {
    let id = element.id.replace("deleteSubTask", "");
    subTasks.splice(id, 1);
    setElementHtml("editSubTaskField", "");
    renderSubTasksList();
}

function approveSubTask(element) {
    let i = element.id.replace("approveSubTask", "");
    let editSubTaskInputfield = document.getElementById(`editSubtaskField${i}`);
    subTasks[i] = editSubTaskInputfield.value;
    editSubTaskInputfield.innerHtml = "";
    setElementHtml("editSubTaskField", "");
    renderSubTasksList();
}

function editSubTask(element) {
    let i = element.id.replace("editSubTask", "");
    let valueToEdit = subTasks[i];
    document.getElementById("editSubTaskField").innerHTML =/*html*/`
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
    } else {
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

async function submitTask() {
    console.log("here");
    tasks.push(unfinishedTaskData);
    renderTaskAddedElement();
    await setItem("tasks", tasks);
    setTimeout(function () {
        window.location.href = "board.html"; // Replace with your desired URL
    }, 2000);
}

function emptyAddTaskForm() {
    selectedTaskPriority = null //Priorities= urgent, medium, low

    showAssignedUsers = false;
    assignedUsers = [];
    renderSelectedUserIcons();
    renderUserAssignmentDropDown();

    subTasks = [];
    renderSubTasksList();
    resetSubTaskInput();

    setPrioButtonSelectStatusById("urgent", false);
    setPrioButtonSelectStatusById("medium", false);
    setPrioButtonSelectStatusById("low", false);

    setElementHtml("taskCategoryName", "Select Task Category");
    setElementHtml("taskCategoryValue", "");
}

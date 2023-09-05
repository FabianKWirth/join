let selectedTaskPriority = null //Priorities= urgent, medium, low
let showAssignedContacts = false;
let assignedContacts = [];
let subTasks = [];

let unfinishedTaskData = { "status": "toDo" };

let directInputFieldIds = ["newTaskTitle", "newTaskDescription", "newTaskDate", "selectCategory"];
let indirectInputFieldIds = ["assignedContactList", "taskCategoryList", "subtaskField", "editSubTaskField"];

async function includeTasksHtml() {
    let includeElements = document.querySelectorAll('[include-tasks-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("include-tasks-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
    initAddTasks();
}



async function initAddTasks() {
    await getStorageData();
    renderTaskInput();
}


function renderTaskInput() {
    loadEventListeners();
    renderContactAssignmentDropDown();
}

function loadEventListeners() {
    setSelectContactEventListeners();
    setSubTaskEventListeners();
    setDropDownContactsTextFieldInputEventListener();
    preventContactListFromCollapsingOnclick();
    addFormDataChangesEventListener();



    setSelectedCategoryEventListeners();
}

function addSaveEvent(eventType, element) {
    console.log("ElementTyp" + eventType + "   Element" + element)
    element.addEventListener(eventType, function (event) {
        saveCurrentEntriesToTask();
    });
}

function addFormDataChangesEventListener() {
    addListenersToDropDownSelections();
    addListenersToInputButtons();
    addListenersToDirectInputFields();
}

function addListenersToDropDownSelections() {
    let dropDownClasses = ["assign-contact-option"];
    dropDownClasses.forEach(className => {
        const categoryItems = document.querySelectorAll("." + className);

        // Loop through each category item and add an event listener
        categoryItems.forEach(item => addSaveEvent("click", item));
    });
}


/**
 * Adds event listeners to specified input buttons, invoking the 'addSaveEvent' function on click.
 * 
 * @function
 * @returns {void}
 */
function addListenersToInputButtons() {
    let inputButtons = ["urgentButton", "mediumButton", "lowButton", "approveEnteredTaskIcon"];
    inputButtons.forEach(inputButton => {
        addSaveEvent("click", document.getElementById(inputButton));
    });
}


/**
 * Adds event listeners to specified input buttons having the ids save in the global array directInputFieldIds, invoking the 'addSaveEvent' function on click.
 * 
 * @function
 * @returns {void}
 */
function addListenersToDirectInputFields() {
    directInputFieldIds.forEach(directInputFieldId => {
        addSaveEvent("change", document.getElementById(directInputFieldId));
    });
}

/** 
 * Calls functions to save the data entered by the contact into the unfinishedTaskData JSON array
 * Calls a function to check wether the Task can be created
 */
function saveCurrentEntriesToTask() {
    saveGlobalVariables();
    saveDirectInputFields();
    console.log(unfinishedTaskData);
}

/**
 * Saves validated selected global variables into the 'unfinishedTaskData' JSON array
 * 
 * @returns {void}
 * 
 */
function saveGlobalVariables() {
    if (assignedContacts.length > 0) {
        unfinishedTaskData["assignedContacts"] = assignedContacts;
    }

    if (subTasks.length > 0) {
        unfinishedTaskData["subTasks"] = subTasks;
    }

    if (selectedTaskPriority != null) {
        unfinishedTaskData["priority"] = selectedTaskPriority;
    }
}

/** 
 * saves validated inputs of all elements having the ids of directInputFieldIds into the 'unfinishedTaskData' JSON array
*/
function saveDirectInputFields() {
    if (document.getElementById("newTaskTitle").value != "") {
        unfinishedTaskData["taskName"] = document.getElementById("newTaskTitle").value;
    }

    if (document.getElementById("newTaskDescription").value != "") {
        unfinishedTaskData["taskDescription"] = document.getElementById("newTaskDescription").value;
    }

    if (document.getElementById("newTaskDate").value != "") {
        unfinishedTaskData["taskDate"] = document.getElementById("newTaskDate").value;
    }
}


function setDropDownContactsTextFieldInputEventListener() {
    let inputField = document.getElementById("dropDownContactsTextFieldInput");
    inputField.addEventListener("input", function (event) {
        showAvailableContacts(inputField.value);
    });
}


/**
 * 
 * 
 */
function setSelectContactEventListeners() {
    element = document.getElementById("dropDownContactsTextFieldInput");
    element.addEventListener("focus", function (event) {
        elementToShow = document.getElementById("assignedContactsDropDownContent");
        elementToShow.classList.toggle("show-flex");
    });

    /*
    element.addEventListener("click", function (event) {
        elementToShow=document.getElementById("assignedContactsDropDownContent");
        elementToShow.classList.remove("show-flex");
    });
    */
}

function setSelectedCategoryEventListeners() {
    const selectCategory = document.getElementById("selectCategory");
    const dropdownIcon = document.querySelector(".dropdown-icon");

    selectCategory.addEventListener("click", function () {
        dropdownIcon.classList.toggle("rotate-180");
    });

}

/**
 * Displays the 'approveSubtaskMenu' and hides the 'enterSubtaskCreation' menu.
 * 
 * @returns {void}
 */
function approveSubtaskMenu() {
    document.getElementById("approveSubtaskMenu").classList.remove("hide");
    document.getElementById("enterSubtaskCreation").classList.add("hide");
}

/**
 * Displays the 'enterSubtaskCreation' and hides the 'approveSubtaskMenu' menu.
 * 
 * @returns {void}
 */
function defaultSubtaskMenu() {
    document.getElementById("approveSubtaskMenu").classList.add("hide");
    document.getElementById("enterSubtaskCreation").classList.remove("hide");
}

function renderTaskAddedElement() {
    document.getElementById("addTaskContainer").innerHTML +=/*html*/`<div class="task-created-notification-container">
        <div class="task-created-notification"><p>Task added to board</p><img src="./assets/icons/board-icon.svg"></div>
    </div>`;
}


function renderContactAssignmentDropDown() {
    const contactList = document.getElementById('selectAssignedContactList');


    contactList.innerHTML = "";
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        console.log(contact);
        let contactName = contact['name'];
        let contactIcon = getContactIconHtml(contact);

        contactList.innerHTML +=/*html*/`
        <div onclick='selectTaskContact(this)' id='assignableContact${i}' class='assign-contact-option'>
            <div class='contact-information'>
                ${contactIcon}
                ${contactName}
            </div>
            <img src="./assets/icons/checkbox-empty.svg" id="selectedContactCheckBox${i}" class="selected-contact-checkbox">
        </div>`;
    }

    console.log("loaded");
}

function showAvailableContacts(input) {
    let additionalClass = 'first-contact-option';
    console.log(input);
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        if (contact['name'].startsWith(input)) {
            document.getElementById("assignableContact" + i).classList.remove('hide');
            if (additionalClass != "") {
                document.getElementById("assignableContact" + i).classList.add('first-contact-option');
                additionalClass = ""
            } else {
                document.getElementById("assignableContact" + i).classList.remove('first-contact-option');
            }
        } else {
            document.getElementById("assignableContact" + i).classList.add('hide');

        }
    }
    makeAvailableContactsVisible();
}

function renderSelectedContactIcons() {
    let html = "";
    for (let i = 0; i < assignedContacts.length; i++) {
        const id = assignedContacts[i];
        html += getContactIconHtml(contacts[id]);
    }
    document.getElementById("assignedContactList").innerHTML = html;
}

function selectTaskContact(row) {
    let contactId = row.getAttribute("id").replace("assignableContact", "");
    assignedContacts.push(contactId);
    row.onclick = () => unselectTaskContact(row);
    row.classList.add("selected-option");
    document.getElementById("selectedContactCheckBox" + contactId).src = './assets/icons/checkbox-filled.svg';
    document.getElementById("selectedContactCheckBox" + contactId).classList.add("white-symbol");
    renderSelectedContactIcons();
    unfinishedTaskData["assignedContacts"] = assignedContacts;
}

function unselectTaskContact(row) {
    let contactId = row.getAttribute("id").replace("assignableContact", "");

    const indexToRemove = assignedContacts.indexOf(contactId);
    if (indexToRemove !== -1) {
        assignedContacts.splice(indexToRemove, 1);
    }

    row.onclick = () => selectTaskContact(row);

    renderUnselectionOfContactFromTask(row, contactId);

    renderSelectedContactIcons();
    unfinishedTaskData["assignedContacts"] = assignedContacts;
}

function renderUnselectionOfContactFromTask(row, contactId) {
    row.classList.remove("selected-option");
    document.getElementById("selectedContactCheckBox" + contactId).src = './assets/icons/checkbox-empty.svg';
    document.getElementById("selectedContactCheckBox" + contactId).classList.remove("white-symbol");
}

function changeAvailableContactsVisibility() {
    if (showAssignedContacts == false) {
        makeAvailableContactsVisible();
    } else {
        makeAvailableContactsInvisible();
    }
}

function makeAvailableContactsVisible() {
    showAssignedContacts = true;
    document.getElementById("assignedContactsDropDownContent").classList.remove("hide");
    rotateIconBy180("assignContactsDropDownIcon");
}

function makeAvailableContactsInvisible() {
    showAssignedContacts = false;
    document.getElementById("assignedContactsDropDownContent").classList.add("hide");
    rotateIconBy180("assignContactsDropDownIcon");
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

function setTaskPrio(currentButtonValue) {
    selectedTaskPriority = currentButtonValue;
    unfinishedTaskData["priority"] = currentButtonValue;
}















/* subtask related functions */


function createSubTask() {
    subTaskName = document.getElementById("subtaskField").value;
    subtask =
    {
        "name": subTaskName,
        "isComplete": 0
    }
    if (subTaskName != "") {
        subTasks.push(subtask);
    }
    renderSubTasksList();
}

function resetSubTaskInput() {
    setElementValue("subtaskField", "");
}

/**
 * Resets the priority button menu by unchecking all radio buttons.
 */
function resetPriorityMenu() {
    /** @type {NodeListOf<HTMLInputElement>} */
    const radioButtons = document.querySelectorAll('input[name="priority"]');

    // Iterate through the radio buttons and uncheck them
    radioButtons.forEach(button => {
        button.checked = false;
    });
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
    subTasks[i]['name'] = editSubTaskInputfield.value;
    editSubTaskInputfield.innerHtml = "";
    setElementHtml("editSubTaskField", "");
    renderSubTasksList();
}

function editSubTask(element) {
    let i = element.id.replace("editSubTask", "");
    let valueToEdit = subTasks[i]['name'];
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
            const subtask = subTasks[i];
            html += /*html*/ `
            <li class='shown-subtask' id='shownSubtask${i}'>
                ${subtask['name']}
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

function setSubTaskEventListeners() {
    const inputField = document.getElementById('subtaskField');

    inputField.addEventListener('focus', function () {
        approveSubtaskMenu();
    });

    inputField.addEventListener('blur', function () {
        if (document.getElementById("subtaskField").value == "") {
            defaultSubtaskMenu();
        }
    });
}













function preventContactListFromCollapsingOnclick() {
    let selectAssignedContactList = document.getElementById("selectAssignedContactList");
    selectAssignedContactList.addEventListener('click', function (event) {
        event.stopPropagation();
    });
}




function setElementHtml(elementId, html) {
    document.getElementById(elementId).innerHTML = html;
}

function setElementValue(elementId, html) {
    document.getElementById(elementId).value = html;
}

function rotateIconBy180(elementName) {
    let element = document.getElementById(elementName);
    if (element.classList.contains("rotate-180")) {
        element.classList.remove('rotate-180');
    } else {
        element.classList.add('rotate-180');
    }
}

async function submitTask() {
    console.log("here");
    saveCurrentEntriesToTask()
    if (checkIfFormSubmittable()) {

        tasks.push(unfinishedTaskData);
        renderTaskAddedElement();
        await setItem("tasks", tasks);
        setTimeout(function () {
            window.location.href = "board.html"; // Replace with your desired URL
        }, 2000);
    }
}






























//reset

function emptyAddTaskForm() {
    resertDirectInputFields();

    renderSelectedContactIcons();
    renderContactAssignmentDropDown();

    resetPriorityMenu();

    resetIndirectInputs();
}


function resertDirectInputFields() {
    directInputFieldIds.forEach(directInputFieldId => {
        let field = document.getElementById(directInputFieldId);
        if (field) {
            field.value = "";
        }
    });
}

function resetIndirectInputs() {
    selectedTaskPriority = null //Priorities= urgent, medium, low
    subTasks = [];
    renderSubTasksList();
    resetSubTaskInput();

    showAssignedContacts = false;
    assignedContacts = [];
}





///////////////LOAD TASK
function loadTask(taskId) {
    let task = tasks[taskId];

    if (task) {
        console.log(task);
    }

    unfinishedTaskData = task;
    setNewTaskTitleFieldValue(task);
    setNewTaskDescriptionFieldValue(task);
    setNewTaskDateFieldValue(task);

    setAssignedContacts(task);
    setPriorityValue(task);
    setCategoryValue(task);
    setSubTaskFieldValue(task);

    replaceCurrentAddTaskSubmit(taskId);

}

function setNewTaskTitleFieldValue(task) {
    document.getElementById("newTaskTitle").value = task['taskName'];
}

function setNewTaskDescriptionFieldValue(task) {
    document.getElementById("newTaskDescription").value = task['taskDescription'];
}

function setAssignedContacts(task) {
    console.log(task);

    console.log(task["assignedContacts"]);
    if (task["assignedContacts"]) {
        assignedContacts = task["assignedContacts"];
    } else {
        assignedContacts = [];
    }
    console.log(assignedContacts);
    renderSelectedContactIcons();
}

function setNewTaskDateFieldValue(task) {
    console.log("TaskDat" + task);
    document.getElementById("newTaskDate").value = task['taskDate'];
}

/*
function resetPriorityMenu() {

    const radioButtons = document.querySelectorAll('input[name="priority"]');


    radioButtons.forEach(button => {
        button.checked = false;
    });
}
*/
function setPriorityValue(task) {
    let radioButtons=document.getElementsByName("priority");

    radioButtons.forEach(button => {
        if(button.value===task['priority']){
            button.checked = true;
        } 
    });
}


function setCategoryValue(task) {
    document.getElementById("selectCategory").value=task["taskCategoryValue"];
}

function setSubTaskFieldValue(task) {
    subTasks = task['subTasks'];
    console.log(subTasks);
    if (subTasks) {
        renderSubTasksList();
    }
}

function replaceCurrentAddTaskSubmit(taskId) {
    removeAllButtons('formOptions');
    addSaveChangesButton('formOptions', taskId);
}

function removeAllButtons(parentId) {
    // Get the div element with the specified id
    var formOptionsDiv = document.getElementById(parentId);

    // Get all buttons within the div
    var buttons = formOptionsDiv.getElementsByTagName("button");

    // Loop through the buttons and remove them
    for (var i = buttons.length - 1; i >= 0; i--) {
        var button = buttons[i];
        button.parentNode.removeChild(button);
    }
}

function addSaveChangesButton(parentNode, taskId) {
    console.log("here1");
    let saveButton = document.getElementById(parentNode).appendChild(document.createElement("button"));
    saveButton.onclick = function () {
        saveTaskChanges(taskId);
    };
    saveButton.innerHTML = "Ok<img src='./assets/icons/checkmark-icon.svg' class='white-symbol'>";
    saveButton.classList.add('default-button');
}

async function saveTaskChanges(taskId) {
    console.log("here");
    saveCurrentEntriesToTask();
    if (checkIfFormSubmittable()) {

        tasks[taskId] = unfinishedTaskData;
        renderTaskAddedElement();
        await setItem("tasks", tasks);
        setTimeout(function () {
            window.location.href = "board.html"; // Replace with your desired URL
        }, 2000);
    }

}



















///////VALIDATION

/**
 * Validates the new task title input.
 */

/** 
 * Calls functions to see whether all required input field are set 
 * 
 * @returns {boolean} true if form is submittable; false if not;
 * 
 * */
function checkIfFormSubmittable() {

    if (
        validateTaskTitle()
        & validateTaskDescription()
        & validateTaskDate()
        & validateTaskCategory()
        & validateTaskPriority()
    ) {
        return true;
    } else {
        return false;
    }
}


/**
 * Validates the new task title input. Adds tooltip to input field if invalid.
 * @returns {number} true if valid, false if invalid
 */
function validateTaskTitle() {
    /** @type {HTMLInputElement} */
    const taskTitleInput = document.getElementById("newTaskTitle");
    /** @type {string} */
    const taskTitleValue = taskTitleInput.value.trim();

    if (taskTitleValue === "") {
        taskTitleInput.reportValidity();
        return false;
    } else {
        return true;
    }
}

/**
 * Validates the new task description input. Adds tooltip to input field if invalid.
 * @returns {number} true if valid, false if invalid
 */
function validateTaskDescription() {
    /** @type {HTMLInputElement} */
    const taskDescriptionInput = document.getElementById("newTaskDescription");
    /** @type {string} */
    const taskDescriptionValue = taskDescriptionInput.value.trim();

    if (taskDescriptionValue === "") {
        taskDescriptionInput.classList.add('inputCheck');
        taskDescriptionInput.reportValidity();
        return false;
    } else {
        return true;
    }
}

/**
 * Validates the new task date input. Adds tooltip to input field if invalid.
 * @returns {boolean} true if valid, false if invalid
 */
function validateTaskDate() {
    /** @type {HTMLInputElement} */
    const taskDateInput = document.getElementById("newTaskDate");

    /** @type {string} */
    const taskDateValue = taskDateInput.value;

    if (taskDateValue == "" || taskDateValue === "yyyy-mm-dd") {
        taskDateInput.reportValidity();
        taskDateInput.classList.add('input-check');
        return false;
    } else {
        return true;
    }
}



function validateTaskPriority() {
    if(selectedTaskPriority!=null){
        return true;
    }else{
        return false;
    }
}

/**
 * Checks if input field "selectCategory" is set; Adds tooltip to input field if invalid.
 * @returns {boolean} true if is set, false if is not set
 */
function validateTaskCategory() {
    /** @type {HTMLSelectElement} */
    const taskCategoryElement = document.getElementById("selectCategory");
    /** @type {string} */
    const selectCategoryValue = taskCategoryElement.value;
    if (selectCategoryValue == "") {
        taskCategoryElement.reportValidity();
        return false;
    } else {
        return true;
    }
}
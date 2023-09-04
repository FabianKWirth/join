let selectedTaskPriority = null //Priorities= urgent, medium, low
let showAssignedContacts = false;
let assignedContacts = [];
let subTasks = [];

let unfinishedTaskData = { "status": "toDo" };

let directInputFieldIds = ["newTaskTitle", "newTaskDescription", "newTaskDate", "taskCategoryValue"];
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
    setDropDownEventListeners();
    setSubTaskEventListeners();
    setSelectedCategoryEventListener();
    setDropDownContactsTextFieldInputEventListener();
    preventContactListFromCollapsingOnclick();
    addFormDataChangesEventListener();
    loadValidationEventListener();
}

function addSaveEvent(eventType, element) {
    element.addEventListener(eventType, function (event) {
        saveCurrentEntriesToTask();
    });
}

function addFormDataChangesEventListener() {
    addListenersToDropDownSelections();
    addListenersToInputButtons();
    addListenersToDirectInputFields();
    addListenersToIndirectInputFields();
}

function addListenersToDropDownSelections() {
    let dropDownClasses = ["task-category-item", "assign-contact-option"];
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
 * Adds event listeners to specified input buttons having the ids save in the global array indirectInputFieldIds, invoking the 'addSaveEvent' function on click.
 * 
 * @function
 * @returns {void}
 */
function addListenersToIndirectInputFields() {

    indirectInputFieldIds.forEach(indirectInputFieldId => {
        addSaveEvent("change", document.getElementById(indirectInputFieldId));
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
    for (let index = 0; index < directInputFieldIds.length; index++) {
        const directInputFiledId = directInputFieldIds[index];
        if (document.getElementById(directInputFiledId).value != "") {
            unfinishedTaskData[directInputFiledId] = document.getElementById(directInputFiledId).value;
        }
    }
}





function setDropDownContactsTextFieldInputEventListener() {
    let inputField = document.getElementById("dropDownContactsTextFieldInput");
    inputField.addEventListener("input", function (event) {
        showAvailableContacts(inputField.value);
    });
}

function setDropDownEventListeners() {
    let eventSrcElementsId = ["dropDownContactsTextFieldInput", "assignContactsDropDownIcon", "taskCategoryName", "taskCategoryHeader", "taskCategoryDropDownIcon"];
    let eventTargets = ["assignedContactsdropDownContent", "assignedContactsdropDownContent", "taskCategoryList", "taskCategoryList", "taskCategoryList"];


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


function setSelectedCategoryEventListener() {
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


/**
 * Enables disabels the "Create Task" button depending on the give status
 * 
 * @returns {void}
 */

function setCreateTaskStatus(status) {
    if (status == "Disabled") {
        document.getElementById("createTask").disabled = true;
    } else {
        document.getElementById("createTask").disabled = false;
    }
    document.getElementById("createTask").disabled = false;
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
    document.getElementById("assignedContactsdropDownContent").classList.remove("hide");
    rotateIconBy180("assignContactsDropDownIcon");
}

function makeAvailableContactsInvisible() {
    showAssignedContacts = false;
    document.getElementById("assignedContactsdropDownContent").classList.add("hide");
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


function setPrioButtonSelected(currentButtonValue) {

    let buttons = document.getElementById("newTaskPriority").getElementsByTagName("button");
    for (let i = 0; i < buttons.length; i++) {
        const button = buttons[i];
        if (button.value === currentButtonValue) {
            setPrioButtonSelectStatusById(button.value, true);
            document.getElementById("priorityStatus").value = button.value;
        } else {
            setPrioButtonSelectStatusById(button.value, false);
        }
    }
}


/**
* Adds special visual apperance to button of current selected type
*/
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
    console.log("Trying to Commit Task");
    if (checkIfFormSubmittable()) {
        tasks.push(unfinishedTaskData);
        renderTaskAddedElement();
        await setItem("tasks", tasks);
        setTimeout(function () {
            window.location.href = "board.html"; // Replace with your desired URL
        }, 2000);
    }
}

function emptyAddTaskForm() {

    resertDirectInputFields();
    resetIndirectInputs();

    renderSelectedContactIcons();
    renderContactAssignmentDropDown();
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

    setPrioButtonSelectStatusById("urgent", false);
    setPrioButtonSelectStatusById("medium", false);
    setPrioButtonSelectStatusById("low", false);

    setElementHtml("taskCategoryName", "Select Task Category");
    setElementHtml("taskCategoryValue", "");
}


























///////VALIDATION

/**
 * Validates the new task title input.
 */

/** 
 * Calls functions to see whether all required input field are set 
 * Calls function setCreateTaskStatus enable/disable the "Create Task" button;
 * 
 * @returns {boolean} true if form is submittable; false if not;
 * 
 * */
function checkIfFormSubmittable() {
    console.log("VildateInputs");
    if (
        validateTaskTitle()
        & validateTaskDescription()
        & validateTaskDate()
        & validateTaskCategory()
        & validateTaskPriority()
    ) {
        setCreateTaskStatus("Enabled");
        return true;
    } else {
        setCreateTaskStatus("Disabled");
        return false;
    }
}

function checkIfPrioIsSet() {
    let isSubmittable = true;
    if (selectedTaskPriority != null) {
        unfinishedTaskData["priority"] = selectedTaskPriority;
    } else {
        isSubmittable = false;
    }

    return isSubmittable;
}


// Attach these validation functions to the input fields' input or change events
function loadValidationEventListener() {
    document.getElementById("newTaskTitle").addEventListener("input", validateTaskTitle);
    document.getElementById("newTaskDescription").addEventListener("input", validateTaskDescription);
    document.getElementById("newTaskDate").addEventListener("focusout", validateTaskDate);
    document.getElementById("taskCategoryValue").addEventListener("change", validateTaskCategory);
    document.getElementById("taskPriority").addEventListener("change", validateTaskPriority);
}


/**
 * Validates the new task title input.
 * @returns {number} 1 if valid, 0 if invalid
 */
function validateTaskTitle() {
    /** @type {HTMLInputElement} */
    const taskTitleInput = document.getElementById("newTaskTitle");
    /** @type {string} */
    const taskTitleValue = taskTitleInput.value.trim();

    if (taskTitleValue === "") {
        taskTitleInput.reportValidity("Please enter a task title.");
    } else {
        taskTitleInput.reportValidity("");
    }
}

/**
 * Validates the new task description input.
 * @returns {number} 1 if valid, 0 if invalid
 */
function validateTaskDescription() {
    /** @type {HTMLInputElement} */
    const taskDescriptionInput = document.getElementById("newTaskDescription");
    /** @type {string} */
    const taskDescriptionValue = taskDescriptionInput.value.trim();

    if (taskDescriptionValue === "") {
        taskDescriptionInput.reportValidity("Please enter a task description.");
        return 0;
    } else {
        taskDescriptionInput.reportValidity("");
        return 1;
    }
}




/**
 * Validates the new task date input.
 * @returns {number} 1 if valid, 0 if invalid
 */
function validateTaskDate() {
    /** @type {HTMLInputElement} */
    const taskDateInput = document.getElementById("newTaskDate");
    /** @type {string} */
    const taskDateValue = taskDateInput.value;

    if (taskDateValue == "" || taskDateValue === "yyyy-mm-dd") {
        taskDateInput.reportValidity("Please select a task date.");
        console.log("taskDateInvalide");
        return 0;
    } else {
        taskDateInput.reportValidity("");
        console.log(taskDateValue);
        console.log("taskDateValide");
        return 1;
    }
}


function validateTaskPriority() {
    /** @type {HTMLSelectElement} */
    const taskCategoryInput = document.getElementById("taskPriority");
    /** @type {string} */
    const taskCategoryValue = taskCategoryInput.value;

    if(selectedTaskPriority == null){
        document.getElementById("taskPriority").reportValidity("Category is not selected");
    }
}

function validateTaskCategory() {
    /** @type {HTMLSelectElement} */
    const taskCategoryInput = document.getElementById("taskCategoryValue");
    /** @type {string} */
    const taskCategoryValue = taskCategoryInput.value;
    if (taskCategoryValue == "") {
        document.getElementById("taskCategoryHeader").reportValidity("Category is not selected");
    }
}
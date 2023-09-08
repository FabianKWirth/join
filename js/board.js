let currentDraggedElement;

/**
* Updates the HTML representation of the entire task board by updating individual categories.
*
* @function
* @returns {void}
*/
async function updateBoardHTML() {
    await init();
    loadTasksHTML();
    console.log('es ist jetzt übergeben', tasks[0]['status'])

    // updateInProgressHTML();
    // updateAwaitFeedbackHTML();
    // updateDoneHTML();
}


/**
 * Updates the HTML view of tasks in the 'Todo' category.
 * This function filters tasks in the 'Todo' category, generates HTML elements
 * for each task, and updates the presentation in the DOM accordingly.
 *
 * @function
 * @returns {void}
 */

function loadTasksHTML() {
    document.getElementById('todo').innerHTML = '';
    document.getElementById('inProgress').innerHTML = '';
    document.getElementById('awaitFeedback').innerHTML = '';
    document.getElementById('done').innerHTML = '';
    for (let index = 0; index < tasks.length; index++) {
        const task = tasks[index];
        // console.log(task['priority']);
        // console.log(task['subTasks'][1]['name']);

        if (task['status'] == 'toDo') {
            document.getElementById('todo').innerHTML += generateHTML(task, index);
        } else if (task['status'] == 'inProgress') {
            document.getElementById('inProgress').innerHTML += generateHTML(task, index);
        } else if (task['status'] == 'awaitFeedback') {
            document.getElementById('awaitFeedback').innerHTML += generateHTML(task, index);
        } else if (task['status'] == 'done') {
            document.getElementById('done').innerHTML += generateHTML(task, index);
        } else {
            document.getElementById('todo').innerHTML = renderNoTaskToDo(task);
        }
    }
    // console.log('es ist', tasks[0]['status'])
}
// 



/**
 * Renders HTML to display a message when there are no tasks to do.
 *
 * @function
 * @returns {string} The HTML code for displaying the message.
 */
function renderNoTaskToDo() {
    return `<div class="noToDo">No tasks To Do</div>`;
}


/**
 * Renders HTML to display a message when there are no tasks in progress.
 *
 * @function
 * @returns {string} The HTML code for displaying the message.
 */
function renderNoInProgress() {
    return `<div class="noToDo">No tasks In progress</div>`;
}


/**
 * Renders HTML to display a message when there are no tasks awaiting feedback.
 *
 * @function
 * @returns {string} The HTML code for displaying the message.
 */
function renderNoAwaitFeedback() {
    return `<div class="noToDo">No tasks Await feedback</div>`;
}


/**
 * Renders HTML to display a message when there are no tasks marked as done.
 *
 * @function
 * @returns {string} The HTML code for displaying the message.
 */
function renderNoDone() {
    return `<div class="noToDo">No tasks Done</div>`;
}


/**
 * Generates HTML code for displaying a task card based on the provided task element.
 *
 * @function
 * @param {Object} element - The task element containing information about the task.
 * @returns {string} The HTML code for the task card.
 */
function generateHTML(task, index) {
    let assignedContactsIcons = getAssignedContactIcons(task['assignedContacts']);
    priority = task['priority'];
    // console.log(priority)
    let subtaskCount = task['subTasks'] ? task['subTasks'].length : 0;
    let completedSubtaskCount = task['subTasks'] ? task['subTasks'].filter(subtask => subtask.completed).length : 0;
    let progressBarHTML = '';
    let priorityImageSrc = getPriorityImageSrc(priority);
    // console.log(priorityImageSrc)


    let categoryClass = '';
    if (task['taskCategoryValue'] === 'Technical Task') {
        categoryClass = 'category-technical';
    } else if (task['taskCategoryValue'] === 'Contact Story') {
        categoryClass = 'category-contact-story';
    }

    if (subtaskCount > 0) {
        let progressPercentage = (completedSubtaskCount / subtaskCount) * 100;
        progressBarHTML = `
            <div class="progress-bar-section">
                <div class="progress-bar">
                    <div class="progress" style="width: ${progressPercentage}%;"></div>
                </div>
                <div class="progress-bar-subtasks">${completedSubtaskCount}/${subtaskCount} Subtasks</div>
            </div>`;
    }

    return `
        <div onclick="showTaskCard(${index})" draggable="true" ondrop="moveTo(event)" ondragstart="startDragging(${index})" class="task-card" data-category="${task['status']}">
            <div class="card-category ${categoryClass}">${task['taskCategoryValue']}</div> 
            <div>
                <h4>${task['taskName']}</h4>
                <div class="card-description">${task['taskDescription']}</div>
            </div>
            ${progressBarHTML}
            <div class="task-card-bottom-section">
                <div class="task-card-users">
                    ${assignedContactsIcons}
                </div>
                <img src="${priorityImageSrc}" alt="Prio">
            </div>
        </div>`;
}




function getAssignedContactIcons(assignedContacts) {

    let contactIconHtml = "";
    let firstItem = true;

    if (assignedContacts != null) {
        assignedContacts.forEach(assignedContact => {

            let contactIcon = getContactIconHtml(contacts[assignedContact]);


            if (firstItem == true) {

                contactIcon = contactIcon.replace(/class="circle"/g, 'class="circle circle-1"');

                firstItem = false;
            } else {
                contactIcon = contactIcon.replace(/class="circle"/g, 'class="circle circle-2"');
            }
            contactIconHtml += contactIcon;

        });

    }
    return contactIconHtml;
}


/**
 * Adds a CSS class to highlight a DOM element with the specified ID.
 *
 * @function
 * @param {string} id - The ID of the DOM element to highlight.
 * @returns {void}
 */
function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}


/**
 * Removes a CSS class to remove the highlight from a DOM element with the specified ID.
 *
 * @function
 * @param {string} id - The ID of the DOM element to remove the highlight from.
 * @returns {void}
 */
function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}


/**
 * Sets the currently dragged element to the specified ID.
 *
 * @function
 * @param {string} id - The ID of the element being dragged.
 * @returns {void}
 */
function startDragging(id) {
    currentDraggedElement = id;
}


/**
 * Prevents the default behavior of a drop event to allow dropping content.
 *
 * @function
 * @param {Event} ev - The drop event object.
 * @returns {void}
 */
function allowDrop(ev) {
    ev.preventDefault();
}


/**
 * Moves a task to a different category based on the specified event and category data.
 *
 * @function
 * @param {Event} ev - The event object triggering the move.
 * @returns {void}
 */
function moveTo(ev) {
    ev.preventDefault();
    console.log(ev);

    currentNode = ev.target;
    let category = currentNode.getAttribute('data-category');
    if (category == null) {
        currentNode = currentNode.parentNode;
        category = currentNode.getAttribute('data-category');
        if (category == null) {
            currentNode = currentNode.parentNode;
            category = currentNode.getAttribute('data-category');
            if (category == null) {
                currentNode = currentNode.parentNode;
                category = currentNode.getAttribute('data-category');
            }
        }
    }
    console.log('die kategorie ist', category)

    if (category && currentDraggedElement !== undefined) {
        tasks[currentDraggedElement]['status'] = category;
        setItem('tasks', tasks);
        loadTasksHTML();
    }
}


document.getElementById('search-input').addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
        filterToDo(); filterInProgress(); filterAwaitFeedback(); filterDone();
    }
});

document.getElementById('search').addEventListener('click', function () {
    filterToDo(); filterInProgress(); filterAwaitFeedback(); filterDone();
});


/**
 * Filters and updates the 'Todo' category based on a search query.
 *
 * @function
 * @returns {void}
 */
function filterToDo() {
    let searchInput = document.getElementById('search-input').value;
    searchInput = searchInput.toLowerCase();
    let list = document.getElementById('todo');
    list.innerHTML = '';

    let todo = tasks.filter(t => t['status'] == 'toDo');
    renderSearchListToDo(todo, list, searchInput);
}


/**
 * Renders a filtered list of 'Todo' category tasks based on a search query.
 *
 * @function
 * @param {Array} todo - An array of tasks in the 'Todo' category.
 * @param {HTMLElement} list - The HTML list element where the filtered tasks will be displayed.
 * @param {string} searchInput - The search query to filter tasks.
 * @returns {void}
 */
function renderSearchListToDo(todo, list, searchInput) {
    searchElementsFound = false;

    if (todo.length > 0) {
        for (let i = 0; i < todo.length; i++) {
            let element = todo[i];
            if (element['taskName'].toLowerCase().includes(searchInput)) {
                list.innerHTML += generateHTML(element);
                searchElementsFound = true;
            }
        }
    }
    if (!searchElementsFound) {
        list.innerHTML = renderNoTaskToDo();
    }
}


/**
 * Filters and updates the 'In Progress' category based on a search query.
 *
 * @function
 * @returns {void}
 */
function filterInProgress() {
    let searchInput = document.getElementById('search-input').value;
    searchInput = searchInput.toLowerCase();
    let list = document.getElementById('inProgress');
    list.innerHTML = '';

    let progress = tasks.filter(t => t['status'] == 'inProgress')

    renderSearchListInProgress(progress, list, searchInput)
}

/**
 * Renders a filtered list of 'In Progress' category tasks based on a search query.
 *
 * @function
 * @param {Array} progress - An array of tasks in the 'In Progress' category.
 * @param {HTMLElement} list - The HTML list element where the filtered tasks will be displayed.
 * @param {string} searchInput - The search query to filter tasks.
 * @returns {void}
 */
function renderSearchListInProgress(progress, list, searchInput) {
    searchElementsFound = false;

    if (progress.length > 0) {
        for (let i = 0; i < progress.length; i++) {
            let element = progress[i];
            if (element['taskName'].toLowerCase().includes(searchInput)) {
                list.innerHTML += generateHTML(element);
                searchElementsFound = true;
            }
        }
    }
    if (!searchElementsFound) {
        list.innerHTML = renderNoInProgress();
    }
}


/**
 * Filters and updates the 'Await Feedback' category based on a search query.
 *
 * @function
 * @returns {void}
 */
function filterAwaitFeedback() {
    let searchInput = document.getElementById('search-input').value;
    searchInput = searchInput.toLowerCase();
    let list = document.getElementById('awaitFeedback');
    list.innerHTML = '';

    let feedback = tasks.filter(t => t['status'] == 'awaitFeedback');
    renderSearchListAwaitFeedback(feedback, list, searchInput);
}


/**
 * Renders a filtered list of 'Await Feedback' category tasks based on a search query.
 *
 * @function
 * @param {Array} feedback - An array of tasks in the 'Await Feedback' category.
 * @param {HTMLElement} list - The HTML list element where the filtered tasks will be displayed.
 * @param {string} searchInput - The search query to filter tasks.
 * @returns {void}
 */
function renderSearchListAwaitFeedback(feedback, list, searchInput) {
    searchElementsFound = false;

    if (feedback.length > 0) {
        for (let i = 0; i < feedback.length; i++) {
            let element = feedback[i];
            if (element['taskName'].toLowerCase().includes(searchInput)) {
                list.innerHTML += generateHTML(element);
                searchElementsFound = true;
            }
        }
    }
    if (!searchElementsFound) {
        list.innerHTML = renderNoAwaitFeedback();
    }
}


/**
 * Filters and updates the 'Done' category based on a search query.
 *
 * @function
 * @returns {void}
 */
function filterDone() {
    let searchInput = document.getElementById('search-input').value;
    searchInput = searchInput.toLowerCase();
    let list = document.getElementById('done');
    list.innerHTML = '';

    let done = tasks.filter(t => t['status'] == 'done');
    renderSearchListDone(done, list, searchInput);
}


/**
 * Renders a filtered list of 'Done' category tasks based on a search query.
 *
 * @function
 * @param {Array} done - An array of tasks in the 'Done' category.
 * @param {HTMLElement} list - The HTML list element where the filtered tasks will be displayed.
 * @param {string} searchInput - The search query to filter tasks.
 * @returns {void}
 */
function renderSearchListDone(done, list, searchInput) {
    searchElementsFound = false;

    if (done.length > 0) {
        for (let i = 0; i < done.length; i++) {
            let element = done[i];
            if (element['taskName'].toLowerCase().includes(searchInput)) {
                list.innerHTML += generateHTML(element);
                searchElementsFound = true;
            }
        }
    }
    if (!searchElementsFound) {
        list.innerHTML = renderNoDone();
    }
}


function showTaskCard(index) {
    let task = tasks[index];
    const category = task['taskCategoryValue'];
    const name = task['taskName'];
    const description = task['taskDescription'];
    const date = task['taskDate'];
    const priority = task['priority'];
    let assignedContactsHTML = getAssignedContacts(task['assignedContacts']);
    console.log(assignedContactsHTML);
    const initials = [assignedInicials(0), assignedInicials(1), assignedInicials(2)];
    const assignedNames = [assignedTo(0), assignedTo(1), assignedTo(2)];
    let subtasksHTML = getSubtasks(task['subTasks'], task);
    const subtask1 = task['subTasks'] && task['subTasks'][0] ? task['subTasks'][0]['name'] : '';
    const subtask2 = task['subTasks'] && task['subTasks'][1] ? task['subTasks'][1]['name'] : '';
    let assignedName = '';

    let showTaskCard = document.getElementById('showTaskCard');
    console.log('prioritiy ist', priority)
    let priorityImageSrc = getPriorityImageSrc(priority);

    showTaskCard.innerHTML = `
        <div id="overlayBoard" class="overlayBoard">
            <div class="task-card-overlay">
                <div class="card-category-top-section">
                    <div class="card-category-overlay">${category}</div> 
                    <img onclick="closeBoardOverlay()" src="assets/icons/close.svg">
                </div>
                <div>
                    <h4 class="title-h4">${name}</h4>
                </div>
                <div class="card-description-overlay">${description}</div>
                <div  class="card-description-overlay">
                    <div class="dark-gray">Due date:</div>
                    <div>${date}</div>
                </div>
                <div class="priority-container card-description-overlay">
                    <div class="dark-gray">Priority:</div>
                    <div class="priority">
                        <div>${priority}</div>
                        <img src="${priorityImageSrc}">
                    </div>
                </div>
                <div class="assigned">
                    <div>
                        <div class="dark-gray">Assigned To:</div>
                    </div>
                    <div>
                    ${assignedContactsHTML}
                    </div>
                </div>
                <div id="subtask-area" class="subtasks">
                    <div>
                        <div class="dark-gray">Subtask</div>
                    </div>
                    <div class="subtasks-container">
                        <div class="subtasks-container">
                            ${subtasksHTML}
                        </div>
                    </div>
                </div>
                <div class="edit-container">
                    <div class="edit" onmouseover="changeImage('assets/icons/delete-blue.svg', 'trashImage')" onmouseout="changeImage('assets/icons/trashcan-icon.svg', 'trashImage')">
                        <img id="trashImage" src="assets/icons/trashcan-icon.svg">
                        <div>Delete</div>
                    </div>
                    <img src="assets/image/board/edit-line.svg">
                    <div class="edit" onmouseover="changeImage('assets/icons/edit-blue.svg', 'editImage')" onmouseout="changeImage('assets/icons/pen-icon.svg', 'editImage')">
                        <img id="editImage" src="assets/icons/pen-icon.svg"> 
                        <div onclick="openEditTaskTemplate(1)">Edit</div>
                    </div>
                </div>
            </div>
        </div>
    `;
    includeEventlistenerToCloseOverlayBoard();
}

function getAssignedContacts(assignedContacts) {
    let assignedContactsHTML = '';

    if (assignedContacts) {
        for (let i = 0; i < assignedContacts.length; i++) {
            const assignedContact = assignedContacts[i];

            assignedContactsHTML += /*html*/` <div class='assigned-contacts'>
                <div class='contact-circle'>${getContactIconHtml(contacts[assignedContact])}</div>
                ${contacts[assignedContact]['name']}
                </div>`;
        }
    }
    return assignedContactsHTML;
}

function getPriorityImageSrc(priority) {
    switch (priority.toLowerCase()) {
        case 'low':
            return 'assets/icons/prio-low.svg';
        case 'medium':
            return 'assets/icons/prio-medium.svg';
        case 'urgent':
            return 'assets/icons/prio-urgent.svg';
        default:
            return '';
    }
}

function subtaskChangeImg(id) {
    let subtaskField = document.getElementById(id);
    let subtaskFieldSrc = subtaskField.src;

    if (subtaskFieldSrc.indexOf('assets/image/board/Check-button.svg') !== -1) {
        subtaskField.src = 'assets/image/board/Check-button-empty.svg';
    } else {
        subtaskField.src = 'assets/image/board/Check-button.svg';
    }  
}

function closeBoardOverlay() {
    document.getElementById('overlayBoard').style.display = 'none';
}


function changeImage(newSrc, imageId) {
    const image = document.getElementById(imageId);
    image.src = newSrc;
}

function assignedTo(index) {
    let indexInContacts = tasks[0]['assignedContacts'][index];

    if (contacts[indexInContacts] && contacts[indexInContacts]['name']) {
        let contactName = contacts[indexInContacts]['name'];
        return contactName;
    } else {
        return '';
    }
}


function assignedInicials(index) {
    let initials = tasks[0]['assignedContacts'][index];

    // Überprüfen, ob initials gültig ist und ob der Kontakt existiert
    if (initials !== undefined && contacts[initials]) {
        return getContactInitials(contacts[initials]);
    } else {
        // Hier kannst du das Div-Element ausblenden oder entfernen
        var elementId = `initial${index}`; // Generiere die ID basierend auf dem Index
        var divElement = document.getElementById(elementId);
        console.log(divElement);

        if (divElement) {
            divElement.style.display = 'none'; // Ausblenden des Div-Elements
        }

        return ''; // Oder eine andere geeignete Rückgabewert, falls notwendig
    }
}


function getSubtasks(subtasks, task) {
    let subtasksHTML = '';
    
    console.log('geht task?', subtasks)
    


    if (subtasks) {
        for (let i = 0; i < subtasks.length; i++) {
            const subtask = subtasks[i];
            const subtaskId = `subtask${i + 1}`;
            console.log('geht task wirklich?', subtasks[i]['subtaskStatus'])
            let subtaskStatus = subtasks[i]['subtaskStatus'];
            // let subtaskStatusImg = subtaskStatus(subtaskStatus);

            subtasksHTML += `
                <div class="subtask">
                    <img id="${subtaskId}" onclick="subtaskChangeImg('${subtaskId}', ${i}); saveSubtask(${subtaskStatus}, ${i})" src="assets/icons/checkbox-empty.svg">
                    <div>${subtask['name']}</div>
                </div>
            `;
        }
    }
    return subtasksHTML;
}

// assets/icons/checkbox-empty.svg

function subtaskStatus(i) {
    alert(i)
    // if tasks[i]['subTasks'][0]['subtaskStatus']
}




async function saveSubtask(subtaskStatus, i) {
    console.log('der task status ist', subtaskStatus)
    subtaskStatus = true;

    // console.log('hallo', tasks[11]['taskName'])

    // alert(tasks[i]['subTasks'][0]['subtaskStatus'])
    tasks[i]['subTasks'][0]['subtaskStatus'] = subtaskStatus;
    await setItem('tasks', tasks);
    console.log(tasks);

    console.log('task zweitens', subtaskStatus)



    // console.log('subtask hat den status', task['subTasks'][0]);
}












//// Task related 

function openAddTaskTemplate() {

    document.body.innerHTML +=/*html*/`
    <div id="addTaskOverlay">
    </div>

    <div id="addTaskWrapper">
        <div id="addTaskCard" ><div include-tasks-html="./assets/templates/add_task_template.html"></div></div>
    </div>`;
    includeTasksHtml();

    includeEventlistenerToCloseAddTask();
}

function includeEventlistenerToCloseAddTask() {
    const addTaskOverlay = document.getElementById('addTaskWrapper');
    addTaskOverlay.addEventListener('click', function (event) {
        if (event.target === this) {
            // Clicked on the addTaskOverlay (not its children)
            removeAddTaskElements();
        }
    });
}

function includeEventlistenerToCloseOverlayBoard() {
    const addTaskOverlay = document.getElementById('overlayBoard');
    addTaskOverlay.addEventListener('click', function (event) {
        if (event.target === this) {
            // Clicked on the addTaskOverlay (not its children)
            removeOverlayBoard();
        }
    });
}

function removeAddTaskElements() {
    const addTaskOverlay = document.getElementById('addTaskOverlay');
    const addTaskWrapper = document.getElementById('addTaskWrapper');
    const overlayBoard = document.getElementById('overlayBoard');

    // Remove both elements
    addTaskOverlay.remove();
    addTaskWrapper.remove();
    overlayBoard.remove();
}

function removeOverlayBoard() {
    const overlayBoard = document.getElementById('overlayBoard');

    // Remove both elements
    overlayBoard.remove();
}

async function openEditTaskTemplate(taskId) {

    document.body.innerHTML +=/*html*/`
    <div id="addTaskOverlay">
    </div>

    <div id="addTaskWrapper">
        <div id="editTaskCard" ><div include-tasks-html="./assets/templates/add_task_template.html"></div></div>
    </div>`;

    await includeTasksHtml();
    loadTask(taskId);
    includeEventlistenerToCloseAddTask()
}


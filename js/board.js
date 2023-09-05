let currentDraggedElement; 

let task = [{
    'id': 0,
    'title': 'Putzen',
    'category': 'In progress',
    'text': 'Kochwelt Page & Recipe Recommender'
  }, {
    'id': 1,
    'title': 'Kochen',
    'category': 'In progress',
    'text': 'HTML Base Template Creation'
  }, {
    'id': 2,
    'title': 'Einkaufen',
    'category': 'Await feedback',
    'text': 'CSS Architecture Planning'
  }, {
    'id': 3,
    'title': 'Staubsaugen',
    'category': 'Done',
    'text': 'Daily Kochwelt Recipe'
  }];


  /**
 * Updates the HTML representation of the entire task board by updating individual categories.
 *
 * @function
 * @returns {void}
 */
async function updateBoardHTML() {
    await getStorageData();

    updateTodoHTML();
    updateInProgressHTML();
    updateAwaitFeedbackHTML();
    updateDoneHTML();
}


/**
 * Updates the HTML view of tasks in the 'Todo' category.
 * This function filters tasks in the 'Todo' category, generates HTML elements
 * for each task, and updates the presentation in the DOM accordingly.
 *
 * @function
 * @returns {void}
 */
function updateTodoHTML() {
    let todo = task.filter(t => t['category'] == 'Todo');

    document.getElementById('todo').innerHTML = '';

    if (todo.length > 0){
        for (let i = 0; i < todo.length; i++) {
            let element = todo[i];
            document.getElementById('todo').innerHTML += generateHTML(element);
        }
    } else {
        document.getElementById('todo').innerHTML += renderNoTaskToDo();
    }
}


/**
 * Updates the HTML view of tasks in the 'In progress' category.
 * This function filters tasks in the 'In progress' category, generates HTML elements
 * for each task, and updates the presentation in the DOM accordingly.
 *
 * @function
 * @returns {void}
 */
function updateInProgressHTML() {
    let inProgress = task.filter(t => t['category'] == 'In progress');

    document.getElementById('inProgress').innerHTML = '';

    if (inProgress.length > 0) {
        for (let i = 0; i < inProgress.length; i++) {
            let element = inProgress[i];
            document.getElementById('inProgress').innerHTML += generateHTML(element);
        }
    } else {
        document.getElementById('inProgress').innerHTML += renderNoInProgress();
    } 
}


/**
 * Updates the HTML view of tasks in the 'Await feedback' category.
 * This function filters tasks in the 'Await feedback' category, generates HTML elements
 * for each task, and updates the presentation in the DOM accordingly.
 *
 * @function
 * @returns {void}
 */
function updateAwaitFeedbackHTML() {
    let awaitFeedback = task.filter(t => t['category'] == 'Await feedback');

    document.getElementById('awaitFeedback').innerHTML = '';

    if (awaitFeedback.length > 0) {
        for (let i = 0; i < awaitFeedback.length; i++) {
            let element = awaitFeedback[i];
            document.getElementById('awaitFeedback').innerHTML += generateHTML(element);
        }
    } else {
        document.getElementById('awaitFeedback').innerHTML += renderNoAwaitFeedback();
    }
}


/**
 * Updates the HTML view of tasks in the 'Done' category.
 * This function filters tasks in the 'Done' category, generates HTML elements
 * for each task, and updates the presentation in the DOM accordingly.
 *
 * @function
 * @returns {void}
 */
function updateDoneHTML() {
    let done = task.filter(t => t['category'] == 'Done');

    document.getElementById('done').innerHTML = '';

    if (done.length > 0) {
        for (let i = 0; i < done.length; i++) {
            let element = done[i];
            document.getElementById('done').innerHTML += generateHTML(element);
        }
    } else {
        document.getElementById('done').innerHTML += renderNoDone();
    }
}


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
function generateHTML(element) {
    return `
        <div onclick="showTaskCard('${element['id']}', '${element['text']}')" draggable="true" ondragstart="startDragging(${element['id']})" class="task-card">
            <div class="card-category">User Story</div> 
            <div>
                <h4>${element['text']}</h4>
                <div class="card-description">Build start page with recipe recommendation...</div>
            </div>
            <div class="progress-bar-section">
                <div class="progress-bar">
                    <div class="progress"></div>
             </div>
                <div class="progress-bar-subtasks">1/2 Subtasks</div>
            </div>
            <div class="task-card-bottom-section">
                <div class="task-card-users">
                    <div class="circle-1">AM</div>
                    <div class="circle-2">AM</div>
                    <div class="circle-3">AM</div>
                </div>
                <img src="assets/icons/prio-medium.svg" alt="Prio Medium">
            </div>
        </div>
        `;
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

    const category = ev.target.getAttribute('data-category');

    if (category && currentDraggedElement !== undefined) {
        task[currentDraggedElement]['category'] = category;
        updateBoardHTML();
    }
}


document.getElementById('search-input').addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
        filterToDo(); filterInProgress(); filterAwaitFeedback(); filterDone();
    }
});

document.getElementById('search').addEventListener('click', function() {
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

    let todo = task.filter(t => t['category'] == 'Todo');

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

    if (todo.length > 0){
        for (let i = 0; i < todo.length; i++) {
            let element = todo[i];
            if (element['text'].toLowerCase().includes(searchInput)) {
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

    let progress = task.filter(t => t['category'] == 'In progress')
 
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

    if (progress.length > 0){
        for (let i = 0; i < progress.length; i++) {
            let element = progress[i];
            if (element['text'].toLowerCase().includes(searchInput)) {
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

    let feedback = task.filter(t => t['category'] == 'Await feedback');
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

    if (feedback.length > 0){
        for (let i = 0; i < feedback.length; i++) {
            let element = feedback[i];
            if (element['text'].toLowerCase().includes(searchInput)) {
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

    let done = task.filter(t => t['category'] == 'Done');
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

        if (done.length > 0){
            for (let i = 0; i < done.length; i++) {
                let element = done[i];
                if (element['text'].toLowerCase().includes(searchInput)) {
                    list.innerHTML += generateHTML(element);
                    searchElementsFound = true;
                }
            }
        }
        if (!searchElementsFound) {
            list.innerHTML = renderNoDone();
        }
}


function showTaskCard(id, title) {
    let showTaskCard = document.getElementById('showTaskCard');
    showTaskCard.innerHTML = `
        <div id="overlayBoard" class="overlayBoard">
            <div class="task-card-overlay">
                <div class="card-category-top-section">
                    <div class="card-category-overlay">User Story</div> 
                    <img onclick="closeBoardOverlay()" src="assets/icons/close.svg">
                </div>
                <div>
                    <h4 class="title-h4">${title}</h4>
                </div>
                <div class="card-description-overlay">Build start page with recipe recommendation...</div>
                <div  class="card-description-overlay">
                    <div class="dark-gray">Due date:</div>
                    <div>10/05/2023</div>
                </div>
                <div class="priority-container card-description-overlay">
                    <div class="dark-gray">Priority:</div>
                    <div class="priority">
                        <div>Medium</div>
                        <img src="assets/icons/prio-medium.svg">
                    </div>
                </div>
                <div class="assigned">
                    <div>
                        <div class="dark-gray">Assigned To:</div>
                    </div>
                    <div>
                        <div class="assigned-contacts">
                            <div class="contact-circle">EM</div>
                            <div>Emmanuel Mauer</div>
                        </div>
                        <div class="assigned-contacts">
                            <div class="contact-circle">EM</div>
                            <div>Emmanuel Mauer</div>
                        </div>
                        <div class="assigned-contacts">
                            <div class="contact-circle">EM</div>
                            <div>Emmanuel Mauer</div>
                        </div>
                    </div>
                </div>
                <div class="subtasks">
                    <div>
                        <div class="dark-gray">Subtask</div>
                    </div>
                    <div class="subtasks-container">
                        <div class="subtask">
                            <img id="subtask1" onclick="subtaskChangeImg('subtask1')" src="assets/image/board/Check-button.svg">
                            <div>Implement Recipe Recommendation</div>
                        </div>
                        <div class="subtask">
                            <img id="subtask2" onclick="subtaskChangeImg('subtask2')" src="assets/image/board/Check-button-empty.svg">
                            <div>Start Page Layout</div>
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
                        <div>Edit</div>
                    </div>
                </div>
            </div>
        </div>
    `;
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
    document.getElementById('overlayBoard').classList.add('dNone');
}


function changeImage(newSrc, imageId) {
    const image = document.getElementById(imageId);
    image.src = newSrc;
}



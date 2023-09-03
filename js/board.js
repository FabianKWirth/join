let currentDraggedElement; 

let task = [{
    'id': 0,
    'title': 'Putzen',
    'category': 'Todo',
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


function updateBoardHTML() {
    updateTodoHTML();
    updateInProgressHTML();
    updateAwaitFeedbackHTML();
    updateDoneHTML();
}


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

function renderNoTaskToDo() {
    return `<div class="noToDo">No tasks To Do</div>`;
}

function renderNoInProgress() {
    return `<div class="noToDo">No tasks In progress</div>`;
}

function renderNoAwaitFeedback() {
    return `<div class="noToDo">No tasks Await feedback</div>`;
}

function renderNoDone() {
    return `<div class="noToDo">No tasks Done</div>`;
}

function generateHTML(element) {
    return `
        <div draggable="true" ondragstart="startDragging(${element['id']})" class="task-card">
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



function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}

function startDragging(id) {
    currentDraggedElement = id;
}

function allowDrop(ev) {
    ev.preventDefault();
}

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



function filterToDo() {
    let searchInput = document.getElementById('search-input').value;
    searchInput = searchInput.toLowerCase();
    let list = document.getElementById('todo');
    list.innerHTML = '';

    let todo = task.filter(t => t['category'] == 'Todo');

        if (todo.length > 0){
            for (let i = 0; i < todo.length; i++) {
                let element = todo[i];
                if (element['text'].toLowerCase().includes(searchInput)) {
                    list.innerHTML += generateHTML(element);
                } else {
                    list.innerHTML += renderNoTaskToDo();
                }
            }
        }
} 

function filterInProgress() {
    let searchInput = document.getElementById('search-input').value;
    searchInput = searchInput.toLowerCase();
    let list = document.getElementById('inProgress');
    list.innerHTML = '';

    let todo = task.filter(t => t['category'] == 'In progress');

        if (todo.length > 0){
            for (let i = 0; i < todo.length; i++) {
                let element = todo[i];
                if (element['text'].toLowerCase().includes(searchInput)) {
                    list.innerHTML += generateHTML(element);
                } else {
                    list.innerHTML += renderNoTaskToDo();
                }
            }
        }
} 

function filterAwaitFeedback() {
    let searchInput = document.getElementById('search-input').value;
    searchInput = searchInput.toLowerCase();
    let list = document.getElementById('awaitFeedback');
    list.innerHTML = '';

    let todo = task.filter(t => t['category'] == 'Await feedback');

        if (todo.length > 0){
            for (let i = 0; i < todo.length; i++) {
                let element = todo[i];
                if (element['text'].toLowerCase().includes(searchInput)) {
                    list.innerHTML += generateHTML(element);
                } else {
                    list.innerHTML += renderNoTaskToDo();
                }
            }
        }
} 


function filterDone() {
    let searchInput = document.getElementById('search-input').value;
    searchInput = searchInput.toLowerCase();
    let list = document.getElementById('done');
    list.innerHTML = '';

    let todo = task.filter(t => t['category'] == 'Done');

        if (todo.length > 0){
            for (let i = 0; i < todo.length; i++) {
                let element = todo[i];
                if (element['text'].toLowerCase().includes(searchInput)) {
                    list.innerHTML += generateHTML(element);
                } else {
                    list.innerHTML += renderNoTaskToDo();
                }
            }
        }
} 
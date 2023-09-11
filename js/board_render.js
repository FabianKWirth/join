function renderProgressBar(progressPercentage, completedSubtaskCount, subtaskCount) {
    return `
    <div class="progress-bar-section">
                <div class="progress-bar">
                    <div class="progress" style="width: ${progressPercentage}%;"></div>
                </div>
                <div class="progress-bar-subtasks">${completedSubtaskCount}/${subtaskCount} Subtasks</div>
            </div>
    `;
}


function renderTaskCards(index, task, categoryClass, progressBarHTML, assignedContactsIcons, priorityImageSrc) {
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
        </div>
        `;
}


function generateTaskCardHTML(index, categoryClass, category, name, description, date, priority, priorityImageSrc, getAssignedText, assignedContactsHTML, getSubtaskText, subtasksHTML) {
    return `
        <div id="overlayBoard" class="overlayBoard" onclick="loadTasksHTML()">
            <div id="taskCard${index}" class="task-card-overlay">
                <div class="card-category-top-section">
                    <div class="card-category-overlay ${categoryClass}">${category}</div> 
                    <img onclick="closeBoardOverlay(), loadTasksHTML();" src="assets/icons/close.svg">
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
                <div id="assign" class="assigned">
                        ${getAssignedText}
                        ${assignedContactsHTML}
                </div>
                <div class="subtasks">
                    <div id="subtaskTitel" class="subtaskTitel">
                        ${getSubtaskText}
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
}

    
function renderSubtask(subtaskId, subtaskStatus, i, index, subtaskImgSrc, subtask) {
    return `
        <div class="subtask" onclick="subtaskChangeImg('${subtaskId}'); saveSubtask(${subtaskStatus}, ${i}, ${index}), loadTasksHTML()">
            <img id="${subtaskId}" src="${subtaskImgSrc}">
            <div>${subtask['name']}</div>
        </div>
    `;
}
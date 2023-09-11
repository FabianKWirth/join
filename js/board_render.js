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
    
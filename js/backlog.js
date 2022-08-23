let availableUsers = [];
let taskData = [];


async function initBacklog() {
    await init();
    setData();
    generateTask();
}


function setData() {
    availableUsers = users;
    taskData = data;
}


function toggleTicket(index) {
    document.getElementById(`ticketButton${index}`).classList.toggle('d-none');
    document.getElementById(`ticketExpanded${index}`).classList.toggle('d-none');
    expandTicketDetails(index);
}


function expandTicketDetails(index) {
    let ticketDetails = document.getElementById(`ticketDetails${index}`);
    ticketDetails.classList.toggle('ticket-details');
    ticketDetails.classList.toggle('ticket-details-expanded');
    ticketDetails.style.zIndex = 11;
    document.getElementById(`ticketExpanded${index}`).style.zIndex = 10;
}


function textShow(content, index) {
    document.getElementById(`textOptions${index}`).innerHTML = content;
    document.getElementById(`textOptions${index}`).classList.toggle('text-anim');
}


function generateTask() {
    document.getElementById('taskContent').innerHTML = ``;
    for (let i = 0; i < taskData.length; i++) {
        if (taskData[i].status == "backlog") {
            document.getElementById('taskContent').innerHTML += taskHtml(i);
            renderAssignedUser(i);
            renderUserSelection(i);
        }
    }
}


function taskHtml(i) {
    return /*html*/ `
    <div class="task-ticket-container">
    <div class="task-ticket" id="taskTicket">
        <div onclick="toggleTicket(${i})" id="ticketButton${i}" class="ticket-button">
            <span>EXPAND TO EDIT</span>
        </div>
        <div class="ticket-user-img" id="assignedUser${i}">
        </div>
        <div id="ticketTitle${i}"  class="ticket-title">
            <span>${taskData[i].title}</span>
        </div>
        <div id="ticketCategory${i}" class="ticket-category">
            <span>${taskData[i].category}</span>
        </div>
        <div id="ticketDetails${i}" class="ticket-details">
            <span id="ticketDescription${i}">${taskData[i].description}</span>
        </div>
        <div id="ticketExpanded${i}" class="ticket-expanded d-none">
            <div class="expanded-user-settings">
                <div class="user-selection-container">
                    <div id="userSelection${i}" class="user-selection-content">
                    </div>
                </div>
            </div>
            <div class="ticket-options-container">
                <div class="ticket-options">
                    <div class="delete-img-cont" onmouseover="textShow('delete Task', ${i})" 
                            onmouseleave="textShow('choose an option', ${i})"
                            onclick="deleteTask(${i})">
                        <img class="delete-img" src="./src/img/delete.png">
                    </div>
                    <div class="send-to-board-img-cont" onmouseover="textShow('move to board', ${i})" 
                            onmouseleave="textShow('choose an option', ${i})"
                            onclick="moveTaskToBoard(${i})">
                        <img class="send-to-board-img" src="./src/img/send_to_board.png">
                    </div>
                    <div id="editIconDiv${i}" class="send-to-board-img-cont" onmouseover="textShow('edit task', ${i})" 
                            onmouseleave="textShow('choose an option', ${i})"
                            onclick="openEditMode(${i})">
                        <img id="editIcon${i}" class="send-to-board-img" src="./src/img/edit.png">
                    </div>
                </div>
                <div>
                    <span id="textOptions${i}">choose an option</span>
                </div>
            </div>
            <div class="expanded-urgency-settings">
                <span></span>
            </div>
        </div>
    </div>
</div>
    `;
}


function renderUserSelection(index) {
    document.getElementById(`userSelection${index}`).innerHTML = ``;
    for (let i = 0; i < availableUsers.length; i++) {
        document.getElementById(`userSelection${index}`).innerHTML += /*html*/ `
            <div class="user-selection-user">
                <img src="${availableUsers[i].img}">
                <span>${availableUsers[i].first_name} ${availableUsers[i].last_name}</span>
            </div>
        `;
        showAssignedUserInSelection(index);
    }

}


function renderAssignedUser(index) {
    let zIndex = taskData[index].assignedTo.length;
    let left = 0;
    document.getElementById(`assignedUser${index}`).innerHTML = ``;
    if (taskData[index].assignedTo) {
        for (let i = 0; i < taskData[index].assignedTo.length; i++) {
            if (taskData[index].assignedTo) {
                document.getElementById(`assignedUser${index}`).innerHTML += /*html*/ `
                    <img style="left: ${left}px; z-index: ${zIndex};" src="${taskData[index].assignedTo[i].img}">
            `;
                zIndex--;
                left += 32;
            }
        }
    }
}


function showAssignedUserInSelection(index) {

}


function moveTaskToBoard(index) {
    taskData[index].status = 'todo';
    saveDataToServer();
    generateTask();
}


async function saveDataToServer() {
    await backend.setItem('tickets', JSON.stringify(taskData));
}


function deleteTask(index) {
    taskData.splice(index, 1);
    resetIdInData();
    generateTask();
    saveDataToServer();
}


function replaceTagDescription(index) {
    document.getElementById(`ticketDetails${index}`).innerHTML = `<textarea id="ticketDescription${index}">${taskData[index].description}</textarea>`;
    document.getElementById(`ticketDescription${index}`).classList.add('ticket-textarea');
}


function replaceTagCategory(index) {
    document.getElementById(`ticketCategory${index}`).innerHTML = 
        `<select name="Tasks>
            ${rendertaskCategoryOption()}
        `;
        document.getElementById(`ticketCategory${index}`).classList.add('form-category');
}


function replaceTagTitle(index) {
    document.getElementById(`ticketTitle${index}`).innerHTML = `<input id="ticketTitleText${index}">`;
    document.getElementById(`ticketTitleText${index}`).value = `${taskData[index].title}`;
    document.getElementById(`ticketTitle${index}`).classList.add('ticket-title-input');
}


function revertTagDescription(index) {
    document.getElementById(`ticketDetails${index}`).innerHTML = `<span id="ticketDescription${index}">${taskData[index].description}</span>`;
    document.getElementById(`ticketDescription${index}`).classList.remove('ticket-textarea');
}


function revertTagTitle(index) {
    document.getElementById(`ticketTitle${index}`).innerHTML = `<span>${taskData[index].title}</span>`;
    document.getElementById(`ticketTitle${index}`).classList.remove('ticket-title-input');
}


function revertTagCategory(index) {
    document.getElementById(`ticketCategory${index}`).innerHTML = `<span>${taskData[index].category}</span>`;
    document.getElementById(`ticketCategory${index}`).classList.remove('form-category');
}


function openEditMode(index) {
    replaceTagDescription(index);
    replaceTagTitle(index);
    replaceTagCategory(index);
    changeEditIconToSave(index);
}


function closeEditMode(index) {
    revertTagDescription(index);
    revertTagTitle(index);
    revertTagCategory(index);
    revertChangeEditIconToSave(index);
}


function saveChangedTicket(index) {

}


function changeEditIconToSave(index) {
    document.getElementById(`editIcon${index}`).src = "./src/img/save.png";
    document.getElementById(`editIconDiv${index}`).setAttribute(`onmouseover`, `textShow('save changes', ${index})`);
    document.getElementById(`editIconDiv${index}`).setAttribute(`onclick`, `saveChangedTicket(${index})`);
}


function revertChangeEditIconToSave(index) {
    document.getElementById(`editIcon${index}`).src = "./src/img/edit.png";
    document.getElementById(`editIconDiv${index}`).setAttribute(`onmouseover`, `textShow('edit task', ${index})`);
    document.getElementById(`editIconDiv${index}`).setAttribute(`onclick`, `openEditMode(${index})`);
}


function rendertaskCategoryOption() {
    let options;
    for (let i = 0; i < taskCategories.name.length; i++) {
        options += `
            <option value"${taskCategories.value[i]}">${taskCategories.name[i]}</option>
        `;
    }
    return options;
}


function getDataFromTicketEdit(index) {
    //TODO function to get the values of the changed data for a ticket
}


function closeEveryTicketExceptLast(index) {
    for (let i = 0; i > taskData.length; i++) {
        if(!i == index) {
            
        }
    }
}
let currentDraggedStatus;
let currentDraggedElement;
let taskStatus = ["todo", "inprogress", "testing", "done"]
let allTasks = data;
let acc = document.getElementsByClassName("accordion");
let i;


/**
 * This function is an onload(body) function.
 * 
 */
async function initBoard() {
    await init();
    await loadTickets();
    await showTickets();
    readyForOpenTask();


}


/**
 * 
 * load all tickets and put it in a local variable "allTasks"
 */
function loadTickets() {
    for (let i = 0; i < data.length; i++) {
        allTasks.push(data[i]);

    }
}





/**
 * get a status from taskStatus[] and add the Tickets
 * 
 */
function showTickets() {
    for (let i = 0; i < taskStatus.length; i++) {
        let currentStatus = taskStatus[i];
        getTasks(currentStatus);

    }
}


/**
 * filter tasks by status and add in the right column
 *
 * @param {string} currentStatus - status for using the right tasks and div-IDs
 */
function getTasks(currentStatus) {
    let tasks = allTasks.filter(t => t['status'] == currentStatus);
    let content = document.getElementById(currentStatus + "Content");
    content.innerHTML = ``;
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        let id = task['id'];
        content.innerHTML += addHTML(task, id,);
        document.getElementById('ticket' + id).classList.add(checkPriority(task))


    }
}

/**
 * check the urgency for choosing the border-color
 * 
 */
function checkPriority(currentArray) {
    priority = currentArray['urgency'];
    if (priority == 'low') {
        return 'low-task';
    }
    if (priority == 'medium') {
        return 'medium-task';
    }
    if (priority == 'high') {
        return 'high-task';
    }
}


/**
 * add information in HTML
 * 
 * @param {string} id - status and arreyposition to define the ticket
 * @param {string} currentArray - This is the current task.
 * @returns - HTML-Code with informations from the array
 */
function addHTML(currentArray, id) {
    return `
            <div id="ticket${id}" draggable="true" ondragstart="startDragging(${id})" class="task-card">
                <button class="accordion">
                <div>

                    <span class="category">${currentArray["category"]}</span>


                </div>
                    <div class="ticket-header">
                        <h3>${currentArray["title"]}</h3>
                        <img class="ticket-img" src="${checkAssignedTo(currentArray, id)}">
                    </div>
                    <span id="date${id}" class="date">${getDate(currentArray["dueTo"], id)}</span>
                </button>
                <div class="panel">
                <div class="arrows">
                        <img src="src/img/arrow-icon-left.png" onclick="moveTicketLeft(${id})">
                        <img class="click-delete-icon" src="src/img/delete.png" onclick="deleteByClick(${id})">
                        <img src="src/img/arrow-icon-right.png" onclick="moveTicketRight(${id})">
                    </div>
                    <span class="description">${currentArray["description"]}</span>
                    <div>
                    <a class="put-to-backlog" onclick="backToBacklog(${id})">put back to Backlog</a>
                </div>
                </div>
                
            </div>
         `;
}


/**
 * check the assignedTo "status" and return a alternative string if this is empty
 * 
 * @param {string} currentArray - sometimes needed if the alternative returns
 * @param {string} id - position of the ticket in the array
 * @returns - correct link or alternative
 */
function checkAssignedTo(currentArray, id) {
    let a = true;
    if (data[id].assignedTo[0]) {
        return data[id].assignedTo[0].img;
    } else {
        return "./src/img/profile.png";
    }
}



/**
 * get the the dragged element by array-id
 * 
 * @param {string} id - id from the dragged element
 */
function startDragging(id) {
    currentDraggedElement = id;
}


function allowDrop(ev) {
    ev.preventDefault();
}


/**
 * set the new status of the ticket and update the page
 * 
 * @param {string} status - status for set new column
 */
function moveTo(status) {
    allTasks[currentDraggedElement]['status'] = status;
    saveData();
    showTickets();
    readyForOpenTask();
    saveData();
}


/**
 * prepare the tasks for opening
 * 
 */
function readyForOpenTask() {
    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            /* Toggle between adding and removing the "active" class,
            to highlight the button that controls the panel */
            this.classList.toggle("active");

            /* Toggle between hiding and showing the active panel */
            let panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
    }
}


/**
 * Safe Data[] to Backend.
 * 
 */
async function saveData() {
    await backend.setItem('tickets', JSON.stringify(data));
}

/**
 * 
 * delete complete task by drag and drop
 */
async function deleteTicket() {
    await data.splice(currentDraggedElement, 1);
    allTasks = data;
    saveData();
    showTickets();
    readyForOpenTask();
    saveData();
}

/**
 * 
 * delete complete task by click(only in responsive)
 * @param {string} id - ticket position in array
 */
async function deleteByClick(id) {
    await data.splice(id, 1)
    saveData();
    console.log(data);
    showTickets();
    readyForOpenTask();
    saveData();
}

/**
 * 
 * change status of the ticket to backlog and refresh page
 * @param {string} id 
 */
function backToBacklog(id) {
    allTasks[id]["status"] = "backlog";
    saveData();
    showTickets();
    readyForOpenTask();
}


/**
 * 
 * only in responsive, change status to the status of the left side
 * @param {string} id - ticket position in array
 */
function moveTicketLeft(id) {
    let ticketStatus = data[id]["status"];
    for (let i = 0; i < taskStatus.length; i++) {
        let element = taskStatus[i];
        if (element == ticketStatus && i >= 1) {
            data[id]["status"] = taskStatus[i - 1]
            { break; }
        }
    }
    showTickets();
    readyForOpenTask();
    saveData();
}


/**
 * only in responsive, change the status to the status of the right side
 * @param {string} id  - ticket position in array
 */
function moveTicketRight(id) {
    let ticketStatus = data[id]["status"];
    for (let i = 0; i < taskStatus.length; i++) {
        let element = taskStatus[i];
        if (element == ticketStatus && i < taskStatus.length - 1) {
            data[id]["status"] = taskStatus[i + 1]
            { break; }
        }
    }
    showTickets();
    readyForOpenTask();
    saveData();
}


/**
 * get the todue and change it in "days left"
 * @param {string} todue - date of todue
 * @param {string} id - ticket position in array
 * @returns - formated todue date in "days left", or "deadline has come"
 */
function getDate(todue, id) {
const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
const firstDate = new Date();
const secondDate = new Date(todue);

const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
let fixedDays = diffDays + 1

if (firstDate < secondDate) {
    return fixedDays + "day's left";
}
if (firstDate == secondDate) {
    return "today";
}
else {
    return "the deadline has come";
}


}


















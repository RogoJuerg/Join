let currentDraggedStatus;
let currentDraggedElement;
let taskStatus = ["todo", "inprogress", "testing", "done"]
let allTasks = [
    {   "id":"0",
        "title": "testing drag and drop",
        "category": "programming",
        "description": "TEST IT",
        "date": "",
        "urgency": "high",
        "status":"todo"
    },
    {   "id":"1",
        "title": "testing drag and drop again",
        "category": "programming",
        "description": "TEST IT AGAIN",
        "date": "",
        "urgency": "low",
        "status":"todo"
    },
    {   "id":"2",
        "title": "testing drag and drop 3",
        "category": "programming",
        "description": "TEST IT 3",
        "date": "",
        "urgency": "medium",
        "status":"todo"
    }
];


/**
 * This function is an onload(body) function.
 * 
 */
async function initBoard() {
        await showTickets(); 
    
    
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
        content.innerHTML += addHTML(task, id);
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
            <div draggable="true" ondragstart="startDragging(${id})" class="task-card">
                <span class="category">${currentArray["category"]}</span>
                <h3>${currentArray["title"]}</h3>
                <span>${currentArray["date"]}</span>
                <span>${currentArray["description"]}</span>
            </div>
         `;
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
    showTickets();
}

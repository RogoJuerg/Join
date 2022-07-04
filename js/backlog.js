/** 
 *@param {string} categories - This is for showing the category select options in taskOpen Dialog to be edited
 *@param {string} urgencies - This is for showing the urgency select options in taskOpen Dialog to be edited
*/
let categories = ['management', 'programming', 'design']
let urgencies = ['low', 'medium', 'high']
let names = ['Herlina Pfeiffer', 'Eric Panhans', 'Jürgen Rogozin']
let images = ['./src/img/user/img_01.png', './src/img/user/img_03.png', './src/img/user/img_02.png']



//<option value="herlina_pfeiffer">Herlina Pfeiffer</option>
//<option value="eric_panhans">Eric Panhans</option>
//<option value="jürgen_rogozin">Jürgen Rogozin</option>

/** 
* This function calls init() in script.js before the function showBacklogData() is called.
*/
async function initBacklog() {
    await init();
    showBacklogData()
}

/** 
* This function renders only the backlog data with status "backlog" in data array, which is saved in backend
* with "data.filter" only data with status "backlog" will be shown
* @param {string} backlogIndex - This give us the actual position in the original data.json and not on the backlogContainer. 
*/
function showBacklogData() {
    let backlogs = data.filter(t => t['status'] == 'backlog');
    let backlogContainer = document.getElementById('backlogContainer');

    backlogContainer.innerHTML = '';

    //console.log(data[3].assignedTo[0].email);

    for (let i = 0; i < backlogs.length; i++) {
        let backlog = backlogs[i];
        //console.log(backlog.assignedTo[0].email);
        //console.log(data[i].assignedTo[0].email);
        const backlogIndex = data.indexOf(backlog);

        backlogContainer.innerHTML += templateBacklogContainer(backlog, backlogIndex); /*html*/
    }
}

/** 
* class = "".. ${backlog['urgency']}" changes the color depending on urgencies "low","middle" or "high", which are defined in .css.
*/
function templateBacklogContainer(backlog, backlogIndex) {
    
    return /*html*/`
 
        <div class="task-container-content ${backlog['urgency']}">
            <div class="task-content">    
                <div class="person">
                    <img class="photo" src=" ${checkAssignedToImg(backlog)}">
              
                    <div class="name-email">
                    <span> ${checkAssignedToFirstName(backlog)} ${checkAssignedLastName(backlog)}</span> <br>
                    <span style="color: #6f8bf3f7"> ${checkAssignedEmail(backlog)} </span> 
                    </div> 
                </div> 
                <div class="category">${backlog['category']}</div>

                <div class="description">${backlog['description']}</div>         
            </div>
            <div class="edit-delete">
                <img onclick="sendToBoard(${backlogIndex})"class="icon_backlog" title="send to board"src="src/img/send_to_board.png">        
                <img onclick="taskOpen(${backlogIndex})"class="icon_backlog" title="edit" src="src/img/edit.png">    
                <img onclick="deleteTask(${backlogIndex})"class="icon_backlog"title="delete" src="src/img/delete.png">    
             </div>
        </div>`;
}

function checkAssignedToImg(backlog) {
    if (backlog.assignedTo[0]) {
        return backlog.assignedTo[0].img;
    } else {
        return "./src/img/profile.png";
    }
}

function checkAssignedToFirstName(backlog) {
    if (backlog.assignedTo[0]) {
        return backlog.assignedTo[0].first_name;
    } else {
        return " ";
    }
}

function checkAssignedLastName(backlog) {
    if (backlog.assignedTo[0]) {
        return backlog.assignedTo[0].last_name;
    } else {
        return " ";
    }
}

function checkAssignedEmail(backlog) {
    if (backlog.assignedTo[0]) {
        return backlog.assignedTo[0].email;
    } else {
        return " ";
    }
}



function closeWindow() {
    document.getElementById('taskopen-bg-backlog').classList.remove('overlay-bg');
    document.querySelector('.task-open').classList.add('d-none');
}

/** 
* This function open the input dialog enable to edit the data and save them in backend.
*/
function taskOpen(i) {
    //console.log(data[i].assignedTo[0].first_name +' '+ data[i].assignedTo[0].last_name);
    document.getElementById('taskopen-bg-backlog').classList.add('overlay-bg');
    document.querySelector('.task-open').classList.remove('d-none');

    document.getElementById('taskEdit').innerHTML = templateTaskOPen(i);

}

function templateTaskOPen(i) {
    return /*html*/`
    <div class="overlay">
        <div class="task-open-container">      
            <img onclick="closeWindow()" class="close-window" src="src/img/close-window.png">    
            <div class="form-left">
                <div class="task-title">
                    <label class="title-label">TITLE</label>
                    <input value="${data[i]['title']}" type="text" id="titleEdit">
                </div>
                <div class="form-category">
                    <label class="title-label">CATEGORY</label>
                    <select name="Tasks" id="categoryEdit">
                    ${renderOptionFields(data[i]['category'], categories)}
                    </select>
                </div>
                <div class="form-description">
                    <label class="title-label"></label>
                    <textarea type="text" id="descriptionEdit" rows="6" required>${data[i]['description']}</textarea>
                </div>
            </div>
            <div class="form-right">           
                <div class="form-due-date">
                    <label class="title-label">DUE DATE</label>
                    <input value="${data[i]['dueTo']}" type="date" id="dueToEdit">
                </div>
                <div class="form-urgency">
                    <label class="title-label">URGENCY</label>
                    <select name="Tasks" id="urgencyEdit" required>
                    ${renderOptionFields(data[i]['urgency'], urgencies)}
                    </select>
                </div>
                <div class="form-assigned-to">
                    <label class="title-label">ASSIGNED TO</label>        
                    <select name="Users" id="userEdit" required>
                    ${renderOptionFields(data[i].assignedTo[0].first_name + ' ' + data[i].assignedTo[0].last_name, names)}
                    </select>
                    <div class="assigned-to-buttons">
                        <button type="button" onclick="saveEdit(${i})"class="btn-1">save</button>     
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
}



function deleteTask(i) {
    data.splice(i, 1);
    saveTasks();
    showBacklogData();

}

/** 
*This function renders all options from a given array of values in an html select field (array catogories and urgencies)
the selected option will be shown at first position. 
*/
function renderOptionFields(selected, dataArray) {
    str = '';
    for (let i = 0; i < dataArray.length; i++) {
        let el = dataArray[i]; // if dataArray == 'users' el = dataArray[i].name
        str += /*html*/ `<option value="${el}" ${renderSelected(selected, el)}>${el}</option>`;
    }
    return str;
}
/** 
 * This function compares the value of a given element against the current value of a select field 
 * and returns the attribut 'selected' if they match
*/
function renderSelected(option, value) {
    if (option != undefined) {
        if (option.toLowerCase() == value.toLowerCase()) {
            return 'selected';
        }
    }
}

/** 
 * This function gives back the edited values to the json variables to be saved in backend (saveTasks())
*/
function saveEdit(i) {
    data[i]['title'] = document.getElementById('titleEdit').value;
    data[i]['category'] = document.getElementById('categoryEdit').value;
    data[i]['description'] = document.getElementById('descriptionEdit').value;
    data[i]['dueTo'] = document.getElementById('dueToEdit').value;
    data[i]['urgency'] = document.getElementById('urgencyEdit').value;

    let fullname = document.getElementById('userEdit').value;
    const splittedName = fullname.split(" ");
    data[i].assignedTo[0].first_name = splittedName[0];
    data[i].assignedTo[0].last_name = splittedName[1];


    data[i].assignedTo[0].email = (splittedName[0].toLowerCase()) + '@join.com';

    if (splittedName[0] == "Herlina") {
        data[i].assignedTo[0].img = images[0];
        console.log(images[0]);
    } else if (splittedName[0] == "Eric") {
        data[i].assignedTo[0].img = images[1];
    } else if (splittedName[0] == "Jürgen") {
        data[i].assignedTo[0].img = images[2];
    }

    showBacklogData();
    saveTasks();
    closeWindow();
}

/** 
 * This function saves the edited data in backend
*/
async function saveTasks() {
    await backend.setItem('tickets', JSON.stringify(data));
}

/** 
 * This function sends the data to board.
 * with  data[i]['status'] = "todo" --> the status will changed first to status "todo"
*/
function sendToBoard(i) {
    data[i]['status'] = "todo";
    saveTasks();
    showBacklogData();

}


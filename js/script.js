setURL('https://gruppe-256.developerakademie.net/smallest_backend_ever');
let data = [];
let users = [];


async function init() {
    await downloadBackend();
    await includeHTML();
    currentPage();
    resetIdInData();
}


function openDevTools() {
    document.getElementById('devTools').classList.toggle('d-none')
}


// Mini Backend
async function downloadBackend() {
    await downloadFromServer();
    data = JSON.parse(backend.getItem('tickets')) || [];
    users = JSON.parse(backend.getItem('users')) || [];
}

// Mini Backend end

async function includeHTML() {
    let includeElements = document.querySelectorAll('[include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("include-html");
        let response = await fetch(file);
        if (response.ok) {
            element.innerHTML = await response.text();
        } else {
            element.innerHTML = '404 Page not found';
        }
    }
}

function currentPage() {
    let activePage = window.location.pathname;
    console.log(activePage)

    if (activePage.includes('board')) {
        document.getElementById('boardId').classList.add('nav-active');
    }
    if (activePage.includes('backlog')) {
        document.getElementById('backlogId').classList.add('nav-active');
    }
    if (activePage.includes('add-task')) {
        document.getElementById('addTaskId').classList.add('nav-active');
    }
    if (activePage.includes('help')) {
        document.getElementById('helpId').classList.add('nav-active');
    }
}

/**
 * for bugfixing, reset the data[i]['id'].
 * 
 */
function resetIdInData() {
    for (let i = 0; i < data.length; i++) {
        let element = data[i];
        element['id'] = i; 
    }
}


let navbarState = false;
function showNavbar() {
    document.getElementById('menubar').classList.toggle('hide-mobile');
    document.getElementById('menubar').classList.add('navbar-animation');
    if(navbarState == true) {
        document.getElementById('menuButton').src = "./src/img/menu.svg";
        navbarState = false;
    } else {
        document.getElementById('menuButton').src = "./src/img/x_white.png";
        navbarState = true;
    }
    
   
    
}

function closeNavbar() {
    document.getElementById('menubar').classList.add('hide-mobile');
}
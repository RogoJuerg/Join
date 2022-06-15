async function init() {
    await includeHTML();
    currentPage();
    initBoard();
}

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

function moveTo(website) {
    let content = document.getElementById("allContents")
    content.setAttribute("include-html", website + ".html");
    init();
    

}

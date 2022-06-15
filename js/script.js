async function init() {
    await includeHTML();
    await initBoard();
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



async function goTo(website) {
    let content = document.getElementById("allContents")
    content.setAttribute("include-html", website + ".html");
    await includeHTML();

    if (website == 'board') {
        initBoard();
    }
    }

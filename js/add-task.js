let title;
let category;
let description;
let date;
let urgency;
let assignedTo;


function saveTask() {
    title = document.getElementById('title');
    category = document.getElementById('tasks');
    description = document.getElementById('description');
    date = document.getElementById('date');
    urgency = document.getElementById('urgency');
    checkForm();

}

function checkForm() {
    if (document.getElementById('title').value == '') {
        document.getElementById('title').classList.remove('green-border');
        document.getElementById('title').classList.add('red-border');
        console.log('empty');
    } if (!document.getElementById('title').value == '') {
        document.getElementById('title').classList.remove('red-border');
        document.getElementById('title').classList.add('green-border');
        console.log('not');
    }

}
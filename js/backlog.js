
async function initBacklog() {
    await init();
}


function openTicket() {
    document.getElementById('ticketButton').classList.toggle('d-none');
    document.getElementById('ticketExpanded').classList.toggle('d-none');
    expandTicketDetails();
}


function expandTicketDetails() {
    document.getElementById('ticketDetails').classList.toggle('ticket-details');
    document.getElementById('ticketDetails').classList.toggle('ticket-details-expanded');
}


function textShow(content) {
    document.getElementById('textDelete').innerHTML = content;
    document.getElementById('textDelete').classList.toggle('text-anim');
}

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
    document.getElementById('ticketExpanded').style.zIndex = 5;
    document.getElementById('ticketDetails').style.zIndex = 6;
}


function textShow(content) {
    document.getElementById('textOptions').innerHTML = content;
    document.getElementById('textOptions').classList.toggle('text-anim');
}


function generateTask() {
    document.getElementById('taskContent').innerHTML += taskHtml();
}


function taskHtml() {
    return /*html*/`
    <div class="task-ticket-container">
    <div class="task-ticket" id="taskTicket">
        <div onclick="openTicket()" id="ticketButton" class="ticket-button">
            <span>EXPAND TO EDIT</span>
        </div>
        <div class="ticket-user-img">
            <img style="z-index: 3;" src="./src/img/user/img_01.png">
            <img style="left: 32px; z-index: 2;" src="./src/img/user/img_02.png">
            <img style="left: 64px; z-index: 1;" src="./src/img/user/img_03.png">
        </div>
        <div class="ticket-title">
            <span>Title</span>
        </div>
        <div class="ticket-category">
            <span>Category</span>
        </div>
        <div id="ticketDetails" class="ticket-details">
            <span>Details are shown here until a certain lenght Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Corrupti debitis dicta accusamus a facilis,
                perferendis consectetur exercitationem sunt nam totam rem veritatis qui corporis
                ipsam aliquam culpa assumenda officiis incidunt.</span>
        </div>
        <div id="ticketExpanded" class="ticket-expanded d-none">
            <div class="expanded-user-settings">
                <div class="user-selection-container">
                    <div class="user-selection-content">
                        <div class="user-selection-user">
                            <img src="./src/img/user/img_01.png">
                            <span>FirstN LastN</span>
                        </div>

                        <div class="user-selection-user">
                            <img src="./src/img/user/img_01.png">
                            <span>FirstN LastN</span>
                        </div>

                        <div class="user-selection-user">
                            <img src="./src/img/user/img_01.png">
                            <span>FirstN LastN</span>
                        </div>

                        <div class="user-selection-user">
                            <img src="./src/img/user/img_01.png">
                            <span>FirstN LastN</span>
                        </div>

                        <div class="user-selection-user">
                            <img src="./src/img/user/img_01.png">
                            <span>FirstN LastNLongwer</span>
                        </div>

                    </div>
                </div>
            </div>
            <div class="ticket-options-container">
                <div class="ticket-options">
                    <div class="delete-img-cont" onmouseover="textShow('delete Task')" onmouseleave="textShow('choose an option')">
                        <img class="delete-img" src="./src/img/delete.png">
                    </div>
                    <div class="send-to-board-img-cont" onmouseover="textShow('move to board')" onmouseleave="textShow('choose an option')">
                        <img class="send-to-board-img" src="./src/img/send_to_board.png">
                    </div>
                    <div class="send-to-board-img-cont" onmouseover="textShow('save changes')" onmouseleave="textShow('choose an option')">
                        <img class="send-to-board-img" src="./src/img/save.png">
                    </div>
                </div>
                <div>
                    <span id="textOptions">choose an option</span>
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
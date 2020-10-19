

console.log("hello from js");

$(document).ready(onReady);

function onReady() {
    console.log("Hello from jquery");
    getTaskList();
    $('#addTask').on('click',addTask);
    $('#tableWrapper').on('click','.deleteButton',deleteTask);
    $('#tableWrapper').on('click','.changeStatus',changeStatus);
}

function getTaskList() {
    $.ajax({
        type: 'GET',
        url: '/list'
    }).then(function (response) {
        console.log('Get got!');
        tableAppend(response);
    });
}

function tableAppend(response) {
    $('#taskTBody').empty();
        for (let i = 0; i < response.length; i++) {
            if ( response[i].completed ) {
                $('#taskTBody').append(`
            <tr data-id=${response[i].id} data-completed=${response[i].completed}>
                <td>${response[i].task}</td>
                <td>Done!</td>
                <td>${response[i].timestamp}</td>
                <td><button class="changeStatus">Unmark</button></td>
                <td><button class="deleteButton">Delete</button></td>   
            </tr>`);
            }
            else {
                $('#taskTBody').append(`
            <tr data-id=${response[i].id} data-completed=${response[i].completed}>
                <td>${response[i].task}</td>
                <td>Incomplete</td>
                <td>Not done yet!</td>
                <td><button class="changeStatus">Mark as done</button></td>
                <td><button class="deleteButton">Delete</button></td>   
            </tr>`);
            }
            
        };

}

function addTask() {
    console.log($('#completedStatus').val());
    let payloadObject;
    if ($('#completedStatus').val() === 'true') {
        payloadObject = {
            task: $('#task').val(),
            completed: $('#completedStatus').val(),
            timestamp: Date.now()
        }
    }
    else {
        
        payloadObject = {
            task: $('#task').val(),
            completed: $('#completedStatus').val(),
        }
    }
    console.log(payloadObject);
    $.ajax({
        type: 'POST',
        url: '/list',
        data: payloadObject
    }).then( function (response) {
        $('#task').val(''),
        $('#completedStatus').val(''),
        
        getTaskList();
    });
}
   
function deleteTask() {
    console.log("DELETE");
}

function changeStatus() {
    console.log("PRESTO CHANGE-O");
}
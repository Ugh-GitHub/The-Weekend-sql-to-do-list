

console.log("hello from js");

$(document).ready(onReady);

function onReady() {
    console.log("Hello from jquery");
    getTaskList();
}

function getTaskList() {
    $.ajax({
        type: 'GET',
        url: '/list'
    }).then(function (response) {
        console.log('Get got!');
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
                <td>${response[i].timestamp}</td>
                <td><button class="changeStatus">Mark as done</button></td>
                <td><button class="deleteButton">Delete</button></td>   
            </tr>`);
            }
            
        }
    });
}


   
    
  


console.log("hello from js");

let tasks = [
    {
        id: 0,
        completed: true,
        task: "Write code for demo site",
        timestamp: "2022-01-05T18:54:54.152Z",
    },
    {
        id: 1,
        completed: true,
        task: "Publish a new project",
        timestamp: "2022-01-05T18:54:54.152Z",
    },
    {
        id: 2,
        completed: false,
        task: "Fight dragons",
        timestamp: "",
    },
    {
        id: 3,
        completed: true,
        task: "Generate impressions of demo site",
        timestamp: Date(),
    }	
];

$(document).ready(onReady);

function onReady() {
    console.log("Hello from jquery");
    getTaskList();
    $('#addTask').on('click',addTask);
    $('#tableWrapper').on('click','.deleteButton',deleteTask);
    $('#tableWrapper').on('click','.changeStatus',changeStatus);
}

function getTaskList() {
    // $.ajax({
    //     type: 'GET',
    //     url: '/list'
    // }).then(function (response) {
    //     console.log('Get got!');
    //     tableAppend(response);
    // });
    tableAppend(tasks);
}

function tableAppend(response) {
    $('#taskTBody').empty();
        for (let i = 0; i < response.length; i++) {
            if ( response[i].completed ) {
                $('#taskTBody').append(`
            <tr class="completedTask" data-id=${response[i].id} data-completed=${response[i].completed}>
                <td>${response[i].task}</td>
                <td>Done!</td>
                <td>${response[i].timestamp}</td>
                <td><button data-completed="TRUE" class="changeStatus">Unmark</button></td>
                <td><button class="deleteButton">Delete</button></td>   
            </tr>`);
            }
            else {
                $('#taskTBody').append(`
            <tr data-id=${response[i].id} data-completed=${response[i].completed}>
                <td>${response[i].task}</td>
                <td>Incomplete</td>
                <td>Not done yet!</td>
                <td><button data-completed="FALSE" class="changeStatus">Mark as done</button></td>
                <td><button class="deleteButton">Delete</button></td>   
            </tr>`);
            }
            
        };

}

function addTask() {
    console.log($('#completedStatus').val());
    let payloadObject;
    const ids = tasks.map(object => {return object.id});
    const idMax = Math.max(...ids) + 1;
    console.log(typeof $('#completedStatus').val());
    // Relied on the database to provide id in the past
    // Need to replace this functionality
    // Probably go with something that checks what the maximum id is in the array of objects, returns idMax
    // Assigns (idMax + 1) to new task object
    if ($('#completedStatus').val() === 'true') {
        payloadObject = {
            id: idMax,
            task: $('#task').val(),
            completed: true,
            timestamp: Date(),
        }
    }
    else {
        payloadObject = {
            id: idMax,
            task: $('#task').val(),
            completed: false,
            timestamp: "Not done yet!",
        }
    }
    tasks.push(payloadObject);
    getTaskList(tasks);
    
    // let payloadObject;
    // if ($('#completedStatus').val() === 'true') {
    //     payloadObject = {
    //         task: $('#task').val(),
    //         completed: $('#completedStatus').val(),
    //         timestamp: Date(),
    //     }
    // }
    // else {
        
    //     payloadObject = {
    //         task: $('#task').val(),
    //         completed: $('#completedStatus').val(),
    //         timestamp: "",
    //     }
    // }
    // console.log(payloadObject);
    // $.ajax({
    //     type: 'POST',
    //     url: '/list',
    //     data: payloadObject
    // }).then( function (response) {
    //     $('#task').val('');
        
    //     getTaskList();
    // });
}
   
function deleteTask() {
    
    let taskId = $(this).closest('tr').data('id');
    console.log("DELETE", taskId);
    tasks = tasks.filter(task => task.id !== taskId);
    console.log(tasks);
    getTaskList(tasks);


    // let taskId = $(this).closest('tr').data('id');
//     $.ajax({
//         method: 'DELETE',
//         url: `/list/delete/${taskId}`,
//     }).then( function (response) {
//         getTaskList();
//         console.log(response); 
//     }).catch(function (error) {
//         console.log('error',error);
//     });
}

function changeStatus() {
    console.log("PRESTO CHANGE-O");
    let completed = $(this).closest('tr').data('completed');
    let taskId = $(this).closest('tr').data('id');
    console.log("Status",completed,"task id",taskId);
    if (tasks[taskId].completed === true) {
        tasks[taskId].completed = false;
    }
    else {
        tasks[taskId].completed = true;
        tasks[taskId].timestamp = Date();
    }
    getTaskList(tasks);

    // jQuery.ajax({
    //     type: 'PUT',
    //     url: `/list/completed/${taskId}`,
    //     data: {completed: completed}
    // }).then(function (response) {
    //     console.log('response', response);
    //     getTaskList();
    // }).catch(function(error) {
    //     console.log('error', error);
    // });
}
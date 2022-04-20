(function(){
    const buttons = document.querySelectorAll('.counterButton')
    let count = 0;

    //add event listeners and functionality to each button
    buttons.forEach(function(button){
        button.addEventListener('click', function(){
            if (button.classList.contains('prevBtn')) {
                count--
            } else if (button.classList.contains('counterButton')){
                count++
            }

            //selects counter text
            const counter = document.querySelector('#counter')
            counter.textContent = count
            
            if (count < 0) {
                counter.getElementsByClassName.color = 'green'
            } else if (count > 0) {
                counter.getElementsByClassName.color = 'red'
            } else {
                counter.getElementsByClassName.color = '#3333333'
            }
        })
    })
})()

//create array for tasks to be held inside
var tasks = [];

//task status enum
var taskStatus = {
    active: 'active',
    completed: 'completed'
};

//task constructor function
function Task (id, name, status)    {
    this.id = id;
    this.name = name;
    this.status = status;
}

//creates new task element to add to DOM
function addTaskElement (task) {
    //creates elements
    var listElement = document.getElementById('active-list');
    var taskElement = document.createElement('li');
    var textElement = document.createTextNode(task.name);

    //set attributes
    taskElement.setAttribute('id', task.id);

    //add text to task element
    taskElement.appendChild(textElement);

    //add task element to list
    listElement.appendChild(taskElement);
}

//click handler to add new task
function addTask (event) {
    var inputElement = document.getElementById('input-task');
    if (inputElement.value != "")   {
        //create a unique id
        var id = 'item' + tasks.length;

        //create a new task
        var task = new Task(id, inputElement.value, taskStatus.active)
        tasks.push(task);

        //add task to DOM
        addTaskElement(task);

        //reset input value
        inputElement.value = '';
    }
}

//click handler to complete tasks
function completeTask(event) {
    //get task element
    var taskElement = event.target;
    var id = taskElement.id;

    //find corresponding task in tasks array and update status
    for (var i = 0; i < tasks.length; i ++) {
        if (tasks[i].id === id ) {
            tasks[i].status = taskStatus.completed;
            break;
        }
    }

    //move task element from active to completed list
    taskElement.remove();
    document.getElementById('completed-list').appendChild(taskElement);
}

//key press handler to automatically click add task button for enter button
function clickButton (event) {
    if (event.keyCode === 13) {
        document.getElementById('add-task').click();
    }
}

//initializes app
function init () {
    //wire up the add task button click handler 
    document.getElementById('add-task').onclick = addTask;

    //wire up task completed list item click handler
    document.getElementById('active-list').onclick = completeTask;

    //wire up task input key press handler
    document.getElementById('input-task').onkeypress = clickButton;
}

init();
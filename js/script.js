//queries for selectors for image slider
let sliderImages = document.querySelectorAll(".slide"),
arrowLeft = document.querySelector("#arrow-left"),
arrowRight = document.querySelector("#arrow-right"),
current = 0;

//clear all images
function reset() {
    for (let i = 0; i < sliderImages.length; i++) {
        sliderImages[i].style.display = "none";
    }
}

//initial slide
function startSlide() {
    reset();
    sliderImages[0].style.display = "block";
}

//show previous image
function slideLeft() {
    reset();
    sliderImages[current - 1].style.display = "block";
    current--;
}

//show next image
function slideRight() {
    reset();
    sliderImages[current + 1].style.display = "block";
    current++;
}

//left arrow click event handler
arrowLeft.addEventListener("click", function () {
    if (current === 0) {
        current = sliderImages.length;
    }
    slideLeft();}
);

//right arrow click event handler
arrowRight.addEventListener("click", function () {
    if (current === sliderImages.length - 1) {
        current = -1;
    }
    slideRight();}
);

startSlide();

//create array of quotes
var quotes = [
    '"Forefathers one and all! Bear witness!" - Godrick the Grafted',
    '"Join the Serpent King as Family. Together, we shall devour the very Gods!" - Rykard, Lord of Blasphemy',
    '"I could never betray her, no matter what happens. Ranni, she needs me..." - Blaidd, the Half Wolf',
    '"I am Malenia, blade of Miquella. And I have never known defeat." - Malenia, blade of Miquella',
    '"I was able to live as my own person, if only in passing." -Millicent',
    '"I have given thee courtesy enough. Now I fight as Hoarah Loux, WARRIOR!" -Hoarah Loux',
    '"Well then, shall we? My dear consort eternal." -Ranni the Witch',
    '"Have it writ upon thy meagre grave: Felled by Morgott, last of all kings!" -Morgott the Omen King'
]

//generates random quote
function newQuote() {
    var randomNumber = Math.floor(Math.random() * (quotes.length));
    document.getElementById('randomQuote').innerHTML = quotes[randomNumber];
}

//function for counter button
(function(){
    const buttons = document.querySelectorAll('.counterButton')
    let count = 0;

    //add event listeners and functionality to each button
    buttons.forEach(function(button){
        button.addEventListener('click', function(){
            if (button.classList.contains('counterButton')) {
                count++
            }

            //selects counter text
            const counter = document.querySelector('#counter')
            counter.textContent = count
        })
    })
})()

//create array for tasks to be held inside
//this is from one of our assignments- I added it cause I thought it was applicable
//to my website
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
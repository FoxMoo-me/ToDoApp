// Selecting elements
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const completedList = document.getElementById("completed-list"); 

// Create a button element with a click handler function.
// This function creates a button and is called later in the code 
// it takes in two arguments:
// - one is label = type of string - the word DONE&X is used later in the code
// - second one is a function = in this scenario/code the function is called:
// "handleTaskCompletion" - used later in the code.
// "handleTaskDeletion" - used later in the code.
// The reason for creting this helplfull - function below is so it can be reused later in the code
// for creating a button and inputting different arguments in it (label, clickHandler). 

function createButton(label, clickHandler) {
    const button = document.createElement('button');
    button.textContent = label;
    button.addEventListener('click', clickHandler);
    return button;
}

// Create a delete button for completed tasks
function createDeleteButton() {
    const button = document.createElement('button');
    button.textContent = '✖'; 
    // Cross symbol
    button.classList.add('delete-button');
    button.addEventListener('click', handleTaskDeletion);
    return button;
}

function handleTaskDeletion(event) {
    const listItem = event.target.parentElement; // Get the parent <li> element

    // Add delete animation
    listItem.classList.add('animate__animated', 'animate__fadeOutLeft');

    setTimeout(() => {
        listItem.remove(); // Remove the item after the animation
    }, 500); // Match the animation duration
}

function handleTaskCompletion(event) {
    const listItem = event.target.parentElement; // Get the parent <li> element

    // Add fade-out animation
    listItem.classList.add('animate__animated', 'animate__fadeOutRight');

    // Wait for the animation to complete
    setTimeout(() => {
        listItem.classList.remove('animate__fadeOutRight'); // Remove fade-out class
        listItem.classList.add('animate__fadeInUp'); // Add fade-in class for completed list

        listItem.classList.add('completed-task'); // Add class to reset styles

        // Add delete button using createButton function
        const deleteButton = createButton('✖', handleTaskDeletion);
        listItem.appendChild(deleteButton);

        completedList.appendChild(listItem); // Move the task to the completed list

        event.target.remove(); // Remove the "Completed" button
    }, 500); // Match the duration of the CSS animation
}

// Main function to add a task
function addTask(task) {
    const listItem = document.createElement('li');
    listItem.textContent = task;

     // Add animation classes to the list item
     listItem.classList.add('animate__animated', 'animate__fadeInDown');

    const button = createButton('Done', handleTaskCompletion);

    listItem.appendChild(button);
    todoList.appendChild(listItem);
}

// Add submit event listener to the form
todoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const newTask = todoInput.value.trim(); // Trim whitespace

    // Check if input is empty
    if (newTask === '') {
        alert('Please enter a task!');
        return;
    }

    // Add the task to the to-do list
    addTask(newTask);

    // Clear input field
    todoInput.value = '';
});
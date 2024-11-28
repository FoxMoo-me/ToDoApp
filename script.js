// Selecting elements
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");
const completedList = document.getElementById("completed-list");

// Create a button element with a click handler
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

// Handle deletion of completed tasks
function handleTaskDeletion(event) {
    const listItem = event.target.parentElement; 
    // Get the parent <li> element
    listItem.remove(); 
    // Remove the task from the completed list
}


// Handle task completion
function handleTaskCompletion(event) {
    const listItem = event.target.parentElement; 
    // Get the parent <li> element

    listItem.classList.add("fade-out");
    //add the fade-out class

    // Wait for the animation to complete (0.5s) before moving the task
    setTimeout(() => {
        listItem.classList.remove('fade-out'); 
        // Remove fade-out class

        listItem.classList.add('completed-task'); 
        // Add class to reset styles

        // Add a delete button to the completed task
        const deleteButton = createDeleteButton();
        listItem.appendChild(deleteButton);

        completedList.appendChild(listItem); 
        // Move the task to the completed list

        event.target.remove(); 
        // Remove the "Completed" button
    }, 500); 
    // Match the duration of the CSS animation (0.5s)
}

// Main function to add a task
function addTask(task) {
    const listItem = document.createElement('li');
    listItem.textContent = task;

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
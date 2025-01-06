// Importing subtask button handler from subtask.js
import { createSubtaskButtonCell } from './subtask.js';

// References to DOM elements
const addTaskBtn = document.querySelector('#add-task-btn');
const taskInput = document.querySelector('#task');
const deadlineInput = document.querySelector('#deadline');
const statusInput = document.querySelector('#status');
const prioInput = document.querySelector('#prio');
const taskTableBody = document.querySelector('#task-table-body');

// Initialize task management
export const initTaskManager = () => {
  console.log('Initializing Task Manager...');

  // Add event listener for adding tasks
  addTaskBtn.addEventListener('click', handleAddTask);
};

// Handle adding a task
const handleAddTask = (e) => {
  e.preventDefault(); // Prevent default behavior (useful if it's in a form)

  // Create the task object
  const taskDetails = {
    task: taskInput.value.trim(),
    deadline: deadlineInput.value.trim(),
    status: statusInput.value,
    prio: prioInput.value,
  };

  const showErrorMessage = (message) => {
    alert(message);
  };

  // Validate the input
  if (!taskDetails.task || !taskDetails.deadline) {
    showErrorMessage('Please fill in all fields!');
    return;
  }

  const clearInputs = () => {
    taskInput.value = '';
    deadlineInput.value = '';
    statusInput.value = 'not-started';
    prioInput.value = 'low';
  };

  // Add the task to the table
  addTaskToTable(taskDetails);

  // Clear input fields
  clearInputs();

  console.log('Task added:', taskDetails);
};

// 2nd Function
const addTaskToTable = (taskDetails) => {
  console.log('Adding Task to Table ...', taskDetails);

  const createCell = (content) => {
    const cell = document.createElement('td');
    cell.textContent = content;
    return cell;
  };

  const row = document.createElement('tr');
  row.appendChild(createCell(taskDetails.task));
  row.appendChild(createCell(taskDetails.deadline));
  row.appendChild(createCell(taskDetails.status));
  row.appendChild(createCell(taskDetails.prio));

  // Append the 'Remove' button cell
  row.appendChild(createRemoveButtonCell(row));

  // Append the 'Add Subtask' button cell
  row.appendChild(createSubtaskButtonCell(row, taskDetails));

  taskTableBody.appendChild(row);

  console.log('Task added successfully!');
};

// Creating a 'Remove' button cell
const createRemoveButtonCell = (row) => {
  const cell = document.createElement('td');
  const removeButton = document.createElement('button');
  removeButton.className = 'btn-link text-red';

  // Creating the font awesome trashcan icon
  const trashIcon = document.createElement('i');
  trashIcon.className = 'fa-solid fa-trash-can';

  removeButton.appendChild(trashIcon);

  // Add the button to the cell
  cell.appendChild(removeButton);

  // Add click event for removing a task
  removeButton.addEventListener('click', () => {
    console.log('Removing task ...');
    row.remove();
  });

  return cell;
};

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

// New code to be able to change a task after its added
const makeRowEditable = (row) => {
	// Get all cells in the row
	const cells = row.querySelectorAll('td');
  
	// Save the original values in case of cancel
	const originalValues = [...cells].map((cell) => cell.textContent);
  
	// Replace each cell content with an input field
	cells.forEach((cell, index) => {
	  if (index < cells.length - 1) {
		const input = document.createElement('input');
		input.type = 'text';
		input.value = cell.textContent.trim();
		cell.textContent = '';
		cell.appendChild(input);
	  }
	});
  

	
	// Add Save and Cancel buttons
	const actionCell = cells[cells.length - 1];
	actionCell.innerHTML = '';
  
	const saveButton = document.createElement('button');
	saveButton.textContent = 'Save';
	saveButton.className = 'table-button';

  
	const cancelButton = document.createElement('button');
	cancelButton.textContent = 'Cancel';
	cancelButton.className = 'table-button';
	cancelButton.style.background = 'grey';
  
	actionCell.appendChild(saveButton);
	actionCell.appendChild(cancelButton);
  
	// Save Changes
	saveButton.addEventListener('click', () => {
	  cells.forEach((cell, index) => {
		if (index < cells.length - 1) {
		  const input = cell.querySelector('input');
		  cell.textContent = input.value;
		}
	  });
  
	  // Restore original buttons
	  actionCell.innerHTML = '';
	  actionCell.appendChild(createButton(row));
	});
  
	// Cancel Changes
	cancelButton.addEventListener('click', () => {
	  cells.forEach((cell, index) => {
		if (index < cells.length - 1) {
		  cell.textContent = originalValues[index];
		}
	  });
  
	  // Restore original buttons
	  actionCell.innerHTML = '';
	  actionCell.appendChild(createButton(row));
	});
  };
  
  // Add click listener to task name cells
  tableBody.addEventListener('click', (event) => {
	const target = event.target;
  
	// Check if the clicked cell is a task name
	if (target.tagName === 'TD' && target.cellIndex === 0) {
	  const row = target.parentElement;
	  makeRowEditable(row);
	}
  });
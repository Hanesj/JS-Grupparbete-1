import { createSubtaskButtonCell } from './subtask.js';

// NYTT: Deklarera alla DOM-element som let variabler först
let addTaskBtn;
let taskInput;
let deadlineInput;
let statusInput;
let prioInput;
let taskTableBody;
let tableBody;

// NYTT: Samla all initialisering i en funktion
export const initElements = () => {
  addTaskBtn = document.querySelector('#add-task-btn');
  taskInput = document.querySelector('#task');
  deadlineInput = document.querySelector('#deadline');
  statusInput = document.querySelector('#status');
  prioInput = document.querySelector('#prio');
  taskTableBody = document.querySelector('#task-table-body');
  tableBody = document.querySelector('tbody');

  // NYTT: Flytta tableBody event listener hit
  if (tableBody) {
    tableBody.addEventListener('click', (event) => {
      const target = event.target;
      if (target.tagName === 'TD' && target.cellIndex === 0) {
        const row = target.parentElement;
        makeRowEditable(row);
      }
    });
  }
};

export const initTaskManager = () => {
  console.log('Initializing Task Manager...');

  // NYTT: Initiera DOM-element först
  initElements();

  // Add event listener for adding tasks
  if (addTaskBtn) {
    // NYTT: Lägg till kontroll
    addTaskBtn.addEventListener('click', handleAddTask);
  }
};

// NYTT: Villkor för att hantera både test och produktion
if (typeof document !== 'undefined') {
  initElements();
}

export const handleAddTask = (e) => {
  e.preventDefault();

  const taskDetails = {
    task: taskInput.value.trim(),
    deadline: deadlineInput.value.trim(),
    status: statusInput.value,
    prio: prioInput.value,
  };

  if (!taskDetails.task || !taskDetails.deadline) {
    alert('Please fill in all fields!');
    return;
  }

  const clearInputs = () => {
    taskInput.value = '';
    deadlineInput.value = '';
    statusInput.value = 'not-started';
    prioInput.value = 'low';
  };

  addTaskToTable(taskDetails);
  clearInputs();
  console.log('Task added:', taskDetails);
};

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

  row.appendChild(createRemoveButtonCell(row));
  row.appendChild(createSubtaskButtonCell(row, taskDetails));

  taskTableBody.appendChild(row);
  console.log('Task added successfully!');
};

const createRemoveButtonCell = (row) => {
  const cell = document.createElement('td');
  const removeButton = document.createElement('button');
  removeButton.className = 'btn-link text-red';

  const trashIcon = document.createElement('i');
  trashIcon.className = 'fa-solid fa-trash-can';

  removeButton.appendChild(trashIcon);
  cell.appendChild(removeButton);

  removeButton.addEventListener('click', () => {
    console.log('Removing task ...');
    row.remove();
  });

  return cell;
};

const makeRowEditable = (row) => {
  const cells = row.querySelectorAll('td');
  const originalValues = [...cells].map((cell) => cell.textContent);

  cells.forEach((cell, index) => {
    if (index < cells.length - 1) {
      const input = document.createElement('input');
      input.type = 'text';
      input.value = cell.textContent.trim();
      cell.textContent = '';
      cell.appendChild(input);
    }
  });

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

  saveButton.addEventListener('click', () => {
    cells.forEach((cell, index) => {
      if (index < cells.length - 1) {
        const input = cell.querySelector('input');
        cell.textContent = input.value;
      }
    });

    actionCell.innerHTML = '';
    actionCell.appendChild(createButton(row));
  });

  cancelButton.addEventListener('click', () => {
    cells.forEach((cell, index) => {
      if (index < cells.length - 1) {
        cell.textContent = originalValues[index];
      }
    });

    actionCell.innerHTML = '';
    actionCell.appendChild(createButton(row));
  });
};

// Initiera Task Manager när dokumentet är klart
if (typeof document !== 'undefined') {
  initTaskManager();
}

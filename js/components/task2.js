// DOM Elements
let taskInput, deadlineInput, statusInput, prioInput, tableBody, inputRow;

// Initialize all DOM elements
const initializeElements = () => {
  taskInput = document.querySelector('#task');
  deadlineInput = document.querySelector('#deadline');
  statusInput = document.querySelector('#status');
  prioInput = document.querySelector('#prio');
  tableBody = document.querySelector('#task-table-body');
  inputRow = document.querySelector('#inputRow');
};

// Create a button element with given properties
const createButton = (text, className, bgColor, clickHandler) => {
  const button = document.createElement('button');
  button.textContent = text;
  button.className = className;
  if (bgColor) button.style.background = bgColor;
  if (clickHandler) button.addEventListener('click', clickHandler);
  return button;
};

// Create a cell with given content
const createCell = (content, isInput = false) => {
  const cell = document.createElement('td');
  if (isInput) {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = '';
    input.className = 'subtask-input';
    cell.appendChild(input);
  } else {
    cell.textContent = content;
  }
  return cell;
};

// Create a subtask row
const createSubtaskRow = (parentRow) => {
  const subtaskRow = document.createElement('tr');
  subtaskRow.className = 'subtask-row';

  // Task input cells
  subtaskRow.appendChild(createCell('', true)); // Task input

  // Create + button cell
  const plusCell = document.createElement('td');
  const plusButton = createButton('+', 'table-button', '#E88437');
  plusCell.appendChild(plusButton);
  subtaskRow.appendChild(plusCell);

  subtaskRow.appendChild(createCell('', true)); // Deadline input
  subtaskRow.appendChild(createCell('', true)); // Status input
  subtaskRow.appendChild(createCell('', true)); // Priority input

  // Add action buttons cell
  const actionCell = document.createElement('td');

  // Save button
  const saveButton = createButton('Save', 'table-button', '#4CAF50', () => {
    const inputs = subtaskRow.querySelectorAll('input');
    const values = Array.from(inputs).map((input) => input.value);

    if (values.some((value) => !value)) {
      alert('Please fill in all fields for the subtask');
      return;
    }

    // Convert input row to regular row
    const cells = subtaskRow.querySelectorAll('td');
    cells.forEach((cell, index) => {
      if (index !== 1 && cell.querySelector('input')) {
        // Skip the '+' cell
        const input = cell.querySelector('input');
        cell.textContent = input.value;
      }
    });

    // Replace save/cancel buttons with remove button
    actionCell.innerHTML = '';
    actionCell.appendChild(
      createButton('Remove', 'table-button', 'red', () => subtaskRow.remove())
    );
  });

  // Cancel button
  const cancelButton = createButton('Cancel', 'table-button', 'grey', () =>
    subtaskRow.remove()
  );

  actionCell.appendChild(saveButton);
  actionCell.appendChild(cancelButton);
  subtaskRow.appendChild(actionCell);

  // Insert subtask row after parent row
  parentRow.insertAdjacentElement('afterend', subtaskRow);
};

// Initialize the module
const initializeTaskManager = () => {
  initializeElements();

  // Add event delegation for the table body to handle '+' button clicks
  if (tableBody) {
    tableBody.addEventListener('click', (event) => {
      const target = event.target;
      if (target.tagName === 'BUTTON' && target.textContent === '+') {
        const row = target.closest('tr');
        createSubtaskRow(row);
      }
    });
  }
};

// Initialize if we're in a browser environment
if (typeof document !== 'undefined') {
  initializeTaskManager();
}

// Export functions that might be needed by other modules
export { initializeTaskManager };

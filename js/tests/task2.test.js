import { describe, beforeEach, test, expect } from 'vitest';

describe('Task Manager Tests', () => {
  let btn, taskInput, deadlineInput, statusInput, prioInput, tableBody;

  // Set up the DOM structure before each test
  beforeEach(() => {
    document.body.innerHTML = `
      <button id="submitBtn">Submit</button>
      <input id="task" />
      <input id="deadline" />
      <select id="status">
        <option value="Not Started">Not Started</option>
        <option value="In Progress">In Progress</option>
      </select>
      <select id="prio">
        <option value="Low">Low</option>
        <option value="High">High</option>
      </select>
      <table>
        <tbody id="task-table-body"></tbody>
      </table>
    `;

    // Re-select the DOM elements after resetting the body
    btn = document.querySelector('#submitBtn');
    taskInput = document.querySelector('#task');
    deadlineInput = document.querySelector('#deadline');
    statusInput = document.querySelector('#status');
    prioInput = document.querySelector('#prio');
    tableBody = document.querySelector('#task-table-body');

    // Add click event listener to the button
    btn.addEventListener('click', addTask);
  });

  // Function to create a table row and append it to the table body
  const createRow = (values) => {
    const row = document.createElement('tr');
    Object.values(values).forEach((value) => {
      const cell = document.createElement('td');
      cell.textContent = value;
      row.appendChild(cell);
    });
    tableBody.appendChild(row);
  };

  // Function to add a task (called when the submit button is clicked)
  const addTask = () => {
    const allInput = {
      Task: taskInput.value,
      Deadline: deadlineInput.value,
      Status: statusInput.value,
      Prio: prioInput.value,
    };

    createRow(allInput);

    // Reset input fields after task is added
    taskInput.value = '';
    deadlineInput.value = '';
    statusInput.selectedIndex = 0;
    prioInput.selectedIndex = 0;
  };

  // The actual test to check if the row is added to the table body
  test('should add a row to the table body when task is submitted', () => {
    // Arrange: Set values for input fields
    taskInput.value = 'Test Task';
    deadlineInput.value = '2025-01-14';
    statusInput.value = 'In Progress';
    prioInput.value = 'High';

    // Act: Trigger the click event on the submit button
    btn.click();

    // Assert: Check that a row was added to the table body
    const rows = tableBody.querySelectorAll('tr');
    expect(rows.length).toBe(1); // Expect 1 row to be added

    // Check that each cell contains the correct value
    expect(rows[0].cells[0].textContent).toBe('Test Task');
    expect(rows[0].cells[1].textContent).toBe('2025-01-14');
    expect(rows[0].cells[2].textContent).toBe('In Progress');
    expect(rows[0].cells[3].textContent).toBe('High');
  });
});

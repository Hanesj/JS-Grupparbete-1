// Creating the 'Add Subtask' button cell
export const createSubtaskButtonCell = (taskRow, taskDetails) => {
  const cell = document.createElement('td');
  const subTaskButton = document.createElement('button');
  subTaskButton.className = 'btn-link text-blue';
  subTaskButton.textContent = 'Add Subtask';

  cell.appendChild(subTaskButton);

  // Handle click event to add a subtask
  subTaskButton.addEventListener('click', () => {
    console.log('Adding subtask for:', taskDetails.task);
    handleAddSubtask(taskRow, taskDetails);
  });

  return cell;
};

// Handle adding a subtask
const handleAddSubtask = (taskRow, taskDetails) => {
  const subtaskForm = document.createElement('div');
  subtaskForm.className = 'subtask-form';

  subtaskForm.innerHTML = `
    <input type="text" placeholder="Subtask" class="subtask-input" required />
    <input type="date" class="subtask-deadline" required />
    <select class="subtask-status">
      <option value="not-started">Not Started</option>
      <option value="in-progress">In Progress</option>
      <option value="completed">Completed</option>
    </select>
    <button class="add-subtask-confirm-btn">Add Subtask</button>
  `;

  taskRow.after(subtaskForm);

  // Handle subtask confirmation
};

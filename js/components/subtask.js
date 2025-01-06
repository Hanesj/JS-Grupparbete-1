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
  subtaskForm
    .querySelector('.add-subtask-confirm-btn')
    .addEventListener('click', (e) => {
      e.preventDefault();

      const subtaskDetails = {
        subtask: subtaskForm.querySelector('.subtask-input').value.trim(),
        deadline: subtaskForm.querySelector('.subtask-deadline').value.trim(),
        status: subtaskForm.querySelector('.subtask-status').value,
      };

      // Error if subtask field not filled in ...
      if (!subtaskDetails.subtask || !subtaskDetails.deadline) {
        alert('Please fill in all subtask fields!');
        return;
      }

      // Create the subtask row ...
      const subtaskRow = document.createElement('tr');
      subtaskRow.className = 'subtask-row';

      // Create subtask details cell ...
      const subtaskCell = document.createElement('td');
      subtaskCell.colSpan = 4;
      subtaskCell.textContent = `↳ ${subtaskDetails.subtask} (Deadline: ${subtaskDetails.deadline}, Status: ${subtaskDetails.status})`;

      // Create the trashcan button cell ...
      const removeButtonCell = document.createElement('td');
      const removeButton = createSubtaskRemoveButton(subtaskRow);
      removeButtonCell.appendChild(removeButton);

      // Append cells to the row
      subtaskRow.appendChild(subtaskCell);
      subtaskRow.appendChild(removeButtonCell);

      taskRow.after(subtaskRow);

      // Remove the subtask form ...
      subtaskForm.remove();

      console.log('Subtask added:', subtaskDetails);
    });
};

// Creating the "Remove Subtask" button ...
const createSubtaskRemoveButton = (subtaskRow) => {
  const removeButton = document.createElement('button');
  removeButton.className = 'btn-link text-red'; // Style the button

  const trashIcon = document.createElement('i');
  trashIcon.className = 'fa-solid fa-trash-can'; // Font Awesome trashcan icon

  removeButton.appendChild(trashIcon);

  // Add click event to remove the subtask
  removeButton.addEventListener('click', () => {
    console.log('Removing subtask...');
    subtaskRow.remove();
    console.log('Subtask removed successfully!');
  });

  return removeButton;
};

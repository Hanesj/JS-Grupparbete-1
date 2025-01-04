// Function to initialize task management ...
export function initTaskManager() {
  // Getting the references to the DOM elements ...
  const addTaskBtn = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task');
  const deadlineInput = document.getElementById('deadline');
  const statusInput = document.getElementById('status');
  const prioInput = document.getElementById('prio');

  // Add task - button ...
  addTaskBtn.addEventListener('click', () => {
    // Creating the task object ...
    const taskDetails = {
      task: taskInput.value,
      deadline: deadlineInput.value,
      status: statusInput.value,
      prio: prioInput.value,
    };

    // Validating the input ...
    if (!taskDetails.task || !taskDetails.deadline) {
      alert('Please fill in all fields!');
      return;
    }

    // Add the task to the table ...
    addTaskToTable(taskDetails);

    taskInput.value = '';
    deadlineInput.value = '';
    statusInput.value = 'not-started';
    prioInput.value = 'low';
  });
}

// Function Nr.2
function addTaskToTable(taskDetails) {
  console.log('Adding Task to Table ...');
  return;
}

document.addEventListener("DOMContentLoaded", function () {
  const taskTableBody = document.querySelector("tbody");
  const addButton = document.querySelector("table tfoot button");
  const taskInput = document.getElementById("task");
  const deadlineInput = document.getElementById("deadline");
  const statusInput = document.getElementById("status");
  const prioInput = document.getElementById("prio");

  // Add a new task when the "Add Task" button is clicked
  addButton.addEventListener("click", function (event) {
    event.preventDefault();

    if (!taskInput.value.trim() || !deadlineInput.value || !statusInput.value || !prioInput.value) {
      alert("Please fill in all fields.");
      return;
    }

    addTaskRow(taskInput.value.trim(), deadlineInput.value, statusInput.value, prioInput.value);

    taskInput.value = "";
    deadlineInput.value = "";
    statusInput.value = "not-started";
    prioInput.value = "low";
  });

  // Function to add a main task row with a subtask container
  function addTaskRow(task, deadline, status, prio) {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${task}</td>
      <td>${deadline}</td>
      <td>${capitalizeWords(status)}</td>
      <td>${capitalizeWords(prio)}</td>
      <td>
        <button class="remove-btn">X</button>
        <button class="add-subtask-btn">+</button>
      </td>
    `;

    taskTableBody.appendChild(row);

    const subtaskRow = document.createElement("tr");
    subtaskRow.classList.add("subtask-container", "hidden");
    subtaskRow.innerHTML = `
      <td colspan="5">
        <div>
          <input type="text" class="subtask-input" placeholder="Add subtask..." />
          <button class="add-subtask-action-btn">Add Subtask</button>
        </div>
        <ul class="subtask-list"></ul>
      </td>
    `;

    taskTableBody.appendChild(subtaskRow);

    row.querySelector(".remove-btn").addEventListener("click", function () {
      row.remove();
      subtaskRow.remove();
    });

    row.querySelector(".add-subtask-btn").addEventListener("click", function () {
      toggleSubtaskContainer(subtaskRow);
    });
  }

  // Function to toggle the visibility of the subtask container
  function toggleSubtaskContainer(container) {
    container.classList.toggle("hidden");
  }

  // Function to add a subtask to the specific task
  taskTableBody.addEventListener("click", function (event) {
    if (event.target.classList.contains("add-subtask-action-btn")) {
      const subtaskContainer = event.target.closest(".subtask-container");
      const input = subtaskContainer.querySelector(".subtask-input");
      const subtaskList = subtaskContainer.querySelector(".subtask-list");

      const subtaskValue = input.value.trim();
      if (!subtaskValue) {
        alert("Please enter a valid subtask.");
        return;
      }

      const subtaskItem = document.createElement("li");
      subtaskItem.innerHTML = `
        ${subtaskValue}
        <button class="remove-subtask-btn">Remove</button>
      `;

      subtaskList.appendChild(subtaskItem);
      input.value = "";
    }

    if (event.target.classList.contains("remove-subtask-btn")) {
      event.target.closest("li").remove();
    }
  });

  // Utility function to capitalize words
  function capitalizeWords(str) {
    return str
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
});

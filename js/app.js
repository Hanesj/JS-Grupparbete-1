document.addEventListener("DOMContentLoaded", function () {
  // References to DOM elements
  const taskTableBody = document.querySelector("tbody");
  const addButton = document.querySelector("table button");
  const taskInput = document.getElementById("task");
  const deadlineInput = document.getElementById("deadline");
  const statusInput = document.getElementById("status");
  const prioInput = document.getElementById("prio");

  // Event listener for the "Add" button
  addButton.addEventListener("click", function (event) {
    event.preventDefault();

    // Validate input fields
    if (!taskInput.value.trim() || !deadlineInput.value || !statusInput.value || !prioInput.value) {
      alert("Please fill in all fields.");
      return;
    }

    // Add a new row to the table
    addTaskRow(taskInput.value.trim(), deadlineInput.value, statusInput.value, prioInput.value);

    // Reset input fields
    taskInput.value = "";
    deadlineInput.value = "";
    statusInput.value = "not-started";
    prioInput.value = "low";
  });

  // Function to add a new task row
  function addTaskRow(task, deadline, status, prio) {
    const row = document.createElement("tr");

    // Populate the row with data and the "Remove" button
    row.innerHTML = `
      <td>${task}</td>
      <td>${deadline}</td>
      <td>${capitalizeWords(status)}</td>
      <td>${capitalizeWords(prio)}</td>
      <td>
        <button class="remove-btn">X</button>
      </td>
    `;

    // Append the new row to the body
    taskTableBody.appendChild(row);

    // Add event listener for the "Remove" button
    row.querySelector(".remove-btn").addEventListener("click", function () {
      row.remove();
    });
  }

  // Utility function to capitalize words (e.g., "not-started" -> "Not Started")
  function capitalizeWords(str) {
    return str
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  // Example tasks
  const exampleTasks = [
    { task: "Legalisera", deadline: "2025-05-10", status: "in-progress", prio: "high" },
    { task: "Börjar i skolan", deadline: "2025-05-15", status: "not-started", prio: "medium" },
  ];

  // Populate the table with example tasks
  exampleTasks.forEach(task => addTaskRow(task.task, task.deadline, task.status, task.prio));
});

const btn = document.querySelector('#submitBtn');

const taskInput = document.querySelector('#task');
const deadlineInput = document.querySelector('#deadline');
const statusInput = document.querySelector('#status');
const prioInput = document.querySelector('#prio');
const tableBody = document.querySelector('tbody');
const inputRow = document.querySelector('#inputRow');

const addTask = () => {
	const allInput = {
		Task: taskInput.value,
		Deadline: deadlineInput.value,
		Status: statusInput.value,
		Prio: prioInput.value,
	};
	task = console.log(allInput);
	createRow(allInput);

	allInput.value = {};
};
const createButton = (row) => {
	const button = document.createElement('button');
	button.textContent = 'Remove';
	button.className = 'table-button';
	button.style.background = 'red';
	button.style.borderRadius = 0;

	button.addEventListener('click', () => tableBody.removeChild(row));
	return button;
};

const createRow = (values) => {
	const row = document.createElement('tr');
	for (const [key, value] of Object.entries(values)) {
		if (value === '') {
			alert(`${key} cant be empty.`);
			return;
		} else {
			const cell = document.createElement('td');
			cell.appendChild(document.createTextNode(value));
			row.appendChild(cell);
		}
	}
	btnCell = document.createElement('td');
	btnCell.appendChild(createButton(row));

	row.appendChild(btnCell);
	//row.appendChild(c1);
	tableBody.insertBefore(row, inputRow);
};

btn.addEventListener('click', () => addTask(taskInput));

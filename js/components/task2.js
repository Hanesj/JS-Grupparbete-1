//import { subTask } from './subtask2';

const btn = document.querySelector('#submitBtn');

const testCase = document.querySelector('#testCase');

const taskInput = document.querySelector('#task');
const deadlineInput = document.querySelector('#deadline');
const statusInput = document.querySelector('#status');
const prioInput = document.querySelector('#prio');
const tableBody = document.querySelector('tbody');
const inputRow = document.querySelector('#inputRow');
const subTask = document.querySelector('#subTask');

// Initilize the app
const initApp = () => {
	const tasks = getFromStorage();
	tasks.forEach((item) => createRow(item));
};

//Subtask input vars

// Klonar inputs för subtask rows ...
const sTask = taskInput.cloneNode(true);
const sDeadline = deadlineInput.cloneNode(true);
const sStatus = statusInput.cloneNode(true);
const sPrio = prioInput.cloneNode(true);
const sBtn = btn.cloneNode(true);
const inputRowClone = inputRow.cloneNode(true);

// Lägger till task till table ...
const addTask = () => {
	//task = console.log(allInput);
	const allInput = {
		Task: taskInput.value,
		Deadline: deadlineInput.value,
		Status: statusInput.value,
		Prio: prioInput.value,
	};
	createRow(allInput);

	const hasEmptyFields = Object.values(allInput).some(
		(value) => value === ''
	);

	if (!hasEmptyFields) {
		// Add the task to storage
		addToStorage(allInput);
	}

	allInput.value = {};
	taskInput.value = '';
	//console.log(statusInput);
	statusInput.selectedIndex = 0;
	prioInput.selectedIndex = 1;
	deadlineInput.value = '';
};

// Skapar button för att ta bort row ...
const createButton = (row, values) => {
	const button = document.createElement('button');
	button.textContent = 'Remove';
	button.className = 'table-button';
	button.style.background = 'red';
	button.style.borderRadius = 0;

	button.addEventListener('click', () => {
		tableBody.removeChild(row);
		if (values) {
			removeFromStorage(values);
		}
	});
	return button;
};

const createSubTaskBtn = () => {
	//-------------------- Forsatt har-------------//
	const button = document.createElement('button');
	button.textContent = '+';
	button.className = 'table-button';
	button.style.background = '#E88437';
	button.addEventListener('click', createSubTaskRow);
	return button;
};

const createSubTaskRow = (row) => {
	//console.log(row.target.parentElement.parentElement);
	tableBody.querySelector('#inputRow').style.display = 'none';
	const newRow = document.createElement('tr');
	const tCell = document.createElement('td');
	tCell.appendChild(sTask);
	newRow.appendChild(tCell);

	const sbtnCell = document.createElement('td');
	sbtnCell.appendChild(document.createTextNode(''));
	newRow.appendChild(sbtnCell);

	newRow.style.background = '#E88437';
	const dCell = document.createElement('td');
	dCell.appendChild(sDeadline);
	newRow.appendChild(dCell);

	const sCell = document.createElement('td');
	sCell.appendChild(sStatus);
	newRow.appendChild(sCell);

	const pCell = document.createElement('td');
	pCell.appendChild(sPrio);
	newRow.appendChild(pCell);

	const aCell = document.createElement('td');

	aCell.appendChild(sBtn);
	newRow.appendChild(aCell);

	//for (elem of newRow.childNodes) {
	//const cell = document.createElement('td');
	//cell.appendChild(elem);
	//row.appendChild(cell);
	//}

	newRow.setAttribute = `id = row${newRow.rowIndex}`;
	//tableBody.insertBefore(newRow, newRow.previousSibling);
	tableBody.insertBefore(
		newRow,
		row.target.parentElement.parentElement.nextSibling
	);
};

const addSubTask = (e) => {
	//console.log(e.target.parentElement.parentElement);
	const newRow = document.createElement('tr');
	const subAllInput = {
		Task: sTask.value,
		Deadline: sDeadline.value,
		Status: sStatus.value,
		Prio: sPrio.value,
	};
	for (const [key, value] of Object.entries(subAllInput)) {
		if (key === 'Deadline') {
			subBtnCell = document.createElement('td');
			subBtnCell.appendChild(document.createTextNode('subtask'));
			newRow.appendChild(subBtnCell);
		}
		if (value === '') {
			alert(`${key} cant be empty.`);
			return;
		} else {
			const cell = document.createElement('td');
			cell.appendChild(document.createTextNode(value));
			newRow.appendChild(cell);
		}
		subAllInput.value = {};
		sTask.value = '';
		//console.log(statusInput);
		sStatus.selectedIndex = 0;
		sPrio.selectedIndex = 1;
		sDeadline.value = '';
	}

	btnCell = document.createElement('td');

	btnCell.appendChild(createButton(newRow, subAllInput));
	newRow.appendChild(btnCell);
	tableBody.insertBefore(
		newRow,
		e.target.parentElement.parentElement.nextSibling
	);
	//newRow.previousSibling.remove();

	newRow.style.background = '#6c3bb4';

	//newRow.subBtnCell.value =
	//newRow.previousSibling.previousSibling.previousSibling.textContent;
	//	console.log(
	//		newRow.previousSibling.previousSibling.previousSibling.childNodes[0]
	//			.textContent
	//	);
	//console.log(tableBody);

	e.target.parentElement.parentElement.remove();

	//	const hasEmptyFields = Object.values(subAllInput).some(
	//		(value) => value === ''
	//	);
	//
	//	if (!hasEmptyFields) {
	//		// Add the task to storage
	//		addToStorage(subAllInput);
	//	}
	//
	inputRow.style.display = '';
	tableBody.appendChild(inputRow);
};

// Skapar ny rad fran addtask med input fran huvudinputraden.
const createRow = (values) => {
	const row = document.createElement('tr');

	//const subTaskbtn = createSubTaskBtn(row);
	for (const [key, value] of Object.entries(values)) {
		if (key === 'Deadline') {
			subBtnCell = document.createElement('td');
			subBtnCell.appendChild(createSubTaskBtn(row));
			row.appendChild(subBtnCell);
		}
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

	btnCell.appendChild(createButton(row, values));
	row.appendChild(btnCell);
	tableBody.insertBefore(row, inputRow);
};
//btn.addEventListener('click', () => addTask());
btn.addEventListener('click', addTask);
//testCase.addEventListener('click', () => createSubTask(newRow));
sBtn.addEventListener('click', addSubTask);
//tableBody.addEventListener('click', createSubRow);

// New code to be able to change a task after its added
const makeRowEditable = (row) => {
	// Get all cells in the row

	if (document.querySelector('#inputRow') === row) {
		return;
	}
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

	const removeTaskObject = {
		Task: originalValues[0],
		Deadline: originalValues[2],
		Status: originalValues[3],
		Prio: originalValues[4],
	};

	const keys = ['Task', '+', 'Deadline', 'Status', 'Prio'];

	let inputData = [];

	// Save Changes
	saveButton.addEventListener('click', () => {
		cells.forEach((cell, index) => {
			if (index < cells.length - 1) {
				const input = cell.querySelector('input');

				if (input && input.value === '') {
					const key = keys[index];

					alert(`${key} cant be empty.`);
					cell.textContent = originalValues[index];

					return;
				} else {
					cell.textContent = input.value;
					inputData.push(input.value);
				}
			}
		});

		const taskObject = {
			Task: inputData[0],
			Deadline: inputData[2],
			Status: inputData[3],
			Prio: inputData[4],
		};

		// Checks for empty string values
		const hasEmptyFields = Object.values(taskObject).some(
			(value) => value === '' || value === '+'
		);

		console.log('hasEmptyFields', hasEmptyFields);

		if (!hasEmptyFields) {
			removeFromStorage(removeTaskObject);
			addToStorage(taskObject);
		}

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

// For initilizing the app with tasks from storage
document.addEventListener('DOMContentLoaded', initApp);

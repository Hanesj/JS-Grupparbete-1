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

//Subtask input vars

// Klonar inputs för subtask rows ...
const sBtn = btn ? btn.cloneNode(true) : null;
const sTask = taskInput ? taskInput.cloneNode(true) : null;
const sDeadline = deadlineInput ? deadlineInput.cloneNode(true) : null;
const sStatus = statusInput ? statusInput.cloneNode(true) : null;
const sPrio = prioInput ? prioInput.cloneNode(true) : null;

// Kontrollera om kloningen misslyckades
if (!sTask || !sDeadline || !sStatus || !sPrio) {
	console.error('Ett eller flera inputfält kunde inte klonas.');
}
// Lägger till task till table ...
export const addTask = () => {
	//task = console.log(allInput);
	const allInput = {
		Task: taskInput.value,
		Deadline: deadlineInput.value,
		Status: statusInput.value,
		Prio: prioInput.value,
	};
	createRow(allInput);

	allInput.value = {};
	taskInput.value = '';
	//console.log(statusInput);
	statusInput.selectedIndex = 0;
	prioInput.selectedIndex = 1;
	deadlineInput.value = '';
};

// Skapar button för att ta bort row ...
const createButton = (row) => {
	const button = document.createElement('button');
	button.textContent = 'Remove';
	button.className = 'table-button';
	button.style.background = 'red';
	button.style.borderRadius = 0;

	button.addEventListener('click', () => tableBody.removeChild(row));
	return button;
};

const createSubTaskBtn = (row) => {
	//-------------------- Forsatt har-------------//
	const button = document.createElement('button');
	button.textContent = '+';
	button.className = 'table-button';
	button.style.background = '#E88437';
	button.addEventListener('click', () => createSubTask(row));
	return button;
};

// Valja ratt rad
const createSubTask = (row) => {
	const newRow = document.createElement('tr');
	const inputCell = document.createElement('td');
	const addSubCell = document.createElement('td');
	const deadlineCell = document.createElement('td');
	const statusCell = document.createElement('td');
	const prioCell = document.createElement('td');
	const buttonCell = document.createElement('td');
	//const input = document.createElement('input');

	buttonCell.appendChild(sBtn);

	const addMoreSubtask = document.createElement('td');
	addMoreSubtask.appendChild(createSubTaskBtn(row));

	inputCell.appendChild(sTask);
	newRow.appendChild(inputCell);

	addSubCell.appendChild(addMoreSubtask);
	newRow.appendChild(addSubCell);

	deadlineCell.appendChild(sDeadline);
	newRow.appendChild(deadlineCell);

	statusCell.appendChild(sStatus);
	newRow.appendChild(statusCell);

	prioCell.appendChild(sPrio);
	newRow.appendChild(prioCell);

	newRow.appendChild(buttonCell);

	tableBody.insertBefore(newRow, row.nextSibling);
	console.log(newRow.cells.length);
	return row;

	//tableBody.insertAdjacentElement(row, newRow);
	/*if (newRow.rowIndex % 2 == 0) {
		newCell.className = 'subba1';
	} else {
		newCell.className = 'subba2';
	}
*/ //console.log(newRow.rowIndex);
};

export const createRow = (values) => {
	const row = document.createElement('tr');
	//const subTaskbtn = createSubTaskBtn(row);
	for (const [key, value] of Object.entries(values)) {
		if (key === 'Deadline') {
			const subBtnCell = document.createElement('td');
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
	const btnCell = document.createElement('td');

	btnCell.appendChild(createButton(row));
	row.appendChild(btnCell);
	if (inputRow !== null) {
		tableBody.insertBefore(row, inputRow);
	} else {
		tableBody.lastChild = inputRow;
	}
};
const createSubRow = (e) => {
	const subAllInput = {
		Task: sTask.value,
		Deadline: sDeadline.value,
		Status: sStatus.value,
		Prio: sPrio.value,
	};
	const row = document.createElement('tr');
	//tableBody.removeChild(e);
	//	const newRow = document.createElement('tr');

	for (const [key, value] of Object.entries(subAllInput)) {
		if (key === 'Deadline') {
			const subBtnCell = document.createElement('td'); //Commented out by Max, trial and error
			subBtnCell.appendChild(createSubTaskBtn(row));
			row.appendChild(subBtnCell);
		}
		if (value === '') {
			//alert(`${key} cant be empty.`);
			//return;
		} else {
			const cell = document.createElement('td');
			cell.appendChild(document.createTextNode(value));
			row.appendChild(cell);
		}
		const btnCell = document.createElement('td');

		btnCell.appendChild(createButton(row));

		row.appendChild(btnCell);
		tableBody.insertBefore(row, row.nextSibling);
	}
};

/*const createSubTask = (row, task) => {
	const subTaskCell = document.createElement('td');
	row.appendChild(subTaskCell);
};*/

//btn.addEventListener('click', () => addTask());
// New code to be able to change a task after its added
const makeRowEditable = (row) => {
	// Get all cells in the row
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

	// Save Changes
	saveButton.addEventListener('click', () => {
		cells.forEach((cell, index) => {
			if (index < cells.length - 1) {
				const input = cell.querySelector('input');
				cell.textContent = input.value;
			}
		});

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

document.addEventListener('DOMContentLoaded', () => {
	// Add click listener to task name cells
	tableBody.addEventListener('click', (event) => {
		const target = event.target;

		// Check if the clicked cell is a task name
		if (target.tagName === 'TD' && target.cellIndex === 0) {
			const row = target.parentElement;
			makeRowEditable(row);
		}
	});
	btn.addEventListener('click', addTask);
	//testCase.addEventListener('click', () => createSubTask(newRow));
	sBtn.addEventListener('click', createSubRow);
	//tableBody.addEventListener('click', createSubRow);
});

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

const sStatus = statusInput.cloneNode(true);
const sDeadlineInput = deadlineInput.cloneNode(true);
const sPrioInput = prioInput.cloneNode(true);

const addTask = () => {
	const allInput = {
		Task: taskInput.value,
		Deadline: deadlineInput.value,
		Status: statusInput.value,
		Prio: prioInput.value,
	};
	//task = console.log(allInput);
	createRow(allInput);

	allInput.value = {};
	taskInput.value = '';
	//console.log(statusInput);
	statusInput.selectedIndex = 0;
	prioInput.selectedIndex = 1;
	deadlineInput.value = '';
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
	const newCell = document.createElement('td');
	const input = document.createElement('input');

	const addMoreSubtask = document.createElement('td');
	addMoreSubtask.appendChild(createSubTaskBtn(row));

	newCell.appendChild(input);

	newRow.appendChild(newCell);
	newRow.appendChild(addMoreSubtask);
	newRow.appendChild(sStatus);

	console.log(newRow.cells.length);
	tableBody.insertBefore(newRow, row.nextSibling);

	//tableBody.insertAdjacentElement(row, newRow);
	if (newRow.rowIndex % 2 == 0) {
		newCell.className = 'subba1';
	} else {
		newCell.className = 'subba2';
	}
	//console.log(newRow.rowIndex);
};

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
			//alert(`${key} cant be empty.`);
			//return;
		} else {
			const cell = document.createElement('td');
			cell.appendChild(document.createTextNode(value));
			row.appendChild(cell);
		}
	}
	btnCell = document.createElement('td');

	btnCell.appendChild(createButton(row));
	row.appendChild(btnCell);
	tableBody.insertBefore(row, inputRow);
};

/*const createSubTask = (row, task) => {
	const subTaskCell = document.createElement('td');
	row.appendChild(subTaskCell);
};*/

btn.addEventListener('click', () => addTask(taskInput));
//testCase.addEventListener('click', () => createSubTask(newRow));

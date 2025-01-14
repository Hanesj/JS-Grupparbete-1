import fs from 'fs';
import path from 'path';
import { Window } from 'happy-dom';

import { beforeEach, it, vi } from 'vitest';
import { addTask } from '../components/task2';
import { expect } from 'chai';

const docPath = path.join(process.cwd(), 'index.html');
const docContent = fs.readFileSync(docPath).toString();

const window = new Window();
const document = window.document;

// document.write(docContent);

vi.stubGlobal('document', document);

beforeEach(() => {
	document.body.innerHTML = '';
	document.write(docContent);
});

it('should make sure inputrow exists', () => {
	//Arrange

	const inRow = document.querySelector('#inputRow');
	const tableBody = document.querySelector('tbody');
	//Act

	//Assert
	expect(tableBody.lastChild === inRow);
});

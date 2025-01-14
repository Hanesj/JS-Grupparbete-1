import { describe, it, expect, beforeEach, vi } from 'vitest';
import { GlobalRegistrator } from '@happy-dom/global-registrator';
import { handleAddTask, initElements } from '../components/task.js';

// Registrera Happy DOM för att simulera webbläsarmiljö ...
GlobalRegistrator.register();

describe('Task Manager', () => {
  // NYTT: Sätt upp testmiljön innan varje test
  beforeEach(() => {
    document.body.innerHTML = `
            <input id="task" type="text">
            <input id="deadline" type="date">
            <select id="status">
                <option value="not-started">Ej Påbörjad</option>
            </select>
            <select id="prio">
                <option value="low">Låg</option>
            </select>
            <button id="add-task-btn">Lägg till</button>
            <tbody id="task-table-body"></tbody>
        `;

    // Initiera element och mocka alert ...
    initElements();
    window.alert = vi.fn();
  });

  it('ska visa felmeddelande när uppgiftsfältet är tomt', () => {
    const mockEvent = { preventDefault: vi.fn() };
    handleAddTask(mockEvent);
    expect(window.alert).toHaveBeenCalledWith('Please fill in all fields!');
  });
});

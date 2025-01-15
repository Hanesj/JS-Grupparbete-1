const addToStorage = (task) => {
  const tasks = getFromStorage();

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const getFromStorage = () => {
  let items;
  const storedTasks = localStorage.getItem('tasks');

  if (localStorage.getItem('tasks') === null) {
    items = [];
  } else {
    items = Array.isArray(JSON.parse(storedTasks))
      ? JSON.parse(storedTasks)
      : [];
  }

  return items;
};

const removeFromStorage = (task) => {
  let tasks = getFromStorage();

  tasks = tasks.filter(
    (item) =>
      item.Task !== task.Task ||
      item.Deadline !== task.Deadline ||
      item.Status !== task.Status ||
      item.Prio !== task.Prio
  );

  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const clearStorage = (key) => {
  localStorage.removeItem(key);
};

// // Namngiven export
// export { addToStorage, getFromStorage, removeFromStorage, clearStorage };

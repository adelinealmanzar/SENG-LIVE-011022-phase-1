const todoListElement = document.querySelector('#todoList')
const newTaskForm = document.querySelector('#newTask')


function loadTodoList(todoList) {
  todoList.forEach(renderTask)
}


function renderTask(task) {
  const li = document.createElement('li');
  li.className = 'grid grid-cols-12 items-center task';
  li.dataset.id = task.id;
  li.innerHTML = `
  <span class="col-span-6 task-label">

  </span>
  <span class="col-span-5 due-date">

  </span>
  <span class="text-right space-x-2 due-date completed">
    
  </span>
  `; 
  // target the .task-label and .due-date spans 
  const taskLabelEl = li.querySelector('.task-label');
  const dueDateEl = li.querySelector('.due-date');
  const completedEl = li.querySelector('.completed');
  // fill them in with the appropriate content from the task object
  taskLabelEl.textContent = task.label;
  dueDateEl.textContent = task.dueDate;
  completedEl.innerHTML = `<i class="far ${task.complete ? 'fa-check-square' : 'fa-square'} text-4xl text-green-300 cursor-pointer"></i>`;
  completedEl.addEventListener('click', (event) => {
    toggleComplete(task.id);
  })
  document.querySelector('#todoList').append(li);
  return li;
}

function updateTask(task) {
  const li = document.querySelector(`#todoList li[data-id="${task.id}"]`);
  const taskLabelEl = li.querySelector('.task-label');
  const dueDateEl = li.querySelector('.due-date');
  const completedEl = li.querySelector('.completed');
  // fill them in with the appropriate content from the task object
  taskLabelEl.textContent = task.label;
  dueDateEl.textContent = task.dueDate;
  completedEl.innerHTML = `<i class="far ${task.complete ? 'fa-check-square' : 'fa-square'} text-4xl text-green-300 cursor-pointer"></i>`;
}



function addTask(taskLabel, dueDate) {
  const newTask = {
    label: taskLabel,
    dueDate: dueDate,
    completed: false
  }
  // 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 
  // BONUS Task 2: Add fetch request to persist the newTask to the json-server before adding it to the todoList and the DOM
  // 
  // move the lines below inside of the promise callback so that you update the todoList and the DOM after the `newTask` is added to db.json via fetch.
  // You want to make sure that the newly added task has an id as that will be important later on.
  renderTask(newTask)
  return newTask
}

function removeTask(todoList, taskLabel) {
  // needs to be updated before it will work with the rest of our current code here
  const indexToRemove = todoList.findIndex(task => task.label === taskLabel);
  todoList[indexToRemove].element.remove();
  return todoList.splice(indexToRemove, 1)[0];
}

function toggleComplete(task) {
  task.complete = !task.complete;
  // 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 
  // BONUS Task 3: send a fetch request to update the task in json-server so that the complete status will be persisted to db.json
  renderTask(task);
  return task;
}

// Event Listeners

// 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 
// Task 1: add an event listener for DOMContentLoaded that will `fetch` the tasks from the json-server (`http://localhost:3000/tasks`)
//  - parse the body of the response from JSON to an array of todolist tasks
//  - invoke `loadTodoList`, passing `todoList` as an argument

function handleNewTaskSubmit(event) {
  event.preventDefault();
  const label = event.target.labelInput.value;
  const dueDate = new Date(event.target.dueDateInput.value);
  addTask(todoList, label, dueDate);
  event.target.reset();
}

document.querySelector('form#newTask').addEventListener('submit', handleNewTaskSubmit)

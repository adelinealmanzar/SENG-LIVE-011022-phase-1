# Phase 1 - Lecture 7 - Asynchronous JavaScript and Fetch

## Todo List Application Summary

- DOM Node Variables
  - `todoListElement` - the element where tasks are appended to the DOM
  - `newTaskForm` - the form element where new tasks can be persisted and added to the DOM.
- ~~`todoList`~~
  - ~~array of task objects with `id`, `label`, `complete`, and `dueDate` properties.~~ **Now we're going to fetch the tasks**
- `renderTask(task)`
  - takes a `task` object as an argument and returns an `li` element for displaying the task. This method also appends the `li` to the `todoListElement`.
- `updateTask(task)` 
  - takes a `task` object as an argument, finds the `li` element that represents it in the DOM, and updates its properties based on the data in the task object.
- `loadTodoList(todoList)`
  - takes the `todoList` as an argument, renders all of the tasks as `li` elements, appending them to the `todoList`.
- ~~`addTask(todoList, task)`~~ `addTask(taskLabel, dueDate)`
  - ~~takes the `todoList` array and a `task` object as arguments. It uses the `task` and includes an `id`, also adding a `complete` property before adding it to the `todoList` and appending it to the `todoList` container.~~
  - takes the `taskLabel` and `dueDate` properties of a new task object as arguments. 
  - sends a `POST` request using `fetch` to persist the task to `db.json`
  - invokes `renderTask` with the persisted task object as an argument
- `removeTask(todoList, taskId)` Needs updating before it will work with the rest of our current code - we'll revisit next week.
  - takes the `todoList` and a `taskId` as arguments, finds the task that matches the `taskId`, removes it from the `todoList`, and finds the `li` element representing it from the DOM.
- `toggleComplete(task)`
  - takes the `task` as an argument, sends a `PATCH` request to toggle the `complete` property of the task and invokes the `updateTask` function to update the DOM.


## Tasks

1. add an event listener for DOMContentLoaded that will `fetch` the tasks from the json-server (`http://localhost:3000/tasks`)
  - parse the response from the server to get the data in the `todoList`
  - invoke `loadTodoList`, passing `todoList` as an argument
2. BONUS! add a fetch request inside of `addTask` that will persist the newTask to the json-server (by posting to `http://localhost:3000/tasks`) and updating the `todoList` and DOM after getting the response from the server. If you add a task and refresh the page it should still appear in the HTML.
3. BONUS: add a fetch request to toggleComplete so that the change to the task's complete status is persisted to db.json and will be accessible after a page refresh.


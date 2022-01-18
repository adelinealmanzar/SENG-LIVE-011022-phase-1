# Phase 1 Lecture 6 - DOM Events

## Key Concepts

- Use a form to add elements to the DOM
- Use submit event handlers
- Use click event handlers 

## Tasks for Music Library

- Add a submit event handler to allow adding songs to the Playlist
- Add a click event handler to allow loading songs into the player.
  
## Tasks for Todo List

- Add a submit event handler to allow adding tasks to the todoList
- Add a click event handler to allow toggling a task's completeness

## Three Pillars

- Recognize Events
- Manipulate the DOM
- Communicate with the Server

![Workflow](../assets/workflow.png)

### What's the difference between an event listener and an event handler?

- An event listener is an interface with our browser that allows us to listen for events that the browser is tracking and attach a function that the browser will invoke when the event occurs.
- An event handler is the function that we pass as a callback when we attach an event listener. It always accepts the triggering `event` object as its parameter.

## Key questions to ask when working on a feature

- What events are involved with this feature?
- What DOM elements will be the targets of those events?
- When those events happen, what information do I need access to in order to affect the change that should happen?
- How do I make sure that the information I need is accessible to me when the event occurs?

## Music Library Application Summary

- `playlist`
  - array of song objects with `name`, `artist`, `duration`, `playCount` and `youtubeLink`
- DOM Node Variables:
  - `playlistElement` - the `ul` element in the sidebar where songs are displayed.
  - `playlistDurationElement` - the `span` element at bottom of sidebar where total duration is displayed.
  - `songNameElement` - the element in the main content area where the name of the current song is displayed.
  - `artistNameElement` - the element in the main content area where the artist of the current song is displayed.
  - `playCountElement` - the element where the play count of the current song is displayed.
  - `playerElement` - the `iframe` element where the youtube video for the current song is displayed.
- `nextId(array)`
  - takes an array as an argument and returns the next id that an object inside of the array should have.
- `copy(obj)`
  - takes an object as an argument and returns a deep copy of it.
- `formatDuration(duration)`
  - takes a `duration` integer as an argument and returns a string formatted version.
- `formattedDurationToSeconds(formattedDuration)`
  - takes a string formatted duration as an argument and returns a `duration` integer in seconds.
- `renderSong(song)`
  - takes a song object as an argument and returns an `li` element for display within the sidebar. This method also appends the element to the `playlistElement` in the sidebar.
- `loadPlaylistToSidebar(playlist)`
  - takes the contents of the `playlist` parameter and renders all of the songs as `li` elements, appending them to the `playlistElement` in the sidebar.
- `addSongToPlaylist(playlist, song)`
  - takes the `playlist` and a `song` as arguments. It adds the song to the playlist, passes it to `renderSong`, appending it to the `playlistElement` in the sidebar.
- 🚧 `removeSongFromPlaylist(playlist, songId)`
  - takes the `playlist` and a `songId` as arguments and finds the `song` within the `playlist` that matches the `songId`, removes it from the `playlist` and removes its corresponding `li` element from the DOM.
- `extractVideoID(url)`
  - helper method that takes a youtube url from a user and extracts the YouTube VideoID.
- `loadSongIntoPlayer(song)`
  - takes a song as an argument and loads its details into the player.
- `songsByArtist(playlist, artist)`
  - takes the `playlist` and an `artist` as arguments, populates the playlist in the sidebar with all songs whose artist matches the `artist` argument.

### Today's Changes

- `handleNewSongSubmit(event)`
  - we'll need to prevent the default behavior.
  - we'll then need to attach an event listener to the newSong form.
  - when the form is submitted, we'll pull the form data out of the form, use it to build a new `song` object and pass it to `addSongToPlaylist`.
- `handleChooseSong(song)`
  - we'll need to attach an event listener to each list item in the sidebar.
  - when one of them is clicked, we'll invoke `loadSongIntoPlayer` and pass in the appropriate `song` as an argument.
- `loadArtistChoices(playlist)`
  - on page load, we'll need to add an option for each artist who has a song in the playlist
- `handleChooseArtist(event)`
  - we'll also want to attach an event listener to the select tag where those options live. When the select tag changes, we'll want to update the playlist with the songs by the selected artist. If the choice is all artists, all songs should show.

## Todo List Application Summary

- `todoList`
  - array of task objects with `id`, `label`, `complete`, and `dueDate` properties.
- `getTodoListElement()`
  - returns the `todoList` element where tasks will be added.
- `renderTask(task)`
  - takes a `task` object as an argument and returns an `li` element for displaying the task. This method also appends the `li` to the todoList element.
- `loadTodoList(todoList)`
  - takes the `todoList` as an argument, renders all of the tasks as `li` elements, appending them to the `todoList`.
- `addTask(todoList, task)`
  - takes the `todoList` array and a `task` object as arguments. It uses the `task` and includes an `id`, also adding a `complete` property before adding it to the `todoList` and appending it to the `todoList` container.
- `removeTask(todoList, taskId)`
  - takes the `todoList` and a `taskId` as arguments, finds the task that matches the `taskId`, removes it from the `todoList`, and finds the `li` element representing it from the DOM.
- `toggleComplete(taskId)`
  - takes the `taskId` as an argument, finds the `task` element that matches it and toggles its `complete` property and invokes the `updateTask` function to update the DOM.
- `updateTask(task)` 
  - takes a `task` object as an argument, finds the `li` element that represents it in the DOM, and updates its properties based on the data in the task object.

### Today's Changes

- `handleNewTaskSubmit(event)`
  - we'll need to prevent the default behavior.
  - we'll then need to attach an event listener to the newTask form.
  - when the form is submitted, we'll pull the data out of the form, and pass it to `addTask` function.
- `handleToggleComplete(task)`
  - we'll need to attach an event listener to each box in the todo list.
  - when one of them is clicked, we'll invoke `toggleComplete` and pass in the appropriate `task` as an argument.
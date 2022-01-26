# Phase 1 Lecture 7 - Asynchronous Javascript and Fetch

## Lecture Objectives

- Understand how to [use `fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) to send requests
- Understand how to use `.then()` to deal with the [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response)
- Understand how the chrome dev tools can be used to debug fetch requests.
- Recognize the difference between synchronous and asynchronous callback functions.
## Agenda
- 💡 Discuss Asynchronous functions in JS
- 🤓 Discuss Promises and the event queue
- 📌 Fetch and .then()
- Break
- Add fetching songs to the Music Library App
- Break
- Review

## Async callbacks (from [MDN article](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Introducing))
Async callbacks are functions that are specified as arguments when calling a function which will start executing code in the background. When the background code finishes running, the callback function will be invoked to let you know the work is done, or to let you know that something of interest has happened. 

Using callbacks is slightly old-fashioned now, but you'll still see them used in a number of older-but-still-commonly-used APIs.

An example of an async callback is the second parameter of the `addEventListener()` method (as we saw in action above):

```js
btn.addEventListener('click', () => {
  alert('You clicked me!');

  let pElem = document.createElement('p');
  pElem.textContent = 'This is a newly-added paragraph.';
  document.body.appendChild(pElem);
});
```

- first parameter is the type of event to be listened for
- second parameter is a callback function that is invoked when the event is fired.
- When we pass a callback function as an argument to another function, we are only passing the function's reference as an argument.
- The function is "called back" to within the enclosing function body, hence the name.
- If the callback function is not executed immediately when its enclosing function is invoked, we refer to it as an asynchronous (or async) callback. 

## Not all Callbacks are Async

Note that not all callbacks are async — some run synchronously. An example is when we use [Array.prototype.forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) to loop through the items in an array:

```js
const gods = ['Apollo', 'Artemis', 'Ares', 'Zeus'];
console.log('before forEach')
gods.forEach(function (eachName, index){
  console.log(index + '. ' + eachName);
});
console.log('after forEach')
```

In this example we loop through an array of Greek gods and print the index numbers and values to the console. The expected parameter of forEach() is a callback function, which itself takes two parameters, a reference to the array name and index values. However, it doesn't wait for anything — it runs immediately.

## Promises

Promises are the new style of async code that you'll see used in modern Web APIs. A good example is the [fetch()](https://developer.mozilla.org/en-US/docs/Web/API/fetch) API, which is basically like a modern, more efficient version of [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) (which you generally only still still see in legacy code). Let's look at a quick example,

```js
console.log('before fetch')
fetch("https://api.tvmaze.com/singlesearch/shows?q=friends")
  .then(function (response) {
    console.log(response);
    return response.json();
  })
  .then(function (json) {
    console.log(json);
  });
console.log('after fetch')
```


- Here we see `fetch()` taking a single parameter — the URL of a resource you want to fetch from the network — and returning a [promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) for a [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response) object. 
- The promise is an object representing the eventual completion or failure of the async operation. 
- The promise is the browser's way of saying "I promise to get back to you with the answer as soon as I can," hence the name "promise."

Neither of the possible outcomes have happened yet, so the fetch operation is currently waiting on the result of the browser trying to complete the operation at some point in the future. We've then got three further code blocks chained onto the end of the fetch():

- Two `then()` blocks. **Both contain a callback function that will run if the previous operation is successful (a fulfilled promise), and each callback receives as input the result (return value) of the previous successful operation**, so you can go forward and do something else to it. Each `.then()` block returns another promise, meaning that you can chain multiple `.then()` blocks onto each other, so multiple asynchronous operations can be made to run in order, one after another.
- The `catch()` block at the end runs if any of the `.then()` blocks fail, receiving the error that caused the problem as an argument.
- 💡💡💡 **IMPORTANT NOTE**: In the case of `fetch`, if we get a response back from the server we sent the request to, that's considered a fulfilled promise. 
    - This means that even if we get an error response from our API, it's still considered a resolved promise as fetch was able to successfully retrieve a response (even though the response represented an error)
    - We can get around this by checking if `response.ok` and throwing an error that we can catch if not.

```js
console.log('before fetch')
fetch("https://api.tvmaze.com/shows/1389478917389479827389474")
  .then(function (response) {
    console.log(response);
    if(!response.ok) {
        throw new Error('something went wrong')
    }
    return response.json();
  })
  .then(function (json) {
    console.log(json);
  })
  .catch(function(error) {
      console.log(error)
  })
console.log('after fetch')
```
- 🤓🤓🤓 BONUS NOTE— in a similar way to synchronous [`try...catch`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch) blocks, an error object is made available inside the `catch()`, which can be used to report the kind of error that has occurred. Note however that synchronous `try...catch` won't work with promises, although it will work with the [async/await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await) syntax that you may wish to learn later on (we'll discuss in ES6 lecture next week).

## The Event Queue

Async operations like promises are put into an **event queue**, which runs after the main thread has finished processing so that they *do not block* subsequent JavaScript code from running. The queued operations will complete as soon as possible then return their results to the JavaScript environment.

## Summary

In its most basic form, JavaScript is a synchronous, blocking, single-threaded language, in which only one operation can be in progress at a time. But web browsers define functions and APIs (like `setTimeout`, `addEventListener`, and `fetch`) that allow us to register functions that should not be executed synchronously, and should instead be invoked asynchronously when some kind of event occurs (the passage of time, the user's interaction with the mouse, or the arrival of data over the network, for example). This means that you can let your code tell the browser to do several things at the same time without stopping or blocking your main thread.

Whether we want to run code synchronously or asynchronously will depend on what we're trying to do.

There are times when we want things to load and happen right away. For example when applying some user-defined styles to a webpage you'll want the styles to be applied as soon as possible.

If we're running an operation that takes time however, like querying a database and using the results to populate templates, it is better to push this off the stack and complete the task asynchronously. Over time, you'll learn when it makes more sense to choose an asynchronous technique over a synchronous one.

## Key Takeaways

### Order of Operations

Sync code runs before Async code.

One of the most important things to take away from this conversation is that asynchronous callbacks will always execute after surrounding synchronous code.
```js
window.setTimeout(() => console.log('async'), 0);
for(let i = 0 ; i < 10000 ; i++) {
    console.log('sync');
}
```

### Promises

If a promise is fulfilled, we can attach an async callback that will receive the resolved value via `.then()`. If the promise is rejected, the error can be captured and handled via a callback passed to `.catch()`

Both `.then()` and `.catch()` are called on a `Promise` and return a `Promise`, allowing us to create a chain of asynchronous actions that happen in a particular order.

### Fetch

```js
console.log('before fetch')
fetch("https://api.tvmaze.com/singlesearch/shows?q=friends")
  .then(function (response) {
    console.log(response);
    return response.json();
  })
  .then(function (show) {
    console.log(show);
  });
console.log('after fetch')
```

## Posting data to [JSON Server](https://github.com/typicode/json-server)

First, you'll want to make sure that the working directory of your terminal is in the directory where your db.json file is located. Then you can run:

```
json-server --watch db.json
```

This will open up a server on port 3000 that will accept RESTful requests for any resources that have a key present within the db.json file. 

For example, if we had this in our db.json file:

```json
{
  "songs": []
}
```

Then json-server would give us access to the following routes:

```
GET    /songs
GET    /songs/1
POST   /songs
PUT    /songs/1
PATCH  /songs/1
DELETE /songs/1
```

When constructing a POST request to create a new record, we'll need to include a configuration object with our fetch call including:

1. method: 'POST'
2. content-type headers indicating we're sending a json formatted body with our request
3. a JSON formatted string passed as the body of our request.

The syntax looks like this:

```js
fetch('http://localhost:3000/songs', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(song)
})
  .then(response => response.json())
  .then(savedSong => {
    addSongToPlaylist(playlist, savedSong);
    event.target.reset()
  })
```

- `fetch` returns a `Promise` that will resolve to a [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response#methods) object if the browser is able to connect to the server and receive a response.
- the first `.then()` callback receives the resolved `response` as an argument.
- The `.json()` method is defined within the `Response` object and it returns a promise that resolves with the result of parsing the response body text as JSON (this converts the string formatted body into the JavaScript data structure that it represents)
- The following `.then()` callback receives the resolved value of the previous promise. This is the JS data structure represented in the body of the response (usually an object or an array of objects)

---

## Resources
- [Fix json-server conflict with Live Server](https://gist.github.com/ihollander/cc5f36c6447d15dea6a16f68d82aacf7)
- [json-server](https://www.npmjs.com/package/json-server)
- [Postman](https://www.postman.com/) (for api testing)
- [JSONView Chrome extension](https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc?hl=en) (for pretty viewing of JSON formatted data in browser)
- [Asynchronous JavaScript Article Series from MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous)

## Three Pillars

- Recognize Events
- Manipulate the DOM
- Communicate with the Server

## Music Library Application Summary

### DOM Manipulation (and helper functions)
- ~~`playlist`~~
  - ~~array of song objects with `name`, `artist`, `duration`, `playCount` and `youtubeLink`~~ **Songs will be fetched from json-server, not hard coded in a variable within our code**
- DOM Node Variables:
  - `playlistElement` - the `ul` element in the sidebar where songs are displayed.
  - `playlistDurationElement` - the `span` element at bottom of sidebar where total duration is displayed.
  - `songNameElement` - the element in the main content area where the name of the current song is displayed.
  - `artistNameElement` - the element in the main content area where the artist of the current song is displayed.
  - `playCountElement` - the element where the play count of the current song is displayed.
  - `playerElement` - the `iframe` element where the youtube video for the current song is displayed.
  - `newSongForm` - the `form` element that will create a new song when submitted.
  - `artistNameSelect` - the `select` element that will have options for filtering the songs by artist.
- `formatDuration(duration)`
  - takes a `duration` integer as an argument and returns a string formatted version
- `formattedDurationToSeconds(formattedDuration)`
  - takes a string formatted duration as an argument and returns a `duration` integer in seconds.
- `extractVideoID(url)`
  - helper method that takes a youtube url from a user and extracts the YouTube VideoID.
- `renderSong(song)`
  - takes a song object as an argument and returns an `li` element for display within the sidebar. This method also appends the element into the sidebar.
- `loadSongsIntoSidebar(songs)`
  - takes the contents of the `songs` parameter and renders all of the songs as `li` elements, appending them to the playlist `ul` element in the sidebar.
- ~~`addSongToPlaylist(playlist, song)`~~
  - ~~takes the `playlist` and a `song` as arguments. It adds the song to the playlist, passes it to `renderSong`, appending it to the `playlistElement` in the sidebar.~~ **(Most of this was data related before with a tiny piece of DOM manipulation mixed in via `renderSong()`. Since we'll be using fetch now, we don't need this function anymore)**
- `removeSongFromPlaylist(songId)`
  - takes the `songId` as an argument and finds the `song` that matches the `songId`, removes it from the `playlist` and removing its `li` element from the DOM.
- `loadSongIntoPlayer(song)`
  - takes a song as an argument and loads its details into the player.
- `populateReleases(releases)`
  - takes an array of other releases (strings) by the selected song's artist and adds them to the spoiler dropdown below the player.
- ~~`songsByArtist(playlist, artist)`~~
  - ~~takes the `playlist` and an `artist` as arguments, populates the playlist in the sidebar with all songs whose artist matches the `artist` argument.~~ **(We can also handle loading songs by a particular artist using fetch at this point, so we'll no longer require a separate function)**
- `loadArtistChoices(songs)`
  - takes a `songs` of songs as an argument and adds option tags to the `filterByArtist` select tag.

### Event Listeners

- `DOMContentLoaded`
  - load songs into sidebar (**using fetch**)
  - load options into filterByArtist dropdown.
- `#newSong`->`'submit'`
  - pull data about song out of form, **post it to the database using `fetch`** and update the DOM with `renderSong`
- `#filterByArtist`->`'change'`
  - **`fetch` all songs by the selected artist option** and load them into the sidebar with `loadSongsIntoSidebar`
- `#playlist li`->`'click'`
  - invoke `loadSongIntoPlayer` with the appropriate song as an argument.

### Communicating with the Server (functions we'll build today that use `fetch`)

- `getSongs(artist="")`
  - accepts an artist as an argument (optional) returns a promise for all songs (by the artist if an argument is provided or all songs if not)
- `createSong(songData)`
  - accepts an object containing song data as an argument and posts it to the database, returning a promise for the persisted song.
- `getInfoAboutArtist(artistId)`
  - accepts a musicbrainz artistId as an argument and returns a promise for an array of strings describing that artist's other releases. (`https://musicbrainz.org/ws/2/artist/${artistId}?inc=releases&fmt=json`)
- `searchArtists(artist)`
  - takes an artist as an argument and sends a request to the musicbrainz api to retrieve search results for artists matching that name. 
  - Takes the top search result, reads its musicbrainz artistId and passes it to `getInfoAboutArtist`, using it to return a promise for an array of strings describing the artist's other releases. 
### Today's Changes

- Instead of loading hard coding the playlist array, we'll use `fetch` to retrieve the songs from our json-server and then trigger `loadSongsIntoSidebar(songs)`
- Within our event handler for handling the new song form submission, we'll use `fetch` to persist the new song to `db.json` so that it will stay there when we refresh the page.
- **BONUS**: When a song is loaded into the player, we'll use the musicbrainz API to fetch information about the other releases by that song's artist. We'll need to break this task into two requests.
  - We'll send the first request ([view example request](https://musicbrainz.org/ws/2/artist/?query=ray+charles&fmt=json)) to search for artists within musicbrainz who match the song's artist. The results come in an array sorted by best match to worst. We'll pick the first artist and retrieve their musicbrainz id to be used in the subsequent request.
  - The second request will require the musicbrainz id and will allow us to access all releases by the artist matching that musicbrainz id.


// Important DOM Elements
const playlistElement = document.querySelector('#playlist');
const playlistDurationElement = document.querySelector('#totalDuration');
const songNameElement = document.querySelector('#song-name');
const artistNameElement = document.querySelector('#artist');
const playCountElement = document.querySelector('#play-count');
const playerElement = document.querySelector('#player-frame');
const artistReleases = document.querySelector('#releases');
const commentsListElement = document.querySelector('#comments');
// Interactive Elements
const newSongForm = document.querySelector('#newSong');
const editSongForm = document.querySelector('#editSong');
const songDeleteButton = document.querySelector('#deleteSong');
const artistNameSelect = document.querySelector('#filterByArtist');
const newCommentForm = document.querySelector('#newComment');
let currentSongId;

// Behavior
function init() {
  // fetch songs for initial load
  getSongs()
    .then((songs) => {
      loadSongsIntoSidebar(songs);
      loadArtistChoices(songs)
      displayTotalDuration(songs);
    })
  
  // handle form submission for creating a new song
  newSongForm.addEventListener('submit',  (event) => {
    event.preventDefault();
    const songData = {
      name: event.target.nameInput.value,
      artist: event.target.artistInput.value,
      duration: event.target.durationInput.value,
      youtubeLink: event.target.youtubeLinkInput.value,
      playCount: 0
    }
    createSong(songData)
      .then((savedSong) => {
        renderSong(savedSong);
        event.target.reset();
      })
  })
  artistNameSelect.addEventListener('change', (e) => {
    const artist = e.target.value
    // get all songs by the artist and load them into the sidebar
    getSongs(artist)
      .then(songs => {
        loadSongsIntoSidebar(songs)
        displayTotalDuration(songs);
      })
  })
  // Add Submit Handler for new Comment Form
  // pull data out of form and pass to createComment
  // after promise resolves, pass response to renderComment and reset the form
  newCommentForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const commentData = {
      songId: event.target.dataset.songId,
      comment: event.target.commentInput.value,
    }
    createComment(commentData)
      .then(savedRecord => {
        renderComment(savedRecord)
        event.target.reset();
      })
  })


  editSongForm.addEventListener('input', (e) => {
    triggerSongAutoSave()
  })
  editSongForm.addEventListener('submit', (e) => {
    e.preventDefault();
  })

  songDeleteButton.addEventListener('click', (e) => {
    deleteSong(currentSongId)
      .then(() => {
        playlistElement.querySelector(`[data-id="${currentSongId}"]`).remove()
        getSongs()
          .then((songs) => {
            loadSongsIntoSidebar(songs);
            loadArtistChoices(songs)
            displayTotalDuration(songs);
          })
      })
  })

  // debouncing:
  // - store the timeoutID for a queued song autosave
  // - clear the previous timeout for a queued song autosave
  // - queue up another autosave to happen after 300 milliseconds
  // without a change to any of the form inputs
  let queuedSongAutoSave;
  function triggerSongAutoSave() {
    window.clearTimeout(queuedSongAutoSave);
    queuedSongAutoSave = window.setTimeout(() => {
      // pull data out of form into songData
      // pass to updateSong()
      // so we need the songId (currentSongId) and songData
      const songId = editSongForm.dataset.songId;
      const songData = {
        name: document.getElementById('song-name').value,
        artist: document.getElementById('artist').value,
        playCount: parseInt(document.getElementById('play-count').value, 10)
      };
      updateSong(currentSongId, songData)
        .then(renderSong)
    }, 300)
  }

  
}


document.addEventListener('DOMContentLoaded', init)

// Data

// accepts an artist as an argument (optional) returns a promise for all songs (by the artist if an argument is provided)
function getSongs(artist = "") {
  const url = artist ? `http://localhost:3000/songs?artist=${artist}` : 'http://localhost:3000/songs'
  return fetch(url)
    .then(response => response.json())
}


// accept an object containing song data as an argument and post it to the database
function createSong(songData) {
  return fetch('http://localhost:3000/songs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(songData)
  })
    .then(response => response.json())
}

// Add update and delete song functions
function updateSong(songId, songData) {
  return fetch(`http://localhost:3000/songs/${songId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(songData)
  })
    .then(res => res.json())
}

function deleteSong(songId) {
  return fetch(`http://localhost:3000/songs/${songId}`, {
    method: 'DELETE'
  })
}

function searchArtists(artist) {
  return fetch(`https://musicbrainz.org/ws/2/artist/?query=${encodeURI(artist)}&fmt=json`)
    .then(response => response.json())
    .then(artistInfo => {
      console.log('artistInfo', artistInfo)
      const artistId = artistInfo.artists[0].id
      return getInfoAboutArtist(artistId)
    })
}

function getInfoAboutArtist(artistId) {
  return fetch(`https://musicbrainz.org/ws/2/artist/${artistId}?inc=releases&fmt=json`)
    .then(response => response.json())
    .then(data => {
      console.log('artistData', data)
      return data.releases.map(r => `${r.title} (${r.date})`)
    })
}

 


function getComments(song) {
  return fetch(`http://localhost:3000/comments?songId=${song.id}`)
    .then(res => res.json())
}
// add in createComment
function createComment(commentData) {
  return fetch('http://localhost:3000/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(commentData)
  })
    .then(res => res.json())
}

// 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 
// add in updateComment(commentId, commentData) and
// deleteComment(commentId)
function updateComment(commentId, commentData) {
  return fetch(`http://localhost:3000/comments/${commentId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(commentData)
  })  
    .then(res => res.json())
}

function deleteComment(commentId) {
  return fetch(`http://localhost:3000/comments/${commentId}`, {
    method: 'DELETE'
  })  
    .then(res => res.json())
}

// Display

function renderSong(song) {
  const existingLi = document.querySelector(`#playlist li[data-id="${song.id}"]`);
  const li = existingLi || document.createElement('li');
  li.dataset.id = song.id;
  li.className = "flex justify-between p-2 pr-4 cursor-pointer";
  li.innerHTML = `
  <div>
    <span class="song font-semibold"></span>
    <span class="artist"></span>
  </div>
  <div class="duration text-gray-400"></div>`;
  li.addEventListener('click', (e) => {
    loadSongIntoPlayer(song);
  })
  const songEl = li.querySelector('.song');
  const artistEl = li.querySelector('.artist');
  const durationEl = li.querySelector('.duration')
  songEl.textContent = song.name;
  artistEl.textContent = `by ${song.artist}`;
  durationEl.textContent = song.duration;
  if (!existingLi) {
    playlistElement.append(li);
  }
  return li;
}

function loadSongsIntoSidebar(songs) {
  playlistElement.innerHTML = "";
  songs.forEach(renderSong)
  loadSongIntoPlayer(songs[0])
}

function displayTotalDuration(songs) {
  playlistDurationElement.textContent = calculateDuration(songs);
}

function removeSongFromPlaylist(songId) {
  document.querySelector(`#playlist li[data-id="${songId}"]`).remove()
  return songToRemove;
}

function loadSongIntoPlayer(song) {
  document.querySelectorAll('#playlist li').forEach(li => {
    li.classList.remove('bg-gray-100')
  })
  const selectedLi = document.querySelector(`#playlist li[data-id="${song.id}"]`);
  selectedLi.classList.add('bg-gray-100')
  songNameElement.value = song.name;
  artistNameElement.value = song.artist;
  playCountElement.value = song.playCount;
  playerElement.src = `https://www.youtube.com/embed/${extractVideoID(song.youtubeLink)}`;
  searchArtists(song.artist)
    .then(populateReleases)
  
  // store the id of currently loaded song in 
  // currentSongId, so that we'll be able to 
  // use it within any PATCH or DELETE requests
  // as both of those require the id of the 
  // record being updated or removed.
  // This will also be used when creating a new
  // comment associated with the song that is 
  // loaded into the player.
  
  currentSongId = song.id;
  // clear out the comments list and load comments for this song into the comments part of the DOM
  commentsListElement.innerHTML = "";
  getComments(song)
    .then(renderComments)
}

function loadArtistChoices(playlist) {
  artistNameSelect.innerHTML = `<option value="">Filter by artist</option>`;
  const artists = playlist.reduce((artistsArray, song) => {
    if (artistsArray.indexOf(song.artist) === -1) {
      artistsArray.push(song.artist);
    }
    return artistsArray
  }, []);
  artists.forEach(artist => {
    const option = document.createElement('option');
    option.value = artist;
    option.textContent = artist;
    artistNameSelect.append(option);
  });
}

function populateReleases(releases) {
  artistReleases.innerHTML = "";
  const list = releases.forEach(release => {
    const li = document.createElement('li');
    li.textContent = release;
    artistReleases.append(li)
  })
}

// define a function renderComment for 
// rendering a single comment from a 
// peristed record passed as an argument
function renderComment(record) {
  const p = document.createElement('p');
  p.className = "flex justify-between";
  p.innerHTML = `
  <input class="w-5/6" />
  <button><i class="fas fa-trash-alt"></i></button>
  `
  const input = p.querySelector('input');
  const deleteBtn = p.querySelector('button');
  input.value = record.comment;
  // 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 
  // add event listeners for updating or deleting a comment
  input.addEventListener('input', (e) => {
    updateComment(record.id, {comment: e.target.value})
  })
  deleteBtn.addEventListener('click', (e) => {
    deleteComment(record.id)
      .then(() => p.remove())
  })
  commentsListElement.append(p);
}

// define a function renderComments for
// clearing out the comments and fill in the
// div with the retrieved comments from the API
// passing them to renderComment 
function renderComments(comments) {
  commentsListElement.innerHTML = "";
  comments.forEach(renderComment)
}

// helper functions
function formatDuration(duration) {
  const seconds = duration % 60; // duration - minutes * 60
  const minutes = Math.floor(duration / 60) % 60;
  const hours = Math.floor(duration / 3600);
  return `${hours ? (hours + ':') : ''}${minutes}:${seconds < 10 ? ('0'+ seconds) : seconds}`
}

function formattedDurationToSeconds(formattedDuration) {
  const [seconds, minutes, hours] = formattedDuration.split(':').map(num => parseInt(num)).reverse();
  return seconds + (minutes ? minutes * 60 : 0) + (hours ? hours * 3600 : 0);
}

function extractVideoID(url) {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[7].length == 11) {
    return match[7];
  } else {
    alert("Could not extract video ID.");
  }
}

function calculateDuration(songs) {
  const totalDuration = songs.reduce((total, song) => {
    return total + formattedDurationToSeconds(song.duration)
  }, 0)
  return formatDuration(totalDuration)
}
// Important DOM Elements
const playlistElement = document.querySelector('#playlist');
const playlistDurationElement = document.querySelector('#totalDuration');
const songNameElement = document.querySelector('#song-name');
const artistNameElement = document.querySelector('#artist');
const playCountElement = document.querySelector('#play-count');
const playerElement = document.querySelector('#player-frame');
const artistReleases = document.querySelector('')
// Interactive Elements
const newSongForm = document.querySelector('#newSong');
const artistNameSelect = document.querySelector('#filterByArtist')

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

// DOM Manipulation (Display)
function renderSong(song) {
  const li = document.createElement('li');
  li.className = "flex justify-between p-2 pr-4 cursor-pointer";
  li.dataset.id = song.id;
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
  durationEl.textContent = formatDuration(song.duration);
  playlistElement.append(li);
  return li;
}

function loadSongsIntoSidebar(songs) {
  playlistElement.innerHTML = "";
  songs.forEach(renderSong)
  loadSongIntoPlayer(songs[0])
}

function removeSongFromPlaylist(songId) {
  return document.querySelector(`#playlist li[data-id="${songId}"]`).remove()
}

function loadSongIntoPlayer(song) {
  document.querySelectorAll('#playlist li').forEach(li => {
    li.classList.remove('bg-gray-100')
  })
  const selectedLi = document.querySelector(`#playlist li[data-id="${song.id}"]`);
  selectedLi.classList.add('bg-gray-100')
  songNameElement.textContent = song.name;
  artistNameElement.textContent = song.artist;
  playCountElement.textContent = song.playCount === 1 ? '1 play' : `${song.playCount} plays`;
  playerElement.src = `https://www.youtube.com/embed/${extractVideoID(song.youtubeLink)}`;
  // searchArtists(song.artist)
  //  .then(populateReleases)
}

function loadArtistChoices(songs) {
  artistNameSelect.innerHTML = `<option value="">Filter by artist</option>`;
  const artists = songs.reduce((artistsArray, song) => {
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
  const target = document.querySelector('#releases');
  target.innerHTML = "";
  const list = releases.forEach(release => {
    const li = document.createElement('li');
    li.textContent = release;
    target.append(li)
  })
}

// Data

// accepts an artist as an argument (optional) returns a promise for all songs (by the artist if an argument is provided)
function getSongs(artist = "") {
  
}

// accepts an object containing song data as an argument and post it to the database
function createSong(songData) {
  
}

// requests to musicbrainz api to retrieve artist information including releases
function getInfoAboutArtist(artistId) {
  
}

function searchArtists(artist) {
  
}




// Behavior (Event Handlers)

document.addEventListener('DOMContentLoaded', () => {
  // on page load, fetch all songs 
  // and load them into the sidebar
  // add artist choices to dropdown
  getSongs()
    .then()
  // upon form submission persist song to database
  newSongForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newSongObj = {
      name: document.getElementById('nameInput').value,
      artist: document.getElementById('artistInput').value,
      duration: formattedDurationToSeconds(document.getElementById('durationInput').value),
      youtubeLink: document.getElementById('youtubeLinkInput').value
    }
    newSongObj.playCount = 0;
    // 🚧 🚧 🚧 
    // post the song to the database and then render it to the sidebar 
    // createSong(songDataFromForm)
    //   .then()
    e.target.reset();
  })
  // When a new artist is selected, load their songs from the database
  arstistNameSelect.addEventListener('change', (e) => {
    const artist = e.target.value
    // get all songs by the artist and load them into the sidebar
    
  })
})
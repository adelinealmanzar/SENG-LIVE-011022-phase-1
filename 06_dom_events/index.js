const ____ = "FILL ME IN"
const playlist = [
  {
    id: 1,
    name: "What'd I Say",
    artist: 'Ray Charles',
    duration: 255,
    playCount: 0,
    youtubeLink: 'https://www.youtube.com/watch?v=HAjeSS3kktA'
  },
  {
    id: 2,
    name: 'Sweet Dreams',
    artist: 'The Eurythmics',
    duration: 216,
    playCount: 0,
    youtubeLink: 'https://www.youtube.com/watch?v=qeMFqkcPYcg'
  },
  {
    id: 3,
    name: 'Cry Me a River',
    artist: 'Justin Timberlake',
    duration: 290,
    playCount: 0,
    youtubeLink: 'https://www.youtube.com/watch?v=DksSPZTZES0'
  },
  {
    id: 4,
    name: 'With a Little Help from my Friends',
    artist: 'Joe Cocker',
    duration: 289,
    playCount: 0,
    youtubeLink: 'https://www.youtube.com/watch?v=a3LQ-FReO7Q'
  },
  {
    id: 5,
    name: 'Bohemian Rhapsody',
    artist: 'Queen',
    duration: 359,
    playCount: 0,
    youtubeLink: 'https://www.youtube.com/watch?v=fJ9rUzIMcZQ'
  },
  {
    id: 6,
    name: 'Somebody To Love',
    artist: 'Queen',
    duration: 309,
    playCount: 0,
    youtubeLink: 'https://www.youtube.com/watch?v=kijpcUv-b8M'
  },
  {
    id: 7, 
    name: 'Another One Bites the Dust',
    // name: '<style>@keyframes x{}</style><img style="animation-name:x" onanimationend="alert(1)"/>Another One Bites the Dust',
    artist: 'Queen',
    duration: 222,
    playCount: 0,
    youtubeLink: 'https://www.youtube.com/watch?v=eqyUAtzS_6M'
  },
  {
    id: 8,
    name: 'Purple Rain',
    artist: 'Prince',
    duration: 477,
    playCount: 0,
    youtubeLink: 'https://www.youtube.com/watch?v=TvnYmWpD_T8'
  }
]

// Important DOM Elements
const playlistElement = document.querySelector('#playlist');
const playlistDurationElement = document.querySelector('#totalDuration');
const songNameElement = document.querySelector('#song-name');
const artistNameElement = document.querySelector('#artist');
const playCountElement = document.querySelector('#play-count');
const playerElement = document.querySelector('#player-frame');
//

// Helper functions
// this function will take the array as an argument and return the next id.
const nextId = (array) => array[array.length - 1].id + 1;

// create a copy of an object so we can see its state at a particular point in time.
const copy = (obj) => JSON.parse(JSON.stringify(obj));

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

function copy(obj) {
  return JSON.parse(JSON.stringify(obj))
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

// DOM Manipulation

function renderSong(song) {
  const li = document.createElement('li');
  li.className = "flex justify-between p-2 pr-4 cursor-pointer";
  li.dataset.id = song.id;
  li.innerHTML = `
  <div>
    <span class="song font-semibold"></span>
    <span class="artist text-gray-400"></span>
  </div>
  <div class="duration text-gray-400"></div>`;
  const songEl = li.querySelector('.song');
  const artistEl = li.querySelector('.artist');
  const durationEl = li.querySelector('.duration')
  songEl.textContent = song.name;
  artistEl.textContent = `by ${song.artist}`;
  durationEl.textContent = formatDuration(song.duration);
  playlistElement.append(li);
  return li;
}

function loadPlaylistToSidebar(playlist) {
  playlistElement.innerHTML = "";
  playlist.forEach(renderSong)
}

loadPlaylistToSidebar(playlist);

// take playlist as argument and add options for each artist to the dropdown
function loadArtistChoices(playlist) {
  const artistSelect = document.querySelector('#filterByArtist');
  artistSelect.innerHTML = `<option value="">Filter by artist</option>`;
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
    artistSelect.append(option);
  });
}

function loadSongIntoPlayer(song) {
  songNameElement.textContent = song.name;
  artistNameElement.textContent = song.artist;
  playCountElement.textContent = `${song.playCount} play(s)`;
  playerElement.src = `https://www.youtube.com/embed/${extractVideoID(song.youtubeLink)}`
}

function songsByArtist(playlist, artist) {
  const songsByArtist = playlist.filter(song => song.artist === artist)
  loadPlaylistToSidebar(songsByArtist)
}

// Data

function addSongToPlaylist(playlist, song) {
  const newSong = Object.assign({}, song, {
    id: nextId(playlist),
    playCount: 0
  })
  playlist.push(newSong);
  renderSong(newSong)
  return song;
}

function removeSongFromPlaylist(playlist, songId) {
  const foundSongIndex = playlist.findIndex(song => song.id === songId)
  if (foundSongIndex !== -1) {
    const songToRemove = playlist.splice(foundSongIndex, 1)[0];
    // 🚧 🚧 🚧 Remove the song from playlist in the sidebar
    ____
    return songToRemove;
  } else {
    alert('Song not found!')
  }
}



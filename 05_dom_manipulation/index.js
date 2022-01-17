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
    // name: '<style>@keyframes x{}</style><img style="animation-name:x" onanimationend="console.error(\'Something nefarious just happened!!!\')"/>Another One Bites the Dust',
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
// 🚧 🚧 🚧 assign variables for important DOM elements
const playlistElement =  document.querySelector('#playlist');
const playlistDurationElement = document.querySelector('#totalDuration');
const songNameElement = document.querySelector('#song-name');
const artistNameElement = document.querySelector('#artist');
const playCountElement = document.querySelector('#play-count');
const playerElement = document.querySelector('#player-form');


// this function will take the array as an argument and return the next id.
const nextId = (array) => array[array.length - 1].id + 1;

// create a copy of an object so we can see its state at a particular point in time.
const copy = (obj) => JSON.parse(JSON.stringify(obj));

function formatDuration(numSeconds) {
  const seconds = numSeconds % 60; // numSeconds - minutes * 60
  const minutes = Math.floor(numSeconds / 60) % 60;
  const hours = Math.floor(numSeconds / 3600);
  if (hours > 0) {
    return `${hours}:${zeroPad(minutes)}:${zeroPad(seconds)}`
  } else if (minutes > 0) {
    return `${minutes}:${zeroPad(seconds)}`
  } else {
    return `0:${zeroPad(seconds)}`
  }
}

function zeroPad(num) {
  if (num < 10) {
    return `0${num}`
  } else {
    return `${num}`
  }
}

function formattedDurationToSeconds(durationString) {
  const durationArray = durationString.split(':');
  const minutes = parseInt(durationArray[0])
  const seconds = parseInt(durationArray[1])
  return minutes*60 + seconds
}

// uncomment the below to test it out
// console.log(formattedDurationToSeconds('3:36'))

// ✅ Creating DOM elements (Avoiding XSS vulnerability)

function renderSong(song) {
  const li = document.createElement('li') || ____;
  li.className = "flex justify-between p-2 pr-4 cursor-pointer"
  li.innerHTML = `
  <div>
    <span class="song font-semibold"></span>
    <span class="artist text-gray-400"></span>
  </div>
  <div class="duration text-gray-400">${formatDuration(song.duration)}</div>`
  const songEl = li.querySelector('.song');
  const artistEl = li.querySelector('.artist');
  songEl.textContent = `${song.name}`
  artistEl.textContent = `by ${song.artist}`
  // fill in the blank below with the code needed to find the
  // element on the page where we want to append the li
  // 🚧 🚧 🚧
  playlistElement.append(li);
  return li;
}


function loadPlaylistToSidebar(playlist) {
  // 🚧 🚧 🚧 write the code needed to load all songs in the playlist
  // into the sidebar
  playlist.forEach(renderSong);
 
}

// // 👟👟👟 uncomment the line below to test

loadPlaylistToSidebar(playlist);

// once we've got the songs loaded into the sidebar,
// we'll update the playlist array up top to demonstrate
// the XSS vulnerability and then we'll refactor to fix 
// the issue.

function addSongToPlaylist(playlist, song) {
  const newSong = Object.assign({}, song, {
    id: nextId(playlist),
    playCount: 0
  })
  playlist.push(newSong);
  // 🚧 🚧 🚧 Update the DOM with the new song in the sidebar
  renderSong(newSong);
  return song;
}

// // 👟👟👟 uncomment the lines below to test

window.setTimeout(() => {
  console.log('addSongToPlaylist', addSongToPlaylist(playlist, {
    name: "Georgia On My Mind",
    artist: 'Ray Charles',
    duration: 217,
    youtubeLink: 'https://www.youtube.com/watch?v=ggGzE5KfCio'
  })) 
  console.log('playlist after addSongToPlaylist', copy(playlist))
}, 1000)

// ✅ Removing DOM elements

function removeSongFromPlaylist(playlist, songId) {
  const foundSongIndex = playlist.findIndex(song => song.id === songId)
  if (foundSongIndex !== -1) {
    const songToRemove = playlist.splice(foundSongIndex, 1)[0];
    // 🚧 🚧 🚧 Remove the song from playlist in the sidebar
    return songToRemove;
  } else {
    alert('Song not found!')
  }
}

// // 👟👟👟 uncomment the lines below to test

// window.setTimeout(() => {
//   console.log('removeSongFromPlaylist', removeSongFromPlaylist(playlist, '9'))
//   console.log('playlist after addSongToPlaylist', copy(playlist))
// }, 3000)

// ✅ Updating DOM elements

// accepts a YoutubeURL as an argument, extracts and
// returns the Youtube Video ID.
function extractVideoID(url) {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[7].length == 11) {
    return match[7];
  } else {
    alert("Could not extract video ID.");
  }
}

// update the main section of the DOM with information
// using the following helper functions defined above:
// Take care **NOT** to put the youtubeLink from the song directly into the src attribute for the iframe. We want it to be an embed version of the link and we want to make sure we're extracting the VideoID using the function defined above
// 🚧 🚧 🚧
function loadSongIntoPlayer(song) {
  // target the songName element and put the song's name inside
  songNameElement.textContent = song.name; //key in object
  // get the artist element and put the artist's name inside of it
  artistNameElement.textContent = song.artist; //key in object
  // get the play count element and put the song's playCount into it
  playCount.textContent = `${song.playCount} plays(s)`;
  // get the playerElement and use the extractVideoID function as 
  // in the example below to set the src attribute of the iframe
  //`https://www.youtube.com/embed/${extractVideoID(song.youtubeLink)}`;
  playerElement.src = `https://www.youtube.com/embed/${extractVideoID(song.youtubeLink)}`;
}



// // 👟👟👟 uncomment the lines below to test


loadSongIntoPlayer(playlist[0]);
// loadSongIntoPlayer(playlist[1]);
// loadSongIntoPlayer(playlist[2]);
// loadSongIntoPlayer(playlist[3]);
// loadSongIntoPlayer(playlist[4]);
// loadSongIntoPlayer(playlist[5]);
// loadSongIntoPlayer(playlist[6]);


// replace the playlist in the sidebar with songs that match the artist passed as an argument
// update the `loadSongsIntoSidebar` function so that it loads 
// the first song in the playlist passed as an argument into 
// the player
function songsByArtist(playlist, artist) {
  playlistElement.innerHTML = '';
  // how do we replace the songs in the sidebar with only the ones matching the artist passed as an argument?
  
}


// // 👟👟👟 uncomment the line below to test

// songsByArtist(playlist, 'Queen')
// loadPlaylistToSidebar() // to restore original playlist or just uncomment the line above
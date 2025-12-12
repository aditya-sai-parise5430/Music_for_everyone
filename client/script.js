console.log("Welcome to Musicforfree");

// === CONFIG ===
// During development use your local backend
// When you deploy to Render, change this to your Render URL
const API_BASE = "http://127.0.0.1:5000";

// === INITIALISE VARIABLES ===
let songIndex = 0;
let audioElement = new Audio(); // no default file, we will set it after we load from backend
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = []; // will be filled from backend

// === LOAD SONGS FROM BACKEND ===
async function loadSongsFromBackend() {
    try {
        const res = await axios.get(`${API_BASE}/api/songs`);
        const data = res.data;

        // Convert backend song objects to frontend-friendly format
        songs = data.map(song => ({
            id: song._id,
            title: song.title,
            artist: song.artist,
            songName: `${song.title} - ${song.artist}`,
            filePath: `${API_BASE}${song.audioUrl}`,     // full URL to the audio file
            coverPath: song.coverUrl
                ? `${API_BASE}${song.coverUrl}`
                : "covers/1.jpeg"                        // fallback cover if missing
        }));

        console.log("Loaded songs from backend:", songs);

        // Fill UI song list (songItem divs) with cover + name
        songs.forEach((song, i) => {
            if (songItems[i]) {
                songItems[i].getElementsByTagName("img")[0].src = song.coverPath;
                songItems[i].getElementsByClassName("songName")[0].innerText = song.songName;
            }
        });

        // Set the first song as default
        if (songs.length > 0) {
            songIndex = 0;
            audioElement.src = songs[0].filePath;
            masterSongName.innerText = songs[0].songName;
        } else {
            console.warn("No songs available from backend yet.");
        }
    } catch (err) {
        console.error("Error loading songs from backend:", err);
    }
}

// === HANDLE MASTER PLAY/PAUSE CLICK ===
masterPlay.addEventListener('click', () => {
    if (!audioElement.src && songs.length > 0) {
        // if audio src not set yet but we have songs
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
    }

    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// === UPDATE PROGRESS BAR ===
audioElement.addEventListener('timeupdate', () => {
    if (!audioElement.duration || isNaN(audioElement.duration)) return;
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    if (!audioElement.duration || isNaN(audioElement.duration)) return;
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

// === MAKE ALL PLAY ICONS RESET TO PLAY STATE ===
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

// === HANDLE INDIVIDUAL SONG CLICK ===
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        if (songs.length === 0) return; // no songs yet

        makeAllPlays();
        songIndex = parseInt(e.target.id); // assumes id = 0,1,2...

        if (!songs[songIndex]) return;

        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');

        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    });
});

// === NEXT BUTTON ===
document.getElementById('next').addEventListener('click', () => {
    if (songs.length === 0) return;

    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }

    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

// === PREVIOUS BUTTON ===
document.getElementById('previous').addEventListener('click', () => {
    if (songs.length === 0) return;

    if (songIndex <= 0) {
        songIndex = songs.length - 1;
    } else {
        songIndex -= 1;
    }

    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
});

// === INITIAL LOAD ===
loadSongsFromBackend();

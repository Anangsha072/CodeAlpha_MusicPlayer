// script.js

const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const volumeSlider = document.getElementById('volume');
const volumeIcon = document.getElementById('volume-icon');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progressContainer = document.querySelector('.progress-container');
const progress = document.querySelector('.progress');

const songs = [
    {
        title: "Sorry",
        artist: "Justin Bieber",
        src: "audio1.mp3"
    },
    {
        title: "On my way",
        artist: "Sabrina Carpenter",
        src: "audio2.mp3"
    },
    {
        title: "Unstoppable",
        artist: "Sia",
        src: "audio3.mp3"
    },
    {
        title: "Stay",
        artist: "Justin Bieber",
        src: "audio4.mp3"
    },
    {
        title: "Count on Me",
        artist: "Bruno Mars",
        src: "audio5.mp3"
    },
    {
        title: "Shape Of You",
        artist: "Ed Sheeran",
        src: "audio6.mp3"
    }
];

let songIndex = 0;

function loadSong(song) {
    title.innerText = song.title;
    artist.innerText = song.artist;
    audio.src = song.src;
}

function playSong() {
    audio.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
}

function pauseSong() {
    audio.pause();
    playBtn.innerHTML ='<i class="fas fa-play"></i>';
}

function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
}

function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playSong();
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

function setVolume() {
    audio.volume = volumeSlider.value;
    updateVolumeIcon();
}
function updateVolumeIcon(){
    if (audio.volume === 0) {
        volumeIcon.className = 'fas fa-volume-mute';
    } else if (audio.volume < 0.5) {
        volumeIcon.className = 'fas fa-volume-down';
    } else {
        volumeIcon.className = 'fas fa-volume-up';
    }

}


playBtn.addEventListener('click', () => {
    if (audio.paused) {
        playSong();
    } else {
        pauseSong();
    }
});

nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
volumeSlider.addEventListener('input', setVolume);

loadSong(songs[songIndex]);

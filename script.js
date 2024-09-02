
// Tableau des chansons
let tableMusic = [
    {
        title: "Blue Skies",
        author: "Silent Patner",
        file: "Blue_Skies.mp3",
        image: "1.jpg"
    },
    {
        author: "Media Right Productions",
        title: "Cartoon Hoedown",
        file: "Cartoon_Hoedown.mp3",
        image: "2.jpg"

    },
    {
        author: "Jingle Punks",
        title: "Earthy Crust",
        file: "Earthy_Crust.mp3",
        image: "3.jpg"
    },
    {
        author: "Hold On a Minute",
        title: "Silent Partner",
        file: "Hold_On_a_Minute.mp3",
        image: "4.jpg"
    },
    {
        author: "City of Prague Philharmonic",
        title: "John Dunbar Theme",
        file: "JohnDunbarTheme.mp3",
        image: "5.jpg"
    },
    {
        author: "Silent Patner",
        title: "Stay with You",
        file: "Stay_With_You.mp3",
        image: "6.jpg"
    },
    {
        author: "Beethoven",
        title: "Symphony No. 5 (by Beethoven)",
        file: "Symphony_No_5_by_Beethoven.mp3",
        image: "7.jpg"
    },

]

// Sélection des éléments HTML en faisant une correspondance avec les images
let artistName = document.getElementById("artist-name");
let songTitle = document.getElementById("song-title");
let songGrid = document.getElementById("song-grid");
let mediaplayer = document.getElementById("mediaplayer");
let album = document.getElementsByClassName("album");
let currentTrackIndex = 0;
mediaplayer.src = tableMusic[currentTrackIndex].file

// Fonction pour charger/cibler et jouer une chanson
function loadTrack(i) {
    let track = tableMusic[i];
    mediaplayer.src = track.file
    artistName.textContent = track.author;
    songTitle.textContent = track.file;
    album.src = track.image;
    mediaplayer.play();
}

// Initialisation du chargement
// loadTrack(currentTrackIndex);

// Recuperer les éléments json et les transformer en nouveau html
function trackSongCard(songs) {
    songs.forEach((track, i) => {
        let card = document.createElement("figure");
        card.className = "card";
        card.innerHTML = `
            <img src="${track.image}" alt="${track.title}">
            <figcaption>${track.author}</figcaption>
            <figcaption class="title">${track.title}</figcaption>
            `;
        card.addEventListener("click", () => loadTrack(i));
        songGrid.appendChild(card);
    });
}
trackSongCard(tableMusic);

// Bouton play method1
// const playButton = document.querySelector("#btnPlay-pause");
// playButton.addEventListener("click", function(){
//     play();

// });

// // Fontion play
// function play() {
//     document.getElementById("mediaplayer").src=tableMusic[0].file;
// 	document.getElementById("mediaplayer").play();

// }

// Fontion playPause
function playPause() {
    if (mediaplayer.paused) {
        mediaplayer.play();
        this.textContent = "&#9658;"

    } else {
        mediaplayer.pause();
        this.textContent = "⏯"
    }
}
document.getElementById("btnPlay-pause").addEventListener("click", function () {
    playPause();
});


// <--Bouton previous-->
const previousButton = document.querySelector("#btnPrevious");
previousButton.addEventListener("click", function () {
    previous();

});

function previous() {
    currentTrackIndex = (currentTrackIndex - 1 + tableMusic.length) % tableMusic.length;
    loadTrack(currentTrackIndex);
    // mediaplayer.file = tableMusic[i];
    // mediaplayer.play();
}

// <--Bouton next-->
const nextButton = document.querySelector("#btnNext");
nextButton.addEventListener("click", function () {
    next();

});

// Fontion next
function next() {
    currentTrackIndex = (currentTrackIndex + 1 + tableMusic.length) % tableMusic.length;
    loadTrack(currentTrackIndex);
    // mediaplayer.file = tableMusic[i];
    // mediaplayer.play();
}

// Bouton volume moins et plus et ajustement du slider
const decreaseButton = document.querySelector("#decreaseVolume");
const increaseButton = document.querySelector("#increaseVolume");
const range = document.getElementById("progression");

let volume = 0.5;
mediaplayer.volume = volume;

// Bouton pour diminuer le volume
decreaseButton.addEventListener("click", function () {
    volume -= 0.1;
    if (volume < 0) {
        volume = 0;
    }
    mediaplayer.volume = volume;
    range.value = volume * 100;
});

// Bouton pour augmenter le volume
increaseButton.addEventListener("click", function () {
    volume += 0.1;
    if (volume > 1) {
        volume = 1;
    }
    mediaplayer.volume = volume;
    range.value = volume * 100;
})

//Slider pour ajuster le range avec le volume
range.addEventListener("input", function () {
    volume = range.value / 100;
    mediaplayer.volume = volume;
});

// Bouton de recherche
let searchButton = document.getElementById("search-img");
searchButton.addEventListener("click", function () {
    search();
});

// Fonction de champs de recherche
function search() {
    let input = document.getElementById("searchBar").value;
    let tabSearch = [];
    tableMusic.forEach((song) => {

        if (song.title.startsWith(input)) {
            tabSearch.push(song);
        }
    });
    songGrid.innerHTML = "";
    trackSongCard(tabSearch);
}

// Mise à jour du range par rapport à l'évolution de la musique
mediaplayer.addEventListener("timeupdate", function () {
    update(mediaplayer);
});

// Fonction de la progression de la musique 
function update(player) {
    var duration = player.duration;    // Durée totale
    var time = player.currentTime; // Temps écoulé
    var fraction = time / duration;

    var percent = Math.ceil(fraction * 100);
    var progress = document.querySelector('#progressBar');

    progress.style.width = percent + '%';
    progress.textContent = percent + '%';
}



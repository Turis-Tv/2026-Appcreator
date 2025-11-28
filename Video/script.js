const playerView = document.getElementById('player-view');
const gridView = document.getElementById('channel-grid-view');
const controlsOverlay = document.getElementById('controls-overlay');
const epgOverlay = document.getElementById('epg-overlay');
const playPauseBtn = document.getElementById('play-pause-btn');

// Functie om de Player te openen (verticaal schuiven)
function openPlayer() {
    // Zorgt ervoor dat de player-view nu zichtbaar kan worden
    playerView.classList.remove('closed');
    // Start de schuif-animatie (van 100% naar 0%)
    setTimeout(() => {
        playerView.classList.add('open');
        // Verberg de grid na de animatie
        gridView.style.display = 'none';
    }, 10); // Kleine vertraging voor de CSS transitie

    // Toon de controls en verberg ze automatisch na 5 seconden
    showControlsAndHide();
}

// Functie om de Player te sluiten
function closePlayer() {
    // Start de schuif-animatie (van 0% naar 100%)
    playerView.classList.remove('open');
    gridView.style.display = 'block';

    // Verberg de player volledig nadat de animatie klaar is (0.5s)
    setTimeout(() => {
        playerView.classList.add('closed');
    }, 500);
}

// Functie om Play/Pause te togglen
function togglePlayPause() {
    const icon = playPauseBtn.querySelector('i');
    if (icon.classList.contains('fa-pause')) {
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
        // Logica: Pauzeer de video
    } else {
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
        // Logica: Speel de video af
    }
}

// Functie om de EPG (Programmagids) te tonen/verbergen
function toggleEPG() {
    epgOverlay.classList.toggle('hidden');
}

// Functie om de controls te tonen en automatisch te verbergen
let controlTimeout;

function hideControls() {
    controlsOverlay.classList.add('hidden');
    // Zorg ervoor dat de EPG ook sluit als de controls verdwijnen
    epgOverlay.classList.add('hidden');
}

function showControlsAndHide() {
    clearTimeout(controlTimeout);
    controlsOverlay.classList.remove('hidden');

    // Controls automatisch verbergen na 5 seconden inactiviteit
    controlTimeout = setTimeout(hideControls, 5000);
}

// Luister naar muisbewegingen (voor desktops) of aanrakingen (voor mobiel)
// om de controls weer te tonen bij activiteit
document.getElementById('video-area').addEventListener('mousemove', showControlsAndHide);
document.getElementById('video-area').addEventListener('click', showControlsAndHide);

// Initialisatie: zorg ervoor dat de player bij start verborgen is
window.onload = function() {
    closePlayer();
}
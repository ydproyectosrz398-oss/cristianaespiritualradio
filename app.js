const firebaseConfig = {
  apiKey: "AIzaSyAhQzly1lZemafx1SU1iQKlav6oyDTOqKw",
  authDomain: "radiocristianaespiritual.firebaseapp.com",
  projectId: "radiocristianaespiritual",
  storageBucket: "radiocristianaespiritual.firebasestorage.app",
  messagingSenderId: "93851149213",
  appId: "1:93851149213:web:5816335e8b9e8d6314c574"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

/* ELEMENTOS DEL DOM */
const intro = document.getElementById("intro");
const video = document.getElementById("introVideo");
const player = document.getElementById("player");
const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const songTitle = document.getElementById("songTitle");

/* PLAYLIST (Rutas a la raíz de GitHub) */
const songs = [
  { title: "📻 Radio", file: "AnuncioRadio.mp3" }, // Posición 0
  { title: "Calles de oro", file: "CallesDeOro.mp3" },
  { title: "Camina Por Las Aguas", file: "CaminaPorLasAguas.mp3" },
  { title: "Canta a Dios", file: "CantaADios.mp3" },
  { title: "Cantale", file: "Cantale.mp3" },
  { title: "Cantaran los santos", file: "CantaranLosSantos.mp3" },
  { title: "Comed y bebed", file: "ComedYBebed.mp3" },
  { title: "Contigo esta", file: "ContigoEsta.mp3" },
  { title: "Coros celestiales", file: "CorosCelestiales.mp3" },
  { title: "Convencion", file: "Convencion.mp3" },
  { title: "Cristo vino", file: "CristoVino.mp3" }
];

let currentSong = 0;
let songsPlayed = 0;
let playing = false;

/* DESBLOQUEO DE AUDIO */
document.addEventListener("click", () => {
  if(audio.paused && playing) audio.play().catch(() => {});
}, { once: true });

/* INTRO VIDEO */
video.onended = () => {
  intro.style.opacity = "0";
  setTimeout(() => {
    intro.style.display = "none";
    player.classList.remove("hidden");
    playing = true;
    audio.play().then(() => { playBtn.innerText = "PAUSE"; }).catch(() => {});
  }, 800);
};

/* PLAY / PAUSE */
playBtn.addEventListener("click", () => {
  if(audio.paused) {
    audio.play();
    playBtn.innerText = "PAUSE";
    playing = true;
  } else {
    audio.pause();
    playBtn.innerText = "PLAY";
    playing = false;
  }
});

/* FIREBASE: SINCRONIZACIÓN EN TIEMPO REAL */
const radioRef = db.ref("radio");

radioRef.on("value", (snapshot) => {
  const data = snapshot.val();
  if (!data) return;

  currentSong = data.currentSong;
  audio.src = songs[currentSong].file;
  songTitle.innerText = songs[currentSong].title;

  const now = Date.now();
  const elapsed = (now - data.startedAt) / 1000;

  audio.onloadedmetadata = () => {
    if (elapsed < audio.duration) audio.currentTime = elapsed;
    if (playing) audio.play().catch(() => {});
  };
});

/* LÓGICA DE 3 CANCIONES + ANUNCIO */
audio.addEventListener("ended", () => {
  let nextSong;
  if (currentSong === 0) {
    nextSong = Math.floor(Math.random() * (songs.length - 1)) + 1;
  } else {
    songsPlayed++;
    if (songsPlayed >= 3) {
      nextSong = 0; // Toca AnuncioRadio.mp3
      songsPlayed = 0;
    } else {
      nextSong = Math.floor(Math.random() * (songs.length - 1)) + 1;
    }
  }
  radioRef.set({ currentSong: nextSong, startedAt: Date.now() });
});

/* LIKES & LOGIN */
const likeBtn = document.getElementById("likeBtn");
const loginBtn = document.getElementById("loginBtn");
const userInfo = document.getElementById("userInfo");
const provider = new firebase.auth.GoogleAuthProvider();
let currentUser = null;

loginBtn.addEventListener("click", () => {
  firebase.auth().signInWithPopup(provider).catch(e => console.log(e));
});

firebase.auth().onAuthStateChanged((user) => {
  if(user) {
    currentUser = user;
    loginBtn.style.display = "none";
    userInfo.innerHTML = `👋 ${user.displayName}`;
  }
});

db.ref("likes").on("value", (snapshot) => {
  likeBtn.innerHTML = `❤️ ${snapshot.val() || 0}`;
});

likeBtn.addEventListener("click", () => {
  if(!currentUser) return alert("Inicia sesión primero");
  db.ref("likes").transaction(c => (c || 0) + 1);
});

/* SERVICE WORKER */
if("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js");
  });
}

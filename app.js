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

/* ELEMENTOS */

const intro = document.getElementById("intro");
const video = document.getElementById("introVideo");

const player = document.getElementById("player");

const audio = document.getElementById("audio");

const playBtn = document.getElementById("playBtn");

const songTitle = document.getElementById("songTitle");

/* DESBLOQUEAR AUDIO MOVIL */

document.addEventListener("click", () => {

  audio.play().catch(() => {});

}, { once:true });

/* =========================
   PLAYLIST
========================= */

const songs = [

  {
    title:"📻 Radio",
    file:"assets/music/AnuncioRadio.mp3",
    ad:true
  },

  {
    title:"Calles de oro",
    file:"assets/music/CallesDeOro.mp3"
  },

  {
    title:"Camina Por Las Aguas",
    file:"assets/music/CaminaPorLasAguas.mp3"
  },

  {
    title:"Canta a Dios",
    file:"assets/music/CantaADios.mp3"
  },

  {
    title:"Cantale",
    file:"assets/music/Cantale.mp3"
  },

  {
    title:"Cantaran los santos",
    file:"assets/music/CantaranLosSantos.mp3"
  },

  {
    title:"Comed y bebed",
    file:"assets/music/ComedYBebed.mp3"
  },

  {
    title:"Contigo esta",
    file:"assets/music/ContigoEsta.mp3"
  },

  {
    title:"Coros celestiales",
    file:"assets/music/CorosCelestiales.mp3"
  },

  {
    title:"Convencion",
    file:"assets/music/Convencion.mp3"
  },

  {
    title:"Cristo vino",
    file:"assets/music/CristoVino.mp3"
  }

];

/* =========================
   VARIABLES
========================= */

let currentSong = 0;

let songsPlayed = 0;

let playing = false;

/* CARGAR PRIMERA */

audio.src = songs[currentSong].file;

songTitle.innerText = songs[currentSong].title;

/* =========================
   INTRO VIDEO
========================= */

video.onended = () => {

  intro.style.opacity = "0";

  setTimeout(() => {

    intro.style.display = "none";

    player.classList.remove("hidden");

    audio.play()

    .then(() => {

      playBtn.innerText = "PAUSE";

      playing = true;

    })

    .catch(() => {

      console.log("Autoplay bloqueado");

    });

  }, 800);

};

/* =========================
   PLAY / PAUSE
========================= */

playBtn.addEventListener("click", () => {

  if(!playing){

    audio.play();

    playBtn.innerText = "PAUSE";

    playing = true;

  }else{

    audio.pause();

    playBtn.innerText = "PLAY";

    playing = false;

  }

});

/* =========================
   FIREBASE RADIO
========================= */

const radioRef = db.ref("radio");

/* ESCUCHAR CAMBIOS */

radioRef.on("value", (snapshot) => {

  const data = snapshot.val();

  if(!data) return;

  currentSong = data.currentSong;

  audio.src = songs[currentSong].file;

  songTitle.innerText = songs[currentSong].title;

  const now = Date.now();

  const elapsed = (now - data.startedAt) / 1000;

  audio.onloadedmetadata = () => {

    if(elapsed < audio.duration){

      audio.currentTime = elapsed;

    }

    audio.play()

    .then(() => {

      playBtn.innerText = "PAUSE";

      playing = true;

    })

    .catch(() => {

      console.log("Autoplay bloqueado");

    });

  };

});

/* =========================
   TERMINA CANCION
========================= */

audio.addEventListener("ended", () => {

  let nextSong;

  /* SI ERA AUDIO ESPECIAL */

  if(currentSong === 0){

    nextSong = Math.floor(Math.random() * (songs.length - 1)) + 1;

  }else{

    songsPlayed++;

    /* CADA 3 CANCIONES */

    if(songsPlayed >= 3){

      nextSong = 0;

      songsPlayed = 0;

    }else{

      nextSong = Math.floor(Math.random() * (songs.length - 1)) + 1;

    }

  }

  radioRef.set({

    currentSong: nextSong,

    startedAt: Date.now()

  });

});

/* =========================
   INSTALAR PWA
========================= */

let deferredPrompt;

const installBtn = document.getElementById("installBtn");

installBtn.style.display = "none";

window.addEventListener("beforeinstallprompt", (e) => {

  e.preventDefault();

  deferredPrompt = e;

  installBtn.style.display = "flex";

});

/* BOTON INSTALAR */

installBtn.addEventListener("click", async () => {

  if(deferredPrompt){

    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;

    if(outcome === "accepted"){

      installBtn.style.display = "none";

    }

  }

});
/* =========================
   FIREBASE AUTH
========================= */

const loginBtn = document.getElementById("loginBtn");

const userInfo = document.getElementById("userInfo");

const provider = new firebase.auth.GoogleAuthProvider();

let currentUser = null;

/* LOGIN GOOGLE */

loginBtn.addEventListener("click", () => {

  firebase.auth().signInWithPopup(provider)

  .then((result) => {

    console.log("Login correcto");

  })

  .catch((error) => {

    console.log(error);

  });

});

/* DETECTAR LOGIN */

firebase.auth().onAuthStateChanged((user) => {

  if(user){

    currentUser = user;

    loginBtn.style.display = "none";

    userInfo.innerHTML = `👋 ${user.displayName}`;

  }

});

/* =========================
   LIKES
========================= */

const likeBtn = document.getElementById("likeBtn");

const likesRef = db.ref("likes");

/* MOSTRAR LIKES */

likesRef.on("value", (snapshot) => {

  const totalLikes = snapshot.val() || 0;

  likeBtn.innerHTML = `❤️ ${totalLikes}`;

});

/* DAR LIKE */

likeBtn.addEventListener("click", () => {

  if(!currentUser){

    alert("Inicia sesión primero");

    return;

  }

  likesRef.transaction((currentLikes) => {

    return (currentLikes || 0) + 1;

  });

});
/* =========================
   SERVICE WORKER
========================= */

if("serviceWorker" in navigator){

  window.addEventListener("load", () => {

    navigator.serviceWorker.register("sw.js")

    .then(() => {

      console.log("Service Worker registrado");

    });

  });

  }

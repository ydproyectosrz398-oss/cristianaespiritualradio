const firebaseConfig = {
  apiKey: "AIzaSyAhQzly1lZemafx1SU1iQKlav6oyDTOqKw",
  authDomain: "radiocristianaespiritual.firebaseapp.com",
  databaseURL: "https://radiocristianaespiritual-default-rtdb.firebaseio.com",
  projectId: "radiocristianaespiritual",
  storageBucket: "radiocristianaespiritual.appspot.com",
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

const likeBtn = document.getElementById("likeBtn");
const loginBtn = document.getElementById("loginBtn");
const userInfo = document.getElementById("userInfo");

/* PLAYLIST */
const songs = [
  { title: "📻 Radio", file: "AnuncioRadio.mp3" },
  { title: "Calles de oro", file: "CallesDeOro.mp3" },
  { title: "Camina Por Las Aguas", file: "CaminaPorLasAguas.mp3" },
  { title: "Canta a Dios", file: "CantaADios.mp3" },
  { title: "Cantale", file: "Cantale.mp3" },
  { title: "Cantaran los santos", file: "CantaranLosSantos.mp3" },
  { title: "Comed y bebed", file: "ComedYBebed.mp3" },
  { title: "Contigo esta", file: "ContigoEsta.mp3" },
  { title: "Coros celestiales", file: "CorosCelestiales.mp3" },
  { title: "Convencion", file: "convencion.mp3" },
  { title: "Cristo vino", file: "CristoVino.mp3" }
  { title: "7 Trompetas", file: "7trompetas.mp3" }
{ title: "A tus labios", file: "ATusLabios.mp3" }
];

let currentSong = 0;
let playing = false;
let currentUser = null;

/* INTRO */
if(video) {

    video.onended = () => {

        intro.style.opacity = "0";

        setTimeout(() => {

            intro.style.display = "none";

            player.classList.remove("hidden");

        }, 500);
    };
}


/* PLAY BUTTON */
playBtn.addEventListener("click", async () => {

  try {

    if(!audio.src) {

      audio.src = songs[currentSong].file;

      songTitle.innerText = songs[currentSong].title;
    }

    if(audio.paused) {

      await audio.play();

      playBtn.innerText = "PAUSE";

      playing = true;

    } else {

      audio.pause();

      playBtn.innerText = "PLAY";

      playing = false;
    }

  } catch(err) {

    console.log("Error audio:", err);
  }
});

/* FIREBASE RADIO */
const radioRef = db.ref("radio");

radioRef.on("value", snapshot => {

  const data = snapshot.val();

  if(!data || data.currentSong === undefined) {

    radioRef.set({
      currentSong: 0,
      startedAt: Date.now()
    });

    return;
  }

  currentSong = data.currentSong;

  if(!songs[currentSong]) return;

  audio.src = songs[currentSong].file;

  songTitle.innerText = songs[currentSong].title;

  const elapsed = (Date.now() - data.startedAt) / 1000;

  audio.onloadedmetadata = () => {

    if(elapsed < audio.duration) {
      audio.currentTime = elapsed;
    }

    if(playing) {
      audio.play().catch(() => {});
    }
  };
});

/* NEXT SONG */
audio.addEventListener("ended", () => {

  let nextSong = Math.floor(Math.random() * songs.length);

  radioRef.set({
    currentSong: nextSong,
    startedAt: Date.now()
  });
});

/* LOGIN GOOGLE */
const provider = new firebase.auth.GoogleAuthProvider();

loginBtn.addEventListener("click", () => {

  firebase.auth()
    .signInWithPopup(provider)
    .catch(err => {
      console.log(err);
      alert("Error login Google");
    });
});

firebase.auth().onAuthStateChanged(user => {

  if(user) {

    currentUser = user;

    loginBtn.style.display = "none";

    userInfo.innerHTML = `👋 ${user.displayName}`;
  }
});

/* LIKES */
db.ref("likes").on("value", snapshot => {

  likeBtn.innerHTML = `❤️ ${snapshot.val() || 0}`;
});

likeBtn.addEventListener("click", () => {

  if(!currentUser) {
    alert("Inicia sesión primero");
    return;
  }

  db.ref("likes").transaction(current => (current || 0) + 1);
});

/* SERVICE WORKER */
if("serviceWorker" in navigator) {

  window.addEventListener("load", () => {

    navigator.serviceWorker.register("sw.js")
      .then(() => console.log("SW OK"))
      .catch(err => console.log(err));
  });
}

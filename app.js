const firebaseConfig = {
    apiKey: "AIzaSyAhQzly1lZemafx1SU1iQKlav6oyDTOqKw",
    authDomain: "radiocristianaespiritual.firebaseapp.com",
    databaseURL: "https://radiocristianaespiritual-default-rtdb.firebaseio.com",
    projectId: "radiocristianaespiritual",
    storageBucket: "radiocristianaespiritual.appspot.com",
    messagingSenderId: "93851149213",
    appId: "1:93851149213:web:5816335e8b9e8d6314c574"
};

/* FIREBASE */

firebase.initializeApp(firebaseConfig);

const db = firebase.database();

/* ELEMENTOS */

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

    { title: "Cristo vino", file: "CristoVino.mp3" },

    { title: "7 Trompetas", file: "7trompetas.mp3" },

    { title: "A tus labios", file: "ATusLabios.mp3" }

];

/* VARIABLES */

let currentSong = 0;

let currentUser = null;

/* CANCION INICIAL */

audio.src = songs[0].file;

songTitle.innerText = songs[0].title;

/* PLAY */

playBtn.addEventListener("click", async () => {

    try{

        if(audio.paused){

            await audio.play();

            playBtn.innerText = "PAUSE";

        }else{

            audio.pause();

            playBtn.innerText = "PLAY";
        }

    }catch(error){

        console.log(error);
    }
});

/* SIGUIENTE */

audio.addEventListener("ended", () => {

    currentSong++;

    if(currentSong >= songs.length){

        currentSong = 0;
    }

    audio.src = songs[currentSong].file;

    songTitle.innerText = songs[currentSong].title;

    audio.play();
});

/* LOGIN GOOGLE */

const provider = new firebase.auth.GoogleAuthProvider();

loginBtn.addEventListener("click", () => {

    firebase.auth()
        .signInWithPopup(provider)
        .catch(error => {

            console.log(error);

            alert("Error login");
        });
});

/* USER */

firebase.auth().onAuthStateChanged(user => {

    if(user){

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

    if(!currentUser){

        alert("Inicia sesión primero");

        return;
    }

    db.ref("likes").transaction(current => (current || 0) + 1);
});

/* SERVICE WORKER */

if("serviceWorker" in navigator){

    navigator.serviceWorker.register("sw.js");
}

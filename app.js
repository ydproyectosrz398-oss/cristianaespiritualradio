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

/* =========================
   AUDIO BACKGROUND
========================= */

audio.setAttribute("playsinline", "true");

audio.setAttribute("webkit-playsinline", "true");

audio.loop = false;

audio.preload = "auto";

const playBtn = document.getElementById("playBtn");

const songTitle = document.getElementById("songTitle");

const likeBtn = document.getElementById("likeBtn");

const loginBtn = document.getElementById("loginBtn");

const userInfo = document.getElementById("userInfo");

/* =========================
   INTRO IMAGE
========================= */

const intro = document.getElementById("intro");

const player = document.getElementById("player");

setTimeout(() => {

    intro.style.opacity = "0";

    setTimeout(() => {

        intro.style.display = "none";

        player.classList.remove("hidden");

    }, 500);

}, 4000);

/* =========================
   INSTALL PWA
========================= */

const installBtn = document.getElementById("installBtn");

let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {

    e.preventDefault();

    deferredPrompt = e;

    installBtn.style.display = "block";
});

installBtn.addEventListener("click", async () => {

    if(!deferredPrompt) return;

    deferredPrompt.prompt();

    const choiceResult = await deferredPrompt.userChoice;

    if(choiceResult.outcome === "accepted"){

        console.log("PWA instalada");
    }

    deferredPrompt = null;
});

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

    { title: "A tus labios", file: "ATusLabios.mp3" },

    { title: "Adan", file: "Adan.mp3" },

    { title: "Ahora Ven", file: "AhoraVen.mp3" },

    { title: "Alabad a Jehova", file: "AlabadAJehova.mp3" },

    { title: "Alabale al Señor", file: "AlabaleAlSenor.mp3" },

    { title: "Alma asustada", file: "AlmaAsustada.mp3" },

    { title: "Alma cuerpo y corazon", file: "AlmaCuerpoYCorazon.mp3" },

    { title: "Alma de poeta", file: "AlmaDePoeta.mp3" },

    { title: "Almas expuestas", file: "AlmasExpuestas.mp3" },

    { title: "Almas perdidas", file: "AlmasPerdidas.mp3" },

    { title: "Ante tu altar", file: "AnteTuAltar.mp3" },

    { title: "Aquella noche", file: "AquellaNoche.mp3" },

    { title: "Aquella tarde gris", file: "AquellaTardeGris.mp3" },

    { title: "Ayuda Idonea", file: "AyudaIdo.mp3" },

    { title: "Bastate de mi gracia", file: "BastateMiGracia.mp3" },

    { title: "Cada que me hablan de ti", file: "CadaQueMeHablan.mp3" },

    { title: "Cancion de amor", file: "CancionDeAmor.mp3" },

    { title: "Cancion de amor 2", file: "Canciondeamor2.mp3" },

    { title: "El cantar de las aves", file: "CantarDeLasAves.mp3" },

    { title: "Conversion", file: "Conversion.mp3" },

    { title: "Cual siervo", file: "CualSiervo.mp3" },

    { title: "Cuando vengas a la casa de Dios", file: "CuandoVengasALaCasaDeDios.mp3" },

    { title: "Despedida", file: "Despedida.mp3" },

    { title: "Diez Virgenes", file: "DiezVrgenes.mp3" },

    { title: "Dios", file: "Dios.mp3" },

    { title: "Dios de tu padre", file: "DiosDeTuPadre.mp3" },

    { title: "Dios esta aqui", file: "DiosEstaAqui.mp3" },

    { title: "Diosito nos ayuda", file: "DiositoNosAyuda.mp3" },

    { title: "Divinidad y ciencia", file: "DivinidadYCiencia.mp3" },

    { title: "El amor", file: "ElAmor.mp3" },

    { title: "El amor 2", file: "ElAmor2.mp3" },

    { title: "El criticon", file: "ElCriticon.mp3" },

    { title: "El hermano del rodeo", file: "ElHermanoDelRodeo.mp3" },

    { title: "El pregon", file: "ElPregon.mp3" },

    { title: "Eli Eli", file: "EliEli.mp3" },

    { title: "Elias", file: "Elias.mp3" },

    { title: "En paz me acostare", file: "EnPazMeAcostare.mp3" },

    { title: "Espiritu santo", file: "EspirituSanto.mp3" },

    { title: "Ezequias", file: "Ezequias.mp3" },

    { title: "Fe", file: "Fe.mp3" },

    { title: "Final Trompeta", file: "FinalTrompeta.mp3" },

    { title: "Final Trompeta 2", file: "FinalTrompeta2.mp3" },

    { title: "Hermosa flor", file: "HermosaFlor.mp3" },

    { title: "Infinito amor", file: "InfinitoAmor.mp3" },

    { title: "Jacob", file: "Jacob.mp3" },

    { title: "Jilguero", file: "Jilguero.mp3" },

    { title: "Job", file: "Job.mp3" },

    { title: "Juicio", file: "Juicio.mp3" },

    { title: "Juicio 2", file: "Juicio2.mp3" },

    { title: "La juventud", file: "LaJuventud.mp3" },

    { title: "Las redes", file: "LasRedes.mp3" },

    { title: "Lazaro", file: "Lazaro.mp3" },

    { title: "Lazaro 2", file: "Lazaro2.mp3" },

    { title: "Lista esta", file: "ListaEst.mp3" },

    { title: "Lista esta 2", file: "ListaEsta.mp3" },

    { title: "Mi guitarra", file: "MiGuitarra.mp3" },

    { title: "Ministrando", file: "Ministrando.mp3" },

    { title: "Mis ojos", file: "MisOjos.mp3" },

    { title: "Monedas de plata", file: "MonedasDePlata.mp3" },

    { title: "Mujer virtuosa", file: "MujerVirtuosa.mp3" },

    { title: "Niños a mi", file: "NiñosAMi.mp3" },

    { title: "Nunca me dejaras", file: "NuncaMeDejaras.mp3" },

    { title: "Pastor", file: "Pastor.mp3" },

    { title: "Pedro en la carcel", file: "PedroEnLaCarcel.mp3" },

    { title: "Poder de Dios", file: "PoderDeDios.mp3" },

    { title: "Por la manana", file: "PorLaManana.mp3" },

    { title: "Samaritano", file: "SAMARITANO.mp3" },

    { title: "Salmo 67", file: "Salmo67.mp3" },

    { title: "Se visten de gala", file: "SeVistenDeGala.mp3" },

    { title: "Solo uno es", file: "SoloUnoEs.mp3" },

    { title: "Tu rostro", file: "TuRostro.mp3" },

    { title: "Boda", file: "VistenDeGala.mp3" },

    { title: "XV años", file: "XVAnos.mp3" },

    { title: "Ante tu altar 2", file: "antetualtar2.mp3" },

    { title: "Bastate de mi gracia 2", file: "bastatemigracia2.mp3" },

    { title: "El canto de mi alma", file: "elcantodemialma.mp3" },

    { title: "El ocaso", file: "elocaso.mp3" },

    { title: "Gala", file: "gala.mp3" },

    { title: "Grandes ciudades", file: "grandesciudades.mp3" },

    { title: "Hermano grunon", file: "hermanogrunon.mp3" },

    { title: "La puerta", file: "lapuerta.mp3" },

    { title: "Llename de ti", file: "llenamedeti.mp3" },

    { title: "Mi dulce niña", file: "midulceniña.mp3" },

    { title: "Mi madre es", file: "mimadrees.mp3" },

    { title: "Ministerio de Dios", file: "ministeriodedios.mp3" },

    { title: "Mono de papel", file: "monodepapel.mp3" },

    { title: "Morir cantando", file: "morircantando.mp3" },

    { title: "No morire", file: "nomorire.mp3" },

    { title: "Nunca me dejaras 2", file: "nuncamedejaras2.mp3" },

    { title: "Profecia", file: "profecia.mp3" },

    { title: "Recorrido de Pablo", file: "recorridodepablo.mp3" },

    { title: "Tu sabes", file: "tusabes.mp3" },

    { title: "Volar", file: "volar.mp3" },

    { title: "Yo te seguire", file: "yoteseguire.mp3" }

];

/* VARIABLES */

let currentSong = 0;

let currentUser = null;

/* =========================
   INICIO ALEATORIO + GUARDADO
========================= */

let savedSong = localStorage.getItem("currentSong");

let savedTime = localStorage.getItem("currentTime");

if(savedSong !== null){

    currentSong = parseInt(savedSong);

}else{

    currentSong = Math.floor(Math.random() * songs.length);
}

audio.src = songs[currentSong].file;

songTitle.innerText = songs[currentSong].title;

audio.addEventListener("loadedmetadata", () => {

    if(savedTime){

        audio.currentTime = parseFloat(savedTime);
    }
});

/* PLAY */

playBtn.addEventListener("click", async () => {

    try{

        if(audio.paused){

            await audio.play();

            playBtn.innerText = "⏸ PAUSE";

        }else{

            audio.pause();

           playBtn.innerText = "▶ PLAY";
        }

    }catch(error){

        console.log(error);
        }

});

 /* =========================
   GUARDAR PROGRESO
========================= */

setInterval(() => {

    if(!audio.paused){

        localStorage.setItem("currentSong", currentSong);

        localStorage.setItem("currentTime", audio.currentTime);
    }

}, 5000);

    
/* =========================
   SHUFFLE INTELIGENTE
========================= */

let songsPlayed = 0;

let playedSongs = [];

audio.addEventListener("ended", () => {

    /* SI TERMINO EL ANUNCIO */
    if(songs[currentSong].file === "AnuncioRadio.mp3"){

        currentSong = getRandomSong();

    }else{

        songsPlayed++;

        /* CADA 3 CANCIONES */
        if(songsPlayed >= 3){

            currentSong = 0;

            songsPlayed = 0;

        }else{

            currentSong = getRandomSong();
        }
    }

    localStorage.setItem("currentSong", currentSong);

    localStorage.setItem("currentTime", 0);

    audio.src = songs[currentSong].file;

    audio.currentTime = 0;

    songTitle.innerText = songs[currentSong].title;

    audio.play();
});

/* RANDOM SIN REPETIR */

function getRandomSong(){

    /* RESETEAR HISTORIAL */

    if(playedSongs.length >= songs.length - 1){

        playedSongs = [];
    }

    let randomSong;

    do{

        randomSong = Math.floor(Math.random() * (songs.length - 1)) + 1;

    }while(playedSongs.includes(randomSong));

    playedSongs.push(randomSong);

    return randomSong;
}

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
/* =========================
   WAKE LOCK
========================= */

let wakeLock = null;

async function activarWakeLock(){

    try{

        wakeLock = await navigator.wakeLock.request("screen");

        console.log("Wake Lock activado");

    }catch(err){

        console.log("Wake Lock error:", err);
    }
}

/* ACTIVAR AL TOCAR PLAY */

playBtn.addEventListener("click", () => {

    activarWakeLock();
});

/* REACTIVAR SI REGRESA A LA APP */

document.addEventListener("visibilitychange", async () => {

    if(wakeLock !== null && document.visibilityState === "visible"){

        activarWakeLock();
    }
});

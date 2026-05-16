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
    
     { title: "Adan", file: "Adan.mp3" }

     { title: "Ahora Ven", file: "AhoraVen.mp3" }

     { title: "Alabad a Jehova", file: "AlabadAJehova.mp3" }

    { title: "Alabale al Señor", file: "AlabaleAlSeñor.mp3" }

    { title: "Alma asustada", file: "AlmaAsustada.mp3" }

   { title: "Alma cuerpo y corazon", file: "AlmaCuerpoYCorazon.mp3" }

    { title: "Alma de poeta", file: "AlmaDePoeta.mp3" }

   { title: "Almas expuestas", file: "AlmasExpuestas.mp3" }

{ title: "Almas perdidas", file: "AlmasPerdidas.mp3" }

{ title: "Ante tu altar", file: "AnteTuAltar.mp3" }
 
{ title: "Aquella noche", file: "AquellaNoche.mp3" }

 { title: "Aquella tarde gris", file: "AquellaTardeGris.mp3" }

 { title: "Ayuda Idonea", file: "AyudaIdo.mp3" }

 { title: "Basate de mi gracia", file: "BastateMiGracia.mp3" }

 { title: "Cada que me hablan de ti", file: "CadaQueMeHablan.mp3" }

 { title: "Cancion de amor", file: "CancionDeAmor.mp3" }

{ title: "Cancion de amor", file: "Canciondeamor2.mp3" }

{ title: "Cancion de amor", file: "CancionDeAmor.mp3" }

{ title: "El cantar de las aves", file: "CantarDeLasAves.mp3" }

{ title: "Conversion", file: "Conversion.mp3" }

{ title: "Cual siervo", file: "CualSiervo.mp3" }

{ title: "Cuando vengas a la casa de Dios", file: "CuandoVengasALaCasaDeDios.mp3" }

{ title: "Despedida", file: "Despedida.mp3" }

{ title: "Diez Virgenes", file: "DiezVrgenes.mp3" }

{ title: "Dios", file: "Dios.mp3" }

{ title: "Dios de tu padre", file: "DiosDeTuPadre.mp3" }

{ title: "Dios esta aqui", file: "DiosEstaAqui.mp3" }

{ title: "Diosito nos ayuda", file: "DiositoNosAyuda.mp3" }

{ title: "Divinidad y ciencia", file: "DivinidadYCiencia.mp3" }

{ title: "El amor", file: "ElAmor.mp3" }

{ title: "El amor", file: "ElAmor2.mp3" }

{ title: "El criticon", file: "ElCriticon.mp3" }

{ title: "El hermano del rodeo", file: "ElHermanoDelRodeo.mp3" }

{ title: "El pregon", file: "ElPregon.mp3" }

{ title: "Eli Eli", file: "EliEli.mp3" }

{ title: "Elias", file: "Elias.mp3" }

{ title: "En paz me acostare", file: "EnPazMeAcostare.mp3" }

{ title: "Espiritu santo", file: "EspirituSanto.mp3" }


{ title: "Ezequias", file: "Ezequias.mp3" }


{ title: "Fe", file: "Fe.mp3" }

{ title: "Final Trompeta", file: "FinalTrompeta.mp3" }

{ title: "Final Trompeta", file: "FinalTrompeta2.mp3" }

{ title: "Hermosa flor", file: "HermosaFlor.mp3" }

{ title: "Infinito amor", file: "InfinitoAmor.mp3" }

{ title: "Jacob", file: "Jacob.mp3" }

{ title: "Jilguero", file: "Jilguero.mp3" }

{ title: "Job", file: "Job.mp3" }

{ title: "Juicio", file: "Juicio.mp3" }

{ title: "Juicio", file: "Juicio2.mp3" }

{ title: "La juventud", file: "LaJuventud.mp3" }

{ title: "Las redes", file: "LasRedes.mp3" }

{ title: "Lazaro", file: "Lazaro.mp3" }

{ title: "Lazaro", file: "Lazaro2.mp3" }

{ title: "Lista esta", file: "ListaEst.mp3" }

{ title: "Lista esta", file: "ListaEsta.mp3" }

{ title: "Mi guitarra", file: "MiGuitarra.mp3" 

 { title: "Ministrando", file: "Ministrando.mp3" }

 { title: "Mis ojos", file: "MisOjos.mp3" }

{ title: "Monedas de plata", file: "MonedasDePlata.mp3" }

 { title: "Mujer virtuosa", file: "MujerVirtuosa.mp3" }

 { title: "Niños a mi", file: "NiñosAMi.mp3" }

 { title: "Nunxa me dejaras", file: "NuncaMeDejaras.mp3" }

 { title: "Pastor", file: "Pastor.mp3" }

 { title: "Pedro en la carcel", file: "PedroEnLaCarcel.mp3" }

 { title: "Poder de Dios", file: "PoderDeDios.mp3" }





















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

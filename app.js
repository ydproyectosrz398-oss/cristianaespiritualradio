<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

    <title>Radio Cristiana Espiritual</title>

    <link rel="stylesheet" href="style.css">

    <!-- Firebase -->
    <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-database.js"></script>
    <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js"></script>

    <!-- ICON -->
    <link rel="shortcut icon" href="icon.png">
</head>

<body>

    <!-- INTRO VIDEO -->
    <div id="intro">
        <video id="introVideo" autoplay muted playsinline>
            <source src="intro.mp4" type="video/mp4">
        </video>
    </div>

    <!-- PLAYER -->
    <div class="app-container hidden" id="player">

        <div class="header-actions">
            <button id="installBtn">⬇️ Instalar App</button>
        </div>

        <div class="cassette-box">
            <img src="assetsportada.png" alt="Portada Radio">
        </div>

        <div class="info-section">
            <h2 id="songTitle">Sincronizando...</h2>
            <p class="status"><span>●</span> EN VIVO</p>
        </div>

        <!-- LOGIN -->
        <button id="loginBtn" class="pill-button white-btn">
            <img 
                src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png"
                class="google-icon"
                alt="Google"
            >
            Iniciar con Google
        </button>

        <div id="userInfo" style="color:#aaa; font-size:0.9rem;"></div>

        <!-- LIKE -->
        <button id="likeBtn" class="pill-button pink-btn">
            ❤️ 0
        </button>

        <!-- PLAY -->
        <button id="playBtn" class="pill-button white-btn">
            PLAY
        </button>

        <!-- AUDIO -->
        <audio id="audio"></audio>

    </div>

    <script src="app.js"></script>

</body>
</html>

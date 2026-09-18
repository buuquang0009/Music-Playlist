document.addEventListener("DOMContentLoaded", function () {

    const audio = document.getElementById("audioPlayer");
    const title = document.getElementById("songTitle");
    const playAllBtn = document.getElementById("playAllBtn");
    const disc = document.getElementById("disc");
    const notesArea = document.getElementById("musicNotes");

    let currentIndex = -1;
    let isPlayingAll = false;

    /* ===== COPY BÀI HÁT ===== */
    const sourceContainer = document.querySelector(".all-songs");
    const sourceSongs = sourceContainer.querySelectorAll("li");

    sourceSongs.forEach(song => {
        const clone = song.cloneNode(true);
        document.querySelector(".playlist-2026")
            .appendChild(clone);
    });

    sourceContainer.remove();

    /* ===== DANH SÁCH BÀI HÁT ===== */
    function getSongs() {
        return Array.from(
            document.querySelectorAll(".playlist-2026 li")
        );
    }

    /* ===== PHÁT THEO INDEX ===== */
    function playByIndex(index) {

        const songs = getSongs();

        if (!songs[index]) return;

        currentIndex = index;

        const song = songs[index];

        title.textContent = song.dataset.name;
        audio.src = song.dataset.file;
        audio.play();

        songs.forEach(li =>
            li.classList.remove("active")
        );

        song.classList.add("active");
    }

    /* ===== CLICK PHÁT ===== */
    document.addEventListener("click", function (e) {

        const li = e.target.closest(
            ".playlist li[data-file]"
        );

        if (!li) return;

        const songs = getSongs();
        const index = songs.indexOf(li);

        isPlayingAll = false;

        playByIndex(index);
    });

    /* ===== PLAY ALL ===== */
    playAllBtn.addEventListener("click", function () {

        const songs = getSongs();

        if (!songs.length) return;

        isPlayingAll = true;

        if (currentIndex === -1) {
            playByIndex(0);
        } else {
            audio.play();
        }
    });

    /* ===== TỰ CHUYỂN BÀI ===== */
    audio.addEventListener("ended", function () {

        if (!isPlayingAll) return;

        const songs = getSongs();

        if (currentIndex < songs.length - 1) {

            playByIndex(currentIndex + 1);

        } else {

            isPlayingAll = false;
            currentIndex = -1;
        }
    });

    /* ===== ĐĨA QUAY ===== */
    audio.addEventListener("play", () => {
        disc.classList.add("spinning");
    });

    audio.addEventListener("pause", () => {
        disc.classList.remove("spinning");
    });

    audio.addEventListener

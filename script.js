/* ================= GLOBAL ================= */
let highestZ = 10;
let noCount = 0;

/* ================= WELCOME ================= */
function enterLove() {
  document.getElementById("welcome").style.display = "none";
  document.getElementById("scene").style.display = "block";
  document.getElementById("music").play();
  initDrag();
}

function noClicked() {
  const noBtn = document.getElementById("noBtn");
  document.getElementById("noSound").play();
  noCount++;

  if (noCount === 1) {
    noBtn.innerText = "Think Twice 😌";
  } else {
    noBtn.style.position = "fixed";
    noBtn.style.left = Math.random() * 260 + "px";
    noBtn.style.top = Math.random() * 320 + "px";
  }
}

function goBackToWelcome() {
  document.getElementById("scene").style.display = "none";
  document.getElementById("welcome").style.display = "flex";
  document.getElementById("music").pause();
}

/* ================= DRAGGING PHOTOS ================= */
function initDrag() {
  document.querySelectorAll(".paper").forEach(paper => {
    let dragging = false;
    let offsetX = 0;
    let offsetY = 0;

    paper.style.left = Math.random() * 180 + 40 + "px";
    paper.style.top = Math.random() * 220 + 120 + "px";
    paper.style.zIndex = paper.classList.contains("envelope") ? 1 : ++highestZ;

    paper.addEventListener("mousedown", e => {
      dragging = true;
      offsetX = e.clientX - paper.offsetLeft;
      offsetY = e.clientY - paper.offsetTop;
      paper.style.zIndex = ++highestZ;
      navigator.vibrate?.(20);
    });

    document.addEventListener("mousemove", e => {
      if (!dragging) return;
      paper.style.left = e.clientX - offsetX + "px";
      paper.style.top = e.clientY - offsetY + "px";
    });

    document.addEventListener("mouseup", () => dragging = false);

    paper.addEventListener("touchstart", e => {
      dragging = true;
      const t = e.touches[0];
      offsetX = t.clientX - paper.offsetLeft;
      offsetY = t.clientY - paper.offsetTop;
      paper.style.zIndex = ++highestZ;
      navigator.vibrate?.(20);
    }, { passive: true });

    paper.addEventListener("touchmove", e => {
      if (!dragging) return;
      const t = e.touches[0];
      paper.style.left = t.clientX - offsetX + "px";
      paper.style.top = t.clientY - offsetY + "px";
    }, { passive: true });

    paper.addEventListener("touchend", () => dragging = false);
  });
}

/* ================= ENVELOPE ================= */
function openEnvelope(e) {
  e.stopPropagation();
  const envelope = document.getElementById("envelope");
  envelope.classList.add("open");
  document.getElementById("paperSound").play();

  document.querySelectorAll(".paper").forEach(p => {
    if (!p.classList.contains("envelope")) {
      p.style.zIndex = 1;
    }
  });

  setTimeout(() => {
    document.getElementById("letterScreen").style.display = "flex";
    typeLetter();
  }, 900);
}

/* ================= LOVE LETTER ================= */
function typeLetter() {

  const poem = [

    `Hey 5 feet ಕುಳ್ಳಿ 🙃,
ನನ್ನ ಹೃದಯ ಕದ್ದಿರುವ ಕಳ್ಳಿ 😊,
ನೀನು ನನ್ನ life ಯಂಬಾ eggrice ನಲ್ಲಿ important ಈರುಳ್ಳಿ 🧅😋.`,

    `Oo my ಬಂಗಾರ 👸✨,
Helu Neen ಯಾಕೆ istu ಸುಂದರ 😍,
ಹೊಳೆಯುವೆ like ಪೂರ್ಣ ಚಂದಿರ 🌕,
ನಾ ಮಾಡಲೇ ನಿನ್ನ ಸೀಮಂತಕ್ಕೆ ದಿನ ಪೂರ್ತಿ ಸಿಂಗಾರ 🥰🤗`,

    `Already ನಿನ್ನ ವಶಕ್ಕೆ ಆಗಿದೆ ಈ ನನ್ನ body 💕,
Neen ಯಾವಾಗ change ಮಾಡುವೆ ninna last name as CD ☺️`,

    `Using these lines I thought of presenting a recorded video 🙂,
Later I changed my mind to make u feel my voice like a radio 😇`,

    `I wanna spend my whole life with you 🥹, 
I am still learning how to love you right, 
Sometimes I get it wrong 🥲, 
But promise I am always trying 🙃, 
Because you are the one 🤗, 
I want to keep getting better for`,
 `I don't want you to be as 'Just maath maathalli', i want you as my 'Musanjemathu'🙃`,

    `I would have made these lines with English for better 🥲,
But it might feel like a coffee without a sugar 😁`,

    `Sorry baby ಯಾಕಂದ್ರೆ ನಾನಲ್ಲ ಕವಿ 🫤,
ಆದ್ರೂ I am lucky because ನಾನ್ ನಿನ್ನ ಪತಿ for now ಇನ್ನೂ ಭಾವಿ🫠,
Anything for you 🫶,
And everything with you 🤗`,

    `ಇವೆಲ್ಲಾ ಓದಿ ಅನ್ನೋದು ಏನಪ್ಪ ಇವ್ನು cringuuu..🥱,
Because ನೀನ್ nange ಕಚ್ಚಿ ಕಚ್ಚಿ barsiya ಪ್ರೀತಿ ಯಂಬಾ ನಂಜು 🤭`
  ];

  const el = document.getElementById("letterText");
  const paper = document.querySelector(".letter-paper");
  const signature = document.querySelector(".signature");
  const foreverBtn = document.querySelector(".forever-btn");
  const backBtn = document.querySelector(".back-btn");

  /* 🔒 Disable Back button while typing */
  backBtn.disabled = true;
  backBtn.style.opacity = "0.5";
  backBtn.style.cursor = "not-allowed";

  /* Hide signature & button initially */
  signature.classList.remove("show");
  foreverBtn.classList.remove("show");

  el.innerHTML = "";

  let paraIndex = 0;
  let charIndex = 0;

  function typeParagraph() {

    if (paraIndex >= poem.length) {

      /* ✅ Letter finished */
      setTimeout(() => {
        signature.classList.add("show");
        foreverBtn.classList.add("show");

        /* 🔓 Enable Back button */
        backBtn.disabled = false;
        backBtn.style.opacity = "1";
        backBtn.style.cursor = "pointer";

      }, 400);

      return;
    }

    if (charIndex < poem[paraIndex].length) {

      el.innerHTML += poem[paraIndex][charIndex++];
      paper.scrollTop = paper.scrollHeight;

      setTimeout(typeParagraph, 45);

    } else {

      el.innerHTML += "<br><br>";
      paraIndex++;
      charIndex = 0;

      setTimeout(typeParagraph, 600);
    }
  }

  typeParagraph();
}


/* ================================================= */
/* ============== ALBUM (FINAL MODEL) =============== */
/* ================================================= */

const albumScreen = document.getElementById("albumScreen");
const albumViews = document.querySelectorAll(".album-view");

let albumIndex = 0;
let turning = false;

/* OPEN ALBUM */
function openAlbum() {
  document.getElementById("letterScreen").style.display = "none";
  albumScreen.style.display = "flex";

  albumIndex = 0;
  turning = false;

  albumViews.forEach(v => v.classList.remove("active"));
  albumViews[0].classList.add("active");
}

/* CLOSE ALBUM */
function closeAlbum() {
  albumScreen.style.display = "none";
  document.getElementById("letterScreen").style.display = "flex";
}

/* NEXT PAGE */
function nextAlbumPage() {
  if (turning) return;
  if (albumIndex >= albumViews.length - 1) return;

  /* COVER → FIRST PAGE (NO TURN ANIMATION) */
  if (albumIndex === 0) {
    albumViews[albumIndex].classList.remove("active");
    albumIndex++;
    albumViews[albumIndex].classList.add("active");
    playPageFX();
    return;
  }

  turning = true;

  const currentView = albumViews[albumIndex];
  const photoPage = currentView.querySelector(".photo-page");
  const textPage = currentView.querySelector(".text-page");

  /* text fades out */
  if (textPage) textPage.classList.add("text-out");

  /* photo page turns */
  if (photoPage) photoPage.classList.add("turning");

  playPageFX();

  setTimeout(() => {
    /* reset current */
    if (photoPage) photoPage.classList.remove("turning");
    if (textPage) {
      textPage.classList.remove("text-out");
      textPage.classList.remove("text-in");
    }

    currentView.classList.remove("active");

    /* move to next */
    albumIndex++;
    const nextView = albumViews[albumIndex];
    nextView.classList.add("active");

    const nextText = nextView.querySelector(".text-page");
    if (nextText) nextText.classList.add("text-in");

    turning = false;
  }, 900);
}

/* PREVIOUS PAGE */
function prevAlbumPage() {
  if (turning) return;
  if (albumIndex <= 0) return;

  turning = true;

  albumViews[albumIndex].classList.remove("active");
  albumIndex--;

  const prevView = albumViews[albumIndex];
  prevView.classList.add("active");

  const prevText = prevView.querySelector(".text-page");
  if (prevText) prevText.classList.add("text-in");

  playPageFX();

  setTimeout(() => {
    turning = false;
  }, 400);
}

/* SOUND + VIBRATION */
function playPageFX() {
  const sound = document.getElementById("pageSound");
  sound.currentTime = 0;
  sound.play();
  navigator.vibrate?.(30);
}

/* ================= TAP NAVIGATION ================= */
albumScreen.addEventListener("click", e => {
  if (e.clientX > window.innerWidth / 2) {
    nextAlbumPage();
  } else {
    prevAlbumPage();
  }
});

/* ================= SWIPE NAVIGATION ================= */
let startX = 0;

albumScreen.addEventListener("touchstart", e => {
  startX = e.changedTouches[0].screenX;
}, { passive: true });

albumScreen.addEventListener("touchend", e => {
  const endX = e.changedTouches[0].screenX;
  if (startX - endX > 50) nextAlbumPage();
  if (endX - startX > 50) prevAlbumPage();
}, { passive: true });

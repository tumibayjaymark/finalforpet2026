//TAP TO START OVERLAY SECTION//
function startSite() {
  window.scrollTo(0, 0);
  const overlay = document.getElementById("tapOverlay");
  overlay.style.opacity = "0";
  overlay.style.pointerEvents = "none"; // disable clicks
  document.getElementById("bgMusic").play();

  // Optional: Remove the element from DOM after fade
  setTimeout(() => {
    overlay.style.display = "none";
  }, 1000); // matches transition: 1s
}
function startSite() {
  window.scrollTo(0, 0);
  const overlay = document.getElementById("tapOverlay");
  const music = document.getElementById("bgMusic");
  const mainSite = document.getElementById("mainSite");

  // Fade out overlay
  overlay.classList.add("fade-out");

  // Fade in main site
  mainSite.style.opacity = 1;

  // Play music
  music.play();

  // Hide overlay after transition (optional)
  setTimeout(() => {
    overlay.style.display = "none";
  }, 1000);
}




/*--------------------------------------------------------------------------------------*/



// ENVELOPED ANIMATION SECTION//
document.addEventListener("DOMContentLoaded", function () {
  var envelope = document.getElementById("envelope");
  var closeBtn = document.getElementById("close-btn");

  envelope.addEventListener("click", function () {
    envelope.classList.add("open");
    envelope.classList.remove("close");
    closeBtn.style.display = "flex";
  });

  closeBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    envelope.classList.remove("open");
    envelope.classList.add("close");
    closeBtn.style.display = "none";
  });
});
document.addEventListener("DOMContentLoaded", function () {
  var envelope = document.getElementById("envelope");
  var closeBtn = document.getElementById("close-btn");
  var overlay = document.getElementById("overlay");

  envelope.addEventListener("click", function () {
    envelope.classList.add("open");
    envelope.classList.remove("close");
    closeBtn.style.display = "flex";
    overlay.style.display = "block"; // Show overlay when opened
  });

  function closeEnvelope() {
    envelope.classList.remove("open");
    envelope.classList.add("close");
    closeBtn.style.display = "none";
    overlay.style.display = "none"; // Hide overlay
  }

  closeBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    closeEnvelope();
  });

  overlay.addEventListener("click", function () {
    closeEnvelope();
  });
});

/*--------------------------------------------------------------------------------------*/

//ZOOM MODAL CAROUSEL SECTION //
const modal = document.getElementById("zoomModal");
const zoomedImg = document.getElementById("zoomedImg");
const closeBtn = document.getElementById("closeZoom");
const images = Array.from(
  document.querySelectorAll(".carousel-item-custom img")
);
let currentIndex = 0;

// Show image in modal
function showImage() {
  zoomedImg.src = images[currentIndex].src;
}

// Open modal
images.forEach((img, i) => {
  img.addEventListener("click", () => {
    currentIndex = i;
    showImage();
    modal.style.display = "flex";
    document.body.style.overflow = "hidden"; // prevent background scroll
  });
});

// Close modal
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  document.body.style.overflow = "";
});
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }
});

// Swipe gestures
let startX = 0;
modal.addEventListener(
  "touchstart",
  (e) => {
    startX = e.touches[0].clientX;
  },
  { passive: true }
);
modal.addEventListener("touchend", (e) => {
  let diff = e.changedTouches[0].clientX - startX;
  if (Math.abs(diff) > 50) {
    currentIndex =
      diff > 0
        ? (currentIndex - 1 + images.length) % images.length
        : (currentIndex + 1) % images.length;
    showImage();
  }
});

// Keyboard controls
document.addEventListener("keydown", (e) => {
  if (modal.style.display === "flex") {
    if (e.key === "ArrowRight") {
      currentIndex = (currentIndex + 1) % images.length;
      showImage();
    } else if (e.key === "ArrowLeft") {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showImage();
    } else if (e.key === "Escape") {
      modal.style.display = "none";
      document.body.style.overflow = "";
    }
  }
});

// Carousel speed calculation (same pixels/sec on all devices)
function setCarouselSpeed() {
  const track = document.querySelector(".carousel-track");
  const items = document.querySelectorAll(".carousel-item-custom");
  let totalWidth = 0;

  // measure only the first half (original set, before duplicates)
  for (let i = 0; i < items.length / 2; i++) {
    totalWidth += items[i].offsetWidth + 2; // + margin
  }

  const speed = 23; // pixels per second
  const duration = totalWidth / speed;

  // Inject dynamic keyframes with correct distance
  const styleSheet = document.styleSheets[0];
  let keyframes = `@keyframes scroll {
      from { transform: translateX(0); }
      to { transform: translateX(-${totalWidth}px); }
  }`;

  // Remove old scroll keyframes
  for (let i = styleSheet.cssRules.length - 1; i >= 0; i--) {
    if (styleSheet.cssRules[i].name === "scroll") {
      styleSheet.deleteRule(i);
    }
  }
  styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

  track.style.animationDuration = `${duration}s`;
}
window.addEventListener("load", setCarouselSpeed);
window.addEventListener("resize", setCarouselSpeed);

/*--------------------------------------------------------------------------------------*/

//MODAL ZOOM FOR VIDEO//

const videoModal = document.getElementById("videoModal");
const videoThumb = document.getElementById("videoThumbnail");
const closeVideo = document.getElementById("closeVideo");
const zoomedVideo = videoModal.querySelector("video");

videoThumb.addEventListener("click", () => {
  videoModal.style.display = "flex";
  zoomedVideo.currentTime = 0;
  zoomedVideo.play();
});

closeVideo.addEventListener("click", () => {
  videoModal.style.display = "none";
  zoomedVideo.pause();
});

videoModal.addEventListener("click", (e) => {
  if (e.target === videoModal) {
    videoModal.style.display = "none";
    zoomedVideo.pause();
  }
});


 
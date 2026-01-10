const reelsData = [
  {
    username: "Monstera Production",
    title: "Typing on Laptop",
    caption: "Just working on something… nothing special.",
    reelSrc: "./reels/reel1.mp4",
    profilePicSrc: "./profiles/user1.jpg",
    isLiked: false,
    isSaved: false,
    isReposted: false,
  },
  {
    username: "Arystan_001",
    title: "Dance Practice",
    caption: "Just practicing a few steps.",
    reelSrc: "./reels/reel2.mp4",
    profilePicSrc: "./profiles/user2.jpg",
    isLiked: false,
    isSaved: false,
    isReposted: false,
  },
  {
    username: "Ridderhof",
    title: "Painting Session",
    caption: "Adding colors to the canvas.",
    reelSrc: "./reels/reel3.mp4",
    profilePicSrc: "./profiles/user3.jpg",
    isLiked: false,
    isSaved: false,
    isReposted: false,
  },
  {
    username: "cottonbro studio",
    title: "Singing at Home",
    caption: "Trying out a song.",
    reelSrc: "./reels/reel4.mp4",
    profilePicSrc: "./profiles/user4.jpg",
    isLiked: false,
    isSaved: false,
    isReposted: false,
  },
  {
    username: "ANTONI SHKRABA production",
    title: "Playing Guitar",
    caption: "A few random chords.",
    reelSrc: "./reels/reel5.mp4",
    profilePicSrc: "./profiles/user5.jpg",
    isLiked: false,
    isSaved: false,
    isReposted: false,
  },
  {
    username: "ROMAN ODINTSOV",
    title: "Beach Walk",
    caption: "Walking by the sea.",
    reelSrc: "./reels/reel6.mp4",
    profilePicSrc: "./profiles/user6.jpg",
    isLiked: false,
    isSaved: false,
    isReposted: false,
  },
  {
    username: "cottonbro studio",
    title: "Cooking at Home",
    caption: "Trying a simple recipe.",
    reelSrc: "./reels/reel7.mp4",
    profilePicSrc: "./profiles/user7.jpg",
    isLiked: false,
    isSaved: false,
    isReposted: false,
  },
];

const reelContainerEl = document.querySelector(".reelContainer");
const STORAGE_KEY = "reels_state_v1";

function loadReelState() {
  const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (!stored) return;

  reelsData.forEach(function (reel, idx) {
    if (stored[idx]) {
      reelsData[idx] = {
        ...reel,
        ...stored[idx],
      };
    }
  });
}

function saveReelState() {
  const state = reelsData.map(({ isLiked, isSaved, isReposted }) => ({
    isLiked,
    isSaved,
    isReposted,
  }));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function renderReels() {
  let clutter = "";
  reelsData.forEach(function (reel, idx) {
    clutter += `
        <div class="reel" data-index="${idx}">
          <div class="mediaContainer">
            <video src="${
              reel.reelSrc
            }" muted loop playsinline></video>
          </div>
          <div class="profileContainer">
            <div class="userInfo">
                <img src="${
                  reel.profilePicSrc
                }" alt="user" class="profilePicture" />
                <span class="profileName">${reel.username}</span>
                <button type="button" class="followBtn">Follow</button>
            </div>
            <p class="caption">
              ${reel.caption}
            </p>
          </div>
          <div class="sideControls">
            <div class="buttonGroup">
              <button type="button" class="like" aria-label="like reel">
                <i class="ri-heart-${reel.isLiked ? "fill" : "line"}"></i>
              </button>
              <button type="button" class="comment" aria-label="comment reel">
                <i class="ri-chat-1-line"></i>
              </button>
              <button type="button" class="repost" aria-label="repost reel">
                <i class="ri-repeat-${reel.isLiked ? "fill" : "line"}""></i>
              </button>
              <button type="button" class="share" aria-label="share reel">
                <i class="ri-send-ins-line"></i>
              </button>
              <button type="button" class="save" aria-label="save reel">
                <i class="ri-bookmark-${reel.isLiked ? "fill" : "line"}""></i>
              </button>
              <button type="button" class="more" aria-label="more">
                <i class="ri-more-2-line"></i>
              </button>
            </div>
          </div>
        </div>
        `;
  });

  reelContainerEl.innerHTML = clutter;
}
loadReelState();
renderReels();

reelContainerEl.addEventListener("click", function (e) {
  const reelEl = e.target.closest(".reel");
  if (!reelEl) return;

  const index = Number(reelEl.dataset.index);
  const reel = reelsData[index];

  // LIKE
  if (e.target.closest(".like")) {
    reel.isLiked = !reel.isLiked;
    const icon = reelEl.querySelector(".like i");
    icon.className = reel.isLiked ? "ri-heart-fill" : "ri-heart-line";
  }

  // SAVE
  if (e.target.closest(".save")) {
    reel.isSaved = !reel.isSaved;
    const icon = reelEl.querySelector(".save i");
    icon.className = reel.isSaved ? "ri-bookmark-fill" : "ri-bookmark-line";
  }

  // REPOST
  if (e.target.closest(".repost")) {
    reel.isReposted = !reel.isReposted;
    const icon = reelEl.querySelector(".repost i");
    icon.className = reel.isReposted ? "ri-repeat-fill" : "ri-repeat-line";
  }

  saveReelState();
});

const videos = document.querySelectorAll("video");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const video = entry.target;
      const reelEl = video.closest(".reel");

      if (entry.isIntersecting) {
        video.play();

        // get reel index
        const index = reelEl.dataset.index;
        const reel = reelsData[index];

        // set document title
        document.title = `${reel.title} • Reels`;
      } else {
        video.pause();
      }
    });
  },
  { threshold: 0.7 }
);

videos.forEach((video) => observer.observe(video));

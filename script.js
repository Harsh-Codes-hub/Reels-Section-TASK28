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
    likeCount: 120,
    commentCount: 14,
    repostCount: 6,
    shareCount: 3,
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
    likeCount: 542,
    commentCount: 48,
    repostCount: 22,
    shareCount: 17,
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
    likeCount: 231,
    commentCount: 19,
    repostCount: 8,
    shareCount: 5,
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
    likeCount: 876,
    commentCount: 63,
    repostCount: 41,
    shareCount: 29,
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
    likeCount: 389,
    commentCount: 27,
    repostCount: 15,
    shareCount: 11,
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
    likeCount: 1043,
    commentCount: 82,
    repostCount: 57,
    shareCount: 44,
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
    likeCount: 652,
    commentCount: 36,
    repostCount: 18,
    shareCount: 21,
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
  const state = reelsData.map(
    ({ isLiked, isSaved, isReposted, likeCount, repostCount, shareCount }) => ({
      isLiked,
      isSaved,
      isReposted,
      likeCount,
      repostCount,
      shareCount,
    })
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function renderReels() {
  let clutter = "";

  reelsData.forEach((reel, idx) => {
    clutter += `
      <div class="reel" data-index="${idx}">
        <div class="mediaContainer">
          <video src="${reel.reelSrc}" muted loop playsinline></video>
        </div>

        <div class="profileContainer">
          <div class="userInfo">
            <img src="${reel.profilePicSrc}" class="profilePicture" />
            <span class="profileName">${reel.username}</span>
            <button class="followBtn">Follow</button>
          </div>
          <p class="caption">${reel.caption}</p>
        </div>

        <div class="sideControls">
          <div class="item">
            <button class="like">
              <i class="ri-heart-${reel.isLiked ? "fill" : "line"}"></i>
            </button>
            <span class="likeCount">${reel.likeCount}</span>
          </div>

          <div class="item">
            <button class="comment">
              <i class="ri-chat-1-line"></i>
            </button>
            <span>${reel.commentCount}</span>
          </div>

          <div class="item">
            <button class="repost">
              <i class="ri-repeat-${reel.isReposted ? "fill" : "line"}"></i>
            </button>
            <span class="repostCount">${reel.repostCount}</span>
          </div>

          <div class="item">
            <button class="share">
              <i class="ri-send-plane-line"></i>
            </button>
            <span class="shareCount">${reel.shareCount}</span>
          </div>

          <button class="save">
            <i class="ri-bookmark-${reel.isSaved ? "fill" : "line"}"></i>
          </button>
        </div>
      </div>
    `;
  });

  reelContainerEl.innerHTML = clutter;
}

loadReelState();
renderReels();

reelContainerEl.addEventListener("click", (e) => {
  const reelEl = e.target.closest(".reel");
  if (!reelEl) return;

  const index = Number(reelEl.dataset.index);
  const reel = reelsData[index];

  if (e.target.closest(".like")) {
    const likeIcon = reelEl.querySelector(".like i");
    const likeCountEl = reelEl.querySelector(".likeCount");

    reel.isLiked = !reel.isLiked;

    if (reel.isLiked) {
      reel.likeCount += 1;
    } else {
      reel.likeCount = Math.max(0, reel.likeCount - 1);
    }

    likeIcon.className = reel.isLiked ? "ri-heart-fill" : "ri-heart-line";

    likeCountEl.textContent = reel.likeCount;
  }

  if (e.target.closest(".repost")) {
    const repostIcon = reelEl.querySelector(".repost i");
    const repostCountEl = reelEl.querySelector(".repostCount");

    reel.isReposted = !reel.isReposted;

    if (reel.isReposted) {
      reel.repostCount += 1;
    } else {
      reel.repostCount = Math.max(0, reel.repostCount - 1);
    }

    repostIcon.className = reel.isReposted
      ? "ri-repeat-fill"
      : "ri-repeat-line";

    repostCountEl.textContent = reel.repostCount;
  }

  if (e.target.closest(".share")) {
    reel.shareCount += 1;
    reelEl.querySelector(".shareCount").textContent = reel.shareCount;
  }

  if (e.target.closest(".save")) {
    reel.isSaved = !reel.isSaved;
    reelEl.querySelector(".save i").className = reel.isSaved
      ? "ri-bookmark-fill"
      : "ri-bookmark-line";
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

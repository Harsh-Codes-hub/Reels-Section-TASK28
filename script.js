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

function renderReels() {
  let clutter = "";
  reelsData.forEach(function (reel, idx) {
    clutter += `
        <div class="reel" data-index="${idx}">
          <div class="mediaContainer">
            <video src="${reel.reelSrc}" autoplay muted loop playsinline></video>
          </div>
          <div class="profileContainer">
            <div class="userInfo">
                <img src="${reel.profilePicSrc}" alt="user" class="profilePicture" />
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
                <i class="ri-heart-line"></i>
              </button>
              <button type="button" class="comment" aria-label="comment reel">
                <i class="ri-chat-1-line"></i>
              </button>
              <button type="button" class="repost" aria-label="repost reel">
                <i class="ri-repeat-line"></i>
              </button>
              <button type="button" class="share" aria-label="share reel">
                <i class="ri-send-ins-line"></i>
              </button>
              <button type="button" class="save" aria-label="save reel">
                <i class="ri-bookmark-line"></i>
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

renderReels();

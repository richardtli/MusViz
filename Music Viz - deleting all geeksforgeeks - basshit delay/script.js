// let audio1 = new Audio();
// let source = document.getElementById("source").src;
// audio1.src = source.substring(22);

let track_list = [

  {
    image: "22.jpg",
    path: "22.mp3",
    bassThreshHold: 160,
    colors: [1, 7]
  }, 

  {
    image: "sweet.jpg",
    path: "sweet.mp3",
    bassThreshHold: 174,
    colors: [0, 1, 7]
  },

  {
    image: "memories.jpg",
    path: "somethingJustLikeThis.mp3",
    bassThreshHold: 175,
    colors: [2, 3, 5, 7]
  }, 

  {
    image: "castle.jpg",
    path: "castle.mp3",
    bassThreshHold: 175,
    colors: [2, 5, 7]
  },

  {
    image: "paradise.jpg",
    path: "paradise.mp3",
    bassThreshHold: 155,
    colors: [0,2, 5, 7]
  },





  {
    image: "sunflower.jpg",
    path: "sunflower.mp3",
    bassThreshHold: 172,
    colors: [1, 5, 7]
  }, 


 

  {
    image: "cyberpunkArt.jpg",
    path: "cyberpunk.mp3",
    bassThreshHold: 170,
    colors: [0, 3, 5]
  },
  {
    image: "fop.jpg",
    path: "fop.mp3",
    bassThreshHold: 160,
    colors: [0, 4]
  },
];

const container = document.getElementById("container");
const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");
let hue = 0;

let root = document.querySelector(":root");

// container.addEventListener("click", () => {
//   const audioCtx = new AudioContext();
//   let audioSource = null;
//   let analyser = null;
//   audioSource = audioCtx.createMediaElementSource(audio1);
//   analyser = audioCtx.createAnalyser();
//   analyser.minDecibels = -90;
//   analyser.maxDecibels = -10;
//   audioSource.connect(analyser);
//   analyser.connect(audioCtx.destination);

//   analyser.fftSize = 4096;
//   analyser.smoothingTimeConstant = 0.3;
//   const bufferLength = analyser.frequencyBinCount / 1.6;
//   const dataArray = new Uint8Array(bufferLength);
//   const barWidth = canvas.width / bufferLength;
//   let x = 0;

//   let averageOfBass;
//   function animate() {
//     x = 0;
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     analyser.getByteFrequencyData(dataArray);
//     for (let i = 0; i < bufferLength; i++) {
//       barHeight = dataArray[i];
//       ctx.fillStyle = `hsl(${(hue + 0.0625 * x) % 360}, 100%, 50%, ${
//         barHeight / 255 - 0.1
//       })`;
//       ctx.fillRect(
//         x,
//         0.5 * canvas.height - 2 * barHeight,
//         barWidth,
//         4 * barHeight
//       );
//       x += barWidth;
//     }

//     averageOfBass =
//       dataArray
//         .slice(0, dataArray.length / 64)
//         .reduce((partialSum, a) => partialSum + a, 0) /
//       (dataArray.length / 64);

//     if (averageOfBass > 160) {
//       BassHit();
//     } else {
//       NoBassHit();
//     }

//     hue += 1;

//     requestAnimationFrame(animate);
//   }

//   animate();
//   audio1.play();
// });

function scale(number, inMin, inMax, outMin, outMax) {
  return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

let speed = 0;
let numOfBubs = 200;
let width = 0;

// const bubbleDiv = document.querySelector(".bubbles");
// for (let i = 0; i < numOfBubs; i++) {
//   const bubble = document.createElement("span");
//   bubble.style.width = `calc((100vw - ${numOfBubs * 8}px)/${numOfBubs})`;
//   bubble.style.height = bubble.style.width;
//   bubble.style.setProperty("--w", bubble.style.width);
//   speed = Math.random() * (50 - 10) + 10;
//   bubble.style.setProperty("--i", speed);
//   if (speed > 35) {
//     bubble.style.setProperty("--z", 1);
//   } else {
//     bubble.style.setProperty("--z", -1);
//   }
//   bubble.style.setProperty("--s", scale(speed, 10, 50, 0.5, 3));
//   // bubble.style.setProperty("--y", 0);

//   bubbleDiv.appendChild(bubble);
// }

const bubbleDiv = document.querySelector(".bubbles");
for (let i = 0; i < numOfBubs; i++) {
  const bubble = document.createElement("span");
  bubble.style.top = `${Math.random() * (110 + 10) - 10}vh`
  bubble.style.setProperty("--w", bubble.style.width);
  speed = Math.random() * (50 - 10) + 10;
  bubble.style.setProperty("--i", speed);
  if (speed > 42) {
    bubble.style.setProperty("--z", 2);
  } else {
    bubble.style.setProperty("--z", -2);
  }
  bubble.style.setProperty("--s", scale(speed, 10, 50, 0.5, 3));
  // bubble.style.setProperty("--y", 0);

  bubbleDiv.appendChild(bubble);
}

let bubbles = document.querySelectorAll("span");

bubbles.forEach((bubble) => {
  bubble.style.scale = `${getComputedStyle(bubble).getPropertyValue("--s")}`;
  bubble.style.opacity = `${getComputedStyle(bubble).getPropertyValue("--s")}`;
});

const colorButtons = document.querySelectorAll(".color-button");
colorButtons.forEach((button) => {
  let bubbleWidth = bubbles[0].offsetWidth;
  button.style.backgroundColor = getComputedStyle(root).getPropertyValue(
    `--${button.classList[1]}`
  );
  button.addEventListener("click", () => {
    button.classList.toggle("colorSelected");
    let selectedColors = document.querySelectorAll(".colorSelected");
    selectedColors.forEach((color, index) => {
      var toBeColored = document.querySelectorAll(
        `span:nth-child(${selectedColors.length}n+${index})`
      );
      toBeColored.forEach((bubble) => {
        bubble.style.background = getComputedStyle(root).getPropertyValue(
          `--${color.classList[1]}`
        );
        bubble.style.boxShadow = `0 0 0 ${
          bubbleWidth / 4
        }px   ${getComputedStyle(root).getPropertyValue(
          `--${color.classList[1]}`
        )}44, 0 0 ${bubbleWidth * 2}px ${getComputedStyle(
          root
        ).getPropertyValue(`--${color.classList[1]}`)}, 0 0 ${
          bubbleWidth * 4
        }px ${getComputedStyle(root).getPropertyValue(
          `--${color.classList[1]}`
        )}`;
      });
    });
  });
});

const trackPic = document.querySelector('.track-pic')


function BassValueShouldBeCheckedTrue() {
  BassValueShouldBeChecked = true;
}


function BassHit() {
  BassValueShouldBeChecked = false;
  setTimeout(BassValueShouldBeCheckedTrue, 75)
  bubbles.forEach((bubble) => {
    // bubble.style.setProperty(
    //   "--y",
    //   getComputedStyle(bubble).getPropertyValue("--y") -
    //     getComputedStyle(bubble).getPropertyValue("--s")/2
    // );
    // bubble.style.translate = `0 ${getComputedStyle(bubble).getPropertyValue(
    //   "--y"
    // )}px`;
    bubble.style.scale = `${
      getComputedStyle(bubble).getPropertyValue("--s") * 1.6
    }`;
  });

  trackPic.style.scale = "1.01"
}

function NoBassHit() {
  bubbles.forEach((bubble) => {
    bubble.style.scale = `${getComputedStyle(bubble).getPropertyValue("--s")}`;
  });
  trackPic.style.scale = "1"
}

let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");



let track_index = 0;
let isPlaying = false;
let updateTimer;
let seekTimeChanger;

let curr_track = document.createElement("audio");



// Function to reset all values to their default
function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

let audioCtx;
let track;
let analyser;
audioCtx = new AudioContext();
analyser = audioCtx.createAnalyser()
track = audioCtx.createMediaElementSource(curr_track);
analyser.minDecibels = -90;
analyser.maxDecibels = -10;
track.connect(analyser).connect(audioCtx.destination);
analyser.fftSize = 4096;
analyser.smoothingTimeConstant = 0.3;
const bufferLength = analyser.frequencyBinCount / 1.6;
const dataArray = new Uint8Array(bufferLength);
const barWidth = canvas.width / bufferLength;
let x = 0;

let BassValueShouldBeChecked = true;

let averageOfBass;
let trackBassThreshold = 160;
function animate() {
  x = 0;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  analyser.getByteFrequencyData(dataArray);
  for (let i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i];
    ctx.fillStyle = `hsl(${(hue + 0.0625 * x) % 360}, 100%, 50%, ${
      barHeight / 255 - 0.1
    })`;
    ctx.fillRect(
      x,
      0.5 * canvas.height - 2 * barHeight,
      barWidth,
      4 * barHeight
    );
    x += barWidth;
  }
  if (BassValueShouldBeChecked){
    averageOfBass =
      dataArray
        .slice(0, dataArray.length / 64)
        .reduce((partialSum, a) => partialSum + a, 0) /
      (dataArray.length / 64);

    if (averageOfBass > trackBassThreshold) {
      BassHit();
    } else {
      NoBassHit();
    }
  }

  hue += 1;

  requestAnimationFrame(animate);
}

animate();
const playButton = document.querySelector(".playbutton");

playButton.addEventListener("click", function () {
  // check if context is in suspended state (autoplay policy)
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-2x"></i>';
  }
  if (this.dataset.playing === "false") {
    PlayTrack()
    // if track is playing pause it
  } else if (this.dataset.playing === "true") {
    PauseTrack()
  }
});

 function PlayTrack() {
  curr_track.play();
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-2x"></i>';
  playButton.dataset.playing = "true";
}

function PauseTrack() {
  curr_track.pause();
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-2x"></i>';
    playButton.dataset.playing = "false";
}


function loadTrack(track_index) {
  // Clear the previous seek timer
  clearInterval(updateTimer);
 
  // Load a new track
  curr_track.src = track_list[track_index].path;
  curr_track.load();
  
  root.style.setProperty('--imageURL',  `url(${track_list[track_index].image})`)
  trackBassThreshold = track_list[track_index].bassThreshHold

  colorButtons.forEach((button, index) => {
    if(track_list[track_index].colors.includes(index)){
      button.classList.add('colorSelected')
    }

    else {
      button.classList.remove('colorSelected')
    }

  })
  let bubbleWidth = bubbles[0].offsetWidth;   
  let selectedColors = document.querySelectorAll(".colorSelected");
  selectedColors.forEach((color, index) => {
    var toBeColored = document.querySelectorAll(
      `span:nth-child(${selectedColors.length}n+${index})`
    );
    toBeColored.forEach((bubble) => {
      bubble.style.background = getComputedStyle(root).getPropertyValue(
        `--${color.classList[1]}`
      );
      bubble.style.boxShadow = `0 0 0 ${
        bubbleWidth / 4
      }px   ${getComputedStyle(root).getPropertyValue(
        `--${color.classList[1]}`
      )}44, 0 0 ${bubbleWidth * 2}px ${getComputedStyle(
        root
      ).getPropertyValue(`--${color.classList[1]}`)}, 0 0 ${
        bubbleWidth * 4
      }px ${getComputedStyle(root).getPropertyValue(
        `--${color.classList[1]}`
      )}`;
    });
  });




  // Set an interval of 1000 milliseconds
  // for updating the seek slider
  updateTimer = setInterval(seekUpdate, 100);
 
  // Move to the next track if the current finishes playing
  // using the 'ended' event
  curr_track.addEventListener("ended", nextTrack);
 
}
 
 
// Function to reset all values to their default
function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

function nextTrack() {
  // Go back to the first track if the
  // current one is the last in the track list
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
 
  // Load and play the new track
  loadTrack(track_index);
  if (playButton.dataset.playing === "true") {
    curr_track.play()
    // if track is playing pause it
  } else if (playButton.dataset.playing === "false") {
    curr_track.pause()
  }
}
 
function prevTrack() {
  // Go back to the last track if the
  // current one is the first in the track list
  if(seek_slider.value > 1){
    
  }

  else {
    if (track_index > 0)
    track_index -= 1;
    else track_index = track_list.length - 1;

  }

   
  // Load and play the new track
  loadTrack(track_index);
  if (playButton.dataset.playing === "true") {
    curr_track.play()
    // if track is playing pause it
  } else if (playButton.dataset.playing === "false") {
    curr_track.pause()
  }
}

function disableSeekTo() {
  clearInterval(updateTimer);
  let totalTime = curr_track.duration * (seek_slider.value / 100);
  let currentMinutes = Math.floor(totalTime / 60);
  let currentSeconds = Math.floor(totalTime - currentMinutes * 60);
  if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
  if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
  curr_time.textContent = currentMinutes + ":" + currentSeconds;

}
function seekTo() {

  // Calculate the seek position by the
  // percentage of the seek slider
  // and get the relative duration to the track
  updateTimer = setInterval(seekUpdate, 100);

  seekto = curr_track.duration * (seek_slider.value / 100);
 
  // Set the current track position to the calculated seek position
  curr_track.currentTime = seekto;
}
 
function seekUpdate() {
  let seekPosition;
 
  // Check if the current track duration is a legible number
  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);
    seek_slider.value = seekPosition;
 
    // Calculate the time left and the total duration
    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
 
    // Add a zero to the single digit time values
    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
 
    // Display the updated duration
    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

loadTrack(track_index)

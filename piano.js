const chars = ["a", "s", "d", "f", "g", "h", "j", "k", "w", "e", "t", "y", "u"];
const keys = {};
const notes = {};
const sustain = document.querySelector(".sustain");
const pedalStatus = document.querySelector(".sustain-toggle");

chars.forEach((char) => {
  notes[`${char}`] = new Audio(`./pianoSMP/key_${char}.mp3`);
  keys[`${char}`] = document.querySelector(`.key-${char}`);
});

/////////////////////////////////////////////
// SUSTAIN PEDAL

let isSustained = false;
const sustainON = function () {
  isSustained = true;
  sustain.style.backgroundColor = "#262";
  pedalStatus.textContent = "ON";
};
const sustainOFF = function () {
  isSustained = false;

  sustain.style.backgroundColor = "#444";
  pedalStatus.textContent = "OFF";

  const playingNotes = chars
    .filter(
      (char) =>
        !notes[`${char}`].paused &&
        !keys[`${char}`].className.includes("pressed")
    )
    .map((playingChar) => notes[`${playingChar}`]);

  playingNotes.forEach((playingNote) => playingNote.pause());
};

// Click Toggle

sustain.addEventListener("click", () =>
  isSustained ? sustainOFF() : sustainON()
);

document.addEventListener("keydown", (e) => {
  if (e.repeat) return;
  if (`${e.key}`.toLowerCase() === "p") {
    sustainON();
  }
});
document.addEventListener("keyup", (e) => {
  if (`${e.key}`.toLowerCase() === "p") {
    sustainOFF();
  }
});

const play = (key) => {
  key = key?.toLowerCase();
  if (!chars.includes(key)) return;
  keys[`${key}`].classList.add("pressed");
  notes[`${key}`].currentTime = 0;
  notes[`${key}`].play();
  console.log("play");
};

const stop = (key) => {
  key = key?.toLowerCase();
  if (!chars.includes(key)) return;
  keys[`${key}`].classList.remove("pressed");

  !isSustained && notes[`${key}`].pause();
  console.log("stop");
};

/////////////////////////////////////////////
// KEYBOARD

const handleKeyDown = function (e) {
  if (e.repeat) return;
  play(e.key);
};
const handleKeyUp = function (e) {
  stop(e.key);
};
document.body.addEventListener("keydown", handleKeyDown);
document.body.addEventListener("keyup", handleKeyUp);

/////////////////////////////////////////////
// TOUCH

const keyFromDOM = (e) => e?.target?.closest(".key")?.classList[2]?.slice(-1);

const handleTouchStart = function (e) {
  e.stopPropagation();
  play(keyFromDOM(e));
};
const handleTouchEnd = function (e) {
  e.stopPropagation();
  stop(keyFromDOM(e));
};

document.body.addEventListener("touchstart", handleTouchStart);
document.body.addEventListener("touchend", handleTouchEnd);

///////////////////////////////////////////
// CLICK

const handleMouseDown = function (e) {
  e.stopPropagation();
  play(keyFromDOM(e));
};
const handleMouseUp = function (e) {
  e.stopPropagation();
  stop(keyFromDOM(e));
};

document.body.addEventListener("mousedown", handleMouseDown);
document.body.addEventListener("mouseup", handleMouseUp);

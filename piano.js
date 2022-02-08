const chars = ["a", "s", "d", "f", "g", "h", "j", "k", "w", "e", "t", "y", "u"];
const keys = {};
const notes = {};
const sustain = document.querySelector(".sustain");
const pedalStatus = document.querySelector(".sustain-toggle");

chars.forEach((char) => {
  notes[`${char}`] = new Audio(`./pianoSMP/key_${char}.mp3`);
  keys[`${char}`] = document.querySelector(`.key-${char}`);
});

// SUSTAIN PEDAL
let isSustained = false;
document.body.addEventListener("keydown", (e) => {
  if (e.repeat) return;
  if (`${e.key}`.toLowerCase() === "p") {
    isSustained = true;
    sustain.style.backgroundColor = "#262";
    pedalStatus.textContent = "ON";
  }
});
document.body.addEventListener("keyup", (e) => {
  if (`${e.key}`.toLowerCase() === "p") {
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
  }
});

const play = (key) => {
  key = key?.toLowerCase();
  if (!chars.includes(key)) return;
  keys[`${key}`].classList.add("pressed");
  notes[`${key}`].currentTime = 0;
  notes[`${key}`].play();
};

const stop = (key) => {
  key = key?.toLowerCase();
  if (!chars.includes(key)) return;
  keys[`${key}`].classList.remove("pressed");

  !isSustained && notes[`${key}`].pause();
};

// KEYBOARD
document.body.addEventListener("keydown", (e) => {
  if (e.repeat) return;
  // console.log(e.key);
  play(e.key);
});
document.body.addEventListener("keyup", (e) => {
  stop(e.key);
});

// TOUCH
const keyFromDOM = (e) => e?.srcElement?.classList[2]?.slice(-1);
document.body.addEventListener("touchstart", (e) => {
  play(keyFromDOM(e));
});
document.body.addEventListener("touchend", (e) => {
  stop(keyFromDOM(e));
});

// CLICK
document.body.addEventListener("mousedown", (e) => {
  play(keyFromDOM(e));
});
document.body.addEventListener("mouseup", (e) => {
  stop(keyFromDOM(e));
});

const chars = ["a", "s", "d", "f", "g", "h", "j", "k", "w", "e", "t", "y", "u"];
const keys = {};
const notes = {};

chars.forEach((char) => {
  notes[`${char}`] = new Audio(`./pianoSMP/key_${char}.mp3`);
  keys[`${char}`] = document.querySelector(`.key-${char}`);
});

const play = (key) => {
  key = key?.toLowerCase();
  if (!chars.includes(key)) return;
  keys[`${key}`].classList.add("pressed");
  notes[`${key}`].play();
};

const stop = (key) => {
  key = key?.toLowerCase();
  if (!chars.includes(key)) return;
  keys[`${key}`].classList.remove("pressed");
  notes[`${key}`].pause();
  notes[`${key}`].currentTime = 0;
};

// KEYBOARD
document.body.addEventListener("keydown", (e) => {
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

const chars = ["a", "s", "d", "f", "g", "h", "j", "k", "w", "e", "t", "y", "u"];
const audioFiles = {};

const keys = {};
const notes = {};

chars.forEach((char) => {
  console.log(notes.char);
  notes[`${char}`] = new Audio(`./pianoSMP/key_${char}.wav`);
  keys[`${char}`] = document.querySelector(`.key-${char}`);
});

//// KEYBOARD ////
//////////////////

document.body.addEventListener("keydown", (e) => {
  if (!chars.includes(e.key)) return;
  keys[`${e.key}`].classList.add("pressed");
  notes[`${e.key}`].play();
});

document.body.addEventListener("keyup", (e) => {
  if (!chars.includes(e.key)) return;
  keys[`${e.key}`].classList.remove("pressed");
  notes[`${e.key}`].pause();
  notes[`${e.key}`].currentTime = 0;
});

///// TOUCH //////
//////////////////
const keyFromDOM = (e) => e.srcElement.classList[2].slice(-1);

document.body.addEventListener("touchstart", (e) => {
  keys[`${keyFromDOM(e)}`].classList.add("pressed");
  notes[`${keyFromDOM(e)}`].play();
});

document.body.addEventListener("touchend", (e) => {
  keys[`${keyFromDOM(e)}`].classList.remove("pressed");
  notes[`${keyFromDOM(e)}`].pause();
  notes[`${keyFromDOM(e)}`].currentTime = 0;
});

const pianoSMP = './pianoSMP/';

const audioFiles = [];
for (let i = 0; i < 13; i++) {
  audioFiles.push(new Audio(`./pianoSMP/key_${i}.wav`));
}

const keys = [...document.querySelectorAll('.key')];
const chars = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'w', 'e', 't', 'y', 'u'];

keys.forEach((key, i) => {
  document.body.addEventListener('keydown', e => {
    if (e.key === chars[i]) {
      key.classList.add('pressed');
      audioFiles[i].cloneNode(true).play();
    }
  });

  document.body.addEventListener('keyup', e => {
    if (e.key === chars[i]) {
      key.classList.remove('pressed');
    }
  });

  key.addEventListener('touchstart', () => {
    key.classList.add('pressed');
    audioFiles[i].cloneNode(true).play();
  });
  key.addEventListener('touchend', () => {
    key.classList.remove('pressed');
  });
});

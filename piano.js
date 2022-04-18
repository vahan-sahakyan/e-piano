class Piano {
  #chars = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'w', 'e', 't', 'y', 'u'];
  #keys = {};
  #notes = {};
  #isSustained = false;
  sustain = document.querySelector('.sustain');
  pedalStatus = document.querySelector('.sustain-toggle');

  constructor() {
    this.assignSamplesToNotes();
    this.addSustainHandlers();
    this.addKeyboardHandlers();
    this.addTouchHandlers();
    this.addMouseHandlers();
  }

  assignSamplesToNotes() {
    this.#chars.forEach(char => {
      this.#notes[`${char}`] = new Audio(`./pianoSamples/key_${char}.mp3`);
      this.#keys[`${char}`] = document.querySelector(`.key-${char}`);
    });
  }

  //////////////////
  // HANDLERS
  //////////////////

  addSustainHandlers() {
    // Click Toggle
    this.sustain.addEventListener('click', () =>
      this.#isSustained ? this.sustainOFF() : this.sustainON()
    );
    // Key Hold
    document.addEventListener('keydown', e => {
      if (e.repeat) return;
      if (`${e.key}`.toLowerCase() === 'p') {
        this.sustainON();
      }
    });
    document.addEventListener('keyup', e => {
      if (`${e.key}`.toLowerCase() === 'p') {
        this.sustainOFF();
      }
    });
  }

  addKeyboardHandlers() {
    document.body.addEventListener('keydown', this.handleKeyDown);
    document.body.addEventListener('keyup', this.handleKeyUp);
  }
  addTouchHandlers() {
    document.body.addEventListener('touchstart', this.handleTouchStart);
    document.body.addEventListener('touchend', this.handleTouchEnd);
  }
  addMouseHandlers() {
    document.body.addEventListener('mousedown', this.handleMouseDown);
    document.body.addEventListener('mouseup', this.handleMouseUp);
  }

  //////////////////
  // PLAY-STOP LOGIC
  //////////////////

  play = key => {
    key = key?.toLowerCase();
    if (!this.#chars.includes(key)) return;
    this.#keys[`${key}`].classList.add('pressed');
    this.#notes[`${key}`].currentTime = 0;
    this.#notes[`${key}`].play();
    // console.log('play');
  };

  stop = key => {
    key = key?.toLowerCase();
    if (!this.#chars.includes(key)) return;
    this.#keys[`${key}`].classList.remove('pressed');

    !this.#isSustained && this.#notes[`${key}`].pause();
    // console.log('stop');
  };

  //////////////////
  // SUSTAIN LOGIC
  //////////////////

  sustainON = () => {
    this.#isSustained = true;
    this.sustain.style.backgroundColor = '#262';
    this.pedalStatus.textContent = 'ON';
  };
  sustainOFF = () => {
    this.#isSustained = false;

    this.sustain.style.backgroundColor = '#444';
    this.pedalStatus.textContent = 'OFF';

    const playingNotes = this.#chars
      .filter(
        char =>
          !this.#notes[`${char}`].paused &&
          !this.#keys[`${char}`].className.includes('pressed')
      )
      .map(playingChar => this.#notes[`${playingChar}`]);

    playingNotes.forEach(playingNote => playingNote.pause());
  };

  //////////////////
  // KEYBOARD LOGIC
  //////////////////

  handleKeyDown = e => {
    if (e.repeat) return;
    this.play(e.key);
  };
  handleKeyUp = e => {
    this.stop(e.key);
  };

  keyFromDOM = e => e?.target?.closest('.key')?.classList[2]?.slice(-1);

  //////////////////
  // TOUCH LOGIC
  //////////////////

  handleTouchStart = e => {
    e.stopPropagation();
    this.play(this.keyFromDOM(e));
  };
  handleTouchEnd = e => {
    e.stopPropagation();
    this.stop(this.keyFromDOM(e));
  };

  //////////////////
  // MOUSE LOGIC
  //////////////////

  handleMouseDown = e => {
    e.stopPropagation();
    this.play(this.keyFromDOM(e));
  };
  handleMouseUp = e => {
    e.stopPropagation();
    this.stop(this.keyFromDOM(e));
  };
}
// END of class PIANO

const piano = new Piano();

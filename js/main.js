import {
  beginnerWordArray,
  mediumWordArray,
  advancedWordArray,
  letters,
} from './words.js';
import { modal } from './modalStart.js';
import { definition } from './modalDefinition.js';

//DOM ELEMENTS FOR GAME PAGE
const reset = document.getElementById('newGame');
//RANDOM WORD GENERATED FOR GAME
const word_wrapper = document.querySelector('.word_wrapper');
//LETTERS WRAPPER
const letters_wrapper = document.querySelector('.letters_wrapper');
//LETTERS
const lettersContainer = document.getElementById('lettersContainer');
//LETTER

//DOM ELEMENTS FOR START MODAL
const modal_start = document.querySelector('.modal_start');
const modalStart = document.getElementById('modalStart');

//DOM ELEMENTS FOR GAME OVER MODAL
const gameOverModal = document.getElementById('gameOver');
//DOM ELEMENTS FOR DEFINITION MODAL
const modalDefinition = document.getElementById('modalDefiition');

//DOM ELEMENTS FOR CORGI & SHARK
const corgi = document.querySelector('.corgi');
const shark = document.querySelector('.shark');
//DOM ELEMENT FOR RESET BUTTON
let new_game = document.getElementById('newGame');
//GLOBAL VARAIBLS
let newWord;
let chosenWord;
let newArray = [];
let lettersArray = [];
let selectedLettersArray = [];
let incorrectLettersArray = [];
//TEMPORARY
// word_wrapper.classList.add('word_active');
// letters_wrapper.classList.add('letters_active');

window.onload = () => {
  modalStart.insertAdjacentHTML('beforeend', modal);
  modal_start.classList.add('start_active');
  startGame();
  radioCheck();
};

//#2 arrray() runs then selects random word from list of words in array
const array = (arr) => {
  newArray = [];
  if (arr) {
    arr.map((words) => newArray.push(words));
    randomWord();
    console.log('array', newArray);
  }
};
let levelSelect = false;
/// #1 - selecting level runs array()
const radioCheck = () => {
  const checked = Array.from(document.getElementsByClassName('radio_group'));

  if (checked) {
    checked.map((radio) => {
      radio.addEventListener('click', (e) => {
        let input = e.target.id;

        switch (input) {
          case 'levelOne':
            array(beginnerWordArray);
            levelSelect = true;
            break;
          case 'levelTwo':
            array(mediumWordArray);
            levelSelect = true;
            break;
          case 'levelThree':
            array(advancedWordArray);
            levelSelect = true;
            break;
          default:
            array(beginnerWordArray);
        }
      });
    });
  }
};

// #3 randomWord() is chosen from array of words
const randomWord = () => {
  chosenWord = newArray[Math.floor(Math.random() * newArray.length)];
  console.log('chosen word:', chosenWord);
  // insertWordToDom(chosenWord);
  return chosenWord;
};

// #4 chosen randomWord is sepearated into letters and then inserted into DOM & individual letteres in pushed into letteresArray
//INSERT WORD INTO DOM
const insertWordToDom = () => {
  for (let i = 0; i < chosenWord.length; i++) {
    let char = chosenWord[i].toLowerCase();

    newWord = ` <div class="card-wrapper">
                  <div class="card">
                    <div class="card-front"></div>
                    <div class="card-back">${char}</div>
                  </div>
                </div>`;
    lettersArray.push(char);
    word_wrapper.insertAdjacentHTML('beforeend', newWord);
  }
};
console.log('letters', lettersArray);

// #5 on button click, insertWordToDom() is run
///START GAME
const startGame = () => {
  const start_button = document.getElementById('startButton');
  if (start_button) {
    start_button.addEventListener('click', function () {
      if (levelSelect) {
        // randomWord();
        // setTimeout(() => {
        //   insertWordToDom(newWord);
        //   modal_start.classList.remove('start_active');
        //   word_wrapper.classList.add('word_active');
        //   letters_wrapper.classList.add('letters_active');
        //   corgi.classList.add('add');
        //   shark.classList.add('add');
        // }, 300);

        insertWordToDom(newWord);
        modal_start.classList.remove('start_active');
        word_wrapper.classList.add('word_active');
        letters_wrapper.classList.add('letters_active');
        corgi.classList.add('add');
        shark.classList.add('add');
      } else {
        alert('select level');
      }
    });
  }
};

//INSERTS LETTERS INTO DOM AT GAME START
const keyboard = () => {
  let letter;
  letters.map((char) => {
    letter = `<span class="letters_wrapper-span">${char}</span>`;
    lettersContainer.insertAdjacentHTML('beforeend', letter);
  });
};

keyboard();

const lettersWrapperSpans = document.querySelectorAll('.letters_wrapper-span');

const arrayCheck = () => {
  for (let i = 0; i < lettersWrapperSpans.length; i++) {
    let key = lettersWrapperSpans[i];

    key.addEventListener('click', function (e) {
      let item = e.target.innerText;
      let nw = chosenWord.toLowerCase();
      let foundMatch = false;
      for (let i = 0; i < nw.length; i++) {
        if (nw[i] === item) {
          selectedLettersArray.push(item);

          console.log('sla', selectedLettersArray);
          switchCard(i);
          key.classList.add('match');
          foundMatch = true;
        }
      }

      if (!foundMatch) {
        incorrectLettersArray.push(item);
        key.classList.add('no-match');
        move();
        setTimeout(() => {
          collisionAlert(corgi, shark);
        }, 300);

        console.log('icl', incorrectLettersArray);
      }

      compareArrays(lettersArray, selectedLettersArray);
    });
  }
};

arrayCheck();

const switchCard = (i) => {
  const cardFront = document.querySelectorAll('.card-front');
  cardFront[i].classList.add('flip');
};

/////MOVE AND DETECT COLLISION
const move = () => {
  let ranNum1 = Math.floor(Math.random() * 1000);
  let ranNum2 = Math.floor(Math.random() * 500);

  corgi.style.transform = `translate3d(-${ranNum1}px, 0px, 0px)`;
  corgi.style.transition = `all 300ms linear`;
  shark.style.transform = `translate3d(${ranNum2}px,0px, 0px )`;
  shark.style.transition = `all 300ms linear`;
};

const isColliding = (a, b) => {
  let aRect = a.getBoundingClientRect();
  let bRect = b.getBoundingClientRect();

  return (
    aRect.left < bRect.right &&
    aRect.right > bRect.left &&
    aRect.top < bRect.bottom &&
    aRect.bottom > bRect.top
  );
};

const collisionAlert = (a, b) => {
  if (isColliding(a, b)) {
    console.log('collide!');
    gameOverModal.classList.add('showModal');
    wordDefinition();
  }
};

const resetGame = () => {
  clearArrays(
    lettersArray,
    selectedLettersArray,
    incorrectLettersArray,
    newArray
  );
  gameOverModal.classList.remove('showModal');
  word_wrapper.classList.remove('word_active');
  letters_wrapper.classList.remove('letters_active');
  corgi.classList.remove('add');
  shark.classList.remove('add');
  // removeCardFlipClass();
  // removeKeyClass();
  radioCheck();
};
const clearArrays = (arr1, arr2, arr3, arr4) => {
  arr1.slice(0, arr1.length);
  arr2.slice(0, arr2.length);
  arr3.slice(0, arr3.length);
  arr4.slice(0, arr4.length);
};

new_game.addEventListener('click', function () {
  resetGame();
  setTimeout(() => {
    modal_start.classList.add('start_active');
  }, 800);
  startGame();
});

//MODAL DEFINITION

const modal_definition = document.querySelector('.modal_definition');
const wordDefinition = () => {
  const modalDefinition = document.getElementById('modalDefinition');

  setTimeout(() => {
    modalDefinition.insertAdjacentHTML('beforeend', definition);
    modal_definition.classList.add('showDefinition');
    const close = document.getElementById('close');
    if (close) {
      close.addEventListener('click', () => modalClose());
    } else {
      console.log('no close for you');
    }
  }, 500);
};

const compareArrays = (arr1, arr2) => {
  if (arr1.length === arr2.length && arr1.every((val) => arr2.includes(val))) {
    console.log('game over');
    wordDefinition();
  } else {
    console.log('keep playing');
  }
};

const modalClose = () => {
  modal_definition.classList.remove('showDefinition');
  clearWords(selectedLettersArray, lettersArray);
  console.log('selected letters array', selectedLettersArray);
  setTimeout(() => {
    resetClasses();
  }, 50);
  modal_start.classList.add('start_active');
  console.log('clickeddddd');
  console.log('array::::', newArray);
};

//RESET CLASSES
const resetClasses = () => {
  modal_definition.classList.remove('showDefinition');
  gameOverModal.classList.remove('showModal');
  word_wrapper.classList.remove('word_active');
  letters_wrapper.classList.remove('letters_active');
  corgi.classList.remove('add');
  shark.classList.remove('add');
  corgi.style.transform = `translate3d(0px, 0px, 0px)`;
  shark.style.transform = `translate3d(0px, 0px, 0px)`;
  removeKeyClass();
  removeCardFlipClass();
  //
  chosenWord = '';
  levelSelect = false;
};

const removeKeyClass = () => {
  for (let i = 0; i < lettersWrapperSpans.length; i++) {
    let key = lettersWrapperSpans[i];
    if (key.classList.contains('match')) {
      key.classList.remove('match');
    }
    if (key.classList.contains('no-match')) {
      key.classList.remove('no-match');
    }
  }
};

const removeCardFlipClass = () => {
  const cardFront = document.querySelectorAll('.card-front');
  for (let i = 0; i < cardFront.length; i++) {
    cardFront[i].classList.remove('flip');
  }
};

const resetRadioButtons = () => {
  const radios = document.getElementsByClassName('radio_group');
  for (let i = 0; i < radios.length; i++) {
    const label = radios[i].nextElementSibling;
    label.style.transform = 'scale(0)';
    label.style.opacity = '0';
    label.style.background = 'white';
  }
};

const clearWords = (arr, arr2) => {
  // arr.splice(0, arr.length);
  arr = [];
  arr2 = [];
};

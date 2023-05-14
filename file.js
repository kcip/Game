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
// const content_top = document.querySelector('.content_top');
//DOM ELEMENTS FOR GAME OVER MODAL
const gameOverModal = document.getElementById('gameOver');
//DOM ELEMENTS FOR DEFINITION MODAL
const modalDefinition = document.getElementById('modalDefiition');

//DOM ELEMENTS FOR CORGI & SHARK
const corgi = document.querySelector('.corgi');
const shark = document.querySelector('.shark');
//DOM ELEMENT FOR RESET BUTTON
// let new_game = document.getElementById('newGame');
//GLOBAL VARAIBLS
let newWord;
let chosenWord;
let levelSelect = false;
let newArray = [];
let lettersArray = [];
let selectedLettersArray = [];
let incorrectLettersArray = [];
//TEMPORARY
// word_wrapper.classList.add('word_active');
// letters_wrapper.classList.add('letters_active');

window.onload = () => {
  modalStartDOM();
  // modalStart.insertAdjacentHTML('beforeend', modal);
  // modal_start.classList.add('start_active');
  startGame();
  radioCheck();
};

const modalStartDOM = () => {
  modalStart.insertAdjacentHTML('beforeend', modal);
  modal_start.classList.add('start_active');
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
  if (chosenWord) {
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
  } else {
    console.log('select a level');
  }
};
console.log('letters', lettersArray);

// #5 on button click, insertWordToDom() is run
///START GAME
const startGame = () => {
  const start_button = document.getElementById('startButton');
  if (start_button) {
    start_button.addEventListener('click', function () {
      console.log('start clicked');
      if (levelSelect) {
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
// let levelSelect = false;
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
const compareArrays = (arr1, arr2) => {
  if (arr1.length === arr2.length && arr1.every((val) => arr2.includes(val))) {
    console.log('game over');
    wordDefinition();
  } else {
    console.log('keep playing');
  }
};

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////

//MODAL DEFINITION

const modal_definition = document.querySelector('.modal_definition');
const wordDefinition = () => {
  const modalDefinition = document.getElementById('modalDefinition');

  setTimeout(() => {
    modalDefinition.insertAdjacentHTML('beforeend', definition);
    modal_definition.classList.add('showDefinition');
    //CLOSE MODAL AND REST GAME
    const close = document.getElementById('close');
    if (close) {
      close.addEventListener('click', () => {
        resetGame();
        console.log('icl', incorrectLettersArray);
        console.log('sla', selectedLettersArray);
        console.log('na', newArray);
        console.log('chosen', chosenWord);
      });

      // close.addEventListener('click', () => modalClose());
    } else {
      console.log('no close for you');
    }
  }, 500);
};
const resetGame = () => {
  //clear arrays
  newArray = [];
  lettersArray = [];
  selectedLettersArray = [];
  incorrectLettersArray = [];

  //clear chosen word
  chosenWord = null;

  //clear DOM
  resetClasses();
  removeKeyClass();
  removeCardFlipClass();
  word_wrapper.querySelectorAll('*').forEach((n) => n.remove());
  lettersContainer.innerHTML = '';
  //show modal start
  modal_start.classList.add('start_active');
  // reset global variables
  levelSelect = false;

  // start a new game
  setTimeout(() => {
    startGame();
  }, 300);
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

startGame();
radioCheck();

/////////////////////////////////

const radioLabel = () => {
  const checkedRadioLabelAfter = document.querySelectorAll(
    '[type=radio]:checked ~ label'
  );
  if (checkedRadioLabelAfter) {
    for (let i = 0; i < checkedRadioLabelAfter.length; i++) {
      checkedRadioLabelAfter[i].style.transform = 'unset';
      console.log('label', checkedRadioLabelAfter[i]);
    }
  }
};

const radioButton = () => {
  // const checkedRadioLabelFillColor = document.querySelectorAll(
  //   '[type=radio]:checked + label',
  //   ':after'
  // );
  // if (checkedRadioLabelFillColor) {
  //   checkedRadioLabelFillColor.forEach((element) => {
  //     console.log('radio', element);
  //   });
  // } else {
  //   console.log('misisng');
  // }

  const checkedRadioLabel = document.querySelector(
    '[type="radio"]:checked + label'
  );

  if (checkedRadioLabel) {
    const checkedRadioLabelStyles = window.getComputedStyle(
      checkedRadioLabel,
      ':after'
    );
    console.log('radio:after', checkedRadioLabelStyles);
    const style = document.createElement('style');
    style.innerHTML = `
      [type="radio"]:checked + label:after {
        opacity: 0;
        transform: scale(0);
      }
      `;
    document.head.appendChild(style);
  } else {
    console.log('missing');
  }
};

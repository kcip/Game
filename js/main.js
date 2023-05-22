import {
  beginnerWordArray,
  mediumWordArray,
  advancedWordArray,
  letters,
} from './words.js';
import { modal } from './modalStart.js';
// import { definition } from './modalDefinition.js';

//DOM ELEMENTS FOR GAME PAGE
// const reset = document.getElementById('newGame');
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
//DOM ELEMENTS FOR MODAL START TEXT
const modalStartH1 = document.getElementsByClassName('modal_start-h1');
const modalStartP = document.getElementsByClassName('modal_start-p');
const modalStartClouds = document.querySelector('.modal_start-clouds');
const modalStartContent = document.getElementsByClassName(
  'modal_start-content'
);
//DOM ELEMENTS FOR CORGI & SHARK
const modalStartCorgi = document.getElementsByClassName('modal_start-corgi');

//DOM ELEMENTS FOR GAME OVER MODAL
const gameOverModal = document.getElementById('gameOver');
//DOM ELEMENTS FOR DEFINITION MODAL
// const modalDefinition = document.getElementById('modalDefiition');
// const definitionInnerContainer = getElementsByClassName('modal_inner');
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
let correctWords = [];
let allWords = [];
let wrongWords = [];
let level;
//TEMPORARY
// word_wrapper.classList.add('word_active');
// letters_wrapper.classList.add('letters_active');

window.onload = () => {
  modalStartDOM();
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
    arr.map((words) => {
      newArray.push(words);
    });
    randomWord();
    console.log('array', newArray);
  }
};
// #3 randomWord() is chosen from array of words
const randomWord = () => {
  chosenWord = newArray[Math.floor(Math.random() * newArray.length)];
  console.log('chosen word:', chosenWord);
  // fetchData(chosenWord);
  // insertWordToDom(chosenWord);
  return chosenWord;
};
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
            level = 'beginner';
            levelSelect = true;
            break;
          case 'levelTwo':
            array(mediumWordArray);
            level = 'medium';
            levelSelect = true;
            break;
          case 'levelThree':
            array(advancedWordArray);
            level = 'hard';
            levelSelect = true;
            break;
          default:
            array(beginnerWordArray);
        }
        console.log('level', level);
      });
    });
  }
};

let levelSelect = false;

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
  newArray = [];
  const start_button = document.getElementById('startButton');
  if (start_button) {
    start_button.addEventListener('click', function () {
      console.log('start clicked & level select', levelSelect);
      if (levelSelect) {
        // reset();
        array();
        insertWordToDom();
        modalStartAnimateClasses();

        setTimeout(() => {
          modal_start.classList.remove('start_active');
          word_wrapper.classList.add('word_active');
          letters_wrapper.classList.add('letters_active');
          corgi.classList.add('add');
          shark.classList.add('add');
          keyboard();
        }, 1300);

        // modal_start.classList.remove('start_active');
        // word_wrapper.classList.add('word_active');
        // letters_wrapper.classList.add('letters_active');
        // corgi.classList.add('add');
        // shark.classList.add('add');
        // keyboard();
        // fetchData(chosenWord);
      } else {
        alert('select level');
      }
    });
  }
};

const modalStartAnimateClasses = () => {
  for (let i = 0; i < modalStartH1.length; i++) {
    modalStartH1[i].classList.add('animate-up');
  }
  for (let i = 0; i < modalStartP.length; i++) {
    modalStartP[i].classList.add('animate-up-2');
  }
  for (let i = 0; i < modalStartCorgi.length; i++) {
    modalStartCorgi[i].classList.add('animate-up-2');
  }
  for (let i = 0; i < modalStartContent.length; i++) {
    modalStartContent[i].classList.add('animate-fade-out');
  }

  // modalStartSpan.classList.add('animate-up-2');
  // modalStartClouds.classList.add('animate-up-3');
  // modalStartCorgi.classList.add('aniate-fade-out');
};

const removeAnimateClasses = () => {
  for (let i = 0; i < modalStartH1.length; i++) {
    modalStartH1[i].classList.remove('animate-up');
  }
  for (let i = 0; i < modalStartP.length; i++) {
    modalStartP[i].classList.remove('animate-up-2');
  }
  for (let i = 0; i < modalStartCorgi.length; i++) {
    modalStartCorgi[i].classList.remove('animate-up-2');
  }
  for (let i = 0; i < modalStartContent.length; i++) {
    modalStartContent[i].classList.remove('animate-fade-out');
  }
};

//INSERTS LETTERS INTO DOM AT GAME START animate-in
const keyboard = () => {
  let letter;
  letters.map((char) => {
    letter = `<span class="letters_wrapper-span">${char}</span>`;
    lettersContainer.insertAdjacentHTML('beforeend', letter);
  });

  let lettersWrapperSpans = document.querySelectorAll('.letters_wrapper-span');

  for (let i = 0; i < lettersWrapperSpans.length; i++) {
    lettersWrapperSpans[i].classList.add('animate-in');
  }

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

const switchCard = (i) => {
  const cardFront = document.querySelectorAll('.card-front');
  cardFront[i].classList.add('flip');
};

/////MOVE AND DETECT COLLISION
const move = () => {
  let ranNum1 = Math.floor(Math.random() * 1000);
  let ranNum2 = Math.floor(Math.random() * 500);

  corgi.style.transform = `translate3d(${ranNum1}px, 0px, 0px)`;
  corgi.style.transition = `all 300ms linear`;
  shark.style.transform = `translate3d(-${ranNum2}px,0px, 0px )`;
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
    fetchData(chosenWord);
    gameOverModal.classList.add('showModal');
    setTimeout(() => {
      wordDefinition();
      wrongWords.push(chosenWord);
    }, 1100);
    // wordDefinition();
    // wrongWords.push(chosenWord);
    // gameOverModal.classList.add('showModal');
    setTimeout(() => {
      gameOverModal.classList.remove('showModal');
    }, 1300);
  }
};
const compareArrays = (arr1, arr2) => {
  if (arr1.length === arr2.length && arr1.every((val) => arr2.includes(val))) {
    console.log('game over');
    correctWords.push(chosenWord);
    setTimeout(() => {
      wordDefinition();
    }, 1200);
  } else {
    console.log('keep playing');
  }
};

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////MODAL ///////////////////////////////////////////////////////////

const reset = () => {
  clear();
  playContinued();
};
// keyboard();

const playContinued = () => {
  switch (level) {
    case 'beginner':
      array(beginnerWordArray);
      break;
    case 'medium':
      array(mediumWordArray);
      break;
    case 'hard':
      array(advancedWordArray);
      break;
    default:
      array(beginnerWordArray);
  }
  setTimeout(() => {
    array();
    insertWordToDom(chosenWord);
    allWords.push(chosenWord);
    modal_start.classList.remove('start_active');
    word_wrapper.classList.add('word_active');
    letters_wrapper.classList.add('letters_active');
    corgi.classList.add('add');
    shark.classList.add('add');
    keyboard();
  }, 300);
};

const clear = () => {
  newWord = null;
  chosenWord = null;
  newArray = [];
  lettersArray = [];
  selectedLettersArray = [];
  incorrectLettersArray = [];
  levelSelect = false;
  modalDefinition.innerHTML = '';
  word_wrapper.innerHTML = '';
  lettersContainer.innerHTML = '';
  modal_definition.classList.remove('showDefinition');
  word_wrapper.classList.remove('word_active');
  letters_wrapper.classList.remove('letters_active');
  corgi.style.transform = `translate3d(0px, 0px, 0px)`;
  shark.style.transform = `translate3d(0px, 0px, 0px)`;
  corgi.classList.remove('add');
  shark.classList.remove('add');
};

new_game.addEventListener('click', () => {
  clear();
  removeAnimateClasses();
  modal_start.classList.add('start_active');
  // inputClear();
});

// const inputClear = () => {
//   radioLabel();
//   radioButton();
// };

// const radioLabel = () => {
//   console.log();
//   const checkedRadioLabelAfter = document.querySelectorAll(
//     '[type=radio]:checked ~ label'
//   );
//   const notCheckedRadioLabelAfter = document.querySelectorAll(
//     '[type=radio]:not(:checked) + label'
//   );

//   checkedRadioLabelAfter.forEach((label) => {
//     console.log('checked', label);
//   });

//   notCheckedRadioLabelAfter.forEach((label) => {
//     console.log('not checked', label);
//   });
// };

// const radioButton = () => {
//   const checkedRadioLabelFillColor = document.querySelectorAll(
//     '[type=radio]:checked + label',
//     ':after'
//   );
// };

//////////////////API CALL & WORD DEFINITION MODAL /////////////////////////
///////////////////////////////////////////////////////////////////////////
async function fetchData(chosenWord) {
  const apikey = '67e2898b-2883-45c6-b055-3c8ba071f230';
  const baseURL = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${chosenWord}?key=${apikey}`;
  const url = baseURL;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      apiDefinition(data);
      console.log('api data', data);
    })
    .catch((error) => {
      console.log('error', error);
    });
}
let definition;
async function apiDefinition(data) {
  try {
    const WORD_DEFINITION = data[0].hwi.hw;
    const WORD_PART_OF_SPEECH = data[0].fl;
    const WORD_PRONUNCIATION = data[0].hwi.prs[0].mw;
    const WORD_SHORT_DEFINITION = data[0].shortdef[0];
    definition = `
      <div class="modal_inner">
        <button class="modal_buttonClose" id="close"><span>X</span></button>
        <div class="modal_content">
          <h2 class="modal_content-h2">${WORD_DEFINITION}</h2>
          <p class="modal_content-partOfspeech">${WORD_PART_OF_SPEECH}</p>
          <p class="modal_content-p">${WORD_PRONUNCIATION}</p>
          <p class="modal_content-definition">${WORD_SHORT_DEFINITION}</p>
          <p class="modal_content-apiInfo">definition provided by: <span><a href="https://dictionaryapi.com/" target="_blank">Merriam-Webster</a></span></p>
        </div>
      </div>
`;
  } catch (error) {
    console.log('api error', error);
  }
}
//MODAL DEFINITION

const modal_definition = document.querySelector('.modal_definition');
const modalDefinition = document.getElementById('modalDefinition');
const wordDefinition = () => {
  // const modalDefinition = document.getElementById('modalDefinition');
  fetchData(chosenWord);
  setTimeout(() => {
    modalDefinition.insertAdjacentHTML('beforeend', definition);
    const modal_inner = document.querySelector('.modal_inner');
    modal_definition.classList.add('showDefinition');
    modal_inner.classList.add('animate-fade-in');
    // modal_definition.classList.add('animate-fade-in');

    //
    // const definitionInnerContainer = getElementsByClassName('modal_inner');
    // if (definitionInnerContainer) {
    //   for (let i = 0; i > definitionInnerContainer.length; i++) {
    //     definitionInnerContainer[i].classList.add('fadeInDef');
    //   }
    // }

    //CLOSE MODAL AND REST GAME
    const close = document.getElementById('close');
    if (close) {
      close.addEventListener('click', () => {
        // resetGame();
        reset();
        console.log('icl', incorrectLettersArray);
        console.log('sla', selectedLettersArray);
        console.log('na', newArray);
        console.log('chosen', chosenWord);
        console.log('level 267', level);
      });

      // close.addEventListener('click', () => modalClose());
    } else {
      console.log('no close for you');
    }
  }, 200);
};

console.log('incorrect words', incorrectLettersArray);
console.log('correct words', correctWords);
console.log('wrong words', wrongWords);
console.log('all words', allWords);

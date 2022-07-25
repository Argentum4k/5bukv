import Field from "./Field.js";
import {initLocalStorage, V} from "./permanent.js";
import {getWords, letterPressed, newGame, closeInstructions} from "./index.js";
import { instructionsSelector } from "./constants.js";

export let allWords=[]
export let secret
export let curLine = 0
export let curPos = 0
export let curWord = ''
export let triedWords = []
export let complete = false
export const keyboardButtons = document.querySelectorAll('.keyboard__button')
export const controlButtons = [...document.querySelectorAll('.keyboard__button_big')]
export const backButton = controlButtons[0]
export const okButton = controlButtons[1]
export const lines = document.querySelectorAll('.field__line')
export const stats = document.querySelectorAll('.stats p')
export const instructions = document.querySelector(instructionsSelector)
initLocalStorage()
getWords().then(()=>{
  // разобраться с асинхронностью
  console.log('words get')
  // alert(allWords.length)
  // secret = allWords[Math.floor(Math.random() * allWords.length)].replace('ё','е')
  // console.log('загадано слово "' + secret.toUpperCase() + '"')
  newGame(true)
})
// обработчики экранной клавиатуры
keyboardButtons.forEach(el => el.addEventListener('click', l => letterPressed(l)))

// привязка клавиш к клавиатуре
// todo запретить пока не закрыта инструкция
const alphabet = 'йцукенгшщзхъфывапролджэячсмитьбю'
// let key, keycode,  code
document.addEventListener('keydown', event => {
  if (alphabet.includes(event.key)){
    keyboardButtons.forEach(el => {
      if (el.innerHTML === event.key && curPos < 5)
        el.classList.add('letter_type_current-row')
    })
  }
});
document.addEventListener('keyup', event => {
  // console.log('Key: ', event.key);  // use this, only russian layout
  // key = event.key;
  // console.log('keyCode: ', event.keyCode);
  // keycode = event.keyCode;
  // console.log('KeyboardEvent.code: ', event.code);  // onelove
  // code = event.code
  if (alphabet.includes(event.key) ){
    keyboardButtons.forEach(el => {
      if (el.innerHTML === event.key) {
        el.click()
        // el.classList.remove('keyboard__button_big')
      }
    })
  } else if ('Backspace' === event.key){
    backButton.click()
  } else if ('Enter' === event.key){
    okButton.click()
  }
});

// testing
document.querySelector('.header__help').
addEventListener('click', ()=>{
  instructions.classList.toggle('instructions_hidden')
})

instructions.
querySelector('button').
addEventListener('click', closeInstructions)
if (V('instructionsSeen')==='1')
  instructions.classList.add('instructions_hidden')

const field = new Field(5,6)
field.draw('.field')

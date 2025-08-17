let allWords=[]
let secret
let curLine = 0
let curPos = 0
let curWord = ''
let triedWords = []
let complete = false
let wordLength = 5; // Новая переменная для хранения длины слова
const keyboardButtons = document.querySelectorAll('.keyboard__button')
const controlButtons = [...document.querySelectorAll('.keyboard__button_big')]
const backButton = controlButtons[0]
const okButton = controlButtons[1]
let lines = document.querySelectorAll('.field__line')
const stats = document.querySelectorAll('.stats p')
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
      if (el.innerHTML == event.key && curPos < 5)
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
      if (el.innerHTML == event.key) {
        el.click()
        // el.classList.remove('keyboard__button_big')
      }
    })
  } else if ('Backspace' == event.key){
    backButton.click()
  } else if ('Enter' == event.key){
    okButton.click()
  }
});


function recreateField() {
  const field = document.querySelector('.field');
  field.innerHTML = '';

  for (let i = 0; i < 6; i++) {
    const line = document.createElement('div');
    line.className = 'field__line';
    for (let j = 0; j < wordLength; j++) {
      const letter = document.createElement('div');
      letter.className = 'field__letter';
      line.appendChild(letter);
    }
    field.appendChild(line);
  }
  lines = document.querySelectorAll('.field__line');
}

async function getWords() {
  const fileName = `russian_nouns_${wordLength}.txt`;
  const nouns = await fetch(fileName);
  const text = await nouns.text();

  // if (document.location.host.toLowerCase().includes('github'))
    allWords = text.split('\n');
  // else
  //   allWords = text.split('\r\n');
//  try new format only lf
}

// Обработчик изменения длины слова
document.getElementById('wordLengthSelector').addEventListener('change', (event) => {
  const newLength = parseInt(event.target.value);

  if (!complete && curLine > 0) {
    if (!confirm('Текущая игра будет сброшена. Продолжить?')) {
      event.target.value = wordLength;
      return;
    }
  }

  wordLength = newLength;
  recreateField();
  getWords().then(() => newGame(true));
});

// Инициализация после загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
  recreateField(); // Генерируем начальное поле
  // Остальной код инициализации...
});

let allWords=[]

async function getWords(){
  // хз что и почему тут происходит но вроде работает
  const nouns = await fetch('russian_nouns_5.txt');
  const text = await nouns.text();
  // а так  работает в консоли но не тут...
  // const nouns = fetch('russian_nouns_5.txt');
  // setTimeout(() => { console.log("slept"); }, 2500);
  // nouns.then(response => response.text())
  //   .then((response) => {
  //     allWords = response.split('\r\n')
  //   })
  //   .catch(err => console.log(err))
  if (document.location.host.toLowerCase().includes('github'))
    allWords = text.split('\n') // для гх пагес
  else
    allWords = text.split('\r\n')  // для локальной
}

let secret
getWords().then(()=>{
  // как же бесит!!!!!!!!!!!!
  console.log('words get')
  // alert(allWords.length)
  secret = allWords[Math.floor(Math.random() * allWords.length)].replace('ё','е')
  console.log('загадано слово "' + secret.toUpperCase() + '"')
})
let curLine = 0
let curPos = 0
let curWord = ''
let complete = false
const keyboardButtons = document.querySelectorAll('.keyboard__button')
const bigButtons = [...document.querySelectorAll('.keyboard__button_big')]
const backButton = bigButtons[0]
const okButton = bigButtons[1]
const lines = document.querySelectorAll('.field__line')
highlightCurLine(1)

// начинает все заново
function reset(){
  secret = allWords[Math.floor(Math.random() * allWords.length)].replace('ё','е')
  highlightCurLine(0)
  curLine = 0
  highlightCurLine(1)
  curPos = 0
  curWord = ''
  colorKeyboard()
  complete = false
  // сброс окраски
  document.querySelectorAll('.field__letter').forEach(fld => {
    fld.classList.remove('letter_type_wrong')
    fld.classList.remove('letter_type_misposition')
    fld.classList.remove('letter_type_right')
    fld.innerHTML=''
  })
  keyboardButtons.forEach( btn => {
    btn.classList.remove('letter_type_wrong')
    btn.classList.remove('letter_type_misposition')
    btn.classList.remove('letter_type_right')
  })
  secret = allWords[Math.floor(Math.random() * allWords.length)].replace('ё','е')
  console.log('загадано слово "' + secret.toUpperCase() + '"')
}
// красит поле
function colorField(){
  const line = lines[curLine].querySelectorAll('.field__letter')
  line.forEach((letterField,index) => {
    let curLetter = letterField.innerHTML
    const curButton = [...keyboardButtons].filter(b => b.innerHTML == curLetter)[0]
    if (!secret.includes(curLetter)) {
      letterField.classList.add('letter_type_wrong')
      curButton.classList.add('letter_type_wrong') // оно так и так не меняется
    } else {
      if (curLetter != secret[index]) {  // есть но не на своем месте
        letterField.classList.add('letter_type_misposition')
        // тут надо сохранить желтый если был
        if (!curButton.classList.contains('letter_type_right'))
          curButton.classList.add('letter_type_misposition')
      } else {
        letterField.classList.add('letter_type_right')
        // здесь тоже все однозначно
        curButton.classList.add('letter_type_right')
      }
    }
  })
}

// красим клавиатуру за текущее слово
function colorKeyboard(){
  keyboardButtons.forEach(el=> {
    if (curWord.includes(el.innerHTML)) {
      el.classList.add('letter_type_current-row')
    } else if (!bigButtons.includes(el)) {
      el.classList.remove('letter_type_current-row')
    }
  })
}

// подсветка текущей строки
function highlightCurLine(isCur){
  if (isCur)
    lines[curLine].querySelectorAll('.field__letter').forEach(el => el.classList.add('letter_type_current-row'))
  else
    lines[curLine].querySelectorAll('.field__letter').forEach(el => el.classList.remove('letter_type_current-row'))
}

// проверяет слово
function checkWord(word){
  if (word == secret){
    complete = true;
    colorField()
    setTimeout(()=>{
      console.log('красим-красим')
      alert('Угадал')
      reset()
    }, 100) // ok
    // почемуто сначала делается алерт, а красить не красит. Видимо потому что алерт асинхронный?...
  } else {
    if (!allWords.includes(word)){
      alert('Нет такого слова')
    } else {
      colorField()
      highlightCurLine(0)
      curLine += 1
      curPos = 0
      curWord = ''
      if (curLine > 5){
        alert('Вы проиграли, было загадано слово "' + secret + '"')
        reset()
      }
      else
        highlightCurLine(1)
    }
  }
}


// обработчик нажатой буквы
function letterPressed(letterButton) {
  // if (curPos > 4) return
  if (complete) return
  let letter = letterButton.target.innerHTML
  let curField
  if (letter == '←') {
    curPos = curPos - 1 < 0 ? 0 : curPos - 1
    curField = lines[curLine].querySelectorAll('.field__letter')[curPos]
    curField.innerHTML = ''
    if  (curWord != '')
      curWord = curWord.slice(0,-1)
    colorKeyboard()
    return
  }
  if (letter == '✔') {
    if (curPos < 5) return;
    checkWord(curWord.toLowerCase())
    colorKeyboard()
    return
  }
  if (curPos < 5) {
    curField = lines[curLine].querySelectorAll('.field__letter')[curPos]
    curField.innerHTML = letter
    curWord += letter
    curPos++
    colorKeyboard()
  }
}

keyboardButtons.forEach(el => el.addEventListener('click', l => letterPressed(l)))

function closeInstructions(){
  document.querySelector('.instructions').style.display = 'none'
  console.log('close')
}
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


// лайфхачные слова:
// пилот ревун камыш (маска?)
// спорт лиман девка

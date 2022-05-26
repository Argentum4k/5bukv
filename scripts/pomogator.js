let curLetters=[]
let allWords=[]
const alphabet = Array.from('йцукенгшщзхъфывапролджэячсмитьбю')
const keyboardButtons = document.querySelectorAll('.keyboard__button')
const controlButtons = [...document.querySelectorAll('.keyboard__button_big')]
const backButton = controlButtons[0]
const okButton = controlButtons[1]
const wordsList = document.querySelector('.words')

function letterPressedPomogator(letterButton){
  let letter = letterButton.target.innerHTML
  let curFiltered = allWords
  if (letter == '←') {
    curLetters=[]
    colorKeyboard()
  } else if (letter == '✔') {
    if (curLetters.length > 5){   // пытаемся составить слово только из этих букв
      const wrongLetters = []
      alphabet.forEach(l => {
        if(!curLetters.includes(l)) wrongLetters.push(l)
      })
      wrongLetters.forEach(letter => {
        curFiltered = curFiltered.filter( w => !w.includes(letter))
      })
    } else {  // пытаемся составить все слова со всеми этими буквами (и мейби другими)
      if (curLetters.length < 2){
        alert('Хотябы 2 буквы')
        return
      }
      curLetters.forEach(letter => {
        curFiltered = curFiltered.filter( w => w.includes(letter))
      })
    }
    showWords(curFiltered)
    colorKeyboard()
    return
  } else {  // нажата буква
    if (curLetters.includes(letter)){
      curLetters.splice( curLetters.indexOf(letter), 1 )
    } else {
      curLetters.push(letter)
    }
    letterButton.target.classList.toggle('letter_type_misposition')
  }
  // colorKeyboard()
}

async function getWords(){
  const nouns = await fetch('russian_nouns_5.txt');
  const text = await nouns.text();
  if (document.location.host.toLowerCase().includes('github'))
    allWords = text.split('\n') // для гх пагес
  else
    allWords = text.split('\r\n')  // для локальной
}
function colorKeyboard(){
  //!!! используется в индексе!!!
  keyboardButtons.forEach(el=> {
    if (curLetters.includes(el.innerHTML)) {
      el.classList.add('letter_type_misposition')
    } else if (!controlButtons.includes(el)) {
      el.classList.remove('letter_type_misposition')
    }
  })
}

function showWords(words){
  wordsList.innerHTML=''
  words.forEach(word => {
    wordsList.innerHTML += '<p class="words__element">' + word + '</p>'
  })
}



getWords().then(()=>{
  console.log('words get')
})
// обработчики экранной клавиатуры
keyboardButtons.forEach(el =>
  el.addEventListener('click', l => letterPressedPomogator(l)))

document.addEventListener('keydown', event => {
  keyboardButtons.forEach(el => {
    if (el.innerHTML == event.key) {
      el.classList.add('letter_type_current-row')
    }
  })
});

document.addEventListener('keyup', event => {
  if (alphabet.includes(event.key) ){
    keyboardButtons.forEach(el => {
      if (el.innerHTML == event.key) {
        el.click()
        el.classList.remove('letter_type_current-row')
      }
    })
  } else if ('Backspace' == event.key){
    backButton.click()
  } else if ('Enter' == event.key){
    okButton.click()
  }
});

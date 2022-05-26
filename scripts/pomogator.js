let curLetters=[]
let allWords=[]
const alphabet = Array.from('йцукенгшщзхъфывапролджэячсмитьбю')
const keyboardButtons = document.querySelectorAll('.keyboard__button')
const controlButtons = [...document.querySelectorAll('.keyboard__button_big')]
const wordsList = document.querySelector('.words')

function letterPressedPomogator(letterButton){
  let letter = letterButton.target.innerHTML
  let curFiltered = allWords
  if (letter == '✔') {
    if (curLetters.length > 5){   // пытаемся составить слово только из этих букв
      const wrongLetters = []
      alphabet.forEach(l => {
        if(!curLetters.includes(l)) wrongLetters.push(l)
      })
      wrongLetters.forEach(letter => {
        curFiltered = curFiltered.filter( w => !w.includes(letter))
      })
    } else {  // пытаемся составить все слова со всеми этими буквами (и мейби другими)
      curLetters.forEach(letter => {
        curFiltered = curFiltered.filter( w => w.includes(letter))
      })
    }
    showWords(curFiltered)
    colorKeyboard()
    return
  } else {
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
  //!!! используется в помогаторе!!!
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

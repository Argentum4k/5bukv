let goodLetters=new Set()
let badLetters=new Set()
let curField = null
let allWords=[]
const alphabet = Array.from('йцукенгшщзхъфывапролджэячсмитьбю')
const keyboardButtons = document.querySelectorAll('.keyboard__button')
const controlButtons = [...document.querySelectorAll('.keyboard__button_big')]
const fieldLetters = [...document.querySelectorAll('.field__letter')]
const backButton = controlButtons[0]
const okButton = controlButtons[1]
const wordsList = document.querySelector('.words')

function fieldPressedPomogator(fieldEvt){
  let field = fieldEvt.target
  if (field.classList.contains('letter_type_selected')) {
    field.classList.remove('letter_type_selected')
    curField = null
  } else {
    if (curField){
      curField.classList.remove('letter_type_selected')
      field.classList.add('letter_type_selected')
      curField = field
    } else {
      field.classList.add('letter_type_selected')
      curField = field
    }
  }
}

// получить буквы на позициях в виде строки с пробелами
const getPosLetters = () => fieldLetters.map(field => {
  const l = field.innerHTML
  if (l !== '')
    return l
  return ' '
}).join('')

fieldLetters.forEach(el =>
  el.addEventListener('click', l => fieldPressedPomogator(l)))

fieldLetters.forEach(el =>
  el.addEventListener('dblclick', l => resetField(l.target)))

function setCurField(letter) {
  curField.innerHTML = letter
  curField.classList.remove('letter_type_selected')
  curField.classList.add('letter_type_right')
  curField = null
}

function resetField(field) {
  field.classList.value = 'field__letter'
  field.innerHTML = ''
}

// функция установки типа буквы
function setLetter(button, type){
  const letter = button.innerHTML
  button.classList.remove('letter_type_wrong')
  button.classList.remove('letter_type_misposition')
  switch (type){
    case 'good':
      button.classList.add('letter_type_misposition')
      badLetters.delete(letter)
      goodLetters.add(letter)
      break;
    case 'bad':
      button.classList.add('letter_type_wrong')
      badLetters.add(letter)
      goodLetters.delete(letter)
      break;
    case 'none':
      badLetters.delete(letter)
      goodLetters.delete(letter)
      break;
  }
}


function letterPressedPomogator(letterButtonEvt){
  const letterButton = letterButtonEvt.target
  let letter = letterButton.innerHTML
  let curFiltered = allWords
  if (letter == '╳') {
    goodLetters=new Set()
    clearKeyboard()
    showWords([])
    curField = null
    fieldLetters.forEach(el => resetField(el))
  } else if (letter == '✔') { // главный поиск
    if (goodLetters.size > 5){   // пытаемся составить слово только из этих букв
      const wrongLetters = []
      alphabet.forEach(l => {
        if(!goodLetters.has(l)) wrongLetters.push(l)
      })
      wrongLetters.forEach(letter => {
        curFiltered = curFiltered.filter( w => !w.includes(letter))
      })
    } else {  // пытаемся составить все слова со всеми этими буквами (и мейби другими)
      if (goodLetters.size < 2 && getPosLetters() === '     ' && (goodLetters.size + badLetters.size < 5) ){
        alert('Хотябы 2 буквы')
        return
      }
      goodLetters.forEach(letter => {
        curFiltered = curFiltered.filter( w => w.includes(letter))
      })
      badLetters.forEach(letter => {
        curFiltered = curFiltered.filter( w => !w.includes(letter))
      })
    }
    if (getPosLetters() !== '     ') { // есть буквы на позициях
      const posLetters = getPosLetters()
      for (let i in posLetters) {
        if (posLetters[i] !== ' ')
          curFiltered = curFiltered.filter( w => w[i] == posLetters[i])
      }
    }
    if(!curFiltered.length)
      curFiltered.push('Подходящих слов не найдено')
    showWords(curFiltered)
    // clearKeyboard() // возможно не надо?
    return
  } else {  // нажата буква

    if (curField) {
      setCurField(letter)
      setLetter(letterButton, 'good')
    } else {
      if (goodLetters.has(letter)){
        setLetter(letterButton, 'none')
      } else {
        setLetter(letterButton, 'good')
      }
    }

    // если все ок удалить
    // if (goodLetters.has(letter)){
    //   if (curField){
    //     setCurField(letter)
    //     setLetter(letterButton, 'good')
    //   } else {
    //     setLetter(letterButton, 'none')
    //   }
    // } else {
    //   if (curField){
    //     setCurField(letter)
    //   }
    //   setLetter(letterButton, 'good')
    // }
  }
}

async function getWords(){
  const nouns = await fetch('russian_nouns_5.txt');
  const text = await nouns.text();
  if (document.location.host.toLowerCase().includes('github'))
    allWords = text.split('\n') // для гх пагес
  else
    allWords = text.split('\r\n')  // для локальной
}

function clearKeyboard(){
  // только для очистки
  keyboardButtons.forEach(el=> {
     if (!controlButtons.includes(el))
       setLetter(el, 'none')
     })
  //раньше была color из индексе!!!

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
// обработчики кликов по экранной клавиатуре
keyboardButtons.forEach(el =>
  el.addEventListener('click', l => letterPressedPomogator(l)))
// правый клик (долгое нажатие на мобиле)
keyboardButtons.forEach(el =>
  el.addEventListener('contextmenu', ev =>
  {
    const letter = ev.target.innerHTML
    ev.preventDefault();
    if (controlButtons.includes(ev.target)) return false
    if (badLetters.has(letter)){
      setLetter(ev.target, 'none')
    } else {
      setLetter(ev.target, 'bad')
    }
    return false;
  }))

document.addEventListener('keydown', event => {
  keyboardButtons.forEach(el => {
    if (el.innerHTML == event.key) {
      el.classList.add('letter_type_selected')
    }
  })
});

document.addEventListener('keyup', event => {
  if (alphabet.includes(event.key) ){
    keyboardButtons.forEach(el => {
      if (el.innerHTML == event.key) {
        el.click()
        el.classList.remove('letter_type_selected')
      }
    })
  } else if ('Backspace' == event.key){
    backButton.click()
  } else if ('Enter' == event.key){
    okButton.click()
  }
});

//todo сделать правой кнопкой по полю фильтр на НЕэту букву.. а потом на несколько)

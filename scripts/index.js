// инициализация словаря
// async function getWords(){
//   //!!! используется в помогаторе!!!
//   const nouns = await fetch('russian_nouns_5.txt');
//   const text = await nouns.text();
//   if (document.location.host.toLowerCase().includes('github'))
//     allWords = text.split('\n') // для гх пагес
//   else
//     allWords = text.split('\r\n')  // для локальной
// }

// начинает все заново
function newGame(first = false){
  highlightCurLine(0)
  curLine = 0
  highlightCurLine(1)
  curPos = 0
  curWord = ''
  triedWords = []
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
  if(!first)
    V('gamesPlayed', 1+ +V('gamesPlayed'))
  initStats()
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
  //!!! используется в помогаторе!!!
  keyboardButtons.forEach(el=> {
    if (curWord.includes(el.innerHTML)) {
      el.classList.add('letter_type_current-row')
    } else if (!controlButtons.includes(el)) {
      el.classList.remove('letter_type_current-row')
    }
  })
}

// подсветка текущей строки
function highlightCurLine(isCur){
  const line = lines[curLine]
  if (line) {
    if (isCur)
      line.querySelectorAll('.field__letter').forEach(el => el.classList.add('letter_type_current-row'))
    else
      line.querySelectorAll('.field__letter').forEach(el => el.classList.remove('letter_type_current-row'))
  }
}

// проверяет слово
function checkWord(word){
  if (word == secret){
    V('totalTries', 1+ +V('totalTries'))
    complete = true;
    V('winCount', 1+ +V('winCount'))
    colorField()
    setTimeout(()=>{
      console.log('красим-красим')
      alert('Угадал')
      newGame()
    }, 100) // ok
    // почемуто сначала делается алерт, а красить не красит. Видимо потому что алерт асинхронный?...
  } else {
    if (!allWords.includes(word)){
      alert('Нет такого слова')
    } else {
      if (triedWords.includes(word)){
        alert('Это слово уже было')
        return
      }
      V('totalTries', 1+ +V('totalTries'))
      colorField()
      highlightCurLine(0)
      curLine += 1
      curPos = 0
      triedWords.push(curWord)
      curWord = ''
      if (curLine > 5){
        alert('Вы проиграли, было загадано слово "' + secret + '"')
        V('loseCount', 1+ +V('loseCount'))
        newGame()
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
    if (curPos < wordLength) return;
    checkWord(curWord.toLowerCase())
    colorKeyboard()
    return
  }
  if (curPos < wordLength) {
    curField = lines[curLine].querySelectorAll('.field__letter')[curPos]
    curField.innerHTML = letter
    curWord += letter
    curPos++
    colorKeyboard()
  }
}

function closeInstructions(){
  document.querySelector('.instructions').style.display = 'none'
  console.log('close')
}


// лайфхачные слова:
// пилот ревун камыш (маска?)
// спорт лиман девка
// спорт диван шмель -- 15 разных, нет  у к г
// кулеш
// спорт чувак гемин

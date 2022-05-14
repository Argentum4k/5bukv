// const kbButtons = document.querySelectorAll('.keyboard__button')
// kbButtons.forEach((el) => {
//   el.style.gridArea = el.innerHTML
//   }
// )
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
  // allWords = text.split('\r\n')  // для локальной
  allWords = text.split('\n') // для гх пагес

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
const letterButtons = document.querySelectorAll('.keyboard__button')
const lines = document.querySelectorAll('.field__line')



// начинает все заново
function reset(){

  // alert('заново?') // not helping
  secret = allWords[Math.floor(Math.random() * allWords.length)].replace('ё','е')
  curLine = 0
  curPos = 0
  curWord = ''
  complete = false
  // сброс окраски
  document.querySelectorAll('.field__letter').forEach(fld => {
    fld.classList.remove('letter_type_wrong')
    fld.classList.remove('letter_type_misposition')
    fld.classList.remove('letter_type_right')
    fld.innerHTML=''
  })
  letterButtons.forEach( btn => {
    btn.classList.remove('letter_type_wrong')
    btn.classList.remove('letter_type_misposition')
    btn.classList.remove('letter_type_right')
  })
  secret = allWords[Math.floor(Math.random() * allWords.length)].replace('ё','е')
  console.log('загадано слово "' + secret.toUpperCase() + '"')
}

function colorField(){
  const line = lines[curLine].querySelectorAll('.field__letter')
  line.forEach((letterField,index) => {
    let curLetter = letterField.innerHTML
    const curButton = [...letterButtons].filter(b => b.innerHTML == curLetter)[0]
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


function checkWord(word){
  if (word == secret){
    complete = true;
    colorField()
    // setTimeout(()=>console.log('красим-красим'), 500) // not hepling
    // почемуто бля сначала делаетс алерт, неебу почему
    alert('Угадал')
    reset()
  } else {
    if (!allWords.includes(word)){
      alert('Нет такого слова')
    } else {
      colorField()
      curLine += 1
      curPos = 0
      curWord = ''
      if (curLine > 5){
        alert('Вы проиграли, было загадано слово "' + secret + '"')
        reset()
      }
    }
  }
}

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
    return
  }
  if (letter == '✔') {
    if (curPos < 5) return
    checkWord(curWord.toLowerCase())
    return
  }
  if (curPos < 5) {
    curField = lines[curLine].querySelectorAll('.field__letter')[curPos]
    curField.innerHTML = letter
    curWord += letter
    curPos++
  }
}

letterButtons.forEach(el => el.addEventListener('click', l => letterPressed(l)))

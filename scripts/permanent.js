// хз может нужен только массив??
// let localStorVars = [
// ]
function initLocalStorage(){
  // const vars = [
  //   'gamesPlayed',
  //   'winCount',
  //   'loseCount',
  //   'notFinished',
  //   'avgTries',
  //   'totalTries',
  // ]

  stats.forEach( stat => {
  // vars.forEach(v=>{
    const v = stat.id
    const tmp = localStorage.getItem(v)
    if (tmp === null) {
      localStorage.setItem(v, 0)
    }
  })
  // хз здесь ли надо это писать но пока тут
  if (V('totalTries') == "0"){
    resetStats()
  }
}
//сокращение для  LocalStorage
function V(varname, val=null){
  if (val != null){
    localStorage.setItem(varname, val)
  } else {
    return localStorage.getItem(varname)
  }
}

function initStats(){
  stats.forEach(stat => {
    if (stat.id == 'avgTries' && V('gamesPlayed')>0) {
      stat.querySelector('span').textContent = (V('totalTries')/V('gamesPlayed')).toFixed(1)
    } else {
      stat.querySelector('span').textContent = V(stat.id)
    }
  })
}

function resetStats(){
  stats.forEach( stat => {
    V(stat.id, 0)
  })
  initStats()
}

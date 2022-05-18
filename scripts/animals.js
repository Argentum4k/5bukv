const anim_set = [
  {name: 'Котик',
  img_norm: 'cat.jpg',
  img_sea: 'sea_cat.jpg'},
  {name: 'Слон',
    img_norm: 'elephant.jpg',
    img_sea: 'sea_elephant.jpg'},
  {name: 'Ёж',
    img_norm: 'ezh.jpg',
    img_sea: 'sea_ezh.jpg'},
  {name: 'Конь',
    img_norm: 'horse.webp',
    img_sea: 'sea_horse.JPG'},
  {name: 'Лев',
    img_norm: 'lion.jpg',
    img_sea: 'sea_lion.webp'},
  {name: 'Оса',
    img_norm: 'osa.jpg',
    img_sea: 'sea_osa.webp'},
  {name: 'Заяц',
    img_norm: 'hare.jpg',
    img_sea: 'sea_hare.jpg'},
  {name: 'Леопард',
    img_norm: 'leopard.jpg',
    img_sea: 'sea_leopard.jpg'},
  {name: 'Пёс',
    img_norm: 'pes.jpg',
    img_sea: 'sea_pes.webp'},
  {name: 'Бой',
    img_norm: 'battle.jpg',
    img_sea: 'sea_battle.jpg'},
  {name: 'Волк',
    img_norm: 'wolf.webp',
    img_sea: 'sea_wolf.jpg'},
]
const normText = ' здорового человека'
const seaText = ' моряка-курильщика'
const imgBase = './images/animals/'

const pairTemplate = document.querySelector('template').content.querySelector('.pair')
const animals = document.querySelector('.animals')

anim_set.forEach(el => {
  const newPair = pairTemplate.cloneNode(1)
  const titleNormal = newPair.querySelector('.title_normal')
  const titleSea = newPair.querySelector('.title_sea')
  const imgNormal = newPair.querySelector('.img_normal')
  const imgSea = newPair.querySelector('.img_sea')
  titleNormal.innerHTML = el.name + normText
  titleSea.innerHTML = el.name + seaText
  imgNormal.src = imgBase + el.img_norm
  imgNormal.alt = titleNormal.innerHTML
  imgSea.src = imgBase + el.img_sea
  imgSea.alt = titleSea.innerHTML
  if (el.name == 'Волк')
    titleSea.innerHTML = ' . . . '
  animals.append(newPair)

})


















import {letterTemplateSelector} from "./constants.js";

/**
 * буква (или клетка) на поле
 */
export default class Letter {
  //todo ensure
  static _letterTemplate = document.querySelector('template').content.querySelector(letterTemplateSelector);

  constructor() {
    this._letter = Letter._letterTemplate.cloneNode(true);
    this._flipper = this._letter.querySelector('.flipper');
    this._setEventListeners();
  }

  getElement() {
    return this._letter;
  }

  _setEventListeners() {
    this._letter.addEventListener('click', () => {
      this.flip()
    })
    this._letter.addEventListener('auxclick', () => {
      // evt.preventDefault() // не нужно
      this.shake();
    })
    this._letter.addEventListener("contextmenu", (evt) => {
      evt.preventDefault();
      return false;
    })
    // this._letter.addEventListener('dblclick', () => {
    //   console.log('shake')
    // })
  }

  /**
   * переворот
   */
  flip() {
    // this._flipper.classList.add('flip')
    this._flipper.classList.toggle('flip')
  }

  /**
   * потрясти
   */
  shake() {
    // flipper не подходит, проявляется другая сторона...
    this._letter.classList.add('shake')
    setTimeout(()=>this._letter.classList.remove('shake'), 200)
  }
}

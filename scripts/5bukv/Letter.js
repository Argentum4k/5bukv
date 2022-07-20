import {letterTemplateSelector} from "./constants";

/**
 * буква (или клетка) на поле
 */
export default class Letter{
  //todo ensure
  static _letterTemplate = document.querySelector('template').
                            content.querySelector(letterTemplateSelector);
  constructor() {
    this._letter = Letter._letterTemplate.cloneNode(true);
    this._flipper = this._letter.querySelector('.flipper');
  }
  getElement(){
    return this._letter;
  }

  /**
   * переворот
   */
  flip(){
    this._flipper.classList.add('.flip')
  }

  /**
   * потрясти
   */
  shake(){

  }
}

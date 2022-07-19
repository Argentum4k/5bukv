import {letterTemplateSelector} from "./constants";

/**
 * буква на поле
 */
export default class Letter{
  static _letterTemplate = document.querySelector('template').
                            content.querySelector(letterTemplateSelector);
  constructor() {
    this._letter = Letter._letterTemplate.cloneNode(true);

  }
  getElement(){
    return this._letter;
  }
  flip(){

  }
}

import {fieldLineTemplateSelector, letterTemplateSelector} from "./constants";
import Letter from "./Letter";

/**
 * класс игровое поле
 */
export default class Field{
  /**
   *
   * @param wordLength
   * @param rows
   */
  constructor(wordLength = 5, rows = 6) {
    this._wordLength = wordLength;
    /**
     * число строк на поле ака количество попыток
     * @type {number}
     * @private
     */
    this._rows = rows;
    this._field = this._generate();
  }

  /** добавляет поле в ДОМ  по указанному селектору */
  draw(containerSelector = '.field'){
    this._containerSelector = containerSelector;
    this._container = document.querySelector(containerSelector);
    // this._container.append(this._field)
    // this._container.replaceWith(this._field)
    this._container.replaceChildren(this._field);
  }

  _generate(){
    this._fieldLineTemplate = document.querySelector('template').
                               content.querySelector(fieldLineTemplateSelector);
    const field = new DocumentFragment();
    this._fieldLines = []
    this._fieldLetters2dArray = []
    for (let i = 0; i < this._rows; i++) {
      const newLine = this._makeFieldLine();
      this._fieldLines.push(newLine);
      field.append(newLine);
    }

    return field;
  }
  _makeFieldLine(){
    const line = this._fieldLineTemplate.cloneNode(true);
    const letterArrayRow = []
    for (let i = 0; i < this._wordLength; i++) {
      const newLetter = this._makeLetter();
      letterArrayRow.push(newLetter);
      line.append(newLetter.getElement());
    }
    this._fieldLetters2dArray.push(letterArrayRow);

    return line
  }
  _makeLetter(){
    const letter = new Letter();
    return letter;
  }
}

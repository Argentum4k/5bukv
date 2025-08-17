const fs = require('fs');

// выделяет из общего словаря слова нужной длины, меняет ё на е. Запускать в ноде.
function filterWordsByLength(inputFile, outputFile, desiredLength) {
  fs.readFile(inputFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Ошибка при чтении файла:', err);
      return;
    }

    const words = data.split('\n');

    const filteredWords = words.map(word => {
      // Заменяем "ё" на "е" в каждом слове
      const normalizedWord = word.trim().replace(/ё/g, 'е');
      return normalizedWord;
    }).filter(normalizedWord => {
      // Фильтруем по длине после замены
      return normalizedWord.length === desiredLength;
    });

    const result = filteredWords.join('\n');

    fs.writeFile(outputFile, result, 'utf8', (err) => {
      if (err) {
        console.error('Ошибка при записи файла:', err);
        return;
      }
      console.log(`Слова длиной ${desiredLength} (с заменой ё→е) сохранены в файл: ${outputFile}`);
    });
  });
}

// Пример использования
const inputFilePath = 'words.txt';
const outputFilePath = 'filtered_words.txt';
const wordLength = 5;

filterWordsByLength(inputFilePath, outputFilePath, wordLength);

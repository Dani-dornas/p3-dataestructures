import React, { ChangeEvent, useState } from 'react';

const TextFileReader: React.FC = () => {
  const [words, setWords] = useState<string[]>([]);

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const contents = e.target?.result as string;
        const wordsArray = contents.split(/\s+/).map((word) => word.toLowerCase());
        const sortedWords = insertionSort(wordsArray);
        setWords(sortedWords);
      };

      reader.readAsText(file);
    }
  };

  const insertionSort = (arr: string[]): string[] => {
    for (let i = 1; i < arr.length; i++) {
      const currentElement = arr[i];
      let j = i - 1;

      while (j >= 0 && arr[j] > currentElement) {
        arr[j + 1] = arr[j];
        j--;
      }

      arr[j + 1] = currentElement;
    }

    return arr;
  };

  const handleSortAndDownload = () => {
    const sortedWords = [...words].sort();
    const sortedText = sortedWords.join(' ');

    const blob = new Blob([sortedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = '_ord.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <input type="file" onChange={handleFileInputChange} />
      <div>
        <h3>Palavras no Arquivo:</h3>
        <ul>
          {words.map((word, index) => (
            <li key={index}>{word}</li>
          ))}
        </ul>
      </div>
      <button onClick={handleSortAndDownload}>Baixar Palavras Ordenadas</button>
    </div>
  );
};

export default TextFileReader;

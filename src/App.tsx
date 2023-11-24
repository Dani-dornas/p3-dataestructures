import React from 'react';
import TextFileReader from './components/Words';

const App: React.FC = () => {
  return (
    <div>
      <h1>Leitor de Arquivo de Texto</h1>
      <TextFileReader />
    </div>
  );
};

export default App;

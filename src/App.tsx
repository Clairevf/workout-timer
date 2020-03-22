import React from 'react';
import logo from './logo.svg';
import './App.css';
// import { Clock } from './widgets/clock';
import { TimeBlock } from './widgets/TimeBlock';

function App() {
  return (
    <div className="App">
      <TimeBlock duration={3} isActive={true} />
      <header className="App-header">

      </header>
    </div>
  );
}

export default App;

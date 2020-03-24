import React from 'react';
import logo from './logo.svg';
import './App.css';
// import { Clock } from './widgets/clock';
import { TimeBlock } from './widgets/TimeBlock';

function App() {
  return (
    <div className="App">
      <div className="program-workout">
        <TimeBlock duration={5} isActive={true} />
        <TimeBlock duration={3} isActive={false} />
        <TimeBlock duration={5} isActive={true} />
        <TimeBlock duration={3} isActive={false} />
      </div>
    </div>
  );
}

export default App;

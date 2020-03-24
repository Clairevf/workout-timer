import React from 'react';
import logo from './logo.svg';
import './App.css';
// import { Clock } from './widgets/clock';
import { Workout } from './widgets/Workout';

function App() {
  return (
    <div className="App">
      <div className="program-workout">
        <Workout />
      </div>
    </div>
  );
}

export default App;

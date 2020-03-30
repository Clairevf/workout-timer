import React from 'react';
import logo from './logo.svg';
import './App.css';
import { WorkoutProgram } from './widgets/Workout';

function App() {
  return (
    <div className="App">
      <div className="program-workout">
        <WorkoutProgram />
      </div>
    </div>
  );
}

export default App;

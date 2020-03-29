import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Workout } from './widgets/Workout';
import { WorkoutGenerator } from './widgets/WorkoutGenerator';

function App() {
  return (
    <div className="App">
      <div className="program-workout row">
        <div className="col-md-4">
          <WorkoutGenerator />
        </div>
        <div className="col-md-8">
          <Workout />
        </div>
      </div>
    </div>
  );
}

export default App;

import React, { Component } from 'react'; // we need this to make JSX compile
import {TimeBlock} from './TimeBlock';

type WorkoutProps = {
    program: Array<TimeBlock>
};



export class Workout extends Component<{}, WorkoutProps> {
    state = {
        program: Array<TimeBlock>()
    };

    generateRandomWorkout() {
        let blocks = Math.floor((Math.random() * 10) + 1);
        var newWorkout = new Array<TimeBlock>(blocks);
        var i:number;
        var newTimeBlock:any;

        let activeBlock = true;
        for (i = 0; i < blocks; i++) {
            let timeBlockProps = {
                duration: (activeBlock ? 5 : 3),
                isActive: activeBlock
            };
            newTimeBlock = <TimeBlock {...timeBlockProps} />;
            newWorkout.push(newTimeBlock);
            activeBlock = !activeBlock;
        }

        // return newWorkout;
        this.setState({
            program: newWorkout
        })
    };



    // render will know everything!
    render() {
        return <div className={"workout-container"}>
            <button onClick={() => this.generateRandomWorkout()}>GENERATE WORKOUT</button>
            {this.state.program}
        </div>;
    }
}
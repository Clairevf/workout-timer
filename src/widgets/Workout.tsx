import React, { Component } from 'react'; // we need this to make JSX compile
import {TimeBlock, TimeBlockProps, TimeBlockTypes} from './TimeBlock';
import { BlockGenerator } from './BlockGenerator';

type WorkoutProgramState = {
    blocks: Array<TimeBlockProps>,
    currentBlock: number,
    isFinished: boolean
};

// TODO: use audio files
var DEFAULT_BELL_TONE = 'http://soundbible.com/mp3/Boxing_arena_sound-Samantha_Enrico-246597508.mp3';
export class WorkoutProgram extends Component<{}, WorkoutProgramState> {
    interval: NodeJS.Timer;
    state = {
        blocks: Array<TimeBlockProps>(),
        currentBlock: 0,
        isFinished: false
    };

    generateRandomWorkout() {
        let totalBlocks = Math.floor((Math.random() * 10) + 1);
        var newWorkout = new Array<TimeBlockProps>();
        var i:number;
        let duration: number;

        let activeBlock = true;
        for (i = 0; i < totalBlocks; i++) {

            duration = (activeBlock ? 5 : 3);
            newWorkout.push({
                duration: duration,
                activeClass: (activeBlock ? 'active-block' : 'rest-block') + ' ' + (i === 0 ? 'current' : '')
            });
            activeBlock = !activeBlock;
        }

        this.setState({
            blocks: newWorkout,
            currentBlock: 0,
            isFinished: false
        });
    };

    tick() {
        let blocks = this.state.blocks.slice();
        let currentBlock = this.state.blocks[this.state.currentBlock];
        if (currentBlock && currentBlock.duration > 0 ) {
            // decrease time stamp
            currentBlock.duration = currentBlock.duration - 1;
            blocks[this.state.currentBlock] = currentBlock;
            this.setState({
                blocks: blocks
            });
        } else {
            this.endInterval();
        }
    }
    endInterval() {
        // ring dat bell
        this.ringBell();

        // move on to the next block
        let blocks = this.state.blocks.slice();
        let currentBlock = this.state.blocks[this.state.currentBlock];
        currentBlock.activeClass += ' hide';
        let nextBlock = blocks[this.state.currentBlock + 1];
        if (nextBlock) {
            nextBlock.activeClass += ' current';
        }
        clearInterval(this.interval);
        this.setState({
            currentBlock: this.state.currentBlock + 1,
            blocks: blocks
        });

        // restart cycle or end workout
        if (this.state.currentBlock < this.state.blocks.length) {
            this.startWorkout();
        } else {
            this.endWorkout();
        }
    }

    clearWorkout() {
        this.setState({
            blocks: Array<TimeBlockProps>(),
            currentBlock: 0,
            isFinished: false
        });
    }

    pauseWorkout() {
        clearInterval(this.interval);
    }

    endWorkout() {
        this.setState({
            isFinished: true
        });
    }

    startWorkout() {
        this.interval = setInterval(() => {
            this.tick();
        }, 1000);
    }

    addWorkoutBlock(type: TimeBlockTypes, timeSelected: number) {
        let className = (type === TimeBlockTypes.ACTIVE ? 'active-block' : 'rest-block');
        let blocks = this.state.blocks.slice();
        blocks.push({
            duration: timeSelected,
            activeClass: className
        });

        this.setState({
            blocks: blocks
        });
    }

    ringBell() {
        var audio = new Audio(DEFAULT_BELL_TONE);
        audio.play();
    }

    render() {
        let rows = [];

        for (var i = 0; i < this.state.blocks.length; i++) {
            // flip back and forth between active and rest blocks
            rows.push(<TimeBlock key={i}
                        activeClass={this.state.blocks[i].activeClass}
                        duration={this.state.blocks[i].duration}
                         />)
        }

        return <div className={'row'}>
            <div className={'col-md-4'}>
                <WorkoutGenerator addWorkoutBlock={(type: TimeBlockTypes, timeSelected: number) => this.addWorkoutBlock(type, timeSelected)}/>
            </div>
            <div className={'col-md-8'}>
                <div className={"workout-container"}>
                    <div>
                        <button onClick={() => this.generateRandomWorkout()}>GENERATE RANDOM WORKOUT</button>
                    </div>
                    <div>
                        <button onClick={() => this.startWorkout()}>START</button>
                        <button onClick={() => this.pauseWorkout()}>PAUSE</button>
                        <button onClick={() => this.endWorkout()}>END</button>
                        <button onClick={() => this.clearWorkout()}>CLEAR</button>
                    </div>
                    {rows}
                    <h1 className={this.state.isFinished ? 'show' : 'hide'}> FINISHED </h1>
                </div>
            </div>
        </div>
    }
}

export class WorkoutGenerator extends Component<{addWorkoutBlock: (type: TimeBlockTypes, timeSelected: number) => void}, {}> {
    addBlockToWorkout(type: TimeBlockTypes, timeSelected: number) {
        this.props.addWorkoutBlock(type, timeSelected);
    }
    render() {
        return <BlockGenerator addBlockToWorkout={(type: TimeBlockTypes, timeSelected: number) => {this.addBlockToWorkout(type, timeSelected)}}/>
    }
}

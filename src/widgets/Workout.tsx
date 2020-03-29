import React, { Component } from 'react'; // we need this to make JSX compile
import {TimeBlock, TimeBlockProps} from './TimeBlock';

type WorkoutProps = {
    // program: Array<TimeBlock>,
    blocks: Array<TimeBlockProps>,
    currentBlock: number,
    isFinished: boolean
};

export class Workout extends Component<{}, WorkoutProps> {
    interval: NodeJS.Timer;
    totalBlocks: number;
    state = {
        // program: Array<TimeBlock>(),
        blocks: Array<TimeBlockProps>(),
        currentBlock: 0,
        isFinished: false
    };

    generateRandomWorkout() {
        this.totalBlocks = Math.floor((Math.random() * 10) + 1);
        var newWorkout = new Array<TimeBlockProps>();
        var i:number;
        let duration: number;

        let activeBlock = true;
        for (i = 0; i < this.totalBlocks; i++) {

            duration = (activeBlock ? 5 : 3);
            newWorkout.push({
                duration: duration,
                activeClass: (activeBlock ? 'active-block' : 'rest-block') + ' ' + (i === 0 ? 'current' : '')
            });
            activeBlock = !activeBlock;
        }

        this.setState({
            blocks: newWorkout,
            currentBlock: 0
        });

        this.startInterval();
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
        // TODO: DING THE BELL
        let blocks = this.state.blocks.slice();
        let currentBlock = this.state.blocks[this.state.currentBlock];
        currentBlock.activeClass += ' hide';
        // set next block to current
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
        if (this.state.currentBlock < this.totalBlocks) {
            this.startInterval();
        } else {
            this.endWorkout();
        }
    }

    endWorkout() {
        this.setState({
            isFinished: true
        });
    }

    startInterval() {
        this.interval = setInterval(() => {
            this.tick();
        }, 1000);
    }

    render() {
        let rows = [];

        for (var i = 0; i < this.totalBlocks; i++) {
            // flip back and forth between active and rest blocks
            rows.push(<TimeBlock key={i}
                        activeClass={this.state.blocks[i].activeClass}
                        duration={this.state.blocks[i].duration}
                         />)
        }
        return <div className={"workout-container"}>
            <button onClick={() => this.generateRandomWorkout()}>GENERATE RANDOM WORKOUT</button>
            {rows}
            <h1 className={this.state.isFinished ? 'show' : 'hide'}> FINISHED </h1>
        </div>
    }
}
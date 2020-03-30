import React, { Component } from 'react'; // we need this to make JSX compile
import {TimeBlockTypes} from './TimeBlock';

interface TimerBlockGeneratorProps {

    isActive: boolean
}

let DEFAULT_BLOCK_TIME = 30;

export class BlockGenerator extends Component<{addBlockToWorkout: (type: TimeBlockTypes, timeSelected: number) => void}, {}> {
    onBlockClickHandler(type: TimeBlockTypes, timeSelected: number) {
        this.props.addBlockToWorkout(type, timeSelected);
    }

    // render will know everything!
    render() {
        return <div>
            <div>
                <div> ACTIVE BLOCK </div>
                <TimerBlockGenerator isActive={true} onClickHandler={(timeSelected:number) => {this.onBlockClickHandler(TimeBlockTypes.ACTIVE, timeSelected)}} />
            </div>
            <div>
                <div> REST BLOCK </div>
                <TimerBlockGenerator isActive={false} onClickHandler={(timeSelected:number) => {this.onBlockClickHandler(TimeBlockTypes.REST, timeSelected)}}/>
            </div>
        </div>;
    }
};

export class TimerBlockGenerator extends Component<{
        isActive: boolean,
        onClickHandler: (timeSelected: number) => void
    }, {timeSelected: number}> {
    state = {
        timeSelected: DEFAULT_BLOCK_TIME
    }
    renderTimeOption(seconds:number) {
        return <option value={seconds}> {seconds} </option>;
    }

    render() {
        let className = this.props.isActive ? 'active-block' : 'rest-block';
        return <div className={'row time-block ' + className}>
            <div>
                <select value={this.state.timeSelected}
                    onChange={(e) => { this.setState({ timeSelected: Number(e.target.value) }) }}>
                    {this.renderTimeOption(15)}
                    {this.renderTimeOption(20)}
                    {this.renderTimeOption(30)}
                    {this.renderTimeOption(35)}
                    {this.renderTimeOption(45)}
                    {this.renderTimeOption(55)}
                    {this.renderTimeOption(60)}
                </select>
            </div>
            <div>seconds.</div>
            <div className={'add-block-btn'}>
                <button onClick={() => {this.props.onClickHandler(this.state.timeSelected)}}>ADD BLOCKS</button>
            </div>
        </div>
    }
}


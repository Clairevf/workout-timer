import React, { Component } from 'react'; // we need this to make JSX compile

type TimerProps = {
  duration: number,
  isActive: boolean,
  hasFinished: boolean,
  hasStarted: boolean
}

export class TimeBlock extends Component<{duration: number, isActive: boolean}, TimerProps> {
    interval: NodeJS.Timer;
    constructor(props : TimerProps) {
        super(props);

        this.state = {
            duration: props.duration,
            isActive: props.isActive,
            hasFinished: false,

            hasStarted: false,
        };
    }
    // The tick function sets the current state. TypeScript will let us know
    // which ones we are allowed to set.
    tick() {
        if (this.state.duration > 0 ) {
            this.setState({
                duration: this.state.duration - 1
            });
        } else {
            // DING THE BELL
            clearInterval(this.interval);
            this.setState({
                hasFinished: true
            });
        }
    }

    onTimerBlockClicked() {
        this.setState({
            hasStarted: true
        });

        this.interval = setInterval(() => {
            this.tick();
        }, 1000);
    }

    // render will know everything!
    render() {
        let activeClass = this.state.isActive ? 'active-block' : 'rest-block';
        return <div className={"time-block " + activeClass} onClick={() => this.onTimerBlockClicked()}>
            <h1>{this.state.duration} seconds remaining!</h1>
        </div>;
    }
}